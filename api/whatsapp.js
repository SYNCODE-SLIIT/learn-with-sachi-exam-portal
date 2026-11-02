// WhatsApp Cloud API webhook (Vercel serverless function). Sachi's replies arrive here and are
// added to the matching website conversation.
//
//   GET  /api/whatsapp   Meta's webhook verification (hub.mode / hub.verify_token / hub.challenge)
//   POST /api/whatsapp   incoming WhatsApp events; only text messages from WHATSAPP_OWNER are used
//
// How a reply finds its visitor (in order):
//   1. Sachi swipes → Reply on the forwarded message: WhatsApp tells us which message was quoted (context.id).
//   2. The reply starts with the visitor code, e.g. "#A7F2C thanks, here are the notes".
//   3. Otherwise it goes to the most recent visitor, and Sachi gets a short note saying which chat it went to.

const crypto = require("crypto");
const L = require("./_lib/wa-chat");

function raw(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function signatureOk(buf, header) {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret) return true;                                  // not configured: accept (set it in production)
  if (!header || !header.startsWith("sha256=")) return false;
  const want = crypto.createHmac("sha256", secret).update(buf).digest("hex");
  const got = header.slice(7);
  return want.length === got.length && crypto.timingSafeEqual(Buffer.from(want), Buffer.from(got));
}

async function handler(req, res) {
  if (req.method === "GET") {
    const q = new URL(req.url, "http://x").searchParams;
    if (q.get("hub.mode") === "subscribe" && process.env.WHATSAPP_VERIFY_TOKEN && q.get("hub.verify_token") === process.env.WHATSAPP_VERIFY_TOKEN) {
      res.statusCode = 200; res.setHeader("Content-Type", "text/plain");
      return res.end(q.get("hub.challenge") || "");
    }
    res.statusCode = 403; return res.end("Forbidden");
  }
  if (req.method !== "POST") { res.statusCode = 405; return res.end(); }

  const c = L.cfg();
  let buf;
  try { buf = await raw(req); } catch { res.statusCode = 400; return res.end(); }
  if (!signatureOk(buf, req.headers["x-hub-signature-256"])) { res.statusCode = 401; return res.end(); }
  if (!c.redis || !c.wa) { res.statusCode = 200; return res.end("ok"); }

  let data = {};
  try { data = JSON.parse(buf.toString("utf8") || "{}"); } catch { /* ignore */ }

  try {
    const owner = String(process.env.WHATSAPP_OWNER).replace(/\D/g, "");
    for (const entry of data.entry || []) {
      for (const ch of entry.changes || []) {
        for (const m of (ch.value && ch.value.messages) || []) {
          if (String(m.from).replace(/\D/g, "") !== owner) continue;          // only Sachi can answer
          if (m.type !== "text" || !m.text || !m.text.body) continue;
          const [first] = await L.redis([["SET", "lws:c:seen:" + m.id, "1", "EX", 86400, "NX"]]);
          if (first !== "OK") continue;                                        // Meta retried this event

          let sid = null, text = L.clean(m.text.body, 1000), viaFallback = false;
          if (m.context && m.context.id) {
            const [s] = await L.redis([["GET", "lws:c:wa:" + m.context.id]]);
            sid = s || null;
          }
          if (!sid) {
            const tag = /^#([A-Za-z0-9]{5})\b[\s:,-]*/.exec(text);
            if (tag) {
              const [s] = await L.redis([["GET", "lws:c:code:" + tag[1].toUpperCase()]]);
              if (s) { sid = s; text = text.slice(tag[0].length).trim(); }
            }
          }
          if (!sid) {
            const [s] = await L.redis([["GET", "lws:c:last"]]);
            sid = s || null; viaFallback = !!sid;
          }
          if (!sid || !text) continue;

          await L.addMessage(sid, "s", text);
          if (viaFallback) {
            try { await L.waText(owner, `Sent to chat #${L.codeOf(sid)} (the most recent visitor). Tip: swipe → Reply on a message, or start with #CODE, to choose the chat.`); } catch { /* ignore */ }
          }
        }
      }
    }
  } catch (e) { /* always answer 200 so Meta does not keep retrying */ }

  res.statusCode = 200;
  res.end("ok");
}

module.exports = handler;
module.exports.config = { api: { bodyParser: false } };   // raw body is needed to check Meta's signature
