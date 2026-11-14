/* Cloud Computing lecture slides (simple slides for each lecture). */
window.PORTAL = window.PORTAL || { modules: {} };
window.PORTAL.ccSlides = [
 {
  "n": 1,
  "title": "Introduction to Cloud Computing",
  "short": "Introduction to Cloud",
  "slides": [
   {
    "t": "Lecture 1: Introduction to Cloud Computing",
    "kind": "title",
    "lead": "IT4090 Cloud Computing",
    "b": [
     "Evolution of IT infrastructure",
     "NIST definition and 5 characteristics",
     "Service models and deployment models",
     "Cloud providers and benefits"
    ]
   },
   {
    "t": "Evolution of IT infrastructure",
    "kind": "list",
    "b": [
     "<b>Mainframe / Mini</b> computers",
     "<b>Personal computer</b>",
     "<b>Client / server</b> computing",
     "<b>Web-based</b> enterprise applications",
     "<b>Cloud</b> and mobile computing"
    ],
    "lead": "Five stages, from central machines to services on demand"
   },
   {
    "t": "The electricity analogy",
    "kind": "list",
    "b": [
     "Mid 1800s: factories made their own power (dynamos): costly, needed engineers, not the core business",
     "Late 1800s: power companies sold electricity over wires",
     "Customers just <b>plug in and pay for what they use</b>",
     "Cloud is the same idea for IT: no own data center, focus on core business"
    ],
    "lead": "Cloud is to IT what the power grid is to electricity"
   },
   {
    "t": "Traditional IT vs cloud",
    "kind": "list",
    "tbl": {
     "h": [
      "",
      "Traditional IT",
      "Cloud"
     ],
     "r": [
      [
       "Time to go live",
       "6 to 12 months (vendors, PO, hardware, software)",
       "Minutes"
      ],
      [
       "Cost model",
       "Big upfront <b>CAPEX</b>",
       "Pay as you go <b>OPEX</b>"
      ],
      [
       "Capacity",
       "Fixed: under-supply or wasted capacity",
       "Add or remove as the load changes"
      ],
      [
       "Innovation",
       "Barrier: slow and costly to try ideas",
       "Cheap to try, destroy when done"
      ]
     ]
    }
   },
   {
    "t": "Why do we need cloud?",
    "kind": "list",
    "b": [
     "<b>Business agility</b>: faster time to market, flexibility and scalability",
     "<b>Customer experience</b>: always available services, many regions",
     "<b>Cost</b>: pay as you go, CAPEX to OPEX, focus on core business"
    ]
   },
   {
    "t": "NIST definition of cloud computing",
    "kind": "list",
    "b": [
     "A model for <b>ubiquitous, convenient, on-demand network access</b>",
     "to a <b>shared pool of configurable resources</b> (networks, servers, storage, apps, services)",
     "that can be <b>rapidly provisioned and released</b> with minimal management effort"
    ],
    "lead": "Say this definition in the exam"
   },
   {
    "t": "5 essential characteristics",
    "kind": "list",
    "tbl": {
     "h": [
      "Characteristic",
      "Meaning"
     ],
     "r": [
      [
       "On-demand self-service",
       "Provision resources yourself, no provider contact"
      ],
      [
       "Broad network access",
       "Available over the network from any standard client"
      ],
      [
       "Resource pooling",
       "Shared pool, multi-tenant, location only at region or country level"
      ],
      [
       "Rapid elasticity",
       "Scale out and in quickly, often automatically"
      ],
      [
       "Measured service",
       "Metering, pay per use, monitor and report"
      ]
     ]
    },
    "lead": "Trick: B-R-R-O-M"
   },
   {
    "t": "Is cloud a technology or a model?",
    "kind": "list",
    "b": [
     "Cloud is <b>not</b> a technology",
     "It is a <b>business model</b> and a <b>delivery model</b>",
     "The technology underneath is <b>virtualization</b>"
    ]
   },
   {
    "t": "Service models",
    "kind": "list",
    "tbl": {
     "h": [
      "Model",
      "Provider manages",
      "You manage",
      "Examples"
     ],
     "r": [
      [
       "<b>IaaS</b>",
       "Physical infrastructure and virtualization",
       "Servers, OS, platform, apps",
       "AWS EC2, Azure VM, S3"
      ],
      [
       "<b>PaaS</b>",
       "Infrastructure and platform",
       "Your application and its settings",
       "Elastic Beanstalk, Azure App Service, RDS"
      ],
      [
       "<b>SaaS</b>",
       "Everything including the app",
       "Only user settings",
       "Gmail, Microsoft 365, Salesforce"
      ]
     ]
    }
   },
   {
    "t": "Actors in cloud computing (NIST)",
    "kind": "list",
    "tbl": {
     "h": [
      "Actor",
      "Role"
     ],
     "r": [
      [
       "Cloud consumer",
       "Uses services from a provider"
      ],
      [
       "Cloud provider",
       "Makes the service available"
      ],
      [
       "Cloud auditor",
       "Independent assessment of services, security, performance"
      ],
      [
       "Cloud broker",
       "Manages use and delivery, negotiates between provider and consumer"
      ],
      [
       "Cloud carrier",
       "Connectivity and transport from provider to consumer"
      ]
     ]
    }
   },
   {
    "t": "Deployment models",
    "kind": "list",
    "tbl": {
     "h": [
      "Model",
      "Key points"
     ],
     "r": [
      [
       "<b>Public</b>",
       "Open to everyone, provider site, multi-tenant. Cheap, scalable, zero maintenance. Lower data security"
      ],
      [
       "<b>Private</b>",
       "One organization, single tenant. High security and control. Expensive, management overhead"
      ],
      [
       "<b>Hybrid</b>",
       "Private plus public, data and apps portable between them. Flexible. Data transfer is the issue"
      ],
      [
       "<b>Community</b>",
       "Shared by a community with the same concerns, e.g. <b>government clouds</b>"
      ]
     ]
    }
   },
   {
    "t": "Cloud service providers",
    "kind": "list",
    "b": [
     "About 300 providers worldwide",
     "Top 6: <b>AWS, Azure, Google Cloud, IBM Cloud, Alibaba Cloud, Oracle Cloud</b>",
     "Top 3 hold about 60%: AWS about 33%, Azure about 20%, GCP about 7%"
    ]
   }
  ]
 },
 {
  "n": 2,
  "title": "Cloud Core Services and Global Infrastructure",
  "short": "Core Services & Infrastructure",
  "slides": [
   {
    "t": "Lecture 2: Core Services and Global Infrastructure",
    "kind": "title",
    "lead": "IT4090 Cloud Computing",
    "b": [
     "Region, Availability Zone, data center",
     "Choosing a Region",
     "Core services",
     "Shared responsibility, billing, quotas"
    ]
   },
   {
    "t": "Cloud global infrastructure",
    "kind": "list",
    "b": [
     "Hardware and software that make up the cloud: servers, storage, networking in data centers worldwide",
     "Designed to be <b>flexible, reliable, scalable and secure</b>",
     "Benefits: <b>security, availability, performance, scalability, flexibility</b>"
    ]
   },
   {
    "t": "Region, Availability Zone, data center",
    "kind": "list",
    "cols": [
     [
      "<b>Region</b>",
      "a geographic area",
      "has several AZs"
     ],
     [
      "<b>Availability Zone</b>",
      "fully isolated partition",
      "one or more data centers",
      "joined by fast private network"
     ],
     [
      "<b>Data center</b>",
      "where data lives and is processed",
      "redundant power and networking",
      "separate facility"
     ]
    ]
   },
   {
    "t": "Choosing a Region",
    "kind": "list",
    "tbl": {
     "h": [
      "Factor",
      "Why"
     ],
     "r": [
      [
       "Data governance and legal rules",
       "Some data may not leave the country"
      ],
      [
       "Proximity to customers",
       "Lower latency"
      ],
      [
       "Services available",
       "Not every service exists in every Region"
      ],
      [
       "Cost",
       "Prices differ by Region"
      ]
     ]
    },
    "lead": "Trick: Legal, Latency, Services, Cost"
   },
   {
    "t": "Core cloud services",
    "kind": "list",
    "tbl": {
     "h": [
      "Category",
      "AWS",
      "Azure"
     ],
     "r": [
      [
       "Compute",
       "EC2",
       "Virtual Machines"
      ],
      [
       "Network",
       "VPC",
       "Virtual Network"
      ],
      [
       "Storage",
       "S3, EBS, EFS",
       "Blob, Disks, Files"
      ]
     ]
    }
   },
   {
    "t": "Shared responsibility model",
    "kind": "list",
    "cols": [
     [
      "<b>Provider</b>",
      "Security <b>OF</b> the cloud",
      "hardware, data centers, network, virtualization"
     ],
     [
      "<b>Customer</b>",
      "Security <b>IN</b> the cloud",
      "data, access (IAM), OS patches on IaaS, firewall rules, encryption"
     ]
    ],
    "lead": "More managed service = less for you to secure"
   },
   {
    "t": "How you pay",
    "kind": "list",
    "cols": [
     [
      "<b>Pay for what you use</b>",
      "no large upfront cost"
     ],
     [
      "<b>Pay less when you reserve</b>",
      "Reserved Instances"
     ],
     [
      "<b>Pay less when you use more</b>",
      "volume discounts"
     ]
    ]
   },
   {
    "t": "Service limits and quotas",
    "kind": "list",
    "b": [
     "Default quotas, <b>specific to each Region</b>",
     "<b>Soft limit</b>: can be increased on request",
     "<b>Hard limit</b>: cannot be increased",
     "Why: prevent excessive charges and overuse by one customer"
    ]
   }
  ]
 },
 {
  "n": 3,
  "title": "Cloud Compute and Storage",
  "short": "Compute & Storage",
  "slides": [
   {
    "t": "Lecture 3: Compute and Storage",
    "kind": "title",
    "lead": "IT4090 Cloud Computing",
    "b": [
     "Virtualization vs containers",
     "EC2 and instance types",
     "Purchasing options and lifecycle",
     "Storage: block, file, object, CAP"
    ]
   },
   {
    "t": "Virtualization vs containerization",
    "kind": "list",
    "cols": [
     [
      "<b>Virtual machine</b>",
      "own guest OS each",
      "hypervisor on hardware",
      "heavy, slower start"
     ],
     [
      "<b>Container</b>",
      "shares host OS kernel",
      "container engine (Docker)",
      "light, starts in seconds"
     ]
    ],
    "lead": "Type 1 hypervisor runs on hardware (cloud). Type 2 runs on a host OS"
   },
   {
    "t": "Software defined compute",
    "kind": "list",
    "b": [
     "Compute function is <b>virtualized and abstracted</b> from hardware",
     "Processing power is <b>pooled</b> across many units and workload is spread",
     "Generic, industry standard hardware, easy to add"
    ]
   },
   {
    "t": "Cloud compute services",
    "kind": "list",
    "tbl": {
     "h": [
      "",
      "Amazon EC2",
      "Azure VM"
     ],
     "r": [
      [
       "Model",
       "IaaS",
       "IaaS"
      ],
      [
       "Template",
       "AMI",
       "Marketplace image"
      ],
      [
       "Billing",
       "Per second",
       "Per minute"
      ]
     ]
    }
   },
   {
    "t": "Instance types",
    "kind": "list",
    "tbl": {
     "h": [
      "Type",
      "Use"
     ],
     "r": [
      [
       "General purpose",
       "Balanced: web servers, small databases"
      ],
      [
       "Compute optimized",
       "High CPU: batch, gaming, modelling"
      ],
      [
       "Memory optimized",
       "High RAM: in-memory databases"
      ],
      [
       "Storage optimized",
       "High disk I/O: warehouses, NoSQL"
      ],
      [
       "Accelerated computing",
       "GPU: machine learning, graphics"
      ],
      [
       "Burstable",
       "Low baseline, bursts when needed"
      ]
     ]
    }
   },
   {
    "t": "Tenancy",
    "kind": "list",
    "tbl": {
     "h": [
      "Option",
      "Meaning"
     ],
     "r": [
      [
       "Default / shared",
       "Same hardware shared with other customers"
      ],
      [
       "Dedicated instances",
       "Hardware used only by your account"
      ],
      [
       "Dedicated hosts",
       "Whole physical server, good for per-socket licences"
      ]
     ]
    }
   },
   {
    "t": "Purchasing options",
    "kind": "list",
    "tbl": {
     "h": [
      "Option",
      "Key point",
      "Best for"
     ],
     "r": [
      [
       "<b>On-demand</b>",
       "No commitment, highest price",
       "Short, unpredictable work"
      ],
      [
       "<b>Reserved</b>",
       "1 or 3 year commitment, big discount",
       "Steady workloads"
      ],
      [
       "<b>Spot</b>",
       "Cheapest, can be <b>stopped by provider</b>",
       "Fault-tolerant batch jobs"
      ],
      [
       "<b>Savings plan</b>",
       "Commit $ per hour, flexible instance type",
       "Changing but steady usage"
      ]
     ]
    }
   },
   {
    "t": "Instance lifecycle",
    "kind": "list",
    "b": [
     "Pending, then <b>Running</b>",
     "<b>Stop</b>: shut down, can start again, pay for storage only",
     "<b>Hibernate</b>: save memory to disk, resume later",
     "<b>Terminate</b>: deleted for good, cannot return"
    ]
   },
   {
    "t": "Placement groups",
    "kind": "list",
    "tbl": {
     "h": [
      "Type",
      "Purpose"
     ],
     "r": [
      [
       "<b>Cluster</b>",
       "Same AZ, close together: lowest latency, high throughput"
      ],
      [
       "<b>Partition</b>",
       "Groups on separate racks: big distributed systems (Hadoop, Cassandra)"
      ],
      [
       "<b>Spread</b>",
       "Each instance on different hardware: maximum availability"
      ]
     ]
    },
    "lead": "Azure equivalent: Proximity placement group"
   },
   {
    "t": "Software defined storage and CAP theorem",
    "kind": "list",
    "b": [
     "<b>Software defined storage</b>: storage abstracted from the hardware",
     "<b>CAP</b>: a distributed store can give only <b>2 of 3</b>: <b>C</b>onsistency, <b>A</b>vailability, <b>P</b>artition tolerance",
     "During a network partition choose: cancel the operation (consistency) or carry on (availability, risk of stale data)"
    ]
   },
   {
    "t": "Block, file and object storage",
    "kind": "list",
    "tbl": {
     "h": [
      "",
      "Block",
      "File",
      "Object"
     ],
     "r": [
      [
       "Structure",
       "Blocks with IDs",
       "Folders and files",
       "Data + metadata + unique ID"
      ],
      [
       "Access",
       "Attached to a VM",
       "NFS / SMB share",
       "HTTPS, API, SDK"
      ],
      [
       "Best for",
       "Databases, boot disks (IOPS)",
       "Shared content",
       "Backups, media, static websites"
      ],
      [
       "AWS",
       "EBS",
       "EFS",
       "S3"
      ],
      [
       "Azure",
       "Disks",
       "Files",
       "Blob"
      ]
     ]
    }
   },
   {
    "t": "Object storage features and tiers",
    "kind": "list",
    "tbl": {
     "h": [
      "Features",
      "Tiers (AWS / Azure)"
     ],
     "r": [
      [
       "Encryption: client side or server side (service, customer managed or customer provided keys)<br>Versioning<br>Immutability: time-based retention, legal hold<br>Static web hosting",
       "S3 Standard / <b>Hot</b><br>Intelligent-Tiering<br>Infrequent Access / <b>Cold</b><br>Glacier / <b>Archive</b>"
      ]
     ]
    }
   },
   {
    "t": "Other storage topics",
    "kind": "list",
    "b": [
     "<b>Archiving and backup</b>",
     "<b>Hybrid storage</b>: on-premises plus cloud",
     "<b>Bulk data transfer</b> with physical devices (Snowball, Data Box)"
    ]
   }
  ]
 },
 {
  "n": 4,
  "title": "Cloud Networking",
  "short": "Cloud Networking",
  "slides": [
   {
    "t": "Lecture 4: Cloud Networking",
    "kind": "title",
    "lead": "IT4090 Cloud Computing",
    "b": [
     "SDN and NFV",
     "VPC, subnets and IP sizing",
     "Security groups and NACLs",
     "Gateways, peering, hybrid, private access"
    ]
   },
   {
    "t": "SDN and NFV",
    "kind": "list",
    "cols": [
     [
      "<b>SDN</b>",
      "separates network <b>control</b> from <b>forwarding</b>",
      "control becomes programmable",
      "the big picture"
     ],
     [
      "<b>NFV</b>",
      "network functions (firewall, router, load balancer) run as software in VMs",
      "VNF, and CNF in containers",
      "specific functions"
     ]
    ]
   },
   {
    "t": "Virtual networks",
    "kind": "list",
    "b": [
     "<b>AWS VPC</b> / <b>Azure VNet</b>",
     "Logically isolated, one or more IP ranges and subnets",
     "Can peer with other networks if IP ranges <b>do not overlap</b>",
     "Subnet CIDR blocks cannot overlap inside a network"
    ]
   },
   {
    "t": "Subnets: public and private (AWS)",
    "kind": "list",
    "b": [
     "<b>Public subnet</b>: route to the internet gateway, instances can send traffic out directly",
     "<b>Private subnet</b>: no direct internet route",
     "Azure has no public/private concept, use route tables",
     "Allowed sizes: AWS /16 to /28, Azure /2 to /29"
    ]
   },
   {
    "t": "Subnet IP maths (AWS)",
    "kind": "list",
    "b": [
     "Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16",
     "<b>5 IPs are reserved</b> in every subnet: network address, router, DNS, future use, broadcast",
     "<b>Usable IPs = 2^(32 - prefix) - 5</b>",
     "10.0.0.0/24 = 251 · /25 = 123 · /27 = 27 · /28 = 11"
    ],
    "lead": "First usable IP = network address + 4"
   },
   {
    "t": "Worked examples",
    "kind": "list",
    "tbl": {
     "h": [
      "Subnet",
      "First usable",
      "Last usable",
      "Usable IPs"
     ],
     "r": [
      [
       "10.0.0.0/24",
       "10.0.0.4",
       "10.0.0.254",
       "251"
      ],
      [
       "172.16.10.128/25",
       "172.16.10.132",
       "172.16.10.254",
       "123"
      ],
      [
       "192.168.0.64/27",
       "192.168.0.68",
       "192.168.0.94",
       "27"
      ]
     ]
    }
   },
   {
    "t": "Security group vs NACL vs NSG",
    "kind": "list",
    "tbl": {
     "h": [
      "",
      "Security group",
      "NACL",
      "Azure NSG"
     ],
     "r": [
      [
       "Applied to",
       "Instance (ENI)",
       "Subnet",
       "Subnet and NIC"
      ],
      [
       "State",
       "<b>Stateful</b>",
       "<b>Stateless</b>",
       "<b>Stateful</b>"
      ],
      [
       "Rules",
       "Allow only",
       "Allow and deny",
       "Allow and deny"
      ]
     ]
    },
    "lead": "Stateful: reply allowed automatically. Stateless: write rules for request and reply"
   },
   {
    "t": "Network interfaces",
    "kind": "list",
    "b": [
     "Virtual NIC attached to a compute instance",
     "One public IP and one or more private IPs",
     "More than one interface per instance is possible",
     "AWS <b>ENI</b>, Azure <b>NIC</b>"
    ]
   },
   {
    "t": "Gateway services",
    "kind": "list",
    "tbl": {
     "h": [
      "Gateway",
      "Job"
     ],
     "r": [
      [
       "<b>Internet gateway</b>",
       "Connects the network to the internet, scales horizontally, no bandwidth limit (not a separate item in Azure)"
      ],
      [
       "<b>NAT gateway</b>",
       "Private instances reach the internet, no inbound connections. Lives in a <b>public subnet</b>"
      ],
      [
       "<b>VPN gateway</b>",
       "Encrypted tunnel over the internet to on-premises"
      ],
      [
       "<b>Transit gateway</b>",
       "Hub to connect many networks (hub and spoke). Azure Virtual WAN"
      ]
     ]
    }
   },
   {
    "t": "VPN types",
    "kind": "list",
    "b": [
     "<b>Site-to-site</b>: network to network",
     "<b>Point-to-site</b>: one PC to a network",
     "Azure VPN Gateway does both",
     "AWS Virtual Private Gateway is site-to-site only, <b>AWS Client VPN</b> is for point-to-site"
    ]
   },
   {
    "t": "Network peering and bastion host",
    "kind": "list",
    "b": [
     "Peering links two networks, across accounts too",
     "<b>Not transitive</b>: A-B and B-C does not mean A-C",
     "<b>Bastion (jump) host</b>: in a public subnet with a public IP, used to manage private instances safely"
    ]
   },
   {
    "t": "Hybrid connectivity",
    "kind": "list",
    "tbl": {
     "h": [
      "Need",
      "Options"
     ],
     "r": [
      [
       "Remote users",
       "Internet access, Azure point-to-site VPN, AWS Client VPN"
      ],
      [
       "Remote networks",
       "Site-to-site VPN (over internet), or <b>AWS Direct Connect / Azure ExpressRoute</b> (private dedicated line)"
      ]
     ]
    }
   },
   {
    "t": "Private access and flow logs",
    "kind": "list",
    "b": [
     "<b>Private Link / Private Endpoint</b>: reach PaaS services through a private IP, not the public internet",
     "<b>Azure Service Endpoint</b>: stays on Azure backbone but still hits the service public endpoint",
     "<b>Flow logs</b> record IP traffic, collected outside the traffic path (no latency effect). Uses: troubleshooting, intrusion detection, compliance"
    ]
   }
  ]
 },
 {
  "n": 5,
  "title": "Cloud High Availability and Disaster Recovery",
  "short": "HA & Disaster Recovery",
  "slides": [
   {
    "t": "Lecture 5: High Availability and Disaster Recovery",
    "kind": "title",
    "lead": "IT4090 Cloud Computing",
    "b": [
     "Downtime and availability",
     "Redundancy, failover, replication",
     "Load balancing",
     "BCP, DR, backups, RTO and RPO"
    ]
   },
   {
    "t": "Availability and downtime",
    "kind": "list",
    "tbl": {
     "h": [
      "Availability",
      "Downtime per year"
     ],
     "r": [
      [
       "99%",
       "3.65 days"
      ],
      [
       "99.9%",
       "8.77 hours"
      ],
      [
       "99.99%",
       "52.6 minutes"
      ],
      [
       "99.999%",
       "5.26 minutes"
      ]
     ]
    },
    "lead": "Planned downtime: maintenance. Unplanned: failure or attack"
   },
   {
    "t": "High availability (HA)",
    "kind": "list",
    "b": [
     "System keeps an agreed level of uptime for longer than normal",
     "<b>Eliminate single points of failure</b>",
     "<b>Reliable crossover</b>: switch over without losing data",
     "<b>Detect failures</b> as they happen"
    ]
   },
   {
    "t": "Redundancy",
    "kind": "list",
    "tbl": {
     "h": [
      "Type",
      "Meaning"
     ],
     "r": [
      [
       "Passive",
       "Extra capacity built in to absorb a failure"
      ],
      [
       "Active",
       "System detects failure and reconfigures itself automatically (voting scheme)"
      ]
     ]
    }
   },
   {
    "t": "Failover and failback",
    "kind": "list",
    "cols": [
     [
      "<b>Failover</b>",
      "switch to a standby when the main system fails",
      "detected with a <b>heartbeat</b> signal"
     ],
     [
      "<b>Failback</b>",
      "return the repaired system to normal service"
     ]
    ]
   },
   {
    "t": "Replication and HA clusters",
    "kind": "list",
    "b": [
     "<b>Active replication</b>: every replica processes the request",
     "<b>Passive replication</b>: one replica processes, result copied to the others",
     "Cluster modes: <b>Active/Active</b> (share the load) and <b>Active/Passive</b> (standby)"
    ]
   },
   {
    "t": "Load balancing algorithms",
    "kind": "list",
    "tbl": {
     "h": [
      "Algorithm",
      "How it chooses"
     ],
     "r": [
      [
       "Round robin",
       "Servers in turn"
      ],
      [
       "Least connections",
       "Server with fewest active connections"
      ],
      [
       "Least time",
       "Fastest responding server"
      ],
      [
       "IP hash",
       "Same client IP goes to the same server"
      ]
     ]
    },
    "lead": "Session persistence: one client sticks to one backend server"
   },
   {
    "t": "Business continuity and disaster recovery",
    "kind": "list",
    "b": [
     "<b>Business continuity</b>: keep delivering at acceptable levels after a disruption",
     "<b>BCP</b>: plan with business impact analysis and threat analysis",
     "<b>Disaster recovery</b>: part of BCP, recovers IT systems after a disaster",
     "DR plan: team, risk evaluation, critical assets, backup strategy, testing"
    ]
   },
   {
    "t": "Backup methods",
    "kind": "list",
    "tbl": {
     "h": [
      "Method",
      "Copies",
      "Restore needs"
     ],
     "r": [
      [
       "Full",
       "Everything",
       "One backup"
      ],
      [
       "Incremental",
       "Changes since the last backup",
       "Full + all incrementals"
      ],
      [
       "Differential",
       "Changes since the last full",
       "Full + latest differential"
      ],
      [
       "Near-continuous (CDP)",
       "Almost every change",
       "Almost no data loss"
      ]
     ]
    }
   },
   {
    "t": "DR tiers",
    "kind": "list",
    "b": [
     "Tier 0: no off-site data",
     "Tier 1: backup only, no hot site",
     "Tier 4: backup with hot site",
     "Tier 5: electronic vaulting · Tier 6: point-in-time copies",
     "<b>Tier 7</b>: transaction integrity, zero or little data loss, highly automated"
    ]
   },
   {
    "t": "RTO, RPO, RCO",
    "kind": "list",
    "tbl": {
     "h": [
      "Term",
      "Meaning"
     ],
     "r": [
      [
       "<b>RTO</b>",
       "Time within which a process must be restored"
      ],
      [
       "<b>RPO</b>",
       "How much data loss (in time) is acceptable"
      ],
      [
       "<b>RCO</b>",
       "How much data inconsistency is acceptable after recovery"
      ]
     ]
    },
    "lead": "RPO of 1 hour means back up at least every hour"
   }
  ]
 },
 {
  "n": 6,
  "title": "Cloud Security and Monitoring",
  "short": "Security & Monitoring",
  "slides": [
   {
    "t": "Lecture 6: Security and Monitoring",
    "kind": "title",
    "lead": "IT4090 Cloud Computing",
    "b": [
     "Software defined security and PLOP",
     "IAM, MFA, federation and SSO",
     "Encryption",
     "Risks and monitoring"
    ]
   },
   {
    "t": "Software defined security and PLOP",
    "kind": "list",
    "b": [
     "<b>Software defined security</b>: controls (intrusion detection, segmentation, access) are policy-driven, automated and run by software",
     "<b>Principle of Least Privilege</b>: give a user or process only the privileges it needs for its job"
    ]
   },
   {
    "t": "IAM: identity and access management",
    "kind": "list",
    "b": [
     "Policies and technology that make sure the right users get the right access",
     "<b>Identify, authenticate, authorize</b>",
     "IAM puts least privilege into practice"
    ]
   },
   {
    "t": "IAM components",
    "kind": "list",
    "tbl": {
     "h": [
      "Component",
      "Meaning"
     ],
     "r": [
      [
       "Logical organization",
       "Boundary or domain for users and processes"
      ],
      [
       "Users",
       "Have own credentials, no permission by default"
      ],
      [
       "Groups",
       "Collections of users, no credentials"
      ],
      [
       "Policies",
       "Collections of permissions that allow or deny"
      ],
      [
       "Roles",
       "Collections of policies, assumed for temporary credentials (RBAC)"
      ]
     ]
    }
   },
   {
    "t": "Multi-factor authentication",
    "kind": "list",
    "tbl": {
     "h": [
      "Factor",
      "Example"
     ],
     "r": [
      [
       "Something you have",
       "Token, smart card, phone"
      ],
      [
       "Something you know",
       "Password, PIN"
      ],
      [
       "Something you are",
       "Fingerprint, face, voice, iris"
      ],
      [
       "Somewhere you are",
       "GPS location"
      ]
     ]
    },
    "lead": "Two or more different factors"
   },
   {
    "t": "Federated identity and SSO",
    "kind": "list",
    "b": [
     "<b>Federated identity</b>: one identity linked across several identity systems",
     "<b>SSO</b>: log in once, use many systems",
     "<b>Enterprise federation</b>: company directory",
     "<b>Web identity federation</b>: Google, Facebook login"
    ]
   },
   {
    "t": "Encryption",
    "kind": "list",
    "cols": [
     [
      "<b>Symmetric</b>",
      "one shared key",
      "fast",
      "key sharing is the problem"
     ],
     [
      "<b>Asymmetric</b>",
      "public key + private key",
      "slower",
      "solves key sharing"
     ],
     [
      "<b>Hashing</b>",
      "one way, fixed length",
      "integrity checks"
     ]
    ]
   },
   {
    "t": "Protecting data",
    "kind": "list",
    "tbl": {
     "h": [
      "State",
      "Protect with"
     ],
     "r": [
      [
       "Data in use",
       "Access control, secure memory"
      ],
      [
       "Data in transit",
       "TLS / HTTPS, VPN"
      ],
      [
       "Data at rest",
       "Disk and object encryption"
      ]
     ]
    },
    "lead": "Client side encryption: you encrypt before upload. Server side: the provider encrypts"
   },
   {
    "t": "Cloud security risks and threats",
    "kind": "list",
    "b": [
     "Poor access management",
     "Data breach, leak or loss",
     "Misconfiguration",
     "Insecure APIs",
     "Account hijacking",
     "Lack of visibility",
     "DoS and DDoS attacks"
    ]
   },
   {
    "t": "Cloud monitoring",
    "kind": "list",
    "b": [
     "Observing and managing operational workflow in the cloud",
     "Checks <b>availability and performance</b> of sites, servers, apps",
     "Services: <b>Amazon CloudWatch, Azure Monitor</b>, Datadog, AppDynamics"
    ]
   },
   {
    "t": "Metrics, events, logs, alerts",
    "kind": "list",
    "tbl": {
     "h": [
      "Item",
      "Meaning"
     ],
     "r": [
      [
       "Metrics",
       "Raw numbers: CPU, memory, disk"
      ],
      [
       "Events",
       "Something happened: what, where, when"
      ],
      [
       "Logs",
       "What systems have done, key for troubleshooting"
      ],
      [
       "Alerts",
       "Reactive: threshold, anomaly or heartbeat alerts that notify or run an action"
      ]
     ]
    }
   }
  ]
 },
 {
  "n": 7,
  "title": "Cloud Database and Analytics Services",
  "short": "Database & Analytics",
  "slides": [
   {
    "t": "Lecture 7: Database and Analytics Services",
    "kind": "title",
    "lead": "IT4090 Cloud Computing",
    "b": [
     "SQL and NoSQL",
     "OLTP and OLAP",
     "Caching",
     "Data warehouse and data lake"
    ]
   },
   {
    "t": "Relational vs non-relational",
    "kind": "list",
    "tbl": {
     "h": [
      "",
      "Relational (SQL)",
      "Non-relational (NoSQL)"
     ],
     "r": [
      [
       "Structure",
       "Tables, fixed schema",
       "Flexible, document or key based"
      ],
      [
       "Rules",
       "<b>ACID</b>",
       "Rapidly changing designs"
      ],
      [
       "Examples",
       "MySQL, PostgreSQL, SQL Server, Oracle, RDS",
       "MongoDB, Cassandra, DynamoDB, Redis, CosmosDB"
      ]
     ]
    },
    "lead": "ACID: Atomicity, Consistency, Isolation, Durability"
   },
   {
    "t": "OLTP vs OLAP",
    "kind": "list",
    "tbl": {
     "h": [
      "",
      "OLTP",
      "OLAP"
     ],
     "r": [
      [
       "Focus",
       "Operational data, transactions",
       "Historical data, analysis and reports"
      ],
      [
       "Queries",
       "Small and simple",
       "Large and complex"
      ],
      [
       "Response",
       "Milliseconds",
       "Seconds to hours"
      ],
      [
       "Design",
       "Normalized",
       "Denormalized (warehouses)"
      ]
     ]
    }
   },
   {
    "t": "NoSQL types",
    "kind": "list",
    "tbl": {
     "h": [
      "Type",
      "Use case",
      "Example"
     ],
     "r": [
      [
       "Key-value",
       "Session data, shopping cart",
       "Redis, DynamoDB"
      ],
      [
       "Document",
       "E-commerce, content",
       "MongoDB, CosmosDB"
      ],
      [
       "Columnar",
       "Analytics, blogging platforms",
       "Cassandra"
      ],
      [
       "Graph",
       "Relationships: social networks",
       "Neptune, Neo4j"
      ]
     ]
    }
   },
   {
    "t": "CAP theorem again",
    "kind": "list",
    "b": [
     "Pick 2 of <b>Consistency, Availability, Partition tolerance</b>",
     "During a partition you choose consistency or availability",
     "Example: MongoDB leans CP, Cassandra and DynamoDB lean AP"
    ]
   },
   {
    "t": "Caching",
    "kind": "list",
    "b": [
     "Keeps <b>frequently requested data in memory</b>",
     "Faster access and <b>less load on the database</b>",
     "Two systems: <b>Redis</b> and <b>Memcached</b>"
    ]
   },
   {
    "t": "Redis vs Memcached",
    "kind": "list",
    "tbl": {
     "h": [
      "Redis",
      "Memcached"
     ],
     "r": [
      [
       "In-memory key-value store, many data structures<br>Persistent: survives reboot<br>Replicas, backup, high availability",
       "In-memory object store, simple<br>Not persistent<br>Multithreaded, scales out"
      ]
     ]
    }
   },
   {
    "t": "Data warehouse",
    "kind": "list",
    "b": [
     "Data management system for <b>business intelligence</b> and analytics",
     "<b>Structured, filtered, processed</b> historical data from many sources",
     "<b>ETL</b>: extract, transform, load via a staging area",
     "<b>ELT</b>: extract, load, then transform in the destination"
    ]
   },
   {
    "t": "Data lake",
    "kind": "list",
    "b": [
     "Storage repository for <b>raw data in its native format</b>",
     "<b>Flat architecture</b>, not folders and files",
     "Purpose of the data is not decided yet",
     "Used by data scientists"
    ]
   },
   {
    "t": "Data warehouse vs data lake",
    "kind": "list",
    "tbl": {
     "h": [
      "",
      "Warehouse",
      "Lake"
     ],
     "r": [
      [
       "Data",
       "Processed",
       "Raw"
      ],
      [
       "Use",
       "Current, known purpose",
       "Purpose not decided"
      ],
      [
       "Users",
       "Business professionals",
       "Data scientists"
      ]
     ]
    }
   },
   {
    "t": "Real-time processing and BI",
    "kind": "list",
    "b": [
     "<b>Real-time (stream) processing</b>: process data as it arrives, continuous input and output",
     "Examples: fraud detection, live dashboards",
     "<b>Business intelligence</b>: dashboards and reports for decisions"
    ]
   }
  ]
 },
 {
  "n": 8,
  "title": "Cloud Migration",
  "short": "Cloud Migration",
  "slides": [
   {
    "t": "Lecture 8: Cloud Migration",
    "kind": "title",
    "lead": "IT4090 Cloud Computing",
    "b": [
     "Migration process",
     "Migration strategies: the 6 Rs",
     "Challenges and solutions"
    ]
   },
   {
    "t": "What is cloud migration?",
    "kind": "list",
    "b": [
     "Moving a meaningful part of your organization's <b>existing IT assets to the cloud</b>"
    ]
   },
   {
    "t": "Migration process: 4 phases",
    "kind": "list",
    "b": [
     "<b>1 Opportunity evaluation</b>: what is the business case or trigger?",
     "<b>2 Portfolio discovery and planning</b>: what do we have, what depends on what, what first, how",
     "<b>3 Design, migrate, validate</b>: one application at a time, simplest first",
     "<b>4 Operate</b>: DevOps, NoOps, FinOps, SecOps"
    ]
   },
   {
    "t": "Opportunity evaluation: triggers",
    "kind": "list",
    "b": [
     "Hardware renewal",
     "Data center lease ends",
     "More productivity",
     "Global expansion",
     "Mergers and acquisitions",
     "Standardized architectures",
     "Faster time to market"
    ]
   },
   {
    "t": "Discovery, planning and tools",
    "kind": "list",
    "b": [
     "What is in the environment? What depends on what?",
     "What do we migrate first? How?",
     "Tools: <b>AWS Application Discovery Service, Azure Migrate</b>, third-party tools"
    ]
   },
   {
    "t": "Design, migrate and validate",
    "kind": "list",
    "b": [
     "Start with the <b>least complex</b> applications",
     "Test, then decommission old systems",
     "Run <b>parallel environments</b> if needed",
     "Move traffic in steps, then <b>full cutover</b>"
    ]
   },
   {
    "t": "Migration strategies compared",
    "kind": "list",
    "tbl": {
     "h": [
      "Gartner 5 Rs",
      "Azure 4 Rs",
      "AWS 6 Rs"
     ],
     "r": [
      [
       "Rehost, Refactor, Revise, Rebuild, Replace",
       "Rehost, Refactor, Re-architect, Rebuild",
       "<b>Rehost, Re-platform, Repurchase, Refactor, Retire, Retain</b>"
      ]
     ]
    }
   },
   {
    "t": "AWS 6 Rs",
    "kind": "list",
    "tbl": {
     "h": [
      "R",
      "Meaning",
      "Example"
     ],
     "r": [
      [
       "<b>Rehost</b>",
       "Lift and shift, no changes",
       "VM to EC2"
      ],
      [
       "<b>Re-platform</b>",
       "Lift, tinker and shift: small changes",
       "Database to RDS, VMs to App Service"
      ],
      [
       "<b>Repurchase</b>",
       "Move to SaaS",
       "CRM to Salesforce, HR to Workday"
      ],
      [
       "<b>Refactor</b>",
       "Re-architect with cloud-native features, most expensive",
       "Monolith to microservices"
      ],
      [
       "<b>Retire</b>",
       "Switch off what is not needed",
       "Unused tool"
      ],
      [
       "<b>Retain</b>",
       "Keep for now, revisit later",
       "Recent upgrade, low priority"
      ]
     ]
    }
   },
   {
    "t": "Migration challenges",
    "kind": "list",
    "tbl": {
     "h": [
      "Challenge",
      "Solution"
     ],
     "r": [
      [
       "Cost of migration",
       "Plan well, move step by step, use hybrid cloud"
      ],
      [
       "Resistance to adapt",
       "Leadership buy-in, intuitive tools, vendor help"
      ],
      [
       "Shortage of skills",
       "Training, learning culture, vendors help skill up staff"
      ]
     ]
    }
   }
  ]
 },
 {
  "n": 9,
  "title": "Cloud Native Applications",
  "short": "Cloud Native Apps",
  "slides": [
   {
    "t": "Lecture 9: Cloud Native Applications",
    "kind": "title",
    "lead": "IT4090 Cloud Computing",
    "b": [
     "Monolith vs microservices",
     "Cloud native and 12-factor app",
     "DevOps, CI and CD",
     "Application modernization"
    ]
   },
   {
    "t": "Monolithic architecture",
    "kind": "list",
    "tbl": {
     "h": [
      "Strengths",
      "Weaknesses"
     ],
     "r": [
      [
       "Few cross-cutting concerns<br>Easier debugging and testing<br>Simple to develop and deploy",
       "Complex to understand as it grows<br>Hard to change<br>Cannot scale parts separately<br>Hard to adopt new technology"
      ]
     ]
    },
    "lead": "One single, indivisible unit: UI + server + database + middleware"
   },
   {
    "t": "Microservices architecture",
    "kind": "list",
    "b": [
     "App split into <b>small independent services</b>",
     "Each is deployed independently and talks through <b>APIs</b>",
     "Each can be updated and <b>scaled on its own</b>"
    ]
   },
   {
    "t": "Monolith vs microservices",
    "kind": "list",
    "tbl": {
     "h": [
      "",
      "Monolith",
      "Microservices"
     ],
     "r": [
      [
       "Scaling",
       "Clone the whole app",
       "Scale only the busy service"
      ],
      [
       "Deployment",
       "All at once",
       "Per service"
      ],
      [
       "Technology",
       "One stack",
       "Free choice per service"
      ],
      [
       "Weakness",
       "Hard to change",
       "Distributed complexity, harder to debug"
      ]
     ]
    }
   },
   {
    "t": "Serverless and FaaS",
    "kind": "list",
    "b": [
     "<b>Serverless</b>: provider manages servers, you pay per execution",
     "<b>FaaS</b>: small functions run on events (AWS Lambda, Azure Functions)",
     "Event-driven, auto scaling, stateless",
     "Limits: cold start, run time limit, lock-in"
    ],
    "lead": "Frequently asked in past papers"
   },
   {
    "t": "Cloud native computing",
    "kind": "list",
    "b": [
     "Apps that use the <b>flexibility, scalability and resilience</b> of the cloud",
     "Pioneered by born-in-the-cloud firms: Netflix, Spotify, Uber, Airbnb",
     "<b>CNCF</b> promotes it, focusing on containers"
    ]
   },
   {
    "t": "12-factor app (1 to 6)",
    "kind": "list",
    "tbl": {
     "h": [
      "Factor",
      "Rule"
     ],
     "r": [
      [
       "1 Codebase",
       "One codebase, many deployments"
      ],
      [
       "2 Dependencies",
       "Declare all dependencies"
      ],
      [
       "3 Config",
       "Store config in environment variables"
      ],
      [
       "4 Backing services",
       "Treat as attached resources"
      ],
      [
       "5 Build, release, run",
       "Three separate stages"
      ],
      [
       "6 Processes",
       "Stateless processes"
      ]
     ]
    }
   },
   {
    "t": "12-factor app (7 to 12)",
    "kind": "list",
    "tbl": {
     "h": [
      "Factor",
      "Rule"
     ],
     "r": [
      [
       "7 Port binding",
       "Service exposes itself on a port"
      ],
      [
       "8 Concurrency",
       "Scale out with more processes"
      ],
      [
       "9 Disposability",
       "Fast start, graceful stop"
      ],
      [
       "10 Dev/prod parity",
       "Keep environments alike"
      ],
      [
       "11 Logs",
       "Treat logs as event streams"
      ],
      [
       "12 Admin processes",
       "Keep admin tasks in source control"
      ]
     ]
    }
   },
   {
    "t": "Cloud native tools",
    "kind": "list",
    "b": [
     "<b>Containers</b> package apps",
     "<b>Microservices</b> split the business functions",
     "<b>Service mesh</b> manages service-to-service communication",
     "<b>Orchestration</b> (Kubernetes) provisions, deploys, operates and scales containers"
    ]
   },
   {
    "t": "Cloud native practices",
    "kind": "list",
    "b": [
     "<b>DevOps</b>: development and operations working together",
     "<b>SRE</b>: Google's reliability practices",
     "<b>NoOps</b>: everything automated, no manual operations",
     "<b>CI</b> and <b>CD</b>"
    ]
   },
   {
    "t": "CI, delivery and deployment",
    "kind": "list",
    "tbl": {
     "h": [
      "Practice",
      "Meaning"
     ],
     "r": [
      [
       "Continuous integration",
       "Merge code often, automatic build and tests"
      ],
      [
       "Continuous delivery",
       "Package passes tests, <b>manual approval</b> to release"
      ],
      [
       "Continuous deployment",
       "Passing checks go to production <b>automatically</b>"
      ]
     ]
    },
    "lead": "Tools: Jenkins, GitLab, GitHub, CircleCI · AWS CodePipeline, CodeBuild, CodeDeploy · Azure DevOps"
   },
   {
    "t": "Application modernization journey",
    "kind": "list",
    "b": [
     "Refactor legacy software to match today's business needs",
     "Traditional app",
     "Rehost as a container",
     "Add new microservices beside it",
     "Rearchitect parts as microservices",
     "Fully transformed microservices application"
    ]
   }
  ]
 },
 {
  "n": 10,
  "title": "Infrastructure as Code",
  "short": "Infrastructure as Code",
  "slides": [
   {
    "t": "Lecture 10: Infrastructure as Code (IaC)",
    "kind": "title",
    "lead": "IT4090 Cloud Computing",
    "b": [
     "Why manual processes fail",
     "IaC, tool types, approaches",
     "Terraform and CloudFormation"
    ]
   },
   {
    "t": "Risks of manual processes",
    "kind": "list",
    "b": [
     "No <b>repeatability</b> at scale",
     "No <b>version control</b>, hard to roll back",
     "No <b>audit trail</b> for compliance",
     "<b>Inconsistent</b> configurations between servers"
    ]
   },
   {
    "t": "What is IaC?",
    "kind": "list",
    "b": [
     "Provision and manage cloud resources by <b>defining them in a template file</b>",
     "Human-readable and machine-readable",
     "Config that lived in a console now lives in a <b>repository as code</b>"
    ]
   },
   {
    "t": "Without IaC vs with IaC",
    "kind": "list",
    "tbl": {
     "h": [
      "Without IaC",
      "With IaC"
     ],
     "r": [
      [
       "Manual setup each time",
       "Code reused for every deployment"
      ],
      [
       "Slow teardown and deployment",
       "Instant"
      ],
      [
       "Errors in setup",
       "Stored in version control"
      ],
      [
       "Manual rollback",
       "Simple, instant rollback"
      ]
     ]
    }
   },
   {
    "t": "Types of IaC tools",
    "kind": "list",
    "tbl": {
     "h": [
      "Type",
      "Job",
      "Examples"
     ],
     "r": [
      [
       "Configuration management",
       "Install and manage software on existing servers",
       "Ansible, Puppet, Chef, SaltStack"
      ],
      [
       "Server templating",
       "Reusable server templates",
       "Docker, Packer, Vagrant"
      ],
      [
       "Orchestration",
       "Manage how parts work together",
       "Kubernetes, Docker Swarm, OpenShift"
      ],
      [
       "Provisioning",
       "Create the infrastructure",
       "Terraform, CloudFormation"
      ]
     ]
    }
   },
   {
    "t": "Imperative vs declarative",
    "kind": "list",
    "cols": [
     [
      "<b>Imperative</b>",
      "step-by-step commands",
      "you say HOW"
     ],
     [
      "<b>Declarative</b>",
      "describe the end state",
      "the tool works out how",
      "Terraform, CloudFormation"
     ]
    ]
   },
   {
    "t": "Benefits of IaC",
    "kind": "list",
    "b": [
     "<b>Consistency</b> and reproducibility",
     "<b>Automation and speed</b>: build or destroy in minutes",
     "<b>Version control</b> with Git",
     "Reusable stacks for dev, test and production",
     "Easy clean-up: delete the stack, delete the resources"
    ]
   },
   {
    "t": "IaC best practices",
    "kind": "list",
    "b": [
     "Little or no documentation: the code is the documentation",
     "Version control all configuration files",
     "Test configurations constantly",
     "Use a modular approach"
    ]
   },
   {
    "t": "Terraform",
    "kind": "list",
    "b": [
     "HashiCorp tool for <b>cloud and on-prem</b> resources",
     "Works with many providers through <b>APIs</b>",
     "Core workflow: <b>Write, Plan, Apply</b>",
     "<b>Plan</b> shows what will be created, changed or destroyed. <b>Apply</b> does it in the right order"
    ]
   },
   {
    "t": "AWS CloudFormation",
    "kind": "list",
    "b": [
     "Describe all AWS resources in a <b>template</b> (JSON or YAML)",
     "CloudFormation provisions them and handles dependencies",
     "Resources created together form a <b>stack</b>",
     "AWS only, while Terraform is multi-cloud"
    ]
   }
  ]
 },
 {
  "n": 11,
  "title": "Containerization",
  "short": "Containerization",
  "slides": [
   {
    "t": "Lecture 11: Containerization and Docker",
    "kind": "title",
    "lead": "IT4090 Cloud Computing",
    "b": [
     "Why containers",
     "Docker components",
     "Container lifecycle and commands"
    ]
   },
   {
    "t": "Why containers?",
    "kind": "list",
    "b": [
     "Apps depend on libraries and OS versions, so they break between dev, test, QA, staging and production (the matrix from hell)",
     "A <b>container</b> bundles the app with all its dependencies",
     "It runs the same on a laptop, a server or the cloud"
    ]
   },
   {
    "t": "VM vs container",
    "kind": "list",
    "tbl": {
     "h": [
      "",
      "VM",
      "Container"
     ],
     "r": [
      [
       "OS",
       "Own guest OS",
       "Shares host kernel"
      ],
      [
       "Size",
       "GBs",
       "MBs"
      ],
      [
       "Start",
       "Minutes",
       "Seconds"
      ],
      [
       "Managed by",
       "Hypervisor",
       "Container engine"
      ]
     ]
    }
   },
   {
    "t": "Advantages of containers",
    "kind": "list",
    "b": [
     "<b>Portability</b>",
     "<b>Consistency</b> across environments",
     "<b>Lightweight</b>",
     "<b>Scalability</b> for microservices",
     "<b>Efficiency</b>, fast start"
    ]
   },
   {
    "t": "Docker",
    "kind": "list",
    "b": [
     "Tool to run apps in <b>containers</b> on a Linux host",
     "Written in Go, uses Linux <b>namespaces</b> for isolation",
     "Client-server design: the client talks to the daemon over a REST API"
    ]
   },
   {
    "t": "Docker components",
    "kind": "list",
    "tbl": {
     "h": [
      "Component",
      "Role"
     ],
     "r": [
      [
       "Docker daemon (dockerd)",
       "Manages images, containers, networks, volumes"
      ],
      [
       "Docker client (docker)",
       "Sends your commands to the daemon"
      ],
      [
       "Docker Desktop",
       "Easy install: daemon, client, Compose, Kubernetes"
      ]
     ]
    }
   },
   {
    "t": "Docker objects",
    "kind": "list",
    "tbl": {
     "h": [
      "Object",
      "Meaning"
     ],
     "r": [
      [
       "<b>Image</b>",
       "Read-only template, the blueprint"
      ],
      [
       "<b>Container</b>",
       "Running instance of an image"
      ],
      [
       "<b>Dockerfile</b>",
       "Text file of commands that builds an image"
      ],
      [
       "<b>Registry</b>",
       "Store for images: Docker Hub, Amazon ECR, Azure Container Registry"
      ]
     ]
    }
   },
   {
    "t": "Container lifecycle commands",
    "kind": "list",
    "b": [
     "<code>docker pull IMAGE</code>: download an image",
     "<code>docker create</code>: make a container, not started",
     "<code>docker start</code>: start it",
     "<code>docker run</code> = pull + create + start",
     "<code>docker ps</code> running · <code>docker ps -a</code> all"
    ]
   },
   {
    "t": "Managing containers",
    "kind": "list",
    "b": [
     "<code>docker logs</code>: see output",
     "<code>docker attach</code>: connect your terminal",
     "<code>docker exec -it ID cmd</code>: run a new command inside",
     "<code>docker pause</code> / <code>unpause</code>: SIGSTOP / SIGCONT"
    ]
   },
   {
    "t": "Stopping and removing",
    "kind": "list",
    "b": [
     "<code>docker stop</code>: graceful, <b>SIGTERM</b>",
     "<code>docker kill</code>: forced, <b>SIGKILL</b>",
     "<code>docker restart</code>",
     "<code>docker rm</code> removes a container, <code>docker rmi</code> removes an image, <code>docker system prune</code> clears stopped containers"
    ]
   }
  ]
 },
 {
  "n": 12,
  "title": "Container Orchestration",
  "short": "Container Orchestration",
  "slides": [
   {
    "t": "Lecture 12: Container Orchestration",
    "kind": "title",
    "lead": "IT4090 Cloud Computing",
    "b": [
     "What orchestration is",
     "How it works",
     "Advantages and tools"
    ]
   },
   {
    "t": "What is container orchestration?",
    "kind": "list",
    "b": [
     "Automating <b>deployment, management, scaling and networking</b> of containers through their whole lifecycle",
     "Lets software run consistently at scale across many environments"
    ]
   },
   {
    "t": "Why do containers need orchestration?",
    "kind": "list",
    "b": [
     "A few containers can be managed by hand, <b>hundreds cannot</b>",
     "Containerized microservices are the compute units of cloud native apps",
     "A CI/CD or DevOps pipeline needs it"
    ]
   },
   {
    "t": "How it works",
    "kind": "list",
    "b": [
     "A <b>cluster</b> is a group of nodes across machines",
     "<b>Worker nodes</b> run containers",
     "<b>Control plane nodes</b> act as the orchestrator",
     "Managed through APIs and GUIs"
    ]
   },
   {
    "t": "The three-step cycle",
    "kind": "list",
    "b": [
     "<b>Provisioning</b>",
     "<b>Deployment</b>",
     "<b>Lifecycle management</b>",
     "Repeats as part of an agile or DevOps pipeline"
    ]
   },
   {
    "t": "Advantages",
    "kind": "list",
    "tbl": {
     "h": [
      "Area",
      "Benefit"
     ],
     "r": [
      [
       "Automation",
       "Deploying, scaling, managing is automatic and faster"
      ],
      [
       "Reliability",
       "Health checks and self-healing reduce downtime"
      ],
      [
       "Cost and efficiency",
       "Smart scheduling, scale up and down, pay for what you use"
      ],
      [
       "Security and portability",
       "Less human error, runs on-premises or any cloud, avoids lock-in"
      ],
      [
       "Modern practice",
       "Fits DevOps, CI/CD and microservices"
      ]
     ]
    }
   },
   {
    "t": "Tools",
    "kind": "list",
    "b": [
     "<b>Kubernetes</b> (EKS, AKS, GKE are managed versions)",
     "<b>Docker Swarm</b>",
     "<b>Red Hat OpenShift</b>",
     "Amazon ECS"
    ]
   },
   {
    "t": "Kubernetes words",
    "kind": "list",
    "tbl": {
     "h": [
      "Term",
      "Meaning"
     ],
     "r": [
      [
       "Cluster",
       "All the nodes"
      ],
      [
       "Node",
       "A machine that runs containers"
      ],
      [
       "Pod",
       "Smallest unit: one or more containers"
      ],
      [
       "Service",
       "Stable address and load balancing for pods"
      ]
     ]
    }
   }
  ]
 }
];
