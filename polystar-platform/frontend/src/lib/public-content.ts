export type GalleryItem = {
  title: string;
  description: string;
  image: string;
};

export type PublicPageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  intro: string;
  highlights: string[];
  capabilities: Array<{ title: string; text: string }>;
  process: string[];
  outcomes: string[];
  ctaTitle: string;
  ctaText: string;
};

export type ProjectDetail = {
  slug: string;
  title: string;
  sector: string;
  summary: string;
  overview: string;
  features: string[];
  technologies: string[];
  benefits: string[];
  results: string[];
  gallery: GalleryItem[];
};

export type PortfolioItem = {
  slug: string;
  title: string;
  category: string;
  sector: string;
  summary: string;
  description: string;
  services: string[];
  technologies: string[];
  impact: string[];
  tags: string[];
  gallery: GalleryItem[];
  relatedProjectSlug?: string;
};

export type BlogArticle = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  author: string;
  heroImage: string;
  sections: Array<{ heading: string; body: string }>;
};

const technologyImage = "/images/technology-showcase.svg";
const industrialImage = "/images/hero-industrial.svg";

export const industryImages = [
  {
    title: "Engineering Systems",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=82",
    alt: "Engineers reviewing industrial infrastructure drawings on site"
  },
  {
    title: "Embedded Technology",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=82",
    alt: "Close view of advanced electronic circuit boards for embedded systems"
  },
  {
    title: "Industrial Systems",
    category: "Industrial systems",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=82",
    alt: "Industrial engineer inspecting automated production equipment"
  },
  {
    title: "Infrastructure Delivery",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=82",
    alt: "Modern infrastructure environment prepared for smart monitoring systems"
  },
  {
    title: "Software Development",
    category: "Software development",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=82",
    alt: "Technical team collaborating on software development workstations"
  },
  {
    title: "Data Systems",
    category: "Data systems",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=82",
    alt: "Operational analytics dashboards used for data system monitoring"
  },
  {
    title: "Cloud Operations",
    category: "Cloud systems",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=82",
    alt: "Server racks supporting cloud infrastructure and connected platforms"
  },
  {
    title: "Technical Teams",
    category: "Technical teams",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=82",
    alt: "Professional technical team planning engineering delivery"
  }
] as const;

export const teamMembers = [
  {
    name: "Eng. Amani Niyoyita",
    role: "Managing Director",
    group: "Leadership",
    summary: "Leads company strategy, technical partnerships, and multidisciplinary engineering delivery."
  },
  {
    name: "Automation Engineering Lead",
    role: "Controls and IIoT",
    group: "Engineering",
    summary: "Coordinates automation, embedded systems, telemetry, and field integration programs."
  },
  {
    name: "Operations Coordinator",
    role: "Delivery and Support",
    group: "Operations",
    summary: "Aligns project schedules, documentation, procurement, commissioning, and client follow-up."
  },
  {
    name: "Technical Consulting Lead",
    role: "Advisory and Training",
    group: "Consulting",
    summary: "Supports feasibility studies, technical audits, training design, and implementation planning."
  }
] as const;

export const publicPageContent: PublicPageContent[] = [
  {
    slug: "about",
    eyebrow: "Company",
    title: "POLYSTAR NANOTECH LTD",
    summary: "Engineering Smart Solutions for Industry, Infrastructure & Innovation.",
    intro:
      "POLYSTAR Nanotech Ltd is a multidisciplinary engineering company based in Kigali, Rwanda, delivering automation, embedded systems, Industrial IoT, electrical engineering, software, AI solutions, consultancy, and technical training for organizations that need reliable technology in the field.",
    highlights: [
      "Integrated hardware, software, electrical, and data capability",
      "Field-aware delivery for industrial and infrastructure environments",
      "Practical documentation, commissioning, and operational handover"
    ],
    capabilities: [
      { title: "Engineering Discipline", text: "Requirements, architecture, delivery controls, and validation are handled with the accountability expected on industrial projects." },
      { title: "Local Presence", text: "A Rwanda-based team supports site assessments, commissioning, training, and long-term technical improvement." },
      { title: "Innovation Mindset", text: "Prototype development and applied research are connected to real deployment paths, not left as isolated experiments." }
    ],
    process: ["Discover operational requirements", "Design the technical architecture", "Build and integrate systems", "Commission, train, and support"],
    outcomes: ["Safer operations", "Better asset visibility", "Maintainable software", "Technology transfer"],
    ctaTitle: "Build with a technical partner that understands the site and the system.",
    ctaText: "Talk to POLYSTAR about a new automation, IoT, infrastructure, software, or training initiative."
  },
  {
    slug: "services",
    eyebrow: "Services",
    title: "Engineering services for connected industry and smart infrastructure.",
    summary: "Automation, embedded systems, Industrial IoT, electrical engineering, smart infrastructure, software, AI, consultancy, and training.",
    intro:
      "POLYSTAR combines controls engineering, electronics, cloud platforms, data systems, and field delivery into complete solutions for utilities, manufacturers, agriculture, buildings, education, and public infrastructure.",
    highlights: [
      "Industrial automation, PLC, SCADA, instrumentation, and commissioning",
      "Embedded systems, firmware, sensors, edge devices, and product engineering",
      "Industrial IoT platforms, dashboards, analytics, alerts, and reporting"
    ],
    capabilities: [
      { title: "Industrial Automation", text: "Control panels, PLC logic, SCADA interfaces, instrumentation, process monitoring, and plant modernization." },
      { title: "Embedded & IoT", text: "Custom electronics, firmware, telemetry gateways, smart meters, sensor networks, and remote monitoring." },
      { title: "Software & AI", text: "Web platforms, portals, APIs, analytics, workflow automation, AI-assisted insights, and enterprise integrations." },
      { title: "Electrical Engineering", text: "Electrical design, diagnostics, panels, protection, installation support, and safety-focused documentation." }
    ],
    process: ["Technical audit", "Solution design", "Implementation", "Testing and commissioning", "Support and optimization"],
    outcomes: ["Operational visibility", "Reduced manual work", "Reliable reporting", "Scalable architecture"],
    ctaTitle: "Turn technical requirements into a working system.",
    ctaText: "Request a consultation for automation, IoT, electrical, software, or AI solution delivery."
  },
  {
    slug: "projects",
    eyebrow: "Projects",
    title: "Applied engineering projects with measurable operational value.",
    summary: "Featured work across AgriTech, smart metering, identity systems, facility workflows, and production equipment.",
    intro:
      "POLYSTAR project work connects product thinking with practical engineering execution, from prototypes and field pilots to production-ready software and equipment systems.",
    highlights: ["AGROMETER", "Smart Water Meter", "Visitor Management System", "RFID Attendance System", "Fish Feed Drying Machine"],
    capabilities: [
      { title: "Systems Engineering", text: "Requirements, electronics, software, field deployment, and user workflows are designed together." },
      { title: "Operational Data", text: "Projects prioritize measurable outputs such as readings, reports, events, alerts, and service records." },
      { title: "Maintainability", text: "Documentation, modular architecture, and support handover are planned from the beginning." }
    ],
    process: ["Problem definition", "Prototype and validation", "Pilot deployment", "Production hardening"],
    outcomes: ["Faster decisions", "Stronger traceability", "Improved service response", "Lower manual administration"],
    ctaTitle: "Review POLYSTAR project capabilities.",
    ctaText: "Explore the featured project pages or start a technical discussion with our engineering team."
  },
  {
    slug: "portfolio",
    eyebrow: "Portfolio",
    title: "A portfolio spanning automation, software, IoT, electrical systems, and research.",
    summary: "Selected work organized by category, sector, technology, and impact.",
    intro:
      "The POLYSTAR portfolio demonstrates how field engineering, software platforms, embedded systems, and data services can be combined into practical solutions for industry and infrastructure.",
    highlights: ["Automation", "Industrial IoT", "Software Platforms", "Smart Infrastructure", "Training"],
    capabilities: [
      { title: "Searchable Work", text: "Portfolio items can be explored by category, sector, technology, and solution theme." },
      { title: "Detailed Case Views", text: "Each item documents the problem, service mix, technical stack, gallery, and impact." },
      { title: "Reusable Delivery Patterns", text: "The work informs repeatable architectures for future projects and client programs." }
    ],
    process: ["Filter by domain", "Inspect the solution", "Review impact", "Start a related project"],
    outcomes: ["Clear capabilities", "Better procurement conversations", "Evidence-led decisions"],
    ctaTitle: "Find a portfolio reference for your project.",
    ctaText: "Browse the portfolio and contact POLYSTAR for a tailored engineering proposal."
  },
  {
    slug: "research-innovation",
    eyebrow: "Research & Innovation",
    title: "Prototype, validate, and scale applied engineering innovation.",
    summary: "Product research, pilots, technical feasibility, smart infrastructure concepts, and industry-focused R&D.",
    intro:
      "POLYSTAR supports organizations that need to move from technical ideas to tested systems. The innovation practice covers early architecture, prototype development, laboratory validation, field pilots, and deployment planning.",
    highlights: [
      "AgriTech and smart metering product research",
      "Embedded sensing, telemetry, and edge computing prototypes",
      "AI-assisted analytics for industrial and infrastructure decisions"
    ],
    capabilities: [
      { title: "Feasibility Studies", text: "Assess technical viability, cost drivers, operating constraints, and delivery risk before large investment." },
      { title: "Prototype Engineering", text: "Build testable hardware, firmware, software, and data flows with measurable validation criteria." },
      { title: "Pilot Programs", text: "Deploy controlled field trials, capture feedback, and prepare production-ready improvements." }
    ],
    process: ["Research brief", "Architecture and prototype", "Validation", "Pilot and scale plan"],
    outcomes: ["Reduced R&D risk", "Clearer product direction", "Evidence for investment", "Deployable technology"],
    ctaTitle: "Move your innovation program from idea to field evidence.",
    ctaText: "Request a research and innovation consultation with POLYSTAR."
  },
  {
    slug: "software-development",
    eyebrow: "Software Development",
    title: "Secure platforms for engineering operations, clients, data, and decision-making.",
    summary: "Dashboards, portals, APIs, analytics, IoT applications, workflow systems, and AI-enabled business tools.",
    intro:
      "POLYSTAR builds software that supports technical operations: admin dashboards, client portals, asset tracking, API integrations, reporting systems, telemetry applications, and analytics workflows.",
    highlights: [
      "Admin and client portals with role-based access",
      "API-first architecture for integrations and mobile-ready workflows",
      "Analytics dashboards for projects, support, assets, and operations"
    ],
    capabilities: [
      { title: "Web Platforms", text: "Full-stack applications for internal teams, clients, field teams, and management reporting." },
      { title: "IoT Software", text: "Telemetry ingestion, device dashboards, alerting, reporting, and data visualization for connected equipment." },
      { title: "AI Solutions", text: "Decision-support tools, classification workflows, automated reporting, and operational insight assistants." }
    ],
    process: ["Workflow mapping", "Architecture", "Agile delivery", "Security review", "Launch and support"],
    outcomes: ["Single source of truth", "Faster reporting", "Improved client service", "Scalable operations"],
    ctaTitle: "Build software that understands engineering operations.",
    ctaText: "Discuss your platform, portal, API, analytics, or AI solution requirement."
  },
  {
    slug: "training-programs",
    eyebrow: "Training",
    title: "Practical technical training for industry, infrastructure, and innovation teams.",
    summary: "Hands-on programs in automation, embedded systems, Industrial IoT, electrical systems, software, AI, and engineering practice.",
    intro:
      "POLYSTAR training programs help professionals, students, operators, and technical teams build applicable skills through practical labs, field-aware examples, project work, and mentorship.",
    highlights: [
      "Industrial automation and PLC/SCADA fundamentals",
      "Embedded systems, sensors, firmware, and IoT prototyping",
      "Software development, dashboards, APIs, and AI workflows"
    ],
    capabilities: [
      { title: "Industry Workshops", text: "Short courses for operational teams that need practical upskilling tied to current equipment and workflows." },
      { title: "University Programs", text: "Structured training for students and labs focused on electronics, controls, IoT, and software engineering." },
      { title: "Corporate Programs", text: "Custom curricula for organizations modernizing operations, data systems, maintenance, and technical delivery." }
    ],
    process: ["Skills assessment", "Curriculum design", "Hands-on labs", "Project assessment", "Certification support"],
    outcomes: ["Practical capability", "Better maintenance culture", "Stronger engineering teams", "Local talent development"],
    ctaTitle: "Train teams for the systems they actually operate.",
    ctaText: "Ask POLYSTAR to design a training program for your organization."
  },
  {
    slug: "contact",
    eyebrow: "Contact",
    title: "Start a technical conversation with POLYSTAR.",
    summary: "Reach POLYSTAR Nanotech Ltd in Kigali, Rwanda for engineering services, partnerships, quotations, support, and training.",
    intro:
      "Use the contact form to describe your requirement. The POLYSTAR team can support early technical scoping, quotation preparation, site visits, project planning, and partnership discussions.",
    highlights: ["Kigali, Rwanda", "info@polystar.rw", "+250781990307"],
    capabilities: [
      { title: "Consultation", text: "Clarify project scope, technical risks, integration needs, and realistic delivery pathways." },
      { title: "Quotation", text: "Request pricing for automation, IoT, electrical, software, training, or consultancy work." },
      { title: "Site Visit", text: "Schedule a field assessment for facilities, infrastructure assets, equipment, or operational workflows." }
    ],
    process: ["Submit request", "Technical review", "Follow-up discussion", "Proposal or next action"],
    outcomes: ["Clear scope", "Better planning", "Fast technical response"],
    ctaTitle: "Tell us what you are building or improving.",
    ctaText: "POLYSTAR will review your request and respond with the right next step."
  }
];

export const projects: ProjectDetail[] = [
  {
    slug: "agrometer",
    title: "AGROMETER",
    sector: "AgriTech and field measurement",
    summary: "A smart agricultural measurement platform for field data capture, productivity tracking, and evidence-based farm decisions.",
    overview:
      "AGROMETER brings measurement discipline to agricultural operations by combining sensor-ready data capture, field records, dashboards, and reporting workflows. It is designed for teams that need reliable agricultural insight without losing sight of rugged field conditions.",
    features: ["Field measurement records", "Device-ready telemetry model", "Farmer and plot profiles", "Operational dashboards", "Exportable reports", "Offline-aware workflow planning"],
    technologies: ["Embedded sensing", "Industrial IoT", "REST APIs", "Data dashboards", "Role-based access", "Cloud database"],
    benefits: ["Improves agricultural traceability", "Reduces manual record gaps", "Supports productivity decisions", "Creates structured evidence for partners and programs"],
    results: ["Defined a scalable AgriTech product architecture", "Prepared data flows for field pilots", "Established reporting patterns for operational teams"],
    gallery: [
      { title: "Field Data Model", description: "Structured records for plots, readings, devices, and operational events.", image: technologyImage },
      { title: "Analytics Dashboard", description: "Views for trend analysis, reports, and program monitoring.", image: industrialImage },
      { title: "Device Integration", description: "Sensor-ready architecture for connected agricultural measurements.", image: technologyImage }
    ]
  },
  {
    slug: "smart-water-meter",
    title: "Smart Water Meter",
    sector: "Smart infrastructure",
    summary: "Connected water usage monitoring with telemetry, alerts, and analytics for utilities, facilities, and infrastructure operators.",
    overview:
      "The Smart Water Meter project focuses on improving visibility into water consumption, leaks, service patterns, and operational performance through connected metering and reporting systems.",
    features: ["Usage telemetry", "Leak and anomaly alerts", "Customer or asset profiles", "Dashboard reporting", "Maintenance event tracking", "API-ready data access"],
    technologies: ["Smart metering", "Telemetry gateways", "Embedded firmware", "Cloud APIs", "Analytics dashboards", "Secure authentication"],
    benefits: ["Improves water accountability", "Accelerates maintenance response", "Supports billing and reporting workflows", "Reduces manual meter reading effort"],
    results: ["Created a deployable connected metering concept", "Mapped operational data requirements", "Established a dashboard-ready reporting structure"],
    gallery: [
      { title: "Meter Telemetry", description: "Water consumption data prepared for dashboards and alerts.", image: technologyImage },
      { title: "Utility Dashboard", description: "Operational visibility for service teams and management.", image: industrialImage },
      { title: "Maintenance Records", description: "Events and issues connected to specific assets and locations.", image: technologyImage }
    ]
  },
  {
    slug: "visitor-management-system",
    title: "Visitor Management System",
    sector: "Enterprise security and workflow software",
    summary: "A secure visitor registration and approval platform for organizations that need controlled access and audit-ready records.",
    overview:
      "The Visitor Management System digitizes front-desk workflows, visitor approvals, host notifications, access logs, and reporting so facilities can improve security without slowing down reception operations.",
    features: ["Visitor pre-registration", "Check-in and check-out logs", "Host and department records", "Approval workflow", "Visit history reports", "Role-based administration"],
    technologies: ["Next.js", "Node.js APIs", "MongoDB", "RBAC", "Notification workflows", "Cloud deployment"],
    benefits: ["Strengthens access traceability", "Reduces paper-based records", "Improves reception efficiency", "Supports audit and security reviews"],
    results: ["Designed an end-to-end visitor workflow", "Prepared secure dashboard patterns", "Connected records to reporting and administrative oversight"],
    gallery: [
      { title: "Reception Workflow", description: "Fast visitor intake, host selection, and visit purpose capture.", image: technologyImage },
      { title: "Security Reporting", description: "Searchable records for visits, approvals, and history.", image: industrialImage },
      { title: "Admin Controls", description: "Configurable roles and facility settings for controlled access.", image: technologyImage }
    ]
  },
  {
    slug: "rfid-attendance-system",
    title: "RFID Attendance System",
    sector: "Identity and attendance automation",
    summary: "RFID-based attendance automation for schools, companies, training centers, and controlled facilities.",
    overview:
      "The RFID Attendance System replaces manual attendance routines with card-based identification, device event capture, dashboards, and reports for administrators and managers.",
    features: ["RFID card enrollment", "Attendance event capture", "User and group management", "Daily and monthly reports", "Exception tracking", "Exportable attendance data"],
    technologies: ["RFID readers", "Embedded integration", "API services", "Database reporting", "Admin dashboards", "Access control patterns"],
    benefits: ["Reduces manual attendance effort", "Improves record accuracy", "Provides faster reporting", "Supports schools and organizations with repeatable workflows"],
    results: ["Defined a practical identity automation architecture", "Prepared dashboard and reporting views", "Mapped device events to user records"],
    gallery: [
      { title: "RFID Event Capture", description: "Card scans mapped to authenticated attendance records.", image: technologyImage },
      { title: "Attendance Reports", description: "Daily, monthly, and exception reports for administrators.", image: industrialImage },
      { title: "User Enrollment", description: "Structured profiles and card assignments for reliable operations.", image: technologyImage }
    ]
  },
  {
    slug: "fish-feed-drying-machine",
    title: "Fish Feed Drying Machine",
    sector: "Industrial equipment and aquaculture",
    summary: "A production-support machine concept combining mechanical, electrical, and control engineering for fish feed drying.",
    overview:
      "The Fish Feed Drying Machine supports aquaculture production by focusing on controlled drying, equipment reliability, operator workflow, and maintainable electrical and control systems.",
    features: ["Controlled drying workflow", "Temperature and timing control", "Operator-friendly controls", "Electrical protection planning", "Maintenance access", "Production documentation"],
    technologies: ["Electrical panels", "Control logic", "Sensors", "Mechanical integration", "Operator interface", "Safety documentation"],
    benefits: ["Improves product consistency", "Reduces manual drying uncertainty", "Supports local production capacity", "Creates a path for equipment modernization"],
    results: ["Mapped production and control requirements", "Prepared equipment architecture", "Aligned machine design with operator and maintenance needs"],
    gallery: [
      { title: "Machine Control", description: "Control logic for temperature, timing, and operating modes.", image: technologyImage },
      { title: "Production Workflow", description: "Drying process planning for consistent aquaculture feed output.", image: industrialImage },
      { title: "Electrical System", description: "Panel, protection, and wiring concepts for dependable operation.", image: technologyImage }
    ]
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "industrial-iot-monitoring",
    title: "Industrial IoT Monitoring Platform",
    category: "Industrial IoT",
    sector: "Utilities and facilities",
    summary: "Telemetry dashboards, device status, alerts, and reporting for connected assets.",
    description: "A reusable platform pattern for organizations that need to collect field readings, monitor equipment, and turn operational data into useful decisions.",
    services: ["Industrial IoT", "Software Development", "Analytics", "Consultancy"],
    technologies: ["Telemetry APIs", "MongoDB", "Dashboards", "Alerts", "Cloud deployment"],
    impact: ["Improved asset visibility", "Faster issue detection", "Operational reports available from one workspace"],
    tags: ["IoT", "Dashboards", "Telemetry", "Analytics"],
    gallery: [
      { title: "Device Overview", description: "Asset status and telemetry streams organized for operations teams.", image: technologyImage },
      { title: "Alerting", description: "Threshold-based events and service follow-up workflows.", image: industrialImage }
    ],
    relatedProjectSlug: "smart-water-meter"
  },
  {
    slug: "automation-control-modernization",
    title: "Automation Control Modernization",
    category: "Automation",
    sector: "Manufacturing",
    summary: "PLC, SCADA, instrumentation, and commissioning support for industrial operations.",
    description: "A modernization service model for plants that need safer control logic, clearer operator interfaces, and maintainable documentation.",
    services: ["Industrial Automation", "Electrical Engineering", "Commissioning"],
    technologies: ["PLC", "SCADA", "Instrumentation", "Panels", "Control documentation"],
    impact: ["More reliable control workflows", "Cleaner maintenance handover", "Reduced operational ambiguity"],
    tags: ["PLC", "SCADA", "Controls", "Electrical"],
    gallery: [
      { title: "Control Architecture", description: "Controls, panels, sensors, and operator interfaces planned as one system.", image: industrialImage },
      { title: "Commissioning Pack", description: "Documentation and tests prepared for accountable field delivery.", image: technologyImage }
    ]
  },
  {
    slug: "secure-facility-workflows",
    title: "Secure Facility Workflow Systems",
    category: "Software",
    sector: "Enterprise operations",
    summary: "Visitor, attendance, document, and support workflows for controlled organizations.",
    description: "A software platform pattern for organizations that need audit-ready records, RBAC, dashboards, and structured operational processes.",
    services: ["Software Development", "Identity Systems", "Support Workflows"],
    technologies: ["Next.js", "Node.js", "MongoDB", "JWT", "RBAC"],
    impact: ["Reduced manual records", "Improved accountability", "Management visibility across daily operations"],
    tags: ["RBAC", "Portal", "Identity", "Workflow"],
    gallery: [
      { title: "Visitor Controls", description: "Registration, approval, and history for secure front-desk operations.", image: technologyImage },
      { title: "Attendance Automation", description: "RFID event capture connected to dashboards and reports.", image: industrialImage }
    ],
    relatedProjectSlug: "visitor-management-system"
  },
  {
    slug: "agritech-product-engineering",
    title: "AgriTech Product Engineering",
    category: "Research",
    sector: "Agriculture",
    summary: "Field measurement products, data flows, and reporting systems for agricultural programs.",
    description: "An innovation track for agricultural organizations that need practical field data, device readiness, and reports that support program decisions.",
    services: ["Embedded Systems", "Industrial IoT", "Research & Innovation", "Software Development"],
    technologies: ["Sensors", "Firmware", "Data dashboards", "APIs", "Cloud database"],
    impact: ["Structured field evidence", "Better program reporting", "Scalable product roadmap"],
    tags: ["AgriTech", "Embedded", "Field Data", "Research"],
    gallery: [
      { title: "Field Records", description: "Plot, reading, and device models prepared for repeatable data collection.", image: technologyImage },
      { title: "Program Dashboard", description: "Views for teams managing agricultural performance and field activity.", image: industrialImage }
    ],
    relatedProjectSlug: "agrometer"
  },
  {
    slug: "technical-training-labs",
    title: "Technical Training Labs",
    category: "Training",
    sector: "Education and workforce development",
    summary: "Practical training programs for automation, embedded systems, IoT, software, and AI.",
    description: "Hands-on curricula and lab programs that help teams build skills they can apply directly to industrial and infrastructure systems.",
    services: ["Training", "Consultancy", "Embedded Systems", "Software Development"],
    technologies: ["PLC labs", "IoT kits", "API projects", "Dashboards", "AI workflows"],
    impact: ["Better technical confidence", "Applied project experience", "Stronger local engineering capacity"],
    tags: ["Training", "Labs", "Upskilling", "Workforce"],
    gallery: [
      { title: "Hands-on Labs", description: "Structured exercises for electronics, control, IoT, and software teams.", image: technologyImage },
      { title: "Project Assessment", description: "Learners complete practical outputs tied to real engineering needs.", image: industrialImage }
    ]
  }
];

export const blogArticles: BlogArticle[] = [
  {
    slug: "industrial-iot-for-operational-visibility",
    title: "Industrial IoT for Operational Visibility",
    category: "Industrial IoT",
    tags: ["Industrial IoT", "Telemetry", "Dashboards"],
    excerpt: "How connected assets, telemetry, alerts, and dashboards help industrial teams move from delayed reporting to live operational awareness.",
    publishedAt: "2026-05-20",
    readingTime: "5 min read",
    author: "POLYSTAR Engineering Team",
    heroImage: technologyImage,
    sections: [
      { heading: "Why visibility matters", body: "Industrial teams make better decisions when equipment status, production events, and field readings are available early enough to act. Industrial IoT creates a structured path from physical assets to operational dashboards." },
      { heading: "Start with the asset model", body: "Successful IoT programs define assets, readings, thresholds, events, ownership, and service workflows before choosing hardware. This keeps the data useful after installation." },
      { heading: "Design for support", body: "Telemetry systems should include clear alarms, logs, device health, user roles, and maintenance records so operations teams can trust the platform over time." }
    ]
  },
  {
    slug: "smart-cities-need-maintainable-infrastructure-data",
    title: "Smart Cities Need Maintainable Infrastructure Data",
    category: "Smart Cities",
    tags: ["Smart Infrastructure", "Water", "Energy"],
    excerpt: "Smart infrastructure succeeds when sensors, software, maintenance teams, and public service goals are designed as one operating system.",
    publishedAt: "2026-05-14",
    readingTime: "4 min read",
    author: "POLYSTAR Engineering Team",
    heroImage: industrialImage,
    sections: [
      { heading: "Beyond sensors", body: "A smart city project is not only a sensor deployment. It is a service model that connects assets, alerts, teams, reports, budgets, and citizen outcomes." },
      { heading: "Data quality is infrastructure", body: "Reliable naming, validation, calibration, and ownership are essential. Without them, dashboards become decorative instead of operational." },
      { heading: "Local capacity matters", body: "Training and documentation help infrastructure teams maintain systems locally and improve them as needs evolve." }
    ]
  },
  {
    slug: "embedded-systems-turn-products-into-platforms",
    title: "Embedded Systems Turn Products into Platforms",
    category: "Embedded Systems",
    tags: ["Firmware", "Sensors", "Product Engineering"],
    excerpt: "Firmware, electronics, sensors, and edge design shape whether a product can be monitored, updated, supported, and scaled.",
    publishedAt: "2026-05-08",
    readingTime: "5 min read",
    author: "POLYSTAR Engineering Team",
    heroImage: technologyImage,
    sections: [
      { heading: "Product behavior starts at the edge", body: "Embedded systems define how products sense, compute, communicate, and protect themselves. Good firmware turns raw hardware into dependable field equipment." },
      { heading: "Plan the data path", body: "Device data should be designed with dashboards, reports, diagnostics, and service workflows in mind. This makes future software integration easier." },
      { heading: "Prototype with production in mind", body: "Prototypes should test real constraints: power, enclosure, connectivity, calibration, security, and maintenance." }
    ]
  },
  {
    slug: "ai-in-industry-is-a-workflow-problem",
    title: "AI in Industry Is a Workflow Problem",
    category: "AI Solutions",
    tags: ["AI", "Analytics", "Operations"],
    excerpt: "The strongest AI solutions in industry are built around decisions, data quality, operator trust, and measurable workflows.",
    publishedAt: "2026-05-01",
    readingTime: "4 min read",
    author: "POLYSTAR Engineering Team",
    heroImage: industrialImage,
    sections: [
      { heading: "Start with the decision", body: "AI projects should begin by identifying the decision to improve, the user who makes it, and the evidence needed to trust the output." },
      { heading: "Connect AI to operations", body: "Recommendations, classifications, and forecasts become valuable when they fit into maintenance, quality, reporting, or customer-service workflows." },
      { heading: "Govern the data", body: "Industrial AI needs clean records, permissions, monitoring, and feedback loops so teams can improve models responsibly." }
    ]
  },
  {
    slug: "engineering-innovation-in-rwanda",
    title: "Engineering Innovation in Rwanda",
    category: "Innovation",
    tags: ["Rwanda", "Engineering", "Training"],
    excerpt: "Rwanda's growing technology ecosystem can benefit from engineering companies that connect local talent, applied research, and deployable systems.",
    publishedAt: "2026-04-24",
    readingTime: "5 min read",
    author: "POLYSTAR Engineering Team",
    heroImage: technologyImage,
    sections: [
      { heading: "Innovation needs deployment paths", body: "Research ideas become valuable when teams can prototype, validate, manufacture or integrate, train users, and support systems after launch." },
      { heading: "Industry and education can reinforce each other", body: "Hands-on training, university collaboration, and industry projects help build the technical confidence needed for local innovation." },
      { heading: "Engineering companies can bridge domains", body: "Automation, embedded systems, software, AI, and electrical engineering are strongest when delivered as coordinated capabilities." }
    ]
  }
];

export function getPublicPageContent(slug: string) {
  return publicPageContent.find((page) => page.slug === slug);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getPortfolioItem(slug: string) {
  return portfolioItems.find((item) => item.slug === slug);
}

export function getBlogArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}
