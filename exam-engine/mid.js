/* Mid exam questions: pick a lecture from the drop-down (top right), pick a question number on the left,
   the photo of the question is shown, and the correct answer stays hidden until Show answer is pressed.
   Mounted by exam-engine/app.js on the route #/<module>/mid (optional deep link: #/<module>/mid/<lecture or all>/<question number>).
   Data: window.PORTAL.<key>Mid = [ { n, title, items: [ { id, q, a: [answer, ...], kind: 'mcq' | 'short', photos: [path, ...], worked: bool } ] } ]
   The chosen lecture, question and the questions you have opened are remembered in this browser only. Nothing is sent anywhere. */
(function () {
  'use strict';
  const P = (window.PORTAL = window.PORTAL || { modules: {} });
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = (d) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const IC = {
    left: svg('<path d="M19 12H5M12 5l-7 7 7 7"/>'),
    right: svg('<path d="M5 12h14M12 5l7 7-7 7"/>'),
    eye: svg('<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>'),
    eyeoff: svg('<path d="M17.9 17.9A10.9 10.9 0 0 1 12 19c-7 0-11-7-11-7a19.6 19.6 0 0 1 5.1-5.9M9.9 4.2A10.7 10.7 0 0 1 12 4c7 0 11 7 11 7a19.7 19.7 0 0 1-3.2 4.2"/><path d="M1 1l22 22"/>'),
    zoom: svg('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/>')
  };

  P.renderMid = function ($host, o) {
    const groups = (o.groups || []).filter((g) => g.items && g.items.length);
    if (!groups.length) { $host.innerHTML = '<div class="vmsg">Mid questions are not available yet.</div>'; return; }
    const KEY = o.key || 'kuppi.mid';
    const total = groups.reduce((t, g) => t + g.items.length, 0);
    let st = { lec: String(groups[0].n), i: 0, seen: {} };
    try { const j = JSON.parse(localStorage.getItem(KEY + '.v2') || 'null'); if (j && typeof j === 'object') st = Object.assign(st, j); } catch (e) { /* storage may be blocked */ }
    if (!st.seen || typeof st.seen !== 'object') st.seen = {};
    /* optional deep link: #/<module>/mid/<lecture or all>/<question number> */
    if (o.args && o.args[0]) { st.lec = String(o.args[0]); st.i = Math.max(0, (parseInt(o.args[1], 10) || 1) - 1); }
    if (st.lec !== 'all' && !groups.some((g) => String(g.n) === st.lec)) st.lec = String(groups[0].n);
    let shown = false; /* the answer is hidden every time a question is opened */
    const save = () => { try { localStorage.setItem(KEY + '.v2', JSON.stringify({ lec: st.lec, i: st.i, seen: st.seen })); } catch (e) { /* ignore */ } };
    const list = () => {
      const out = [];
      groups.forEach((g) => { if (st.lec === 'all' || String(g.n) === st.lec) g.items.forEach((it) => out.push({ it, g })); });
      return out;
    };
    const root = document.createElement('div');
    root.className = 'midp';
    $host.appendChild(root);

    function lightbox(src) {
      const m = document.createElement('div');
      m.className = 'midbox';
      m.innerHTML = `<img src="${esc(src)}" alt="Question photo, full size"><button type="button" class="btn sm" aria-label="Close">Close</button>`;
      const close = () => { m.remove(); document.removeEventListener('keydown', onKey, true); };
      const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
      m.addEventListener('click', close);
      document.addEventListener('keydown', onKey, true);
      document.body.appendChild(m);
    }

    function draw() {
      const L = list();
      if (st.i >= L.length) st.i = 0;
      if (st.i < 0) st.i = L.length - 1;
      const cur = L[st.i], it = cur.it, g = cur.g;
      const seenN = L.filter((x) => st.seen[x.it.id]).length;
      const photos = it.photos || [];
      const ph = st.ph && photos.includes(st.ph) ? st.ph : photos[0];
      const opts = ['<option value="all"' + (st.lec === 'all' ? ' selected' : '') + '>All lectures (' + total + ')</option>']
        .concat(groups.map((x) => `<option value="${x.n}"${String(x.n) === st.lec ? ' selected' : ''}>L${x.n} ${esc(x.title)} (${x.items.length})</option>`)).join('');
      const nums = L.map((x, k) => `<button type="button" class="${k === st.i ? 'cur' : ''} ${st.seen[x.it.id] ? 'seen' : ''}" data-i="${k}" aria-label="Question ${k + 1}" ${k === st.i ? 'aria-current="true"' : ''}>${k + 1}</button>`).join('');
      const left = photos.length
        ? `<button type="button" class="midimg" data-zoom="${esc(ph)}" aria-label="Open the photo full size"><img src="${esc(ph)}" alt="Photo of the mid exam question"><span class="zi">${IC.zoom} Tap to enlarge</span></button>
           ${photos.length > 1 ? `<div class="midth">${photos.map((p, k) => `<button type="button" class="${p === ph ? 'on' : ''}" data-ph="${esc(p)}" aria-label="Photo ${k + 1}"><img src="${esc(p)}" alt=""></button>`).join('')}</div>` : ''}`
        : `<div class="midtxt"><div class="eyebrow">No photo for this one</div><p>${esc(it.q)}</p></div>`;
      const numeric = !photos.length && it.a.every((x) => /^[a-e]\.\s*[\dA-D, ]+$/.test(x));
      const ans = it.a.length > 1
        ? `<ul class="ansl ${it.kind === 'essay' ? 'long' : ''}">${it.a.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>`
        : `<div class="ans1">${esc(it.a[0])}</div>`;
      const label = it.kind === 'essay' ? 'Model answer' : it.kind === 'mcq' ? (it.a.length > 1 ? it.a.length + ' correct answers' : 'Correct answer') : 'Answer';
      const kindTag = it.kind === 'essay' ? 'Structured question' : it.kind === 'mcq' ? 'MCQ' : 'Short answer';
      root.innerHTML = `
        <div class="midhead">
          <div>
            <div class="eyebrow">Mid exam</div>
            <h1 style="font-size:clamp(28px,4vw,40px);margin:8px 0 8px">Mid MCQs</h1>
            <p class="lede">${total} questions from the mid exam. Choose a lecture, pick a question number, then press Show answer when you are ready.</p>
          </div>
          <label class="midsel"><span>Lecture</span><select id="midLec" aria-label="Choose a lecture">${opts}</select></label>
        </div>
        <div class="midwrap">
          <aside class="midrail" aria-label="Question numbers">
            <div class="rl">Question set</div>
            <div class="rc"><b>${seenN}</b> / ${L.length} opened</div>
            <div class="midnums">${nums}</div>
            <div class="rleg"><span><i class="cu"></i> Current</span><span><i class="se"></i> Opened</span></div>
          </aside>
          <section class="midmain">
            <div class="midbar"><span><b>Question ${st.i + 1} of ${L.length}</b> &middot; L${g.n} ${esc(g.title)}</span>
              <div class="midprog" aria-hidden="true"><i style="width:${Math.round(((st.i + 1) / L.length) * 100)}%"></i></div></div>
            <div class="midgrid">
              <div class="midl">${left}</div>
              <div class="midr">
                <div class="midtag"><span class="tg">${kindTag}</span>${it.worked ? '<span class="tg w" title="This answer is not in the answer PDFs. It was worked out from the question and the course notes.">Worked out, check with your notes</span>' : ''}</div>
                ${photos.length ? `<p class="midq">${esc(it.q)}</p>` : ''}
                <div class="ansbox ${shown ? '' : 'off'}">
                  <div class="al">${label}</div>
                  ${shown ? ans : '<div class="ans1 blur">Answer hidden</div>'}
                </div>
                ${shown && it.note ? `<p class="midq midnote">${esc(it.note)}</p>` : ''}
                ${shown && numeric ? '<p class="midq">The answer refers to the numbered statements or lettered options in the original question. There is no photo of it here, so check it against your paper.</p>' : ''}
                <button type="button" class="btn ${shown ? 'ghost' : ''} sm" id="midShow">${shown ? IC.eyeoff + ' Hide answer' : IC.eye + ' Show answer'}</button>
              </div>
            </div>
            <div class="midnav">
              <button type="button" class="btn ghost" id="midPrev">${IC.left} Previous</button>
              <span class="muted midk">Tip: use the left and right arrow keys</span>
              <button type="button" class="btn" id="midNext">Next ${IC.right}</button>
            </div>
            <p class="rfoot"><a class="linkbtn" href="${esc(o.back || '#')}">Back to exam map</a></p>
          </section>
        </div>`;
      root.querySelector('#midLec').onchange = (e) => { st.lec = e.target.value; st.i = 0; st.ph = ''; shown = false; save(); draw(); };
      root.querySelector('.midnums').onclick = (e) => { const b = e.target.closest('button[data-i]'); if (!b) return; st.i = Number(b.dataset.i); st.ph = ''; shown = false; save(); draw(); };
      root.querySelector('#midShow').onclick = () => { shown = !shown; if (shown) st.seen[it.id] = 1; save(); draw(); };
      const go = (d) => { st.i += d; st.ph = ''; shown = false; save(); draw(); window.scrollTo({ top: 0 }); };
      root.querySelector('#midNext').onclick = () => go(1);
      root.querySelector('#midPrev').onclick = () => go(-1);
      const z = root.querySelector('[data-zoom]'); if (z) z.onclick = () => lightbox(z.dataset.zoom);
      root.querySelectorAll('[data-ph]').forEach((b) => { b.onclick = () => { st.ph = b.dataset.ph; draw(); }; });
      save();
    }
    function onKey(e) {
      if (!document.body.contains(root)) { document.removeEventListener('keydown', onKey); return; }
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight') { st.i += 1; st.ph = ''; shown = false; save(); draw(); }
      else if (e.key === 'ArrowLeft') { st.i -= 1; st.ph = ''; shown = false; save(); draw(); }
    }
    document.addEventListener('keydown', onKey);
    draw();
  };
})();
