/* Exam Kuppi Portal - single page app (hash routing, no build step). */
(function () {
  'use strict';
  const P = window.PORTAL;
  const $app = document.getElementById('app');

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const L = 'ABCDEFGHIJ';
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage may be blocked */ } }
  };
  const SOURCE_LABEL = { past: 'Past paper', adapted: 'Past paper (reworded options)', practice: 'Practice' };

  /* ---------- build the Cloud Computing module from raw data ---------- */
  const cc = P.modules.cc;
  cc.lectures = P.ccLectures.slice().sort((a, b) => a.n - b.n);
  const mcq = P.ccMcqRaw.map((r, i) => ({
    id: 'm' + (i + 1), kind: 'mcq', lec: r[0], src: r[1], q: r[2], opts: r[3],
    ans: r[4].split('').map((c) => L.indexOf(c)), exp: r[5]
  }));
  const short = P.ccShortRaw.map((r, i) => ({ id: 's' + (i + 1), kind: 'short', lec: r[0], src: r[1], q: r[2], a: r[3] }));
  const struct = P.ccStructuredRaw.map((r, i) => ({ id: 't' + (i + 1), kind: 'struct', lec: r[0], src: r[1], title: r[2], q: r[3], a: r[4], hint: r[5] }));
  const isPast = (q) => q.src === 'past' || q.src === 'adapted';
  const pastCount = (n, kind) => [mcq, short, struct].reduce((t, arr) => t + arr.filter((q) => q.lec === n && isPast(q) && (!kind || q.kind === kind)).length, 0);
  const SHORT = { 1: 'Introduction to Cloud', 2: 'Core Services & Infrastructure', 3: 'Compute & Storage', 4: 'Cloud Networking', 5: 'HA & Disaster Recovery', 6: 'Security & Monitoring', 7: 'Database & Analytics', 8: 'Cloud Migration', 9: 'Cloud Native Apps', 10: 'Infrastructure as Code', 11: 'Containerization', 12: 'Container Orchestration' };
  cc.lectures.forEach((lec) => {
    lec.short = SHORT[lec.n] || lec.title;
    lec.past = pastCount(lec.n);
    lec.pastBy = { mcq: pastCount(lec.n, 'mcq'), short: pastCount(lec.n, 'short'), struct: pastCount(lec.n, 'struct') };
    lec.priority = lec.past >= 10 ? 'high' : lec.past >= 3 ? 'med' : lec.past >= 1 ? 'low' : (lec.n > 7 ? 'new' : 'none');
    lec.hyCount = lec.topics.filter((t) => t.hy).length;
  });
  const PRI_LABEL = { high: 'High priority', med: 'Medium', low: 'Low', new: 'New in final', none: 'Not asked' };
  const totals = {
    lectures: cc.lectures.length,
    topics: cc.lectures.reduce((t, l) => t + l.topics.length, 0),
    hy: cc.lectures.reduce((t, l) => t + l.hyCount, 0),
    past: mcq.concat(short, struct).filter(isPast).length,
    all: mcq.length + short.length + struct.length
  };
  const lecByN = (n) => cc.lectures.find((l) => l.n === Number(n));

  /* ---------- progress ---------- */
  const DONE_KEY = 'kuppi.cc.done';
  const STAT_KEY = 'kuppi.cc.qstat';
  let done = store.get(DONE_KEY, {});
  let qstat = store.get(STAT_KEY, {});
  const lecDone = (lec) => lec.topics.filter((t) => done[t.id]).length;

  /* ---------- routing ---------- */
  let sideOpen = false;
  let sectionTab = 'mcq';
  function parse() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    return parts;
  }
  function go() {
    const p = parse();
    sideOpen = false;
    if (p[0] !== 'cc') { location.replace('#/cc'); return; }
    renderModule(p.slice(1));
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', go);

  function daysLeft(mod) {
    if (!mod.examDate) return null;
    const d = new Date(mod.examDate + 'T00:00:00');
    return Math.ceil((d - new Date()) / 86400000);
  }
  /* ---------- module shell ---------- */
  function renderModule(p) {
    const page = p[0] || 'map';
    const lecN = page === 'lecture' ? Number(p[1]) : null;
    const dl = daysLeft(cc);
    const lecNav = cc.lectures.map((l) => {
      const d = lecDone(l);
      return `<a class="ni ${lecN === l.n ? 'on' : ''} ${d === l.topics.length ? 'done' : ''}" href="#/cc/lecture/${l.n}">
        <span class="k">L${l.n}</span><span class="t">${esc(l.short)}</span>
        <span class="r">${d}/${l.topics.length}</span><i class="dot ${l.priority}" title="${PRI_LABEL[l.priority]}"></i></a>`;
    }).join('');
    const nav = (key, href, num, label, right) =>
      `<a class="ni ${page === key ? 'on' : ''}" href="${href}"><span class="k">${num}</span><span class="t">${label}</span>${right ? `<span class="r">${right}</span>` : ''}</a>`;

    $app.innerHTML = `
    <div class="shell ${sideOpen ? 'menu-open' : ''}" id="shell">
      <button class="menu" id="menuBtn" aria-label="Open menu"><span>${esc(cc.code)}</span> ${esc(cc.name)} &#9776;</button>
      <aside class="side">
        <a class="back" href="../#y4">&larr; All modules</a>
        <div class="code">${esc(cc.code)}</div>
        <h2>${esc(cc.name)}</h2>
        <div class="count">
          <div class="hot"><b>${dl === null ? 'TBA' : (dl < 0 ? 'Done' : dl)}</b><span>${dl === null ? 'Exam date' : 'Days to go'}</span></div>
          <div><b>${cc.examDate ? esc(new Date(cc.examDate + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })) : '2 h'}</b><span>${cc.examDate ? esc(cc.examTime || 'Exam date') : 'Duration'}</span></div>
        </div>
        <div class="navgrp" style="margin-top:0;border:0;padding-top:0">Overview</div>
        ${nav('map', '#/cc', '01', 'Exam map')}
        ${nav('rules', '#/cc/rules', '02', 'Paper and golden rules')}
        ${nav('practice', '#/cc/practice', '03', 'Practice questions', String(totals.all))}
        ${nav('contact', '#/cc/contact', '04', 'Message Sachi')}
        <div class="navgrp">Lectures</div>
        ${lecNav}
      </aside>
      <main class="main" id="main"></main>
    </div>`;
    document.getElementById('menuBtn').onclick = () => { document.getElementById('shell').classList.toggle('menu-open'); };
    document.querySelector('.side').addEventListener('click', (e) => { if (e.target.closest('a.ni')) document.getElementById('shell').classList.remove('menu-open'); });

    const $main = document.getElementById('main');
    if (page === 'rules') { document.title = 'Paper and golden rules | ' + cc.name; $main.innerHTML = viewRules(); }
    else if (page === 'practice') { document.title = 'Practice | ' + cc.name; renderPractice($main); }
    else if (page === 'contact') { document.title = 'Message Sachi | ' + cc.name; $main.innerHTML = viewContact(); }
    else if (page === 'lecture' && lecByN(lecN)) { const lec = lecByN(lecN); document.title = 'L' + lec.n + ' ' + lec.title + ' | ' + cc.name; $main.innerHTML = viewLecture(lec); bindLecture(lec); }
    else { document.title = 'Exam map | ' + cc.name; $main.innerHTML = viewMap(); }
  }

  /* ---------- exam map ---------- */
  const SHADES = ['#ffd60a', '#d9b500', '#b39600', '#8a7500', '#665600', '#4a3f00', '#352d00'];
  function donut(slices, total) {
    const R = 80, C = 2 * Math.PI * R;
    let off = 0;
    const segs = slices.map((s, i) => {
      const len = (s.v / total) * C;
      const seg = `<circle r="${R}" cx="100" cy="100" fill="none" stroke="${SHADES[i % SHADES.length]}" stroke-width="30" stroke-dasharray="${len - 1.5} ${C - len + 1.5}" stroke-dashoffset="${-off}" transform="rotate(-90 100 100)"><title>${esc(s.label)}: ${s.v}</title></circle>`;
      off += len; return seg;
    }).join('');
    const top3 = slices.slice(0, 3).reduce((t, s) => t + s.v, 0);
    return `<svg viewBox="0 0 200 200" role="img" aria-label="Share of past-paper questions by lecture">${segs}
      <text x="100" y="98" text-anchor="middle" class="mid" fill="#fff" font-size="34" font-weight="800">${Math.round(top3 / total * 100)}%</text>
      <text x="100" y="120" text-anchor="middle" fill="#a0a0a0" font-size="10" letter-spacing="1.5" font-family="Consolas,monospace">TOP 3 LECTURES</text></svg>`;
  }
  function viewMap() {
    const ranked = cc.lectures.filter((l) => l.past > 0).sort((a, b) => b.past - a.past || a.n - b.n);
    const tot = ranked.reduce((t, l) => t + l.past, 0);
    const slices = ranked.map((l) => ({ label: l.short, v: l.past, n: l.n }));
    const cnt = { high: 0, med: 0, low: 0, new: 0 };
    cc.lectures.forEach((l) => { if (cnt[l.priority] !== undefined) cnt[l.priority]++; });
    const cell = (v) => `<td class="c ${v >= 8 ? 'l3' : v >= 3 ? 'l2' : v >= 1 ? 'l1' : ''}">${v || ''}</td>`;
    const heat = cc.lectures.map((l) => `<tr class="${l.past ? '' : 'nodata'}">
        <td class="lab"><a href="#/cc/lecture/${l.n}"><span class="k">L${l.n}</span>${esc(l.short)}</a></td>
        ${cell(l.pastBy.mcq)}${cell(l.pastBy.short)}${cell(l.pastBy.struct)}
        <td class="t">${l.past ? l.past : 'new in final'}</td></tr>`).join('');
    const hyRows = cc.lectures.map((l) => `<div class="hyrow"><a href="#/cc/lecture/${l.n}"><span class="k">L${l.n}</span>${esc(l.short)}</a>
        <span>${l.topics.map((t) => `<i class="blk ${t.hy ? 'hy' : ''}" title="${esc(t.t)}"></i>`).join(' ')}</span><span class="n">${l.hyCount}/${l.topics.length}</span></div>`).join('');
    const maxBar = cc.lectures.length;
    return `
    <div class="ph"><div><div class="eyebrow">Overview</div><h1>Exam map</h1>
      <p class="lede">${esc(cc.examNote)}. Priority comes from how often each lecture appeared in the mid-term past papers, because no final paper was available.</p></div>
      <a class="btn" href="#/cc/practice">Practice questions</a></div>
    <div class="rule"></div>
    <div class="note"><b>Honest scope note.</b> The past-paper analysis covers <b>Lectures 1–7 only</b> (mid-term). Lectures 8–12 are examined in the final but had no past questions, so they are marked <b>New in final</b> and their notes are written from the course outline since the slides were not in the folder.</div>
    <div class="stats">
      <div class="stat"><b>${totals.lectures}</b><span>Lectures in exam (L1–L12)</span></div>
      <div class="stat"><b>${cnt.high}</b><span>High priority lectures</span></div>
      <div class="stat"><b>${totals.hy}<small>/${totals.topics}</small></b><span>High-yield topics</span></div>
      <div class="stat"><b>${totals.past}</b><span>Past-paper questions</span></div>
      <div class="stat"><b>${totals.all}</b><span>Practice questions</span></div>
    </div>
    <div class="g2">
      <div class="panel"><h3>Share of past questions</h3><p>Mid-term questions per lecture (MCQ, short answer, structured).</p>
        <div class="donut">${donut(slices, tot)}
          <ul class="legend">${slices.map((s, i) => `<li><i style="background:${SHADES[i % SHADES.length]}"></i><a href="#/cc/lecture/${s.n}">L${s.n} ${esc(s.label)}</a><b>${Math.round(s.v / tot * 100)}%</b></li>`).join('')}</ul></div></div>
      <div class="panel"><h3>Past-paper heatmap</h3><p>Questions per lecture by type. Select a row to open the lecture.</p>
        <div class="heatwrap"><table class="heat"><thead><tr><th></th><th>MCQ</th><th>Short</th><th>Struct.</th><th></th></tr></thead><tbody>${heat}</tbody></table></div>
    </div>
    <div class="g2">
      <div class="panel"><h3>Priority breakdown</h3><p>How the ${totals.lectures} lectures split by exam priority.</p>
        <div class="bars">${[['high', cnt.high, '#ffd60a'], ['med', cnt.med, '#8a7500'], ['low', cnt.low, '#4a3f00'], ['new', cnt.new, '#2a2a2a']].map((b) => `<i style="flex:${b[1] || 0.0001};background:${b[2]}" title="${PRI_LABEL[b[0]]}: ${b[1]}"></i>`).join('')}</div>
        <ul class="legend">${[['high', cnt.high, '#ffd60a'], ['med', cnt.med, '#8a7500'], ['low', cnt.low, '#4a3f00'], ['new', cnt.new, '#2a2a2a']].map((b) => `<li><i style="background:${b[2]};border:1px solid #555"></i>${PRI_LABEL[b[0]]}<b>${b[1]}</b></li>`).join('')}</ul></div>
      <div class="panel"><h3>Ranking</h3><p>Lectures ordered by mid-term weight.</p>
        <ul class="rank">${ranked.map((l) => `<li><a href="#/cc/lecture/${l.n}"><span class="k">L${l.n}</span><span class="nm">${esc(l.short)}</span><span class="v">${l.past} question${l.past === 1 ? '' : 's'}</span></a></li>`).join('')}
        <li><a href="#/cc/lecture/8"><span class="k">L8–12</span><span class="nm">Migration to Orchestration</span><span class="v">new in final</span></a></li></ul></div>
    </div>
    <div class="panel"><h3>High-yield topics by lecture</h3><p>Each block is one topic. Yellow blocks are the topics asked most often or most likely to be asked.</p><div class="hyblocks">${hyRows}</div></div>`;
  }

  /* ---------- rules ---------- */
  function viewRules() {
    return `
    <div class="eyebrow">Overview</div><h1 style="font-size:clamp(30px,4vw,44px);margin:8px 0 10px">Paper and golden rules</h1>
    <div class="rule"></div>
    <div class="kv">${cc.format.map((f) => `<div><span>${f[0]}</span>${f[1]}</div>`).join('')}</div>
    <h3 class="eyebrow" style="margin:6px 0 12px">Golden rules</h3>
    <ol class="rules">${cc.golden.map((g) => `<li><b>${g[0]}</b><span>${g[1]}</span></li>`).join('')}</ol>
    <h3 class="eyebrow" style="margin:6px 0 4px">Keyword → answer cheat table</h3>
    <p class="muted" style="margin:0 0 6px">Scenario MCQs usually reduce to one of these. Learn them cold.</p>
    <div class="tw"><table class="tbl cheat"><thead><tr><th>If the question says…</th><th>Answer</th></tr></thead><tbody>
      ${cc.cheat.map((c) => `<tr><td>${esc(c[0])}</td><td>${esc(c[1])}</td></tr>`).join('')}</tbody></table></div>`;
  }

  /* ---------- contact ---------- */
  function viewContact() {
    return `
    <div class="eyebrow">Overview</div><h1 style="font-size:clamp(30px,4vw,44px);margin:8px 0 10px">Message Sachi</h1>
    <div class="rule"></div>
    <p class="lede" style="margin-bottom:22px">Found a mistake, want a topic explained, or need more practice questions? Reach out.</p>
    <div class="clist">
      <a class="cl" href="${cc.links.whatsapp}" target="_blank" rel="noopener"><span class="ic">WA</span><div><b>Learn with Sachi on WhatsApp</b><span>Updates, notes and announcements</span></div></a>
      <a class="cl" href="${cc.links.youtube}" target="_blank" rel="noopener"><span class="ic">YT</span><div><b>YouTube (@sachithra228)</b><span>Kuppi sessions and walkthroughs</span></div></a>
      <a class="cl" href="${cc.links.syncode}" target="_blank" rel="noopener"><span class="ic">SY</span><div><b>SYNCODE (teamsyncode.com)</b><span>The team behind this portal</span></div></a>
    </div>`;
  }

  /* ---------- lecture page ---------- */
  function topicBody(t) {
    return `<div class="tb">
      ${t.notes && t.notes.length ? `<ul>${t.notes.map((n) => `<li>${n}</li>`).join('')}</ul>` : ''}
      ${t.table ? `<div class="tw"><table class="tbl"><thead><tr>${t.table.h.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${t.table.r.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}
      ${t.after ? `<ul>${t.after.map((n) => `<li>${n}</li>`).join('')}</ul>` : ''}
      ${t.tip ? `<div class="tip">${t.tip}</div>` : ''}
      <div class="done-row"><label class="chk"><input type="checkbox" data-done="${t.id}" ${done[t.id] ? 'checked' : ''}> Mark as revised</label></div>
    </div>`;
  }
  function viewLecture(lec) {
    const prev = lecByN(lec.n - 1), next = lecByN(lec.n + 1);
    const qCount = mcq.filter((q) => q.lec === lec.n).length + short.filter((q) => q.lec === lec.n).length + struct.filter((q) => q.lec === lec.n).length;
    return `
    <div class="eyebrow">Lecture ${lec.n}</div>
    <div class="ph"><div><h1>${esc(lec.title)}</h1><p class="lede">${esc(lec.sub)}</p></div>
      <a class="btn" href="#/cc/practice" data-practice="${lec.n}">Practice L${lec.n} (${qCount})</a></div>
    <div class="lec-top"><span class="pill ${lec.priority}">${PRI_LABEL[lec.priority]}</span>
      <span class="pill">${lec.past ? lec.past + ' mid-term question' + (lec.past === 1 ? '' : 's') : 'No mid-term data'}</span>
      <span class="pill">${lec.topics.length} topics · ${lec.hyCount} high yield</span>
      <span class="pill ok" id="lecDone">${lecDone(lec)}/${lec.topics.length} revised</span></div>
    <div class="rule" style="margin:8px 0 20px"></div>
    ${lec.src === 'outline' ? `<div class="note"><b>Written from the course outline.</b> ${esc(cc.lectureSources.outline)}</div>` : ''}
    <div class="tools">
      <button class="btn ghost sm" id="expandAll">Expand all</button>
      <button class="btn ghost sm" id="collapseAll">Collapse all</button>
      <span class="grow"></span>
      <label class="tg"><input type="checkbox" id="hyOnly"> High yield only</label>
    </div>
    <div id="topics">${lec.topics.map((t, i) => `<section class="topic ${t.hy ? 'hy' : ''} ${done[t.id] ? 'done' : ''} ${i === 0 ? 'open' : ''}" data-id="${t.id}" data-hy="${t.hy ? 1 : 0}">
      <button class="th" aria-expanded="${i === 0}"><span class="chev">&#9654;</span><span class="ttl">${t.t}</span>
        ${t.asked ? `<span class="asked">${esc(t.asked)}</span>` : ''}${t.hy ? '<span class="pill hy">High yield</span>' : ''}</button>
      ${topicBody(t)}</section>`).join('')}</div>
    <div class="pager">
      ${prev ? `<a class="btn ghost" href="#/cc/lecture/${prev.n}">&larr; L${prev.n} ${esc(prev.short)}</a>` : '<span></span>'}
      ${next ? `<a class="btn" href="#/cc/lecture/${next.n}">Next L${next.n} &rarr;</a>` : `<a class="btn" href="#/cc/practice">Go practise &rarr;</a>`}
    </div>`;
  }
  function bindLecture(lec) {
    const root = document.getElementById('topics');
    root.addEventListener('click', (e) => {
      const th = e.target.closest('.th');
      if (th) { const s = th.parentElement; const o = s.classList.toggle('open'); th.setAttribute('aria-expanded', o); }
    });
    root.addEventListener('change', (e) => {
      const id = e.target.dataset && e.target.dataset.done;
      if (!id) return;
      if (e.target.checked) done[id] = 1; else delete done[id];
      store.set(DONE_KEY, done);
      e.target.closest('.topic').classList.toggle('done', e.target.checked);
      document.getElementById('lecDone').textContent = lecDone(lec) + '/' + lec.topics.length + ' revised';
      const row = document.querySelector('.side a.ni.on .r');
      if (row) row.textContent = lecDone(lec) + '/' + lec.topics.length;
    });
    const setAll = (open) => root.querySelectorAll('.topic').forEach((s) => { if (s.style.display !== 'none') { s.classList.toggle('open', open); s.querySelector('.th').setAttribute('aria-expanded', open); } });
    document.getElementById('expandAll').onclick = () => setAll(true);
    document.getElementById('collapseAll').onclick = () => setAll(false);
    document.getElementById('hyOnly').onchange = (e) => root.querySelectorAll('.topic').forEach((s) => { s.style.display = e.target.checked && s.dataset.hy !== '1' ? 'none' : ''; });
    const pb = document.querySelector('[data-practice]');
    if (pb) pb.addEventListener('click', () => { setup.lec = String(lec.n); sectionTab = 'mcq'; quiz = null; });
  }

  /* ---------- practice ---------- */
  const setup = { lec: 'all', src: 'all', count: 20, mode: 'learn' };
  let quiz = null;
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const lecOptions = (sel) => `<option value="all">All lectures</option>` + cc.lectures.map((l) => `<option value="${l.n}" ${String(sel) === String(l.n) ? 'selected' : ''}>L${l.n} ${esc(l.title)}</option>`).join('');
  const filt = (arr) => arr.filter((q) => (setup.lec === 'all' || String(q.lec) === String(setup.lec)) && (setup.src === 'all' || (setup.src === 'past' ? isPast(q) : q.src === 'practice')));

  function renderPractice($main) {
    const draw = () => {
      const counts = { mcq: filt(mcq).length, short: filt(short).length, struct: filt(struct).length };
      $main.innerHTML = `
      <div class="eyebrow">Practice</div><h1 style="font-size:clamp(30px,4vw,44px);margin:8px 0 10px">Practice questions</h1>
      <p class="lede">Mid-term past-paper questions plus practice questions for every lecture. Your results are saved in this browser.</p>
      <div class="rule"></div>
      <div class="tabs" role="tablist">
        <button class="tab ${sectionTab === 'mcq' ? 'on' : ''}" data-tab="mcq">MCQ <small>${counts.mcq}</small></button>
        <button class="tab ${sectionTab === 'short' ? 'on' : ''}" data-tab="short">Short answers <small>${counts.short}</small></button>
        <button class="tab ${sectionTab === 'struct' ? 'on' : ''}" data-tab="struct">Structured / essay <small>${counts.struct}</small></button>
      </div>
      <div class="form">
        <div class="fld"><label for="fLec">Lecture</label><select id="fLec">${lecOptions(setup.lec)}</select></div>
        <div class="fld"><label for="fSrc">Source</label><select id="fSrc">
          <option value="all" ${setup.src === 'all' ? 'selected' : ''}>Past paper + practice</option>
          <option value="past" ${setup.src === 'past' ? 'selected' : ''}>Past paper only</option>
          <option value="practice" ${setup.src === 'practice' ? 'selected' : ''}>Practice only</option></select></div>
      </div>
      <div id="pbody"></div>`;
      $main.querySelectorAll('.tab').forEach((b) => b.onclick = () => { sectionTab = b.dataset.tab; quiz = null; draw(); });
      $main.querySelector('#fLec').onchange = (e) => { setup.lec = e.target.value; quiz = null; draw(); };
      $main.querySelector('#fSrc').onchange = (e) => { setup.src = e.target.value; quiz = null; draw(); };
      const body = $main.querySelector('#pbody');
      if (sectionTab === 'mcq') drawMcq(body, draw); else if (sectionTab === 'short') drawShort(body); else drawStruct(body);
    };
    draw();
  }

  function qMeta(q) {
    const lec = lecByN(q.lec);
    return `<div class="qmeta"><span class="pill">L${q.lec} ${esc(lec ? lec.short : '')}</span><span class="pill ${isPast(q) ? 'high' : ''}">${SOURCE_LABEL[q.src]}</span></div>`;
  }

  /* --- MCQ --- */
  function drawMcq(body, redraw) {
    const pool = filt(mcq);
    if (!quiz) {
      if (!pool.length) { body.innerHTML = '<div class="empty">No MCQs match these filters.</div>'; return; }
      const counts = [10, 20, 30, 'all'];
      const seen = pool.filter((q) => qstat[q.id]).length;
      const right = pool.filter((q) => qstat[q.id] && qstat[q.id].last === 1).length;
      body.innerHTML = `
      <div class="panel"><h3>Start a quiz</h3><p>${pool.length} MCQs available. You have attempted ${seen} of them${seen ? ` and got the latest attempt right on ${right}` : ''}.</p>
        <div class="form">
          <div class="fld"><label>Number of questions</label><div class="seg" id="sCount">${counts.map((c) => `<button data-v="${c}" class="${String(setup.count) === String(c) ? 'on' : ''}">${c === 'all' ? 'All (' + pool.length + ')' : c}</button>`).join('')}</div></div>
          <div class="fld"><label>Mode</label><div class="seg" id="sMode">
            <button data-v="learn" class="${setup.mode === 'learn' ? 'on' : ''}">Learn (instant feedback)</button>
            <button data-v="exam" class="${setup.mode === 'exam' ? 'on' : ''}">Mock exam (timed)</button></div></div>
        </div>
        <button class="btn" id="startQ">Start</button>
        ${seen ? `<button class="btn ghost" id="resetQ" style="margin-left:10px">Reset my results</button>` : ''}
      </div>`;
      body.querySelector('#sCount').onclick = (e) => { const b = e.target.closest('button'); if (b) { setup.count = b.dataset.v === 'all' ? 'all' : Number(b.dataset.v); drawMcq(body, redraw); } };
      body.querySelector('#sMode').onclick = (e) => { const b = e.target.closest('button'); if (b) { setup.mode = b.dataset.v; drawMcq(body, redraw); } };
      body.querySelector('#startQ').onclick = () => {
        const list = shuffle(pool).slice(0, setup.count === 'all' ? pool.length : setup.count);
        quiz = { list, i: 0, sel: {}, checked: {}, finished: false, mode: setup.mode, started: Date.now(), limit: setup.mode === 'exam' ? Math.round(list.length * 90) : 0 };
        drawMcq(body, redraw);
      };
      const rq = body.querySelector('#resetQ');
      if (rq) rq.onclick = () => { if (confirm('Clear your saved quiz results?')) { qstat = {}; store.set(STAT_KEY, qstat); drawMcq(body, redraw); } };
      return;
    }
    if (quiz.finished) return drawResults(body, redraw);
    drawQuestion(body, redraw);
  }

  let timerId = null;
  function drawQuestion(body, redraw) {
    clearInterval(timerId);
    const qz = quiz, q = qz.list[qz.i], multi = q.ans.length > 1, exam = qz.mode === 'exam';
    const sel = qz.sel[q.id] || [], checked = !!qz.checked[q.id];
    const correct = (id) => { const qq = qz.list.find((x) => x.id === id); const s = (qz.sel[id] || []).slice().sort().join(); return s === qq.ans.slice().sort().join(); };
    const optHtml = q.opts.map((o, i) => {
      let cls = sel.includes(i) ? 'sel' : '';
      if (checked) cls = q.ans.includes(i) ? (sel.includes(i) ? 'right' : 'miss') : (sel.includes(i) ? 'wrong' : '');
      return `<button class="opt ${cls}" data-i="${i}" ${checked ? 'disabled' : ''}><span class="l">${L[i]}</span><span>${esc(o)}</span></button>`;
    }).join('');
    const dots = qz.list.map((x, i) => {
      let c = i === qz.i ? 'cur' : '';
      if (qz.checked[x.id]) c += correct(x.id) ? ' ok' : ' no'; else if ((qz.sel[x.id] || []).length) c += ' ans';
      return `<button class="${c}" data-go="${i}" aria-label="Question ${i + 1}">${i + 1}</button>`;
    }).join('');
    body.innerHTML = `
    <div class="qhead"><span class="mono muted">Question ${qz.i + 1} / ${qz.list.length}${exam ? ' · mock exam' : ' · learn mode'}</span>
      ${exam ? `<span class="timer" id="timer"></span>` : `<button class="btn ghost sm" id="quit">End quiz</button>`}</div>
    <div class="qprog"><i style="width:${(qz.i + 1) / qz.list.length * 100}%"></i></div>
    <div class="qcard">${qMeta(q)}
      <p class="qtext">${esc(q.q)}</p>
      ${multi ? `<p class="qhint">Select ${q.ans.length} answers</p>` : '<p class="qhint">Select one answer</p>'}
      <div class="opts">${optHtml}</div>
      ${checked && !exam ? `<div class="exp"><div class="v ${correct(q.id) ? 'ok' : 'bad'}">${correct(q.id) ? 'CORRECT' : 'INCORRECT · answer: ' + q.ans.map((a) => L[a]).join(', ')}</div>${q.exp}</div>` : ''}
      <div class="qnav">
        <button class="btn ghost sm" id="prevQ" ${qz.i === 0 ? 'disabled' : ''}>&larr; Previous</button>
        ${!exam && !checked ? `<button class="btn sm" id="checkQ" ${sel.length ? '' : 'disabled'}>Check answer</button>` : ''}
        <span class="sp"></span>
        ${qz.i < qz.list.length - 1 ? `<button class="btn sm" id="nextQ">Next &rarr;</button>` : `<button class="btn sm" id="finishQ">Finish &amp; see score</button>`}
      </div>
    </div>
    <div class="qdots">${dots}</div>`;

    body.querySelector('.opts').onclick = (e) => {
      const b = e.target.closest('.opt'); if (!b || checked) return;
      const i = Number(b.dataset.i); let s = (qz.sel[q.id] || []).slice();
      if (multi) { s = s.includes(i) ? s.filter((x) => x !== i) : s.concat(i); } else s = [i];
      qz.sel[q.id] = s;
      if (!multi && !exam) { /* single answer: wait for Check so users can change their mind */ }
      drawQuestion(body, redraw);
    };
    const on = (id, fn) => { const el = body.querySelector('#' + id); if (el) el.onclick = fn; };
    on('checkQ', () => { qz.checked[q.id] = true; const ok = correct(q.id); const st = qstat[q.id] || { r: 0, w: 0 }; ok ? st.r++ : st.w++; st.last = ok ? 1 : 0; qstat[q.id] = st; store.set(STAT_KEY, qstat); drawQuestion(body, redraw); });
    on('prevQ', () => { qz.i--; drawQuestion(body, redraw); });
    on('nextQ', () => { qz.i++; drawQuestion(body, redraw); });
    on('finishQ', () => finish(body, redraw));
    on('quit', () => { if (confirm('End this quiz and see your score?')) finish(body, redraw); });
    body.querySelector('.qdots').onclick = (e) => { const b = e.target.closest('button'); if (b) { qz.i = Number(b.dataset.go); drawQuestion(body, redraw); } };
    if (exam) {
      const t = body.querySelector('#timer');
      const tick = () => {
        const left = Math.max(0, qz.limit - Math.floor((Date.now() - qz.started) / 1000));
        t.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0');
        t.classList.toggle('low', left < 60);
        if (left === 0) { clearInterval(timerId); finish(body, redraw); }
      };
      tick(); timerId = setInterval(tick, 1000);
    }
  }
  function finish(body, redraw) {
    clearInterval(timerId);
    const qz = quiz; qz.finished = true; qz.ended = Date.now();
    if (qz.mode === 'exam') {
      qz.list.forEach((q) => {
        if (qz.checked[q.id]) return;
        const s = (qz.sel[q.id] || []).slice().sort().join(); if (!s) return;
        const ok = s === q.ans.slice().sort().join(); const st = qstat[q.id] || { r: 0, w: 0 }; ok ? st.r++ : st.w++; st.last = ok ? 1 : 0; qstat[q.id] = st;
      });
      store.set(STAT_KEY, qstat);
    }
    drawResults(body, redraw);
  }
  function drawResults(body, redraw) {
    const qz = quiz;
    const ok = (q) => (qz.sel[q.id] || []).slice().sort().join() === q.ans.slice().sort().join();
    const right = qz.list.filter(ok).length, answered = qz.list.filter((q) => (qz.sel[q.id] || []).length).length;
    const pct = Math.round(right / qz.list.length * 100);
    const byLec = {};
    qz.list.forEach((q) => { const b = byLec[q.lec] || (byLec[q.lec] = { r: 0, t: 0 }); b.t++; if (ok(q)) b.r++; });
    const wrong = qz.list.filter((q) => !ok(q));
    body.innerHTML = `
    <div class="panel"><div class="score"><div class="big">${pct}%</div>
      <div><b style="font-size:20px">${right} / ${qz.list.length} correct</b><div class="muted">${answered} answered · ${qz.list.length - answered} skipped · ${Math.round(((qz.ended || Date.now()) - qz.started) / 1000 / 60 * 10) / 10} min</div>
      <div class="muted">${pct >= 75 ? 'Strong. Keep drilling the misses.' : pct >= 50 ? 'Getting there. Review the explanations below.' : 'Re-read the lecture notes, then retry.'}</div></div></div>
      <div class="tw"><table class="tbl"><thead><tr><th>Lecture</th><th>Score</th></tr></thead><tbody>${Object.keys(byLec).sort((a, b) => a - b).map((n) => `<tr><td><a href="#/cc/lecture/${n}">L${n} ${esc(lecByN(n).title)}</a></td><td>${byLec[n].r} / ${byLec[n].t}</td></tr>`).join('')}</tbody></table></div>
      <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn" id="again">New quiz</button>${wrong.length ? `<button class="btn ghost" id="retryWrong">Retry ${wrong.length} wrong</button>` : ''}</div></div>
    ${wrong.length ? `<h3 class="eyebrow" style="margin:20px 0 12px">Review: questions to fix</h3><div class="review">${wrong.map((q) => `
      <div class="qcard">${qMeta(q)}<p class="qtext">${esc(q.q)}</p>
        <div class="opts">${q.opts.map((o, i) => { const s = (qz.sel[q.id] || []).includes(i); const c = q.ans.includes(i) ? (s ? 'right' : 'miss') : (s ? 'wrong' : ''); return `<div class="opt ${c}"><span class="l">${L[i]}</span><span>${esc(o)}</span></div>`; }).join('')}</div>
        <div class="exp"><div class="v bad">ANSWER: ${q.ans.map((a) => L[a]).join(', ')}</div>${q.exp}</div></div>`).join('')}</div>` : ''}`;
    body.querySelector('#again').onclick = () => { quiz = null; redraw(); };
    const rw = body.querySelector('#retryWrong');
    if (rw) rw.onclick = () => { quiz = { list: shuffle(wrong), i: 0, sel: {}, checked: {}, finished: false, mode: 'learn', started: Date.now(), limit: 0 }; redraw(); };
  }

  /* --- short answers --- */
  function drawShort(body) {
    const list = filt(short);
    if (!list.length) { body.innerHTML = '<div class="empty">No short-answer questions match these filters.</div>'; return; }
    body.innerHTML = `<p class="muted" style="margin:0 0 14px">Try to answer in your head first, then open the answer. Fill-in-the-blank style, like the mid-term short answers.</p>` +
      list.map((q) => `<details class="item"><summary><span class="q">${esc(q.q)}</span><span class="pill ${isPast(q) ? 'high' : ''}">${SOURCE_LABEL[q.src]}</span><span class="chev">&#9654;</span></summary>
        <div class="ans"><div class="qmeta" style="margin-top:12px"><span class="pill">L${q.lec} ${esc(lecByN(q.lec).short)}</span></div><div class="ansline"><b>Answer:</b> ${esc(q.a)}</div></div></details>`).join('');
  }

  /* --- structured --- */
  function drawStruct(body) {
    const list = filt(struct);
    if (!list.length) { body.innerHTML = '<div class="empty">No structured questions match these filters.</div>'; return; }
    body.innerHTML = `<p class="muted" style="margin:0 0 14px">Write your own answer on paper first, then compare with the model answer. Model answers are written for revision, not copied from the lecturer.</p>` +
      list.map((q) => `<details class="item"><summary><span class="q">${esc(q.title)}</span><span class="pill ${isPast(q) ? 'high' : ''}">${SOURCE_LABEL[q.src]}</span><span class="chev">&#9654;</span></summary>
        <p class="qfull">${esc(q.q)}</p>
        <div class="ans"><div class="qmeta" style="margin-top:12px"><span class="pill">L${q.lec} ${esc(lecByN(q.lec).short)}</span>${q.hint ? `<span class="pill">${esc(q.hint)}</span>` : ''}</div>
        <div class="ansline"><b>Model answer</b></div><div class="tb" style="display:block;border:0;padding:0">${q.a.replace(/<table>/g, '<div class="tw"><table class="tbl">').replace(/<\/table>/g, '</table></div>')}</div></div></details>`).join('');
  }

  go();
})();
