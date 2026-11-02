/* Cloud Computing (IT4090) - lecture notes L1-L4. Built from the lecture slides in the Lectures folder. */
window.PORTAL = window.PORTAL || { modules: {} };
window.PORTAL.ccLectures = window.PORTAL.ccLectures || [];
window.PORTAL.ccLectures.push(
{
  n: 1, title: 'Introduction to Cloud Computing', sub: 'NIST definition · Service models · Deployment models · Providers', src: 'slides',
  topics: [
    { id: 'l1-evolution', t: 'Evolution of IT infrastructure', hy: 0,
      notes: [
        '<b>Stages:</b> Mainframe / mini computers → Personal computer → Client / server → Web-based enterprise applications → <b>Cloud / mobile computing</b>.',
        '<b>Electricity analogy:</b> factories first generated their own power (costly, needed skilled engineers, not the core business). Then utilities appeared: connect to the grid, pay for what you consume. Cloud does the same for IT.',
        '<b>Traditional IT problems:</b> 6–12 months to go live (vendor selection, PO, hardware, software, UAT), fixed capacity → <b>under-supply</b> at peak and <b>waste</b> off-peak, barrier to innovation.',
        '<b>Cloud way:</b> provision in minutes · pay-as-you-go · add/remove capacity on demand · destroy and stop paying.'
      ],
      tip: 'Likely essay opener: compare traditional IT with cloud using under-supply / over-supply and CAPEX vs OPEX.' },
    { id: 'l1-nist', t: 'NIST definition and 5 essential characteristics', hy: 1, asked: 'Tutorial 1 · definitions',
      notes: [
        '<b>NIST:</b> a model for enabling ubiquitous, convenient, <b>on-demand network access to a shared pool of configurable computing resources</b> that can be rapidly provisioned and released with minimal management effort or provider interaction.',
        'Cloud is <b>not a technology</b>. It is a <b>business model / delivery model</b>. The underlying technology is <b>virtualization</b>.'
      ],
      table: { h: ['Characteristic', 'Meaning (one line)'], r: [
        ['On-demand self-service', 'Consumer provisions servers, network, storage whenever needed with <b>no provider interaction</b>.'],
        ['Broad network access', 'Available over the network through standard mechanisms for heterogeneous clients (phone, laptop).'],
        ['Resource pooling', 'Provider resources are pooled (<b>multi-tenant</b>) and dynamically assigned; customer only picks a high-level location (region / country).'],
        ['Rapid elasticity', 'Provision and release capacity quickly, often <b>automatically</b> with demand.'],
        ['Measured service', 'Usage is metered, monitored and reported → <b>pay-per-use</b>.']
      ] },
      tip: 'Remember the 5 with: <b>O B R R M</b>. Define <b>elasticity</b> and <b>on-demand self-service</b> in your own words (Tutorial 1 Q1).' },
    { id: 'l1-models', t: 'Service models: IaaS · PaaS · SaaS', hy: 1, asked: 'Tutorial 1 · scenarios',
      notes: [
        'Each step up means the provider manages more and the consumer controls less.'
      ],
      table: { h: ['Model', 'Provider manages', 'Consumer manages', 'Examples'], r: [
        ['<b>IaaS</b>', 'Physical infrastructure + virtualization layer', 'OS, middleware, runtime, apps, data (consumer provisions servers, storage, networks)', 'Amazon EC2, Azure VMs, S3, EBS, VPC'],
        ['<b>PaaS</b>', 'Infrastructure + platform (OS, runtime)', 'Own applications and hosting configuration (must use supported languages / libraries)', 'Elastic Beanstalk, Azure App Service, RDS, Google App Engine'],
        ['<b>SaaS</b>', 'Everything (infrastructure and application)', 'Only limited user-specific configuration', 'Gmail, Office 365, Salesforce CRM, Zoom']
      ] },
      tip: 'Scenario question (Tutorial 1 Q7, gamer with a basement server): recommend <b>IaaS / EC2 + CloudFront</b>. It removes cooling, hardware and security upkeep, and a CDN fixes the lag.' },
    { id: 'l1-deploy', t: 'Deployment models: public · private · hybrid · community', hy: 1, asked: 'Mid MCQ · hybrid',
      notes: [],
      table: { h: ['Model', 'Key points', 'Characteristics'], r: [
        ['<b>Public</b>', 'Open to the general public, operated by a provider, located at the provider’s premises', 'Cost-effective · virtually unlimited scalability · zero maintenance · multi-tenant · access over internet · lower level of data control'],
        ['<b>Private</b>', 'Exclusive to a single organization, can be on or off premises', 'High security · single tenant · compliance friendly · reliable · <b>expensive</b> · management overhead'],
        ['<b>Hybrid</b>', 'Private + public combined, portability between them', 'Secure and cost-effective · flexible · scalable · data transfer between clouds needed'],
        ['<b>Community</b>', 'Shared by a specific community with common concerns (security, regulation, compliance)', 'e.g. <b>government clouds</b>']
      ] },
      tip: 'Past paper: “private servers on premises and part of the workload on cloud” → <b>Hybrid cloud</b>.' },
    { id: 'l1-actors', t: 'NIST actors in cloud computing', hy: 0,
      notes: [
        '<b>Cloud consumer</b> – uses the service. <b>Cloud provider</b> – makes the service available.',
        '<b>Cloud auditor</b> – independent assessment of services, operations, performance and security.',
        '<b>Cloud broker</b> – manages use, performance and delivery, negotiates between providers and consumers.',
        '<b>Cloud carrier</b> – intermediary providing connectivity and transport (the network).'
      ] },
    { id: 'l1-csp', t: 'Cloud service providers and market share', hy: 0,
      notes: [
        '~300 CSPs worldwide. Top: <b>AWS, Microsoft Azure, Google Cloud (GCP)</b>, IBM Cloud, Alibaba Cloud, Oracle Cloud (OCI).',
        'Top three hold ~60% of the market: <b>AWS ≈ 33%</b>, <b>Azure ≈ 20%</b> (up from 11% in 2017), <b>GCP ≈ 7%</b>.'
      ] },
    { id: 'l1-benefits', t: 'Benefits of cloud computing (the six benefits)', hy: 0, asked: 'Tutorial 1 Q2',
      notes: [
        '1. <b>Trade capital expense (CAPEX) for variable expense (OPEX)</b> – pay only for what you use.',
        '2. <b>Massive economies of scale</b> – lower pay-as-you-go prices.',
        '3. <b>Stop guessing capacity</b> – scale up or down as needed.',
        '4. <b>Increase speed and agility</b> – resources in minutes, faster time-to-market.',
        '5. <b>Stop spending money running and maintaining data centers</b> – focus on the core business.',
        '6. <b>Go global in minutes</b> – deploy in multiple regions close to customers.',
        'Also: better customer experience (always available, multiple regions) and business agility.'
      ],
      tip: 'Write each benefit as: <b>name → one-line meaning → business example</b>.' }
  ]
},
{
  n: 2, title: 'Cloud Core Services and Global Infrastructure', sub: 'Region · AZ · Edge · Shared responsibility · Billing · Quotas', src: 'slides',
  topics: [
    { id: 'l2-global', t: 'Global infrastructure: Region · Availability Zone · Data center · Edge location', hy: 1, asked: 'Mid MCQ · AZ definition',
      notes: [],
      table: { h: ['Component', 'What it is', 'Consists of'], r: [
        ['<b>Region</b>', 'Geographic area (e.g. us-east-1, ap-south-1) where the provider runs infrastructure', 'Two or more Availability Zones (a region is isolated from other regions)'],
        ['<b>Availability Zone (AZ)</b>', 'A fully isolated partition of a region, engineered to be isolated from failures in other AZs', 'One or more discrete <b>data centers</b> with redundant power, networking and connectivity, linked to other AZs by high-speed private networking'],
        ['<b>Data center</b>', 'Physical facility where data lives and processing occurs', 'Servers, storage, networking, redundant power, in a separate facility'],
        ['<b>Edge location (AWS)</b>', 'Site used by the CDN (CloudFront) to cache content close to users and cut latency', 'Caching servers, many more than regions']
      ] },
      tip: 'Exam wording: AZ = “<b>distinct locations within a region engineered to be isolated from failures</b>”. CDN uses <b>Edge Locations</b>.' },
    { id: 'l2-region', t: 'Selecting a region (4 factors)', hy: 0, asked: 'Tutorial 2 Q2–Q3',
      notes: [
        '1. <b>Data governance and legal requirements</b> (data residency).',
        '2. <b>Proximity to customers</b> → lower <b>latency</b> (time for a request to travel and return).',
        '3. <b>Services available</b> in the region (new services do not launch everywhere at once).',
        '4. <b>Cost</b> – prices vary by region.'
      ],
      tip: 'Mnemonic: <b>L-L-S-C</b> – Legal, Latency, Services, Cost.' },
    { id: 'l2-core', t: 'Core cloud services', hy: 0,
      notes: [
        'Three pillars: <b>Compute · Network · Storage</b> (plus Database).',
        'AWS: EC2, VPC, S3 / EBS, RDS. Azure: Virtual Machines, Virtual Network, Blob / Disks, SQL Database.'
      ] },
    { id: 'l2-shared', t: 'Shared responsibility model', hy: 1, asked: 'Essay candidate',
      notes: [
        'A framework that splits security duties between the <b>cloud service provider (CSP)</b> and the <b>customer</b>.',
        '<b>CSP = security <u>OF</u> the cloud</b>: physical data centers, hardware, host OS / virtualization, global network, managed-service infrastructure.',
        '<b>Customer = security <u>IN</u> the cloud</b>: data, IAM users and permissions, guest OS patching, firewall / security group rules, encryption choices, application code.',
        'The more managed the service (IaaS → PaaS → SaaS), the more the provider takes on.'
      ],
      tip: 'Learn two examples for each side. AWS patches the hypervisor; <b>you</b> patch your EC2 guest OS and open the right ports.' },
    { id: 'l2-billing', t: 'Billing and cost management', hy: 0,
      notes: [
        '<b>Pay for what you use</b> – no large upfront cost.',
        '<b>Pay less when you reserve</b> – Reserved Instances / commitments.',
        '<b>Pay less when you use more</b> – volume-based discounts (tiered pricing).',
        'Tools: cost explorer, budgets, billing alarms, tags for cost allocation.'
      ] },
    { id: 'l2-quota', t: 'Resource scopes, limits and quotas', hy: 0,
      notes: [
        'Default quotas exist and are <b>region specific</b>.',
        '<b>Soft limit</b> – can be increased on request. <b>Hard limit</b> – cannot be increased.',
        'Why: limit excessive charges and stop overuse of resources by a single entity.'
      ] },
    { id: 'l2-access', t: 'Accessing resources', hy: 0,
      notes: [
        'Three ways: <b>web console</b> (GUI), <b>CLI</b> (command line), <b>SDK / API</b> (programmatic).',
        'Everything in the console is an API call underneath, which is why <b>CloudTrail</b> can log it.'
      ] }
  ]
},
{
  n: 3, title: 'Cloud Compute and Storage', sub: 'EC2 · Instance types · Purchasing · Block / File / Object · S3 tiers', src: 'slides',
  topics: [
    { id: 'l3-virt', t: 'Virtualization vs containerization', hy: 0,
      notes: [
        '<b>Virtualization:</b> a <b>hypervisor</b> runs multiple VMs, each with its own guest OS. Type 1 (bare metal, on hardware) and Type 2 (on a host OS).',
        '<b>Containerization:</b> containers share the host OS kernel through a container engine (Docker), so they are lighter and start faster.',
        '<b>Software-defined compute:</b> compute functions are virtualized and abstracted from hardware, pooled across processing units, using generic industry-standard hardware.'
      ] },
    { id: 'l3-types', t: 'EC2 instance types', hy: 0, asked: 'Tutorial 2 Q2–Q3',
      notes: [
        'Amazon EC2 = AWS virtual machines (IaaS), launched from an <b>AMI</b> (pre-configured template), billed per second. Azure VM billed per minute.'
      ],
      table: { h: ['Category', 'Designed for', 'Best fit example'], r: [
        ['General purpose', 'Balanced CPU / memory / network', 'Web servers, small databases'],
        ['Compute optimized', 'CPU-heavy workloads', 'Multiplayer gaming servers, batch, media encoding'],
        ['Memory optimized', 'Large in-memory datasets', 'In-memory databases, real-time big data analytics'],
        ['Storage optimized', 'High sequential read / write on local storage', 'Data warehouses, distributed file systems'],
        ['Accelerated computing', 'GPUs / FPGAs', 'Machine learning, speech recognition, graphics'],
        ['Burstable (T family)', 'Baseline CPU with credits to burst', 'Low-traffic sites, dev / test']
      ] } },
    { id: 'l3-purchase', t: 'Tenancy and purchasing options', hy: 1, asked: 'Mid short answer · Spot',
      notes: [
        '<b>Tenancy:</b> default / shared · <b>Dedicated Instances</b> (hardware for one customer) · <b>Dedicated Hosts</b> (whole physical server, for licensing / compliance).'
      ],
      table: { h: ['Option', 'Pay model', 'Use when'], r: [
        ['<b>On-Demand</b>', 'Per second / hour, no commitment', 'Short, unpredictable workloads, first deployments'],
        ['<b>Reserved Instances</b>', '1 or 3 year commitment, big discount', 'Steady, predictable usage'],
        ['<b>Spot Instances</b>', 'Spare capacity, up to ~90% cheaper, can be reclaimed', 'Fault-tolerant, flexible, <b>periodic batch / distributed processing</b>'],
        ['<b>Savings Plans</b>', 'Commit to $/hour usage for 1–3 years', 'Flexible commitment across instance families']
      ] },
      tip: '“Distributed application that periodically processes data and can be interrupted” → <b>Spot Instances</b>.' },
    { id: 'l3-lifecycle', t: 'Instance lifecycle and placement groups', hy: 0,
      notes: [
        '<b>Lifecycle:</b> pending → running → (stopping → stopped ↔ start) → shutting-down → <b>terminated</b>. Stopped instances stop compute charges but EBS storage is still billed. Terminated is permanent.',
        '<b>Placement groups</b> (Azure: proximity placement group):',
        '<b>Cluster</b> – instances packed close in one AZ for <b>low latency / high throughput</b>. <b>Partition</b> – instances spread across logical partitions (big distributed systems such as Hadoop / Cassandra). <b>Spread</b> – each instance on distinct hardware to <b>reduce correlated failure</b> (small critical set).'
      ] },
    { id: 'l3-storage', t: 'Block vs File vs Object storage', hy: 1, asked: 'Tutorial 3 Q1',
      notes: ['<b>Software-defined storage (SDS)</b> abstracts storage resources from the underlying hardware.'],
      table: { h: ['Type', 'How data is managed', 'Access / performance', 'AWS · Azure', 'Use cases'], r: [
        ['<b>Block</b>', 'Fixed-size blocks with block IDs, organized as a file system', 'Low latency, measured in <b>IOPS</b>, attached to one instance', 'EBS · Azure Disks', 'Databases, OS boot volumes, transactional data'],
        ['<b>File</b>', 'Hierarchy of files / folders, shared over a network', 'NFS and SMB protocols, many clients', 'EFS · Azure Files', 'Shared content, home directories, lift-and-shift apps'],
        ['<b>Object</b>', 'Objects = data + metadata + globally unique ID, flat namespace', 'HTTPS / API / SDK, virtually unlimited', 'S3 · Azure Blob', 'Static websites, backups, media, data lakes, archives']
      ] },
      tip: 'Static HTML website, cheap and highly available → <b>S3 static website hosting</b>.' },
    { id: 'l3-s3', t: 'Object storage features and S3 storage classes', hy: 1, asked: 'Mid MCQ · Glacier · encryption',
      notes: [
        '<b>Features:</b> encryption (client-side, server-side with service-managed, customer-managed KMS or customer-provided keys), <b>versioning</b>, <b>immutability</b> (time-based retention, legal hold), static <b>web hosting</b>.'
      ],
      table: { h: ['S3 class', 'Designed for', 'Azure equivalent'], r: [
        ['Standard', 'Frequently accessed, low latency', 'Hot'],
        ['Intelligent-Tiering', 'Unknown or changing access pattern (auto moves objects)', 'Smart tier'],
        ['Standard-IA', 'Infrequent access but rapid retrieval when needed, multi-AZ', 'Cool'],
        ['One Zone-IA', 'Infrequent access, re-creatable data, single AZ (cheaper)', 'Cool / Cold'],
        ['Glacier', 'Archive, retrieval minutes to hours, <b>cost-effective long-term</b>', 'Cold / Archive'],
        ['Glacier Deep Archive', 'Lowest cost, rarely accessed (compliance), retrieval ~12 h', 'Archive']
      ] },
      tip: 'Hospital records kept for years, cheapest option → <b>S3 Glacier</b>. Disaster-recovery copies → infrequent access / Glacier.' },
    { id: 'l3-other', t: 'Other storage aspects', hy: 0,
      notes: [
        '<b>Archiving and backup</b> (snapshots to S3 / Glacier), <b>hybrid storage</b> (Storage Gateway links on-prem to cloud), <b>bulk data transfer</b> (Snowball, physical appliances when the network is too slow).',
        '<b>CAP theorem</b> is also taught in this lecture; see Lecture 7 for the full notes.'
      ] }
  ]
},
{
  n: 4, title: 'Cloud Networking', sub: 'VPC · Subnets · SG vs NACL · Gateways · Peering · Hybrid', src: 'slides',
  topics: [
    { id: 'l4-sdn', t: 'SDN and NFV', hy: 0,
      notes: [
        '<b>SDN:</b> separates the network <b>control plane from the forwarding plane</b>, so the network is programmable and centrally managed. Big-picture view of the infrastructure.',
        '<b>NFV:</b> decouples network functions (firewall, routing, load balancing) from proprietary hardware and runs them as <b>software in VMs (VNFs)</b>. <b>CNF</b> (cloud-native network function) is the successor that runs inside Linux containers.',
        '<b>Similarity:</b> both rely on abstraction and virtualization. <b>Difference:</b> SDN splits control from forwarding; NFV abstracts <i>all</i> network functions from hardware and delivers specific functionality.'
      ] },
    { id: 'l4-vpc', t: 'Virtual networks (VPC) and what you must specify', hy: 1, asked: 'Mid MCQ ×10+',
      notes: [
        '<b>VPC</b> (Azure: VNet) is a logically isolated virtual network with <b>one or more IP ranges (CIDR)</b> and one or more subnets.',
        '<b>Specified at creation:</b> the <b>CIDR block</b> (cannot be changed later) and the <b>region</b> (a VPC lives in exactly one region and spans its AZs). Subnets, peering and gateways can be added later.',
        'Creating a VPC automatically creates a <b>main route table</b> (plus default NACL and security group). It does <b>not</b> create subnets or an Internet Gateway.',
        '<b>Five main VPC components:</b> subnets, route tables, Internet Gateway (or Virtual Private Gateway), NACLs, security groups.',
        'By default <b>all subnets in a VPC can communicate</b> with each other (local route). Only <b>one IGW</b> can be attached to a VPC at a time. VPCs can peer only if CIDR ranges do not overlap.'
      ],
      tip: 'AWS allowed VPC CIDR sizes: <b>/16 to /28</b>. Private ranges (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.' },
    { id: 'l4-subnet', t: 'Subnets: public vs private, sizing and reserved IPs', hy: 1, asked: 'Structured Q1 (CIDR design)',
      notes: [
        'A subnet maps to a <b>single AZ</b>. Subnet CIDRs cannot overlap, and a subnet CIDR may equal the VPC CIDR (single subnet).',
        '<b>Public subnet</b> = its route table has a route to an <b>Internet Gateway</b>. <b>Private subnet</b> = no such route (outbound internet only via a NAT gateway). Azure has no public / private subnet concept.',
        '<b>5 IPs reserved per subnet (AWS):</b> 1st network address · 2nd VPC router · 3rd DNS · 4th reserved for future use · last = broadcast.',
        '<b>Usable IPs = 2^(32 − prefix) − 5.</b>',
        '/24 → 256 − 5 = <b>251</b> usable · /25 → 128 − 5 = <b>123</b> · /27 → 32 − 5 = <b>27</b> · /28 (smallest) → 16 − 5 = <b>11</b>.',
        '<b>Worked example</b> 10.0.0.0/24: network 10.0.0.0 · router 10.0.0.1 · DNS 10.0.0.2 · future 10.0.0.3 · first usable 10.0.0.4 · last usable 10.0.0.254 · broadcast 10.0.0.255.',
        '<b>Sizing method (structured Q):</b> count every resource that needs an IP, add the 5 reserved per subnet, add growth, round up to the next power of two, then choose the prefix. Place load balancers in public subnets, app servers and databases in private subnets across at least 2 AZs.'
      ],
      tip: 'Why DB in a private subnet? No direct internet exposure, smaller attack surface, only the app tier can reach it through security groups.' },
    { id: 'l4-sgnacl', t: 'Security Group vs Network ACL (stateful vs stateless)', hy: 1, asked: 'Mid MCQ ×6',
      notes: ['An ACL rule has: rule number · protocol · port range · source / destination IP range · allow / deny.'],
      table: { h: ['', 'Security Group', 'Network ACL'], r: [
        ['Level', '<b>Instance / ENI</b>', '<b>Subnet</b>'],
        ['State', '<b>Stateful</b> – reply traffic auto-allowed', '<b>Stateless</b> – must allow request <i>and</i> response'],
        ['Rules', '<b>Allow rules only</b>', 'Allow <b>and Deny</b>, evaluated in rule-number order'],
        ['Default', 'Deny all inbound, allow all outbound', 'Default NACL allows all in / out'],
        ['HTTPS example', 'Inbound 443 rule is enough', 'Inbound 443 + outbound ephemeral ports needed']
      ] },
      tip: 'Azure NSG is stateful and can attach to subnets and NICs. If the NACL blocks outbound traffic, SSH replies fail even when the SG is fine.' },
    { id: 'l4-gw', t: 'Gateway services: IGW · NAT · VPN · Transit', hy: 0, asked: 'Mid MCQ · IGW / VGW',
      notes: [],
      table: { h: ['Gateway', 'Purpose', 'Key facts'], r: [
        ['<b>Internet Gateway (IGW)</b>', 'Two-way internet connectivity for a VPC', 'Horizontally scaled, no bandwidth limit, 1 per VPC, needs a route + public IP. Azure has no IGW concept.'],
        ['<b>NAT Gateway</b>', 'Lets private-subnet instances reach the internet (updates) while blocking inbound connections started from outside', '<b>Deployed in a public subnet</b> (needs a route to the IGW)'],
        ['<b>VPN Gateway (AWS Virtual Private Gateway)</b>', 'Encrypted tunnel over the public internet to on-premises', '<b>Site-to-site</b> (network to network). Azure also offers point-to-site; in AWS use <b>Client VPN</b> for point-to-site.'],
        ['<b>Transit Gateway</b>', 'Central hub connecting many VPCs and on-premises networks', '<b>Hub-and-spoke</b> model. Azure: Virtual WAN']
      ] },
      tip: 'External connectivity for a VPC = <b>Internet Gateway + Virtual Private Gateway</b>. NAT is for outbound-only from private subnets.' },
    { id: 'l4-peering', t: 'VPC peering and bastion hosts', hy: 1, asked: 'Mid MCQ · peering',
      notes: [
        '<b>Peering:</b> private connection between two VPCs (cross-account and cross-region supported). <b>CIDR ranges must not overlap</b>.',
        '<b>Not transitive:</b> A↔B and B↔C does <b>not</b> give A↔C.',
        'After peering you must <b>add routes</b> in each side’s route table pointing to the peer CIDR, and allow the traffic in SG / NACL. “Peering works but requests fail” → <b>missing routes</b>.',
        '<b>Bastion host (jump host):</b> hardened instance in a <b>public subnet</b> with a public IP, used to SSH / RDP into instances in private subnets without exposing them.'
      ] },
    { id: 'l4-hybrid', t: 'Hybrid connectivity, private access and flow logs', hy: 0, asked: 'Mid MCQ · Direct Connect',
      notes: [
        '<b>Remote users:</b> direct internet, Point-to-Site VPN, AWS Client VPN. <b>Remote networks:</b> Site-to-Site VPN or dedicated links: <b>AWS Direct Connect</b> / Azure ExpressRoute (private, consistent latency).',
        '<b>Fault tolerance of a Direct Connect link:</b> add a second Direct Connect in the same region (redundant circuit) and/or a <b>backup hardware VPN</b> over the internet to the same VPC.',
        '<b>Private access to cloud services:</b> <b>Private Link / Private Endpoint</b> (service gets a private IP in your VNet, traffic stays off the internet). Azure Service Endpoints still hit the public endpoint of the PaaS service but over the Azure backbone.',
        '<b>Flow logs:</b> capture IP traffic metadata for VPCs, subnets or ENIs; stored in S3 / blobs / CloudWatch Logs; out of the traffic path (no throughput or latency impact). Uses: troubleshooting, intrusion detection, compliance archive.'
      ] }
  ]
}
);
