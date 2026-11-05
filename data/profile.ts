// Career content. Source of truth: ../build_resume_v6.py and ../Muhammad_Hamza_Resume_v5_ATS.txt.

export interface Role {
  title: string;
  org: string;
  place: string;
  period: string;
  current?: boolean;
  points: { text: string; slug?: string }[];
}

export const experience: Role[] = [
  {
    title: "Software Engineer",
    org: "Folio3",
    place: "Karachi",
    period: "Jun 2025 – Present",
    current: true,
    points: [
      { text: "Co-built AI Factory, Folio3's internal LLM pipeline that turns plain-English change requests into tested pull requests on .NET + PostgreSQL codebases; top contributor with 144 commits and 83 test files in 3 weeks.", slug: "ai-factory" },
      { text: "Angus Media: took in-book PDF search from proof of concept to production Solr indexing.", slug: "angus-media-sale-book" },
      { text: "LandTeller: closed a sold-lot data exposure and developed fixes for 3 critical tenant-isolation findings.", slug: "landteller" },
      { text: "MyEndo: own releases of a production iOS/Android app through v1.4 across 4 environments.", slug: "myendo-mobile" },
      { text: "FEW Center TED2: authored the architecture RFCs and eliminated iPad crashes from a ~900MB memory spike.", slug: "ted2-frontend-monorepo" },
      { text: "FarmDocs: upgraded an offline-first field app to React Native 0.81 and React 19 without a rewrite.", slug: "farmdocs-platform" },
      { text: "EcoDocs and Sales Bot: a multi-tenant .NET 6 agritech API and a FastAPI RAG assistant.", slug: "ecodocs-backend" },
    ],
  },
  {
    title: "Trainee Software Engineer",
    org: "Folio3",
    place: "Karachi",
    period: "Feb – Jun 2025",
    points: [
      { text: "Built the RAG ingestion CLI for a FastAPI Sales Bot, with 3 reprocessing modes that prevent duplicate or stale vectors.", slug: "sales-ingestion-tooling" },
      { text: "Built RESTful C# / ASP.NET Core APIs and integrated them with React Native clients (Axios, Redux Toolkit)." },
    ],
  },
  {
    title: "App Developer Intern",
    org: "Folio3",
    place: "Karachi",
    period: "Jun – Aug 2024",
    points: [
      { text: "Trained a YOLOv8 license-plate and vehicle detector on a custom annotated dataset.", slug: "license-plate-detection" },
      { text: "Built API integrations that connected data across multiple project modules." },
    ],
  },
  {
    title: "Java Developer Intern",
    org: "Codsoft",
    place: "Remote",
    period: "May – Aug 2023",
    points: [{ text: "Built and integrated Java APIs for data fetching and storage, delivering a working project from inception to completion." }],
  },
];

export const leadership = [
  { title: "Mentoring", body: "Mentor interns at Folio3." },
  { title: "Code review", body: "Review teammates' pull requests across client projects." },
  { title: "Architecture RFCs", body: "Authored the RFCs that govern the TED2 Next.js + React Native monorepo.", slug: "ted2-frontend-monorepo" },
  { title: "Release ownership", body: "Own MyEndo's releases through v1.4 via Fastlane, across 4 environments.", slug: "myendo-mobile" },
];

export const credentials = [
  { kind: "Education", title: "BS Software Engineering", detail: "FAST-NUCES, Karachi · GPA 3.85 / 4.0", period: "Jun 2025" },
  { kind: "Certification", title: "Google Cloud Certified: Generative AI Leader", detail: "Google Cloud", period: "2026" },
];

// Each skill filters projects whose tag labels match `re`. Skills that match nothing are hidden.
export const skillGroups: { group: string; skills: { name: string; re: RegExp }[] }[] = [
  {
    group: "Mobile",
    skills: [
      { name: "React Native", re: /react native/i },
      { name: "Offline-first (SQLite, MMKV)", re: /sqlite|mmkv/i },
      { name: "Fastlane", re: /fastlane/i },
      { name: "Firebase", re: /firebase/i },
      { name: "PostHog", re: /posthog/i },
    ],
  },
  {
    group: "Web",
    skills: [
      { name: "Angular", re: /angular/i },
      { name: "Next.js", re: /next\.js/i },
      { name: "React", re: /^react(?! native)/i },
      { name: "TypeScript", re: /typescript/i },
      { name: "TanStack Query", re: /tanstack/i },
      { name: "Zustand", re: /zustand/i },
      { name: "Redux Toolkit", re: /redux/i },
      { name: "Orval", re: /orval/i },
    ],
  },
  {
    group: "Backend",
    skills: [
      { name: "ASP.NET Core / .NET", re: /\.net/i },
      { name: "C#", re: /^c#$/i },
      { name: "EF Core", re: /ef core/i },
      { name: "NestJS", re: /nestjs/i },
      { name: "FastAPI", re: /fastapi/i },
      { name: "Hangfire", re: /hangfire/i },
      { name: "Frappe / ERPNext", re: /frappe/i },
      { name: "Prisma", re: /prisma/i },
    ],
  },
  {
    group: "Data & AI",
    skills: [
      { name: "PostgreSQL", re: /postgres/i },
      { name: "SQL Server", re: /sql server/i },
      { name: "Apache Solr", re: /solr/i },
      { name: "iTextSharp", re: /itextsharp/i },
      { name: "LLM / RAG", re: /llm|langchain|pinecone|langfuse/i },
      { name: "Python", re: /python/i },
      { name: "Computer vision", re: /yolo|opencv/i },
    ],
  },
  {
    group: "Tools",
    skills: [
      { name: "Turborepo", re: /turborepo/i },
      { name: "Yarn Workspaces", re: /workspaces/i },
      { name: "Docker", re: /docker/i },
      { name: "Swagger / OpenAPI", re: /swagger/i },
      { name: "Real-time (Socket.IO, MQTT, WebRTC)", re: /socket|mqtt|webrtc/i },
      { name: "Security & multi-tenancy", re: /security|multi-tenan|jwt/i },
    ],
  },
];
