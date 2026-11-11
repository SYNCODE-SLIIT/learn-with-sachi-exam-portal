/* Innovation Management and Entrepreneurship (IT4050) module definition. */
window.PORTAL = window.PORTAL || { modules: {} };
window.PORTAL.key = 'ime';
window.PORTAL.modules.ime = {
  id: 'ime',
  code: 'IT4050',
  name: 'Innovation Management and Entrepreneurship',
  year: 'Year 4 · Semester 2',
  blurb: '9 lectures · MCQs + canvas + business plan · 2 hours',
  examDate: '2026-11-13',
  slidesPdf: 'slides/IME-Lecture-Slides.pdf',
  simple: true,
  referrals: true,
  simpleLede: 'Three parts to the paper. Know where the marks are, then spend your time on the lectures that matter most.',
  flow: [
    { q: 'Q1', marks: 50, title: 'MCQs', sub: '25 questions · Lectures 1 to 5', href: 'practice' },
    { q: 'Q2', marks: 35, title: 'Canvas', sub: 'Value Proposition + Business Model · Lecture 6', href: 'lecture/6' },
    { q: 'Q3', marks: 15, title: 'Business plan', sub: 'Three tests and pitching · Lecture 7', href: 'lecture/7' }
  ],
  flowNote: 'Based on the 2025 sample paper. Older papers had 4 essay questions of 25 marks each.',
  quickFormat: [
    ['Exam', '13 Nov 2026 · 12:00 PM to 2:00 PM'],
    ['Paper', '25 MCQs (50) · Canvas (35) · Business plan (15)'],
    ['Reading time', '10 minutes before you start'],
    ['To pass', 'At least 30 marks in the written paper']
  ],
  quickRules: [
    ['Fill every canvas block', 'The canvas question is worth 35 marks. No empty blocks.'],
    ['MCQs can have more than one answer', 'Read every option before you choose.'],
    ['Define, explain, give an example', 'Use the lecturer\'s words and one real example.'],
    ['Know your own business plan', 'Idea, customers, revenue, and the three tests.'],
    ['Plan your time', 'About 40 min MCQs, 45 min canvas, 20 min plan, 5 min review.'],
    ['Never leave a blank', 'Partial answers earn partial marks.']
  ],
  paperGroups: [
    { t: 'Model papers', items: [
      { id: 'sample', tab: 'Sample 2025', t: 'Sample paper 2025', sub: 'Shows the new format: 25 MCQs, canvas, business plan', file: 'papers/sample-paper-2025.pdf', paper: 'S25', kb: 112, answers: 'imeSampleAnswers' },
      { id: 'model1', tab: 'Model Paper 1', t: 'Model Paper 1 (Nov 2023, typed copy)', sub: 'Readable typed version of the Nov 2023 paper', file: 'papers/model-paper-1-nov-2023-typed.pdf', paper: 'N23', kb: 52 }
    ] },
    { t: 'Past papers', items: [
      { id: 'nov24', tab: 'Nov 2024', t: 'IT4050 Final exam, November 2024', sub: 'Scanned paper', file: 'papers/nov-2024.pdf', paper: 'N24', kb: 245 },
      { id: 'jun24', tab: 'Jun 2024', t: 'IT4050 Final exam, June 2024', sub: 'Scanned paper', file: 'papers/jun-2024.pdf', paper: 'J24', kb: 188 },
      { id: 'nov23', tab: 'Nov 2023', t: 'IT4050 Final exam, November 2023', sub: 'Scanned paper (typed copy above)', file: 'papers/nov-2023.pdf', paper: 'N23', kb: 1365 },
      { id: 'nov22', tab: 'Nov 2022', t: 'IT4050 Final exam, November 2022', sub: 'Scanned paper', file: 'papers/nov-2022.pdf', paper: 'N22', kb: 138 },
      { id: 'jun22', tab: 'Jun 2022', t: 'IT4050 Final exam, June 2022', sub: 'Scanned paper', file: 'papers/jun-2022.pdf', paper: 'J22', kb: 117 }
    ] }
  ],
  examTime: '12:00 PM – 2:00 PM',
  examNote: 'Final exam covers all lectures (the 2025 sample paper takes its MCQs from Lectures 1–5)',
  shorts: { 1: 'Introduction to Innovation', 2: 'Innovation Tools & Techniques', 3: 'Ideation & Creativity', 4: 'New Product Development', 5: 'Entrepreneur & Entrepreneurship', 6: 'Value Proposition & Business Model', 7: 'Business Plan & Investors', 8: 'Marketing & Operational Plan', 9: 'Financial Planning & Cash' },
  papers: [
    { id: 'J22', label: 'Jun 22' }, { id: 'N22', label: 'Nov 22' }, { id: 'N23', label: 'Nov 23' },
    { id: 'J24', label: 'Jun 24' }, { id: 'N24', label: 'Nov 24' }, { id: 'S25', label: 'Sample 25' }
  ],
  priority: { high: 9, med: 4 },
  heatHi: 3,
  heatMid: 2,
  noDataLabel: 'not asked yet',
  pastLabel: 'past-paper',
  shortIntro: 'Quick recall: say the list or definition from memory, then open the answer. Questions marked Past paper were asked as short notes or parts of essays.',
  lecturesStat: 'Lectures in exam (L1–L9)',
  tabNames: { mcq: 'MCQ', short: 'Short notes', struct: 'Essay / canvas' },
  mapLede: 'Priority comes from how often each lecture was asked across the 5 past papers and the 2025 sample paper in your folder. Each question is counted once per paper it appeared in.',
  mapNote: '<b>Read this first.</b> The <b>2025 sample paper</b> has <b>25 MCQs for 50 marks</b> (Lectures 1–5, some with more than one correct answer), then <b>Value Proposition + Business Model Canvas for 35 marks</b>, then <b>Business Plan for 15 marks</b>. Older papers (2022–2023) were four essay questions of 25 marks each. The real MCQs were not in your files, so the MCQs here are practice questions written from your lecture slides. Confirm the final format with your lecturer.',
  shareDesc: 'Past-paper questions per lecture (essay parts and canvas questions).',
  heatDesc: 'Questions per lecture in each paper.',
  rankDesc: 'Lectures ordered by how often they were asked.',
  rankExtra: '',
  format: [
    ['Date and time', '13 Nov 2026 · 12:00 PM – 2:00 PM'],
    ['Duration', '2 hours (past papers allow 10 minutes of reading time first)'],
    ['2025 sample paper', 'Q1: 25 MCQs · 50 marks · Lectures 1–5. Q2: Value Proposition + Business Model Canvas · 35 marks. Q3: Business Plan · 15 marks'],
    ['Older papers', '4 essay questions · 25 marks each (Innovation · Entrepreneur · VPC and BMC · Business plan)'],
    ['Weight', 'Final exam is 70% of the module. At least 30 marks of the written paper are needed to pass'],
    ['Practice with', 'Past-paper questions with model answers in this portal']
  ],
  golden: [
    ['Answer the canvas questions fully', 'The VPC and BMC question is worth 35 of 100 marks in the sample paper. Fill every block, use facts from the case, and label each block clearly. Practise Airbnb, UFO, GTA and PickMe until you can do one in 15 minutes.'],
    ['Structure every written answer', 'Define → explain → give a real example (Uber, Airbnb, Dilmah, PickMe) → link back to the scenario. One clear point per mark.'],
    ['MCQs can have more than one answer', 'The sample paper says some MCQs have several correct answers. Read “choose all” carefully and do not guess a single option when two look right.'],
    ['Use the exact names from the slides', 'Peter Drucker’s seven sources, Wallas’s four stages, the 9 IMTs, Stevenson’s definition, Danhof’s four types, the five Customer Factory steps. Examiners reward the lecturer’s vocabulary.'],
    ['Know your own business plan', 'Several questions say “explain how you justified…” or “which opportunity did you choose”. Prepare a 5-line summary of your group’s idea, customers, revenue model and how it passes the three tests.'],
    ['Time plan (suggested)', '10 min reading · ~40 min MCQs · ~45 min VPC and BMC · ~20 min business plan · 5 min review. Adjust to the real mark split.'],
    ['Do not leave blanks', 'Partial answers earn partial marks. Write the points you know, in bullets if short of time.']
  ],
  cheatTitle: 'Quick recall: lists you must know',
  cheatIntro: 'These lists appear again and again in the MCQs and the essays. Learn them word for word.',
  cheatHead: ['Topic', 'Remember'],
  cheatHtml: true,
  cheat: [
    ['Invention vs innovation', 'Invention = creating something new that never existed. Innovation = making changes to something established by introducing something new that <b>adds value to customers</b> and adds to the organization’s knowledge store.'],
    ['Types of innovation', '<b>Product · Service · Process</b>. Also <b>incremental vs radical</b>, and <b>architectural vs modular</b>.'],
    ['Drucker’s 7 sources', '1 The unexpected · 2 Incongruity · 3 Process need · 4 Industry / market structure changes · 5 Demographics · 6 Changes in perception, mood, meaning · 7 New knowledge'],
    ['9 innovation management techniques', 'Knowledge management · Intellectual property rights · Customer relationship management · Business intelligence · Brainstorming · Mind mapping · Prototyping · Quality function deployment · Business simulation'],
    ['Wallas’s creative process (1926)', 'Preparation → Incubation → Illumination → Verification'],
    ['Ideation', '<b>Inbound</b> (internal) and <b>outbound</b> (voice of customer, open innovation, miscellaneous: peripheral vision, disruptive technology, patent mapping)'],
    ['NPD process', 'Idea generation → Idea screening → Concept development and testing → Market strategy and business analysis → Feasibility study → Technical design and roadmap → Test marketing → Market entry and commercialization'],
    ['Design thinking', 'Empathize → Define → Ideate → Prototype → Test'],
    ['Innovation sweet spot (IDEO)', '<b>Desirability</b> (customer) + <b>Feasibility</b> (technology / operations) + <b>Viability</b> (profit and sustainability)'],
    ['House of quality', 'Customer attributes (voice of customer) → engineering characteristics → relationship matrix → roof (trade-offs) → competitive comparison → target values'],
    ['Stevenson’s definition', 'Entrepreneurship is the pursuit of opportunity <b>beyond resources controlled</b>'],
    ['4 risks of an entrepreneur', '<b>Demand · Technology · Execution · Financing</b>'],
    ['Danhof’s 4 types', 'Innovative · Adoptive (imitative) · Fabian · Drone'],
    ['Business Model Canvas (9)', 'Customer segments · Value propositions · Channels · Customer relationships · Revenue streams · Key resources · Key activities · Key partners · Cost structure'],
    ['VPC', '<b>Customer profile</b>: jobs, pains, gains. <b>Value map</b>: products and services, pain relievers, gain creators'],
    ['Lean Canvas (9)', 'Problem · Solution · Unique value proposition · Unfair advantage · Customer segments · Key metrics · Channels · Cost structure · Revenue streams'],
    ['Customer Factory Model', 'Acquisition → Activation → Retention → Revenue → Referral'],
    ['Marketing', '4 Ps: Product · Price · Place · Promotion. 4 Cs: Customer solution · Customer cost · Convenience · Communication'],
    ['Executive summary: 5 questions', 'Attractive market? Products to win? People to make it happen? How much money? Where will the business go?'],
    ['Final accounts', 'Profit and loss account · Balance sheet · Cash flow statement'],
    ['Business objectives', '<b>SMART</b>: Specific, Measurable, Achievable, Relevant, Time-bound']
  ],
  links: {
    whatsapp: 'https://whatsapp.com/channel/0029VbAOUZj6hENiKN0n9K2y',
    youtube: 'https://www.youtube.com/@sachithra228',
    syncode: 'https://teamsyncode.com'
  }
};
