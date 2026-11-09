// Referral sheets: anyone can upload a PDF and everyone can preview and download it. Only the uploader's browser
// (via a code kept in localStorage) or the moderator can delete a sheet.
// Storage: Upstash Redis (the store connected in the Vercel dashboard), files are kept as base64 chunks.
// Env: KV_REST_API_URL + KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
//      ADMIN_KEY (optional moderator password that can delete any sheet)
//
//   GET    /api/referrals                      -> { sheets: [...] }                    (newest first)
//   GET    /api/referrals?id=ID&chunk=N        -> { data }                             (base64 piece N of the file)
//   POST   /api/referrals {action:"start"}     -> { id, v, chunks, chunkSize, editKey }
//   POST   /api/referrals {action:"chunk"}     -> { ok }
//   POST   /api/referrals {action:"finish"}    -> { ok, sheet }
//   DELETE /api/referrals?id=ID                -> header x-edit-key or x-admin-key

const crypto = require("crypto");

const REST_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const LIST = "lws:ref:list";
const META = (id) => "lws:ref:m:" + id;
const PEND = (id, v) => `lws:ref:p:${id}:${v}`;
const CHUNK_KEY = (id, v, i) => `lws:ref:c:${id}:${v}:${i}`;
const CHUNK = 480 * 1024;            // raw bytes per piece (about 640 KB as base64, under the 1 MB request limit)
const MAX_BYTES = 6 * 1024 * 1024;   // 6 MB per file
const MAX_SHEETS = 40;
const ID = /^[a-f0-9]{20}$/;

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

const sha = (s) => crypto.createHash("sha256").update(String(s)).digest("hex");
const same = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };

function clean(value, max) {
  return String(value == null ? "" : value).replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}
function ipHash(req) {
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").split(",")[0].trim();
  return sha(ip).slice(0, 24);
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
const isAdmin = (req) => !!process.env.ADMIN_KEY && !!req.headers["x-admin-key"] && same(sha(process.env.ADMIN_KEY), sha(req.headers["x-admin-key"]));
const canEdit = (meta, key, req) => isAdmin(req) || (!!key && !!meta.k && same(meta.k, sha(key)));
const publicMeta = (m) => ({ id: m.id, title: m.title, by: m.by || "", module: m.module || "", name: m.name, size: m.size, chunks: m.chunks, v: m.v, ts: m.ts });
const parse = (s) => { try { return JSON.parse(s); } catch { return null; } };

async function getMeta(id) {
  if (!ID.test(String(id || ""))) return null;
  const [raw] = await redis([["GET", META(id)]]);
  return raw ? parse(raw) : null;
}

module.exports = async (req, res) => {
  if (!REST_URL || !REST_TOKEN) return send(res, 503, { error: "not_configured", message: "Referral sheets are not set up yet." });
  try {
    const url = new URL(req.url, "http://x");

    if (req.method === "GET") {
      const id = url.searchParams.get("id");
      if (id) {
        const meta = await getMeta(id);
        const i = Number(url.searchParams.get("chunk"));
        if (!meta || !Number.isInteger(i) || i < 0 || i >= meta.chunks) return send(res, 404, { error: "missing", message: "File not found." });
        const [data] = await redis([["GET", CHUNK_KEY(id, meta.v, i)]]);
        if (!data) return send(res, 404, { error: "missing", message: "File not found." });
        return send(res, 200, { data, v: meta.v });
      }
      const [ids] = await redis([["LRANGE", LIST, 0, MAX_SHEETS - 1]]);
      const metas = ids.length ? (await redis(ids.map((x) => ["GET", META(x)]))).map((r) => (r ? parse(r) : null)).filter(Boolean) : [];
      return send(res, 200, { sheets: metas.map(publicMeta), max: MAX_BYTES });
    }

    if (!sameOrigin(req)) return send(res, 403, { error: "origin", message: "Not allowed." });

    if (req.method === "POST") {
      const b = bodyOf(req);
      const action = String(b.action || "");

      if (action === "start") {
        const title = clean(b.title, 80), by = clean(b.by, 40), name = clean(b.name, 100), module = clean(b.module, 12).toLowerCase();
        const size = Number(b.size);
        if (title.length < 2) return send(res, 400, { error: "title", message: "Please give the sheet a title." });
        if (!/\.pdf$/i.test(name)) return send(res, 400, { error: "type", message: "Only PDF files are allowed." });
        if (!Number.isFinite(size) || size < 1 || size > MAX_BYTES) return send(res, 400, { error: "size", message: "The file must be a PDF of 6 MB or less." });
        const [ok] = await redis([["SET", "lws:ref:rl:" + ipHash(req), "1", "EX", 15, "NX"]]);
        if (ok !== "OK") return send(res, 429, { error: "rate", message: "Please wait a few seconds before uploading again." });
        const [n] = await redis([["LLEN", LIST]]);
        if (n >= MAX_SHEETS) return send(res, 409, { error: "full", message: "The shelf is full. Ask the admin to remove an old sheet." });
        const id = crypto.randomBytes(10).toString("hex"), key = crypto.randomBytes(8).toString("hex"), k = sha(key), v = 1;
        const chunks = Math.ceil(size / CHUNK);
        await redis([["SET", PEND(id, v), JSON.stringify({ title, by, name, module, size, chunks, k }), "EX", 3600]]);
        return send(res, 200, { id, v, chunks, chunkSize: CHUNK, editKey: key });
      }

      if (action === "chunk" || action === "finish") {
        const id = String(b.id || ""), v = Number(b.v);
        if (!ID.test(id) || !Number.isInteger(v) || v < 1) return send(res, 400, { error: "bad", message: "Bad request." });
        const [raw] = await redis([["GET", PEND(id, v)]]);
        const pend = raw ? parse(raw) : null;
        if (!pend) return send(res, 404, { error: "expired", message: "The upload expired. Please start again." });
        if (!b.editKey || !same(pend.k, sha(b.editKey))) return send(res, 403, { error: "auth", message: "Wrong edit code." });

        if (action === "chunk") {
          const i = Number(b.i), data = String(b.data || "");
          if (!Number.isInteger(i) || i < 0 || i >= pend.chunks || !/^[A-Za-z0-9+/=]+$/.test(data) || data.length > Math.ceil(CHUNK / 3) * 4 + 8) return send(res, 400, { error: "bad", message: "Bad piece." });
          await redis([["SET", CHUNK_KEY(id, v, i), data, "EX", 3600]]);
          return send(res, 200, { ok: true });
        }

        const keys = Array.from({ length: pend.chunks }, (_, i) => CHUNK_KEY(id, v, i));
        const lens = await redis(keys.map((x) => ["STRLEN", x]));
        if (lens.some((n) => !n)) return send(res, 400, { error: "incomplete", message: "The upload is incomplete. Please try again." });
        const size = lens.reduce((t, n) => t + Math.floor(n * 3 / 4), 0);
        const [first] = await redis([["GET", keys[0]]]);
        if (Buffer.from(first.slice(0, 8), "base64").subarray(0, 5).toString("latin1") !== "%PDF-") {
          await redis(keys.map((x) => ["DEL", x]).concat([["DEL", PEND(id, v)]]));
          return send(res, 400, { error: "type", message: "That file is not a PDF." });
        }
        const meta = { id, title: pend.title, by: pend.by, name: pend.name, module: pend.module, size, chunks: pend.chunks, v, ts: Date.now(), k: pend.k };
        const cmds = keys.map((x) => ["PERSIST", x]).concat([["SET", META(id), JSON.stringify(meta)], ["DEL", PEND(id, v)], ["LPUSH", LIST, id]]);
        await redis(cmds);
        return send(res, 200, { ok: true, sheet: publicMeta(meta) });
      }

      return send(res, 400, { error: "bad", message: "Unknown action." });
    }

    if (req.method === "DELETE") {
      const meta = await getMeta(url.searchParams.get("id"));
      if (!meta) return send(res, 404, { error: "missing", message: "That sheet no longer exists." });
      if (!canEdit(meta, req.headers["x-edit-key"], req)) return send(res, 403, { error: "auth", message: "Wrong edit code." });
      const cmds = [["DEL", META(meta.id)], ["LREM", LIST, 0, meta.id]];
      for (let i = 0; i < meta.chunks; i++) cmds.push(["DEL", CHUNK_KEY(meta.id, meta.v, i)]);
      await redis(cmds);
      return send(res, 200, { ok: true });
    }

    res.setHeader("Allow", "GET, POST, DELETE");
    return send(res, 405, { error: "method", message: "Method not allowed." });
  } catch (e) {
    return send(res, 500, { error: "server", message: "Something went wrong. Please try again." });
  }
};
