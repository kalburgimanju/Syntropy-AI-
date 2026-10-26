import { CoachingService, Booking, ClientProfile } from '../types/coaching';

export const INITIAL_SERVICES: CoachingService[] = [
  {
    id: 'exec-ai-strategy',
    title: 'Executive AI Transformation & Strategy',
    category: 'executive',
    subtitle: 'Strategic roadmap, team enablement, vendor selection & enterprise governance',
    tagline: 'Equip leadership to convert AI capabilities into defensible market advantage',
    description: 'Designed for CEOs, CTOs, and Vice Presidents navigating foundational enterprise AI adoption. We bridge technical architecture with executive capital allocation, establishing clear ROI benchmarks and risk guardrails.',
    targetAudience: 'Founders, C-Suite, Business Unit Leaders, VP Engineering',
    deliverables: [
      'Comprehensive 90-Day Enterprise AI Roadmap',
      'AI Governance & Data Privacy Security Charter',
      'Vendor & Model Selection Evaluation Matrix',
      'Executive AI Decision Framework & Team Upskilling Playbook'
    ],
    curriculum: [
      {
        title: 'Strategic Leverage & Model Portfolio Design',
        description: 'Assessing build vs. buy, open-weight vs. frontier closed APIs, and cost-to-performance frontiers.'
      },
      {
        title: 'Security, Compliance & IP Boundaries',
        description: 'Establishing airtight corporate boundaries, zero-data-retention agreements, and regulatory guardrails.'
      },
      {
        title: 'Operational Enablement & Cultural Adoption',
        description: 'Structuring internal AI centers of excellence, change management, and measuring true productivity velocity.'
      }
    ],
    packages: [
      {
        id: 'exec-single',
        name: 'Single Strategic Session',
        duration: '75 Minutes',
        price: 450,
        description: 'In-depth diagnostic audit of your organization AI posture with immediate strategic recommendations.'
      },
      {
        id: 'exec-accelerator',
        name: '4-Week Executive Accelerator',
        duration: '4 Sessions (Weekly)',
        price: 1650,
        popular: true,
        description: 'Complete transformation cadence with asynchronous Slack advisory, customized templates, and team review.'
      },
      {
        id: 'exec-mastery',
        name: 'Quarterly Advisory Retainer',
        duration: '12 Weeks (Bi-weekly + Async)',
        price: 4200,
        description: 'Embedded strategic partner for enterprise deployment, board presentation prep, and quarterly audits.'
      }
    ],
    typicalOutcomes: 'Average 40% reduction in workflow evaluation cycles and clear board-ready AI governance within 30 days.',
    image: '/src/assets/images/coaching_collaborative_board_1793011160028.jpg'
  },
  {
    id: 'workflow-automation',
    title: 'Agentic AI & Workflow Automation Coaching',
    category: 'workflow',
    subtitle: 'Hands-on architecture for autonomous agents, tool-calling pipelines & internal tools',
    tagline: 'Replace brittle manual operations with self-correcting agentic systems',
    description: 'Intensive coaching for technical teams and operations leaders ready to move past simple chatbots. We construct real multi-step agents, function-calling harnesses, error-recovery loops, and RAG architectures.',
    targetAudience: 'Operations Directors, Product Managers, Staff Engineers, Tech Leads',
    deliverables: [
      'Production-Grade Agent Workflow Architecture Diagrams',
      'Evaluation & Benchmarking Harness for Model Responses',
      'Tool-Calling & External API Integration Blueprints',
      'Production Fallback & Error-Handling Protocol'
    ],
    curriculum: [
      {
        title: 'Autonomous Flow Deconstruction',
        description: 'Breaking high-friction knowledge work into deterministic vs. probabilistic agent stages.'
      },
      {
        title: 'Structured Output Validation & Tool Use',
        description: 'Enforcing strict JSON schemas, function invocation reliability, and self-correction prompting.'
      },
      {
        title: 'Observability & Continuous Iteration',
        description: 'Tracing agent steps, cost-per-execution optimization, and benchmark evaluation suites.'
      }
    ],
    packages: [
      {
        id: 'workflow-sprint',
        name: 'Architectural Teardown',
        duration: '60 Minutes',
        price: 350,
        description: 'Live code and pipeline audit to pinpoint bottlenecks, hallucination risks, and latency bloat.'
      },
      {
        id: 'workflow-build',
        name: '4-Week Agent Build Track',
        duration: '4 Deep-Dive Sessions',
        price: 1350,
        popular: true,
        description: 'Hands-on co-building of your first production agent pipeline from scratch to deployed reliability.'
      }
    ],
    typicalOutcomes: 'Over 65% elimination of manual data consolidation tasks and sub-2% error rates in autonomous agent loops.'
  },
  {
    id: 'career-mentorship',
    title: 'AI Engineering & Career Mentorship',
    category: 'engineering',
    subtitle: 'Master frontier model APIs, system design, and accelerate into senior AI roles',
    tagline: 'Master the frontier engineering skillset demanded by top AI product teams',
    description: 'Personalized 1:1 mentorship for software engineers, product thinkers, and technical specialists aiming to transition into high-paying AI Engineering and Applied Research positions.',
    targetAudience: 'Software Engineers, Technical Product Managers, Data Scientists, Career Changers',
    deliverables: [
      'Personalized AI Engineering Competency Roadmap',
      'System Design Architecture Review for Portfolio Projects',
      'Mock Technical Deep-Dive & System Design Interview',
      'Resume & GitHub Repository Polish for Frontier AI Positions'
    ],
    curriculum: [
      {
        title: 'Frontier SDK Mastery & API Nuances',
        description: 'Advanced streaming, multimodal inputs, reasoning levels, and token budget management.'
      },
      {
        title: 'RAG, Vector Indexing & Context Windows',
        description: 'Evaluating hybrid search, chunking strategies, re-ranking, and long-context tradeoffs.'
      },
      {
        title: 'AI Product Architecture & Interview Prep',
        description: 'Navigating trade-offs in low-latency user experiences, streaming state, and defensive prompting.'
      }
    ],
    packages: [
      {
        id: 'career-review',
        name: 'Portfolio & Code Diagnostic',
        duration: '50 Minutes',
        price: 250,
        description: 'Targeted feedback on your AI portfolio codebase, resume, and technical trajectory.'
      },
      {
        id: 'career-mentorship-monthly',
        name: 'Monthly Mentorship Cadence',
        duration: '2 Sessions / Month + Async Code Review',
        price: 850,
        popular: true,
        description: 'Continuous bi-weekly coaching, async PR feedback, and targeted interview preparation.'
      }
    ],
    typicalOutcomes: 'Successful career transitions into AI engineering roles with average 35% compensation step-up.'
  },
  {
    id: 'ethical-compliance',
    title: 'Enterprise AI Governance & Compliance',
    category: 'governance',
    subtitle: 'EU AI Act readiness, copyright safeguards, bias audits & risk architecture',
    tagline: 'De-risk enterprise deployment before compliance deadlines compromise velocity',
    description: 'Advisory coaching tailored for enterprise compliance officers, corporate counsels, and product leaders seeking to balance rapid generative AI innovation with regulatory and ethical compliance.',
    targetAudience: 'Compliance Officers, Legal Counsel, Chief Risk Officers, Enterprise PMs',
    deliverables: [
      'Regulatory Alignment Audit (EU AI Act & NIST Frameworks)',
      'Algorithmic Bias & Fairness Evaluation Template',
      'PII Filtering & Data Loss Prevention (DLP) Protocols',
      'Red-Teaming Playbook for Adversarial Testing'
    ],
    curriculum: [
      {
        title: 'Regulatory Taxonomy & Risk Categorization',
        description: 'Mapping organizational AI models against global classification tiers and disclosure requirements.'
      },
      {
        title: 'Prompt Injection Defense & Red Teaming',
        description: 'Architecting guardrails against jailbreaks, unauthorized system disclosures, and data leaks.'
      },
      {
        title: 'Continuous Auditing & Incident Response',
        description: 'Building automated logging pipelines, human-in-the-loop escalation paths, and transparency records.'
      }
    ],
    packages: [
      {
        id: 'audit-intensive',
        name: 'Governance Deep Audit',
        duration: 'Half-Day (3.5 Hours)',
        price: 1850,
        popular: true,
        description: 'Rigorous end-to-end evaluation of your current AI tech stack with compliance gap analysis.'
      },
      {
        id: 'ongoing-governance',
        name: 'Monthly Compliance Partner',
        duration: '2 Sessions / Month + Advisory Desk',
        price: 2600,
        description: 'Continuous oversight as new frontier models, legislative bills, and API policies release.'
      }
    ],
    typicalOutcomes: 'Full compliance readiness documentation and 100% pass rate in enterprise customer security audits.'
  },
  {
    id: 'rapid-sprint',
    title: '60-Minute AI Architecture Blitz',
    category: 'tactical',
    subtitle: 'Unblock acute production roadblocks, hallucination spikes & latency bottlenecks',
    tagline: 'Immediate, surgical technical resolution when your team is stuck',
    description: 'High-urgency, surgical 60-minute session directly addressing a specific production issue: excessive token latency, model instability, failed JSON parsing, or RAG retrieval accuracy degradation.',
    targetAudience: 'Founders, Engineering Leads, AI Product Builders under tight release deadlines',
    deliverables: [
      'Surgical Root-Cause Analysis of Production Problem',
      'Annotated Code or Prompt Architecture Diff',
      'Full Session Recording & Executive Action Summary',
      '7 Days of Asynchronous Followup Support'
    ],
    curriculum: [
      {
        title: 'Rapid Root-Cause Diagnostics',
        description: 'Isolating prompt ambiguity, model parameter mismatch, or context truncation failures.'
      },
      {
        title: 'Surgical Live Pair-Debugging',
        description: 'Hands-on refactoring of prompt templates, schema definitions, and retry logic.'
      }
    ],
    packages: [
      {
        id: 'blitz-single',
        name: 'Emergency Tactical Blitz',
        duration: '60 Minutes',
        price: 390,
        popular: true,
        description: 'Guaranteed booking within 24-48 hours. Direct pair-debugging with a principal AI strategist.'
      }
    ],
    typicalOutcomes: '95% of acute pipeline blockers resolved or bypassed with stable alternative patterns in a single call.'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-101',
    serviceId: 'exec-ai-strategy',
    serviceTitle: 'Executive AI Transformation & Strategy',
    packageId: 'exec-accelerator',
    packageName: '4-Week Executive Accelerator',
    price: 1650,
    clientName: 'Dr. Elena Rostova',
    clientEmail: 'elena.rostova@cloudstream.io',
    organization: 'CloudStream Infrastructure',
    date: '2026-10-28',
    timeSlot: '10:00 AM - 11:15 AM EST',
    timeZone: 'America/New_York (EST)',
    notes: 'Finalizing our Q4 board presentation on internal developer AI tool rollout and security guardrails.',
    status: 'upcoming',
    meetingUrl: 'https://meet.google.com/ais-syntropy-coaching',
    createdAt: '2026-10-20T14:30:00Z'
  },
  {
    id: 'book-102',
    serviceId: 'workflow-automation',
    serviceTitle: 'Agentic AI & Workflow Automation Coaching',
    packageId: 'workflow-build',
    packageName: '4-Week Agent Build Track',
    price: 1350,
    clientName: 'Marcus Vance',
    clientEmail: 'marcus@finscale.ai',
    organization: 'FinScale Intelligence',
    date: '2026-10-29',
    timeSlot: '02:00 PM - 03:00 PM EST',
    timeZone: 'America/New_York (EST)',
    notes: 'Reviewing our multi-step financial statement extraction agent. Need to fix structured output consistency.',
    status: 'upcoming',
    meetingUrl: 'https://meet.google.com/ais-syntropy-coaching',
    createdAt: '2026-10-21T09:15:00Z'
  },
  {
    id: 'book-103',
    serviceId: 'career-mentorship',
    serviceTitle: 'AI Engineering & Career Mentorship',
    packageId: 'career-mentorship-monthly',
    packageName: 'Monthly Mentorship Cadence',
    price: 850,
    clientName: 'Priya Sharma',
    clientEmail: 'priya.sharma@healthpulse.dev',
    organization: 'HealthPulse Labs',
    date: '2026-10-25',
    timeSlot: '04:00 PM - 05:00 PM EST',
    timeZone: 'America/New_York (EST)',
    notes: 'Completed evaluation benchmarks on clinical query extraction. Discussed system design interview framing.',
    status: 'completed',
    meetingUrl: 'https://meet.google.com/ais-syntropy-coaching',
    createdAt: '2026-10-18T16:00:00Z'
  }
];

export const INITIAL_CLIENTS: ClientProfile[] = [
  {
    id: 'client-1',
    name: 'Dr. Elena Rostova',
    email: 'elena.rostova@cloudstream.io',
    role: 'VP of Engineering',
    company: 'CloudStream Infrastructure',
    enrolledServiceId: 'exec-ai-strategy',
    enrolledServiceName: 'Executive AI Transformation & Strategy',
    startDate: '2026-10-01',
    overallProgress: 68,
    weeklyImplementationHours: 14.5,
    productivityGainPercent: 38,
    standardizedPromptsCount: 28,
    skillsAcquired: [
      'Enterprise Governance Architecture',
      'Frontier Model Cost Optimization',
      'Zero-Data-Retention Agreements',
      'Team AI Upskilling Framework'
    ],
    milestones: [
      {
        id: 'm1',
        phase: 'Phase 1',
        timeframe: 'Week 1-2',
        title: 'Executive AI Audit & Security Boundaries',
        description: 'Complete inventory of internal workflows, proprietary data boundaries, and vendor terms.',
        status: 'completed',
        deliverables: ['Risk Assessment Matrix', 'Vendor Data Security Review', 'Executive Charter'],
        progressPercent: 100
      },
      {
        id: 'm2',
        phase: 'Phase 2',
        timeframe: 'Week 3-4',
        title: 'High-Leverage Workflow Pilot',
        description: 'Deploy first internal code-review and technical documentation intelligence loop.',
        status: 'in_progress',
        deliverables: ['Pilot Deployment', 'Prompt Architecture Library', 'Telemetry Baseline'],
        progressPercent: 75
      },
      {
        id: 'm3',
        phase: 'Phase 3',
        timeframe: 'Week 5-6',
        title: 'Organization-Wide Rollout & Governance',
        description: 'Establish internal Center of Excellence and permission tiers across 140 engineers.',
        status: 'upcoming',
        deliverables: ['Team Playbook', 'Automated Usage Dashboard', 'Feedback Loop'],
        progressPercent: 0
      },
      {
        id: 'm4',
        phase: 'Phase 4',
        timeframe: 'Week 7-8',
        title: 'Autonomous Strategy Review & Board Deck',
        description: 'Synthesize quarterly gains, calculate cost avoidance, and prepare board presentation.',
        status: 'upcoming',
        deliverables: ['Board Deck Slides', 'ROI Whitepaper', 'Annual AI Roadmap'],
        progressPercent: 0
      }
    ],
    actionItems: [
      {
        id: 'act-1',
        title: 'Refine system prompt constraints for the automated PR summarizer',
        category: 'Prompt Craft',
        dueDate: '2026-10-27',
        completed: true,
        priority: 'high'
      },
      {
        id: 'act-2',
        title: 'Finalize zero-retention vendor terms with enterprise legal team',
        category: 'Governance',
        dueDate: '2026-10-30',
        completed: false,
        priority: 'high'
      },
      {
        id: 'act-3',
        title: 'Gather benchmark feedback from 12 pilot engineers on code suggestions',
        category: 'Evaluation',
        dueDate: '2026-11-02',
        completed: false,
        priority: 'medium'
      }
    ],
    sessionNotes: [
      {
        id: 'sn-1',
        date: '2026-10-08',
        sessionTitle: 'Diagnostic Deep-Dive & Architecture Audit',
        durationMinutes: 75,
        keyTakeaways: [
          'Identified that 42% of senior engineer time is spent writing boilerplate migration specs',
          'Legal team approved closed-cloud API with encrypted transient transit',
          'Decided on standardizing on structured JSON output for all internal tools'
        ],
        homework: [
          'Draft initial schema definitions for migration specifications',
          'Map top 3 high-friction engineering workflows'
        ],
        docLink: 'https://docs.google.com/document/d/cloudstream-ai-audit'
      },
      {
        id: 'sn-2',
        date: '2026-10-15',
        sessionTitle: 'Prompt Architecture & Evaluation Teardown',
        durationMinutes: 75,
        keyTakeaways: [
          'Refactored legacy system prompt into modular instructions with strict negative constraints',
          'Achieved 99.4% adherence to schema validation using Gemini structured outputs',
          'Cut response latency by 32% using low thinkingLevel on classification steps'
        ],
        homework: [
          'Deploy pilot to the core platform team of 15 engineers',
          'Monitor token consumption patterns for 7 days'
        ],
        docLink: 'https://docs.google.com/document/d/cloudstream-pilot-review'
      }
    ],
    reflections: [
      {
        id: 'ref-1',
        date: '2026-10-22',
        win: 'The migration spec generator saved our team approximately 18 hours in the first week of deployment!',
        blocker: 'A few engineers are still copying and pasting into unauthorized public tools instead of our secured internal proxy.',
        coachFeedback: 'Address this during the next all-hands with an empathy-led demo showing how the internal proxy already includes their private code context and runs 3x faster.'
      }
    ]
  },
  {
    id: 'client-2',
    name: 'Marcus Vance',
    email: 'marcus@finscale.ai',
    role: 'Founder & CEO',
    company: 'FinScale Intelligence',
    enrolledServiceId: 'workflow-automation',
    enrolledServiceName: 'Agentic AI & Workflow Automation Coaching',
    startDate: '2026-10-12',
    overallProgress: 42,
    weeklyImplementationHours: 19.0,
    productivityGainPercent: 52,
    standardizedPromptsCount: 16,
    skillsAcquired: [
      'Multi-Step Agent Orchestration',
      'Function Calling & Tool Schema',
      'Dynamic Fallback Routing'
    ],
    milestones: [
      {
        id: 'm2-1',
        phase: 'Phase 1',
        timeframe: 'Week 1',
        title: 'Agent Workflow Deconstruction',
        description: 'Map manual financial analysis pipeline into isolated deterministic vs probabilistic stages.',
        status: 'completed',
        deliverables: ['Flow Diagram', 'State Schema Design', 'Error Handling Contract'],
        progressPercent: 100
      },
      {
        id: 'm2-2',
        phase: 'Phase 2',
        timeframe: 'Week 2',
        title: 'Tool Calling & Function Declarations',
        description: 'Implement database retrieval and balance sheet parsing functions for the agent.',
        status: 'in_progress',
        deliverables: ['Function Declarations', 'Validation Suite', 'Self-Correction Loop'],
        progressPercent: 60
      },
      {
        id: 'm2-3',
        phase: 'Phase 3',
        timeframe: 'Week 3',
        title: 'Benchmarking & Edge-Case Stress Testing',
        description: 'Test against 200 real financial reports with contradictory footnotes.',
        status: 'upcoming',
        deliverables: ['Accuracy Benchmark', 'Latency Profile', 'Guardrail Matrix'],
        progressPercent: 0
      },
      {
        id: 'm2-4',
        phase: 'Phase 4',
        timeframe: 'Week 4',
        title: 'Production Staging & Client Demo',
        description: 'Ship to closed beta customers with automated audit logs.',
        status: 'upcoming',
        deliverables: ['Production Release', 'User Guide', 'Audit Log Pipeline'],
        progressPercent: 0
      }
    ],
    actionItems: [
      {
        id: 'act-201',
        title: 'Add numerical unit validation to agent tool output responses',
        category: 'Engineering',
        dueDate: '2026-10-28',
        completed: false,
        priority: 'high'
      },
      {
        id: 'act-202',
        title: 'Record 5 edge-case financial filings for benchmark verification',
        category: 'Data Set',
        dueDate: '2026-10-29',
        completed: true,
        priority: 'medium'
      }
    ],
    sessionNotes: [
      {
        id: 'sn-201',
        date: '2026-10-16',
        sessionTitle: 'Agentic Pipeline Architecture & Tool Definitions',
        durationMinutes: 60,
        keyTakeaways: [
          'Separated document ingestion from balance sheet synthesis into two asynchronous agents',
          'Reduced hallucination of EBITDA margins to 0% by strictly enforcing table cell citations',
          'Prepared dynamic retry prompt with system feedback for parsing errors'
        ],
        homework: [
          'Connect the second tool for SEC Edgar document search',
          'Run first automated test batch of 25 reports'
        ]
      }
    ],
    reflections: [
      {
        id: 'ref-201',
        date: '2026-10-23',
        win: 'The financial table extraction pipeline parsed a 74-page 10-K filing in 8.2 seconds with flawless schema adherence.',
        blocker: 'Occasional rate limiting when batch processing multiple filings simultaneously.',
        coachFeedback: 'Implement token-bucket client-side rate limiting and use asynchronous batch job submission for off-peak ingestion.'
      }
    ]
  },
  {
    id: 'client-3',
    name: 'Priya Sharma',
    email: 'priya.sharma@healthpulse.dev',
    role: 'Head of AI Product',
    company: 'HealthPulse Labs',
    enrolledServiceId: 'career-mentorship',
    enrolledServiceName: 'AI Engineering & Career Mentorship',
    startDate: '2026-09-20',
    overallProgress: 88,
    weeklyImplementationHours: 11.0,
    productivityGainPercent: 44,
    standardizedPromptsCount: 34,
    skillsAcquired: [
      'Clinical RAG Architecture',
      'System Design for Frontier LLMs',
      'Model Evaluation Protocols',
      'Executive Technical Presentations'
    ],
    milestones: [
      {
        id: 'm3-1',
        phase: 'Phase 1',
        timeframe: 'Month 1',
        title: 'Advanced AI Architecture Fundamentals',
        description: 'Master frontier SDKs, streaming interfaces, and embedding strategies.',
        status: 'completed',
        deliverables: ['Working Multimodal App', 'SDK Comparison Notes', 'Token Optimizer'],
        progressPercent: 100
      },
      {
        id: 'm3-2',
        phase: 'Phase 2',
        timeframe: 'Month 2',
        title: 'System Design & Portfolio Polish',
        description: 'Architecting an enterprise clinical search pipeline with citations and provenance.',
        status: 'completed',
        deliverables: ['Architecture Spec', 'GitHub Showcase', 'Interactive Demo'],
        progressPercent: 100
      },
      {
        id: 'm3-3',
        phase: 'Phase 3',
        timeframe: 'Month 3',
        title: 'Strategic Interviewing & Leadership Framing',
        description: 'Master executive-level AI storytelling, trade-off defenses, and offer negotiations.',
        status: 'in_progress',
        deliverables: ['Mock Interview Record', 'Executive Portfolio', 'Comp Negotiation Strategy'],
        progressPercent: 75
      }
    ],
    actionItems: [
      {
        id: 'act-301',
        title: 'Complete final system design write-up for the real-time clinical triage assistant',
        category: 'Portfolio',
        dueDate: '2026-10-31',
        completed: false,
        priority: 'high'
      }
    ],
    sessionNotes: [
      {
        id: 'sn-301',
        date: '2026-10-18',
        sessionTitle: 'Executive AI System Design & Interview Defense',
        durationMinutes: 50,
        keyTakeaways: [
          'Excellent articulation of trade-offs between dense vs sparse vector search',
          'Strengthened explanation of deterministic guardrails in regulated healthcare workflows',
          'Refined salary expectations based on principal AI product manager market data'
        ],
        homework: [
          'Record a 4-minute loom walkthrough of the portfolio architecture'
        ]
      }
    ],
    reflections: []
  }
];

// Local storage management helpers
const STORAGE_KEYS = {
  BOOKINGS: 'syntropy_coaching_bookings_v1',
  CLIENTS: 'syntropy_coaching_clients_v1',
  SERVICES: 'syntropy_coaching_services_v1'
};

export function loadBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load bookings from storage', e);
  }
  return INITIAL_BOOKINGS;
}

export function saveBookings(bookings: Booking[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  } catch (e) {
    console.error('Failed to save bookings', e);
  }
}

export function loadClients(): ClientProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load clients from storage', e);
  }
  return INITIAL_CLIENTS;
}

export function saveClients(clients: ClientProfile[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  } catch (e) {
    console.error('Failed to save clients', e);
  }
}

export function loadServices(): CoachingService[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load services from storage', e);
  }
  return INITIAL_SERVICES;
}

export function saveServices(services: CoachingService[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  } catch (e) {
    console.error('Failed to save services', e);
  }
}
