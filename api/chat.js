// Visitor side of the WhatsApp-backed chat (Vercel serverless function).
//
//   POST /api/chat   { sid, text, name?, contact?, page?, hp? }  -> stores the message and forwards it to Sachi's WhatsApp
//   GET  /api/chat?sid=<id>&after=<ts>                           -> { messages: [{ id, r: "v"|"s", t, ts }] } for that visitor only
//
// "sid" is a random 128-bit id created in the visitor's browser, so a conversation can only be read by whoever holds it.
// Sachi's replies come in through /api/whatsapp and are added to the same conversation.

const L = require("./_lib/wa-chat");

const SHOW = (page) => String(page || "").replace(/^https?:\/\/[^/]+/, "").slice(0, 60) || "/";

module.exports = async (req, res) => {
  const c = L.cfg();
  if (!c.redis || !c.wa) {
    return L.send(res, 503, { error: "not_configured", message: "Live chat is not set up yet." });
  }
  try {
    if (req.method === "GET") {
      const q = new URL(req.url, "http://x").searchParams;
      const sid = q.get("sid") || "";
      if (!L.SID.test(sid)) return L.send(res, 400, { error: "sid", message: "Bad session." });
      const after = Number(q.get("after")) || 0;
      return L.send(res, 200, { messages: await L.getMessages(sid, after) });
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", "GET, POST");
      return L.send(res, 405, { error: "method", message: "Method not allowed." });
    }
    if (!L.sameOrigin(req)) return L.send(res, 403, { error: "origin", message: "Not allowed." });

    const b = L.bodyOf(req);
    if (b.hp) return L.send(res, 200, { ok: true });                         // honeypot: pretend success
    const sid = String(b.sid || "");
    if (!L.SID.test(sid)) return L.send(res, 400, { error: "sid", message: "Bad session." });
    const text = L.clean(b.text, 1000);
    if (text.length < 2) return L.send(res, 400, { error: "short", message: "Please write a little more." });
    const name = L.clean(b.name, 40).replace(/\n/g, " ");
    const contact = L.clean(b.contact, 80).replace(/\n/g, " ");
    const page = SHOW(b.page);

    // rate limits: one message every 4 s per visitor, 40 per hour per IP
    const ip = L.ipHash(req);
    const [gap, n] = await L.redis([
      ["SET", "lws:c:gap:" + sid, "1", "EX", 4, "NX"],
      ["INCR", "lws:c:rl:" + ip],
    ]);
    if (n === 1) await L.redis([["EXPIRE", "lws:c:rl:" + ip, 3600]]);
    if (gap !== "OK") return L.send(res, 429, { error: "rate", message: "Please wait a few seconds before sending another message." });
    if (n > 40) return L.send(res, 429, { error: "rate", message: "Too many messages. Please try again later." });

    const code = L.codeOf(sid);
    const msg = await L.addMessage(sid, "v", text);

    // forward to Sachi's WhatsApp: first line identifies the visitor, quoted-reply routes the answer back
    const head = `💬 *#${code}*${name ? " · " + name : ""} · ${page}`;
    const lines = [head, text];
    if (contact) lines.push(`📇 ${contact}`);
    lines.push("", "_Swipe → Reply on this message to answer. Your reply appears in the website chat._");
    const body = lines.join("\n");

    let wamid;
    try {
      wamid = await L.waText(process.env.WHATSAPP_OWNER, body);
    } catch (e) {
      // 131047 = the 24 h customer-service window is closed: use the approved template if there is one
      if (process.env.WHATSAPP_TEMPLATE) {
        try { wamid = await L.waTemplate(process.env.WHATSAPP_OWNER, `#${code}${name ? " " + name : ""}: ${text}`); } catch (e2) { e = e2; }
      }
      if (!wamid) {
        return L.send(res, 502, { error: "whatsapp", message: "Could not reach WhatsApp right now.", stored: true, id: msg.id });
      }
    }

    await L.redis([
      ["SET", "lws:c:wa:" + wamid, sid, "EX", L.TTL],
      ["SET", "lws:c:code:" + code, sid, "EX", L.TTL],
      ["SET", "lws:c:last", sid, "EX", L.TTL],
    ]);
    return L.send(res, 200, { ok: true, id: msg.id, ts: msg.ts });
  } catch (e) {
    return L.send(res, 500, { error: "server", message: "Something went wrong. Please try again." });
  }
};
