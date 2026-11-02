/* Cloud Computing (IT4090) question bank, part 3: short answer and structured / essay questions.
   Short:      [lecture, source, question, answer]
   Structured: [lecture, source, title, question, modelAnswerHtml, marksHint]
   'past' = taken from the mid-term paper (model answers are written by us, not the lecturer).
   'practice' = written from the lecture content. */
window.PORTAL = window.PORTAL || { modules: {} };
window.PORTAL.ccShortRaw = [
// ---- past-paper short answers / fill in the blanks ----
[4,'past','The AWS networking service that enables a company to create a virtual network within AWS is ______.','Amazon Virtual Private Cloud (Amazon VPC)'],
[4,'past','A/An ______ acts as a firewall that controls the traffic allowed to reach one or more instances.','Security group'],
[4,'past','Security groups act like a firewall at the instance level, whereas ______ are an additional layer of security that control traffic in and out of a subnet.','Network ACLs (NACLs)'],
[4,'past','How many internet gateways can you attach to a custom VPC at a time?','1'],
[4,'past','In a default VPC, all EC2 instances are assigned two IP addresses at launch. What are they?','A private IP and a public IP'],
[4,'past','While creating an Amazon RDS DB, your first task is to set up a DB ______ that controls which IP addresses or EC2 instances have access to your DB instance.','Security group'],
[2,'past','To manage your EC2 instances, images and other resources you can assign your own metadata to each resource in the form of ______ (they categorise resources by purpose, owner or environment).','Tags'],
[2,'past','Name the CDN service that AWS offers (a geographically distributed network that delivers content to users worldwide).','Amazon CloudFront'],
[2,'past','What is specifically used by the AWS CDN to distribute (cache) content close to users?','Edge locations'],
[3,'past','You have a static HTML website that needs inexpensive, highly available hosting. Which AWS service?','Amazon S3 (static website hosting)'],
[3,'past','Which AWS service is the most cost-effective for archiving large amounts of rarely accessed data (e.g. hospital records)?','Amazon S3 Glacier'],
[3,'past','A distributed application periodically processes data and can tolerate interruptions. Which EC2 purchasing option is most cost effective?','Spot Instances'],
[1,'past','You keep some private servers on premises and have distributed part of your workload on the public cloud. What is this deployment model?','Hybrid cloud'],
[6,'past','What does IAM stand for?','Identity and Access Management'],
[6,'past','In IAM you can edit user properties later, but you cannot use the console to change the ______.','Username'],
[6,'past','You work in the security industry and need to record who called which API on AWS resources. Which service?','AWS CloudTrail'],
[7,'past','______ is a managed, in-memory key-value data store service.','Amazon ElastiCache'],
[7,'past','______ is a fast, reliable graph database built for the cloud.','Amazon Neptune'],
[7,'past','Which AWS services would you use to collect and process e-commerce data (operational store and analytics)?','Amazon DynamoDB and Amazon Redshift'],
[10,'past','Infrastructure as code (IaC) on AWS is provided by which service?','AWS CloudFormation'],
[10,'past','The default scripting language for CloudFormation is ______ (lecturer key; YAML is also supported).','JSON'],
[9,'past','Name the AWS fully managed services involved in continuous software development (source repository, build, project hub).','AWS CodeCommit (source), AWS CodeBuild (build), AWS CodeStar (project hub / dashboard)'],
[9,'past','This architecture is similar to a big container in which all software components of an application are tightly packed. What is it called?','Monolithic architecture'],
[9,'past','Which technique reduces downtime and risk by running two identical production environments?','Blue-green deployment'],
[9,'past','Which Spring Boot feature gives you access to the current state / health and metrics of a running application?','Spring Boot Actuator'],
[9,'past','AWS compute service used to develop serverless applications (run code without managing servers).','AWS Lambda'],
[11,'past','What is the Docker command that lists the images on a host?','docker images'],
[11,'past','______ is AWS’s fully managed container orchestration service.','Amazon Elastic Container Service (Amazon ECS)'],
// ---- practice: quick definitions ----
[1,'practice','Define elasticity in your own words.','The ability to automatically add resources when demand rises and release them when it falls, so you only have (and pay for) what you need.'],
[1,'practice','Define on-demand self-service.','A consumer can provision computing resources such as servers, storage and networks whenever needed, without human interaction with the provider.'],
[2,'practice','State the AWS shared responsibility split in one line.','AWS is responsible for security OF the cloud (hardware, facilities, hypervisor, global network); the customer is responsible for security IN the cloud (data, IAM, guest OS, firewall rules, encryption).'],
[4,'practice','Give the formula for usable IPs in an AWS subnet.','2^(32 − prefix) − 5 (AWS reserves 5 addresses per subnet).'],
[4,'practice','Why can a NAT gateway not be placed in a private subnet?','It needs a route to the Internet Gateway to forward traffic out, so it must be deployed in a public subnet.'],
[5,'practice','Differentiate RTO and RPO.','RTO = maximum time to restore service after a disaster (downtime). RPO = maximum acceptable data loss measured in time (age of the last good backup).'],
[5,'practice','What are the three desired-capacity settings of an Auto Scaling group?','Minimum size, maximum size and desired capacity.'],
[6,'practice','What are the four authentication factors used in MFA?','Something you have, something you know, something you are, and somewhere you are.'],
[7,'practice','List the four NoSQL database types.','Key-value, document, column-family (columnar) and graph.'],
[8,'practice','List the 6 Rs of cloud migration.','Rehost, Replatform, Repurchase, Refactor, Retire, Retain.'],
[10,'practice','Which Terraform file records the real-world resources it manages?','The state file (terraform.tfstate).'],
[12,'practice','Name the main Kubernetes control plane components.','kube-apiserver, etcd, kube-scheduler and the controller manager (plus the cloud controller manager).']
];

window.PORTAL.ccStructuredRaw = [
[4,'past','Design the VPC address plan (Mid structured Q1)',
 'ABC is a business and software company. As the new systems engineer you must design an AWS infrastructure for: 15 public load balancers, 5 private load balancers, 30 private EC2 instances and 5 private DB instances. High availability is a priority. (a) Describe how you calculate an optimal CIDR block. (b) Briefly explain the subnets you choose. (c) Justify why DB instances should be private, not public.',
 `<p><b>(a) Calculating the CIDR</b></p>
  <ul><li>High availability → use <b>2 AZs</b> and place every tier in a subnet in each AZ.</li>
  <li>Count the IPs each tier needs <b>per AZ</b>, add the <b>5 reserved IPs per subnet</b>, add room for growth, then round up to a power of two: usable = 2<sup>(32−prefix)</sup> − 5.</li>
  <li>Public LB tier: 15 LBs → 15 IPs per AZ (+5 +growth) → <b>/27</b> (27 usable). App tier: 30 EC2 + 5 internal LBs split across AZs ≈ 18 per AZ (+5 +growth) → <b>/26</b> (59 usable). DB tier: 5 DB instances (Multi-AZ primary + standby) → <b>/28</b> (11 usable).</li>
  <li>Sum of all subnets = 2×(32+64+16) = 224 addresses, so a /24 is the minimum. Choose <b>10.0.0.0/23</b> (512 IPs, within /16–/28 and RFC 1918) to leave growth room for more subnets.</li></ul>
  <p><b>(b) Subnets</b></p>
  <table><tr><th>Tier</th><th>Subnet</th><th>AZ</th></tr>
  <tr><td>Public (15 internet-facing LBs, NAT gateway)</td><td>10.0.0.0/27 and 10.0.0.32/27</td><td>a and b</td></tr>
  <tr><td>Private app (30 EC2 + 5 internal LBs)</td><td>10.0.0.64/26 and 10.0.0.128/26</td><td>a and b</td></tr>
  <tr><td>Private DB (5 DB instances)</td><td>10.0.0.192/28 and 10.0.0.208/28</td><td>a and b</td></tr></table>
  <p>Public subnets route to an Internet Gateway; private subnets route outbound through a NAT gateway only. Remaining space (10.0.0.224/27 and 10.0.1.0/24) is kept spare.</p>
  <p><b>(c) Why DB instances are private</b></p>
  <ul><li>No public IP / no route from the internet → <b>smaller attack surface</b>, protects against brute force, SQL injection scanning and data theft.</li>
  <li>Only the app tier can reach it, enforced by a <b>security group that allows only the app SG on the DB port</b>.</li>
  <li>Meets compliance (data protection); admins use a bastion host / VPN / Systems Manager instead of exposing the DB.</li></ul>`,
 'Show the calculation steps, the subnet table and the justification'],
[4,'past','Migrate an HR system to AWS (Mid structured Q2)',
 'ABC is a startup. You must migrate an existing HR system (3-tier architecture) to AWS. (a) Explain how you would migrate it and make it highly available and accessible only from the company network (company VPN 192.10.0.1/22). (b) The system is slow and sometimes unresponsive; both servers show 100% memory use on t3.medium instances. Explain how you would mitigate it. (c) Explain how you would provide VPC level security.',
 `<p><b>(a) Migration and HA, company-network-only access</b></p>
  <ul><li><b>Assess</b> the web / app / DB tiers and dependencies, then <b>rehost</b> web and app servers (AMI / Application Migration Service) and migrate the database with <b>AWS DMS</b> to <b>RDS Multi-AZ</b>. Test, cut over, keep a rollback.</li>
  <li><b>VPC</b> with a CIDR that does <b>not overlap</b> 192.10.0.0/22 (note 192.10.0.1/22 is the 192.10.0.0/22 network), e.g. 10.0.0.0/16. Use <b>private subnets only</b> in at least <b>2 AZs</b>: web, app and DB tiers. No public IPs and no Internet Gateway for the app.</li>
  <li><b>Access only from the company network:</b> a <b>Site-to-Site VPN</b> (Virtual Private Gateway) or Direct Connect from the company network to the VPC, and an <b>internal Application Load Balancer</b> in front of the web tier. Security groups allow inbound HTTPS only from <b>192.10.0.0/22</b>.</li>
  <li><b>HA:</b> Auto Scaling groups across AZs for web and app tiers, ALB health checks, <b>Multi-AZ RDS</b>, backups / snapshots, CloudWatch alarms.</li></ul>
  <p><b>(b) 100% memory on t3.medium (4 GiB)</b></p>
  <ul><li>Memory is not a default CloudWatch metric: install the <b>CloudWatch agent</b> to monitor it and set alarms.</li>
  <li><b>Scale vertically</b>: move to a memory-optimized family (e.g. r6i.large) or a bigger T / M size. <b>Scale horizontally</b>: ASG + load balancer with a scaling policy on memory / CPU.</li>
  <li>Reduce load: <b>ElastiCache</b> for session / query results, tune the application and database queries, fix memory leaks, move batch jobs off-peak.</li></ul>
  <p><b>(c) VPC-level security</b></p>
  <ul><li><b>Network ACLs</b> (stateless, subnet level) and <b>security groups</b> (stateful, least privilege, tier-to-tier rules).</li>
  <li>Private subnets, <b>VPC endpoints / PrivateLink</b> for S3 and other services, <b>VPC Flow Logs</b>, <b>IAM roles</b> instead of keys, encryption in transit (TLS) and at rest (KMS), <b>CloudTrail</b> and CloudWatch monitoring, <b>AWS WAF</b> / Shield if exposed.</li></ul>`,
 'Cover design, scaling fix and security layers'],
[4,'practice','Security Group vs Network ACL',
 'Compare security groups and network ACLs in AWS. Include a scenario showing why the difference matters.',
 `<table><tr><th></th><th>Security group</th><th>Network ACL</th></tr>
  <tr><td>Applies to</td><td>Instance / ENI</td><td>Subnet</td></tr>
  <tr><td>State</td><td>Stateful (replies automatically allowed)</td><td>Stateless (request and response both need rules)</td></tr>
  <tr><td>Rule types</td><td>Allow only</td><td>Allow and Deny, evaluated by rule number</td></tr>
  <tr><td>Default</td><td>Deny inbound, allow outbound</td><td>Default NACL allows all</td></tr></table>
  <p><b>Scenario:</b> an instance accepts SSH (port 22). The SG has an inbound rule for port 22, so replies are automatically allowed. If the subnet NACL allows inbound but <b>denies outbound</b>, SSH still fails because the stateless NACL blocks the reply: fix the outbound NACL rule (allow ephemeral ports). Use SGs for fine-grained per-instance rules and NACLs as a coarse subnet-level layer (e.g. block a malicious IP range).</p>`,
 '4–6 marks'],
[5,'practice','Highly available web application on AWS',
 'Design a highly available and scalable three-tier web application on AWS. Explain how each component removes a single point of failure.',
 `<ul><li><b>DNS and edge:</b> Route 53 (health checks, failover) and CloudFront to cache content at edge locations.</li>
  <li><b>Web tier:</b> an <b>Application Load Balancer</b> across <b>2+ AZs</b> in public subnets, with health checks and connection draining.</li>
  <li><b>App tier:</b> EC2 instances in private subnets in an <b>Auto Scaling group</b> (min / max / desired, launch template with a golden AMI, scale on a CloudWatch alarm such as CPU or request count; scheduled scaling for known peaks).</li>
  <li><b>Data tier:</b> <b>RDS Multi-AZ</b> (automatic failover) plus read replicas for read scaling, ElastiCache to cut DB load, S3 for static assets.</li>
  <li><b>Outbound:</b> a NAT gateway per AZ. <b>Security:</b> SGs per tier, NACLs, IAM roles.</li>
  <li><b>Operations:</b> CloudWatch alarms + SNS, CloudTrail, snapshots / backups, infrastructure defined in CloudFormation.</li></ul>
  <p>Result: no single AZ, server or database is a single point of failure; capacity follows demand.</p>`,
 'Diagram + explanation'],
[5,'practice','Disaster recovery planning',
 'Explain RTO, RPO and the four AWS DR strategies. How would you choose between them?',
 `<ul><li><b>RTO</b> (Recovery Time Objective) = how quickly service must be restored. <b>RPO</b> (Recovery Point Objective) = how much data loss is acceptable (time since last good backup). RCO = tolerated inconsistency.</li>
  <li><b>Backup and restore:</b> cheapest, RTO / RPO of hours. <b>Pilot light:</b> core (database replication) always on, scale out on disaster, RTO tens of minutes. <b>Warm standby:</b> scaled-down full environment running, RTO minutes. <b>Multi-site active/active:</b> full capacity in two sites, near-zero RTO / RPO, most expensive.</li>
  <li><b>Choose</b> from business impact analysis: critical systems with tight RTO / RPO justify warm standby or multi-site; non-critical systems use backup and restore. Test the plan regularly; use snapshots, cross-region replication and automation (IaC).</li></ul>`,
 '6–8 marks'],
[6,'practice','IAM and shared responsibility',
 'Explain the shared responsibility model and list IAM best practices a customer should apply.',
 `<ul><li><b>Shared responsibility:</b> the provider secures <i>of</i> the cloud (facilities, hardware, hypervisor, global network); the customer secures <i>in</i> the cloud (data, IAM, guest OS patching, security groups, encryption). Responsibility shifts toward the provider from IaaS to PaaS to SaaS.</li>
  <li><b>IAM components:</b> users, groups, policies and roles.</li>
  <li><b>Best practices:</b> <b>least privilege</b>; permissions on groups, not users; <b>roles</b> for applications and cross-account access (temporary credentials); enable <b>MFA</b>; protect and rotate <b>access keys</b> (never in code); do not use the root account; enable CloudTrail; use identity federation / SSO for enterprise users; regular access reviews.</li></ul>`,
 '5–6 marks'],
[7,'practice','SQL vs NoSQL and the CAP theorem',
 'Compare relational and NoSQL databases and explain the CAP theorem. Recommend a database for an online voting application with millions of mobile users.',
 `<ul><li><b>Relational:</b> structured tables, fixed schema, joins, <b>ACID</b>, SQL (RDS / Aurora). <b>NoSQL:</b> flexible schema, horizontal scaling, key-value / document / column / graph (DynamoDB, DocumentDB, Neptune).</li>
  <li><b>CAP:</b> a distributed store can guarantee only two of Consistency, Availability and Partition tolerance. When a partition occurs choose consistency (refuse / cancel operations) or availability (serve possibly stale data).</li>
  <li><b>Recommendation:</b> <b>Amazon DynamoDB</b>: fully managed, key-value, millisecond latency, auto-scaling and multi-AZ durability for huge write volumes; add Kinesis for streaming the tally and ElastiCache for read hot-spots. Use RDS only if complex joins / transactions are needed.</li></ul>`,
 '6 marks'],
[7,'practice','Data warehouse vs data lake',
 'Differentiate a data warehouse from a data lake and describe an AWS analytics pipeline using both.',
 `<table><tr><th></th><th>Warehouse</th><th>Lake</th></tr>
  <tr><td>Data</td><td>Processed, structured</td><td>Raw, any format</td></tr>
  <tr><td>Purpose</td><td>Defined reports / BI</td><td>Undefined, exploration, ML</td></tr>
  <tr><td>Users</td><td>Business analysts</td><td>Data scientists</td></tr>
  <tr><td>AWS</td><td>Redshift</td><td>S3 (+ Glue, Athena)</td></tr></table>
  <p><b>Pipeline:</b> sources (apps, logs, IoT) → <b>Kinesis</b> (real-time ingest) → <b>S3 data lake</b> (raw) → ETL / ELT with Glue → <b>Redshift</b> warehouse → <b>QuickSight</b> BI dashboards. ETL transforms before loading; ELT loads first and transforms in the target.</p>`,
 '5–6 marks'],
[3,'practice','Choosing storage services',
 'Recommend and justify storage for: (a) a database server, (b) shared files for several Linux servers, (c) a static website, (d) 10-year compliance archive, (e) data with unpredictable access.',
 `<ul><li>(a) <b>Block storage – EBS</b> (SSD, provisioned IOPS for databases): low latency, attached to one instance.</li>
  <li>(b) <b>File storage – EFS</b>: NFS shared across many instances.</li>
  <li>(c) <b>Object storage – S3 static website hosting</b> (+ CloudFront): cheap, durable, highly available.</li>
  <li>(d) <b>S3 Glacier / Deep Archive</b>: lowest cost for rarely accessed data, with retrieval delay and retention (Object Lock) options.</li>
  <li>(e) <b>S3 Intelligent-Tiering</b>: moves objects between tiers automatically.</li></ul>`,
 '5 marks'],
[1,'practice','Cloud models and benefits',
 'Explain IaaS, PaaS and SaaS with examples, then describe the four deployment models and recommend one for a bank that must keep customer data on premises but wants elastic web capacity.',
 `<ul><li><b>IaaS</b> – virtual infrastructure (EC2, S3). <b>PaaS</b> – platform to run apps (Elastic Beanstalk, RDS). <b>SaaS</b> – ready-to-use software (Gmail, Salesforce). The provider manages more at each step up.</li>
  <li><b>Public</b> (shared, pay-per-use), <b>Private</b> (single organization, high control, costly), <b>Hybrid</b> (both, portable), <b>Community</b> (shared by similar organizations such as governments).</li>
  <li><b>Recommendation:</b> <b>Hybrid cloud</b>: customer data and core banking stay in a private / on-premises environment for compliance; the web front end bursts into the public cloud, connected by VPN / Direct Connect.</li></ul>`,
 '6 marks'],
[8,'practice','Cloud migration strategy',
 'A company has 50 on-premises applications. Describe a migration plan and apply the 6 Rs to different applications. Identify two challenges and how to reduce them.',
 `<ul><li><b>Plan:</b> assess (inventory, dependencies, TCO) → plan (landing zone, security, waves) → migrate (pilot first, then waves) → optimize.</li>
  <li><b>6 Rs applied:</b> <b>Rehost</b> stable legacy servers; <b>Replatform</b> self-managed databases to RDS; <b>Repurchase</b> the in-house CRM to SaaS; <b>Refactor</b> the customer-facing monolith into microservices; <b>Retire</b> unused tools; <b>Retain</b> regulated mainframe apps.</li>
  <li><b>Challenges:</b> downtime / data transfer volume → use DMS, Snowball, phased cutover with rollback; skills gap and security / compliance → training, landing zone guardrails, encryption and IAM, cost monitoring to avoid surprises.</li></ul>`,
 '6–8 marks'],
[9,'practice','CI/CD and cloud-native design',
 'Describe a CI/CD pipeline on AWS and explain how the twelve-factor principles support cloud-native applications.',
 `<ul><li><b>Pipeline:</b> developer commits to <b>CodeCommit</b> → <b>CodePipeline</b> triggers → <b>CodeBuild</b> compiles and runs tests → artifact stored (S3 / ECR) → <b>CodeDeploy</b> deploys using rolling or <b>blue-green</b> deployment → monitored in CloudWatch. CodeStar provides a project dashboard.</li>
  <li><b>12-factor highlights:</b> one codebase; explicit dependencies; config in environment; backing services as attached resources; separate build / release / run; stateless processes; port binding; scale out via processes; disposability; dev / prod parity; logs as streams; admin tasks as one-off processes.</li>
  <li>Together they give portable, scalable, automated deployments and fast, low-risk releases compared with a monolith.</li></ul>`,
 '6 marks'],
[10,'practice','IaC tools comparison',
 'What is Infrastructure as Code? Compare CloudFormation, Terraform and Ansible and say when you would use each.',
 `<ul><li><b>IaC:</b> infrastructure defined in version-controlled, machine-readable files: repeatable, consistent, reviewable, fast to rebuild; reduces human error and drift.</li>
  <li><b>CloudFormation:</b> AWS-native, JSON / YAML templates → stacks (Resources section required). Use for AWS-only environments.</li>
  <li><b>Terraform:</b> multi-cloud, HCL, providers, state file, init / plan / apply / destroy. Use for provisioning across clouds.</li>
  <li><b>Ansible:</b> agentless over SSH, YAML playbooks, idempotent modules. Use for configuring servers and deploying apps after they exist.</li>
  <li>Often combined: Terraform / CloudFormation create the infrastructure and Ansible configures it.</li></ul>`,
 '6 marks'],
[11,'practice','Containers vs virtual machines',
 'Compare containers with virtual machines and describe the Docker workflow from code to a running container.',
 `<ul><li><b>VMs</b> virtualize hardware with a hypervisor and include a full guest OS (GBs, slow start). <b>Containers</b> virtualize the OS: share the host kernel, hold only app + dependencies (MBs, start in seconds), higher density, more portable, but weaker isolation.</li>
  <li><b>Docker workflow:</b> write a <b>Dockerfile</b> → <code>docker build</code> creates an <b>image</b> → <code>docker push</code> to a registry (Docker Hub / ECR) → <code>docker pull</code> and <code>docker run</code> create a <b>container</b>. Lifecycle: created → running → paused → stopped → removed. Use <b>volumes</b> for persistent data and <b>Docker Compose</b> for multi-container apps.</li></ul>`,
 '5–6 marks'],
[12,'practice','Kubernetes architecture',
 'Draw and explain the Kubernetes architecture. Describe Pods, Deployments and Services and how an application is exposed.',
 `<ul><li><b>Control plane:</b> kube-apiserver (entry point), etcd (cluster state), kube-scheduler (places pods), controller manager (reconciles desired state).</li>
  <li><b>Worker nodes:</b> kubelet (runs pods), kube-proxy (service networking), container runtime.</li>
  <li><b>Pod:</b> smallest unit, containers sharing IP / storage. <b>Deployment</b> → ReplicaSet → pods: declarative scaling, self-healing, rolling updates and rollback. <b>Service:</b> stable IP / DNS and load balancing for pods selected by labels (ClusterIP, NodePort, LoadBalancer).</li>
  <li><b>Exposure:</b> LoadBalancer or an <b>Ingress</b> (host / path routing) in front of services; internal discovery through cluster DNS. Storage via PV / PVC, configuration via ConfigMaps / Secrets.</li>
  <li><b>Docker Swarm</b> is the simpler alternative: managers and workers, services, stacks, overlay network.</li></ul>`,
 '6–8 marks']
];
