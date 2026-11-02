/* Cloud Computing (IT4090) - lecture notes L8-L12.
   The slides for these lectures are NOT in the Cloud Computing folder, so they are written from the
   official course outline plus standard cloud / AWS knowledge. Verify details against your own slides. */
window.PORTAL = window.PORTAL || { modules: {} };
window.PORTAL.ccLectures = window.PORTAL.ccLectures || [];
window.PORTAL.ccLectures.push(
{
  n: 8, title: 'Cloud Migration', sub: 'Planning · Strategies · The 6 Rs · Challenges', src: 'outline',
  topics: [
    { id: 'l8-plan', t: 'Cloud migration planning', hy: 0,
      notes: [
        '<b>Why migrate:</b> cost (CAPEX → OPEX), agility, scalability, resilience, end of hardware life, new capabilities (analytics, AI).',
        '<b>Typical phases:</b> <b>1 Assess</b> (business case, discovery of applications, dependencies and TCO) → <b>2 Plan / mobilize</b> (landing zone, security, skills, migration waves) → <b>3 Migrate</b> (move workloads and data, test) → <b>4 Operate and optimize</b> (monitor, right-size, modernize).',
        '<b>Portfolio assessment</b> classifies each app by business value, technical fit, complexity and dependencies, then picks a strategy per app.',
        '<b>Data migration options:</b> network transfer, VPN / Direct Connect, offline appliances (Snowball), <b>AWS DMS</b> for databases, <b>AWS Application Migration Service</b> for servers, <b>Migration Hub</b> to track progress.'
      ],
      tip: 'Structured answer shape: assess → plan → migrate → optimize, then mention risks and testing.' },
    { id: 'l8-6rs', t: 'The 6 Rs of cloud migration', hy: 1, asked: 'Likely structured question',
      notes: [],
      table: { h: ['R', 'Meaning', 'Effort', 'Example'], r: [
        ['<b>Rehost</b> (lift &amp; shift)', 'Move servers as-is to IaaS (VMs)', 'Low', 'On-prem VM → EC2 with no code change'],
        ['<b>Replatform</b> (lift, tinker &amp; shift)', 'Small optimizations, same core architecture', 'Low–medium', 'Self-managed MySQL → Amazon RDS'],
        ['<b>Repurchase</b> (drop &amp; shop)', 'Replace with a SaaS product', 'Medium', 'In-house CRM → Salesforce'],
        ['<b>Refactor / Re-architect</b>', 'Redesign as cloud-native (microservices, serverless)', 'High', 'Monolith → microservices on containers / Lambda'],
        ['<b>Retire</b>', 'Switch off apps that are no longer needed', 'Lowest', 'Decommission unused reporting tool'],
        ['<b>Retain</b> (revisit)', 'Keep on-premises for now (compliance, latency, recent investment)', 'None', 'Mainframe with regulatory limits']
      ] },
      tip: 'Learn the order and one example each. Rehost = fastest, Refactor = most benefit but most cost and risk.' },
    { id: 'l8-challenges', t: 'Cloud migration challenges', hy: 1,
      notes: [
        '<b>Security and compliance</b> (data residency, shared responsibility) · <b>downtime</b> and business disruption · <b>data transfer</b> volume, time and cost · <b>legacy / dependency</b> complexity and application compatibility.',
        '<b>Skills gap</b> and change management · <b>cost surprises</b> (egress, over-provisioning) · <b>vendor lock-in</b> · integration with on-premises systems (hybrid networking) · performance and latency.',
        '<b>Mitigation:</b> pilot first, phased waves, rollback plan, backups, training, governance and cost monitoring, use of managed migration tools.'
      ] }
  ]
},
{
  n: 9, title: 'Cloud Native Applications', sub: 'Monolith · Twelve-factor · CI / CD · Modernization', src: 'outline',
  topics: [
    { id: 'l9-mono', t: 'Monolithic vs cloud-native design', hy: 1, asked: 'Mid MCQ · Monolithic',
      notes: [],
      table: { h: ['', 'Monolithic', 'Cloud native / microservices'], r: [
        ['Structure', 'One big container wherein <b>all components are tightly packed</b> and deployed together', 'Small independent services with own data, communicating over APIs'],
        ['Scaling', 'Scale the whole app', 'Scale each service independently'],
        ['Deploy', 'Slow, risky, one release cycle', 'Frequent, independent releases (CI / CD)'],
        ['Failure', 'One fault can bring everything down', 'Faults isolated, resilient design'],
        ['Tech', 'Single stack', 'Polyglot, containers, serverless']
      ] },
      after: ['<b>Cloud-native computing</b> = building apps that exploit the cloud (elasticity, automation, managed services) using <b>containers, microservices, dynamic orchestration, DevOps and CI/CD</b> (CNCF definition).'] },
    { id: 'l9-12f', t: 'Twelve-factor application', hy: 1, asked: 'Likely structured question',
      notes: [
        '<b>1 Codebase</b> – one repo, many deploys · <b>2 Dependencies</b> – explicitly declared and isolated · <b>3 Config</b> – stored in the environment, not in code · <b>4 Backing services</b> – treated as attached resources · <b>5 Build, release, run</b> – strictly separate stages · <b>6 Processes</b> – stateless, share-nothing.',
        '<b>7 Port binding</b> – export services via a port · <b>8 Concurrency</b> – scale out via the process model · <b>9 Disposability</b> – fast startup, graceful shutdown · <b>10 Dev / prod parity</b> – keep environments similar · <b>11 Logs</b> – treat as event streams (stdout) · <b>12 Admin processes</b> – run one-off tasks as processes.'
      ],
      tip: 'Mnemonic idea: Code · Deps · Config · Backing · Build · Processes · Port · Concurrency · Disposability · Parity · Logs · Admin.' },
    { id: 'l9-design', t: 'Design considerations and backing services', hy: 0,
      notes: [
        '<b>Design for failure</b> (retries, timeouts, circuit breakers) · <b>stateless</b> services with state in backing stores · <b>scale out</b> horizontally · <b>loose coupling</b> via APIs, queues and events · <b>automation</b> of everything · observability (logs, metrics, tracing, health endpoints such as Spring Boot Actuator).',
        '<b>Backing services:</b> databases, caches, message queues (SQS / SNS), object storage, identity. Attach by URL / credentials in config so they can be swapped without code changes.',
        '<b>Containers and orchestration</b> are the default packaging and runtime for cloud-native apps (see L11 and L12).'
      ] },
    { id: 'l9-cicd', t: 'Automation, Continuous Integration and Continuous Delivery', hy: 1, asked: 'Mid MCQ · Code* services',
      notes: [
        '<b>CI</b> = developers merge to a shared repo often; each commit triggers automated <b>build and tests</b>. <b>Continuous Delivery</b> = every good build is automatically prepared for release (manual approval to production). <b>Continuous Deployment</b> = automatically deployed to production.',
        '<b>AWS developer tools (fully managed):</b>'
      ],
      table: { h: ['Service', 'Role in the pipeline'], r: [
        ['<b>AWS CodeCommit</b>', 'Source control (managed Git repositories)'],
        ['<b>AWS CodeBuild</b>', 'Compiles code, runs tests, produces artifacts'],
        ['<b>AWS CodeDeploy</b>', 'Automates deployments to EC2, Lambda, on-prem'],
        ['<b>AWS CodePipeline</b>', 'Orchestrates the whole release workflow'],
        ['<b>AWS CodeStar</b>', 'Unified project management / dashboard for the above']
      ] },
      after: ['<b>Blue-green deployment</b> reduces downtime and risk by running <b>two identical production environments</b>; traffic switches from blue (current) to green (new) and can roll back instantly.'],
      tip: 'Keyword matches: “continuous software development, fully managed” → CodeCommit / CodeBuild / CodeStar by wording of the question.' },
    { id: 'l9-modern', t: 'Application modernization', hy: 0,
      notes: [
        'Moving legacy apps toward cloud-native: <b>rehost → replatform → refactor</b>, wrap legacy in APIs, <b>strangler fig pattern</b> (gradually replace parts of a monolith with services), containerize, adopt managed databases and serverless, add CI / CD.',
        'Benefits: agility, scalability, lower operating cost, faster releases. Risks: complexity, data migration, skills.'
      ] }
  ]
},
{
  n: 10, title: 'Infrastructure as Code', sub: 'IaC · CloudFormation · Terraform · Ansible', src: 'outline',
  topics: [
    { id: 'l10-intro', t: 'What is IaC and why use it', hy: 0, asked: 'Mid short answer · IaC',
      notes: [
        '<b>Infrastructure as Code</b> = managing and provisioning infrastructure through <b>machine-readable definition files</b> instead of manual console clicks.',
        '<b>Benefits:</b> speed, <b>consistency / repeatability</b> (no configuration drift), version control and review (Git), automation in CI/CD, documentation, easy rebuild and disaster recovery, lower human error and cost.',
        '<b>Declarative</b> (describe the desired end state: CloudFormation, Terraform) vs <b>imperative / procedural</b> (describe the steps: scripts, some Ansible playbooks). <b>Idempotent</b>: re-running yields the same result.',
        '<b>Provisioning vs configuration management:</b> Terraform / CloudFormation create infrastructure; Ansible configures what runs on it.'
      ] },
    { id: 'l10-cfn', t: 'AWS CloudFormation', hy: 1, asked: 'Mid MCQ ×7',
      notes: [
        'AWS-native IaC: a <b>template</b> (JSON or YAML) describes resources; creating it produces a <b>stack</b> (resources managed as a single unit). Updating a stack uses <b>change sets</b>; deleting a stack deletes its resources. The lecturer’s past key notes JSON as the default language.',
        '<b>Workflow:</b> write template → upload / create stack → provide parameters → CloudFormation creates resources in the right order. “Configure a service” is <b>not</b> a required step.',
        '<b>Template sections:</b> <code>AWSTemplateFormatVersion</code> (optional) · <code>Description</code> · <code>Parameters</code> · <code>Mappings</code> · <code>Conditions</code> · <b><code>Resources</code> (the only required section)</b> · <code>Outputs</code>.',
        'Example uses: automatically build a LAMP stack with an ELB, repeatable Dev / Test environments, same template in many regions.',
        'Related: Elastic Beanstalk (PaaS, easier but less control), OpsWorks (Chef / Puppet), CDK (define stacks in code).'
      ],
      tip: 'Mandatory part of a template = <b>Resources</b>. Stack = deployed template.' },
    { id: 'l10-tf', t: 'Terraform', hy: 1,
      notes: [
        'Open-source, <b>cloud-agnostic / multi-cloud</b> IaC tool by HashiCorp. Language: <b>HCL</b> (HashiCorp Configuration Language). Uses <b>providers</b> (aws, azurerm, google …) to talk to APIs.',
        '<b>Workflow:</b> <code>terraform init</code> (download providers) → <code>terraform plan</code> (preview changes) → <code>terraform apply</code> (create / update) → <code>terraform destroy</code> (remove).',
        '<b>State file</b> (terraform.tfstate) records what exists; store it remotely (e.g. S3 + locking) for teams. Reusable <b>modules</b>, <b>variables</b>, <b>outputs</b>.',
        'Declarative, agentless (calls provider APIs).'
      ] },
    { id: 'l10-ansible', t: 'Ansible', hy: 1,
      notes: [
        '<b>Configuration management and automation</b> tool (Red Hat). <b>Agentless</b> – connects over <b>SSH</b> (WinRM for Windows), nothing installed on targets. Language: <b>YAML playbooks</b>.',
        'Key terms: <b>inventory</b> (hosts), <b>playbook</b> (list of plays), <b>tasks</b>, <b>modules</b> (units of work, idempotent), <b>roles</b>, <b>handlers</b>. Push-based.',
        'Used for installing software, patching, configuring servers, app deployment, and orchestration.'
      ],
      table: { h: ['', 'CloudFormation', 'Terraform', 'Ansible'], r: [
        ['Main job', 'Provision AWS resources', 'Provision resources on any cloud', 'Configure servers / deploy apps'],
        ['Language', 'JSON / YAML', 'HCL', 'YAML'],
        ['Scope', 'AWS only', 'Multi-cloud', 'Any host reachable by SSH'],
        ['Style', 'Declarative', 'Declarative', 'Mostly procedural (idempotent modules)'],
        ['State', 'Managed by AWS (stack)', 'Own state file', 'Stateless, agentless']
      ] },
      tip: 'Classic comparison question: Terraform provisions, Ansible configures, CloudFormation = AWS-only provisioning.' }
  ]
},
{
  n: 11, title: 'Containerization', sub: 'Containers vs VMs · Docker · Lifecycle · Compose', src: 'outline',
  topics: [
    { id: 'l11-vm', t: 'Containers vs virtual machines', hy: 1,
      notes: [],
      table: { h: ['', 'Virtual machine', 'Container'], r: [
        ['Virtualizes', 'Hardware (hypervisor)', 'Operating system (shared host kernel)'],
        ['Contains', 'Full guest OS + app', 'App + dependencies only'],
        ['Size / start', 'GBs, minutes', 'MBs, seconds'],
        ['Isolation', 'Strong (separate kernel)', 'Process-level (weaker)'],
        ['Density', 'Fewer per host', 'Many more per host'],
        ['Portability', 'Heavier to move', '“Build once, run anywhere”']
      ] },
      tip: 'Containers are lightweight because there is no guest OS per app. Often run inside VMs in the cloud.' },
    { id: 'l11-docker', t: 'Docker architecture and core concepts', hy: 1, asked: 'Mid short answer · docker images',
      notes: [
        '<b>Docker</b> is the leading container platform. <b>Architecture:</b> <b>client</b> (docker CLI) → <b>daemon</b> (dockerd builds, runs, manages) → <b>registry</b> (Docker Hub, Amazon ECR) storing images.',
        '<b>Image</b> = read-only layered template (app + dependencies). <b>Container</b> = running instance of an image. <b>Dockerfile</b> = text recipe to build an image (FROM, COPY, RUN, EXPOSE, CMD). <b>Volume</b> = persistent data outside the container. <b>Network</b> = bridge / host / overlay.',
        '<b>Common commands:</b> <code>docker build -t app .</code> · <code>docker images</code> (list images) · <code>docker pull / push</code> · <code>docker run -d -p 8080:80 app</code> · <code>docker ps</code> (running; <code>-a</code> all) · <code>docker stop / start / rm</code> · <code>docker logs</code> · <code>docker exec -it</code> · <code>docker rmi</code>.'
      ],
      tip: 'Past paper: “command that lists images in Docker” → <b>docker images</b>.' },
    { id: 'l11-life', t: 'Container lifecycle', hy: 0,
      notes: [
        '<b>Created</b> (docker create) → <b>Running</b> (docker start / run) → <b>Paused</b> (docker pause ↔ unpause) → <b>Stopped / Exited</b> (docker stop / kill; can restart) → <b>Deleted</b> (docker rm).',
        'Containers are <b>ephemeral</b>: data inside is lost when removed unless stored in a <b>volume</b>. Immutable images, replace rather than patch.'
      ] },
    { id: 'l11-multi', t: 'Multi-container applications (Docker Compose) and AWS container services', hy: 0, asked: 'Mid short answer · ECS',
      notes: [
        '<b>Docker Compose:</b> a <code>docker-compose.yml</code> defines several services (web, db, cache), networks and volumes; <code>docker compose up</code> starts them together on one host.',
        '<b>AWS:</b> <b>ECR</b> (image registry) · <b>ECS</b> (fully managed container orchestration service) · <b>EKS</b> (managed Kubernetes) · <b>Fargate</b> (serverless compute for containers, no servers to manage).'
      ] }
  ]
},
{
  n: 12, title: 'Container Orchestration', sub: 'Docker Swarm · Kubernetes · Pods · Services · Storage', src: 'outline',
  topics: [
    { id: 'l12-why', t: 'Why container orchestration', hy: 0,
      notes: [
        'Running many containers across many hosts by hand does not work. An <b>orchestrator</b> automates <b>scheduling / placement, scaling, self-healing, rolling updates and rollbacks, service discovery, load balancing, networking, storage and secrets</b>.',
        'Main tools: <b>Kubernetes</b> (industry standard), <b>Docker Swarm</b> (simple, built into Docker), Amazon ECS, Nomad.'
      ] },
    { id: 'l12-swarm', t: 'Docker Swarm', hy: 1,
      notes: [
        'A <b>swarm</b> is a cluster of Docker hosts (<b>nodes</b>). <b>Manager nodes</b> hold cluster state (Raft consensus) and schedule work; <b>worker nodes</b> run tasks.',
        '<b>Service</b> = desired state for a set of containers (image, replicas, ports). <b>Task</b> = one container of a service. <b>Stack</b> = multi-service app from a compose file. <b>Overlay network</b> connects containers across nodes; built-in load balancing (routing mesh).',
        '<b>Commands:</b> <code>docker swarm init</code> · <code>docker swarm join</code> · <code>docker service create --replicas 3 -p 80:80 nginx</code> · <code>docker service scale web=5</code> · <code>docker stack deploy -c file.yml app</code>.'
      ] },
    { id: 'l12-k8s', t: 'Kubernetes architecture', hy: 1, asked: 'Likely structured question',
      notes: [
        '<b>Kubernetes (K8s)</b> = open-source container orchestration platform from Google (now CNCF). A <b>cluster</b> = control plane + worker nodes.',
        '<b>Control plane:</b> <b>kube-apiserver</b> (front door, all requests) · <b>etcd</b> (key-value store of cluster state) · <b>kube-scheduler</b> (assigns pods to nodes) · <b>controller manager</b> (keeps actual state = desired state) · cloud controller manager.',
        '<b>Worker node:</b> <b>kubelet</b> (agent that runs pods) · <b>kube-proxy</b> (network rules / service routing) · <b>container runtime</b> (containerd / CRI-O).',
        '<b>Managed Kubernetes:</b> Amazon EKS, Azure AKS, Google GKE – the provider runs the control plane.'
      ],
      tip: 'Draw it: control plane box (API server, etcd, scheduler, controller manager) → worker nodes (kubelet, kube-proxy, runtime, pods).' },
    { id: 'l12-objects', t: 'Kubernetes concepts: Pods, Deployments, Services', hy: 1,
      notes: [],
      table: { h: ['Object', 'What it does'], r: [
        ['<b>Pod</b>', 'Smallest deployable unit: one or more containers sharing network (one IP) and storage; ephemeral'],
        ['<b>ReplicaSet</b>', 'Keeps a set number of identical pods running (self-healing)'],
        ['<b>Deployment</b>', 'Declarative management of ReplicaSets: scaling, <b>rolling updates</b>, rollback'],
        ['<b>Service</b>', 'Stable IP / DNS name and load balancing over a set of pods (selected by labels). Types: <b>ClusterIP</b> (internal), <b>NodePort</b> (port on every node), <b>LoadBalancer</b> (cloud load balancer)'],
        ['<b>Ingress</b>', 'HTTP / HTTPS routing (host / path) from outside to services'],
        ['<b>Namespace</b>', 'Logical partition of a cluster'],
        ['<b>ConfigMap / Secret</b>', 'Configuration data / sensitive data injected into pods'],
        ['<b>StatefulSet / DaemonSet / Job</b>', 'Stateful apps with stable identity / one pod per node / run-to-completion tasks'],
        ['<b>Labels &amp; selectors</b>', 'Key-value tags used to group and select objects']
      ] } },
    { id: 'l12-net', t: 'Networking, storage, discovery and service publishing', hy: 0,
      notes: [
        '<b>Networking:</b> every pod gets its own IP; pods can talk to each other without NAT (flat network via a CNI plugin). <b>Service discovery</b> through cluster <b>DNS</b> (service-name.namespace) and environment variables. <b>Publishing:</b> expose with NodePort, LoadBalancer or <b>Ingress</b>.',
        '<b>Storage:</b> container storage is ephemeral, so use <b>Volumes</b>. <b>PersistentVolume (PV)</b> = storage in the cluster; <b>PersistentVolumeClaim (PVC)</b> = a pod’s request for storage; <b>StorageClass</b> = dynamic provisioning (e.g. EBS).',
        '<b>Tools and clients:</b> <code>kubectl</code> (CLI: <code>get</code>, <code>describe</code>, <code>apply -f</code>, <code>scale</code>, <code>logs</code>, <code>exec</code>, <code>delete</code>), YAML manifests, <b>Minikube / kind</b> (local clusters), <b>Helm</b> (package manager), dashboards (Lens, Kubernetes Dashboard).'
      ],
      tip: 'Swarm vs Kubernetes: Swarm is simpler and Docker-native; Kubernetes is far more powerful, with a bigger ecosystem and managed offerings on every cloud.' }
  ]
}
);
