# Exam Kuppi Portal (Learn with Sachi)

Static revision portal for the 4th-year final exams. No build step, no dependencies.

## Run locally

```bash
python -m http.server 5173 (run from the folder that holds the landing page and cloud-computing/)
```

Open http://localhost:5173

## Deploy

It is a plain static site. Copy this `cloud-computing` folder next to the main portal's index.html; Vercel serves it at /cloud-computing/.

## Modules

| Module | Status |
|---|---|
| Cloud Computing (IT4090) | Built: 12 lectures, 70 topics, 196 questions |
| Innovation Management and Entrepreneurship (IME) | Next |

## Where things live

- `js/data/cc-module.js`: exam date (`examDate`), format, golden rules, keyword cheat table, links
- `js/data/cc-lectures-*.js`: lecture notes (L1–L7 from slides, L8–L12 from the course outline)
- `js/data/cc-questions-*.js`: MCQs, short answers, structured questions (`past`, `adapted`, `practice` sources)
- `js/app.js`: routing, exam map, lecture pages, quiz runner, progress (saved in the browser's localStorage)

## Set the exam date

Edit `examDate` in `js/data/cc-module.js` (format `YYYY-MM-DD`) and the sidebar countdown appears.
