/**
 * LLM provider abstraction — OpenRouter (default) or Gemini fallback
 */

export async function callLLM(prompt, { json = false, maxTokens = 8000 } = {}) {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  let result;
  if (openRouterKey) {
    result = await callOpenRouter(prompt, { json, maxTokens, apiKey: openRouterKey });
  } else if (geminiKey) {
    result = await callGemini(prompt, { json, maxTokens, apiKey: geminiKey });
  } else {
    throw new Error("No LLM API key found (OPENROUTER_API_KEY or GEMINI_API_KEY)");
  }

  // Strip markdown code fences that LLMs often add
  if (json) {
    result = result.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
  }
  return result;
}

async function callOpenRouter(prompt, { json, maxTokens, apiKey }) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://double-digital.pl",
    },
    body: JSON.stringify({
      model: "anthropic/claude-sonnet-4",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
      ...(json ? { response_format: { type: "json_object" } } : {}),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

async function callGemini(prompt, { json, maxTokens, apiKey }) {
  const model = "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: maxTokens,
        ...(json ? { responseMimeType: "application/json" } : {}),
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}
