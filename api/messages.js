// Public message wall for the Exam Kuppi Portal (Vercel serverless function).
// Storage: Upstash Redis through its REST API, connected from the Vercel dashboard
// (Storage tab). Env vars used: KV_REST_API_URL + KV_REST_API_TOKEN
// (or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN) and ADMIN_KEY (moderator password).
//
//   GET    /api/messages            -> { messages: [{ id, text, name, ts }] }   (newest first)
//   POST   /api/messages            -> { text, name?, hp? }                      (anyone)
//   DELETE /api/messages?id=...     -> header x-admin-key: <ADMIN_KEY>           (moderator only)

const crypto = require("crypto");

const REST_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const LIST = "lws:messages";
const KEEP = 200;      // newest messages kept
const SHOW = 100;      // newest messages returned
const RATE_SECONDS = 45;

const EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE = /(?:\+94|\b0)7\d[ -]?\d{3}[ -]?\d{4}|\d{9,}/;

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

function ipHash(req) {
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").split(",")[0].trim();
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 24);
}

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

function isAdmin(req) {
  const want = process.env.ADMIN_KEY, got = req.headers["x-admin-key"];
  if (!want || !got) return false;
  const a = crypto.createHash("sha256").update(String(want)).digest();
  const b = crypto.createHash("sha256").update(String(got)).digest();
  return crypto.timingSafeEqual(a, b);
}

const shape = (m) => ({ id: m.id, text: m.t, name: m.n || "", ts: m.ts });

module.exports = async (req, res) => {
  if (!REST_URL || !REST_TOKEN) {
    return send(res, 503, { error: "not_configured", message: "The message board is not set up yet." });
  }
  try {
    if (req.method === "GET") {
      const [rows] = await redis([["LRANGE", LIST, 0, SHOW - 1]]);
      const messages = rows.map((s) => { try { return shape(JSON.parse(s)); } catch { return null; } }).filter(Boolean);
      return send(res, 200, { messages });
    }

    if (!sameOrigin(req)) return send(res, 403, { error: "origin", message: "Not allowed." });

    if (req.method === "POST") {
      const b = bodyOf(req);
      if (b.hp) return send(res, 200, { ok: true, message: null }); // honeypot: pretend success
      const text = clean(b.text, 1000);
      const name = clean(b.name, 40).replace(/\n/g, " ");
      if (text.length < 5) return send(res, 400, { error: "short", message: "Please write a little more, at least a few words." });
      if (EMAIL.test(text) || PHONE.test(text) || EMAIL.test(name) || PHONE.test(name)) {
        return send(res, 400, { error: "private", message: "Messages are public. Please remove phone numbers and email addresses." });
      }
      const [ok] = await redis([["SET", "lws:rl:" + ipHash(req), "1", "EX", RATE_SECONDS, "NX"]]);
      if (ok !== "OK") return send(res, 429, { error: "rate", message: "Please wait a little before sending another message." });
      const msg = { id: Date.now().toString(36) + crypto.randomBytes(3).toString("hex"), t: text, n: name, ts: Date.now() };
      await redis([["LPUSH", LIST, JSON.stringify(msg)], ["LTRIM", LIST, 0, KEEP - 1]]);
      return send(res, 200, { ok: true, message: shape(msg) });
    }

    if (req.method === "DELETE") {
      const [gate] = await redis([["SET", "lws:adm:" + ipHash(req), "1", "EX", 2, "NX"]]);
      if (gate !== "OK") return send(res, 429, { error: "rate", message: "Slow down." });
      if (!process.env.ADMIN_KEY) return send(res, 501, { error: "no_admin", message: "Moderator password is not set on the server." });
      if (!isAdmin(req)) return send(res, 401, { error: "auth", message: "Wrong moderator password." });
      const id = new URL(req.url, "http://x").searchParams.get("id") || "";
      const [rows] = await redis([["LRANGE", LIST, 0, KEEP - 1]]);
      const hit = rows.find((s) => { try { return JSON.parse(s).id === id; } catch { return false; } });
      if (!hit) return send(res, 404, { error: "missing", message: "Message not found." });
      await redis([["LREM", LIST, 1, hit]]);
      return send(res, 200, { ok: true });
    }

    res.setHeader("Allow", "GET, POST, DELETE");
    return send(res, 405, { error: "method", message: "Method not allowed." });
  } catch (e) {
    return send(res, 500, { error: "server", message: "Something went wrong. Please try again." });
  }
};
