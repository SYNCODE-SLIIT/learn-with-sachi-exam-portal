/* Cloud Computing (IT4090) module definition. Change examDate here when the date is confirmed (YYYY-MM-DD). */
window.PORTAL = window.PORTAL || { modules: {} };
window.PORTAL.key = 'cc';
window.PORTAL.modules.cc = {
  id: 'cc',
  shorts: { 1: 'Introduction to Cloud', 2: 'Core Services & Infrastructure', 3: 'Compute & Storage', 4: 'Cloud Networking', 5: 'HA & Disaster Recovery', 6: 'Security & Monitoring', 7: 'Database & Analytics', 8: 'Cloud Migration', 9: 'Cloud Native Apps', 10: 'Infrastructure as Code', 11: 'Containerization', 12: 'Container Orchestration' },
  priority: { high: 10, med: 3 },
  newFrom: 8,
  simple: true,
  referrals: true,
  slidesPdf: 'slides/CC-Lecture-Slides.pdf',
  /* Sachithra's own referral sheets, shown first on the Referral sheets page */
  refFiles: [
    { id: 'sp', title: 'Referral sheet, portrait (PDF)', sub: 'A4 portrait · Lectures 1 to 12 on one page', kind: 'pdf', file: 'referral/sachi-cc-referral-portrait.pdf', kb: 151 },
    { id: 'sl', title: 'Referral sheet, landscape (PDF)', sub: 'A4 landscape · 4 columns · same content as the portrait sheet', kind: 'pdf', file: 'referral/sachi-cc-referral-landscape.pdf', kb: 151 }
  ],
  lecturesStat: 'Lectures in exam (L1–L12)',
  simpleLede: 'Four questions of 25 marks, each with 5 MCQs and a few structured questions. Know where the marks are, then spend your time on the lectures that matter most.',
  flow: [
    { q: 'Q1', marks: 25, title: 'Cloud basics and services', sub: '5 MCQs + structured · Lectures 1 to 7', href: 'lecture/1' },
    { q: 'Q2', marks: 25, title: 'Case study', sub: 'A scenario across the course · past papers', href: 'papers' },
    { q: 'Q3', marks: 25, title: 'Migration and cloud native', sub: '5 MCQs + structured · Lectures 8 and 9', href: 'lecture/8' },
    { q: 'Q4', marks: 25, title: 'Microservices, containers, IaC', sub: '5 MCQs + structured · Lectures 9 to 12', href: 'lecture/10' }
  ],
  flowNote: 'From the official exam brief: every main question has 5 MCQs and a few structured or essay questions. Q2 is a case study. Lecture 13 (Cloud in Enterprises and Cloud Design Frameworks) is not examined.',
  quickFormat: [
    ['Exam', '16 Nov 2026 · 9:00 AM to 11:00 AM'],
    ['Mode', 'Computer-based'],
    ['Duration', '2 hours · no additional reading time'],
    ['Paper', 'Q1 basics and services (25) · Q2 case study (25) · Q3 migration and cloud native (25) · Q4 microservices, containers, IaC (25)'],
    ['Topics', 'Lectures 1 to 12 · nothing from Lecture 13'],
    ['Question types', 'MCQs · short answers · structured / essay']
  ],
  quickRules: [
    ['No reading time', 'The 2 hours start at once. Do the MCQs fast, then spend the time on the structured answers and the case study.'],
    ['Q2 is a case study', 'Read the scenario twice and use its business name and facts in every answer. Pick a service model and a deployment model, then explain scalability, security, availability and cost.'],
    ['Each question has 5 MCQs', 'Q1 to Q4 each carry 5 MCQs. Read every option and underline the keyword before you answer.'],
    ['Practise with past papers', 'Open the Past papers page. The final papers 2022 to 2024 show how the lecturer asks: compare, justify, explain with a diagram.'],
    ['Skip Lecture 13 topics', 'Old papers ask about the Well-Architected Framework, barriers to IT innovation and multi-cloud. Those belong to Lecture 13 and are not examined this time.'],
    ['Structured answers', 'Define → explain → example or diagram → benefit or trade-off. Name real services (VPC, ALB, ASG, RDS Multi-AZ, S3).'],
    ['Never leave a blank', 'Partial answers earn partial marks. Write what you know.']
  ],
  paperGroups: [
    { t: 'Final exam papers', items: [
      { id: 'jun24', tab: 'Jun 2024', t: 'IT4090 Final exam, June 2024', sub: '4 questions of 25 marks · scanned paper (Q4 is Lecture 13, skip it)', file: 'papers/jun-2024.pdf', paper: 'J24', kb: 125 },
      { id: 'nov23', tab: 'Nov 2023', t: 'IT4090 Final exam, November 2023', sub: '4 questions of 25 marks · scanned paper (Q4 d, e, f are Lecture 13)', file: 'papers/nov-2023.pdf', paper: 'N23', kb: 1599 },
      { id: 'nov22', tab: 'Nov 2022', t: 'IT4090 Final exam, November 2022', sub: '4 questions · scanned paper (Q4 is Lecture 13, skip it)', file: 'papers/nov-2022.pdf', paper: 'N22', kb: 174 },
      { id: 'jun22', tab: 'Jun 2022', t: 'IT4090 Repeat exam, June 2022', sub: '5 questions of 20 marks · scanned paper (Q5 is Lecture 13, skip it)', file: 'papers/jun-2022.pdf', paper: 'J22', kb: 141 }
    ] }
  ],
  /* final-paper questions per lecture (each lettered part counted once; Lecture 13 topics left out) */
  fromLabel: 'Questions per lecture in this paper',
  paperMap: {
    J22: { 1: 2, 6: 5, 7: 4, 8: 1, 9: 3 },
    N22: { 1: 3, 5: 1, 6: 5, 9: 5, 11: 1 },
    N23: { 1: 6, 2: 2, 6: 3, 7: 1, 8: 3, 9: 6 },
    J24: { 1: 4, 6: 7, 8: 1, 9: 5 }
  },
  code: 'IT4090',
  name: 'Cloud Computing',
  year: 'Year 4 · Semester 2',
  blurb: '12 lectures · 4 questions · MCQ + short + structured · 2 hours',
  examDate: '2026-11-16',   // YYYY-MM-DD. null shows "TBA" in the sidebar.
  examTime: '9:00 AM – 11:00 AM',
  examNote: 'Final exam: Lectures 1–12 (no questions from Lecture 13, Cloud in Enterprises and Cloud Design Frameworks)',
  cheatHead: ['If the question says', 'Answer with'],
  format: [
    ['Date and time', '16 Nov 2026 · 9:00 AM – 11:00 AM'],
    ['Duration', '2 hours · no additional reading time'],
    ['Question types', 'MCQs · short answers · structured / essay'],
    ['Coverage', 'Lectures 1–12 (Lecture 13 Cloud in Enterprises and Cloud Design Frameworks is <b>not</b> examined)'],
    ['Practice with', 'Final past papers in this portal']
  ],
  lectureSources: {
    slides: 'Built from your lecture slides.',
    outline: 'Slides for this lecture were not in the folder, so it is written from the official course outline plus standard cloud knowledge. Check it against your own slides.'
  },
  golden: [
    ['Read every option', 'MCQs are scenario based. Underline the keyword (stateful, cheapest, private, highly available) before looking at the options.'],
    ['Count the answers', '“Choose 2 / choose 3” means exactly that many. In the mid-term most wrong marks came from missing the second answer.'],
    ['Match keyword → service', 'Use the cheat table below. The exam loves one-line scenarios with a single AWS service answer.'],
    ['Structured answers', 'Define → explain → example / diagram → benefit or trade-off. Name real services (VPC, ALB, ASG, RDS Multi-AZ).'],
    ['Show calculations', 'For CIDR / usable IP questions write 2^(32 − prefix) − 5 and each step. Marks are given for method.'],
    ['Time plan (suggested)', '~35 min MCQ · ~20 min short answers · ~55 min structured · 10 min review. Adjust to the real mark split.'],
    ['Do not leave blanks', 'Short answers and essays have no negative marking. Write what you know.']
  ],
  cheat: [
    ['Static website, cheap and highly available', 'Amazon S3 static website hosting'],
    ['CDN / cache close to users', 'Amazon CloudFront · Edge locations'],
    ['Who called which API / audit trail', 'AWS CloudTrail'],
    ['Metrics, logs, alarms', 'Amazon CloudWatch (+ SNS to notify)'],
    ['Cheapest long-term archive', 'S3 Glacier / Deep Archive'],
    ['Interruptible batch, lowest cost', 'Spot Instances'],
    ['Steady 1–3 year usage', 'Reserved Instances / Savings Plans'],
    ['Non-relational managed DB, huge scale', 'Amazon DynamoDB'],
    ['In-memory cache', 'Amazon ElastiCache (Redis / Memcached)'],
    ['Graph database', 'Amazon Neptune'],
    ['Data warehouse / OLAP', 'Amazon Redshift'],
    ['Streaming / real-time ingest', 'Amazon Kinesis'],
    ['Infrastructure as code on AWS', 'AWS CloudFormation'],
    ['Chef / Puppet automation', 'AWS OpsWorks'],
    ['Managed container orchestration', 'Amazon ECS (EKS for Kubernetes)'],
    ['Serverless functions', 'AWS Lambda'],
    ['Source / build / deploy / pipeline', 'CodeCommit / CodeBuild / CodeDeploy / CodePipeline (CodeStar = project hub)'],
    ['Instance-level firewall (stateful)', 'Security group'],
    ['Subnet-level firewall (stateless)', 'Network ACL'],
    ['Private instances need outbound internet', 'NAT Gateway in a public subnet'],
    ['Encrypted link to on-premises', 'Site-to-Site VPN (Virtual Private Gateway)'],
    ['Dedicated private link to on-premises', 'AWS Direct Connect'],
    ['Connect many VPCs (hub and spoke)', 'Transit Gateway'],
    ['VPC-to-VPC private link', 'VPC peering (not transitive, needs routes)'],
    ['Scale instances automatically', 'Auto Scaling group (+ ALB)'],
    ['Failover database in another AZ', 'RDS Multi-AZ'],
    ['Scale database reads', 'RDS read replicas'],
    ['Notifications (email / SMS)', 'Amazon SNS'],
    ['Encryption key management', 'AWS KMS (CMKs never leave AWS unencrypted)']
  ],
  links: {
    whatsapp: 'https://whatsapp.com/channel/0029VbAOUZj6hENiKN0n9K2y',
    youtube: 'https://www.youtube.com/@sachithra228',
    syncode: 'https://teamsyncode.com'
  }
};
