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
  const SOURCE_LABEL = Object.assign({ past: 'Past paper', adapted: 'Past paper (reworded options)', practice: 'Practice' }, (P.modules[P.key || 'cc'] || {}).sourceLabels);

  /* ---------- build the module (key is set by the module's own data file) ---------- */
  const KEY = P.key || 'cc';
  const cc = P.modules[KEY];   // 'cc' here just means 'the current module'
  cc.lectures = P[KEY + 'Lectures'].slice().sort((a, b) => a.n - b.n);
  const mcq = P[KEY + 'McqRaw'].map((r, i) => ({
    id: 'm' + (i + 1), kind: 'mcq', lec: r[0], src: r[1], q: r[2], opts: r[3],
    ans: r[4].split('').map((c) => L.indexOf(c)), exp: r[5], lvl: r[6]
  }));
  const short = P[KEY + 'ShortRaw'].map((r, i) => ({ id: 's' + (i + 1), kind: 'short', lec: r[0], src: r[1], q: r[2], a: r[3], paper: r[4] }));
  const struct = P[KEY + 'StructuredRaw'].map((r, i) => ({ id: 't' + (i + 1), kind: 'struct', lec: r[0], src: r[1], title: r[2], q: r[3], a: r[4], hint: r[5], paper: r[6] }));
  const isPast = (q) => q.src === 'past' || q.src === 'adapted';
  const pastCount = (n, kind) => [mcq, short, struct].reduce((t, arr) => t + arr.filter((q) => q.lec === n && isPast(q) && (!kind || q.kind === kind)).length, 0);
  const SHORT = cc.shorts || {};
  const TAB = Object.assign({ mcq: 'MCQ', short: 'Short answers', struct: 'Structured / essay' }, cc.tabNames);
  cc.lectures.forEach((lec) => {
    lec.short = SHORT[lec.n] || lec.title;
    lec.past = pastCount(lec.n);
    lec.pastBy = { mcq: pastCount(lec.n, 'mcq'), short: pastCount(lec.n, 'short'), struct: pastCount(lec.n, 'struct') };
    lec.pastByPaper = {};
    (cc.papers || []).forEach((pp) => { lec.pastByPaper[pp.id] = [mcq, short, struct].reduce((t, arr) => t + arr.filter((q) => q.lec === lec.n && isPast(q) && (q.paper || '').split(',').includes(pp.id)).length, 0); });
    /* paperMap: { paperId: { lectureNo: count } } adds past-paper questions that are not in the question bank (for example final papers that are only shown as PDFs) */
    Object.keys(cc.paperMap || {}).forEach((pid) => { const c = (cc.paperMap[pid] || {})[lec.n] || 0; if (c) { lec.pastByPaper[pid] = (lec.pastByPaper[pid] || 0) + c; lec.past += c; } });
    const th = cc.priority || { high: 10, med: 3 };
    lec.priority = lec.past >= th.high ? 'high' : lec.past >= th.med ? 'med' : lec.past >= 1 ? 'low' : (lec.n >= (cc.newFrom || 999) ? 'new' : 'none');
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
  const DONE_KEY = 'kuppi.' + KEY + '.done';
  const STAT_KEY = 'kuppi.' + KEY + '.qstat';
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
    if (p[0] !== KEY) { location.replace('#/' + KEY); return; }
    renderModule(p.slice(1));
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', go);

  function daysLeft(mod) {
    if (!mod.examDate) return null;
    const d = new Date(mod.examDate + 'T00:00:00');
    return Math.ceil((d - new Date()) / 86400000);
  }
  /* ---------- lecture slides (any module that defines <key>Slides) ---------- */
  const SLIDES = P[KEY + 'Slides'] || null;
  let slKeyHandler = null;
  function slideHTML(s) {
    const lead = s.lead ? `<p class="sl-lead">${s.lead}</p>` : '';
    const bl = s.b ? `<ul class="sl-b">${s.b.map((x) => `<li>${x}</li>`).join('')}</ul>` : '';
    const tb = s.tbl ? `<table class="sl-t"><thead><tr>${s.tbl.h.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${s.tbl.r.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>` : '';
    const cl = s.cols ? `<div class="sl-cols c${s.cols.length}">${s.cols.map((c) => `<ul>${c.map((x) => `<li>${x}</li>`).join('')}</ul>`).join('')}</div>` : '';
    return `<div class="sl-in ${s.kind === 'title' ? 'sl-title' : ''}"><h2>${s.t}</h2>${lead}${bl}${tb}${cl}</div>`;
  }
  function renderSlides($main, args) {
    let li = SLIDES.findIndex((d) => d.n === Number(args[0])); if (li < 0) li = 0;
    let si = Math.max(0, (Number(args[1]) || 1) - 1);
    $main.innerHTML = `
    <div class="sl-head">
      <div>
        <div class="eyebrow">Lecture slides</div>
        <h1 style="font-size:clamp(30px,4vw,44px);margin:8px 0 10px">Lecture slides</h1>
        <p class="lede">Short, simple slides for every lecture. Use the arrow keys or swipe. Press <b>F</b> for full screen.</p>
      </div>
      <label class="sl-pick"><span>Lecture</span>
        <select id="slSel" aria-label="Choose a lecture">${SLIDES.map((d, i) => `<option value="${i}">L${d.n}: ${esc(d.title)}</option>`).join('')}</select>
      </label>
    </div>
    <div class="rule"></div>
    <div class="sl-wrap" id="slWrap">
      <div class="sl-stage" id="slStage" aria-live="polite"></div>
      <div class="sl-bar">
        <button class="btn ghost sm" id="slPrev">&larr; Previous</button>
        <span class="sl-count" id="slCount"></span>
        <button class="btn sm" id="slNext">Next &rarr;</button>
        <button class="btn ghost sm" id="slFull">Full screen (F)</button>
        ${cc.slidesPdf ? `<a class="btn ghost sm" href="${esc(cc.slidesPdf)}" download>Download slides (PDF)</a>` : ''}
      </div>
    </div>`;
    const $stage = document.getElementById('slStage'), $count = document.getElementById('slCount'), $sel = document.getElementById('slSel');
    const $wrap = document.getElementById('slWrap'), $prev = document.getElementById('slPrev'), $next = document.getElementById('slNext');
    function draw() {
      const d = SLIDES[li]; si = Math.max(0, Math.min(si, d.slides.length - 1));
      $stage.innerHTML = slideHTML(d.slides[si]);
      $count.textContent = `L${d.n}  ${si + 1} / ${d.slides.length}`;
      $sel.value = String(li);
      $prev.disabled = li === 0 && si === 0;
      $next.disabled = li === SLIDES.length - 1 && si === d.slides.length - 1;
      history.replaceState(null, '', `#/${KEY}/slides/${d.n}/${si + 1}`);
    }
    const next = () => { const d = SLIDES[li]; if (si < d.slides.length - 1) si++; else if (li < SLIDES.length - 1) { li++; si = 0; } draw(); };
    const prev = () => { if (si > 0) si--; else if (li > 0) { li--; si = SLIDES[li].slides.length - 1; } draw(); };
    const toggleFull = () => { if (document.fullscreenElement) document.exitFullscreen(); else if ($wrap.requestFullscreen) $wrap.requestFullscreen(); };
    $prev.onclick = prev; $next.onclick = next;
    document.getElementById('slFull').onclick = toggleFull;
    $sel.onchange = () => { li = Number($sel.value); si = 0; draw(); $sel.blur(); };
    let x0 = null;
    $stage.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    $stage.addEventListener('touchend', (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 50) (dx < 0 ? next : prev)(); });
    slKeyHandler = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || /^(input|textarea|select)$/i.test((e.target.tagName || ''))) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
      else if (e.key === 'f' || e.key === 'F') toggleFull();
    };
    document.addEventListener('keydown', slKeyHandler);
    draw();
  }

  /* ---------- simple exam map and rules (modules with simple: true) ---------- */
  function viewMapSimple() {
    const maxPast = Math.max(1, ...cc.lectures.map((l) => l.past));
    const flow = (cc.flow || []).map((f, i) => `${i ? '<span class="farrow" aria-hidden="true">&rarr;</span>' : ''}
      <a class="fcard" href="#/${KEY}/${f.href}"><span class="fq">${esc(f.q)}</span><b class="fm">${esc(f.marks)}<small> marks</small></b><span class="ft">${esc(f.title)}</span><span class="fs">${esc(f.sub)}</span></a>`).join('');
    const rows = cc.lectures.map((l) => `<a class="frow" href="#/${KEY}/lecture/${l.n}">
      <span class="k">L${l.n}</span><span class="nm">${esc(l.short)}</span>
      <span class="fbar"><i class="${l.priority}" style="width:${Math.max(l.past ? 5 : 0, Math.round(l.past / maxPast * 100))}%"></i></span>
      <span class="pill ${l.priority}">${PRI_LABEL[l.priority]}</span></a>`).join('');
    return `
    <div class="ph"><div><div class="eyebrow">Overview</div><h1>Exam map</h1><p class="lede">${esc(cc.simpleLede || cc.examNote)}</p></div>
      ${REFS ? `<a class="btn" href="#/${KEY}/referrals">Referral sheets</a>` : ''}</div>
    <div class="rule"></div>
    <h3 class="eyebrow" style="margin:0 0 12px">The paper</h3>
    <div class="flow">${flow}</div>
    ${cc.flowNote ? `<p class="muted fnote">${esc(cc.flowNote)}</p>` : ''}
    <h3 class="eyebrow" style="margin:30px 0 4px">Where to focus</h3>
    <p class="muted" style="margin:0 0 12px">The bar shows how often each lecture was asked in past papers. Select a lecture to open it.</p>
    <div class="focus">${rows}</div>`;
  }
  function viewRulesSimple() {
    const cheat = cc.cheat && cc.cheat.length ? `<details class="recall"><summary>Quick recall lists (${cc.cheat.length})</summary>
      <div class="tw"><table class="tbl cheat"><thead><tr><th>${(cc.cheatHead || ['Topic', 'Remember'])[0]}</th><th>${(cc.cheatHead || ['Topic', 'Remember'])[1]}</th></tr></thead><tbody>
      ${cc.cheat.map((c) => `<tr><td>${cc.cheatHtml ? c[0] : esc(c[0])}</td><td>${cc.cheatHtml ? c[1] : esc(c[1])}</td></tr>`).join('')}</tbody></table></div></details>` : '';
    return `
    <div class="eyebrow">Overview</div><h1 style="font-size:clamp(30px,4vw,44px);margin:8px 0 10px">Paper and golden rules</h1>
    <div class="rule"></div>
    <div class="kv">${cc.quickFormat.map((f) => `<div><span>${f[0]}</span>${f[1]}</div>`).join('')}</div>
    <h3 class="eyebrow" style="margin:6px 0 12px">Golden rules</h3>
    <ol class="rules">${cc.quickRules.map((g) => `<li><b>${g[0]}</b><span>${g[1]}</span></li>`).join('')}</ol>
    ${cheat}`;
  }

  /* ---------- past papers: view online and download (modules with paperGroups) ---------- */
  const PAPERS = cc.paperGroups ? cc.paperGroups : null;
  const PAPER_LIST = PAPERS ? PAPERS.reduce((a, g) => a.concat(g.items), []) : [];
  const fmtKB = (k) => (k >= 1024 ? (k / 1024).toFixed(1) + ' MB' : k + ' KB');
  let pdfLib = null, pvTok = 0;
  function loadPdfJs() {
    return pdfLib || (pdfLib = new Promise((ok, no) => {
      if (window.pdfjsLib) return ok(window.pdfjsLib);
      const sc = document.createElement('script');
      sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      sc.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'; ok(window.pdfjsLib); };
      sc.onerror = () => { pdfLib = null; no(new Error('pdf.js')); };
      document.head.appendChild(sc);
    }));
  }
  async function showPdf(file, box, pgn) {
    const tok = ++pvTok;
    try {
      const pdf = await (await loadPdfJs()).getDocument(file).promise;
      if (tok !== pvTok) return;
      if (pgn) pgn.textContent = pdf.numPages + (pdf.numPages > 1 ? ' pages' : ' page');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const io = new IntersectionObserver((es) => es.forEach(async (e) => {
        if (!e.isIntersecting) return; io.unobserve(e.target);
        const pg = await pdf.getPage(Number(e.target.dataset.p)); if (tok !== pvTok) return;
        const b = pg.getViewport({ scale: 1 }), vp = pg.getViewport({ scale: Math.min(Math.max(e.target.clientWidth, 700), 1000) * dpr / b.width });
        const cv = document.createElement('canvas'); cv.width = vp.width; cv.height = vp.height;
        await pg.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise;
        if (tok === pvTok) e.target.prepend(cv);
      }), { rootMargin: '700px 0px' });
      const pages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const v = (await pdf.getPage(i)).getViewport({ scale: 1 }), d = document.createElement('div');
        d.className = 'vpage'; d.dataset.p = i; d.style.aspectRatio = v.width + ' / ' + v.height; d.innerHTML = `<i>${i} / ${pdf.numPages}</i>`; pages.push(d);
      }
      if (tok !== pvTok) return;
      box.innerHTML = ''; pages.forEach((d) => { box.appendChild(d); io.observe(d); });
    } catch (err) { if (tok === pvTok) box.innerHTML = '<div class="vmsg">The preview is not available right now. Use <b>Open in new tab</b> or <b>Download</b> above.</div>'; }
  }
  /* a paper that has model answers (the module sets answers: 'dataName' on the paper): paper on the left, answers one by one on the right */
  function renderPaperSplit($main, cur, tabs, qid, AN) {
    const items = AN.items; let k = items.findIndex((x) => x.id === qid); if (k < 0) k = Math.max(0, items.findIndex((x) => x.dflt));
    const it = items[k], base = '#/' + KEY + '/papers/' + cur.id, prev = items[k - 1], next = items[k + 1];
    const stepTabs = items.map((x, i) => `<a class="sa-t ${i === k ? 'on' : ''}" href="${base}/${x.id}"><b>${esc(x.tag)}</b><small>${x.marks} marks</small></a>`).join('');
    const plan = it.plan.map((r) => `<tr><td>${r[0]}</td><td class="n">${esc(r[1])}</td></tr>`).join('');
    $main.innerHTML = `
    <div class="eyebrow">Papers</div>
    <h1 style="font-size:clamp(30px,4vw,44px);margin:8px 0 10px">Past papers</h1>
    <p class="lede">Model papers and past papers. View them here or download them. The sample paper also has model answers, one question at a time.</p>
    <div class="rule"></div>
    ${tabs}
    <div class="sa-mob"><button type="button" data-v="paper">Paper</button><button type="button" data-v="ans" class="on">Answers</button></div>
    <div class="sa" data-view="ans">
      <section class="sa-l">
        <div class="vbar">
          <div class="vt"><b>${esc(cur.t)}</b><span>${esc(cur.sub)} &middot; <span id="pgn">PDF</span></span></div>
          <a class="btn sm" href="${esc(cur.file)}" target="_blank" rel="noopener">Open in new tab</a>
          <a class="btn ghost sm" href="${esc(cur.file)}" download>Download</a>
        </div>
        <div class="vwrap" id="pv"><div class="vmsg">Loading preview...</div></div>
      </section>
      <section class="sa-r">
        <div class="sa-hd"><span class="eyebrow">Answers, one by one</span><span class="sa-ord">Order: Q2, then Q3, then the MCQs</span></div>
        <div class="sa-ts">${stepTabs}</div>
        <article class="sa-card">
          <header><span class="sa-tag">${esc(it.tag)}</span><h2>${esc(it.short)}</h2><span class="sa-mk">${it.marks} marks</span></header>
          <div class="sa-q"><em>The question</em>${it.q}</div>
          <h4 class="sa-h">What the examiner wants</h4><ul>${it.wants.map((x) => `<li>${x}</li>`).join('')}</ul>
          ${it.body}
          <h4 class="sa-h">How the marks are earned</h4>
          <table class="tbl"><tr><th>Part</th><th>Marks</th></tr>${plan}</table><p class="sa-note">${esc(it.planNote)}</p>
          <h4 class="sa-h">Common mistakes</h4><ul class="sa-bad">${it.mistakes.map((x) => `<li>${x}</li>`).join('')}</ul>
        </article>
        <div class="sa-nav">
          ${prev ? `<a class="btn ghost" href="${base}/${prev.id}">&larr; ${esc(prev.tag)}</a>` : '<span></span>'}
          ${next ? `<a class="btn" href="${base}/${next.id}">Next: ${esc(next.tag)} &rarr;</a>` : `<a class="btn ghost" href="${base}/${items[0].id}">Back to ${esc(items[0].tag)}</a>`}
        </div>
      </section>
    </div>`;
    const wrap = $main.querySelector('.sa'), mob = $main.querySelector('.sa-mob');
    $main.querySelector('.sa-card').onclick = (e) => { const f = e.target.closest('.sa-fig'); if (!f) return; const ov = document.createElement('div'); ov.className = 'sa-zoom'; ov.innerHTML = f.querySelector('svg').outerHTML + '<span>Click anywhere or press Esc to close</span>'; ov.onclick = () => ov.remove(); document.body.appendChild(ov); };
    if (!window.__saEsc) { window.__saEsc = true; document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { const z = document.querySelector('.sa-zoom'); if (z) z.remove(); } }); }
    mob.onclick = (e) => { const b = e.target.closest('button'); if (!b) return; wrap.dataset.view = b.dataset.v; mob.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b)); };
    showPdf(cur.file, document.getElementById('pv'), document.getElementById('pgn'));
  }
  function renderPapers($main, args) {
    const cur = PAPER_LIST.find((x) => x.id === args[0]) || PAPER_LIST[0];
    const tabs = `<div class="ptabs">${PAPER_LIST.map((x) => `<a class="ptab ${x === cur ? 'on' : ''}" href="#/${KEY}/papers/${x.id}">${esc(x.tab)}<small>${fmtKB(x.kb)}</small></a>`).join('')}</div>`;
    const AN = cur.answers && window.PORTAL[cur.answers];
    if (AN && AN.items) return renderPaperSplit($main, cur, tabs, args[1], AN);
    const from = cc.lectures.filter((l) => (l.pastByPaper || {})[cur.paper] > 0).map((l) => `<a class="pchip" href="#/${KEY}/lecture/${l.n}">L${l.n}<small>${l.pastByPaper[cur.paper]}</small></a>`).join('');
    $main.innerHTML = `
    <div class="eyebrow">Papers</div>
    <h1 style="font-size:clamp(30px,4vw,44px);margin:8px 0 10px">Past papers</h1>
    <p class="lede">Model papers and past papers. View them here or download them.</p>
    <div class="rule"></div>
    ${tabs}
    <div class="vbar">
      <div class="vt"><b>${esc(cur.t)}</b><span>${esc(cur.sub)} &middot; <span id="pgn">PDF</span></span>
        ${from ? `<div class="pfrom"><em>${esc(cc.fromLabel || 'Questions in the portal from this paper')}</em>${from}</div>` : ''}</div>
      <a class="btn sm" href="${esc(cur.file)}" target="_blank" rel="noopener">Open in new tab</a>
      <a class="btn ghost sm" href="${esc(cur.file)}" download>Download</a>
    </div>
    <div class="vwrap" id="pv"><div class="vmsg">Loading preview...</div></div>`;
    showPdf(cur.file, document.getElementById('pv'), document.getElementById('pgn'));
  }

  /* ---------- referral sheets: anyone uploads a PDF, everyone previews and downloads (modules with referrals: true) ---------- */
  const REFS = !!cc.referrals;
  const OFF = Array.isArray(cc.refFiles) ? cc.refFiles : [];
  /* MCQ practice page (modules that set mcqPractice: true and load <key>Mcq data plus exam-engine/mcq.js) */
  const MCQD = cc.mcqPractice ? (P[KEY + 'Mcq'] || null) : null;
  const mcqTotal = MCQD ? Object.keys(MCQD).reduce((t, n) => t + Object.keys(MCQD[n]).reduce((u, lv) => u + MCQD[n][lv].length, 0), 0) : 0;
  const REF_KEYS = 'kuppi.' + KEY + '.refkeys';
  const refBlobs = {};
  let refAdmin = '';
  try { refAdmin = sessionStorage.getItem('kuppi.admin') || ''; } catch (e) { /* storage may be blocked */ }
  const bytesFmt = (n) => (n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB');
  const dateFmt = (ts) => new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  async function refApi(method, qs, body, hdr) {
    const r = await fetch('/api/referrals' + (qs || ''), { method, cache: 'no-store', headers: Object.assign(body ? { 'Content-Type': 'application/json' } : {}, hdr || {}), body: body ? JSON.stringify(body) : undefined });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(j.message || 'Something went wrong. Please try again.'); e.status = r.status; e.code = j.error; throw e; }
    return j;
  }
  const toB64 = (blob) => new Promise((ok, no) => { const fr = new FileReader(); fr.onload = () => ok(String(fr.result).split(',')[1] || ''); fr.onerror = no; fr.readAsDataURL(blob); });
  async function uploadSheet(file, title, by, progress) {
    const st = await refApi('POST', '', { action: 'start', title, by, name: file.name, size: file.size, module: KEY });
    const key = st.editKey;
    for (let i = 0; i < st.chunks; i++) {
      progress(i, st.chunks);
      await refApi('POST', '', { action: 'chunk', id: st.id, v: st.v, i, data: await toB64(file.slice(i * st.chunkSize, (i + 1) * st.chunkSize)), editKey: key });
    }
    progress(st.chunks, st.chunks);
    const fin = await refApi('POST', '', { action: 'finish', id: st.id, v: st.v, editKey: key });
    return { sheet: fin.sheet, editKey: key };
  }
  async function sheetBlob(sheet) {
    const k = sheet.id + '@' + sheet.v;
    if (refBlobs[k]) return refBlobs[k];
    const parts = [];
    for (let i = 0; i < sheet.chunks; i++) {
      const j = await refApi('GET', '?id=' + sheet.id + '&chunk=' + i);
      const bin = atob(j.data), u = new Uint8Array(bin.length);
      for (let n = 0; n < bin.length; n++) u[n] = bin.charCodeAt(n);
      parts.push(u);
    }
    return (refBlobs[k] = new Blob(parts, { type: 'application/pdf' }));
  }
  function renderReferrals($main) {
    let sheets = [], keys = store.get(REF_KEYS, {}), openId = '';
    $main.innerHTML = `
    <div class="eyebrow">Share</div>
    <h1 style="font-size:clamp(30px,4vw,44px);margin:8px 0 10px">Referral sheets</h1>
    <p class="lede">${OFF.length ? 'Sachithra\'s own referral sheets are first: preview them here or download the PDF or Word file. You can also upload your own sheet.' : 'Upload your referral sheet so others can preview and download it.'}</p>
    <div class="rule"></div>
    ${OFF.length ? `<div class="eyebrow">By Sachithra</div>
    <div class="rlist" id="rOff" style="margin:10px 0 26px">${OFF.map((f) => `<div class="rcard" data-off="${esc(f.id)}">
      <div class="rt"><b>${esc(f.title)}</b><span>${esc(f.sub)} &middot; ${f.kind === 'docx' ? 'Word' : 'PDF'} &middot; ${bytesFmt(f.kb * 1024)}</span></div>
      <div class="ra"><button class="btn sm" type="button" data-oact="view">View</button><a class="btn ghost sm" href="${esc(f.file)}" download>Download</a></div></div>`).join('')}</div>
    <div class="eyebrow">Upload your own</div>` : ''}
    <form class="rup" id="rForm" autocomplete="off">
      <label>Title<input id="rTitle" type="text" maxlength="80" placeholder="${esc(cc.refPlaceholder || 'e.g. IME referral sheet, Lectures 1 to 9')}" required></label>
      <label>Your name <em>(optional)</em><input id="rBy" type="text" maxlength="40" placeholder="Shown with your sheet"></label>
      <label>PDF file <em>(max 6 MB)</em><input id="rFile" type="file" accept=".pdf,application/pdf" required></label>
      <button class="btn" type="submit" id="rGo">Upload sheet</button>
      <div class="rmsg" id="rMsg" role="status" aria-live="polite"></div>
    </form>
    <p class="muted rnote">Uploads are public. Only share your own sheet or one you have permission to share. PDF files only.</p>
    <div id="rList" class="rlist"><div class="vmsg">Loading sheets...</div></div>
    <div id="rView"></div>
    <p class="rfoot"><button type="button" class="linkbtn" id="rMod"></button></p>
`;
    const $list = document.getElementById('rList'), $view = document.getElementById('rView'), $msg = document.getElementById('rMsg');
    const say = (h, err) => { $msg.innerHTML = h ? `<div class="mm ${err ? 'err' : ''}">${h}</div>` : ''; };
    const mine = (id) => !!keys[id];
    const saveKey = (id, k) => { keys[id] = k; store.set(REF_KEYS, keys); };
    const find = (id) => sheets.find((x) => x.id === id);
    const hdr = (id) => (refAdmin ? { 'x-admin-key': refAdmin } : (keys[id] ? { 'x-edit-key': keys[id] } : {}));
    function draw() {
      document.getElementById('rMod').textContent = refAdmin ? 'Moderator mode on (turn off)' : 'Moderator';
      $list.innerHTML = sheets.length ? sheets.map((s) => {
        const own = mine(s.id) || !!refAdmin;
        return `<div class="rcard ${openId === s.id ? 'on' : ''}" data-id="${s.id}">
          <div class="rt"><b>${esc(s.title)}</b><span>${s.by ? 'by ' + esc(s.by) : 'by Anonymous'} &middot; ${dateFmt(s.ts)} &middot; ${bytesFmt(s.size)}</span></div>
          <div class="ra"><button class="btn sm" data-act="view">View</button><button class="btn ghost sm" data-act="download">Download</button>
            ${own ? '<button class="btn ghost sm danger" data-act="delete">Delete</button>' : ''}</div></div>`;
      }).join('') : '<div class="vmsg">No referral sheets yet. Be the first to upload one.</div>';
    }
    async function load() {
      try { const j = await refApi('GET'); sheets = cc.refOwnOnly ? j.sheets.filter((x) => (x.module || '') === KEY) : j.sheets; draw(); }
      catch (e) { sheets = []; $list.innerHTML = `<div class="vmsg">${e.status === 503 ? 'Referral sheets are not available yet.' : 'Could not load the sheets. Please try again.'}</div>`; if (e.status === 503) document.getElementById('rGo').disabled = true; }
    }
    async function openSheet(s) {
      openId = s.id; draw();
      $view.innerHTML = `<div class="vbar"><div class="vt"><b>${esc(s.title)}</b><span>${esc(s.name)} &middot; <span id="pgn">Loading</span></span></div></div><div class="vwrap" id="pv"><div class="vmsg">Loading preview...</div></div>`;
      $view.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try {
        const url = URL.createObjectURL(await sheetBlob(s));
        $view.querySelector('.vbar').insertAdjacentHTML('beforeend', `<a class="btn sm" href="${url}" target="_blank" rel="noopener">Open in new tab</a><a class="btn ghost sm" href="${url}" download="${esc(s.title)}.pdf">Download</a>`);
        showPdf(url, document.getElementById('pv'), document.getElementById('pgn'));
      } catch (e) { document.getElementById('pv').innerHTML = `<div class="vmsg">${esc(e.message)}</div>`; }
    }
    /* Sachithra's own sheets: View shows the PDF (a Word entry shows its PDF twin), Download is the file itself */
    const $off = document.getElementById('rOff');
    if ($off) $off.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-oact]'); if (!b) return;
      const f = OFF.find((x) => x.id === b.closest('.rcard').dataset.off); if (!f) return;
      $off.querySelectorAll('.rcard').forEach((c) => c.classList.toggle('on', c.dataset.off === f.id));
      const show = f.twin || f.file;
      $view.innerHTML = `<div class="vbar"><div class="vt"><b>${esc(f.title)}</b><span>${f.kind === 'docx' ? 'Preview of the same sheet as PDF &middot; ' : ''}<span id="pgn">PDF</span></span></div>
        <a class="btn sm" href="${esc(show)}" target="_blank" rel="noopener">Open in new tab</a>
        <a class="btn ghost sm" href="${esc(f.file)}" download>${f.kind === 'docx' ? 'Download Word file' : 'Download'}</a></div>
        <div class="vwrap" id="pv"><div class="vmsg">Loading preview...</div></div>`;
      $view.scrollIntoView({ behavior: 'smooth', block: 'start' });
      showPdf(show, document.getElementById('pv'), document.getElementById('pgn'));
    });
    $list.addEventListener('click', async (e) => {
      const b = e.target.closest('button[data-act]'); if (!b) return;
      const s = find(b.closest('.rcard').dataset.id); if (!s) return;
      const act = b.dataset.act;
      try {
        if (act === 'view') return openSheet(s);
        if (act === 'download') {
          b.disabled = true; b.textContent = 'Preparing...';
          const url = URL.createObjectURL(await sheetBlob(s)), a = document.createElement('a');
          a.href = url; a.download = s.title.replace(/[^\w\- ]+/g, '') + '.pdf'; document.body.appendChild(a); a.click(); a.remove();
          b.disabled = false; b.textContent = 'Download'; return;
        }
        if (act === 'delete') {
          if (!confirm('Delete "' + s.title + '"? This cannot be undone.')) return;
          await refApi('DELETE', '?id=' + s.id, null, hdr(s.id));
          delete keys[s.id]; store.set(REF_KEYS, keys); if (openId === s.id) { openId = ''; $view.innerHTML = ''; }
          return load();
        }
      } catch (err) { b.disabled = false; say(err.message, true); }
    });
    document.getElementById('rForm').onsubmit = async (e) => {
      e.preventDefault(); say('');
      const f = document.getElementById('rFile').files[0], go = document.getElementById('rGo');
      if (!f) return say('Please choose a PDF file.', true);
      if (!/\.pdf$/i.test(f.name)) return say('Only PDF files are allowed.', true);
      if (f.size > 6 * 1048576) return say('The file must be a PDF of 6 MB or less.', true);
      go.disabled = true;
      try {
        const r = await uploadSheet(f, document.getElementById('rTitle').value, document.getElementById('rBy').value, (i, n) => say(`Uploading piece ${Math.min(i + 1, n)} of ${n}...`));
        saveKey(r.sheet.id, r.editKey);
        say('Uploaded. Everyone can now view and download your sheet.');
        document.getElementById('rForm').reset(); await load();
      } catch (err) { say(err.message, true); }
      go.disabled = false;
    };
    document.getElementById('rMod').onclick = () => {
      if (refAdmin) { refAdmin = ''; try { sessionStorage.removeItem('kuppi.admin'); } catch (e) { /* ignore */ } return draw(); }
      const k = prompt('Moderator password'); if (!k) return;
      refAdmin = k.trim(); try { sessionStorage.setItem('kuppi.admin', refAdmin); } catch (e) { /* ignore */ } draw();
    };
    load();
  }

  /* ---------- module shell ---------- */
  function renderModule(p) {
    if (slKeyHandler) { document.removeEventListener('keydown', slKeyHandler); slKeyHandler = null; }
    pvTok++;
    const page = p[0] || 'map';
    const lecN = page === 'lecture' ? Number(p[1]) : null;
    const dl = daysLeft(cc);
    const lecNav = cc.lectures.map((l) => {
      const d = lecDone(l);
      return `<a class="ni ${lecN === l.n ? 'on' : ''} ${d === l.topics.length ? 'done' : ''}" href="#/${KEY}/lecture/${l.n}">
        <span class="k">L${l.n}</span><span class="t">${esc(l.short)}</span>
        <span class="r">${d}/${l.topics.length}</span><i class="dot ${l.priority}" title="${PRI_LABEL[l.priority]}"></i></a>`;
    }).join('');
    const navItems = [['map', '#/' + KEY, 'Exam map'], ['rules', '#/' + KEY + '/rules', 'Paper and golden rules']]
      .concat(PAPERS ? [['papers', '#/' + KEY + '/papers', 'Past papers', String(PAPER_LIST.length)]] : [])
      .concat(REFS ? [['referrals', '#/' + KEY + '/referrals', 'Referral sheets']] : [])
      .concat(MCQD ? [['mcq', '#/' + KEY + '/mcq', 'MCQ practice', String(mcqTotal)]] : [])
      .concat([['practice', '#/' + KEY + '/practice', 'Practice questions', String(totals.all)]])
      .concat(SLIDES ? [['slides', '#/' + KEY + '/slides', 'Lecture slides', String(SLIDES.reduce((t, d) => t + d.slides.length, 0))]] : []);
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
        ${navItems.map((it, i) => nav(it[0], it[1], String(i + 1).padStart(2, '0'), it[2], it[3])).join('')}
        <div class="navgrp">Lectures</div>
        ${lecNav}
      </aside>
      <main class="main" id="main"></main>
    </div>`;
    document.getElementById('menuBtn').onclick = () => { document.getElementById('shell').classList.toggle('menu-open'); };
    document.querySelector('.side').addEventListener('click', (e) => { if (e.target.closest('a.ni')) document.getElementById('shell').classList.remove('menu-open'); });

    const $main = document.getElementById('main');
    if (page === 'rules') { document.title = 'Paper and golden rules | ' + cc.name; $main.innerHTML = cc.simple ? viewRulesSimple() : viewRules(); }
    else if (page === 'papers' && PAPERS) { document.title = 'Past papers | ' + cc.name; renderPapers($main, p.slice(1)); }
    else if (page === 'referrals' && REFS) { document.title = 'Referral sheets | ' + cc.name; renderReferrals($main); }
    else if (page === 'mcq' && MCQD && P.renderMcq) {
      document.title = 'MCQ practice | ' + cc.name;
      P.renderMcq($main, { data: MCQD, key: 'kuppi.' + KEY + '.mcqp', back: '#/' + KEY, code: cc.code, lectures: cc.lectures.map((l) => ({ n: l.n, title: l.title })) });
    }
    else if (page === 'practice' && cc.practiceRail && P.renderMcq) {
      document.title = 'Practice | ' + cc.name;
      const lv = {}, shorts = {}, essays = {};
      /* difficulty: set on the question, otherwise estimated: several correct answers or a long scenario = hard, short and simple = easy */
      const level = (q) => q.lvl || (q.ans.length > 1 || q.q.length > 230 ? 'hard' : (q.q.length < 115 && q.opts.every((o) => o.length < 60) ? 'easy' : 'medium'));
      mcq.forEach((q) => { const k = level(q); ((lv[q.lec] = lv[q.lec] || { easy: [], medium: [], hard: [] })[k]).push([q.q, q.opts, q.ans.map((i) => L[i]).join(''), q.exp, q.src === 'past' ? 'Past paper' : q.src === 'adapted' ? 'Past paper, options reworded' : '']); });
      short.forEach((q) => { (shorts[q.lec] = shorts[q.lec] || []).push([q.q, q.a, SOURCE_LABEL[q.src] || '']); });
      struct.forEach((q) => { (essays[q.lec] = essays[q.lec] || []).push([q.title, q.q, q.a, q.hint || '', SOURCE_LABEL[q.src] || '']); });
      P.renderMcq($main, { data: lv, short: shorts, essay: essays, markEach: 0, title: 'Practice', topicsLabel: 'Lectures', mcqLabel: 'MCQ', shortLabel: 'Short answers', essayLabel: 'Essay', key: 'kuppi.' + KEY + '.prac2', back: '#/' + KEY, code: cc.code, lectures: cc.lectures.map((l) => ({ n: l.n, title: l.short })) });
    }
    else if (page === 'practice') { document.title = 'Practice | ' + cc.name; renderPractice($main); }
    else if (page === 'slides' && SLIDES) { document.title = 'Lecture slides | ' + cc.name; renderSlides($main, p.slice(1)); }
    else if (page === 'lecture' && lecByN(lecN)) { const lec = lecByN(lecN); document.title = 'L' + lec.n + ' ' + lec.title + ' | ' + cc.name; $main.innerHTML = viewLecture(lec); bindLecture(lec); }
    else { document.title = 'Exam map | ' + cc.name; $main.innerHTML = cc.simple ? viewMapSimple() : viewMap(); }
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
    const cell = (v) => `<td class="c ${v >= (cc.heatHi || 8) ? 'l3' : v >= (cc.heatMid || 3) ? 'l2' : v >= 1 ? 'l1' : ''}">${v || ''}</td>`;
    const cols = cc.papers ? cc.papers.map((pp) => [pp.label, (l) => l.pastByPaper[pp.id]]) : [['MCQ', (l) => l.pastBy.mcq], ['Short', (l) => l.pastBy.short], ['Struct.', (l) => l.pastBy.struct]];
    const heat = cc.lectures.map((l) => `<tr class="${l.past ? '' : 'nodata'}">
        <td class="lab"><a href="#/${KEY}/lecture/${l.n}"><span class="k">L${l.n}</span>${esc(l.short)}</a></td>
        ${cols.map((c) => cell(c[1](l))).join('')}
        <td class="t">${l.past ? l.past : (cc.noDataLabel || 'new in final')}</td></tr>`).join('');
    const hyRows = cc.lectures.map((l) => `<div class="hyrow"><a href="#/${KEY}/lecture/${l.n}"><span class="k">L${l.n}</span>${esc(l.short)}</a>
        <span>${l.topics.map((t) => `<i class="blk ${t.hy ? 'hy' : ''}" title="${esc(t.t)}"></i>`).join(' ')}</span><span class="n">${l.hyCount}/${l.topics.length}</span></div>`).join('');
    const maxBar = cc.lectures.length;
    return `
    <div class="ph"><div><div class="eyebrow">Overview</div><h1>Exam map</h1>
      <p class="lede">${esc(cc.examNote)}. ${cc.mapLede || ''}</p></div>
      <a class="btn" href="#/${KEY}/practice">Practice questions</a></div>
    <div class="rule"></div>
    ${cc.mapNote ? `<div class="note">${cc.mapNote}</div>` : ''}
    <div class="stats">
      <div class="stat"><b>${totals.lectures}</b><span>${cc.lecturesStat || 'Lectures in exam'}</span></div>
      <div class="stat"><b>${cnt.high}</b><span>High priority lectures</span></div>
      <div class="stat"><b>${totals.hy}<small>/${totals.topics}</small></b><span>High-yield topics</span></div>
      <div class="stat"><b>${totals.past}</b><span>Past-paper questions</span></div>
      <div class="stat"><b>${totals.all}</b><span>Practice questions</span></div>
    </div>
    <div class="g2">
      <div class="panel"><h3>Share of past questions</h3><p>${cc.shareDesc || 'Past questions per lecture.'}</p>
        <div class="donut">${donut(slices, tot)}
          <ul class="legend">${slices.map((s, i) => `<li><i style="background:${SHADES[i % SHADES.length]}"></i><a href="#/${KEY}/lecture/${s.n}">L${s.n} ${esc(s.label)}</a><b>${Math.round(s.v / tot * 100)}%</b></li>`).join('')}</ul></div></div>
      <div class="panel"><h3>Past-paper heatmap</h3><p>${cc.heatDesc || 'Questions per lecture by type.'} Select a row to open the lecture.</p>
        <div class="heatwrap"><table class="heat"><thead><tr><th></th>${cols.map((c) => `<th>${c[0]}</th>`).join('')}<th></th></tr></thead><tbody>${heat}</tbody></table></div>
      </div>
    </div>
    <div class="g2">
      <div class="panel"><h3>Priority breakdown</h3><p>How the ${totals.lectures} lectures split by exam priority.</p>
        <div class="bars">${[['high', cnt.high, '#ffd60a'], ['med', cnt.med, '#8a7500'], ['low', cnt.low, '#4a3f00'], ['new', cnt.new, '#2a2a2a']].map((b) => `<i style="flex:${b[1] || 0.0001};background:${b[2]}" title="${PRI_LABEL[b[0]]}: ${b[1]}"></i>`).join('')}</div>
        <ul class="legend">${[['high', cnt.high, '#ffd60a'], ['med', cnt.med, '#8a7500'], ['low', cnt.low, '#4a3f00'], ['new', cnt.new, '#2a2a2a']].map((b) => `<li><i style="background:${b[2]};border:1px solid #555"></i>${PRI_LABEL[b[0]]}<b>${b[1]}</b></li>`).join('')}</ul></div>
      <div class="panel"><h3>Ranking</h3><p>${cc.rankDesc || 'Lectures ordered by past-paper weight.'}</p>
        <ul class="rank">${ranked.map((l) => `<li><a href="#/${KEY}/lecture/${l.n}"><span class="k">L${l.n}</span><span class="nm">${esc(l.short)}</span><span class="v">${l.past} question${l.past === 1 ? '' : 's'}</span></a></li>`).join('')}
        ${cc.rankExtra || ''}</ul></div>
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
    <h3 class="eyebrow" style="margin:6px 0 4px">${cc.cheatTitle || 'Keyword → answer cheat table'}</h3>
    <p class="muted" style="margin:0 0 6px">${cc.cheatIntro || 'Scenario questions usually reduce to one of these. Learn them cold.'}</p>
    <div class="tw"><table class="tbl cheat"><thead><tr><th>${(cc.cheatHead || ['If the question says…', 'Answer'])[0]}</th><th>${(cc.cheatHead || ['If the question says…', 'Answer'])[1]}</th></tr></thead><tbody>
      ${cc.cheat.map((c) => `<tr><td>${cc.cheatHtml ? c[0] : esc(c[0])}</td><td>${cc.cheatHtml ? c[1] : esc(c[1])}</td></tr>`).join('')}</tbody></table></div>`;
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
      <a class="btn" href="#/${KEY}/practice" data-practice="${lec.n}">Practice L${lec.n} (${qCount})</a></div>
    <div class="lec-top"><span class="pill ${lec.priority}">${PRI_LABEL[lec.priority]}</span>
      <span class="pill">${lec.past ? lec.past + ' ' + (cc.pastLabel || 'mid-term') + ' question' + (lec.past === 1 ? '' : 's') : 'No ' + (cc.pastLabel || 'mid-term') + ' data'}</span>
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
      ${prev ? `<a class="btn ghost" href="#/${KEY}/lecture/${prev.n}">&larr; L${prev.n} ${esc(prev.short)}</a>` : '<span></span>'}
      ${next ? `<a class="btn" href="#/${KEY}/lecture/${next.n}">Next L${next.n} &rarr;</a>` : `<a class="btn" href="#/${KEY}/practice">Go practise &rarr;</a>`}
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
        <button class="tab ${sectionTab === 'mcq' ? 'on' : ''}" data-tab="mcq">${TAB.mcq} <small>${counts.mcq}</small></button>
        <button class="tab ${sectionTab === 'short' ? 'on' : ''}" data-tab="short">${TAB.short} <small>${counts.short}</small></button>
        <button class="tab ${sectionTab === 'struct' ? 'on' : ''}" data-tab="struct">${TAB.struct} <small>${counts.struct}</small></button>
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
      <div class="tw"><table class="tbl"><thead><tr><th>Lecture</th><th>Score</th></tr></thead><tbody>${Object.keys(byLec).sort((a, b) => a - b).map((n) => `<tr><td><a href="#/${KEY}/lecture/${n}">L${n} ${esc(lecByN(n).title)}</a></td><td>${byLec[n].r} / ${byLec[n].t}</td></tr>`).join('')}</tbody></table></div>
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
    body.innerHTML = `<p class="muted" style="margin:0 0 14px">${cc.shortIntro || 'Try to answer in your head first, then open the answer. Fill-in-the-blank style, like the mid-term short answers.'}</p>` +
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
