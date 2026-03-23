import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "ecodocs-backend",
    title: "EcoDocs Backend Platform",
    elevatorPitch:
      "A domain-heavy agritech backend platform powering end-to-end operational workflows — from field scheduling and multi-tenant data access to background job orchestration and notification pipelines.",
    domain: "Agritech Operations",
    role: "Backend Architecture & Platform Engineering",
    year: "2024",
    status: "Production",
    featured: true,
    accentColor: "#22c55e",
    tags: [
      { label: ".NET 6", category: "backend" },
      { label: "ASP.NET Core", category: "backend" },
      { label: "EF Core", category: "backend" },
      { label: "SQL Server", category: "data" },
      { label: "Hangfire", category: "infra" },
      { label: "Quartz.NET", category: "infra" },
      { label: "JWT + Identity", category: "backend" },
      { label: "Swagger / OpenAPI", category: "backend" },
    ],
    challenge:
      "Agriculture operations teams need to coordinate field activities, asset tracking, scheduling, and notifications across multiple roles — while maintaining operational continuity, strict data isolation between tenants, and reliable background automation. A generic monolith would collapse under the variant business rules.",
    solution:
      "A layered .NET 6 Web API platform with explicit project boundaries (WebAPI → BLL → DAL → Common → Jobs), global tenant filters baked into the DbContext pipeline, and a hybrid background orchestration model combining Hangfire's dashboard-visibility with Quartz's scheduler-oriented cron patterns.",
    architectureOverview: [
      "WebAPI: API surface, middleware pipeline, authentication, Swagger, Hangfire dashboard",
      "BLL: Business services, orchestration logic, external integrations, AutoMapper",
      "DAL: Entity Framework Core data layer, domain models, migrations, tenancy-aware DbContext",
      "Common: Shared contracts, settings, reusable cross-project utilities",
      "Jobs: Quartz-based scheduling components and job lifecycle helpers",
    ],
    engineeringDecisions: [
      {
        title: "Layered Multi-Project Architecture",
        decision: "Separated the solution into 5 explicit projects instead of a single monolith assembly.",
        reason:
          "Makes service dependencies visible at compile time, enables targeted testing per layer, and eliminates accidental coupling between transport logic and core domain behavior.",
        impact:
          "Faster onboarding, cleaner refactoring boundaries, and a codebase that survives team growth without structural decay.",
      },
      {
        title: "Tenant Safety by Default",
        decision:
          "Applied global EF Core filters for tenancy and soft deletes at the DbContext level, injecting tenant values during save operations.",
        reason:
          "Without centralized enforcement, every query is a potential cross-tenant data leak. Pushing this responsibility into the data layer removes the burden from every developer touching a new feature.",
        impact:
          "Eliminated a class of data consistency and privacy bugs, and made the multi-tenant guarantee auditable in one place.",
      },
      {
        title: "Dual Background Orchestration (Hangfire + Quartz)",
        decision:
          "Ran both Hangfire and Quartz.NET concurrently for different job categories.",
        reason:
          "Hangfire excels at queue-backed recurring jobs with a UI dashboard for operational visibility. Quartz handles cron-driven, scheduler-oriented patterns where trigger semantics matter. One size does not fit all operational workloads.",
        impact:
          "Mixed job categories are handled by the engine that fits their requirements, improving reliability and reducing operational surprises.",
      },
      {
        title: "Configuration-Driven Business Operations",
        decision:
          "Built a large settings surface controlling token lifetimes, notifications, weather integrations, pagination, and schedule behavior.",
        reason:
          "Hard-coding business rules creates deployment gates for every minor operational adjustment. Externalizing them decouples business tuning from engineering releases.",
        impact: "Reduced deployment friction for business rule changes and lowered the cost of operational tuning across environments.",
      },
    ],
    technicalHighlights: [
      "Multi-tenant DbContext with global query filters and automatic tenant injection on save",
      "Layered solution structure with enforced project dependency direction",
      "Dual background job orchestration: Hangfire (dashboard-managed) + Quartz (cron-scheduled)",
      "ASP.NET Identity + JWT bearer auth with explicit token validation configuration",
      "Configuration-driven behavior for notifications, weather integration, and scheduling",
      "log4net + Sentry-compatible error hooks for production observability",
      "Swagger/OpenAPI for API discoverability across mobile and web clients",
    ],
    constraints: [
      "Configuration files currently contain environment-specific values; production hardening should move all secrets to vault-based or environment-variable secret management.",
      "Mixed legacy and current patterns in startup configuration suggest room for pipeline modernization and removal of historical commented code.",
      "A test coverage layer and deployment automation artifacts would further strengthen engineering credibility in a portfolio context.",
    ],
    metrics: [
      { value: "5", label: "Solution Layers" },
      { value: "2", label: "Background Engines" },
      { value: "Multi", label: "Tenant Architecture" },
      { value: "Prod", label: "Status" },
    ],
    architectureNote:
      "Request → WebAPI middleware → BLL service → DAL (tenant-filtered) → SQL Server. Background: Hangfire queue + Quartz cron → BLL → DAL → Notifications / External APIs.",
  },
  {
    slug: "folio3-sales-bot",
    title: "Folio3 Sales Bot Platform",
    elevatorPitch:
      "A production-oriented sales knowledge assistant combining hybrid semantic retrieval, source-linked trust, and admin-controlled ingestion — moving far beyond a generic chatbot wrapper into an engineered RAG platform.",
    domain: "Enterprise AI / Sales Enablement",
    role: "Full-Stack AI Platform Engineering",
    year: "2024",
    status: "Production",
    featured: true,
    accentColor: "#00F260",
    tags: [
      { label: "FastAPI", category: "backend" },
      { label: "LangChain", category: "ai" },
      { label: "Pinecone", category: "ai" },
      { label: "PostgreSQL", category: "data" },
      { label: "SQLAlchemy", category: "data" },
      { label: "S3", category: "infra" },
      { label: "Docker Compose", category: "infra" },
      { label: "React", category: "frontend" },
      { label: "Langfuse", category: "ai" },
    ],
    challenge:
      "Sales and solution teams need fast, trustworthy answers from fragmented project assets — documents, links, and metadata — without generic responses or stale data. Traditional chatbot demos fail the moment content freshness, source traceability, and admin controls become requirements.",
    solution:
      "A full-stack RAG platform with a FastAPI backend implementing hybrid retrieval (structured listing intents vs. semantic Q&A paths), a React admin frontend with protected routing, Pinecone vector storage paired with relational metadata in PostgreSQL, and S3-backed document access for source visibility.",
    architectureOverview: [
      "FastAPI backend: Chat endpoint, retrieval orchestrator, ingestion API, auth middleware",
      "Hybrid retrieval: Intent routing distinguishes structured listing queries from semantic search paths",
      "Dual storage: Pinecone vector DB for semantic recall + PostgreSQL for high-value business metadata",
      "S3 integration: Document storage with backend-served signed URLs for source visibility",
      "React frontend: Protected admin routes, upload workflows, chat interface",
      "Docker Compose: Multi-service local topology with health checks and env-driven config",
    ],
    engineeringDecisions: [
      {
        title: "Hybrid Retrieval Strategy",
        decision:
          "Implemented an intent router that distinguishes structured listing queries from open semantic Q&A before hitting the vector store.",
        reason:
          "Sending all queries to vector search produces ambiguous answers for explicit listing intents ('show me all healthcare projects'). A routing layer gives each intent class the retrieval method it deserves.",
        impact:
          "Reduced ambiguous responses and improved answer precision for the two dominant query patterns in a sales context.",
      },
      {
        title: "Source-Linked Trust Model",
        decision:
          "Every retrieved context chunk carries source metadata, and backend routes support document-viewing workflows.",
        reason:
          "Sales teams will not trust answers they cannot verify. Source traceability converts the platform from a black box into an auditable assistant.",
        impact: "Increased answer trust and reduced follow-up verification cycles for sales conversations.",
      },
      {
        title: "Operational Ingestion Modes (new / replace / add)",
        decision:
          "Designed the upload API with explicit ingestion behavior modes rather than a single overwrite path.",
        reason:
          "Content lifecycle in enterprise settings is messy. A single overwrite creates unrecoverable data loss. Explicit modes support safe reruns, partial updates, and controlled replacements.",
        impact: "Enabled safe, repeatable ingestion operations and reduced manual database cleanup between content updates.",
      },
      {
        title: "Structured + Vector Dual Data Model",
        decision: "Kept semantic recall in Pinecone while preserving high-value business metadata in PostgreSQL.",
        reason:
          "Vector DBs excel at similarity search but are poor relational stores. Mixing concerns into one store sacrifices either query precision or metadata query efficiency.",
        impact:
          "Clean separation between semantic retrieval and structured filtering; each database does what it is built for.",
      },
    ],
    technicalHighlights: [
      "Hybrid retrieval: intent routing between structured listing and semantic Q&A paths",
      "Source-aware response pipeline with document viewing and citation support",
      "Ingestion modes: new, replace, add — supporting safe content lifecycle management",
      "Langfuse integration for LLM usage observability and model interaction monitoring",
      "Containerized multi-service topology: FastAPI + PostgreSQL + Frontend via Docker Compose",
      "Pre-commit hooks: Black, Ruff, Isort, Pytest for code quality enforcement",
      "Admin-first data control: protected frontend routes for upload and content management",
    ],
    constraints: [
      "Exact performance metrics and production traffic numbers are not in scope to disclose.",
      "Intent-routing internals are based on the observed interactor/retriever code structure; confirm classification logic precision with production traffic data before publishing hard accuracy claims.",
    ],
    metrics: [
      { value: "Hybrid", label: "Retrieval Strategy" },
      { value: "3", label: "Ingestion Modes" },
      { value: "Dual", label: "Storage Architecture" },
      { value: "Traced", label: "LLM Observability" },
    ],
    architectureNote:
      "Query → Intent Router → [Structured SQL path | Semantic Pinecone path] → Context assembly + S3 source links → LLM → Langfuse traced response.",
  },
  {
    slug: "myendo-mobile",
    title: "MyEndo Mobile Platform",
    elevatorPitch:
      "A cross-platform patient health application combining personalized onboarding, a dynamic questionnaire engine, offline-first content access, and event-driven research journey integration — built for iOS and Android with multi-environment release discipline.",
    domain: "Mobile Health / Patient Engagement",
    role: "Mobile Platform Engineering",
    year: "2024",
    status: "Production",
    featured: true,
    accentColor: "#a78bfa",
    tags: [
      { label: "React Native 0.79", category: "mobile" },
      { label: "React 19", category: "frontend" },
      { label: "Redux Toolkit", category: "frontend" },
      { label: "SQLite", category: "data" },
      { label: "Firebase Messaging", category: "infra" },
      { label: "PostHog", category: "infra" },
      { label: "Fastlane", category: "infra" },
      { label: "MMKV", category: "mobile" },
    ],
    challenge:
      "Healthcare applications must guide patients through complex personalized journeys — onboarding, questionnaire-driven research participation, and offline content access — under real-world connectivity constraints, with analytics that respect data sensitivity and a release pipeline that reduces deployment risk across multiple environments.",
    solution:
      "A React Native platform (RN 0.79 / React 19) with a reusable questionnaire engine supporting multiple answer types, a hybrid offline persistence model (MMKV for lightweight state + SQLite for structured content), privacy-aware PostHog analytics, event-driven push notification routing, and Fastlane-managed multi-flavor build/release workflows.",
    architectureOverview: [
      "Navigation: Auth-gated route trees with deep-link support for reset-password and notification-driven entry",
      "Questionnaire engine: Dynamic rendering with YEAR, BOOLEAN, single/multi-select, rating — validated per step",
      "Offline storage: MMKV for key-value state + SQLite with schema migrations for content metadata",
      "Analytics: PostHog with centralized event naming, screen tracking, and encrypted identifiers",
      "Push notifications: Foreground / background / cold-start handlers with research eligibility gating",
      "Build/release: Fastlane lanes for multi-flavor Android and iOS workflows across dev/qa/staging/prod",
    ],
    engineeringDecisions: [
      {
        title: "Dynamic Questionnaire Engine",
        decision:
          "Built a centralized flow engine supporting multiple answer types and step-level validation rather than individual one-off screens.",
        reason:
          "Hard-coding screens per question type creates fragile duplication. A reusable engine turns questionnaire logic into a composable system that survives content changes without code rewrites.",
        impact:
          "Lower cost of expanding questionnaires, consistent validation behavior across all question types, and backend-ready payload transformation in one place.",
      },
      {
        title: "Hybrid Local Persistence (MMKV + SQLite)",
        decision:
          "Used MMKV for lightweight key-value state and SQLite with migrations for richer, queryable offline content records.",
        reason:
          "Using a single storage solution for both needs creates friction: key-value stores are poor at structured queries, and SQLite is heavyweight for simple flag storage.",
        impact:
          "Clean separation between fast ephemeral state and structured offline content indexing, preserving query performance and correctness.",
      },
      {
        title: "Analytics as a First-Class Subsystem",
        decision:
          "Centralized PostHog integration with explicit event taxonomy, screen tracking, and encrypted identifiers for sensitive payload fields.",
        reason:
          "Scattering telemetry across every screen creates brittle, inconsistent data collection. In a health context, uncontrolled analytics can also violate user privacy expectations.",
        impact:
          "Product teams get actionable behavior visibility while safeguards prevent sensitive identifier exposure in analytics pipelines.",
      },
      {
        title: "Multi-Environment Release Discipline",
        decision:
          "Separate environment files and Fastlane script targets for dev / QA / staging / production, with app IDs and build variants per context.",
        reason:
          "A single build config creates risk: QA testers hit production data, release timing becomes unpredictable, and environment-specific behavior is untestable.",
        impact:
          "Deliberate release hygiene, safe QA/client preview builds, and reduced deployment surprises when moving to production.",
      },
    ],
    technicalHighlights: [
      "Dynamic questionnaire engine: YEAR, BOOLEAN, single/multi-select, rating — with per-type validation",
      "Event-driven research journey: push notification → eligibility check → contextual navigation",
      "Offline-first content download manager with progress tracking and SQLite metadata persistence",
      "Privacy-aware PostHog analytics with encrypted identifiers for sensitive health context fields",
      "Centralized API client with auth token handling, cancellation, and response interception",
      "Fastlane multi-flavor build pipeline covering Android flavors and iOS release workflows",
      "Auth-gated navigation with deep-link entry points for external links and cold-start routes",
    ],
    constraints: [
      "Hardcoded build mode selection in API config is a production risk; runtime environment-variable-driven selection should be standardized.",
      "Existing README does not capture architecture or product context, making onboarding harder for new contributors — a known improvement target.",
      "Some naming inconsistencies (questionnaire spelling variants) create low-level maintenance friction that compounds over time.",
    ],
    metrics: [
      { value: "4", label: "Environments" },
      { value: "Offline", label: "First Design" },
      { value: "RN 0.79", label: "React Native" },
      { value: "Traced", label: "Analytics" },
    ],
    architectureNote:
      "Push Notification → Eligibility Gate → Redux State → Navigation → Questionnaire Engine → SQLite + MMKV persistence → PostHog analytics event.",
  },
  {
    slug: "ted2-frontend-monorepo",
    title: "Ted2 Frontend Monorepo",
    elevatorPitch:
      "A cross-platform frontend platform connecting a Next.js web app and React Native mobile app through shared internal packages, RFC-governed architecture rules, and environment-specific delivery workflows.",
    domain: "Platform Architecture / Frontend Infrastructure",
    role: "Frontend Platform Engineering",
    year: "2024",
    status: "Production",
    featured: false,
    accentColor: "#60a5fa",
    tags: [
      { label: "Next.js 16", category: "frontend" },
      { label: "React Native 0.81", category: "mobile" },
      { label: "Turborepo", category: "infra" },
      { label: "TypeScript", category: "frontend" },
      { label: "TanStack Query", category: "frontend" },
      { label: "Zustand", category: "frontend" },
      { label: "Orval", category: "frontend" },
      { label: "Yarn Workspaces", category: "infra" },
    ],
    challenge:
      "Multi-platform frontend teams face architectural drift over time — copy-paste patterns, diverging state management strategies, and tribal knowledge replacing written constraints. The result is two codebases that technically share a domain but practically share nothing.",
    solution:
      "A Turborepo monorepo connecting Next.js (web) and React Native (mobile) through shared internal packages (@ted2/*), with architecture rules codified in an RFC, state responsibility explicitly split by intent (TanStack Query for server state, Zustand for UI state), and typed API generation via Orval.",
    architectureOverview: [
      "apps/web: Next.js 16 with shared package consumers",
      "apps/mobile: React Native 0.81 with shared package consumers",
      "packages/@ted2/api: Typed API client from Orval-generated contracts",
      "packages/@ted2/store: Zustand UI-state slices shared across apps",
      "packages/@ted2/types + constants + config: Cross-app type contracts",
      "Turborepo: Parallel task execution, build caching, dependency-aware pipeline",
      "Architecture RFC: Forbidden dependency rules, anti-patterns, enforcement guidance",
    ],
    engineeringDecisions: [
      {
        title: "RFC-Driven Architectural Governance",
        decision: "Documented architecture rules in a formal RFC including layer responsibilities and forbidden dependencies.",
        reason:
          "Architecture decisions made verbally or in Slack become invisible when teams grow. An RFC creates a written, reviewable constraint set that resists individual shortcuts.",
        impact: "Architecture decisions become explicit and auditable; AI-assisted code generation can be guided against the same rules.",
      },
      {
        title: "State Management by Intent",
        decision: "TanStack Query owns server/async state; Zustand owns local/UI state.",
        reason:
          "Mixing async cache management with synchronous UI state in a single store creates cache duplication bugs, stale update races, and unclear invalidation ownership.",
        impact: "Predictable async data flow, no duplicate fetch caching, and clear mental model for contributors on where state belongs.",
      },
      {
        title: "Typed API Generation via Orval",
        decision: "API clients generated from OpenAPI contracts rather than hand-written.",
        reason:
          "Hand-written API clients drift from server contracts silently. Generated clients make type mismatches a build-time failure.",
        impact: "Reduced integration bugs from API contract drift and faster feature development across both apps.",
      },
    ],
    technicalHighlights: [
      "Turborepo with dependency-aware task ordering and build caching",
      "Shared @ted2/* packages: api, store, types, constants, config, core, utils, localization",
      "Orval-generated typed API client from OpenAPI specifications",
      "Server-state / UI-state split: TanStack Query + Zustand",
      "Architecture RFC with forbidden dependency rules and anti-pattern definitions",
      "Environment scripts for dev/QA/staging/prod on both web and mobile",
    ],
    constraints: [
      "RFC mentions some package structure that differs slightly from current folders — indicates active evolution.",
      "Mixed package manager artifacts (yarn.lock and package-lock.json) suggest tooling migration overlap that should be resolved.",
    ],
    metrics: [
      { value: "2", label: "Apps (Web + Mobile)" },
      { value: "8+", label: "Shared Packages" },
      { value: "RFC", label: "Governed Rules" },
      { value: "Typed", label: "API Contracts" },
    ],
    architectureNote:
      "Apps consume @ted2/* packages. Packages have unidirectional dependency rules. Turborepo orchestrates builds. RFC enforces architecture boundaries.",
  },
  {
    slug: "realtime-transport-poc",
    title: "Real-Time Transport Comparison POC",
    elevatorPitch:
      "A structured engineering experiment comparing Socket.io, MQTT, and WebRTC for real-time image synchronization — using the same product UX across all three transports to produce evidence-based protocol selection rather than opinion.",
    domain: "Real-Time Systems / Protocol Research",
    role: "Systems Engineering & POC Architecture",
    year: "2024",
    status: "Research",
    featured: false,
    accentColor: "#f59e0b",
    tags: [
      { label: "React Native", category: "mobile" },
      { label: "TypeScript", category: "frontend" },
      { label: "Socket.io", category: "backend" },
      { label: "MQTT", category: "infra" },
      { label: "WebRTC", category: "infra" },
      { label: "Node / Express", category: "backend" },
    ],
    challenge:
      "Selecting a real-time transport protocol based on blog posts and benchmarks produces decisions that fail in real product contexts. Latency, developer complexity, and infrastructure requirements behave differently in controlled tests versus an actual evaluator-client session flow.",
    solution:
      "A React Native comparison harness where the same evaluator/client product flow is implemented across all three transport backends. In-app latency metrics, acknowledgement pipelines, and protocol-specific session behavior are captured under identical conditions.",
    architectureOverview: [
      "Socket.io: Server-managed auth, signaling, and protocol-filtered client discovery",
      "MQTT: Broker-based pub/sub with topic design for role-based routing",
      "WebRTC: Server-assisted signaling with peer-to-peer image data channel",
      "Shared UX: Evaluator selects transport, session lifecycle identical across protocols",
      "Metrics layer: Per-transport latency counters, success/fail rates, sample counts",
    ],
    engineeringDecisions: [
      {
        title: "Single UX, Interchangeable Transport",
        decision: "Kept the evaluator/client product flow identical across all three transports.",
        reason:
          "If the UX varies between transports, you are comparing UX implementations, not protocol characteristics. Isolating the transport layer produces honest apples-to-apples data.",
        impact: "Valid, comparable latency and complexity measurements across protocols without confounding UX variables.",
      },
      {
        title: "In-App Acknowledgement Pipeline",
        decision: "All transports implement return acknowledgements to compute end-to-end latency in near real time.",
        reason:
          "External benchmarks cannot account for your specific message sizes, network topology, and application state. Measuring inside the app converts protocol choice from intuition to observable data.",
        impact: "Runtime evidence for protocol selection rather than reliance on third-party benchmarks.",
      },
    ],
    technicalHighlights: [
      "Protocol-aware client filtering: evaluators see only clients on the selected transport",
      "Real-time ACK pipeline for end-to-end latency measurement per protocol",
      "Hybrid backend: Socket.io server for auth/signaling + MQTT broker + WebRTC peer connection",
      "Architecture documented with handshake flows, package comparisons, and transport trade-off analysis",
      "Reusable foundation for future real-time feature transport selection",
    ],
    constraints: [
      "Intended as an internal architectural experiment; production use would require managed/private MQTT broker governance.",
      "WebRTC path uses public STUN — production deployment needs TURN server infrastructure for NAT traversal reliability.",
    ],
    metrics: [
      { value: "3", label: "Protocols Compared" },
      { value: "Live", label: "Latency Metrics" },
      { value: "Same", label: "UX Across All" },
      { value: "Documented", label: "Trade-offs" },
    ],
    architectureNote:
      "Socket.io: Client ↔ Server ↔ Client (hop). MQTT: Client → Broker → Client (pub/sub). WebRTC: Client → Signaling Server → Peer connection (P2P).",
  },
  {
    slug: "hamzatex-operations",
    title: "HamzaTex Operations Suite",
    elevatorPitch:
      "A full-stack textile business operations platform centralizing inventory movement, financial transactions, client management, and PDF reporting — with a .NET backend carrying domain correctness and a React Native client as the operator interface.",
    domain: "Business Operations / Textile Industry",
    role: "Full-Stack Product Engineering",
    year: "2023",
    status: "Internal",
    featured: false,
    accentColor: "#f97316",
    tags: [
      { label: "ASP.NET Core (.NET 9)", category: "backend" },
      { label: "EF Core + MySQL", category: "data" },
      { label: "JWT + Identity", category: "backend" },
      { label: "QuestPDF", category: "backend" },
      { label: "React Native (Expo)", category: "mobile" },
      { label: "Redux Toolkit", category: "frontend" },
      { label: "Swagger / OpenAPI", category: "backend" },
      { label: "FluentValidation", category: "backend" },
    ],
    challenge:
      "Small-to-mid operational teams running inventory and finance in disconnected tools make daily decisions slowly and with high error rates. Manual reconciliation creates inaccurate stock levels, incorrect pricing, and audit-unfriendly transaction records.",
    solution:
      "An API-first .NET platform where stock movements atomically update product quantity, average cost, and movement snapshots in a single transaction. Backend-generated PDFs keep report logic centralized. Role-based access (AdminOnly / StaffOnly / AdminOrStaff) enforces operational boundaries.",
    architectureOverview: [
      "ASP.NET Core Web API with service-layer orchestration isolating business rules from controllers",
      "EF Core + MySQL: code-first migrations with business views for monthly and client-level rollups",
      "QuestPDF: backend-generated document reports for operational output consistency",
      "JWT + ASP.NET Identity: custom role claim extraction with flexible role identity mapping",
      "React Native (Expo) + Redux Toolkit: operator-facing mobile client",
      "Automatic migration + seed on startup: reduces environment drift across development setups",
    ],
    engineeringDecisions: [
      {
        title: "Atomic Stock Movement Transactions",
        decision:
          "Stock movements update product quantity, average cost/price, and movement snapshots in a single transactional operation.",
        reason:
          "Partial updates in inventory systems create ghost stock and pricing inconsistencies that compound into financial reporting errors over time.",
        impact: "Data integrity across inventory and finance domains without post-hoc reconciliation scripts.",
      },
      {
        title: "Backend-Generated PDF Reports",
        decision: "Used QuestPDF to generate business documents server-side rather than client-side rendering.",
        reason:
          "Client-side PDF generation varies across devices and platforms. Centralizing document logic in the backend ensures consistent output regardless of what client is consuming the API.",
        impact:
          "Consistent, auditable document output across all consumers with report logic in one maintainable location.",
      },
    ],
    technicalHighlights: [
      "Atomic stock movement: quantity + average cost + movement snapshot in one transaction",
      "Role-based access control: AdminOnly, StaffOnly, AdminOrStaff authorization policies",
      "Custom role claim extraction for flexible identity mapping",
      "Backend-generated PDFs via QuestPDF for consistent operational reporting",
      "Database views for monthly rollups and client-level financial summaries",
      "Automatic migration and seed on startup to reduce environment drift",
    ],
    constraints: [
      "Frontend currently reflects a simpler CRUD client and does not yet expose the full backend domain breadth — a known gap targeted for the next iteration.",
      "Production hardening elements (fine-grained CORS, deployment infra, full test coverage) are partially represented.",
    ],
    metrics: [
      { value: "Atomic", label: "Stock Transactions" },
      { value: "3", label: "Role Policies" },
      { value: "PDF", label: "Report Generation" },
      { value: "API-First", label: "Architecture" },
    ],
    architectureNote:
      "React Native client → ASP.NET Core API → Service layer (domain rules) → EF Core / MySQL → QuestPDF reports.",
  },

  // ─── Resume projects ──────────────────────────────────────────────────────
  {
    slug: "farmdocs-platform",
    title: "FarmDocs Field Operations Platform",
    elevatorPitch:
      "A cross-platform agritech monorepo connecting a React web admin for planners and a React Native mobile app for field workers — unified through a shared domain package that enforces consistent business rules across both surfaces.",
    domain: "Agritech / Field Operations",
    role: "Full-Stack Platform Engineering",
    year: "2024",
    status: "Production",
    featured: false,
    accentColor: "#4ade80",
    tags: [
      { label: "React (Web Admin)", category: "frontend" },
      { label: "React Native", category: "mobile" },
      { label: "@ecodocs/common", category: "infra" },
      { label: "Yarn Workspaces", category: "infra" },
      { label: "Fastlane", category: "infra" },
      { label: "Redux Toolkit", category: "frontend" },
    ],
    challenge:
      "Field operations teams are split: office planners configure and monitor work, while mobile workers execute tasks in the field. Without a shared domain layer, duplicate business logic creates drift — the mobile app does something slightly different from what the web admin intended.",
    solution:
      "A Yarn workspaces monorepo with three coordinated packages: the web admin (`packages/web`), mobile field app (`packages/mobile`), and a shared domain package (`@ecodocs/common`) carrying constants, store setup, API abstractions, and domain models — the single source of truth for business rules.",
    architectureOverview: [
      "packages/web: React admin panel — planning, monitoring, configuration",
      "packages/mobile: React Native field app — task execution, offline-capable patterns",
      "@ecodocs/common: shared domain — constants, API client, store setup, domain models",
      "Yarn workspaces + wml: synchronized development with hot-linked shared package",
      "Fastlane: QA / UAT / Production distribution lanes per platform",
      "Environment scripts: QA/UAT/prod commands as first-class, not afterthoughts",
    ],
    engineeringDecisions: [
      {
        title: "Shared Domain Package as the Center of Truth",
        decision: "All business rules, API contracts, and domain models live in @ecodocs/common, consumed by both web and mobile.",
        reason:
          "Without a shared center, each surface evolves its own interpretation of domain logic. Small divergences compound into hard-to-debug inconsistencies in production.",
        impact: "Cross-platform drift eliminated at the source. Changes to business rules propagate to both surfaces from one place.",
      },
      {
        title: "Environment-First Scripting Strategy",
        decision: "QA, UAT, and production run/build commands are explicit first-class scripts, not derived from a single config.",
        reason:
          "Treating environments as afterthoughts leads to accidental production deployments from QA config. Explicit scripts make promotion intentional and auditable.",
        impact: "Stable release mechanics for enterprise clients, reducing deployment risk when moving between environments.",
      },
      {
        title: "Permission-Aware UX Structure",
        decision: "Navigation and available modules are shaped by role/permissions from the shared domain layer.",
        reason:
          "Field workers and planners have fundamentally different capabilities. Mixing their flows without role-aware routing creates confused UX and potential unauthorized actions.",
        impact: "Clean role separation across both surfaces, driven by a single policy definition in the shared package.",
      },
    ],
    technicalHighlights: [
      "Monorepo with Yarn workspaces — web + mobile + shared package coordinated builds",
      "@ecodocs/common: single source for API abstractions, domain models, and store setup",
      "wml for hot-linking shared package during mobile development",
      "Fastlane-integrated distribution for QA/UAT/production mobile releases",
      "Permission-aware navigation structure across both web and mobile surfaces",
      "Environment-specific scripts as first-class delivery artifacts",
    ],
    constraints: [
      "wml hot-linking adds a manual step in the mobile development loop — a proper internal package publishing workflow would improve DX.",
      "Offline-capable patterns are referenced but full offline-first sync implementation depends on field connectivity requirements.",
    ],
    metrics: [
      { value: "3", label: "Packages" },
      { value: "2", label: "Client Surfaces" },
      { value: "3", label: "Environments" },
      { value: "Shared", label: "Domain Core" },
    ],
    architectureNote:
      "Web Admin + Mobile App both consume @ecodocs/common → shared API client → backend. Fastlane handles env-specific distribution per platform.",
  },

  {
    slug: "groalliance-platform",
    title: "GroAlliance Client Platform Variant",
    elevatorPitch:
      "A client-specific deployment of the EcoDocs platform demonstrating product-line engineering: preserve a stable monorepo core, adapt branding and release parameters per client, avoid expensive full rewrites for each deployment.",
    domain: "Agritech / Multi-Client Platform",
    role: "Platform Engineering / Client Delivery",
    year: "2024",
    status: "Production",
    featured: false,
    accentColor: "#86efac",
    tags: [
      { label: "React (Web Admin)", category: "frontend" },
      { label: "React Native", category: "mobile" },
      { label: "Shared Domain Package", category: "infra" },
      { label: "Fastlane", category: "infra" },
      { label: "Yarn Workspaces", category: "infra" },
    ],
    challenge:
      "Delivering the same operational platform to multiple clients while keeping the core stable. A full fork per client turns a manageable codebase into multiple divergent codebases with compounding maintenance costs.",
    solution:
      "A client variant built on the same monorepo scaffold (web + mobile + common) with GroAlliance-specific environment configuration, release parameters, and branding — while keeping the shared domain logic and Fastlane distribution mechanics identical to the base platform.",
    architectureOverview: [
      "Same monorepo structure as FarmDocs: web / mobile / common",
      "Client-specific environment scripts and app identifiers per QA/UAT/production",
      "Fastlane upload flows retain operational parity across client variants",
      "nohoist configuration manages client-specific native dependency coordination",
      "Shared domain package reused without modification — customization at edges only",
    ],
    engineeringDecisions: [
      {
        title: "Client Variant over Greenfield Clone",
        decision: "GroAlliance is a configured deployment of the shared platform, not a separate codebase.",
        reason:
          "A full fork means every platform-level improvement must be manually backported to each client. A variant model keeps velocity at the platform level and delivers it to all clients.",
        impact: "Platform improvements automatically benefit all client variants. Maintenance cost scales linearly, not per-client.",
      },
      {
        title: "Stable Core with Customizable Edge",
        decision: "Client specificity is confined to environment config, branding, and release parameters — never core domain logic.",
        reason:
          "Allowing client-specific changes in the core creates fragmentation. Clear customization boundaries keep the shared package trustworthy.",
        impact: "Reduced divergence cost and predictable behavior across all deployments of the platform.",
      },
    ],
    technicalHighlights: [
      "Product-line engineering: one platform core, multiple client deployments",
      "Client-specific environment and release configuration without domain logic forks",
      "Operational parity: same QA/UAT/prod release mechanics across all variants",
      "Fastlane distribution maintained consistently across client deployments",
    ],
    constraints: [
      "Client-specific feature requests that bleed into shared domain logic create backport complexity — clear RFC-level rules needed to prevent this.",
    ],
    metrics: [
      { value: "1", label: "Core Platform" },
      { value: "Multi", label: "Client Variants" },
      { value: "Zero", label: "Domain Forks" },
      { value: "Prod", label: "Status" },
    ],
    architectureNote:
      "GroAlliance-specific config → same web/mobile/common monorepo → Fastlane variant lanes → client-specific distribution.",
  },

  {
    slug: "sales-ingestion-tooling",
    title: "Sales Data Ingestion Tooling",
    elevatorPitch:
      "A Python automation layer that uploads case-study URLs from CSV into the RAG platform's ingestion API — with operator-in-the-loop controls, explicit upload modes, and failure-safe execution that makes content pipeline reruns safe and repeatable.",
    domain: "Data Engineering / AI Platform Operations",
    role: "Platform Operations Engineering",
    year: "2024",
    status: "Internal",
    featured: false,
    accentColor: "#34d399",
    tags: [
      { label: "Python", category: "backend" },
      { label: "requests", category: "backend" },
      { label: "CSV automation", category: "data" },
      { label: "FastAPI integration", category: "backend" },
      { label: "Env-driven config", category: "infra" },
    ],
    challenge:
      "Knowledge systems degrade when content updates are manual, inconsistent, or hard to rerun safely. One bad ingestion run can corrupt the vector store with duplicate or stale embeddings, and there is no safe rollback without clear operational tooling.",
    solution:
      "A scripted ingestion workflow that parses structured CSV rows (division, project, source URL), calls backend upload endpoints one item at a time, supports explicit upload modes (new / replace / add), logs failed row payloads for remediation, and includes interactive operator controls to pause and review before processing each row.",
    architectureOverview: [
      "CSV parser: normalizes rows, filters empty/invalid entries, maps to API payload shape",
      "Upload modes: new (first-time), replace (deterministic rerun), add (append-only)",
      "Operator controls: interactive next / all / skip flow for row-level review",
      "API client: auth token + base URL via environment variables for context portability",
      "Failure handling: stops on error, logs full payload for remediation, no silent failures",
    ],
    engineeringDecisions: [
      {
        title: "Explicit Upload Modes (new / replace / add)",
        decision: "Three distinct ingestion behaviors rather than a single overwrite path.",
        reason:
          "A single overwrite is destructive by default. Explicit modes make the operator's intent clear — replace is safe for reruns, add prevents accidental overwrite, new guards against duplicates.",
        impact: "Safe, repeatable ingestion operations. Content pipeline reruns are deterministic and auditable.",
      },
      {
        title: "Operator-in-the-Loop Controls",
        decision: "Interactive next / all / skip flow rather than fully automated batch processing.",
        reason:
          "Bulk automation without review gates is dangerous for content pipelines. An operator reviewing a sample before triggering bulk mode catches data hygiene issues before they contaminate the vector store.",
        impact: "Reduced ingestion errors and improved operator confidence during content updates.",
      },
    ],
    technicalHighlights: [
      "CSV normalization with row filtering for data hygiene before API calls",
      "Three ingestion modes: new, replace, add — aligned with backend lifecycle API",
      "Row-level operator review: next / all / skip interactive controls",
      "Auth token + base URL via env vars — portable across local/dev/staging contexts",
      "Failure-safe: stops on error, logs full failed payload for targeted remediation",
    ],
    constraints: [
      "Script-level metrics (success rate, rows processed) are not currently persisted — a run log would improve operational auditability.",
      "Intended for internal operational workflows; not designed for end-user-facing use.",
    ],
    metrics: [
      { value: "3", label: "Upload Modes" },
      { value: "Safe", label: "Rerun Design" },
      { value: "Traced", label: "Failure Output" },
      { value: "Env", label: "Portable Config" },
    ],
    architectureNote:
      "CSV rows → normalizer → mode selector (new/replace/add) → API client → FastAPI ingestion endpoint → Pinecone + PostgreSQL.",
  },

  // ─── Research & AI Projects (from resume) ────────────────────────────────
  {
    slug: "eeg-emotion-classification",
    title: "EEG-Based Emotion Classification",
    elevatorPitch:
      "A deep learning research project classifying human emotions from raw EEG brain signals — combining signal preprocessing, feature extraction, and neural network training to map brainwave patterns to emotional states.",
    domain: "Deep Learning / Neuroscience Research",
    role: "ML Research Engineering",
    year: "2024–Present",
    status: "Research",
    featured: false,
    accentColor: "#c084fc",
    tags: [
      { label: "TensorFlow", category: "ai" },
      { label: "Keras", category: "ai" },
      { label: "Scikit-learn", category: "ai" },
      { label: "EEG Signal Processing", category: "data" },
      { label: "Python", category: "backend" },
      { label: "Feature Extraction", category: "data" },
    ],
    challenge:
      "EEG signals are high-dimensional, noisy, and highly subject-specific — making emotion classification extremely difficult. Raw brainwave data contains artifacts from muscle movement, eye blinks, and environmental interference that must be removed before any meaningful pattern can be learned.",
    solution:
      "A deep learning pipeline that starts with rigorous EEG data cleaning and artifact removal, applies feature extraction to transform raw time-series signals into structured representations, and trains TensorFlow/Keras neural network models to classify emotional states from the processed signal features.",
    architectureOverview: [
      "Raw EEG data ingestion: multi-channel brainwave recordings per subject",
      "Preprocessing: artifact removal (eye blinks, muscle noise), bandpass filtering, epoch segmentation",
      "Feature extraction: frequency-domain features (delta, theta, alpha, beta bands), statistical descriptors",
      "Model architecture: deep neural networks trained with TensorFlow/Keras on extracted features",
      "Evaluation: Scikit-learn metrics (accuracy, F1, confusion matrix) for cross-subject validation",
      "Ongoing: exploring CNN and LSTM architectures for raw signal learning",
    ],
    engineeringDecisions: [
      {
        title: "Feature Engineering over End-to-End Raw Learning",
        decision: "Applying domain-specific feature extraction (frequency bands, statistical features) before feeding data to the model.",
        reason:
          "EEG datasets are small relative to the signal dimensionality. Domain-specific features reduce input noise and dimensionality, improving model convergence with limited labeled data.",
        impact: "More stable training and interpretable feature importance — critical for research reproducibility.",
      },
      {
        title: "Rigorous Preprocessing as a First-Class Step",
        decision: "Dedicated data cleaning and artifact removal pipeline before any model training.",
        reason:
          "EEG signals are extremely sensitive to noise. A model trained on uncleaned data learns artifacts, not emotions. Clean data is the most valuable investment in this domain.",
        impact: "Higher signal-to-noise ratio in training data, reducing false pattern learning from non-emotion artifacts.",
      },
      {
        title: "Scikit-learn for Evaluation, Not Training",
        decision: "Using Scikit-learn metrics alongside TensorFlow/Keras training loop rather than a single framework.",
        reason:
          "Keras metrics are sufficient for gradient feedback but Scikit-learn provides richer evaluation tools (confusion matrices, classification reports, cross-validation) for research-grade assessment.",
        impact: "Thorough, multi-metric evaluation that supports honest reporting of model performance.",
      },
    ],
    technicalHighlights: [
      "Multi-channel EEG signal pipeline: artifact removal → epoch segmentation → feature extraction",
      "Frequency-band feature extraction: delta, theta, alpha, beta wave decomposition",
      "TensorFlow + Keras neural network training on extracted EEG feature vectors",
      "Scikit-learn evaluation: accuracy, F1, confusion matrix, cross-subject validation",
      "Ongoing exploration of CNN architectures for end-to-end raw signal classification",
    ],
    constraints: [
      "EEG datasets are small and highly subject-specific — cross-subject generalization remains the central open challenge.",
      "Ongoing research; final model architecture and performance benchmarks are still being established.",
    ],
    metrics: [
      { value: "Multi", label: "EEG Channels" },
      { value: "4", label: "Freq. Bands" },
      { value: "DL", label: "Architecture" },
      { value: "Active", label: "Research" },
    ],
    architectureNote:
      "Raw EEG → artifact removal → bandpass filter → epoch → feature extraction (freq bands) → TF/Keras model → emotion class prediction.",
  },

  {
    slug: "license-plate-detection",
    title: "License Plate Detection System",
    elevatorPitch:
      "A real-time computer vision system that detects and annotates vehicle license plates using a custom-trained YOLO v8 model — with GPU-accelerated PyTorch training on a custom dataset and OpenCV preprocessing for production-ready inference.",
    domain: "Computer Vision / Real-Time Detection",
    role: "Computer Vision Engineering",
    year: "2024",
    status: "Research",
    featured: false,
    accentColor: "#fb923c",
    tags: [
      { label: "YOLO v8", category: "ai" },
      { label: "PyTorch", category: "ai" },
      { label: "OpenCV", category: "ai" },
      { label: "CUDA / NVIDIA 940MX", category: "infra" },
      { label: "Python", category: "backend" },
      { label: "Custom Dataset", category: "data" },
    ],
    challenge:
      "License plate detection in real-world conditions requires handling variable lighting, angles, occlusion, and plate formats. A generic off-the-shelf model trained on unrelated data produces unreliable bounding boxes. A custom-trained model on domain-specific data is needed for reliable detection.",
    solution:
      "A YOLO v8 model fine-tuned on a custom license plate dataset, with OpenCV-based image preprocessing to standardize inputs before inference. PyTorch handles GPU-accelerated training on an NVIDIA 940MX, and detection outputs are stored as structured CSV files with bounding box coordinates for both license plates and surrounding vehicles.",
    architectureOverview: [
      "Data pipeline: custom dataset collection, annotation, and format conversion for YOLO",
      "Preprocessing: OpenCV image normalization, resizing, and augmentation",
      "Model: YOLO v8 fine-tuned on custom dataset with PyTorch training loop",
      "GPU acceleration: CUDA on NVIDIA 940MX for training and inference",
      "Output: bounding box coordinates stored in structured CSV per detected frame",
      "Inference: real-time frame-by-frame detection with annotated bounding boxes",
    ],
    engineeringDecisions: [
      {
        title: "Custom Dataset over Pre-trained Generics",
        decision: "Built and annotated a domain-specific license plate dataset rather than using generic COCO-pretrained weights alone.",
        reason:
          "Pre-trained YOLO weights detect generic objects. License plates have specific proportions, text patterns, and placement relative to vehicles that require domain-specific fine-tuning.",
        impact: "Higher detection precision on the target domain compared to generic model baselines.",
      },
      {
        title: "GPU-Accelerated Training with CUDA",
        decision: "Leveraged CUDA on the available NVIDIA 940MX GPU for training acceleration.",
        reason:
          "YOLO training on CPU is prohibitively slow for iterative experimentation. GPU acceleration reduces per-epoch time by an order of magnitude, enabling faster iteration on hyperparameters and augmentation strategies.",
        impact: "Practical training iteration speed — able to run multiple experiments in a session rather than waiting hours per run.",
      },
      {
        title: "Structured CSV Output for Bounding Boxes",
        decision: "Storing detection coordinates as structured CSV rather than only rendering annotated images.",
        reason:
          "Annotated image output is useful for visualization but not for downstream analysis. Structured coordinates enable post-processing, tracking, and statistical analysis of detection results.",
        impact: "Detection output is both human-reviewable and machine-processable for downstream pipeline integration.",
      },
    ],
    technicalHighlights: [
      "YOLO v8 fine-tuned on a custom-annotated license plate dataset",
      "OpenCV preprocessing: normalization, resizing, augmentation pipeline",
      "GPU-accelerated PyTorch training on NVIDIA 940MX via CUDA",
      "Dual detection: license plates and surrounding vehicles in the same inference pass",
      "Structured CSV output: bounding box coordinates per frame for downstream analysis",
      "Real-time inference with annotated bounding box overlay",
    ],
    constraints: [
      "940MX GPU has limited VRAM — batch size and model scale are constrained by hardware, which affects training throughput.",
      "Custom dataset size is limited; additional data collection and augmentation would further improve generalization to unseen plate formats.",
    ],
    metrics: [
      { value: "YOLOv8", label: "Architecture" },
      { value: "GPU", label: "CUDA Training" },
      { value: "Custom", label: "Dataset" },
      { value: "Real-time", label: "Inference" },
    ],
    architectureNote:
      "Input frames → OpenCV preprocessing → YOLO v8 (PyTorch / CUDA) → bounding box predictions → CSV coordinates + annotated output.",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const secondaryProjects = projects.filter((p) => !p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
