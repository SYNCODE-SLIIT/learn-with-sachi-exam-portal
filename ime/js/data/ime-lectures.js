/* Innovation Management and Entrepreneurship (IT4050) lecture notes L1-L9.
   Built from the lecture slides in the IME Lectures folder (Didula Chamara Thanaweera Arachchi's decks,
   Dr Krishantha Wisenthige's entrepreneur slides, the business plan and finance slides). Where a point
   comes from a standard textbook instead of the slides it is marked "(textbook)". */
window.PORTAL = window.PORTAL || { modules: {} };
window.PORTAL.imeLectures = [
{
  n: 1, title: 'Introduction to Innovation', sub: 'Invention vs innovation · Product, service, process · Incremental, radical · Architectural, modular · Drucker’s 7 sources', src: 'slides',
  topics: [
    { id: 'i1-invention', t: 'Invention vs innovation', hy: 1, asked: 'Asked in 2 papers',
      notes: [
        '<b>Invention</b> = creating something new that has <b>never existed before</b>. It need not meet a customer need or be sold. Patent law asks for an <b>inventive step</b> (<b>non-obviousness</b>): the invention must be an adequate distance beyond the “state of the art”.',
        '<b>Innovation</b> = “doing something new that improves a product, process or service” (WIPO). Fuller form (Kelly and Kranzberg): <b>the process of making changes to something established by introducing something new that adds value to customers and contributes to the knowledge store of the organization</b>.',
        '<b>Key idea:</b> not all inventions are innovations. An invention becomes an innovation only when it is exploited and <b>adds value to customers</b>. Many inventions never reach the market.'
      ],
      table: { h: ['Invention', 'Innovation (what turned it into value)'], r: [
        ['Microprocessor (Hoff, Faggin)', 'Evolution of microprocessors enabled countless devices, computing power and the digital age'],
        ['Xerox PARC: mouse and GUI', 'Adopted and developed by Apple, making user-friendly computing widespread'],
        ['Telephone (Bell)', 'Telephone networks and the global telecom industry'],
        ['Printing press (Gutenberg)', 'Spread of knowledge, publishing industry, education'],
        ['Steam engine (Watt)', 'Integration into manufacturing and transport, mechanization of industry'],
        ['The Internet', 'E-commerce, social networking, digital transformation of society']
      ] },
      tip: 'Answer “All inventions are not innovations” with: definition of each → an invention that failed to create customer value → one that did (Xerox PARC → Apple GUI).' },
    { id: 'i1-mgmt', t: 'Innovation management and why innovation matters', hy: 1, asked: 'Asked in 3 papers',
      notes: [
        '<b>Innovation management</b> lets an organization respond to external or internal opportunities and use its creativity to introduce new ideas, processes or products.',
        '<b>Why it matters:</b> sustains the business in the long run, increases <b>customer satisfaction</b>, builds <b>competitiveness</b> and differentiation, opens new markets, improves efficiency and quality, and creates growth in turnover, profit and knowledge.',
        '<b>Management innovation:</b> new ways of organizing and managing work (for example lean management, new incentive and decision systems). Harvard Business Review argues that firms like GE, P&amp;G, Visa and Linux stand out because of management innovation, not only products or people.'
      ],
      tip: 'Use a 3-part answer: survival (long-run), customers (satisfaction), competition (advantage), each with an example.' },
    { id: 'i1-types', t: 'Product, service and process innovation', hy: 0,
      notes: [
        '<b>Product innovation:</b> a new or improved good (a better smartphone). <b>Service innovation:</b> a new or improved service (on-demand ride hailing, internet banking). <b>Process innovation:</b> a new way of producing or delivering (Ford’s automated assembly line).',
        'Innovation can happen at every level of an organization and in non-profit and public organizations too.'
      ] },
    { id: 'i1-inc-rad', t: 'Incremental vs radical innovation', hy: 0, asked: 'Nov 2024',
      notes: [],
      table: { h: ['', 'Incremental', 'Radical'], r: [
        ['Size of change', 'Small improvements to something existing', 'Major change in something established, a breakthrough'],
        ['Risk and cost', 'Lower, easier to manage', 'Higher, uncertain, needs more resources'],
        ['Result', 'Keeps current customers, protects market share', 'Can create new markets and make old products obsolete'],
        ['Examples', 'New model of a phone with a better camera', 'The first smartphone, Uber, streaming replacing DVDs']
      ] },
      after: ['<b>Why firms cannot depend only on incremental innovation:</b> competitors and technology change fast, disruptive entrants appear (Kodak vs digital photography, Nokia vs smartphones), customers expect new value, and incremental changes are easy to copy. Radical innovation gives long-term survival and leadership.'],
      tip: 'Nov 2024 (7 marks): “justify with examples”. Argue both sides, then conclude firms need a <b>portfolio</b>: incremental for today, radical for tomorrow.' },
    { id: 'i1-arch-mod', t: 'Architectural and modular innovation', hy: 0, asked: 'Asked in 2 papers',
      notes: [
        'Henderson and Clark (textbook) separate <b>components</b> from the <b>architecture</b> that links them.',
        '<b>Architectural innovation:</b> changes the <b>way existing components are linked together</b> (the system design) while the core components stay much the same. Example: the <b>Sony Walkman</b> recombined existing tape player and headphone technology into a personal portable system; the <b>smartphone</b> recombined phone, camera, music player, GPS and internet into one architecture.',
        '<b>Modular innovation:</b> changes a <b>core component or technology</b> but leaves the overall architecture unchanged. Example: replacing a laptop’s hard disk with an <b>SSD</b>, or an analogue telephone dial with digital keys.',
        'Together with incremental and radical they form a matrix: <b>incremental · modular · architectural · radical</b>.'
      ],
      tip: 'Two-mark trick: architectural = <b>links</b> between parts change, modular = a <b>part</b> changes.' },
    { id: 'i1-drucker', t: 'Peter Drucker’s seven sources of innovation', hy: 1, asked: 'Asked in 4 papers',
      notes: [
        '<b>1 The unexpected:</b> unexpected success, failure or outside event. Penicillin (Fleming’s contaminated Petri dish) and Viagra (developed for angina, side effect created a new market).',
        '<b>2 Incongruity:</b> a gap between reality and assumptions, between perception and reality, in a process, in industry or market structure, or demographic. The need does not match what is supplied.',
        '<b>3 Process need:</b> “necessity is the mother of innovation”, for example Ford’s automated assembly line.',
        '<b>4 Changes in industry or market structure</b> that catch everyone unaware (new regulation, new competitors, convergence).',
        '<b>5 Demographics:</b> population, age, lifestyle needs (an ageing population creates demand for home care and health apps).',
        '<b>6 Changes in perception, mood and meaning:</b> health consciousness leading to organic food, fitness trackers.',
        '<b>7 New knowledge:</b> scientific and non-scientific, for example AI and nanotechnology.'
      ],
      tip: 'For “three products from three sources”: pick one source, name a product, and say <b>why that source created it</b>. e.g. Uber Eats (market-structure change), organic food (perception change), ChatGPT (new knowledge). Sri Lankan crisis = “the unexpected” and “process need” (solar, local food, digital payments).' },
    { id: 'i1-crisis', t: 'Economic crisis as a source of innovation (Sri Lankan context)', hy: 0, asked: 'Jun 2022, Nov 2023',
      notes: [
        'A crisis changes needs: fuel and import shortages push <b>solar energy, electric and shared transport, local food production, import substitution</b>; weaker rupee boosts <b>export services, tourism and IT outsourcing</b>.',
        'Positive: forces creativity, new businesses, import substitution. Negative: lower spending, brain drain, funding shortages. A balanced answer scores best.'
      ] }
  ]
},
{
  n: 2, title: 'Innovation Management Tools and Techniques', sub: 'The nine IMTs · Knowledge management · IPR · CRM · BI · Brainstorming · Mind maps · Prototyping · QFD · Simulation', src: 'slides',
  topics: [
    { id: 'i2-imt', t: 'What IMTs are', hy: 0, asked: 'Jun 2024',
      notes: [
        'Innovation does not always need the latest technology. It is more a <b>way of thinking and finding creative solutions</b> inside the company.',
        '<b>IMTs</b> = a range of tools, techniques and methodologies that help companies <b>adapt to circumstances and meet market challenges in a systematic way</b>. They are standardized and aim to improve competitiveness by focusing on knowledge.',
        '<b>The nine:</b> knowledge management, intellectual property rights, customer relationship management, business intelligence, brainstorming, mind mapping, prototyping, quality function deployment, business simulation.'
      ] },
    { id: 'i2-km-ipr', t: 'Knowledge management and Intellectual property rights', hy: 0,
      notes: [
        '<b>Knowledge management (KM):</b> creating, sharing, using and managing the knowledge and information of an organization. Dimensions: <b>tacit</b> (in people’s heads) and <b>explicit</b> (documented). Strategies: knowledge sharing, storytelling, after-action reviews, knowledge mapping, communities of practice, expert systems. Technologies: groupware, content and document management, e-learning.',
        '<b>IPR management:</b> IPR is a source of market power. Manage existing IPR and build a culture of creating new IPR. Strategic use: <b>sell, license, collaborate, donate</b>. Patent search helps find alternatives.'
      ] },
    { id: 'i2-crm-bi', t: 'Customer relationship management and Business intelligence', hy: 0,
      notes: [
        '<b>CRM:</b> gather, manage and use customer information. Customer interviews about <b>pain points</b> are the core of product development. Social media lets firms get input during idea generation.',
        '<b>BI:</b> technologies that handle large structured and unstructured data to identify new strategic opportunities (about your products and competitors). Examples: reporting, OLAP, analytics, data mining, text mining, predictive and prescriptive analytics, benchmarking.'
      ] },
    { id: 'i2-creative', t: 'Brainstorming, mind mapping and prototyping', hy: 1, asked: 'Asked in 3 papers',
      notes: [
        '<b>Brainstorming:</b> a group technique to find solutions by collecting ideas spontaneously. <b>Rules:</b> go for quantity, withhold criticism, welcome wild ideas, combine and improve ideas. Followed by <b>affinity grouping</b>.',
        '<b>Mind mapping:</b> a non-linear diagram of tasks, words and concepts arranged around a <b>central concept</b>; similar to concept maps.',
        '<b>Prototyping:</b> an early sample, model or release built to <b>test a concept</b>. Gives specifications for a real working system. <b>Rapid prototyping</b> uses 3D CAD to build a scale model quickly.'
      ] },
    { id: 'i2-qfd-sim', t: 'Quality function deployment and Business simulation', hy: 1, asked: 'Nov 2023 (HoQ)',
      notes: [
        '<b>QFD:</b> a method that transforms <b>qualitative user demands into quantitative parameters</b> and deploys the functions that form quality into sub-systems, parts and manufacturing processes. Its main tool is the <b>House of Quality</b> (Lecture 4).',
        '<b>Business simulation:</b> simulation for business training, education or analysis. <b>Process simulation</b> assesses how process performance changes over time when parameters change. <b>Marketing simulation games</b> test marketing strategy, positioning and pricing decisions without real risk.',
        '<b>Tools to prepare an organization for change (Jun 2022):</b> pick two, e.g. knowledge management (share lessons) and business simulation or prototyping (test changes safely).'
      ],
      tip: 'For “describe three IMTs” give: <b>what it is → how a business uses it → one benefit</b>, each about 2 marks.' }
  ]
},
{
  n: 3, title: 'Dynamics of Ideation and Creativity', sub: 'Ideas · Creativity · Wallas’s process · Idea generation techniques · Barriers · Opportunity', src: 'slides',
  topics: [
    { id: 'i3-ideation', t: 'Idea, ideation and creativity', hy: 0,
      notes: [
        '<b>Ideation:</b> the process of generating, developing and communicating new ideas, from the original concept to implementation. It can be done by <b>individuals, organizations or crowds</b>, and expressed in graphical, written or verbal form.',
        '<b>Creativity:</b> the ability to generate new, unique, original ideas and solutions; something new and valuable. Creativity is the building block of innovation, but the terms are not interchangeable.'
      ] },
    { id: 'i3-wallas', t: 'The creative process (Wallas, 1926)', hy: 0,
      notes: [
        'Four stages: <b>Preparation</b> (gather knowledge, understand the problem) → <b>Incubation</b> (the subconscious works on it) → <b>Illumination</b> (the sudden “aha” moment) → <b>Verification</b> (evaluate and test the idea). Later models add <b>elaboration</b>.',
        'The process uses critical thinking and problem solving.'
      ] },
    { id: 'i3-techniques', t: 'Creative idea generation techniques', hy: 1, asked: 'Nov 2022, Nov 2023',
      notes: [
        '<b>Role playing</b> (act out scenarios) · <b>Active search</b> (hunt for a solution) · <b>Attribute listing</b> (break a product into parts and recombine) · <b>Brainstorming</b> (quantity of ideas) · <b>Critique</b> (feedback on ideas) · <b>Collaboration</b> · <b>Documenting</b> · <b>Expert opinion</b> · <b>Empathy / user research</b> (observe people to build empathy) · <b>Storyboards</b>.',
        '<b>Inbound (internal) ideation:</b> brainstorming sessions, employee ideas, incentives and recognition for the best ideas.',
        '<b>Outbound ideation:</b> <b>voice of the customer</b> (ethnographic observation, contextual interviews, empathy building, customer visit teams, focus groups, <b>lead users</b>, customer brainstorming, advisory panels); <b>open innovation</b> (external idea contests, partnering with vendors, scanning start-ups, accessing external know-how, external product design); <b>miscellaneous</b> (peripheral vision, disruptive technology, patent mapping).'
      ],
      tip: 'Scenario: app for visually impaired users. Choose <b>empathy / user research</b>, <b>lead users and customer brainstorming</b>, <b>storyboards or prototypes</b> and justify each by the users’ unmet needs. Outsiders to invite: visually impaired users, accessibility experts, NGOs, caregivers.' },
    { id: 'i3-enhance', t: 'How to enhance creativity (innovative culture)', hy: 1, asked: 'Nov 2022',
      notes: [
        'Provide <b>creativity training</b> · provide <b>support and time</b> · <b>reward</b> creativity (money, praise, recognition) · <b>model</b> creative behaviour · <b>expect</b> creativity · <b>expect and tolerate failure</b> · encourage <b>curiosity</b> (“what if…”) · see problems as <b>challenges</b>.',
        'Models for a creative environment: Peter Senge (systems thinking, personal mastery, mental models, shared vision, team learning) and Khandwalla (relaxation, constructive feedback, learning opportunities).'
      ],
      tip: 'Innovation officer question: give 4 actions (training, rewards, safe-to-fail culture, time and tools) and explain <b>how each motivates employees</b>.' },
    { id: 'i3-barriers', t: 'Barriers to creativity', hy: 0,
      notes: [
        'Searching for the one “right” answer · focusing on being logical · blindly following rules · constantly being practical · becoming overly specialized · avoiding ambiguity · fearing looking foolish · fearing mistakes and failure · believing “I’m not creative”.'
      ] },
    { id: 'i3-opportunity', t: 'Opportunity and turning an idea into one', hy: 0,
      notes: [
        '<b>Opportunity</b> = a favourable set of circumstances that creates a need for a new product, service or process, with potential for new economic value. Opportunities exist in reality; the entrepreneur’s job is to identify them.',
        '<b>Idea → opportunity process:</b> <b>strategic fit</b> (the market wants it) · <b>business plan</b> · <b>team</b> · <b>leadership</b> · <b>resources</b>.'
      ] }
  ]
},
{
  n: 4, title: 'New Product Development Process', sub: 'NPD stages · Stage-Gate · House of Quality · Design thinking · Innovation sweet spot', src: 'slides',
  topics: [
    { id: 'i4-npd', t: 'New product development (NPD) and its 8 stages', hy: 0,
      notes: [
        '<b>NPD</b> = the complete process of bringing a new product to market, renewing a product or entering a new market; transforming a market opportunity into a product for sale. Cost, time and quality drive customer needs.',
        '<b>Eight stages:</b> 1 Idea generation · 2 Idea screening · 3 Concept development and testing · 4 Market strategy and business analysis (4 Ps) · 5 Feasibility study · 6 Technical design and roadmap · 7 Test marketing · 8 Market entry and commercialization.',
        'Uber example: idea in 2008 (taxi on a snowy night in Paris) → app built with Python, Node.js, Java → first ride in San Francisco in 2010 → international roll-out from Paris in Dec 2011.'
      ] },
    { id: 'i4-stagegate', t: 'Stage-Gate process', hy: 1, asked: 'Jun 2022, Jun 2024',
      notes: [
        'A value-creating business process and <b>risk model</b> that moves a project through <b>stages</b> (collect information and do work) separated by <b>gates</b> (decision points with Go / Kill / Hold / Recycle). Information gathered in each stage lowers technical uncertainty and economic risk. Each gate has quantitative and/or qualitative criteria and decides whether to fund the next stage.',
        '<b>Typical flow (Cooper, textbook):</b> Scoping → Build business case → Development → Testing and validation → Launch, with a gate before each stage. Idea screen is Gate 1.',
        '<b>Success drivers:</b> customer-driven focus, tough Go/Kill decisions (“gates with teeth”), truly cross-functional teams, a proven process. Over 80% of North American firms use some Stage-Gate model.',
        '<b>Oil-refinery question (Jun 2022):</b> Stage 1 scoping of the new crude (price, availability) → Gate: is the saving worth testing? → Stage 2 lab analysis of refinery compatibility and cost model → Gate: Go on technical and financial viability → Stage 3 trial run → Gate → Stage 4 validation of output quality, safety and environment → Gate → Stage 5 switch supply and monitor.'
      ] },
    { id: 'i4-design', t: 'Design thinking and the 5 steps', hy: 1, asked: 'Jun 2024, Nov 2024',
      notes: [
        'A human-centred product development framework: <b>1 Empathize</b> (learn about the problem from multiple perspectives) → <b>2 Define</b> (scope and true nature of the problem) → <b>3 Ideate</b> (brainstorm solutions) → <b>4 Prototype</b> (weed out unworkable ideas) → <b>5 Test</b> (get feedback). It is <b>iterative</b>.'
      ],
      table: { h: ['', 'Design thinking', 'Stage-Gate'], r: [
        ['Focus', 'Empathy with users, finding the right problem', 'Managing risk and investment across the project'],
        ['Flow', 'Iterative, loops back freely', 'Linear stages separated by formal gates'],
        ['Decision making', 'Learn through prototypes and tests', 'Go / Kill decisions by management at gates'],
        ['Best for', 'Early, uncertain, creative stages', 'Later, funded development and launch'],
        ['Together', 'Design thinking finds what to build, Stage-Gate governs how it is developed and funded', '']
      ] },
      tip: 'Uber Eats (Nov 2024): <b>Empathize</b> hungry customers and restaurants without delivery · <b>Define</b> the problem of delivering restaurant food fast · <b>Ideate</b> reuse Uber’s driver network · <b>Prototype</b> pilot in one city · <b>Test</b> and refine, then scale.' },
    { id: 'i4-hoq', t: 'House of Quality (QFD)', hy: 1, asked: 'Nov 2023',
      notes: [
        'Basic design tool of <b>QFD</b>, originated in <b>1972 at Mitsubishi’s Kobe shipyard</b>. It is a conceptual map for <b>inter-functional planning and communication</b>.',
        '<b>Steps:</b> start with the customer: <b>customer attributes (CA)</b> in the customer’s own words → weight the <b>relative importance</b> of each CA (surveys, team experience) → compare with competitors (perceptual maps) → list <b>engineering characteristics (EC)</b> that are measurable and affect customer perception → the <b>relationship matrix</b> shows how strongly each EC affects each CA → the <b>roof matrix</b> shows trade-offs between ECs → set <b>target values</b>.',
        '<b>How it helps communication:</b> the voice of the customer is carried through four linked houses (product planning → part deployment → process planning → production planning) so design, engineering, manufacturing and marketing share one view of what the customer wants.'
      ],
      tip: 'Mention <b>customer attributes → engineering characteristics → relationship matrix → roof → targets</b> in that order to collect all 6 marks.' },
    { id: 'i4-sweet', t: 'Innovation sweet spot: desirability, feasibility, viability', hy: 1, asked: 'Nov 2023',
      notes: [
        'Idea from <b>IDEO</b>: a successful innovation sits where three circles overlap.',
        '<b>Desirability</b> (are we solving the right customer pain point? nice-to-have vs must-have) · <b>Feasibility</b> (do we have the technology, skills and operations to build it?) · <b>Viability</b> (can we make a profit and sustain it, including social and environmental sustainability?).',
        '<b>Why innovations fail:</b> missing desirability (nobody wants it, e.g. Google Glass), missing feasibility (cannot be built or delivered at quality), or missing viability (cost exceeds revenue, no sustainable model).'
      ],
      tip: '“Why do innovations fail considering the sweet spot?” → one paragraph per circle, each with a failed product or start-up.' }
  ]
},
{
  n: 5, title: 'Entrepreneur and Entrepreneurship', sub: 'Stevenson’s definition · 4 risks · Characteristics and skills · Wage vs entrepreneurial employment · Danhof · Intrapreneurship', src: 'slides',
  topics: [
    { id: 'i5-define', t: 'Who is an entrepreneur? Stevenson’s definition', hy: 0, asked: 'Nov 2022, Nov 2023',
      notes: [
        '<b>“Entrepreneurship is the pursuit of opportunity beyond resources controlled”</b> (Howard Stevenson, Harvard). <b>Pursuit</b> = relentless focus and a short window of opportunity. <b>Opportunity</b> = something novel. <b>Beyond resources controlled</b> = resource constraints; founders start with only their own human, social and financial capital and often <b>bootstrap</b>.',
        '<b>Four kinds of opportunity:</b> (1) pioneering a truly innovative product, (2) devising a new business model, (3) a better or cheaper version of an existing product, (4) targeting an existing product to new customers.',
        'An <b>entrepreneur</b> perceives an opportunity and creates an organization to pursue it; one who organizes, operates and assumes the risk of a venture. <b>Entrepreneurship</b> is the process of action taken to establish the enterprise.'
      ] },
    { id: 'i5-risks', t: 'The four risks of an entrepreneur', hy: 1, asked: 'Asked in 3 papers',
      notes: [
        '<b>Demand risk:</b> will customers adopt the solution? <b>Technology risk:</b> are engineering or scientific breakthroughs needed? <b>Execution risk:</b> can the founder attract the employees and partners to deliver the plan? <b>Financing risk:</b> will external capital be available on reasonable terms?',
        'The entrepreneur’s job is to <b>manage uncertainty</b>, knowing some risks cannot be influenced.',
        '<b>Mitigation examples:</b> demand → customer interviews, MVP, pre-orders; technology → prototypes, proven tech, partners; execution → strong team, advisers, clear roles; financing → bootstrapping, staged funding, runway planning.'
      ],
      tip: 'For a tech start-up: one paragraph per risk with an app-specific example and its impact (lost customers, delays, cash running out).' },
    { id: 'i5-traits', t: 'Characteristics, skills and growth mindset', hy: 1, asked: 'Asked in 4 papers',
      notes: [
        '<b>Characteristics:</b> action oriented, highly motivated, take calculated risks, <b>unwavering determination and commitment</b>, creative and result-oriented, accept responsibility, self-confident, set goals, thinkers and doers, can foresee the future. Others: curiosity, adaptability, decisiveness, team building, risk tolerance, resilience.',
        '<b>Skills for an innovative entrepreneur:</b> basic <b>financial skills</b> · <b>networking</b> · ability to accept and <b>act on feedback</b> · <b>pattern recognition</b> · <b>strategic thinking</b> · <b>negotiation</b> · <b>growth mindset</b>.',
        '<b>Growth mindset</b> = intelligence, abilities and talents can be learned and improved. A <b>fixed mindset</b> sees them as unchangeable. Growth mindset helps entrepreneurs learn from failure, accept feedback and keep improving.',
        'Competencies (BPL1): attitude-based (growth mindset, proactivity, passion, perseverance), skills-based (negotiation, financial literacy, decision making), applied knowledge (planning, marketing, finance, technology).'
      ],
      tip: '“Can someone still be an entrepreneur if they miss a few skills?” Yes: skills can be learned, and a <b>team</b> can complement gaps (outsourcing, partners). Determination and learning ability matter most.' },
    { id: 'i5-wage', t: 'Wage employment vs entrepreneurial employment', hy: 1, asked: 'Nov 2022, Nov 2024',
      notes: [],
      table: { h: ['', 'Wage employment', 'Entrepreneurial employment'], r: [
        ['Income', 'Fixed salary', 'Profit, uncertain but unlimited'],
        ['Risk', 'Low, employer carries the risk', 'High, owner carries the risk'],
        ['Decisions', 'Follow the employer’s direction', 'Own decisions and strategy'],
        ['Wealth creation', 'Mostly earns and spends', 'Creates jobs, products and national wealth'],
        ['Resources', 'Employer provides', 'Entrepreneur mobilizes resources']
      ] },
      after: ['<b>Wealth creation for a nation:</b> entrepreneurs create new businesses and jobs, increase exports and import substitution, spread innovation, raise tax revenue and reduce unemployment and poverty. <b>Entrepreneurship vs regular employment:</b> you can be an entrepreneur as an employee through <b>intrapreneurship</b> (innovating inside the organization).'] },
    { id: 'i5-classes', t: 'Classification of entrepreneurs (Danhof, Cole)', hy: 1, asked: 'Asked in 4 papers',
      notes: [
        '<b>Clarence Danhof (4 types):</b>',
        '<b>Innovative entrepreneur:</b> introduces new products, methods or markets; bold, aggressive, takes risks. Example: <b>Merrill J. Fernando (Dilmah)</b>, who built a producer-owned tea brand.',
        '<b>Adoptive (imitative) entrepreneur:</b> does not invent but copies or adapts successful innovations from others. Example: <b>PickMe</b> applying the ride-hailing model to Sri Lanka, or Softlogic bringing established international brands and retail formats.',
        '<b>Fabian entrepreneur:</b> very cautious and sceptical; adopts a change only when failing to do so would threaten the business. Example: a traditional family shop that modernizes only when forced.',
        '<b>Drone entrepreneur:</b> refuses to change production methods even at the cost of losing the market share and profit.',
        '<b>Arthur H. Cole</b> (textbook): <b>empirical</b> (rule of thumb), <b>rational</b> (systematic and research based), <b>cognitive</b> (uses knowledge and innovates). Entrepreneurs can also be classified by activity, ownership, size, gender, motivation (necessity vs opportunity) and by <b>social entrepreneurship</b> (profit for social good).'
      ],
      tip: 'The exam asks you to <b>name Sri Lankan entrepreneurs, classify them and explain why</b>. Prepare three you can justify, and state the criterion (Danhof, Cole or motivation).' },
    { id: 'i5-intra', t: 'Intrapreneurship and social entrepreneurship', hy: 1, asked: 'Asked in 5 papers',
      notes: [
        '<b>Intrapreneurship:</b> entrepreneurial behaviour <b>inside an existing organization</b>. An employee (intrapreneur) develops new products or ventures using the organization’s resources and carries less personal risk.',
        '<b>Entrepreneur vs intrapreneur:</b> own business, personal capital and risk, independence · inside a company, company resources and risk, rewarded by salary, bonus or promotion.',
        '<b>Why it matters:</b> keeps large organizations innovative, retains talent, gives faster new product development, helps public enterprises become efficient and customer-focused. Will be a key future job skill.',
        '<b>Social entrepreneurship:</b> uses business methods to solve social problems with social impact as the main goal (profit is reinvested). In a crisis it creates jobs, serves vulnerable groups and finds local solutions.'
      ] },
    { id: 'i5-network', t: 'Networking, funding and opportunity', hy: 0, asked: 'Nov 2022, Nov 2023, Jun 2024',
      notes: [
        '<b>Networking</b> gives access to mentors, customers, partners, talent, information and <b>funding</b>. Network = co-workers, clients, business professionals, industry leaders, family and friends.',
        '<b>How to build it:</b> attend industry events and start-up meetups, join associations and online communities, use LinkedIn, find mentors, offer help first, follow up consistently, keep promises and reputation.',
        '<b>Funding sources at the start:</b> personal savings (bootstrapping), family and friends, <b>angel investors</b>, <b>venture capital</b>, bank loans, crowdfunding, grants and government schemes, incubators and accelerators. <b>To attract more funding:</b> a clear business plan and pitch, a prototype or traction, a strong team, realistic financials, a defined exit.',
        '<b>Financial acumen and networking help secure VC:</b> investors trust founders who understand numbers, and warm introductions through networks lead to meetings.'
      ] },
    { id: 'i5-myths', t: 'Entrepreneurship myths', hy: 0,
      notes: [
        'Myths: the only requirement is a good idea · big projects give better innovations · technology drives innovation success · entrepreneurs are born, not made · entrepreneurs are gamblers (they take <b>calculated</b> risks) · money is the key · it needs huge funding · you must be young (Colonel Sanders started KFC at 62) · entrepreneurs know exactly what they want · entrepreneurs are their own boss (they answer to customers, investors, employees).'
      ] }
  ]
},
{
  n: 6, title: 'Value Proposition, Business Model and Lean Canvas', sub: 'VPC · BMC (9 blocks) · Lean Canvas · Customer Factory · Traction · How to answer canvas questions', src: 'slides',
  topics: [
    { id: 'i6-vpc', t: 'Value Proposition Canvas (VPC)', hy: 1, asked: 'Asked in 5 papers',
      notes: [
        'Purpose: <b>understand the customer</b> (needs and expectations), develop a product in line with what the customer needs and wants, <b>compare your product with the user’s need</b>, find <b>product-market fit</b>, and <b>avoid producing something nobody wants</b>.',
        '<b>Customer profile (circle):</b> <b>Customer jobs</b> (what they are trying to get done), <b>Pains</b> (bad outcomes, obstacles, risks), <b>Gains</b> (outcomes and benefits they want).',
        '<b>Value map (square):</b> <b>Products and services</b>, <b>Pain relievers</b> (how you remove pains), <b>Gain creators</b> (how you create gains).',
        '<b>Fit</b> = pain relievers and gain creators match the customer’s important pains and gains.',
        '<b>Why it is a dynamic process:</b> assumptions change as you talk to customers; you iterate profile and map after each interview, survey and prototype test.',
        '<b>Benefits to a new entrepreneur:</b> focuses on real customer problems, reduces risk of building the wrong product, guides features and priorities, gives clear marketing messages, and <b>makes the business model canvas stronger</b> because the value proposition and customer segment blocks are already tested.'
      ],
      tip: 'Make a VPC by writing the <b>customer profile first</b>, then the value map. Always do it for each customer segment (Airbnb has guests and hosts).' },
    { id: 'i6-validate', t: 'Validating the VPC, customer-centric design and inventor’s bias', hy: 1, asked: 'Nov 2022, Nov 2023',
      notes: [
        '<b>Customer-centric design:</b> designing the product, service and experience around the customer’s needs and feedback from the start, rather than around what the company can make.',
        '<b>Inventor’s bias:</b> falling in love with your own solution and assuming customers want it without evidence. <b>Remove it</b> by “loving the problem”, starting with the customer profile, interviewing real customers, testing assumptions and being ready to pivot (Google Glass was a solution looking for a problem).',
        '<b>Validating the VPC:</b> checking with real evidence that the jobs, pains and gains are real and that your value map solves them. <b>Methods:</b> customer interviews (explore pains and gains in depth), surveys (measure how many share them), observation, prototypes and MVP tests, landing pages and pre-orders, A/B tests.',
        '<b>Benefits of validation:</b> less waste, clearer product-market fit, confidence for investors, fewer wrong assumptions.'
      ] },
    { id: 'i6-bmc', t: 'Business Model Canvas (9 blocks)', hy: 1, asked: 'Asked in 5 papers',
      notes: [
        '<b>Business model</b> = the rationale of how an organization <b>creates, delivers and captures value</b> (Osterwalder and Pigneur). The canvas has <b>nine building blocks</b>; the left side describes the <b>product</b>, the right side the <b>market</b>, and the <b>value proposition</b> sits in the middle.'
      ],
      table: { h: ['Block', 'Key question', 'Side'], r: [
        ['Customer segments', 'For whom are we creating value? Who are the most important customers?', 'Market'],
        ['Value propositions', 'What value do we deliver? Which customer problems do we solve? Which needs do we satisfy?', 'Centre'],
        ['Channels', 'Through which channels do customers want to be reached? Which are most cost-efficient?', 'Market'],
        ['Customer relationships', 'What type of relationship does each segment expect (self-service, personal, community, automated)?', 'Market'],
        ['Revenue streams', 'For what value are customers willing to pay? How do they pay?', 'Market'],
        ['Key resources', 'What resources do our value propositions, channels, relationships and revenues require?', 'Product'],
        ['Key activities', 'What activities do those require?', 'Product'],
        ['Key partners', 'Who are our key partners and suppliers? What do they provide or perform?', 'Product'],
        ['Cost structure', 'What are the most important costs? Which resources and activities are most expensive?', 'Product']
      ] },
      tip: 'Product-side blocks: key partners, activities, resources (and cost structure). Market-side: customer segments, channels, relationships, revenue streams (Jun 2022 Q3.V).' },
    { id: 'i6-lean', t: 'Lean Canvas vs Business Model Canvas', hy: 1, asked: 'Nov 2023',
      notes: [
        '<b>Lean Canvas</b> (Ash Maurya) adapts the BMC for <b>start-ups with high uncertainty</b>. Nine blocks (in order): <b>1 Customer segments (and early adopters) · 2 Problem (and existing alternatives) · 3 Unique value proposition (and high-level concept) · 4 Solution · 5 Channels · 6 Revenue streams · 7 Cost structure · 8 Key metrics · 9 Unfair advantage</b>.',
        '<b>What changed:</b> key partners, key activities, key resources and customer relationships are <b>replaced</b> by <b>problem, solution, key metrics and unfair advantage</b>.',
        '<b>Three reasons a Lean Canvas is more meaningful for a start-up:</b> (1) it starts with the <b>problem</b> and customer, not resources, so it validates demand first; (2) it adds <b>key metrics and traction</b> to measure learning and progress; (3) it includes an <b>unfair advantage</b> that cannot be easily copied, which investors look for. It is also faster to complete (about 20 minutes) and suits uncertain, resource-poor ventures. A BMC suits established businesses with known partners and resources.'
      ] },
    { id: 'i6-factory', t: 'Customer Factory Model, traction and the 10-step lean stack', hy: 0, asked: 'Jun 2022, Nov 2022',
      notes: [
        '<b>Customer Factory Model:</b> every business has one universal goal, <b>making happy customers</b>. Five steps: <b>1 Acquisition</b> (attract visitors) → <b>2 Activation</b> (first good experience, sign-up) → <b>3 Retention</b> (they come back) → <b>4 Revenue</b> (they pay) → <b>5 Referral</b> (they bring others).',
        '<b>Traction modelling:</b> a growth plan with milestones (problem/solution fit, product/market fit, scale) and a target such as a 10X growth model over 3 years, with a minimum success criterion (for example $10M revenue in 3 years).',
        '<b>Lean stack in 10 steps:</b> idea → existing solutions → problem → solution → market size → revenue → traction → MVP → risky assumptions → experimentation plan, with <b>validation</b> loops. It links to the <b>innovation sweet spot</b> (desirability, feasibility, viability).'
      ] },
    { id: 'i6-segments', t: 'Customer segments: why they matter and how to find them', hy: 0, asked: 'Nov 2023',
      notes: [
        '<b>Importance:</b> everything else on the canvas (value, channels, relationships, revenue) is designed around the segment; engaged customers are the foundation of any business; quality of the segment matters more than quantity.',
        '<b>How to identify and define them:</b> market research (primary and secondary), customer interviews and surveys, demographic and behavioural profiling (age, gender, location, income, occupation, education), <b>customer personas</b>, early-adopter analysis, testing with an MVP, and segmenting <b>two-sided markets</b> separately (riders vs drivers).'
      ] },
    { id: 'i6-approach', t: 'How to answer VPC and BMC case questions', hy: 1,
      notes: [
        '<b>1 Read the case once and underline facts</b> for each block (customers, offer, channels, revenue, partners, costs, activities, resources).',
        '<b>2 Draw the canvas grid</b> and write 2–4 short bullets per block using the case’s own words. Add sensible assumptions and label them.',
        '<b>3 Cover every block</b>; 35 marks are lost quickly by leaving blocks empty. For two-sided platforms split segments (guests / hosts, riders / drivers).',
        '<b>4 For a VPC</b> do the customer profile (jobs, pains, gains) then the value map (products, pain relievers, gain creators) for each segment.',
        'Worked examples for Airbnb (VPC), UFO, GTA and PickMe (BMC) and Uber (analysis) are in the Essay / canvas tab.'
      ] }
  ]
},
{
  n: 7, title: 'Business Plan and Investors', sub: 'Purpose · Sections · Mission and vision · Executive summary · Objectives · The three tests · Investors and pitching', src: 'slides',
  topics: [
    { id: 'i7-why', t: 'Why a business plan is needed and its main sections', hy: 0, asked: 'Nov 2022',
      notes: [
        '<b>Why:</b> a road map for the business, to show the bank manager, investors and employees; states the purpose clearly (“what is the question to which my business is the answer?”); helps raise <b>soft money, bank lending, investor funding</b>. The value is in the <b>thinking and research</b>, not only the document.',
        '<b>Main sections:</b> executive summary · general company description (mission, vision, goals, ownership) · products and services · <b>marketing plan</b> · <b>operational plan</b> · management and organization · startup expenses and capitalization · <b>financial plan</b> (sales forecast, profit and loss, balance sheet, cash flow) · appendices.',
        '<b>Business idea statement:</b> specific and short. “Computer support for small businesses of up to ten staff in my city” is better than “helping people with computers”.'
      ] },
    { id: 'i7-mvv', t: 'Mission, vision, values and objectives', hy: 0,
      notes: [
        '<b>Mission</b> = reason for being now: purpose, why it needs to exist, what it does, values (1–3 sentences). Toyota: “create a more prosperous society through automobile manufacturing”. Google: “organize the world’s information and make it universally accessible and useful”.',
        '<b>Vision</b> = where you will take the business in the future; paints a picture and shows ambition (Starbucks, Toyota). Example: “the most recognized national chain of Chinese takeaways in Sri Lanka by 2030”.',
        '<b>Objectives</b> = written statements of results, how and when, and should be <b>SMART</b>.',
        '<b>Values / triple bottom line:</b> profit, <b>people</b> (social) and <b>planet</b> (environment).'
      ] },
    { id: 'i7-exec', t: 'The executive summary', hy: 0,
      notes: [
        'Written <b>last, presented first</b>. Its only goal is to <b>get the reader interested without reading the full plan</b>. Keep it to about 2 pages, positive, start and end with a bold statement, use numbers, and use only information from the main plan.',
        'It answers <b>five questions</b>: <b>1</b> Is there an attractive market? <b>2</b> Does the business have the products or services to win? <b>3</b> Does it have the people to make it happen? <b>4</b> How much money will it make? <b>5</b> Where will the business go?'
      ] },
    { id: 'i7-tests', t: 'The three tests every business plan must pass', hy: 1, asked: 'Nov 2023, Nov 2024, Sample 2025',
      notes: [
        '<b>Note:</b> your lecture slides do not spell this list out. The standard list (Barringer and Ireland, textbook) is below; check it against your own notes and your group report.',
        '<b>1 Reality test:</b> is there a real market and can the product or service be built and delivered? (market opportunity and technical feasibility; evidence: market research, customer interviews, prototypes, size of market).',
        '<b>2 Competitive test:</b> can the venture build a <b>sustainable competitive advantage</b> against competitors and barriers to entry? (evidence: competitor analysis, unique value proposition, unfair advantage, niche).',
        '<b>3 Value test:</b> is the business <b>financially attractive</b> for the owners and investors? (evidence: sales forecast, profit and loss, cash flow, break-even, funding required, return on investment, exit).',
        '<b>How to justify your own plan:</b> point to the sections: market research and customer analysis (reality), competitive analysis and UVP (competitive), financial plan and cash flow (value).'
      ] },
    { id: 'i7-investors', t: 'Investors, pitching and what they investigate', hy: 1, asked: 'Asked in 5 papers',
      notes: [
        '<b>Bankers</b> want orderly repayment (loan amount, use, repayment terms, collateral). <b>Investors</b> want <b>dramatic growth and a share of the rewards</b>: funds needed now and in 2–5 years, how funds will be used, estimated return on investment, <b>exit strategy</b> (buyback, sale, IPO), % ownership given up, milestones, reporting, board involvement.',
        '<b>Four things to emphasize when pitching to VCs or angels:</b> (1) <b>the team</b> (experience, commitment); (2) <b>problem, solution and market opportunity</b> (size, growth, customer pain); (3) <b>traction and business model</b> (customers, revenue, unit economics, competitive advantage); (4) <b>financials, the ask and the exit</b> (use of funds, ROI, milestones). Explain <b>why</b> each matters to the investor’s decision and risk.',
        '<b>Areas investors investigate before investing:</b> management team and track record · market size and demand · product, technology and IP · competition and competitive advantage · business model and financial projections · legal and regulatory position · exit options. Choose three or two and give the reason: they reduce the investor’s risk and estimate return.',
        '<b>Pitch deck essentials:</b> problem · solution · product demo · market size · business model · traction · competition and advantage · go-to-market · team · financials and ask · vision and exit.',
        '<b>Funding stages and terms:</b> bootstrapping → angel investors (individuals or <b>angel networks</b>) → venture capital → growth rounds. <b>Incubators</b> support early ideas (space, mentoring); <b>accelerators</b> run fixed-term programs for faster growth, often for equity. <b>Crowdsourcing</b> gets ideas, funding or work from a crowd online.'
      ],
      tip: 'In a 8-mark “four things” question write four headed paragraphs: <b>what you emphasize → why the investor cares</b>.' },
    { id: 'i7-startup', t: 'Stages of a start-up and Google Analytics', hy: 0, asked: 'Nov 2022 (short notes)',
      notes: [
        '<b>Stages of a start-up (textbook):</b> idea and validation → pre-seed / MVP → seed and early traction → growth and scaling → maturity or exit.',
        '<b>Google Analytics:</b> a free web analytics service that tracks website and app traffic, user behaviour and conversions; used in marketing to measure channels, understand customers and improve campaigns.'
      ] }
  ]
},
{
  n: 8, title: 'Marketing Plan and Operational Plan', sub: '4 Ps and 4 Cs · Customers and personas · Competition · Channels · Promotion · Operations', src: 'slides',
  topics: [
    { id: 'i8-mix', t: '4 Ps and 4 Cs of marketing', hy: 1, asked: 'Jun 2022',
      notes: [
        'Marketing = <b>create value, communicate the value, deliver the value</b>.'
      ],
      table: { h: ['4 Ps (seller view)', '4 Cs (customer view)', 'Meaning'], r: [
        ['Product', 'Customer solution', 'Design what solves the customer’s problem, with features and benefits'],
        ['Price', 'Customer cost', 'Total cost to the customer, not just price; pricing method vs competitors'],
        ['Place', 'Convenience', 'Where and how customers can buy: retail, direct, wholesale, online'],
        ['Promotion', 'Communication', 'Two-way communication: advertising, social media, word of mouth, PR']
      ] },
      tip: 'Apply to a product for a first-time British tourist: e.g. a SIM + travel app bundle. <b>Product</b>/solution: ready-to-use data, maps, safe taxis · <b>Price</b>/cost: tourist-friendly pricing, no hidden fees · <b>Place</b>/convenience: airport kiosks and online · <b>Promotion</b>/communication: social media, hotel partnerships, English support.' },
    { id: 'i8-plan', t: 'Marketing plan components', hy: 0,
      notes: [
        '<b>Economics</b> of the industry: market size, share, trends, barriers to entry (capital, brand, regulation) and how to overcome them. <b>Product:</b> features vs <b>benefits</b>, after-sale service. <b>Customers:</b> demographic profile (age, gender, location, income, occupation, education) and <b>persona</b>. <b>Competition:</b> competitive analysis. <b>Niche</b> and <b>strategy</b>. <b>Promotion</b> and promotional budget. <b>Pricing.</b> <b>Location</b> and <b>distribution channels.</b> <b>Sales forecast</b> (best guess and worst case).',
        '<b>Customer persona:</b> a sketch of a typical buyer: age, gender, interests, location, education, goals, buying power, pain points.',
        '<b>Competitive analysis:</b> compare your firm with your three most important competitors on factors such as product, price, quality, service, reputation, location, advertising; mark strengths and weaknesses and the importance to the customer; then write your competitive advantages.'
      ] },
    { id: 'i8-channels', t: 'Marketing channels and techniques', hy: 1, asked: 'Asked in 3 papers',
      notes: [
        '<b>Channels:</b> <b>social media</b> (wide targeting) · <b>search engines / SEO</b> (long-term organic traffic) · <b>email marketing</b> (retargeting) · <b>advertising</b> · <b>affiliates and referrals</b> · <b>influencer marketing</b> (awareness, no guaranteed sales). Distribution: retail, direct (web, mail order), wholesale, own sales force, agents.',
        '<b>Lead generation techniques</b> (textbook): content marketing and blogs, SEO, social media ads, webinars and free trials, referral programs, landing pages with sign-up forms. <b>Lead nurturing:</b> email drip campaigns, personalized follow-up, retargeting ads, newsletters, discounts for first purchase.',
        '<b>Promotion and customer retention:</b> loyalty programs, discounts, personalized offers, after-sales support, community events, feedback loops, email and social engagement.'
      ] },
    { id: 'i8-ops', t: 'Operational plan', hy: 0,
      notes: [
        'Explains the <b>daily operation</b>: production (techniques, quality control, customer service, inventory control, R&amp;D), <b>location</b> (space, utilities, access, cost, hours), <b>legal environment</b> (licences, permits, zoning, insurance, trademarks and patents), <b>personnel</b>, <b>inventory</b>, <b>suppliers</b>, <b>credit policies</b> (receivables and payables ageing), and <b>management and organization</b> (CEO experience, organization chart, advisers).'
      ] }
  ]
},
{
  n: 9, title: 'Financial Planning and Cash Management', sub: 'Accounting basics · P&L · Balance sheet · Cash flow · Budget · Proforma · Cash budget', src: 'slides',
  topics: [
    { id: 'i9-plan', t: 'Why financial planning matters', hy: 0, asked: 'Jun 2024',
      notes: [
        '<b>Financial planning</b> determines how a business will afford to achieve its strategic goals. It gives a picture of the <b>funds coming in and when</b>, where funds go, how much cash is available, and the <b>projected financial position</b>; explains how obligations will be met and <b>liquidity</b> kept; and shows the plan’s objectives are financially achievable.',
        'Common mistake: failing to collect and analyze basic financial data. Planning also helps set financial targets and reward staff.',
        '<b>Three key components:</b> <b>budgeting</b> (plan income and expenses), <b>proforma financial statements</b> (projected income statement, balance sheet, cash flow) and <b>cash management</b> (cash budget, working capital). Also the sales forecast, break-even and funding plan.'
      ] },
    { id: 'i9-final', t: 'Final accounts: P&L, balance sheet, cash flow statement', hy: 1, asked: 'Nov 2022, Jun 2024',
      notes: [
        '<b>Accounting</b> = the language of business: recording, classifying, summarizing and interpreting financial information. <b>Accounting equation: Assets = Liabilities + Capital (Equity)</b>.',
        '<b>Profit and loss account (income statement):</b> income and expenses over a period. Turnover − cost of sales = <b>gross profit</b>; − operating expenses (admin, rent, interest, depreciation) = <b>net profit</b>. It measures profitability, not cash.',
        '<b>Balance sheet:</b> a <b>snapshot</b> of assets, liabilities and shareholder equity at a point in time. Assets (short-term: cash, receivables; long-term: property, plant, equipment) = liabilities (payables, loans) + equity (including retained earnings).',
        '<b>Cash flow statement:</b> cash entering and leaving the business over a period, in three parts: <b>operating, investing, financing</b> activities. Methods: direct and indirect. It shows liquidity and the ability to pay debts and expenses.'
      ],
      tip: 'Profit is not cash: a business can be profitable on paper and still fail because customers pay late. Say this in any cash flow answer.' },
    { id: 'i9-budget', t: 'Budgeting and proforma statements', hy: 0, asked: 'Jun 2024',
      notes: [
        '<b>Budget:</b> an estimate of revenue and expenses over a future period (normally a year). It is a financial plan, creates discipline, helps spot probable losses early and is built on stated assumptions.',
        '<b>Proforma financial statements:</b> projected income statement, balance sheet and cash flow statement based on <b>assumptions about future events</b>, used in investment and loan proposals. Lenders look at the proforma balance sheet for the <b>debt-to-equity ratio</b>. Weakness: assumptions may prove inaccurate.',
        'Proforma cash flow can be short-term (weeks, accurate), medium-term and long-term (budgeted revenues, less accurate).'
      ] },
    { id: 'i9-cash', t: 'Cash management: cash budget and cash flow', hy: 1, asked: 'Nov 2022, Nov 2023, Jun 2024',
      notes: [
        '<b>Profit vs cash:</b> profit = revenue − expenses; cash is money free and readily available. Cash flow measures <b>liquidity and ability to pay bills</b>. Cash is important because it pays suppliers, wages and loans; most start-ups fail from running out of cash, not lack of ideas.',
        '<b>Cash budget:</b> a “cash map” showing the amount and <b>timing</b> of cash receipts and cash disbursements and the resulting cash balance. <b>How to prepare:</b> 1 set a <b>minimum cash balance</b> · 2 <b>forecast sales</b> · 3 forecast <b>cash receipts</b> (consider credit terms) · 4 forecast <b>cash disbursements</b> · 5 estimate the <b>end-of-month cash balance</b> and plan borrowing or investing the surplus.',
        '<b>Benefits:</b> speed up cash coming in, slow down cash going out, use cash efficiently, take cash discounts, finance seasonal needs.',
        '<b>Documents to include in a business plan:</b> cash flow statement, cash budget, profit and loss (income) statement, balance sheet, break-even analysis, start-up cost budget. Justify: investors and banks need proof the business can pay its way.'
      ] },
    { id: 'i9-book', t: 'Bookkeeping basics', hy: 0,
      notes: [
        'Bookkeeping records transactions; accounting interprets them. <b>Assets</b> are what you own, <b>liabilities</b> what you owe. <b>Accounts receivable (debtors)</b> owe you; <b>accounts payable (creditors)</b> you owe. Every transaction affects at least two items (double entry) so the accounting equation always balances. Users of accounts: owners, managers, investors, banks, tax authorities, suppliers.'
      ] }
  ]
}
];
