/* MCQ practice page: one 25-question set per lecture and difficulty (easy, medium, hard), in the portal's black and yellow theme.
   Mounted by exam-engine/app.js on the route #/<module>/mcq. Data: window.PORTAL.imeMcq[lecture][level] = [[question, [options], 'BC', explanation], ...]
   Answers and progress are saved in this browser (localStorage) per set. Nothing is sent anywhere. */
(function () {
  'use strict';
  const P = (window.PORTAL = window.PORTAL || { modules: {} });
  const LET = 'ABCDE';
  const LEVELS = [['easy', 'Easy'], ['medium', 'Medium'], ['hard', 'Hard']];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = (d, w) => `<svg width="${w || 18}" height="${w || 18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const IC = {
    cap: svg('<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2.4 9 2.4 12 0v-5"/><path d="M22 10v6"/>', 24),
    left: svg('<path d="M19 12H5M12 5l-7 7 7 7"/>', 16),
    right: svg('<path d="M5 12h14M12 5l7 7-7 7"/>', 16),
    tick: svg('<path d="M20 6 9 17l-5-5"/>', 13),
    redo: svg('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>', 15),
    flag: svg('<path d="M4 22V4"/><path d="M4 4h13l-2 4 2 4H4"/>', 15),
    grid: svg('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>', 16),
  };

  P.renderMcq = function ($host, o) {
    const data = o.data || P.imeMcq || {};
    const lecs = o.lectures.filter((l) => data[l.n]);
    if (!lecs.length) { $host.innerHTML = '<div class="vmsg">MCQ practice is not available yet.</div>'; return; }
    const KEY = o.key || 'kuppi.mcqp';
    let st = { lec: lecs[0].n, lv: 'easy', sets: {} };
    try { const j = JSON.parse(localStorage.getItem(KEY) || 'null'); if (j && typeof j === 'object') st = Object.assign(st, { lec: j.lec, lv: j.lv, sets: j.sets || {} }); } catch (e) { /* storage may be blocked */ }
    if (!lecs.some((l) => l.n === st.lec)) st.lec = lecs[0].n;
    if (!LEVELS.some((l) => l[0] === st.lv)) st.lv = 'easy';
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* ignore */ } };

    const root = document.createElement('div');
    root.className = 'mcqp';
    root.setAttribute('role', 'application');
    root.setAttribute('aria-label', 'MCQ practice');
    $host.appendChild(root);

    const lec = () => lecs.find((l) => l.n === st.lec);
    const sk = (n, lv) => (n || st.lec) + '-' + (lv || st.lv);
    const getSet = (n, lv) => st.sets[sk(n, lv)] || (st.sets[sk(n, lv)] = { sel: {}, chk: {}, i: 0, done: false, view: 'q' });
    const S = () => getSet();
    const qs = (n, lv) => (data[n || st.lec] || {})[lv || st.lv] || [];
    const ansIdx = (q) => q[2].split('').map((c) => LET.indexOf(c));
    const same = (a, b) => a.slice().sort().join() === b.slice().sort().join();
    const right = (q, i) => same(S().sel[i] || [], ansIdx(q));
    const answered = (n, lv) => Object.keys(getSet(n, lv).sel).filter((k) => (getSet(n, lv).sel[k] || []).length).length;

    function finish() {
      const total = qs().length, left = total - answered();
      if (left > 0 && !confirm(left + ' question' + (left > 1 ? 's are' : ' is') + ' unanswered. Finish and see your score anyway?')) return;
      const s = S(); s.done = true; s.view = 'res'; save(); draw();
    }
    function nextSet() {
      const i = LEVELS.findIndex((l) => l[0] === st.lv);
      if (i < LEVELS.length - 1) st.lv = LEVELS[i + 1][0];
      else { const j = lecs.findIndex((l) => l.n === st.lec); st.lec = lecs[(j + 1) % lecs.length].n; st.lv = 'easy'; }
      save(); draw();
    }

    function draw() {
      const s = S(), list = qs(), n = list.length, cur = Math.min(s.i, Math.max(0, n - 1)), q = list[cur];
      const pct = n ? Math.round(answered() / n * 100) : 0;
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
      const topics = lecs.map((l) => `<button class="mq-t ${l.n === st.lec ? 'on' : ''}" data-lec="${l.n}" title="${esc(l.title)}"><span class="k">L${l.n}</span><span class="nm">${esc(l.title)}</span><small>${answered(l.n, st.lv)}/${qs(l.n, st.lv).length}</small></button>`).join('');
      const lvTabs = LEVELS.map((l) => `<button class="mq-lvb ${l[0] === st.lv ? 'on' : ''}" data-lv="${l[0]}" role="tab" aria-selected="${l[0] === st.lv}"><i></i>${l[1]}<small>${answered(st.lec, l[0])}/${qs(st.lec, l[0]).length}</small></button>`).join('');

      let body = '';
      if (s.view === 'res') {
        const ok = list.filter((x, i) => right(x, i)).length, skipped = list.filter((_, i) => !(s.sel[i] || []).length).length;
        const pc = n ? Math.round(ok / n * 100) : 0;
        const last = st.lv === 'hard' && st.lec === lecs[lecs.length - 1].n;
        body = `<section class="mq-card mq-res">
          <h2>${pc >= 80 ? 'Excellent work' : pc >= 60 ? 'Good effort' : pc >= 40 ? 'Keep practising' : 'Review and try again'}</h2>
          <p class="sub">Lecture ${st.lec} &middot; ${esc(LEVELS.find((l) => l[0] === st.lv)[1])} set</p>
          <div class="mq-score">
            <div class="mq-st big"><b>${ok * 2}/${n * 2}</b><span>Marks (2 each)</span></div>
            <div class="mq-st"><b>${ok}/${n}</b><span>Correct</span></div>
            <div class="mq-st"><b>${pc}%</b><span>Score</span></div>
            <div class="mq-st"><b>${skipped}</b><span>Unanswered</span></div>
          </div>
          <div class="mq-scroll"><div class="mq-rev">${list.map((x, i) => { const good = right(x, i), mine = (s.sel[i] || []).map((k) => LET[k]).sort().join(', ') || 'none'; return `<button class="mq-ri ${good ? 'ok' : 'no'}" data-go="${i}"><span class="d">${good ? '&#10003;' : '&#10005;'}</span><span class="qt">${i + 1}. ${esc(x[0])}</span><em>You: ${mine} &middot; Answer: ${x[2].split('').join(', ')}</em></button>`; }).join('')}</div></div>
          <p class="mq-note">A question counts only when you select exactly the right options, as in the real paper (more than one choice can be correct). Click a question to review its explanation.</p>
          <div class="mq-foot"><button class="mq-b gh" data-act="retry">${IC.redo}Try this set again</button><button class="mq-b pri" data-act="nextset">${last ? 'Back to the first set' : 'Next set'}${IC.right}</button></div>
        </section>`;
      } else if (q) {
        const A = ansIdx(q), multi = A.length > 1, ch = checked(cur), sel = s.sel[cur] || [];
        const opts = q[1].map((t, i) => {
          let cls = sel.includes(i) ? 'sel' : '';
          if (ch) cls = A.includes(i) ? (sel.includes(i) ? 'right' : 'miss') : (sel.includes(i) ? 'wrong' : '');
          return `<button class="mq-o ${multi ? '' : 'single'} ${cls}" data-opt="${i}" ${ch ? 'disabled' : ''} aria-pressed="${sel.includes(i)}"><span class="l">${LET[i]}</span><span class="t">${esc(t)}</span><span class="bx">${sel.includes(i) || (ch && A.includes(i)) ? IC.tick : ''}</span></button>`;
        }).join('');
        const good = ch && same(sel, A);
        const exp = ch ? `<div class="mq-ex ${good ? 'ok' : 'no'}"><div class="v">${good ? 'Correct' : (sel.length ? 'Incorrect' : 'Not answered')} &middot; answer ${A.map((k) => LET[k]).join(', ')}</div><p>${esc(q[3])}</p></div>` : '';
        const lastQ = cur === n - 1;
        body = `<section class="mq-card">
          <div class="mq-qh"><div class="mq-badges"><span class="mq-badge">${multi ? 'Multiple select' : 'Single select'}</span>${multi ? '<span class="mq-badge hint">Select all that apply</span>' : ''}</div><span class="mq-qn">Question <b>${cur + 1}</b> / ${n}</span></div>
          <h2 class="mq-q">${esc(q[0])}</h2>
          <div class="mq-scroll"><div class="mq-opts" role="group" aria-label="Answer options">${opts}</div>${exp}</div>
          <div class="mq-foot">
            <button class="mq-b gh" data-act="prev" ${cur === 0 ? 'disabled' : ''}>${IC.left}Previous</button>
            <span class="mid">${!ch ? `<button class="mq-b sec" data-act="check" ${sel.length ? '' : 'disabled'}>Check answer</button>` : ''}${locked ? `<button class="mq-b gh" data-act="results">${IC.flag}See score</button>` : `<button class="mq-b gh" data-act="finish">${IC.flag}Finish</button>`}</span>
            ${lastQ ? `<button class="mq-b pri" data-act="${locked ? 'results' : 'finish'}">${locked ? 'See score' : 'Finish set'}${IC.flag}</button>` : `<button class="mq-b pri" data-act="next">Next question${IC.right}</button>`}
          </div></section>
          <div class="mq-tip">Keys: A to E choose &middot; Enter check or next &middot; &larr; &rarr; move</div>`;
      } else {
        body = '<section class="mq-card"><p>No questions in this set yet.</p></section>';
      }

      const open = root.classList.contains('open');
      root.className = 'mcqp' + (open ? ' open' : '');
      root.innerHTML = `<div class="mq-wrap">
        <aside class="mq-side" aria-label="Question set and topics">
          <div class="mq-brand"><div class="mq-logo">${IC.cap}</div><div><b>MCQ Practice</b><span>${esc(o.code || '')}${o.code ? ' &middot; ' : ''}Lectures 1 to ${lecs[lecs.length - 1].n}</span></div></div>
          <div class="mq-sec"><div class="mq-sh"><h3>Question set</h3><span>${answered()}/${n} answered</span></div>
            <div class="mq-grid">${grid}</div>
            <div class="mq-leg"><span><i style="background:var(--y)"></i>Current</span><span><i style="background:var(--ydim)"></i>Answered</span>${anyChecked ? '<span><i style="background:var(--ok)"></i>Right</span><span><i style="background:var(--bad)"></i>Wrong</span>' : ''}</div></div>
          <div class="mq-sec mq-topics-wrap"><div class="mq-sh"><h3>Topics</h3></div><div class="mq-topics">${topics}</div></div>
          <div class="mq-sact"><button class="mq-b gh sm" data-act="restart">${IC.redo}Restart set</button><a class="mq-b gh sm" href="${esc(o.back || '#')}">Exit</a></div>
        </aside>
        <main class="mq-main">
          <header class="mq-top">
            <button class="mq-menu" data-act="menu" aria-label="Open the question list">${IC.grid}Questions</button>
            <div class="mq-title"><span class="eyebrow">Lecture ${st.lec}</span><h1>${esc(lec().title)}</h1></div>
            <div class="mq-prog"><div class="row"><span>Progress</span><b>${pct}%</b></div><div class="mq-bar"><i style="width:${pct}%"></i></div></div>
          </header>
          <div class="mq-lv" role="tablist" aria-label="Difficulty">${lvTabs}</div>
          ${body}
        </main></div><div class="mq-scrim" data-act="menu"></div>`;
    }

    function go(i) { const s = S(); s.i = Math.max(0, Math.min(qs().length - 1, i)); s.view = 'q'; root.classList.remove('open'); save(); draw(); }

    root.addEventListener('click', (e) => {
      const t = e.target.closest('[data-go],[data-lec],[data-lv],[data-opt],[data-act]'); if (!t) return;
      const s = S();
      if (t.dataset.go !== undefined) return go(Number(t.dataset.go));
      if (t.dataset.lec !== undefined) { st.lec = Number(t.dataset.lec); root.classList.remove('open'); save(); return draw(); }
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
        case 'finish': return finish();
        case 'results': s.view = 'res'; save(); return draw();
        case 'menu': root.classList.toggle('open'); return;
        case 'retry': case 'restart':
          if (t.dataset.act === 'restart' && !confirm('Restart this set? Your answers for this set will be cleared.')) return;
          st.sets[sk()] = { sel: {}, chk: {}, i: 0, done: false, view: 'q' }; save(); return draw();
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
  };
})();
