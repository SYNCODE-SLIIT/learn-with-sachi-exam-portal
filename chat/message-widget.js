/* Message Sachi: a floating chat shown on every page of the portal.
   Visitor messages go to Sachi's WhatsApp (through /api/chat -> WhatsApp Cloud API). Sachi replies in WhatsApp
   and the reply appears in this chat. Students are never asked for an email, phone or name (the widget polls /api/chat). If live chat is not switched on, or WhatsApp
   cannot be reached, the message is emailed to Sachi through Web3Forms instead (one way, no replies here).
   The Web3Forms key is a public form key: it only allows sending to Sachi's inbox. */
(function () {
  'use strict';
  if (window.__lwsChat) return;
  window.__lwsChat = true;

  var MAIL_KEY = 'eba312cf-1c03-466c-b5ef-5a9d8ab4c083';
  var STORE = 'lws_chat_v2', SID_KEY = 'lws_sid', SEEN = 'lws_chat_seen';
  var KEEP = 60;                 // messages remembered in this browser
  var POLL_OPEN = 4000, POLL_CLOSED = 25000;

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage may be blocked */ } }
  };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  function newSid() {
    var a = new Uint8Array(16), s = '';
    if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(a); else for (var i = 0; i < 16; i++) a[i] = Math.floor(Math.random() * 256);
    for (var j = 0; j < 16; j++) s += ('0' + a[j].toString(16)).slice(-2);
    return s;
  }
  var sid = store.get(SID_KEY, '');
  if (!/^[a-f0-9]{32}$/.test(sid)) { sid = newSid(); store.set(SID_KEY, sid); }

  /* ---------- styles ---------- */
  var css = '' +
  '.lwsc-btn{position:fixed;right:clamp(14px,2.2vw,28px);bottom:clamp(14px,2.2vw,28px);z-index:800;display:flex;align-items:center;gap:10px;height:56px;padding:0 20px 0 16px;background:#000;color:#ffd400;border:2px solid #ffd400;border-radius:999px;font:700 15px/1 "Segoe UI",system-ui,sans-serif;letter-spacing:.2px;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.45);transition:transform .2s,box-shadow .2s,background .2s}' +
  '.lwsc-btn:hover{transform:translateY(-3px);background:#141414;box-shadow:0 14px 34px rgba(0,0,0,.55)}' +
  '.lwsc-btn svg{width:26px;height:26px;flex:none}' +
  '.lwsc-dot{position:absolute;top:-5px;right:-3px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:#ff4d4d;color:#fff;border:2px solid #000;font:800 11px/16px "Segoe UI",system-ui,sans-serif;text-align:center;display:none}' +
  '.lwsc-dot.on{display:block}' +
  '.lwsc-btn.pulse::after{content:"";position:absolute;inset:-6px;border-radius:999px;border:2px solid #ffd400;opacity:0;animation:lwscp 2.4s ease-out 3}' +
  '@keyframes lwscp{0%{opacity:.8;transform:scale(.96)}100%{opacity:0;transform:scale(1.18)}}' +
  '.lwsc-panel{position:fixed;right:clamp(14px,2.2vw,28px);bottom:calc(clamp(14px,2.2vw,28px) + 70px);z-index:850;width:min(380px,calc(100vw - 28px));height:min(560px,calc(100vh - 120px));display:none;flex-direction:column;background:#0d0d0d;color:#f4f4f4;border:1px solid #3c3c3c;border-top:4px solid #ffd400;border-radius:14px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.7);font:14.5px/1.5 "Segoe UI",system-ui,sans-serif}' +
  '.lwsc-panel.on{display:flex;animation:lwscin .28s cubic-bezier(.2,.8,.2,1)}' +
  '@keyframes lwscin{from{opacity:0;transform:translateY(18px) scale(.98)}to{opacity:1;transform:none}}' +
  '.lwsc-head{display:flex;align-items:center;gap:12px;padding:14px 16px;background:#141414;border-bottom:1px solid #2a2a2a}' +
  '.lwsc-av{width:42px;height:42px;border-radius:50%;background:#ffd400;color:#000;display:grid;place-items:center;font-weight:800;font-size:19px;flex:none}' +
  '.lwsc-head b{display:block;font-size:16px;line-height:1.2}' +
  '.lwsc-head small{display:flex;align-items:center;gap:6px;color:#a6a6a6;font-size:12px}' +
  '.lwsc-head small::before{content:"";width:8px;height:8px;border-radius:50%;background:#3ddc84}' +
  '.lwsc-x{margin-left:auto;width:34px;height:34px;border:1px solid #3c3c3c;background:none;color:#a6a6a6;border-radius:8px;font-size:18px;cursor:pointer;line-height:1}' +
  '.lwsc-x:hover{border-color:#ffd400;color:#ffd400}' +
  '.lwsc-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:radial-gradient(rgba(255,212,0,.06) 1.2px,transparent 1.3px) 0 0/22px 22px,#0a0a0a}' +
  '.lwsc-m{max-width:84%;padding:10px 14px;border-radius:16px;word-wrap:break-word;white-space:pre-wrap;animation:lwscm .25s ease}' +
  '@keyframes lwscm{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}' +
  '.lwsc-m.bot{align-self:flex-start;background:#1b1b1b;border:1px solid #2a2a2a;border-bottom-left-radius:4px;color:#d6d6d6}' +
  '.lwsc-m.sachi{align-self:flex-start;background:#1f1a00;border:1px solid #6f5b00;border-bottom-left-radius:4px}' +
  '.lwsc-m.sachi .lwsc-tag{display:block;font:800 11px/1 "Segoe UI",system-ui,sans-serif;letter-spacing:.8px;text-transform:uppercase;color:#ffd400;margin-bottom:5px}' +
  '.lwsc-m.me{align-self:flex-end;background:#ffd400;color:#000;border-bottom-right-radius:4px;font-weight:500}' +
  '.lwsc-m.me.pend{opacity:.6}' +
  '.lwsc-m.err{align-self:flex-start;background:#2a1212;border:1px solid #7a2a2a;color:#ffb3b3;border-bottom-left-radius:4px}' +
  '.lwsc-time{display:block;margin-top:4px;font-size:11px;opacity:.6;font-weight:400}' +
  '.lwsc-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:2px}' +
  '.lwsc-chip{padding:7px 12px;border:1px solid #ffd400;background:transparent;color:#ffd400;border-radius:999px;font:600 13px/1 "Segoe UI",system-ui,sans-serif;cursor:pointer}' +
  '.lwsc-chip:hover{background:#ffd400;color:#000}' +
  '.lwsc-foot{border-top:1px solid #2a2a2a;background:#111;padding:10px 12px 12px}' +
  '.lwsc-opt{display:none;gap:8px;margin-bottom:8px}.lwsc-opt.on{display:flex}' +
  '.lwsc-opt input{flex:1;min-width:0;background:#1b1b1b;border:1px solid #3c3c3c;color:#f4f4f4;border-radius:8px;padding:8px 10px;font:13px "Segoe UI",system-ui,sans-serif}' +
  '.lwsc-opt input:focus,.lwsc-row textarea:focus{outline:2px solid #ffd400;outline-offset:0;border-color:#ffd400}' +
  '.lwsc-row{display:flex;gap:8px;align-items:flex-end}' +
  '.lwsc-row textarea{flex:1;resize:none;max-height:110px;min-height:42px;background:#1b1b1b;border:1px solid #3c3c3c;color:#f4f4f4;border-radius:12px;padding:10px 12px;font:14.5px/1.4 "Segoe UI",system-ui,sans-serif}' +
  '.lwsc-send{width:44px;height:44px;flex:none;border:0;border-radius:50%;background:#ffd400;color:#000;display:grid;place-items:center;cursor:pointer;transition:transform .15s,opacity .15s}' +
  '.lwsc-send:hover{transform:scale(1.07)}.lwsc-send[disabled]{opacity:.45;cursor:not-allowed;transform:none}' +
  '.lwsc-send svg{width:20px;height:20px}' +
  '.lwsc-note{display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:11.5px;color:#8a8a8a}' +
  '.lwsc-note a,.lwsc-note button{background:none;border:0;color:#ffd400;cursor:pointer;font:600 11.5px "Segoe UI",system-ui,sans-serif;padding:0;text-decoration:none;white-space:nowrap}' +
  '.lwsc-note a:hover,.lwsc-note button:hover{text-decoration:underline}' +
  '.lwsc-hp{position:absolute;left:-9999px;opacity:0;height:0;width:0}' +
  '@media (max-width:560px){.lwsc-btn{height:54px;padding:0 15px}.lwsc-btn span{display:none}.lwsc-panel{right:0;left:0;bottom:0;width:100%;height:82vh;border-radius:16px 16px 0 0;max-height:none}}' +
  '@media (prefers-reduced-motion:reduce){.lwsc-btn.pulse::after,.lwsc-panel.on,.lwsc-m{animation:none}}' +
  '@media print{.lwsc-btn,.lwsc-panel{display:none!important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- markup ---------- */
  var chatIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.7 8.7 0 0 1-3.6-.8L3 21l1.9-4.9A8.4 8.4 0 1 1 21 11.5z"/><path d="M8.5 10.5h7M8.5 14h4"/></svg>';
  var sendIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>';

  var btn = document.createElement('button');
  btn.className = 'lwsc-btn pulse'; btn.type = 'button'; btn.setAttribute('aria-label', 'Message Sachi'); btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = chatIcon + '<span>Message Sachi</span><i class="lwsc-dot" id="lwscDot"></i>';

  var panel = document.createElement('div');
  panel.className = 'lwsc-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Message Sachi');
  panel.innerHTML =
    '<div class="lwsc-head"><div class="lwsc-av">S</div><div><b>Sachi</b><small>Chat with me. My replies appear here.</small></div><button class="lwsc-x" type="button" aria-label="Close chat">&#10005;</button></div>' +
    '<div class="lwsc-body" id="lwscBody" aria-live="polite"></div>' +
    '<form class="lwsc-foot" id="lwscForm" autocomplete="off">' +
      '<input class="lwsc-hp" id="lwscHp" tabindex="-1" aria-hidden="true">' +
      '<div class="lwsc-row"><textarea id="lwscText" rows="1" maxlength="1000" placeholder="Type your message..." aria-label="Your message"></textarea>' +
      '<button class="lwsc-send" id="lwscSend" type="submit" aria-label="Send message">' + sendIcon + '</button></div>' +
      '<div class="lwsc-note"><span>Your message goes straight to Sachi’s WhatsApp.</span></div>' +
    '</form>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var body = panel.querySelector('#lwscBody'), form = panel.querySelector('#lwscForm'), text = panel.querySelector('#lwscText'),
      send = panel.querySelector('#lwscSend'),
      dot = btn.querySelector('#lwscDot');

  /* ---------- conversation state ---------- */
  var log = store.get(STORE, []);           // [{ id, r: 'v'|'s'|'b', t, ts }]  v = visitor, s = Sachi, b = note from the widget
  var live = true;                          // false once the server says live chat is not set up
  var busy = false, timer = null;
  var lastTs = function () { var t = 0; log.forEach(function (m) { if (m.src !== 'local' && m.src !== 'email' && m.ts > t) t = m.ts; }); return t; };   // server clock only
  function save() { log = log.slice(-KEEP); store.set(STORE, log); }
  function has(id) { return log.some(function (m) { return m.id === id; }); }
  function clock(ts) { var d = new Date(ts); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }

  function node(m, extra) {
    var d = document.createElement('div');
    var k = m.r === 'v' ? 'me' : m.r === 's' ? 'sachi' : 'bot';
    d.className = 'lwsc-m ' + k + (extra ? ' ' + extra : '');
    d.innerHTML = (k === 'sachi' ? '<span class="lwsc-tag">Sachi</span>' : '') + esc(m.t) + (k !== 'bot' && m.ts ? '<span class="lwsc-time">' + clock(m.ts) + '</span>' : '');
    return d;
  }
  function render() {
    body.innerHTML = '';
    var g = document.createElement('div'); g.className = 'lwsc-m bot';
    g.textContent = 'Hi! 👋 I’m Sachi. Ask a question, request notes, report a mistake, or tell me what to cover next. Your message goes to my WhatsApp and my reply shows up right here.';
    body.appendChild(g);
    if (!log.length) {
      var c = document.createElement('div'); c.className = 'lwsc-chips';
      [['Request notes', 'Hi Sachi, could you please share notes for '], ['Report a mistake', 'Hi Sachi, I found a mistake in '], ['Ask a question', 'Hi Sachi, I have a question about '], ['Say thanks', 'Thank you Sachi for the portal!']].forEach(function (x) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'lwsc-chip'; b.textContent = x[0];
        b.onclick = function () { text.value = x[1]; text.focus(); grow(); };
        c.appendChild(b);
      });
      body.appendChild(c);
    }
    log.forEach(function (m) { body.appendChild(node(m)); });
    body.scrollTop = body.scrollHeight;
  }
  function note(html, kind) {   // temporary bubble, not saved
    var d = document.createElement('div'); d.className = 'lwsc-m ' + (kind || 'bot'); d.textContent = html;
    body.appendChild(d); body.scrollTop = body.scrollHeight; return d;
  }
  function grow() { text.style.height = 'auto'; text.style.height = Math.min(text.scrollHeight, 110) + 'px'; }

  /* ---------- unread badge ---------- */
  function unread() { var seen = store.get(SEEN, 0); return log.filter(function (m) { return m.r === 's' && m.ts > seen; }).length; }
  function badge() { var n = unread(); dot.textContent = n > 9 ? '9+' : String(n); dot.classList.toggle('on', n > 0 && !panel.classList.contains('on')); if (n > 0 && !panel.classList.contains('on')) btn.classList.add('pulse'); }
  function markSeen() { var t = Date.now(); log.forEach(function (m) { if (m.ts > t) t = m.ts; }); store.set(SEEN, t); badge(); }

  /* ---------- polling for Sachi's replies ---------- */
  function poll() {
    clearTimeout(timer);
    var open = panel.classList.contains('on');
    var wait = open ? POLL_OPEN : POLL_CLOSED;
    if (!live || !log.some(function (m) { return m.r === 'v' && m.src !== 'email'; }) || document.hidden) { timer = setTimeout(poll, wait); return; }
    fetch('/api/chat?sid=' + sid + '&after=' + lastTs(), { cache: 'no-store' })
      .then(function (r) { if (r.status === 503) { live = false; return null; } return r.ok ? r.json() : null; })
      .then(function (j) {
        if (j && j.messages) {
          var added = false;
          j.messages.forEach(function (m) { if (!has(m.id)) { log.push({ id: m.id, r: m.r, t: m.t, ts: m.ts }); added = true; } });
          if (added) { log.sort(function (a, b) { return a.ts - b.ts; }); save(); render(); if (panel.classList.contains('on')) markSeen(); else badge(); }
        }
      })
      .catch(function () { /* offline: try again later */ })
      .then(function () { timer = setTimeout(poll, wait); });
  }

  /* ---------- open / close ---------- */
  function open(on) {
    panel.classList.toggle('on', on);
    btn.setAttribute('aria-expanded', String(on));
    btn.classList.remove('pulse');
    if (on) { markSeen(); setTimeout(function () { text.focus(); }, 60); body.scrollTop = body.scrollHeight; poll(); }
  }
  btn.onclick = function () { open(!panel.classList.contains('on')); };
  panel.querySelector('.lwsc-x').onclick = function () { open(false); btn.focus(); };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('on')) { open(false); btn.focus(); } });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) poll(); });
  text.addEventListener('input', grow);
  text.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { cancelable: true })); } });

  /* ---------- sending ---------- */
  function mailFallback(msg, name, contact) {
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: MAIL_KEY, subject: 'Learn with Sachi portal: new message (email fallback)',
        from_name: name || 'Student (anonymous)', name: name || '(no name given)', contact: contact || '(no contact given)',
        page: (document.title || '') + ' | ' + location.pathname + location.hash, message: msg, botcheck: ''
      })
    }).then(function (r) { return r.json().then(function (j) { return r.ok && !!j.success; }, function () { return r.ok; }); }).catch(function () { return false; });
  }

  form.onsubmit = function (e) {
    e.preventDefault();
    if (busy) return;
    if (panel.querySelector('#lwscHp').value) return;            // honeypot
    var msg = text.value.trim();
    if (msg.length < 2) { note('Please write a little more.', 'err'); return; }
    var name = '', contact = '';        // students are never asked for contact details
    var pending = node({ r: 'v', t: msg, ts: Date.now() }, 'pend'); body.appendChild(pending); body.scrollTop = body.scrollHeight;
    text.value = ''; grow(); busy = true; send.disabled = true;

    function failBack(html) { busy = false; send.disabled = false; pending.remove(); note(html, 'err'); text.value = msg; grow(); }
    function sentOk(m, how) {
      busy = false; send.disabled = false; pending.classList.remove('pend');
      var first = !log.some(function (x) { return x.r === 'v' && Date.now() - x.ts < 12 * 3600e3; });
      log.push(m);
      if (first) {
        log.push({ id: 'b' + Date.now(), r: 'b', src: 'local', ts: m.ts + 1, t: how === 'wa'
          ? 'Got it! I’ve passed this to Sachi on WhatsApp. When Sachi replies, it will show up right here, even if you close this window.'
          : 'Sent to Sachi by email. Live replies are not switched on right now, so an answer may not appear here.' });
      }
      save(); render(); if (how === 'wa') poll();
    }

    fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sid: sid, text: msg, name: name, contact: contact, page: location.pathname + location.hash, hp: '' }) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { r: r, j: j }; }); })
      .then(function (x) {
        if (x.r.ok) return sentOk({ id: x.j.id || 'v' + Date.now(), r: 'v', t: msg, ts: x.j.ts || Date.now() }, 'wa');
        if (x.r.status === 429 || x.r.status === 400) return failBack(x.j.message || 'Please check your message and try again.');
        if (x.r.status === 503) live = false;
        return mailFallback(msg, name, contact).then(function (ok) {
          if (ok) sentOk({ id: 'e' + Date.now(), r: 'v', src: 'email', t: msg, ts: Date.now() }, 'email');
          else failBack('Sorry, the message could not be sent. Please check your connection and try again. Your text is back in the box.');
        });
      })
      .catch(function () {
        mailFallback(msg, name, contact).then(function (ok) {
          if (ok) sentOk({ id: 'e' + Date.now(), r: 'v', src: 'email', t: msg, ts: Date.now() }, 'email');
          else failBack('Sorry, the message could not be sent. Please check your connection and try again. Your text is back in the box.');
        });
      });
  };

  render(); badge();
  setTimeout(function () { btn.classList.remove('pulse'); }, 9000);
  setTimeout(poll, 1500);
})();
