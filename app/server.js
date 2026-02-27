import express from "express";
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load .env from parent dir
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env") });

import { scrapeWebsite } from "./pipeline/scraper.js";
import { senutoAnalysis, competitorAnalysis } from "./pipeline/senuto.js";
import { opportunityAnalysis } from "./pipeline/opportunities.js";
import { contentAudit } from "./pipeline/audit.js";
import { generateOffer, generateHTML } from "./pipeline/generator.js";

const app = express();
const PORT = 3456;
const DATA_DIR = join(__dirname, "..", "data", "offers");

app.use(express.json());
app.use(express.static(join(__dirname, "public")));

// --- SSE connections store ---
const clients = new Map(); // offerId → Set<res>

function broadcast(offerId, event, data) {
  const subs = clients.get(offerId);
  if (!subs) return;
  for (const res of subs) {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  }
}

// --- API: List all offers ---
app.get("/api/offers", (req, res) => {
  if (!existsSync(DATA_DIR)) return res.json([]);
  const dirs = readdirSync(DATA_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const metaPath = join(DATA_DIR, d.name, "meta.json");
      if (existsSync(metaPath)) {
        return JSON.parse(readFileSync(metaPath, "utf-8"));
      }
      return { slug: d.name, domain: d.name.replace(/_/g, "."), status: "unknown" };
    })
    .sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
  res.json(dirs);
});

// --- API: Get single offer ---
app.get("/api/offers/:slug", (req, res) => {
  const dir = join(DATA_DIR, req.params.slug);
  if (!existsSync(dir)) return res.status(404).json({ error: "Not found" });

  const meta = existsSync(join(dir, "meta.json"))
    ? JSON.parse(readFileSync(join(dir, "meta.json"), "utf-8"))
    : {};
  const offerMd = existsSync(join(dir, "offer.md"))
    ? readFileSync(join(dir, "offer.md"), "utf-8")
    : null;
  const offerHtml = existsSync(join(dir, "offer.html"))
    ? readFileSync(join(dir, "offer.html"), "utf-8")
    : null;

  res.json({ ...meta, offer_md: offerMd, offer_html: offerHtml });
});

// --- API: Start analysis ---
app.post("/api/analyze", (req, res) => {
  const { domain, context } = req.body;
  if (!domain) return res.status(400).json({ error: "domain is required" });

  const cleanDomain = domain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  const slug = cleanDomain.replace(/[.\-]/g, "_").toLowerCase();

  // Create output dir
  const dir = join(DATA_DIR, slug);
  mkdirSync(join(dir, "pages"), { recursive: true });

  // Save initial meta
  const meta = {
    slug,
    domain: cleanDomain,
    status: "running",
    context: context || null,
    created_at: new Date().toISOString(),
    steps: [],
  };
  writeFileSync(join(dir, "meta.json"), JSON.stringify(meta, null, 2));

  // Start pipeline in background
  runPipeline(slug, cleanDomain, context || "", dir).catch((err) => {
    console.error("Pipeline error:", err);
    meta.status = "error";
    meta.error = String(err);
    writeFileSync(join(dir, "meta.json"), JSON.stringify(meta, null, 2));
    broadcast(slug, "error", { message: String(err) });
  });

  res.json({ slug, status: "started" });
});

// --- API: Generate HTML for existing offer ---
app.post("/api/offers/:slug/generate-html", async (req, res) => {
  const dir = join(DATA_DIR, req.params.slug);
  if (!existsSync(join(dir, "meta.json"))) return res.status(404).json({ error: "Not found" });

  const meta = JSON.parse(readFileSync(join(dir, "meta.json"), "utf-8"));
  const emit = (event, data) => broadcast(req.params.slug, event, data);

  try {
    const siteIntel = existsSync(join(dir, "00_site_intelligence.json"))
      ? JSON.parse(readFileSync(join(dir, "00_site_intelligence.json"), "utf-8"))
      : {};
    const senutoData = existsSync(join(dir, "01_senuto.json"))
      ? JSON.parse(readFileSync(join(dir, "01_senuto.json"), "utf-8"))
      : {};
    const opportunities = existsSync(join(dir, "03_opportunities.json"))
      ? JSON.parse(readFileSync(join(dir, "03_opportunities.json"), "utf-8"))
      : {};
    const offerMd = existsSync(join(dir, "offer.md"))
      ? readFileSync(join(dir, "offer.md"), "utf-8")
      : "";

    const html = await generateHTML(meta.domain, offerMd, siteIntel, senutoData, opportunities, emit);
    writeFileSync(join(dir, "offer.html"), html);

    meta.has_html = true;
    writeFileSync(join(dir, "meta.json"), JSON.stringify(meta, null, 2));

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// --- SSE: Real-time updates ---
app.get("/api/offers/:slug/stream", (req, res) => {
  const slug = req.params.slug;
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.write(`event: connected\ndata: {}\n\n`);

  if (!clients.has(slug)) clients.set(slug, new Set());
  clients.get(slug).add(res);

  req.on("close", () => {
    clients.get(slug)?.delete(res);
  });
});

// --- Serve offer HTML as public LP ---
app.get("/lp/:slug", (req, res) => {
  const htmlPath = join(DATA_DIR, req.params.slug, "offer.html");
  if (!existsSync(htmlPath)) return res.status(404).send("Landing page not found");
  res.type("html").send(readFileSync(htmlPath, "utf-8"));
});

// --- Pipeline orchestrator ---
async function runPipeline(slug, domain, context, dir) {
  const meta = JSON.parse(readFileSync(join(dir, "meta.json"), "utf-8"));

  const emit = (event, data) => {
    if (event === "step") {
      const existing = meta.steps.findIndex((s) => s.step === data.step);
      if (existing >= 0) meta.steps[existing] = data;
      else meta.steps.push(data);
      writeFileSync(join(dir, "meta.json"), JSON.stringify(meta, null, 2));
    }
    broadcast(slug, event, data);
  };

  try {
    // Step 0: Scrape website
    const siteIntel = await scrapeWebsite(domain, context, emit);
    writeFileSync(join(dir, "00_site_intelligence.json"), JSON.stringify(siteIntel, null, 2));

    // Determine country_id
    const countryId = siteIntel.language === "pl" || siteIntel.country === "PL" ? "200" : "50";

    // Step 1: Senuto analysis
    const senutoData = await senutoAnalysis(domain, countryId, emit);
    writeFileSync(join(dir, "01_senuto.json"), JSON.stringify(senutoData, null, 2));

    // Step 2: Competitors
    const competitors = await competitorAnalysis(domain, countryId, senutoData, emit);
    writeFileSync(join(dir, "02_competitors.json"), JSON.stringify(competitors, null, 2));

    // Step 3: Opportunities
    const opportunities = await opportunityAnalysis(siteIntel, senutoData, competitors, emit);
    writeFileSync(join(dir, "03_opportunities.json"), JSON.stringify(opportunities, null, 2));

    // Step 4: Content audit
    const audit = await contentAudit(senutoData, emit);
    writeFileSync(join(dir, "04_content_audit.json"), JSON.stringify(audit, null, 2));

    // Step 5: Generate offer
    const offerMd = await generateOffer(domain, siteIntel, senutoData, competitors, opportunities, audit, emit);
    writeFileSync(join(dir, "offer.md"), offerMd);

    // Step 6: Generate HTML
    const html = await generateHTML(domain, offerMd, siteIntel, senutoData, opportunities, emit);
    writeFileSync(join(dir, "offer.html"), html);

    // Done
    meta.status = "done";
    meta.has_md = true;
    meta.has_html = true;
    meta.completed_at = new Date().toISOString();
    writeFileSync(join(dir, "meta.json"), JSON.stringify(meta, null, 2));
    broadcast(slug, "done", { slug });
  } catch (err) {
    meta.status = "error";
    meta.error = String(err);
    writeFileSync(join(dir, "meta.json"), JSON.stringify(meta, null, 2));
    broadcast(slug, "error", { message: String(err) });
    throw err;
  }
}

app.listen(PORT, () => {
  console.log(`\n  🚀 SEO Offer Generator running at http://localhost:${PORT}\n`);
});
