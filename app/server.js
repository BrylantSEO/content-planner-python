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

// --- API: Send analysis email ---
app.post("/api/offers/:slug/send-email", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "email is required" });

  const dir = join(DATA_DIR, req.params.slug);
  if (!existsSync(join(dir, "offer.md"))) return res.status(404).json({ error: "Offer not found" });

  const meta = JSON.parse(readFileSync(join(dir, "meta.json"), "utf-8"));
  const offerMd = readFileSync(join(dir, "offer.md"), "utf-8");

  // Convert markdown to HTML email
  const emailHtml = markdownToEmailHtml(offerMd, meta.domain);

  // Try to send via nodemailer (requires SMTP_* env vars)
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.default.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || smtpUser,
        to: email,
        subject: `Analiza SEO: ${meta.domain} — Double Digital`,
        html: emailHtml,
      });

      res.json({ success: true, method: "smtp" });
    } catch (err) {
      res.status(500).json({ error: `SMTP error: ${err.message}` });
    }
  } else {
    // Fallback: save email HTML and return it for manual sending
    const emailPath = join(dir, "email.html");
    writeFileSync(emailPath, emailHtml);
    res.json({
      success: true,
      method: "manual",
      message: "SMTP not configured. Email HTML saved — use Gmail MCP or copy-paste.",
      email_html_url: `/api/offers/${req.params.slug}/email-html`,
    });
  }
});

// --- API: Get email HTML preview ---
app.get("/api/offers/:slug/email-html", (req, res) => {
  const htmlPath = join(DATA_DIR, req.params.slug, "email.html");
  if (!existsSync(htmlPath)) {
    // Generate on-the-fly
    const dir = join(DATA_DIR, req.params.slug);
    const meta = JSON.parse(readFileSync(join(dir, "meta.json"), "utf-8"));
    const offerMd = readFileSync(join(dir, "offer.md"), "utf-8");
    const html = markdownToEmailHtml(offerMd, meta.domain);
    res.type("html").send(html);
    return;
  }
  res.type("html").send(readFileSync(htmlPath, "utf-8"));
});

// Convert offer markdown to professional email HTML
function markdownToEmailHtml(md, domain) {
  // Simple markdown → HTML conversion for email
  let html = md
    // Headers
    .replace(/^#### (.+)$/gm, '<h4 style="color:#222;margin:16px 0 8px;">$1</h4>')
    .replace(/^### (.+)$/gm, '<h3 style="color:#222;font-size:18px;margin:20px 0 10px;">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="color:#FE3200;font-size:22px;margin:30px 0 12px;padding-top:20px;border-top:1px solid #eee;">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="color:#222;font-size:28px;margin-bottom:5px;">$1</h1>')
    .replace(/^> (.+)$/gm, '<p style="color:#666;font-size:18px;font-style:italic;margin:0 0 20px;">$1</p>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #eee;margin:25px 0;">')
    // Tables
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split("|").filter(Boolean).map((c) => c.trim());
      if (cells.every((c) => /^[-:]+$/.test(c))) return ""; // separator row
      const isHeader = match.includes("Fraza") || match.includes("Pozycja") || match.includes("Wyszukiwań");
      const tag = isHeader ? "th" : "td";
      const style = isHeader
        ? 'style="background:#f8f8f8;padding:8px 12px;text-align:left;font-size:13px;border-bottom:2px solid #ddd;"'
        : 'style="padding:8px 12px;border-bottom:1px solid #eee;font-size:13px;"';
      return `<tr>${cells.map((c) => `<${tag} ${style}>${c.replace("❌", "🔴")}</${tag}>`).join("")}</tr>`;
    })
    // Paragraphs
    .replace(/^(?!<[htp12345roui]|$)(.+)$/gm, '<p style="color:#444;line-height:1.6;margin:8px 0;">$1</p>')
    // Empty lines
    .replace(/\n{2,}/g, "\n");

  // Wrap tables
  html = html.replace(/<tr>/g, (match, offset) => {
    const before = html.substring(Math.max(0, offset - 100), offset);
    if (!before.includes("<table")) {
      return '<table style="width:100%;border-collapse:collapse;margin:15px 0;font-family:monospace;" cellpadding="0" cellspacing="0"><tr>';
    }
    return match;
  });
  // Close tables (before next h2 or hr)
  html = html.replace(/<\/tr>\s*(?=<[hp]|<hr|$)/g, "</tr></table>");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Segoe UI',Arial,sans-serif;">
<div style="max-width:700px;margin:20px auto;background:white;border-radius:8px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
  <div style="background:#222;padding:20px 30px;">
    <img src="https://double-digital.pl/wp-content/uploads/2023/01/dd-logo-white.png" alt="Double Digital" style="height:30px;" onerror="this.outerHTML='<span style=color:white;font-size:20px;font-weight:bold>Double Digital</span>'">
  </div>
  <div style="padding:30px;">
    ${html}
  </div>
  <div style="background:#f8f8f8;padding:20px 30px;text-align:center;font-size:12px;color:#999;">
    Double Digital · kontakt@double-digital.pl · double-digital.pl
  </div>
</div>
</body>
</html>`;
}

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
