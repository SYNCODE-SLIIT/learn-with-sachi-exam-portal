/* Cloud Computing (IT4090) - lecture notes L5-L7. Built from the lecture slides in the Lectures folder. */
window.PORTAL = window.PORTAL || { modules: {} };
window.PORTAL.ccLectures = window.PORTAL.ccLectures || [];
window.PORTAL.ccLectures.push(
{
  n: 5, title: 'Cloud High Availability and Disaster Recovery', sub: 'Availability · Load balancing · Auto Scaling · BCP / DR · RTO / RPO', src: 'slides',
  topics: [
    { id: 'l5-avail', t: 'Downtime and availability (the nines)', hy: 0,
      notes: [
        '<b>Planned downtime</b> = scheduled maintenance / patching. <b>Unplanned downtime</b> = hardware / software / network failure, security breach, disaster.',
        '<b>Availability % = uptime ÷ total time.</b> Memorise the key rows:'
      ],
      table: { h: ['Availability', 'Downtime / year', 'Downtime / month'], r: [
        ['99% (two nines)', '3.65 days', '7.31 hours'],
        ['99.9% (three nines)', '8.77 hours', '43.83 minutes'],
        ['99.99% (four nines)', '52.60 minutes', '4.38 minutes'],
        ['99.999% (five nines)', '5.26 minutes', '26.30 seconds']
      ] },
      tip: 'Each extra nine cuts downtime ~10× but costs far more. Cloud HA relies on redundancy across AZs.' },
    { id: 'l5-ha', t: 'High availability concepts', hy: 0,
      notes: [
        '<b>HA</b> = a system designed to meet an agreed level of uptime. Three principles: <b>eliminate single points of failure (SPOF)</b>, <b>reliable crossover</b> (switch without losing data), <b>reliable detection</b> of failures.',
        '<b>Redundancy:</b> duplicate critical components. <b>Passive</b> – spare capacity absorbs a decline. <b>Active</b> – complex systems detect failure and reconfigure automatically (voting).',
        '<b>Failover</b> = switch to a standby on failure (uses a <b>heartbeat</b> signal). <b>Failback</b> = restore the original system after repair.',
        '<b>Replication:</b> <b>active</b> (every replica processes each request) vs <b>passive</b> (one replica processes, results copied to the others).',
        '<b>HA clusters:</b> <b>Active/Active</b> (all nodes serve traffic) vs <b>Active/Passive</b> (standby takes over on failure). Also redundant storage (mirroring), power and network.'
      ] },
    { id: 'l5-lb', t: 'Load balancing', hy: 1, asked: 'Mid MCQ · ELB',
      notes: [
        'Distributes traffic across a group of backend servers. <b>Algorithms:</b> Round Robin · Least connections · Least time · IP Hash.',
        '<b>Session persistence (sticky sessions):</b> all requests from a client in a session go to the same backend.',
        '<b>AWS Elastic Load Balancing types:</b> <b>Application LB</b> (layer 7, HTTP / HTTPS, path / host routing) · <b>Network LB</b> (layer 4, TCP / UDP, very high performance) · Gateway LB (third-party appliances) · Classic LB (legacy). Load balancers can be <b>internet-facing</b> or <b>internal</b>, and support HTTPS / SSL.',
        '<b>Health checks</b> – ELB sends traffic only to healthy targets. <b>Connection draining (deregistration delay)</b> – when an instance is deregistered or unhealthy, in-flight requests are allowed to complete.',
        'ALB is the improvement over a classic ELB for modern apps; pair it with Auto Scaling for growth.'
      ] },
    { id: 'l5-asg', t: 'Auto Scaling', hy: 1, asked: 'Mid MCQ ×18',
      notes: [
        '<b>Auto Scaling group (ASG)</b> keeps the right number of EC2 instances. Settings: <b>minimum</b>, <b>maximum</b>, <b>desired capacity</b>.',
        'When created, the ASG launches the <b>desired</b> (or minimum if desired not set) number of instances. Min 3 / max 5 → launches <b>3</b>.',
        '<b>Required to create an ASG:</b> minimum size and a <b>launch configuration / launch template</b>. Health checks and desired capacity are optional.',
        '<b>Launch configuration minimum elements:</b> name, <b>AMI</b>, <b>instance type</b> (key pair, security group, block devices are optional). It is a separate object so you can change AMI / instance type / security groups <b>without changing the ASG</b>. To change the instance type, create a <b>new launch configuration</b> and point the ASG at it.',
        '<b>Scaling types:</b> <b>Manual</b> (change desired capacity) · <b>Scheduled</b> (known events such as a promotional campaign) · <b>Dynamic</b> (CloudWatch alarm driven: target tracking, step, simple).',
        '<b>Triggers:</b> CloudWatch metrics / alarms (CPU, network, request count, latency). Wrong metric or threshold = no scaling.',
        '<b>Behaviours:</b> launches new instances in the <b>AZ with the fewest instances</b> (balances AZs) · replaces unhealthy instances · only On-Demand and Spot instances (not stopped or on-prem instances) · <b>cooldown</b> prevents flapping (scaling up and down repeatedly).',
        '<b>Bootstrapping software:</b> use a <b>golden AMI</b> and / or <b>user data</b> scripts.',
        '<b>Failure modes:</b> if launches fail continuously for 24 hours the ASG is <b>administratively suspended</b>. <code>SetInstanceHealth</code> can mark a healthy instance healthy to stop replacement.',
        '<b>Scalability add-on:</b> EC2 behind an ELB with Multi-AZ RDS → add an <b>Auto Scaling group</b>. For fault tolerance → add instances in <b>another AZ</b>.'
      ],
      tip: 'This topic produced the most mid-term MCQs. Know: min / max / desired, launch configuration, scheduled vs dynamic, cooldown, AZ balancing.' },
    { id: 'l5-bcp', t: 'Business continuity and disaster recovery', hy: 1, asked: 'Essay candidate',
      notes: [
        '<b>Business continuity (BC)</b> = ability to keep delivering products / services at acceptable levels after a disruption. <b>BCP</b> = creating prevention and recovery systems. Analysis: business impact analysis, threat analysis, impact scenarios.',
        '<b>Disaster recovery (DR)</b> is the part of BCP covering policies, tools and procedures to recover critical technology after a natural or human-induced disaster.',
        '<b>Elements of a DR plan:</b> DR team · risk evaluation · business-critical asset identification · backup strategy · testing and optimization.',
        '<b>Backup</b> = a copy of data stored elsewhere to restore after loss. <b>Methods:</b> Full · Incremental (changes since last backup of any type) · Differential (changes since last full) · Near-continuous data protection.',
        '<b>DR tiers 0–7:</b> Tier 0 no off-site data → Tier 1 data backup, no hot site → … → Tier 4 backup with hot site → Tier 5 electronic vaulting → Tier 6 point-in-time copies → <b>Tier 7 transaction integrity</b> (zero or little data loss, highly automated).'
      ] },
    { id: 'l5-rto', t: 'RTO, RPO and RCO', hy: 1, asked: 'Essay candidate',
      notes: [],
      table: { h: ['Term', 'Question it answers', 'Meaning'], r: [
        ['<b>RTO</b> – Recovery Time Objective', 'How long can we be down?', 'Targeted period in which a business process must be <b>restored</b> after a disaster'],
        ['<b>RPO</b> – Recovery Point Objective', 'How much data can we lose?', 'Targeted period of <b>data loss acceptable</b> (age of the last good backup)'],
        ['<b>RCO</b> – Recovery Consistency Objective', 'How inconsistent can recovered data be?', 'Amount of data inconsistency tolerated in the recovered data set']
      ] },
      tip: 'Smaller RTO / RPO = more expensive solution. Backup &amp; restore (hours) → pilot light → warm standby → multi-site active/active (near zero).' },
    { id: 'l5-aws', t: 'HA / DR on AWS: Multi-AZ, read replicas, DR strategies', hy: 0, asked: 'Mid MCQ · RDS',
      notes: [
        '<b>RDS Multi-AZ</b> = synchronous standby in another AZ for <b>failover / HA</b>. <b>Read replicas</b> = asynchronous copies for <b>read scaling</b>; a <b>cross-region read replica</b> gives geographic distribution.',
        '<b>Snapshots</b> (EBS / RDS) are point-in-time backups kept in S3; copy them across regions for DR. RDS and Redshift offer <b>automatic backups with rotation</b>.',
        '<b>DR strategies (cheapest → fastest):</b> Backup &amp; restore · Pilot light (core running, scale on disaster) · Warm standby (scaled-down full copy) · Multi-site active/active.',
        'Cloud properties supporting HA: <b>availability, scalability, reliability</b>.'
      ] }
  ]
},
{
  n: 6, title: 'Cloud Security and Monitoring', sub: 'IAM · MFA · Encryption · Risks · CloudWatch · CloudTrail', src: 'slides',
  topics: [
    { id: 'l6-sds', t: 'Software-defined security and least privilege', hy: 0,
      notes: [
        '<b>Software-defined security:</b> security controls (intrusion detection, network segmentation, access control) are software-managed, policy-driven, automated and monitored.',
        '<b>Principle of Least Privilege (PLOP):</b> a user or process gets only the privileges essential to do its job. <b>IAM</b> is how it is enforced.'
      ] },
    { id: 'l6-iam', t: 'IAM components', hy: 1, asked: 'Mid MCQ · IAM / access keys',
      notes: [
        '<b>IAM</b> (Identity and Access Management) = framework of policies and technologies to <b>identify, authenticate and authorize</b> users / processes.'
      ],
      table: { h: ['Component', 'Facts'], r: [
        ['<b>Logical organization</b> (account)', 'Logical boundary / operating domain for users and processes'],
        ['<b>Users</b>', 'People / apps / services with <b>own credentials</b>; <b>no permissions by default</b>; can belong to several groups. The username cannot be changed in the console.'],
        ['<b>Groups</b>', 'Collection of users; <b>no credentials</b> of their own; permissions attach to the group'],
        ['<b>Policies</b>', 'Documents (JSON) that list permissions; decide allow / deny'],
        ['<b>Roles</b>', 'Collection of policies, <b>assumed</b> by users or services to get <b>temporary credentials</b>; basis of RBAC (e.g. EC2 role to reach S3)']
      ] },
      tip: 'Protect <b>access keys</b>: never hard-code or commit them, use IAM roles, least-privilege policies, rotate keys, enable MFA.' },
    { id: 'l6-mfa', t: 'MFA, federation and SSO', hy: 0,
      notes: [
        '<b>MFA:</b> access only after presenting <b>two or more factors</b>: something you <b>have</b> (token, smart card) · <b>know</b> (password, PIN) · <b>are</b> (biometrics) · <b>somewhere you are</b> (GPS location).',
        '<b>Federated identity:</b> one identity linked across multiple identity systems. <b>SSO:</b> log in once, move between systems. Types: <b>Enterprise identity federation</b> (e.g. corporate AD / SAML) and <b>Web identity federation</b> (Google, Facebook login).'
      ] },
    { id: 'l6-enc', t: 'Encryption and key management', hy: 1, asked: 'Mid MCQ · S3 / RDS / KMS',
      notes: [
        '<b>Symmetric</b> encryption = one shared key (fast, e.g. AES). <b>Asymmetric</b> = public / private key pair (e.g. RSA). <b>Hashing</b> is one-way (integrity, not reversible).',
        '<b>Data states:</b> <b>at rest</b> (disk / S3), <b>in transit</b> (TLS / SSL), <b>in use</b> (memory).',
        '<b>Client-side</b> encryption: you encrypt before upload. <b>Server-side</b>: provider encrypts on write.',
        '<b>S3 at rest options:</b> SSE-S3 (service managed keys) · <b>SSE-KMS</b> (customer master keys in AWS KMS) · <b>SSE-C</b> (customer-provided keys) · client-side encryption with your own key. SSL only protects data <b>in transit</b>; a bucket policy controls access, not encryption.',
        '<b>AWS KMS:</b> managed keys service. <b>Customer Master Keys (CMKs)</b> never leave AWS unencrypted; <b>data keys</b> are used for envelope encryption.',
        '<b>RDS encryption</b> must be enabled <b>at creation</b>; you cannot encrypt a running instance (create an encrypted copy of a snapshot instead).'
      ] },
    { id: 'l6-risk', t: 'Cloud security risks and threats', hy: 0,
      notes: [
        'Poor access management · Data breach / leak / loss · Misconfiguration · Insecure APIs · Account hijacking · Lack of visibility · DoS / DDoS attacks (and other attacks).',
        'Mitigations: least privilege, MFA, encryption, logging and monitoring, patching, WAF / shield, secure config baselines.'
      ] },
    { id: 'l6-monitor', t: 'Monitoring: metrics, events, logs, alerts (CloudWatch · CloudTrail)', hy: 1, asked: 'Mid MCQ ×12',
      notes: [
        'Monitoring = reviewing, observing and managing operational workflow of cloud infrastructure. Tools: <b>Amazon CloudWatch</b>, Azure Monitor, Datadog, AppDynamics.',
        '<b>Metrics</b> – raw usage data (CPU, memory, disk) collected by an agent. <b>Events</b> – generated when something happens (what / where / when). <b>Logs</b> – what systems have been doing, key for troubleshooting.',
        '<b>Alerts</b> – reactive part: <b>threshold</b>, <b>anomaly detection</b> or <b>heartbeat</b> alerts. Outputs: <b>notifications</b> or <b>automated actions</b>.'
      ],
      table: { h: ['Service', 'Use it for'], r: [
        ['<b>CloudWatch metrics + alarms</b>', 'Performance monitoring (CPU, ELB request count / latency, RDS IOPS, Redshift) and alarm actions: SNS notification, Auto Scaling policy, stop / terminate instance'],
        ['<b>CloudWatch Logs</b>', 'Store and analyse log files (EC2 system logs, Lambda logs)'],
        ['<b>CloudWatch Events</b>', 'React to state changes (e.g. EC2 pending → running)'],
        ['<b>CloudTrail</b>', 'Record <b>API calls / user activity</b> across the account (audit, security investigations)'],
        ['<b>VPC Flow Logs</b>', 'IP traffic going to and from network interfaces'],
        ['<b>SNS</b>', 'Send notifications (email, SMS, HTTP / S, Lambda, SQS). Not FTP, not CloudFront.']
      ] },
      tip: 'Default EC2 monitoring: CPU, disk, status (<b>not memory</b>); 5-minute intervals, 1-minute with detailed monitoring. Custom metrics: minimum granularity <b>1 minute</b>, uploaded via CLI / API (put-metric-data).' }
  ]
},
{
  n: 7, title: 'Cloud Database and Analytics Services', sub: 'SQL vs NoSQL · OLTP / OLAP · CAP · Caching · Warehouse vs Lake', src: 'slides',
  topics: [
    { id: 'l7-models', t: 'Relational (SQL) vs non-relational (NoSQL)', hy: 0, asked: 'Mid MCQ · RDS / DynamoDB',
      notes: [],
      table: { h: ['', 'Relational / SQL', 'Non-relational / NoSQL'], r: [
        ['Structure', 'Highly structured tables, rigid schema, relations between tables', 'Flexible / schema-less, rapidly changing designs'],
        ['Guarantees', '<b>ACID</b>: Atomicity, Consistency, Isolation, Durability', 'Often BASE / eventual consistency, horizontal scale'],
        ['Query', 'SQL', 'Varies by model'],
        ['Examples', 'MySQL, PostgreSQL, Oracle, MS SQL, <b>Amazon RDS / Aurora</b>', 'MongoDB, Cassandra, Redis, CosmosDB, <b>DynamoDB</b>']
      ] } },
    { id: 'l7-nosql', t: 'NoSQL types and AWS services', hy: 1, asked: 'Mid short answers',
      notes: [],
      table: { h: ['Type', 'How data is stored', 'Use case', 'AWS service'], r: [
        ['<b>Key-value</b>', 'Indexed keys and values', 'Session data, shopping cart, voting / high-scale lookups', '<b>DynamoDB</b>, ElastiCache'],
        ['<b>Document</b>', 'JSON / XML documents, schema-less', 'CMS, blogging, e-commerce catalog', 'DocumentDB (MongoDB compatible), DynamoDB'],
        ['<b>Column family</b>', 'Optimized to read columns of data', 'Analytics, big data', 'Keyspaces (Cassandra), Redshift (columnar warehouse)'],
        ['<b>Graph</b>', 'Nodes and relationships', 'Social networks, recommendations, fraud', '<b>Amazon Neptune</b>']
      ] },
      tip: 'Millions of mobile votes into a durable, scalable, highly available store → <b>DynamoDB</b>. Managed non-relational DB → DynamoDB. Graph DB → Neptune.' },
    { id: 'l7-oltp', t: 'Database workloads: OLTP vs OLAP', hy: 0,
      notes: [],
      table: { h: ['', 'OLTP', 'OLAP'], r: [
        ['Focus', 'Operational data, transaction processing', 'Historical data, analysis and reporting'],
        ['Queries', 'Small, simple, ad-hoc', 'Large, complex'],
        ['Response', 'Milliseconds', 'Seconds to hours'],
        ['Design', 'Highly normalized', 'Typically denormalized, data warehouses'],
        ['AWS', 'RDS, Aurora, DynamoDB', 'Redshift, EMR / Hadoop']
      ] } },
    { id: 'l7-dbaas', t: 'Database as a Service: RDS essentials', hy: 1, asked: 'Mid MCQ ×6',
      notes: [
        '<b>DBaaS:</b> provider handles provisioning, patching, backups, HA. <b>Amazon RDS</b> engines: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Aurora.',
        'A <b>DB instance</b> is an isolated database environment in the cloud and the basic building block of RDS; you choose its AZ at creation.',
        'Access control: a <b>DB security group</b> controls which IPs / EC2 instances can reach the DB instance.',
        '<b>Multi-AZ</b> (HA / failover, synchronous) vs <b>read replicas</b> (read scalability, async, cross-region possible). To keep data in two geographic locations: Multi-AZ and cross-region read replica.',
        '<b>Encryption must be set at creation.</b> Storage cannot be increased on a SQL Server instance. RDS and Redshift provide automated backups with rotation.',
        '<b>Other managed services:</b> Redshift (data warehouse), ElastiCache (in-memory cache), DynamoDB (NoSQL), Neptune (graph), Kinesis (streaming).'
      ] },
    { id: 'l7-cap', t: 'CAP theorem', hy: 1, asked: 'Essay candidate',
      notes: [
        'A distributed data store can guarantee at most <b>two of three</b>: <b>Consistency</b> (every read gets the latest write or an error) · <b>Availability</b> (every request gets a non-error response) · <b>Partition tolerance</b> (keeps working despite dropped / delayed messages between nodes).',
        'Partitions happen in real networks, so during a partition you choose: <b>cancel the operation</b> (keeps consistency, lowers availability) or <b>proceed</b> (keeps availability, risks inconsistency).',
        '<b>CP</b> example: strongly consistent stores (e.g. MongoDB default, HBase). <b>AP</b> example: Cassandra, DynamoDB (eventual consistency by default).'
      ] },
    { id: 'l7-cache', t: 'Caching: Redis vs Memcached (ElastiCache)', hy: 0, asked: 'Mid short answer · ElastiCache',
      notes: [
        'Caching stores frequently requested data in memory to speed access and cut database load. <b>Amazon ElastiCache</b> = managed in-memory key-value store (Redis or Memcached).'
      ],
      table: { h: ['', 'Redis', 'Memcached'], r: [
        ['Data types', 'Strings, lists, sets, hashes (rich structures)', 'Simple strings / objects'],
        ['Persistence', '<b>Persistent</b> – survives reboots', '<b>Not persistent</b>'],
        ['HA', 'Read replicas, backup / restore, failover', 'None built-in'],
        ['Scaling', 'Replication, clustering', 'Multi-threaded, scale out'],
        ['Speed', 'Sub-millisecond', 'Sub-millisecond']
      ] } },
    { id: 'l7-dw', t: 'Data warehouse vs data lake, ETL vs ELT', hy: 1, asked: 'Essay candidate',
      notes: [],
      table: { h: ['', 'Data warehouse', 'Data lake'], r: [
        ['Data', '<b>Processed</b>, structured, filtered', '<b>Raw</b>, native format, any structure'],
        ['Purpose', 'Defined (reporting / BI)', 'Not yet determined'],
        ['Users', 'Business professionals', 'Data scientists / engineers'],
        ['Storage', 'Hierarchical (tables)', 'Flat architecture (objects)'],
        ['AWS', '<b>Redshift</b>', 'S3 + Glue / Athena / Lake Formation']
      ] },
      after: [
        '<b>ETL</b> = Extract → Transform (in staging) → Load. <b>ELT</b> = Extract → Load → Transform inside the destination.'
      ] },
    { id: 'l7-rt', t: 'Real-time processing and business intelligence', hy: 0, asked: 'Mid MCQ · Kinesis',
      notes: [
        '<b>Real-time (stream) processing</b> processes data as it arrives from a continuous input stream and produces continuous output. AWS: <b>Kinesis</b>.',
        '<b>BI</b> turns data into dashboards and reports for decisions. AWS: <b>QuickSight</b>. Typical pipeline: sources → Kinesis → S3 data lake / Redshift warehouse → BI.',
        'E-commerce collection + analysis example: <b>DynamoDB</b> (operational store) and <b>Redshift</b> (analytics).'
      ] }
  ]
}
);
