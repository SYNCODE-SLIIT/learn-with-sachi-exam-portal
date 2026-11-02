/* Message Sachi: a floating chat-style message box shown on every page of the portal.
   Every message is emailed to Sachi through Web3Forms (https://web3forms.com). Unless the sender unticks
   "Show on the public wall", it is also posted to the public wall (api/messages.js, Upstash Redis).
   The access key below is a public form key (it only allows sending to Sachi's inbox). */
(function () {
  'use strict';
  if (window.__lwsChat) return;
  window.__lwsChat = true;

  var KEY = 'eba312cf-1c03-466c-b5ef-5a9d8ab4c083';
  var STORE = 'lws_chat_v1';
  var LAST = 'lws_chat_last';
  var WAIT = 30000;       // ms between two messages
  var KEEP = 30;          // chat bubbles remembered in this browser

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage may be blocked */ } }
  };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  /* ---------- styles ---------- */
  var css = '' +
  '.lwsc-btn{position:fixed;right:clamp(14px,2.2vw,28px);bottom:clamp(14px,2.2vw,28px);z-index:800;display:flex;align-items:center;gap:10px;height:56px;padding:0 20px 0 16px;background:#000;color:#ffd400;border:2px solid #ffd400;border-radius:999px;font:700 15px/1 "Segoe UI",system-ui,sans-serif;letter-spacing:.2px;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.45);transition:transform .2s,box-shadow .2s,background .2s}' +
  '.lwsc-btn:hover{transform:translateY(-3px);background:#141414;box-shadow:0 14px 34px rgba(0,0,0,.55)}' +
  '.lwsc-btn svg{width:26px;height:26px;flex:none}' +
  '.lwsc-btn .lwsc-dot{position:absolute;top:-4px;right:-2px;width:14px;height:14px;border-radius:50%;background:#ff4d4d;border:2px solid #000}' +
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
  '.lwsc-m.bot{align-self:flex-start;background:#1b1b1b;border:1px solid #2a2a2a;border-bottom-left-radius:4px}' +
  '.lwsc-m.me{align-self:flex-end;background:#ffd400;color:#000;border-bottom-right-radius:4px;font-weight:500}' +
  '.lwsc-m.err{align-self:flex-start;background:#2a1212;border:1px solid #7a2a2a;color:#ffb3b3;border-bottom-left-radius:4px}' +
  '.lwsc-t{align-self:flex-start;display:flex;gap:5px;padding:12px 14px;background:#1b1b1b;border:1px solid #2a2a2a;border-radius:16px;border-bottom-left-radius:4px}' +
  '.lwsc-t i{width:7px;height:7px;border-radius:50%;background:#a6a6a6;animation:lwsct 1s infinite}' +
  '.lwsc-t i:nth-child(2){animation-delay:.15s}.lwsc-t i:nth-child(3){animation-delay:.3s}' +
  '@keyframes lwsct{0%,60%,100%{opacity:.3;transform:none}30%{opacity:1;transform:translateY(-4px)}}' +
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
  '.lwsc-note button{background:none;border:0;color:#ffd400;cursor:pointer;font:600 11.5px "Segoe UI",system-ui,sans-serif;padding:0}' +
  '.lwsc-tabs{display:flex;background:#141414;border-bottom:1px solid #2a2a2a}' +
  '.lwsc-tab{flex:1;background:none;border:0;border-bottom:3px solid transparent;color:#a6a6a6;padding:10px 8px;font:700 13px/1 "Segoe UI",system-ui,sans-serif;letter-spacing:.4px;cursor:pointer}' +
  '.lwsc-tab:hover{color:#f4f4f4}.lwsc-tab.on{color:#ffd400;border-bottom-color:#ffd400}' +
  '.lwsc-tab small{font-weight:600;color:#8a8a8a;margin-left:4px}' +
  '.lwsc-wallpane{flex:1;overflow-y:auto;padding:14px;display:none;flex-direction:column;gap:10px;background:#0a0a0a}.lwsc-wallpane.on{display:flex}' +
  '.lwsc-wh{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:12px;color:#a6a6a6}' +
  '.lwsc-wh button{background:none;border:1px solid #3c3c3c;color:#ffd400;border-radius:8px;padding:5px 10px;font:600 12px "Segoe UI",system-ui,sans-serif;cursor:pointer}' +
  '.lwsc-wh button:hover{border-color:#ffd400}' +
  '.lwsc-card{background:#161616;border:1px solid #2a2a2a;border-left:3px solid #ffd400;border-radius:10px;padding:10px 12px}' +
  '.lwsc-card p{margin:0 0 6px;white-space:pre-wrap;word-wrap:break-word}' +
  '.lwsc-meta{display:flex;gap:10px;align-items:center;font-size:12px;color:#8a8a8a}.lwsc-meta b{color:#d6d6d6}' +
  '.lwsc-del{margin-left:auto;background:none;border:1px solid #7a2a2a;color:#ff8a8a;border-radius:6px;padding:2px 8px;font:600 11px "Segoe UI",system-ui,sans-serif;cursor:pointer}' +
  '.lwsc-empty{padding:26px 10px;text-align:center;color:#8a8a8a;border:1px dashed #3c3c3c;border-radius:10px}' +
  '.lwsc-mod{background:none;border:0;color:#8a8a8a;font:11.5px "Segoe UI",system-ui,sans-serif;cursor:pointer;text-decoration:underline;align-self:center;margin-top:4px}' +
  '.lwsc-pub{display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:13px;color:#d6d6d6;cursor:pointer}.lwsc-pub input{accent-color:#ffd400;width:16px;height:16px}' +
  '.lwsc-hp{position:absolute;left:-9999px;opacity:0;height:0;width:0}' +
  '@media (max-width:560px){.lwsc-btn{height:54px;padding:0 15px}.lwsc-btn span{display:none}.lwsc-panel{right:0;left:0;bottom:0;width:100%;height:82vh;border-radius:16px 16px 0 0;max-height:none}}' +
  '@media (prefers-reduced-motion:reduce){.lwsc-btn.pulse::after,.lwsc-panel.on,.lwsc-m,.lwsc-t i{animation:none}}' +
  '@media print{.lwsc-btn,.lwsc-panel{display:none!important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- markup ---------- */
  var chatIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.7 8.7 0 0 1-3.6-.8L3 21l1.9-4.9A8.4 8.4 0 1 1 21 11.5z"/><path d="M8.5 10.5h7M8.5 14h4"/></svg>';
  var sendIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>';

  var btn = document.createElement('button');
  btn.className = 'lwsc-btn pulse'; btn.type = 'button'; btn.setAttribute('aria-label', 'Message Sachi'); btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = chatIcon + '<span>Message Sachi</span>';

  var panel = document.createElement('div');
  panel.className = 'lwsc-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Message Sachi');
  panel.innerHTML =
    '<div class="lwsc-head"><div class="lwsc-av">S</div><div><b>Sachi</b><small>I read every message</small></div><button class="lwsc-x" type="button" aria-label="Close chat">&#10005;</button></div>' +
    '<div class="lwsc-tabs" role="tablist"><button class="lwsc-tab on" type="button" data-tab="chat" role="tab">Chat</button><button class="lwsc-tab" type="button" data-tab="wall" role="tab">Public wall<small id="lwscCnt"></small></button></div>' +
    '<div class="lwsc-body" id="lwscBody" aria-live="polite"></div>' +
    '<div class="lwsc-wallpane" id="lwscWallPane"></div>' +
    '<form class="lwsc-foot" id="lwscForm" autocomplete="off">' +
      '<div class="lwsc-opt" id="lwscOpt"><input id="lwscName" maxlength="40" placeholder="Your name (optional)"><input id="lwscContact" maxlength="80" placeholder="Email or phone so I can reply (optional)"></div>' +
      '<input class="lwsc-hp" id="lwscHp" tabindex="-1" aria-hidden="true">' +
      '<label class="lwsc-pub"><input type="checkbox" id="lwscPub" checked> Also show my message on the public wall</label>' +
      '<div class="lwsc-row"><textarea id="lwscText" rows="1" maxlength="1000" placeholder="Type your message..." aria-label="Your message"></textarea>' +
      '<button class="lwsc-send" id="lwscSend" type="submit" aria-label="Send message">' + sendIcon + '</button></div>' +
      '<div class="lwsc-note"><span id="lwscNote"></span><button type="button" id="lwscMore">Add name / contact</button></div>' +
    '</form>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var body = panel.querySelector('#lwscBody'), form = panel.querySelector('#lwscForm'), text = panel.querySelector('#lwscText'),
      send = panel.querySelector('#lwscSend'), opt = panel.querySelector('#lwscOpt'), more = panel.querySelector('#lwscMore');
  var wallPane = panel.querySelector('#lwscWallPane'), pub = panel.querySelector('#lwscPub'), noteEl = panel.querySelector('#lwscNote'), cnt = panel.querySelector('#lwscCnt');
  var history = store.get(STORE, []);
  var wall = [], wallNote = '', admin = '';
  try { admin = sessionStorage.getItem('lws_admin') || ''; } catch (e) { /* ignore */ }
  var busy = false;

  function bubble(kind, html, save) {
    var d = document.createElement('div'); d.className = 'lwsc-m ' + kind; d.innerHTML = html;
    body.appendChild(d); body.scrollTop = body.scrollHeight;
    if (save) { history.push({ k: kind, h: html }); history = history.slice(-KEEP); store.set(STORE, history); }
    return d;
  }
  function typing(ms, then) {
    var t = document.createElement('div'); t.className = 'lwsc-t'; t.innerHTML = '<i></i><i></i><i></i>';
    body.appendChild(t); body.scrollTop = body.scrollHeight;
    setTimeout(function () { t.remove(); then(); }, ms);
  }
  function greet() {
    bubble('bot', 'Hi! 👋 I’m Sachi. Ask a question, request notes, report a mistake, or tell me what to cover next. I read every message.', false);
    var c = document.createElement('div'); c.className = 'lwsc-chips';
    [['Request notes', 'Hi Sachi, could you please share notes for '], ['Report a mistake', 'Hi Sachi, I found a mistake in '], ['Ask a question', 'Hi Sachi, I have a question about '], ['Say thanks', 'Thank you Sachi for the portal!']].forEach(function (x) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'lwsc-chip'; b.textContent = x[0];
      b.onclick = function () { text.value = x[1]; text.focus(); grow(); };
      c.appendChild(b);
    });
    body.appendChild(c);
  }
  function render() {
    body.innerHTML = '';
    greet();
    history.forEach(function (m) { var d = document.createElement('div'); d.className = 'lwsc-m ' + m.k; d.innerHTML = m.h; body.appendChild(d); });
    body.scrollTop = body.scrollHeight;
  }
  function grow() { text.style.height = 'auto'; text.style.height = Math.min(text.scrollHeight, 110) + 'px'; }


  /* ---------- public wall ---------- */
  function ago(ts) { var s = Math.max(0, (Date.now() - ts) / 1000); return s < 60 ? 'just now' : s < 3600 ? Math.floor(s / 60) + ' min ago' : s < 86400 ? Math.floor(s / 3600) + ' h ago' : s < 604800 ? Math.floor(s / 86400) + ' d ago' : new Date(ts).toLocaleDateString(); }
  function drawWall() {
    cnt.textContent = wall.length ? ' (' + wall.length + ')' : '';
    var h = '<div class="lwsc-wh"><span>Messages from students. Public, newest first.</span><button type="button" id="lwscRef">Refresh</button></div>';
    if (wallNote) h += '<div class="lwsc-empty">' + esc(wallNote) + '</div>';
    else if (!wall.length) h += '<div class="lwsc-empty">No messages yet. Be the first to write one.</div>';
    else h += wall.map(function (m) {
      return '<div class="lwsc-card"><p>' + esc(m.text) + '</p><div class="lwsc-meta"><b>' + (m.name ? esc(m.name) : 'Anonymous') + '</b><span>' + ago(m.ts) + '</span>' +
        (admin ? '<button type="button" class="lwsc-del" data-id="' + esc(m.id) + '">Delete</button>' : '') + '</div></div>';
    }).join('');
    h += '<button type="button" class="lwsc-mod" id="lwscMod">' + (admin ? 'Moderator mode on (turn off)' : 'Moderator') + '</button>';
    wallPane.innerHTML = h;
    wallPane.querySelector('#lwscRef').onclick = loadWall;
    wallPane.querySelector('#lwscMod').onclick = function () {
      if (admin) { admin = ''; try { sessionStorage.removeItem('lws_admin'); } catch (e) { /* ignore */ } drawWall(); return; }
      var k = prompt('Moderator password'); if (!k) return;
      admin = k.trim(); try { sessionStorage.setItem('lws_admin', admin); } catch (e) { /* ignore */ } drawWall();
    };
    [].forEach.call(wallPane.querySelectorAll('.lwsc-del'), function (b) { b.onclick = function () { delWall(b.getAttribute('data-id')); }; });
  }
  function loadWall() {
    wallNote = '';
    fetch('/api/messages', { cache: 'no-store' }).then(function (r) { return r.json().then(function (j) { return { r: r, j: j }; }, function () { return { r: r, j: {} }; }); })
      .then(function (x) { if (!x.r.ok) { wall = []; wallNote = 'The public wall is not available yet.'; } else { wall = x.j.messages || []; } drawWall(); })
      .catch(function () { wall = []; wallNote = 'The wall could not be loaded. Please try again.'; drawWall(); });
  }
  function delWall(id) {
    if (!confirm('Delete this message?')) return;
    fetch('/api/messages?id=' + encodeURIComponent(id), { method: 'DELETE', headers: { 'x-admin-key': admin } }).then(function (r) {
      if (r.status === 401) { admin = ''; try { sessionStorage.removeItem('lws_admin'); } catch (e) { /* ignore */ } drawWall(); alert('Wrong moderator password.'); return; }
      if (!r.ok) { alert('Could not delete. Please try again.'); return; }
      wall = wall.filter(function (m) { return m.id !== id; }); drawWall();
    }).catch(function () { alert('Could not delete. Please check your connection.'); });
  }
  function showTab(name) {
    [].forEach.call(panel.querySelectorAll('.lwsc-tab'), function (t) { t.classList.toggle('on', t.getAttribute('data-tab') === name); });
    body.style.display = name === 'chat' ? '' : 'none';
    wallPane.classList.toggle('on', name === 'wall');
    if (name === 'wall') { drawWall(); loadWall(); }
    else body.scrollTop = body.scrollHeight;
  }
  [].forEach.call(panel.querySelectorAll('.lwsc-tab'), function (t) { t.onclick = function () { showTab(t.getAttribute('data-tab')); }; });
  function updNote() { noteEl.textContent = pub.checked ? 'Public wall: no phone numbers or emails in the message.' : 'Private: only Sachi sees this.'; }
  pub.onchange = updNote; updNote();

  function open(on) {
    panel.classList.toggle('on', on);
    btn.setAttribute('aria-expanded', String(on));
    btn.classList.remove('pulse');
    if (on) { setTimeout(function () { text.focus(); }, 60); body.scrollTop = body.scrollHeight; }
  }
  btn.onclick = function () { open(!panel.classList.contains('on')); };
  panel.querySelector('.lwsc-x').onclick = function () { open(false); btn.focus(); };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('on')) { open(false); btn.focus(); } });
  more.onclick = function () { var on = opt.classList.toggle('on'); more.textContent = on ? 'Hide name / contact' : 'Add name / contact'; if (on) panel.querySelector('#lwscName').focus(); };
  text.addEventListener('input', grow);
  text.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { cancelable: true })); } });

  form.onsubmit = function (e) {
    e.preventDefault();
    if (busy) return;
    if (panel.querySelector('#lwscHp').value) return;            // honeypot
    showTab('chat');
    var msg = text.value.trim();
    if (msg.length < 5) { bubble('err', 'Please write a little more, at least a few words.', false); return; }
    var wait = WAIT - (Date.now() - store.get(LAST, 0));
    if (wait > 0) { bubble('err', 'Please wait ' + Math.ceil(wait / 1000) + ' seconds before sending another message.', false); return; }
    var name = panel.querySelector('#lwscName').value.trim(), contact = panel.querySelector('#lwscContact').value.trim();
    var onWall = pub.checked;
    var mine = bubble('me', esc(msg), false);
    text.value = ''; grow(); busy = true; send.disabled = true;

    function fail(html) {
      busy = false; send.disabled = false; mine.remove();
      bubble('err', html, false); text.value = msg; grow();
    }
    function mail() {
      var page = (document.title || '') + ' | ' + location.pathname + location.hash;
      return fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: KEY,
          subject: 'Learn with Sachi portal: new message' + (onWall ? ' (public wall)' : ' (private)'),
          from_name: name || 'Student (anonymous)',
          name: name || '(no name given)',
          contact: contact || '(no contact given)',
          page: page,
          visibility: onWall ? 'posted on the public wall' : 'private',
          message: msg,
          botcheck: ''
        })
      }).then(function (r) { return r.json().then(function (j) { return r.ok && !!j.success; }, function () { return r.ok; }); })
        .catch(function () { return false; });
    }
    function done(posted, mailed) {
      busy = false; send.disabled = false;
      if (!posted && !mailed) return fail('Sorry, the message could not be sent. Please check your connection and try again. Your text is back in the box so you can resend it.');
      store.set(LAST, Date.now());
      history.push({ k: 'me', h: esc(msg) }); history = history.slice(-KEEP); store.set(STORE, history);
      if (posted) { wall.unshift(posted); cnt.textContent = ' (' + wall.length + ')'; }
      var reply = posted ? 'Thank you! Your message is now on the public wall and I have received it.' : (onWall ? 'Thank you! The public wall is not available right now, so your message was sent privately to me.' : 'Thank you! Your message was sent privately to me.');
      if (!contact) reply += ' If you want a reply, add your email or phone with “Add name / contact”. Only I can see that.';
      typing(900, function () { bubble('bot', reply, true); });
    }

    var postP = !onWall ? Promise.resolve({ posted: null }) :
      fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: msg, name: name, hp: '' }) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { r: r, j: j }; }); })
        .then(function (x) {
          if (x.r.ok) return { posted: x.j.message || null };
          if (x.r.status === 400 || x.r.status === 429) return { stop: (x.j.message || 'Please check your message and try again.') + (x.r.status === 400 ? ' Or untick “public wall” to send it privately.' : '') };
          return { posted: null };       // wall not set up: still email it
        }).catch(function () { return { posted: null }; });

    postP.then(function (res) {
      if (res.stop) return fail(esc(res.stop));
      return mail().then(function (mailed) { done(res.posted, mailed); });
    });
  };

  render();
  setTimeout(function () { btn.classList.remove('pulse'); }, 9000);
})();
