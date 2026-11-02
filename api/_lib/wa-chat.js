// Shared helpers for the WhatsApp-backed chat (used by /api/chat and /api/whatsapp).
// Files whose name starts with an underscore inside api/ are not exposed as endpoints by Vercel.
//
// Storage: Upstash Redis REST API (the same store connected in the Vercel dashboard):
//   KV_REST_API_URL + KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
// WhatsApp Cloud API (Meta):
//   WHATSAPP_TOKEN, WHATSAPP_PHONE_ID, WHATSAPP_OWNER (Sachi's number, digits only, e.g. 94702911223)
//   WHATSAPP_VERIFY_TOKEN (any secret string, typed into Meta's webhook form), WHATSAPP_APP_SECRET (recommended)
//   WHATSAPP_TEMPLATE (optional approved template with ONE body variable, used when the 24 h window is closed)

const crypto = require("crypto");

const REST_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const GRAPH = "https://graph.facebook.com/v21.0";

const TTL = 60 * 60 * 24 * 14;           // conversations are kept 14 days
const KEEP = 200;                         // messages kept per conversation
const SID = /^[a-f0-9]{32}$/;

const cfg = () => ({
  redis: !!(REST_URL && REST_TOKEN),
  wa: !!(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_ID && process.env.WHATSAPP_OWNER),
});

function send(res, code, body) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

async function redis(commands) {
  const r = await fetch(REST_URL.replace(/\/$/, "") + "/pipeline", {
    method: "POST",
    headers: { Authorization: "Bearer " + REST_TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
  });
  if (!r.ok) throw new Error("redis " + r.status);
  return (await r.json()).map((x) => {
    if (x.error) throw new Error(x.error);
    return x.result;
  });
}

function clean(value, max) {
  return String(value == null ? "" : value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

const ipHash = (req) => {
  const ip = String(req.headers["x-forwarded-for"] || (req.socket && req.socket.remoteAddress) || "").split(",")[0].trim();
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 24);
};

function bodyOf(req) {
  const b = req.body;
  if (b && typeof b === "object") return b;
  try { return JSON.parse(b || "{}"); } catch { return {}; }
}

function sameOrigin(req) {
  const o = req.headers.origin;
  if (!o) return true;
  try { return new URL(o).host === req.headers.host; } catch { return false; }
}

const codeOf = (sid) => sid.slice(0, 5).toUpperCase();
const convKey = (sid) => "lws:c:" + sid;

// Append a message to a conversation, returns the stored message.
async function addMessage(sid, role, text) {
  const msg = { id: Date.now().toString(36) + crypto.randomBytes(3).toString("hex"), r: role, t: text, ts: Date.now() };
  await redis([
    ["RPUSH", convKey(sid), JSON.stringify(msg)],
    ["LTRIM", convKey(sid), -KEEP, -1],
    ["EXPIRE", convKey(sid), TTL],
  ]);
  return msg;
}

async function getMessages(sid, after) {
  const [rows] = await redis([["LRANGE", convKey(sid), 0, -1]]);
  return (rows || [])
    .map((s) => { try { return JSON.parse(s); } catch { return null; } })
    .filter((m) => m && m.ts > after);
}

// Send a WhatsApp message to Sachi through the Cloud API. Returns the wamid or throws.
async function waText(to, body) {
  const r = await fetch(`${GRAPH}/${process.env.WHATSAPP_PHONE_ID}/messages`, {
    method: "POST",
    headers: { Authorization: "Bearer " + process.env.WHATSAPP_TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { preview_url: false, body } }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error((j.error && j.error.message) || "whatsapp " + r.status); e.code = j.error && j.error.code; throw e; }
  return j.messages && j.messages[0] && j.messages[0].id;
}

// Approved template with a single {{1}} body variable (needed when the 24 h window is closed).
async function waTemplate(to, variable) {
  const r = await fetch(`${GRAPH}/${process.env.WHATSAPP_PHONE_ID}/messages`, {
    method: "POST",
    headers: { Authorization: "Bearer " + process.env.WHATSAPP_TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp", to, type: "template",
      template: { name: process.env.WHATSAPP_TEMPLATE, language: { code: process.env.WHATSAPP_TEMPLATE_LANG || "en_US" },
        components: [{ type: "body", parameters: [{ type: "text", text: variable.replace(/\s*\n+\s*/g, " / ").slice(0, 900) }] }] },
    }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((j.error && j.error.message) || "whatsapp template " + r.status);
  return j.messages && j.messages[0] && j.messages[0].id;
}

module.exports = { redis, cfg, send, clean, ipHash, bodyOf, sameOrigin, codeOf, convKey, addMessage, getMessages, waText, waTemplate, TTL, SID };
