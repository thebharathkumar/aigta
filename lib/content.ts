// content.ts
// Single source of truth for the whole portfolio. Edit any string here and it
// flows through every section. No backend, all static, fully typed.

export type Profile = {
  name: string;
  tagline: string;
  pitch: string;
  funStat: string;
  availability: string;
  status: string;
  location: string;
};

export type Skill = {
  label: string;
  value: number; // 0 to 100
};

export type Mission = {
  role: string;
  company: string;
  place: string;
  dates: string;
  status: "COMPLETED" | "IN PROGRESS";
  bullets: string[];
};

export type Heist = {
  codename: string;
  objective: string;
  tags: string[];
  payout: number; // flavor figure in dollars
  difficulty: number; // 1 to 5
  link: string;
  pinned?: boolean;
  comingSoon?: boolean;
};

export type Trophy = {
  title: string;
  venue: string;
  detail: string;
};

export type License = {
  issuer: string;
  title: string;
  className: string; // license "class" flavor
};

export type PhoneApp = {
  id: string;
  label: string;
  href: string;
  kind: "email" | "linkedin" | "github" | "medium" | "podcast" | "resume";
};

export type NavItem = {
  id: string;
  label: string; // game reframed label
};

export const profile: Profile = {
  name: "BHARATH KUMAR RAJESH",
  tagline: "AI ENGINEER // AGENTIC SYSTEMS // FORWARD DEPLOYED",
  pitch:
    "MS Computer Science at Pace Seidenberg. I ship production multi-agent AI: LangGraph, Claude on Amazon Bedrock, MCP, RAG, and LLM observability.",
  funStat: "Rubik's cube: solves under 2 minutes",
  availability: "Open to roles",
  status: "Shipping",
  location: "New York City. Open to Bay Area, Dallas, Orlando, Seattle.",
};

export const bio =
  "Graduate Assistant at Pace University Seidenberg building production AI systems used by 10,000+ people daily across multiple departments. Focused on agentic systems, evals, and frontier-model tooling. Two peer-reviewed ML publications. Open to AI/ML Engineer, Forward Deployed Engineer, and Software Engineer roles, NYC or remote, F-1 OPT with future H-1B.";

export const skills: Skill[] = [
  { label: "LangGraph / multi-agent orchestration", value: 95 },
  { label: "MCP (Model Context Protocol)", value: 92 },
  { label: "Claude on Amazon Bedrock", value: 90 },
  { label: "RAG pipelines", value: 90 },
  { label: "LLM eval and observability", value: 88 },
  { label: "Python", value: 95 },
  { label: "TypeScript", value: 85 },
  { label: "Go", value: 78 },
  { label: "React / Next.js", value: 82 },
  { label: "FastAPI", value: 88 },
  { label: "AWS", value: 85 },
];

// Loadout grid: short specialization chips for the "specializations" panel.
export const specializations: string[] = [
  "Multi-agent orchestration",
  "MCP tool servers",
  "RAG and retrieval",
  "LLM evals and confidence intervals",
  "OpenTelemetry tracing",
  "Agent governance and audit logs",
  "Frontier-model tooling",
  "Production inference serving",
];

export const missions: Mission[] = [
  {
    role: "AI & Data Engineering Graduate Assistant",
    company: "Pace University",
    place: "New York",
    dates: "Mar 2025 to Present",
    status: "IN PROGRESS",
    bullets: [
      "Built production multi-agent chatbot platforms, RAG pipelines, and LLM observability dashboards serving multiple university departments.",
      "Orchestration with LangGraph, Claude on Amazon Bedrock, and custom MCP tool servers.",
      "Automated research and admin workflows with Python pipelines and API integrations.",
    ],
  },
  {
    role: "Quantitative Research Virtual Experience",
    company: "JPMorgan Chase (Forage)",
    place: "Remote",
    dates: "July 2025",
    status: "COMPLETED",
    bullets: [
      "Built probability-of-default models on loan portfolio data with statistical methods.",
    ],
  },
  {
    role: "Software Development Intern",
    company: "Let's Be the Change",
    place: "Bangalore",
    dates: "Sept 2023 to May 2024",
    status: "COMPLETED",
    bullets: [
      "Cross-platform data management system (Flutter + React) with role-based access for 1,000+ user records; Firebase real-time sync and REST APIs.",
    ],
  },
  {
    role: "Data Engineering Intern",
    company: "Compsoft Technologies",
    place: "Bangalore",
    dates: "Aug 2023 to Sept 2023",
    status: "COMPLETED",
    bullets: [
      "Sentiment-analysis NLP pipeline over 50k+ social media records, 90% accuracy.",
    ],
  },
];

// The upcoming flagship "MAIN MISSION". Rendered first, tagged COMING SOON.
export const mainMission: Heist = {
  codename: "MCP Trust Scanner",
  objective:
    "A public MCP Trust Scanner with a leaderboard that unifies mcp-otel-audit, a YAML policy engine, an HMAC-chained audit log, and agent-triage into one citable system for agent governance.",
  tags: ["MCP", "Agent governance", "Leaderboard", "Observability"],
  payout: 5000000,
  difficulty: 5,
  link: "https://github.com/thebharathkumar",
  comingSoon: true,
};

export const heists: Heist[] = [
  {
    codename: "agent-triage",
    objective:
      "Rank multi-agent failures by severity, frequency, and recovery from OpenTelemetry or NDJSON traces. CLI, FastAPI dashboard, OTLP receiver, optional LLM root-cause analysis. pip-installable, typed, 222+ tests.",
    tags: ["Python", "OpenTelemetry", "FastAPI", "LLM", "Claude Haiku", "SQLite", "SSE"],
    payout: 2500000,
    difficulty: 5,
    link: "https://github.com/thebharathkumar/agent-triage",
    pinned: true,
  },
  {
    codename: "mcp-otel-audit",
    objective:
      "Public conformance audit of four MCP OpenTelemetry implementations against OTel semantic conventions v1.40.0. Fully reproducible. Drew direct engagement from Logfire and MCP-Python maintainers.",
    tags: ["MCP", "OpenTelemetry", "Observability", "Audit"],
    payout: 1800000,
    difficulty: 4,
    link: "https://github.com/thebharathkumar/mcp-otel-audit",
    pinned: true,
  },
  {
    codename: "obindoc",
    objective:
      "Grounded RAG over a PDF with span-level citations, a verifier loop, and a tamper-evident HMAC-chained audit log. Under 900 lines, 29 tests.",
    tags: ["RAG", "LangGraph", "FAISS", "sentence-transformers", "HMAC audit log"],
    payout: 1500000,
    difficulty: 4,
    link: "https://github.com/thebharathkumar/obindoc",
    pinned: true,
  },
  {
    codename: "super-mcp-eval",
    objective:
      "Evaluation harness for MCP servers and the agents that use them. Schema compliance, tool-selection accuracy with Wilson 95% confidence intervals, DuckDB persistence, Streamlit dashboard.",
    tags: ["MCP", "Evals", "DuckDB", "Streamlit", "Statistics"],
    payout: 1600000,
    difficulty: 4,
    link: "https://github.com/thebharathkumar/super-mcp-eval",
    pinned: true,
  },
  {
    codename: "klaviyo-agent-demo",
    objective:
      "LangGraph multi-agent demo. Autonomous marketing campaign generator with tool-calling and orchestration across five specialized agents. Live on Render.",
    tags: ["LangGraph", "Multi-agent", "Tool-calling"],
    payout: 1200000,
    difficulty: 3,
    link: "https://github.com/thebharathkumar/klaviyo-agent-demo",
    pinned: true,
  },
  {
    codename: "streamsense",
    objective:
      "Multimodal human activity recognition on PAMAP2. Late-fusion CNN plus transformer with ONNX export, int8 quantization, and a FastAPI inference server for near-real-time inference on wearable IMU streams.",
    tags: ["PyTorch", "CNN", "Transformer", "ONNX", "Quantization", "FastAPI"],
    payout: 1400000,
    difficulty: 4,
    link: "https://github.com/thebharathkumar/streamsense",
    pinned: true,
  },
  {
    codename: "obin-style-demo",
    objective:
      "Credit-decisioning agent with a tamper-evident audit log and declarative policy guardrails. Explores making LLM agents auditable for regulated industries. About 700 LOC, 18 tests.",
    tags: ["Agent governance", "YAML policy engine", "HMAC audit log"],
    payout: 1000000,
    difficulty: 3,
    link: "https://github.com/thebharathkumar/obin-style-demo",
  },
  {
    codename: "career-ops",
    objective:
      "AI-powered job search system built on Claude Code. 14 skill modes, Go dashboard, PDF generation, batch processing.",
    tags: ["Claude Code", "Go", "Automation"],
    payout: 900000,
    difficulty: 3,
    link: "https://github.com/thebharathkumar/career-ops",
  },
];

export const trophies: Trophy[] = [
  {
    title:
      "A Deep CNN-Based Approach for Identifying Medicinal and Edible Plants in the Western Ghats Region",
    venue: "Springer Nature, ICACECS 2023. Corresponding author.",
    detail: "93%+ species classification accuracy.",
  },
  {
    title: "AI-Driven Driver Drowsiness Detection System",
    venue: "IJARESM, Vol. 11, Issue 11, Nov 2023.",
    detail: "90% real-time detection accuracy.",
  },
];

export const licenses: License[] = [
  {
    issuer: "Anthropic",
    title: "Claude on Amazon Bedrock",
    className: "CLASS AI",
  },
  {
    issuer: "Amazon Web Services",
    title: "AWS Certified Solutions Architect Associate (SAA)",
    className: "CLASS CLOUD",
  },
  {
    issuer: "Red Hat",
    title: "Red Hat Certified System Administrator (RHCSA)",
    className: "CLASS SYS",
  },
];

export const phoneApps: PhoneApp[] = [
  { id: "email", label: "Email", href: "mailto:bharath.kr702@gmail.com", kind: "email" },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/thebharathkumar", kind: "linkedin" },
  { id: "github", label: "GitHub", href: "https://github.com/thebharathkumar", kind: "github" },
  { id: "medium", label: "Medium", href: "https://medium.com/@thebharathkumar", kind: "medium" },
  { id: "podcast", label: "Podcast", href: "https://open.spotify.com/show/4PDEqJu1u06pqcvBFF4BRA", kind: "podcast" },
  { id: "resume", label: "Resume", href: "/resume.pdf", kind: "resume" },
];

export const contactEmail = "bharath.kr702@gmail.com";
export const portfolioUrl = "https://thebharath.co";

export const navItems: NavItem[] = [
  { id: "hero", label: "Grid" },
  { id: "about", label: "Driver" },
  { id: "projects", label: "Race Wins" },
  { id: "experience", label: "Season" },
  { id: "publications", label: "Trophies" },
  { id: "certifications", label: "Super License" },
  { id: "contact", label: "Pit Wall" },
];

// Boot lines that cycle during the start-lights sequence. No em dashes.
export const loadingTips: string[] = [
  "Spooling up the power unit...",
  "Warming the tyres to temperature...",
  "Telemetry link online...",
  "Lights out and away we go...",
];
