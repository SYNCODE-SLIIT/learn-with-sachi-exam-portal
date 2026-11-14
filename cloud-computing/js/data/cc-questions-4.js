/* Cloud Computing (IT4090) question bank, part 4: extra short answers and essays so every lecture has questions.
   Short:      [lecture, source, question, answer]
   Structured: [lecture, source, title, question, modelAnswerHtml, marksHint, paper]
   source 'final' = asked in a final paper (2022 to 2024); the model answer is written by us, not the lecturer.
   source 'practice' = written from the lecture slides. Lecture numbers follow this portal (L3 = Compute & Storage, L8 = Migration, L9 = Cloud Native, L10 = IaC, L11 = Containers, L12 = Orchestration). */
window.PORTAL = window.PORTAL || { modules: {} };
window.PORTAL.ccShortRaw = window.PORTAL.ccShortRaw || [];
window.PORTAL.ccStructuredRaw = window.PORTAL.ccStructuredRaw || [];
window.PORTAL.ccShortRaw.push(
// ---- L1 ----
[1,'final','Name the five essential characteristics of cloud computing (NIST).','On-demand self-service, broad network access, resource pooling, rapid elasticity, measured service.'],
[1,'practice','What does CAPEX to OPEX mean in the cloud?','Instead of a large upfront capital purchase of hardware (CAPEX), you pay for what you use as an ongoing operating cost (OPEX).'],
[1,'final','Give one example each of IaaS, PaaS and SaaS.','IaaS: AWS EC2 or Azure VM. PaaS: Elastic Beanstalk, Azure App Service or RDS. SaaS: Microsoft 365, Gmail or Salesforce.'],
[1,'practice','Which deployment model suits government agencies with shared compliance needs?','Community cloud (for example a government cloud).'],
// ---- L2 ----
[2,'practice','What is an Availability Zone?','A fully isolated partition of a Region made of one or more data centers, joined to other AZs by fast private networking.'],
[2,'final','State the shared responsibility split in one line.','The provider secures the cloud itself (hardware, data centers, virtualization). The customer secures what they put in the cloud (data, access, configuration, OS on IaaS).'],
[2,'practice','Give the four factors for choosing a Region.','Data governance and legal rules, latency (distance to customers), services available, and cost.'],
[2,'practice','What is the difference between a soft limit and a hard limit?','A soft limit can be raised by request. A hard limit cannot be raised.'],
// ---- L3 ----
[3,'practice','Which purchasing option can be stopped by the provider at any time?','Spot instances.'],
[3,'practice','Which placement group gives the lowest network latency?','Cluster placement group (instances close together in one AZ).'],
[3,'practice','Which AWS storage service is object storage and which is block storage?','Object: Amazon S3. Block: Amazon EBS.'],
[3,'practice','What does the CAP theorem say?','A distributed data store can guarantee only two of Consistency, Availability and Partition tolerance at the same time.'],
// ---- L4 ----
[4,'practice','How many IP addresses are reserved in every AWS subnet?','Five: network address, VPC router, DNS, future use and broadcast.'],
[4,'practice','Is a NACL stateful or stateless?','Stateless: you must allow both the request and the response.'],
[4,'practice','Why does a NAT gateway sit in a public subnet?','It needs a route to the internet gateway so private instances can reach the internet through it.'],
// ---- L5 ----
[5,'final','Define RTO and RPO.','RTO is the target time to restore a process after a disaster. RPO is the maximum acceptable data loss measured in time.'],
[5,'practice','What is the difference between incremental and differential backup?','Incremental copies changes since the last backup of any type. Differential copies changes since the last full backup.'],
[5,'practice','Name the four load balancing algorithms from the lecture.','Round robin, least connections, least time and IP hash.'],
[5,'practice','What is failover and what detects the failure?','Switching to a standby system when the main one fails. A heartbeat signal detects the failure.'],
// ---- L6 ----
[6,'final','State the principle of least privilege.','A user or process gets only the privileges essential to perform its function.'],
[6,'final','List the IAM components in the lecture.','Logical organization, users, groups, policies and roles.'],
[6,'final','Name the four kinds of authentication factor used in MFA.','Something you have, something you know, something you are, and somewhere you are.'],
[6,'practice','What is the difference between federation and SSO?','Federation links one identity across several identity systems. SSO lets you log in once and use many systems.'],
// ---- L7 ----
[7,'final','Give two examples of caching systems.','Redis and Memcached.'],
[7,'final','Which is raw and which is processed: data warehouse or data lake?','A data lake holds raw data. A data warehouse holds processed, structured data.'],
[7,'final','Compare OLTP and OLAP in one line.','OLTP handles many small, fast transactions on current data. OLAP runs large analytical queries on historical data.'],
[7,'practice','Which NoSQL type suits relationships such as a social network?','Graph database (for example Amazon Neptune or Neo4j).'],
// ---- L8 ----
[8,'final','What does "lift and shift" mean?','Rehost: move an application to the cloud as it is, without changing the code.'],
[8,'practice','Name the six Rs of AWS migration.','Rehost, re-platform, repurchase, refactor (re-architect), retire and retain.'],
[8,'practice','Which migration strategy is usually the most expensive?','Refactor / re-architect / rebuild.'],
[8,'final','Give the three migration challenges from the lecture.','Cost of migration, resistance to adapt, and shortage of skills.'],
[8,'practice','Name two tools used for portfolio discovery.','AWS Application Discovery Service and Azure Migrate.'],
// ---- L9 ----
[9,'final','Define microservices architecture in one sentence.','An application split into small, independently deployable services that talk through APIs and can be scaled separately.'],
[9,'final','What is Function as a Service (FaaS)?','A serverless model where small functions run on events and you pay only per execution, for example AWS Lambda or Azure Functions.'],
[9,'practice','Where should configuration be stored in a twelve-factor app?','In environment variables, not in the code.'],
[9,'practice','What is the difference between continuous delivery and continuous deployment?','Delivery needs a manual approval before production. Deployment releases automatically when all checks pass.'],
[9,'final','What is the SecOps model?','Security and operations working together so security is built into development and operations from the start.'],
// ---- L10 ----
[10,'practice','Define infrastructure as code in one sentence.','Provisioning and managing cloud resources by describing them in template files that are readable by people and machines.'],
[10,'practice','Which IaC tool type are Terraform and CloudFormation?','Provisioning tools.'],
[10,'practice','Name the three steps of the Terraform workflow.','Write, plan, apply.'],
// ---- L11 ----
[11,'practice','What is the difference between a Docker image and a container?','An image is a read-only template. A container is a running instance of an image.'],
[11,'practice','Which command equals pull plus create plus start?','docker run.'],
[11,'practice','What is the difference between docker stop and docker kill?','Stop sends SIGTERM for a graceful shutdown. Kill sends SIGKILL and stops immediately.'],
[11,'practice','What does a Dockerfile do?','It is a text file of commands that builds a Docker image.'],
// ---- L12 ----
[12,'practice','What is container orchestration?','Automating deployment, management, scaling and networking of containers across their lifecycle.'],
[12,'practice','Name three container orchestration tools.','Kubernetes, Docker Swarm and Red Hat OpenShift.'],
[12,'practice','What are the three steps of orchestration?','Provisioning, deployment and lifecycle management.'],
[12,'practice','What do control plane nodes and worker nodes do?','Control plane nodes orchestrate the cluster. Worker nodes run the containers.']
);

window.PORTAL.ccStructuredRaw.push(
[1,'final','Move a growing company from on-premises to the cloud (Nov 2023 Q1 d)',
 'You are the CTO of a small business that is growing quickly. Your IT is on-premises and ageing. (i) Discuss the challenges of staying on-premises. (ii) Develop a strategy to use the cloud, applying scalability, cost-efficiency and agility. (iii) Draw a simple architecture diagram.',
 `<p><b>(i) Challenges of staying on-premises</b></p>
  <ul><li><b>Capacity:</b> fixed hardware cannot handle peak traffic, so you buy for the peak and waste it the rest of the time.</li>
  <li><b>Cost:</b> large CAPEX, power, cooling, space, licences and staff for maintenance and upgrades.</li>
  <li><b>Speed:</b> buying and installing hardware takes months, which slows growth.</li>
  <li><b>Resilience:</b> a single site is a single point of failure, and disaster recovery is expensive.</li></ul>
  <p><b>(ii) Cloud strategy</b></p>
  <ul><li><b>Scalability:</b> Auto Scaling and a load balancer add and remove servers with demand.</li>
  <li><b>Cost-efficiency:</b> pay as you go (CAPEX to OPEX), Reserved or Savings Plans for steady load, right-size instances.</li>
  <li><b>Agility:</b> new environments in minutes, faster releases, easy to test ideas.</li>
  <li>Migrate in phases (rehost first, re-platform the database to RDS), use a hybrid cloud during transition, and secure with IAM, encryption and monitoring.</li></ul>
  <p><b>(iii) Diagram (draw this):</b> Users → Route 53 / CloudFront → Application Load Balancer → Auto Scaling group of EC2 in two AZs (private subnets) → RDS Multi-AZ, with S3 for files and CloudWatch for monitoring.</p>`,
 '14 marks in the paper: challenges 4, strategy 5, diagram 5','N23'],
[1,'final','Ticket website: benefits of the cloud and high availability (Nov 2022 Q1)',
 'Ticketonline sells concert tickets. It is slow in peak season and has downtime because the setup is not highly available. (a) Explain three benefits of moving to the cloud. (b) Explain three disadvantages of buying more powerful hardware. (c) Sketch how you would make it highly available (3-tier). (d) The IT manager says on-premises is better. Do you agree?',
 `<p><b>(a) Three benefits of the cloud</b></p>
  <ul><li><b>Elastic scaling</b> handles peak season and scales down afterwards.</li>
  <li><b>High availability</b> through multiple AZs and managed services.</li>
  <li><b>Pay as you go</b> instead of buying for the peak.</li></ul>
  <p><b>(b) Disadvantages of bigger hardware</b></p>
  <ul><li>Large upfront cost and unused capacity outside peak season.</li>
  <li>Still a single site, so downtime remains a risk.</li>
  <li>Takes time to buy and install, and it will still hit a ceiling if traffic grows.</li></ul>
  <p><b>(c) High availability design</b></p>
  <ul><li>Web tier: ALB plus Auto Scaling group in at least two AZs.</li>
  <li>App tier: Auto Scaling group in private subnets in two AZs.</li>
  <li>Database: RDS Multi-AZ with read replicas, backups and snapshots.</li>
  <li>Use a queue (SQS) so ticket generation and receipts run asynchronously, as in the scenario.</li></ul>
  <p><b>(d) Do you agree?</b> No. The workload is spiky, so the cloud's elasticity and availability fit it better. Admit one fair point (data control, latency) and answer with a hybrid or secure design.</p>`,
 'Four parts of 5 marks each','N22'],
[2,'final','Explain the shared responsibility model (Nov 2023 Q2 b, d)',
 'Explain the shared responsibility model. List two responsibilities of the provider and two of the customer. Do you agree that it makes the cloud more secure?',
 `<ul><li><b>Model:</b> security is divided. The provider handles <b>security of the cloud</b>; the customer handles <b>security in the cloud</b>.</li>
  <li><b>Provider (two):</b> physical data center security, hardware and network, and the virtualization layer.</li>
  <li><b>Customer (two):</b> managing data and encryption, IAM users and permissions, firewall (security group) rules, and OS patching on IaaS.</li>
  <li><b>Do I agree? Yes.</b> Each side knows what it must secure, so there are fewer gaps. The provider's scale gives stronger physical security and compliance. But it works only if customers do their part, because most breaches come from misconfiguration.</li></ul>`,
 '4 marks + 4 marks','N23'],
[5,'practice','Design a highly available web application',
 'A company runs a web application that must survive the failure of one data center. Describe the design and give targets for RTO and RPO.',
 `<ul><li><b>Compute:</b> web and app servers in an Auto Scaling group across at least <b>two AZs</b> behind an Application Load Balancer with health checks.</li>
  <li><b>Data:</b> RDS <b>Multi-AZ</b> for automatic failover, read replicas for read load, backups and snapshots copied to another Region.</li>
  <li><b>No single point of failure:</b> two NAT gateways (one per AZ), redundant links.</li>
  <li><b>Failover:</b> the heartbeat or health check detects failure and traffic moves to the healthy AZ.</li>
  <li><b>Targets (example):</b> RTO of 15 minutes (time to resume service) and RPO of 5 minutes (maximum data loss), which Multi-AZ replication and frequent backups can meet. A tighter RTO or RPO costs more.</li>
  <li><b>Test</b> the plan regularly (DR drills).</li></ul>`,
 'Design, failover and RTO / RPO','' ],
[7,'final','Data warehouse vs data lake, OLTP vs OLAP (Jun 2022 Q3)',
 'Compare data warehouse and data lake. Compare OLTP and OLAP. Explain database caching and give two examples.',
 `<table><tr><th></th><th>Data warehouse</th><th>Data lake</th></tr>
  <tr><td>Data</td><td>Processed, structured</td><td>Raw, any format</td></tr>
  <tr><td>Purpose</td><td>Known: reports and BI</td><td>Not decided yet: exploration and ML</td></tr>
  <tr><td>Users</td><td>Business professionals</td><td>Data scientists</td></tr>
  <tr><td>Load</td><td>ETL</td><td>ELT</td></tr></table>
  <table><tr><th></th><th>OLTP</th><th>OLAP</th></tr>
  <tr><td>Data</td><td>Operational, current</td><td>Historical</td></tr>
  <tr><td>Queries</td><td>Small, simple, milliseconds</td><td>Large, complex, seconds to hours</td></tr>
  <tr><td>Design</td><td>Normalized</td><td>Denormalized</td></tr></table>
  <p><b>Caching</b> keeps frequently requested data in memory so reads are fast and the database has less load. Examples: <b>Redis</b> (persistent, many data structures) and <b>Memcached</b> (simple, not persistent).</p>`,
 'Three comparisons of 5 marks','J22'],
[8,'final','Migration strategies and challenges (Nov 2023 Q4 a to c)',
 'Explain why organizations migrate to the cloud. Discuss the challenges. Compare lift-and-shift, re-platforming and re-architecting with a scenario for each.',
 `<ul><li><b>Why migrate:</b> cost savings (CAPEX to OPEX), scalability, agility and faster time to market, global reach, resilience and DR, end of data center lease or hardware life, focus on core business.</li>
  <li><b>Challenges:</b> cost of migration (plan, go step by step, use hybrid), resistance to adapt (leadership buy-in, intuitive tools, vendor help), shortage of skills (training, learning culture).</li></ul>
  <table><tr><th></th><th>Rehost (lift and shift)</th><th>Re-platform</th><th>Re-architect</th></tr>
  <tr><td>Change</td><td>None, as is</td><td>Small: lift, tinker and shift</td><td>Redesign with cloud-native features</td></tr>
  <tr><td>Effort and cost</td><td>Lowest</td><td>Medium</td><td>Highest</td></tr>
  <tr><td>Scenario</td><td>Aging VMs before a lease ends, to move quickly</td><td>Self-managed MySQL to RDS</td><td>Monolith that cannot scale, rebuilt as microservices</td></tr>
  <tr><td>Consideration</td><td>Few cloud benefits until optimized</td><td>Needs testing of the new platform</td><td>Skills, time and risk</td></tr></table>`,
 '3 + 4 + 6 marks','N23'],
[9,'final','Microservices vs monolith for a startup (Nov 2022 Q3 d)',
 'A startup must release an e-commerce application quickly. Should it use microservices now, or start monolithic and refactor later? Evaluate and justify.',
 `<ul><li><b>Position:</b> start with a <b>well-structured monolith</b> and refactor to microservices later.</li>
  <li><b>Why:</b> speed is the priority. A monolith is simpler to develop, test and deploy, needs a small team, and avoids the distributed-system cost (network calls, many deployments, harder debugging).</li>
  <li>The product is not yet understood. Service boundaries chosen too early are often wrong.</li>
  <li><b>Plan for later:</b> keep modules separate in the code, expose clean interfaces, and split out the busy parts (payments, search) when scale or team size needs it.</li>
  <li><b>When microservices first:</b> a large team, parts that must scale very differently, or a clear domain split.</li></ul>`,
 '7 marks: position, two reasons, trade-off','N22'],
[9,'final','Microservices vs serverless (Nov 2023 Q3 b to e)',
 'Describe the microservices and serverless models. Compare them with benefits, drawbacks and use cases. Explain FaaS and its key features.',
 `<table><tr><th></th><th>Microservices</th><th>Serverless (FaaS)</th></tr>
  <tr><td>Unit</td><td>Small service, usually in a container</td><td>Single function</td></tr>
  <tr><td>Servers</td><td>You manage containers and orchestrator</td><td>Provider manages everything</td></tr>
  <tr><td>Scaling</td><td>Orchestrator rules</td><td>Automatic, down to zero</td></tr>
  <tr><td>Cost</td><td>Pay for running instances</td><td>Pay per execution</td></tr>
  <tr><td>Benefits</td><td>Independent scaling and deployment, technology freedom</td><td>No server work, low cost for spiky load</td></tr>
  <tr><td>Drawbacks</td><td>Complex to run and debug</td><td>Cold start, run time limits, lock-in</td></tr>
  <tr><td>Use case</td><td>Large e-commerce platform</td><td>Image resize on upload, notifications</td></tr></table>
  <p><b>FaaS:</b> you upload a function that runs in response to an event (HTTP request, file upload, timer). Key features: event-driven, automatic scaling, stateless, pay per execution, no server management. Examples: AWS Lambda, Azure Functions.</p>`,
 '3 + 4 + 6 + 3 marks','N23'],
[9,'final','Cloud-native with microservices, containers and DevOps (Nov 2023 Q3 f)',
 'Justify how microservices, containers and DevOps practices help build and maintain cloud-native architectures. Give example tools.',
 `<ul><li><b>Microservices:</b> small independent services that are updated and scaled separately, so teams release often and failures stay contained.</li>
  <li><b>Containers:</b> package each service with its dependencies, so it runs the same everywhere, starts in seconds and is easy to scale. Orchestration (Kubernetes) automates deployment, scaling and self-healing.</li>
  <li><b>DevOps:</b> developers and operations share responsibility. <b>CI/CD</b> pipelines build, test and release automatically, and monitoring feeds problems back quickly.</li>
  <li><b>Tools:</b> Docker, Kubernetes, Jenkins, GitHub Actions or GitLab CI, AWS CodePipeline, Terraform, Prometheus or CloudWatch.</li></ul>`,
 '6 marks','N23'],
[10,'practice','Why use infrastructure as code?',
 'Explain the risks of building cloud infrastructure manually and how infrastructure as code removes them. Name one tool and describe its workflow.',
 `<ul><li><b>Manual risks:</b> not repeatable at scale (for example another Region), no version control or rollback, no audit trail, and inconsistent configuration between servers.</li>
  <li><b>IaC fixes:</b> the environment is described in a template that lives in Git. The same template builds identical stacks, changes are reviewed and tracked, rollback is a previous version, and clean-up means deleting the stack.</li>
  <li><b>Declarative IaC</b> states the end state and the tool works out the steps.</li>
  <li><b>Terraform workflow:</b> <b>Write</b> the configuration, <b>Plan</b> to preview what will be created, changed or destroyed, then <b>Apply</b> to build it in dependency order. (CloudFormation uses a JSON or YAML template to create a stack.)</li></ul>`,
 'Risks, benefits, tool and workflow',''],
[11,'practice','Why containers instead of VMs?',
 'Explain why a company would run its application in containers instead of virtual machines. Give the Docker commands to pull an image, run it as a container, view its logs and remove it.',
 `<ul><li><b>Why containers:</b> they bundle the app with its dependencies so it runs the same on a laptop, in testing and in production. They share the host kernel, so they are small and start in seconds, and many fit on one server. They suit microservices and CI/CD.</li>
  <li><b>VMs</b> each carry a full guest OS, are heavier and slower to start, but isolate more strongly.</li></ul>
  <pre>docker pull nginx
docker run -d --name web nginx
docker logs web
docker stop web
docker rm web</pre>
  <p><b>Explain:</b> run = pull + create + start; stop sends SIGTERM; rm deletes the container; the image is removed with <code>docker rmi nginx</code>.</p>`,
 'Reasons plus working commands',''],
[12,'practice','Why do containers need orchestration?',
 'Explain container orchestration. Describe how it works and list four advantages.',
 `<ul><li><b>Definition:</b> automating deployment, management, scaling and networking of containers through their lifecycle.</li>
  <li><b>Why:</b> a few containers can be run by hand, but hundreds across many machines cannot. A DevOps or CI/CD pipeline relies on it.</li>
  <li><b>How it works:</b> a <b>cluster</b> of nodes. <b>Worker nodes</b> run the containers, <b>control plane nodes</b> orchestrate. The cycle is provisioning, deployment, lifecycle management.</li>
  <li><b>Advantages:</b> automation and speed, reliability through health checks and self-healing, efficient resource use and lower cost, portability across clouds (no lock-in), and a good fit for DevOps and microservices.</li>
  <li><b>Tools:</b> Kubernetes (EKS, AKS, GKE), Docker Swarm, OpenShift.</li></ul>`,
 'Definition, how, four advantages','']
);
