export type AreaId = "neural" | "forge" | "arena";

export type Area = {
  id: AreaId;
  name: string;
  tagline: string;
  color: string;
  tags: string[];
};

export type Project = {
  name: string;
  area: AreaId;
  date?: string;
  /** One-line outcome shown above the details */
  impact?: string;
  stack: string[];
  points: string[];
  live?: string;
  repo: string;
  images?: ProjectImage[];
};

export type ProjectImage = { src: string; alt: string; fit?: "cover" | "contain" };

export const profile = {
  name: "Mayank Pillai",
  handle: "mayank-pillai-99",
  role: "AI Engineer",
  summary:
    "I build LLM systems and full-stack products that ship, from Text-to-SQL engines and RAG pipelines to tested, deployed apps on Next.js, Node and Postgres.",
  resume: "/Resume.pdf",
  links: {
    email: "mayank.pillai2024@nst.rishihood.edu.in",
    github: "https://github.com/mayank-pillai-99",
    linkedin: "https://www.linkedin.com/in/mayank-pillai-56798a30b/",
    leetcode: "https://leetcode.com/u/nkZEqqcSwd/",
  },
  proof: [
    { value: "9.45", label: "CGPA" },
    { value: "BITS Pilani", label: "Intern '26" },
    { value: "160+", label: "LeetCode" },
  ],
};

export const areas: Area[] = [
  {
    id: "neural",
    name: "AI Engineering",
    tagline: "LLM apps, Text-to-SQL, RAG and model evaluation.",
    color: "#ff2e63",
    tags: ["PyTorch", "Hugging Face", "LangChain", "FAISS", "Gradio", "LLM Evaluation", "Text-to-SQL", "RAG", "ASR"],
  },
  {
    id: "forge",
    name: "Full-Stack",
    tagline: "Tested, deployed web products from database to UI.",
    color: "#ffd400",
    tags: ["TypeScript", "Next.js", "React", "Node.js", "Fastify", "Express", "PostgreSQL", "MongoDB", "Redis", "BullMQ", "Docker"],
  },
  {
    id: "arena",
    name: "Problem Solving",
    tagline: "Strong algorithmic fundamentals.",
    color: "#00e5ff",
    tags: ["160+ LeetCode", "Arrays", "Trees", "Dynamic Programming", "Graph Theory", "DSA", "OOP"],
  },
];

export const areaById = Object.fromEntries(areas.map((s) => [s.id, s])) as Record<AreaId, Area>;

export const experience = {
  title: "Visiting Summer Research Intern (VISRI)",
  org: "BITS Pilani",
  location: "Pilani, Rajasthan",
  period: "May 2026 – Jul 2026",
  project: "Intent-Driven Spatial Search Engine",
  repo: "https://github.com/mayank-pillai-99/Intent-Driven-Spatial-Search-Engine",
  points: [
    "Built a fully offline multilingual spatial search system on a single local GPU: conversational voice and text become executable PostGIS SQL through an LLM intent router, with a 3-layer FAISS/LangChain RAG fallback and a Gradio + Folium map interface.",
    "Designed a hybrid evaluation framework that pairs AST-based structural scoring (sqlglot, 7 clause-level dimensions) with live-execution precision and recall.",
    "Curated 186 benchmark queries across 5 difficulty tiers and 5 Indian languages, then used them to pick SeamlessM4T v2 over Whisper-Large for offline speech-to-English.",
  ],
  benchmark: [
    { name: "Qwen2.5-Coder-7B", value: 78.0, winner: true },
    { name: "SQLCoder-8B", value: 46.0 },
    { name: "CodeS-7B", value: 32.0 },
  ],
  highlights: [
    { label: "Unseen-map generalisation", value: 71.2, suffix: "%", decimals: 1 },
    { label: "Benchmark queries", value: 186 },
    { label: "Indian languages", value: 5 },
    { label: "SeamlessM4T v2 WER", value: 0.47, decimals: 3, note: "vs 0.632 Whisper-Large" },
  ],
};

export const projects: Project[] = [
  {
    name: "Codebase Copilot",
    images: [
      { src: "/projects/copilot-landing.webp", alt: "Codebase Copilot landing page", fit: "contain" },
      { src: "/projects/copilot-chat.webp", alt: "Chat answer with file and line citations" },
      { src: "/projects/copilot-architecture-map.webp", alt: "Architecture map of an Express API" },
    ],
    area: "forge",
    date: "Sep 2026",
    impact: "Ask any TS/JS repo a question, get answers cited to the line.",
    stack: ["TypeScript", "Next.js", "Fastify", "pgvector", "Redis", "BullMQ", "tree-sitter"],
    points: [
      "Parses any TS/JS GitHub repo with tree-sitter into a code graph of symbols, imports, calls and HTTP routes for architecture maps, request tracing and change-impact analysis.",
      "Hybrid retrieval: pgvector HNSW plus Postgres full-text via Reciprocal Rank Fusion and one-hop call-graph expansion, streamed over SSE with server-validated citations.",
      "Next.js + Fastify monorepo with a BullMQ/Redis indexing worker and httpOnly-cookie JWT auth, covered by unit, integration and Playwright tests in GitHub Actions CI; deployed on Vercel and Render.",
    ],
    live: "https://codebase-copilot-mu.vercel.app",
    repo: "https://github.com/mayank-pillai-99/codebase-copilot",
  },
  {
    name: "Hitbox",
    images: [
      { src: "/projects/hitbox-home.webp", alt: "Hitbox home page" },
      { src: "/projects/hitbox-backlog.webp", alt: "Backlog planner ranked by taste and time to beat" },
      { src: "/projects/hitbox-game.webp", alt: "Game detail page" },
    ],
    area: "forge",
    date: "Dec 2025",
    impact: "200+ tests · 0 WCAG AA violations · 500K+ games.",
    stack: ["Next.js", "React", "Express", "MongoDB", "zod", "Vitest"],
    points: [
      "Social platform for gamers to track, review and list titles from IGDB's 500K+ game catalogue, with follows, a feed and comment threads.",
      "Explainable recommendation, backlog ranking and taste-match engines written as pure, testable scoring functions, backed by 200+ tests and zero WCAG 2.1 AA violations.",
      "Express API hardened with zod validation, JWT/bcrypt auth, rate limiting and helmet headers.",
    ],
    live: "https://hitbox-6d3o.vercel.app",
    repo: "https://github.com/mayank-pillai-99/Hitbox",
  },
  {
    name: "BookConnect",
    images: [
      { src: "/projects/bookconnect.webp", alt: "BookConnect landing page" },
    ],
    area: "forge",
    date: "Oct 2025",
    impact: "Real-time chat and discovery for readers.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Redux Toolkit", "Socket.io"],
    points: [
      "Real-time social network for readers with instant messaging over Socket.io.",
      "Redux Toolkit global state and a discovery feed backed by MongoDB compound indexes.",
    ],
    live: "https://book-connect-frontend.vercel.app",
    repo: "https://github.com/mayank-pillai-99/BookConnect-frontend",
  },
  {
    name: "Real-Estate Tracker",
    images: [
      { src: "/projects/real-estate.webp", alt: "Realytics property tracker home page" },
    ],
    area: "forge",
    impact: "Property search with price and tax history charts.",
    stack: ["Next.js", "React", "Tailwind CSS", "Chart.js", "NextAuth"],
    points: [
      "Property listings with search, a favourites list and detail pages with photo carousels, built on Next.js App Router with React Context for shared state.",
      "Price-history and tax-history charts per property with Chart.js, plus sign-in through NextAuth.",
    ],
    live: "https://real-estate-tracker-sigma.vercel.app",
    repo: "https://github.com/mayank-pillai-99/Real-Estate-Tracker",
  },
];

export const skillGroups: { category: string; area: AreaId; items: string[] }[] = [
  { category: "Languages", area: "arena", items: ["Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"] },
  { category: "AI / ML", area: "neural", items: ["PyTorch", "Transformers", "LangChain", "FAISS", "Gradio", "RAG", "ASR"] },
  { category: "Frontend", area: "forge", items: ["React", "Next.js", "Tailwind CSS", "Redux Toolkit", "React Flow"] },
  { category: "Backend", area: "forge", items: ["Node.js", "Express", "Fastify", "Socket.io", "BullMQ", "Prisma", "zod", "JWT"] },
  { category: "Databases", area: "neural", items: ["PostgreSQL", "pgvector", "PostGIS", "MongoDB", "Redis", "MySQL"] },
  { category: "Tools", area: "arena", items: ["Git", "GitHub Actions", "Docker", "Vitest", "Playwright", "Vercel", "Render"] },
];

export const education = {
  school: "Newton School of Technology, Rishihood University",
  degree: "B.Tech in Artificial Intelligence",
  location: "Sonipat, Haryana",
  period: "Aug 2024 – May 2028",
  cgpa: "9.449 / 10.0",
  coursework: ["Data Structures & Algorithms", "OOP", "DBMS", "Web Development", "Computer Networks", "Machine Learning"],
};
