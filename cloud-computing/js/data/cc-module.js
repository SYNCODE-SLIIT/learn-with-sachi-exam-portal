/* Cloud Computing (IT4090) module definition. Change examDate here when the date is confirmed (YYYY-MM-DD). */
window.PORTAL = window.PORTAL || { modules: {} };
window.PORTAL.modules.cc = {
  id: 'cc',
  code: 'IT4090',
  name: 'Cloud Computing',
  year: 'Year 4 · Semester 2',
  blurb: '12 lectures · MCQ + short answers + structured · 2 hours',
  examDate: '2026-11-16',   // YYYY-MM-DD. null shows "TBA" in the sidebar.
  examTime: '9:00 AM – 11:00 AM',
  examNote: 'Final exam: Lectures 1–12 (no questions from Lecture 13)',
  format: [
    ['Date and time', '16 Nov 2026 · 9:00 AM – 11:00 AM'],
    ['Duration', '2 hours'],
    ['Question types', 'MCQs · short answers · structured / essay'],
    ['Coverage', 'Lectures 1–12 (Lecture 13 Microservices &amp; Serverless is <b>not</b> examined)'],
    ['Practice with', 'Mid-term past-paper questions in this portal']
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
