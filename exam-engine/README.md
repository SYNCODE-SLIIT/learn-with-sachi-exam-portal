# Exam engine

Shared app and stylesheet used by every module page (`cloud-computing/`, `ime/`).

A module page only needs its own `index.html` plus data files in `js/data/`. The module file sets
`window.PORTAL.key` (for example `'ime'`) and defines `window.PORTAL.modules[key]`,
`<key>Lectures`, `<key>McqRaw`, `<key>ShortRaw` and `<key>StructuredRaw`. See `ime/js/data/ime-module.js`
for every option (papers heatmap, priority thresholds, tab names, notes shown on the exam map).

Progress is saved per module in the browser (`kuppi.<key>.done`, `kuppi.<key>.qstat`).
