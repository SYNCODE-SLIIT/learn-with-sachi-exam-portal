/* MCQ practice page: one 25-question set per lecture and difficulty (easy, medium, hard).
   Mounted by exam-engine/app.js on the route #/<module>/mcq. Data: window.PORTAL.imeMcq[lecture][level] = [[question, [options], 'BC', explanation], ...]
   Progress, answers, theme and the timer are saved in this browser (localStorage) per set. Nothing is sent anywhere. */
(function () {
  'use strict';
  const P = (window.PORTAL = window.PORTAL || { modules: {} });
  const LET = 'ABCDE';
  const LEVELS = [['easy', 'Easy'], ['medium', 'Medium'], ['hard', 'Hard']];
  const LIMIT = 3600; // 60 minutes per set, like the real paper
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = (d, w) => `<svg width="${w || 22}" height="${w || 22}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const IC = {
    cap: svg('<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2.4 9 2.4 12 0v-5"/><path d="M22 10v6"/>', 28),
    layers: svg('<path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/>', 20),
    list: svg('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>', 20),
    book: svg('<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>', 22),
    moon: svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>', 20),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', 20),
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', 20),
    chev: svg('<path d="m9 6 6 6-6 6"/>', 18),
    left: svg('<path d="M19 12H5M12 5l-7 7 7 7"/>', 20),
    right: svg('<path d="M5 12h14M12 5l7 7-7 7"/>', 20),
    tick: svg('<path d="M20 6 9 17l-5-5"/>', 16),
    redo: svg('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>', 18),
    flag: svg('<path d="M4 22V4"/><path d="M4 4h13l-2 4 2 4H4"/>', 18),
  };
  const fmt = (s) => { s = Math.max(0, Math.round(s)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };

  P.renderMcq = function ($host, o) {
    const data = o.data || P.imeMcq || {};
    const lecs = o.lectures.filter((l) => data[l.n]);
    if (!lecs.length) { $host.innerHTML = '<div class="vmsg">MCQ practice is not available yet.</div>'; return; }
    const KEY = o.key || 'kuppi.mcqp';
    let st = { dark: false, lec: lecs[0].n, lv: 'easy', sets: {} };
    try { const j = JSON.parse(localStorage.getItem(KEY) || 'null'); if (j && typeof j === 'object') st = Object.assign(st, j); } catch (e) { /* storage may be blocked */ }
    if (!lecs.some((l) => l.n === st.lec)) st.lec = lecs[0].n;
    if (!LEVELS.some((l) => l[0] === st.lv)) st.lv = 'easy';
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* ignore */ } };

    const root = document.createElement('div');
    root.className = 'mcqp' + (st.dark ? ' dark' : '');
    root.setAttribute('role', 'application');
    root.setAttribute('aria-label', 'MCQ practice');
    $host.appendChild(root);

    const lec = () => lecs.find((l) => l.n === st.lec);
    const sk = (n, lv) => (n || st.lec) + '-' + (lv || st.lv);
    const getSet = (n, lv) => st.sets[sk(n, lv)] || (st.sets[sk(n, lv)] = { sel: {}, chk: {}, i: 0, spent: 0, done: false, view: 'q' });
    const S = () => getSet();
    const qs = (n, lv) => (data[n || st.lec] || {})[lv || st.lv] || [];
    const ansIdx = (q) => q[2].split('').map((c) => LET.indexOf(c));
    const same = (a, b) => a.slice().sort().join() === b.slice().sort().join();
    const right = (q, i) => same(S().sel[i] || [], ansIdx(q));
    const answered = (n, lv) => Object.keys(getSet(n, lv).sel).filter((k) => (getSet(n, lv).sel[k] || []).length).length;

    let tickId = null;
    function stopTimer() { if (tickId) { clearInterval(tickId); tickId = null; } }
    function startTimer() {
      stopTimer();
      let n = 0;
      tickId = setInterval(() => {
        if (!document.body.contains(root)) { stopTimer(); document.removeEventListener('keydown', onKey); return; }
        const s = S();
        if (document.hidden || s.done) return;
        s.spent++; n++;
        const el = root.querySelector('#mqTime');
        if (el) { el.textContent = 'Time Left: ' + fmt(LIMIT - s.spent); el.parentNode.classList.toggle('low', LIMIT - s.spent <= 300); }
        if (n % 5 === 0) save();
        if (s.spent >= LIMIT) finish(true);
      }, 1000);
    }

    function finish(auto) {
      const s = S(), total = qs().length;
      if (!auto) {
        const left = total - answered();
        if (left > 0 && !confirm(left + ' question' + (left > 1 ? 's are' : ' is') + ' unanswered. Finish and see your score anyway?')) return;
      }
      s.done = true; s.view = 'res'; save(); draw();
    }

    function nextSet() {
      const i = LEVELS.findIndex((l) => l[0] === st.lv);
      if (i < LEVELS.length - 1) st.lv = LEVELS[i + 1][0];
      else { const j = lecs.findIndex((l) => l.n === st.lec); st.lec = lecs[(j + 1) % lecs.length].n; st.lv = 'easy'; }
      save(); draw();
    }

    function draw() {
      const keepTop = root.scrollTop;
      const s = S(), list = qs(), n = list.length, cur = Math.min(s.i, n - 1), q = list[cur];
      const pct = n ? Math.round(answered() / n * 100) : 0;
      root.className = 'mcqp' + (st.dark ? ' dark' : '');
      const locked = s.done;
      const checked = (i) => locked || !!s.chk[i];
      const cellCls = (i) => {
        if (i === cur && s.view === 'q') return 'cur';
        if (checked(i) && (s.sel[i] || []).length) return right(list[i], i) ? 'ok' : 'no';
        if (locked) return 'no';
        return (s.sel[i] || []).length ? 'ans' : '';
      };
      const grid = list.map((_, i) => `<button class="mq-n ${cellCls(i)}" data-go="${i}" aria-label="Question ${i + 1}">${i + 1}</button>`).join('');
      const anyChecked = list.some((_, i) => checked(i));
      const topics = lecs.map((l) => `<button class="mq-t ${l.n === st.lec ? 'on' : ''}" data-lec="${l.n}" title="${esc(l.title)}"><span class="nm">${esc(l.title)}</span><small>${answered(l.n, st.lv)}/${qs(l.n, st.lv).length}</small>${IC.chev}</button>`).join('');
      const lvTabs = LEVELS.map((l) => `<button class="mq-lvb ${l[0] === st.lv ? 'on' : ''}" data-lv="${l[0]}"><i></i>${l[1]}<small>${answered(st.lec, l[0])}/${qs(st.lec, l[0]).length}</small></button>`).join('');

      let body = '';
      if (s.view === 'res') {
        const ok = list.filter((x, i) => right(x, i)).length, skipped = list.filter((_, i) => !(s.sel[i] || []).length).length;
        const marks = ok * 2, tot = n * 2, pc = n ? Math.round(ok / n * 100) : 0;
        const last = st.lv === 'hard' && st.lec === lecs[lecs.length - 1].n;
        body = `<div class="mq-card mq-res">
          <h2>${pc >= 80 ? 'Excellent work' : pc >= 60 ? 'Good effort' : pc >= 40 ? 'Keep practising' : 'Review and try again'}</h2>
          <p class="sub">Lecture ${st.lec} &middot; ${esc(LEVELS.find((l) => l[0] === st.lv)[1])} set</p>
          <div class="mq-score">
            <div class="mq-st big"><b>${marks}/${tot}</b><span>Marks (2 per question)</span></div>
            <div class="mq-st"><b>${ok}/${n}</b><span>Correct</span></div>
            <div class="mq-st"><b>${pc}%</b><span>Score</span></div>
            <div class="mq-st"><b>${fmt(s.spent)}</b><span>Time used</span></div>
          </div>
          <div class="mq-sh"><h3>${IC.list}Review your answers</h3><span class="mq-pill">${skipped ? skipped + ' unanswered' : 'All answered'}</span></div>
          <div class="mq-rev">${list.map((x, i) => { const good = right(x, i), mine = (s.sel[i] || []).map((k) => LET[k]).sort().join(', ') || 'none'; return `<button class="mq-ri ${good ? 'ok' : 'no'}" data-go="${i}"><span class="d">${good ? '&#10003;' : '&#10005;'}</span><span class="qt">${i + 1}. ${esc(x[0])}</span><em>You: ${mine} &middot; Correct: ${x[2].split('').join(', ')}</em></button>`; }).join('')}</div>
          <div class="mq-foot"><button class="mq-b gh" data-act="retry">${IC.redo}Try this set again</button><span class="mid"></span><button class="mq-b pri" data-act="nextset">${last ? 'Back to the first set' : 'Next set'}${IC.right}</button></div>
          <p class="mq-note">A question counts as correct only when you select exactly the right options, the same rule as the real paper (more than one choice can be correct).</p>
        </div>`;
      } else if (q) {
        const multi = ansIdx(q).length > 1, ch = checked(cur), sel = s.sel[cur] || [], A = ansIdx(q);
        const opts = q[1].map((t, i) => {
          let cls = sel.includes(i) ? 'sel' : '';
          if (ch) cls = A.includes(i) ? (sel.includes(i) ? 'right' : 'miss') : (sel.includes(i) ? 'wrong' : '');
          return `<button class="mq-o ${multi ? '' : 'single'} ${cls}" data-opt="${i}" ${ch ? 'disabled' : ''} aria-pressed="${sel.includes(i)}"><span class="l">${LET[i]}</span><span class="t">${esc(t)}</span><span class="bx">${sel.includes(i) || (ch && A.includes(i)) ? IC.tick : ''}</span></button>`;
        }).join('');
        const good = ch && same(sel, A);
        const exp = ch ? `<div class="mq-ex ${good ? 'ok' : 'no'}"><div class="v">${good ? 'Correct' : (sel.length ? 'Incorrect' : 'Not answered')} &middot; answer: ${A.map((k) => LET[k]).join(', ')}</div><p>${esc(q[3])}</p></div>` : '';
        const lastQ = cur === n - 1;
        body = `<div class="mq-card">
          <div class="mq-qh"><div><span class="mq-badge">${multi ? 'Multiple Select' : 'Single Select'}</span>${multi ? '<span class="mq-badge hint">Select all that apply</span>' : ''}</div><span class="mq-qn">Question ${cur + 1} of ${n}</span></div>
          <h2 class="mq-q">${esc(q[0])}</h2>
          <div class="mq-opts" role="group" aria-label="Answer options">${opts}</div>
          ${exp}
          <div class="mq-foot">
            <button class="mq-b gh" data-act="prev" ${cur === 0 ? 'disabled' : ''}>${IC.left}Previous</button>
            <span class="mid">${!ch ? `<button class="mq-b sec" data-act="check" ${sel.length ? '' : 'disabled'}>Check answer</button>` : ''}${!locked ? `<button class="mq-b gh" data-act="finish">${IC.flag}Finish</button>` : `<button class="mq-b gh" data-act="results">${IC.flag}See score</button>`}</span>
            ${lastQ ? '' : `<button class="mq-b pri" data-act="next">Next Question${IC.right}</button>`}${lastQ ? `<button class="mq-b pri" data-act="${locked ? 'results' : 'finish'}">${locked ? 'See score' : 'Finish set'}${IC.flag}</button>` : ''}
          </div></div>`;
      } else {
        body = '<div class="mq-card"><p>No questions in this set yet.</p></div>';
      }

      root.innerHTML = `<div class="mq-wrap">
        <aside class="mq-side">
          <div class="mq-brand"><div class="mq-logo">${IC.cap}</div><div><b>MCQ Practice</b><span>Learn &bull; Practice &bull; Excel</span></div></div>
          <div class="mq-hr"></div>
          <div class="mq-sh"><h3>${IC.layers}Question Set</h3><span class="mq-pill">${n} Questions</span></div>
          <div class="mq-grid">${grid}</div>
          <div class="mq-leg"><span><i style="background:var(--blue)"></i>Current</span><span><i style="background:var(--bsoft);box-shadow:inset 0 0 0 2px var(--blue)"></i>Answered</span>${anyChecked ? '<span><i style="background:var(--ok)"></i>Correct</span><span><i style="background:var(--bad)"></i>Incorrect</span>' : ''}</div>
          <div class="mq-hr"></div>
          <div class="mq-sh"><h3>${IC.list}Topics</h3></div>
          <div class="mq-topics">${topics}</div>
          <div class="mq-sact"><button class="mq-b gh sm" data-act="restart">${IC.redo}Restart set</button><a class="mq-b gh sm" href="${esc(o.back || '#')}" style="text-decoration:none">Exit</a></div>
        </aside>
        <main class="mq-main">
          <div class="mq-top">
            <div class="mq-title">${IC.book}<span>Lecture ${st.lec}: ${esc(lec().title)}</span></div>
            <button class="mq-chip" data-act="theme" aria-label="Switch between light and dark mode">${st.dark ? IC.sun : IC.moon}${st.dark ? 'Light mode' : 'Dark mode'}</button>
            <div class="mq-chip time ${LIMIT - s.spent <= 300 ? 'low' : ''}">${IC.clock}<span id="mqTime">${s.done ? 'Time used: ' + fmt(s.spent) : 'Time Left: ' + fmt(LIMIT - s.spent)}</span></div>
            <div class="mq-prog"><b>${pct}% Complete</b><div class="mq-bar"><i style="width:${pct}%"></i></div></div>
          </div>
          <div class="mq-lv" role="tablist" aria-label="Difficulty">${lvTabs}</div>
          ${body}
        </main></div>`;
      root.scrollTop = keepTop;
    }

    function go(i) { const s = S(); s.i = Math.max(0, Math.min(qs().length - 1, i)); s.view = 'q'; save(); draw(); if (window.innerWidth <= 1020) { const c = root.querySelector('.mq-card'); if (c) c.scrollIntoView({ block: 'start', behavior: 'smooth' }); } else root.scrollTop = 0; }

    root.addEventListener('click', (e) => {
      const t = e.target.closest('[data-go],[data-lec],[data-lv],[data-opt],[data-act]'); if (!t) return;
      const s = S();
      if (t.dataset.go !== undefined) return go(Number(t.dataset.go));
      if (t.dataset.lec !== undefined) { st.lec = Number(t.dataset.lec); save(); return draw(); }
      if (t.dataset.lv !== undefined) { st.lv = t.dataset.lv; save(); return draw(); }
      if (t.dataset.opt !== undefined) {
        if (s.done || s.chk[s.i]) return;
        const q = qs()[s.i], k = Number(t.dataset.opt), multi = ansIdx(q).length > 1;
        let sel = (s.sel[s.i] || []).slice();
        sel = multi ? (sel.includes(k) ? sel.filter((x) => x !== k) : sel.concat(k)) : [k];
        s.sel[s.i] = sel; save(); return draw();
      }
      switch (t.dataset.act) {
        case 'next': return go(s.i + 1);
        case 'prev': return go(s.i - 1);
        case 'check': if ((s.sel[s.i] || []).length) { s.chk[s.i] = 1; save(); draw(); } return;
        case 'finish': return finish(false);
        case 'results': s.view = 'res'; save(); return draw();
        case 'theme': st.dark = !st.dark; save(); return draw();
        case 'retry': case 'restart':
          if (t.dataset.act === 'restart' && !confirm('Restart this set? Your answers and timer for this set will be cleared.')) return;
          st.sets[sk()] = { sel: {}, chk: {}, i: 0, spent: 0, done: false, view: 'q' }; save(); return draw();
        case 'nextset': return nextSet();
        default:
      }
    });

    function onKey(e) {
      if (!document.body.contains(root)) { document.removeEventListener('keydown', onKey); return; }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const s = S(); if (s.view !== 'q') return;
      const k = e.key.toLowerCase();
      if (k === 'arrowright') { if (s.i < qs().length - 1) go(s.i + 1); }
      else if (k === 'arrowleft') { if (s.i > 0) go(s.i - 1); }
      else if (/^[a-e1-5]$/.test(k)) { const i = /\d/.test(k) ? Number(k) - 1 : LET.toLowerCase().indexOf(k); const b = root.querySelector('.mq-o[data-opt="' + i + '"]'); if (b && !b.disabled) b.click(); }
      else if (k === 'enter') { if (e.target.closest && e.target.closest('button,a')) return; const c = root.querySelector('[data-act="check"]:not([disabled])'); if (c) c.click(); else if (s.i < qs().length - 1) go(s.i + 1); }
    }
    document.addEventListener('keydown', onKey);

    draw();
    startTimer();
  };
})();
