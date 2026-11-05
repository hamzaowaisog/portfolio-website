import type { Project } from "@/lib/types";

// Order matters: featured projects appear in this order, and "next project" links follow it.
export const projects: Project[] = [
  {
    slug: "ai-factory",
    title: "AI Factory",
    elevatorPitch:
      "An internal LLM pipeline, co-built with a colleague, that turns a plain-English change request into a tested pull request on .NET + PostgreSQL codebases. Tests are written first, checks run in sealed containers, and a merge gate blocks any change that has not been verified.",
    domain: "Internal R&D / AI Developer Tooling",
    role: "Co-builder · top contributor",
    period: "Sep – Oct 2026",
    status: "Internal R&D",
    featured: true,
    tags: [
      { label: "TypeScript", category: "frontend" },
      { label: "LLM Agents", category: "ai" },
      { label: ".NET", category: "backend" },
      { label: "PostgreSQL", category: "data" },
      { label: "Sealed containers", category: "infra" },
      { label: "Test-first", category: "infra" },
    ],
    challenge:
      "LLM coding tools can produce plausible code quickly, but plausible is not the bar for a real .NET + PostgreSQL codebase. A change can break the data model, skip tests, or quietly cost more than expected. The goal was a pipeline that takes a plain-English request all the way to a pull request a reviewer can trust, not just a code suggestion.",
    solution:
      "A TypeScript CLI that moves a change request through gated steps. Each step selects its own LLM model, schema-affecting work must pass a data-model / ERD gate, design exports are handed off into the pipeline, tests are written before the implementation, and checks run in sealed containers. Every step's cost is logged, and a merge gate refuses to produce a pull request for unverified changes.",
    architectureOverview: [
      "CLI entry: a plain-English change request against a .NET + PostgreSQL codebase",
      "Per-step model selection: each pipeline step picks its own LLM model",
      "Data-model / ERD gate: schema-affecting changes are checked against the data model",
      "Design-export handoff: exported designs are handed into the pipeline as input",
      "Test-first: tests are written before code; checks run in sealed containers",
      "Cost logging: LLM spend is recorded per step",
      "Merge gate: unverified changes never become a pull request",
    ],
    engineeringDecisions: [
      {
        title: "Per-Step Model Selection",
        decision: "Let each pipeline step choose its own LLM model instead of running the whole request on one model.",
        reason:
          "Steps ask very different things of a model. Pinning one model everywhere either overpays for simple steps or underpowers the hard ones.",
        impact: "Model choice became a per-step setting, and per-step cost logging made the trade-off visible instead of guessed.",
      },
      {
        title: "Tests First, Verified in Sealed Containers",
        decision: "Write the tests before the implementation and run every check inside a sealed container.",
        reason:
          "Tests written after generated code tend to describe what the code does, not what the request asked for. Sealed containers keep a run from depending on, or changing, anything outside it.",
        impact: "A passing run means the requested behaviour was specified up front and checked in isolation.",
      },
      {
        title: "A Merge Gate That Says No",
        decision: "Block the pull request whenever a change has not been verified, rather than opening it with warnings.",
        reason: "A pull request is a request for a human's attention. Opening unverified ones moves the cost of checking onto the reviewer.",
        impact: "Only verified changes reach review.",
      },
      {
        title: "Data-Model / ERD Gate",
        decision: "Route schema-affecting changes through an explicit data-model check.",
        reason:
          "On a PostgreSQL-backed system the schema is the most expensive thing to get wrong; a bad migration outlives the code that introduced it.",
        impact: "Data-model changes are reviewed as data-model changes, not buried inside a larger diff.",
      },
    ],
    technicalHighlights: [
      "Co-built with a colleague; top contributor with 144 commits in 3 weeks",
      "Wrote 83 test files for the pipeline itself",
      "Per-step LLM model selection with per-step cost logging",
      "Data-model / ERD gate for schema-affecting changes",
      "Design-export handoff into the pipeline",
      "Merge gate that blocks unverified changes",
    ],
    constraints: [
      "Internal R&D at Folio3: built and evaluated in-house, not released as a product.",
      "Co-built: the design was shared with a colleague; the highlights above are the parts I built.",
    ],
    // TODO(hamza): add an outcome metric (e.g. requests that reached a verified PR) if you have a real number.
    metrics: [
      { value: "144", label: "Commits (top contributor)" },
      { value: "83", label: "Test files" },
      { value: "3", label: "Weeks" },
    ],
    architectureNote:
      "Change request → CLI → per-step model selection (+ cost log) → data-model / ERD gate → tests first → implementation → checks in sealed container → merge gate → pull request.",
  },
  {
    slug: "angus-media-sale-book",
    title: "Angus Media Sale Book Portal",
    elevatorPitch:
      "A livestock sale-book portal where I took in-book PDF search from proof of concept to production Solr indexing, with a custom layout parser that rebuilds tables and keeps search highlights accurate at any zoom.",
    domain: "Livestock Media / Document Search",
    role: "Full-Stack Engineer",
    period: "Aug – Sep 2026",
    status: "Production",
    featured: true,
    tags: [
      { label: "Angular", category: "frontend" },
      { label: "ASP.NET Web API", category: "backend" },
      { label: "C#", category: "backend" },
      { label: "iTextSharp", category: "data" },
      { label: "Apache Solr", category: "data" },
      { label: "Hangfire", category: "infra" },
    ],
    challenge:
      "Sale books are PDFs with multi-column layouts and tables. Plain text extraction scrambles reading order and flattens tables, and a search highlight is only useful if it still sits on the matched words when the reader zooms. Separately, lot imports were all-or-nothing: one invalid file aborted the whole batch.",
    solution:
      "An iTextSharp layout parser that splits each page with recursive XY-cut region detection, rebuilds tables from text coordinates, and stores page-relative positions so highlights stay aligned at any zoom. It runs inside the existing Hangfire job and feeds Apache Solr. Lot import was rebuilt as a multi-file upload with per-file partial success.",
    architectureOverview: [
      "Hangfire: the existing background job now runs extraction and indexing",
      "Layout parser (iTextSharp): recursive XY-cut region detection for reading order",
      "Table reconstruction: rows and columns rebuilt from text coordinates",
      "Positions: stored page-relative so highlights scale with zoom",
      "Apache Solr: indexed text and positions power in-book search",
      "Angular + ASP.NET Web API: queue and filter features, multi-file lot import",
    ],
    engineeringDecisions: [
      {
        title: "Recursive XY-Cut Instead of Raw Text Order",
        decision: "Segment each page into regions by recursively cutting along whitespace gaps before reading text.",
        reason: "PDF text order follows how the file was written, not how a person reads a multi-column page.",
        impact: "Indexed text follows the page's reading order, so search hits land in the right block.",
      },
      {
        title: "Page-Relative Coordinates",
        decision: "Store every text position relative to the page size rather than in absolute points.",
        reason: "Absolute positions are only correct at one zoom level; the viewer renders at many.",
        impact: "Highlights stay on the matched words at any zoom.",
      },
      {
        title: "Line Grouping from O(n²) to O(n)",
        decision: "Replaced a pairwise line-grouping step with a single linear pass.",
        reason: "Comparing every text fragment with every other grows quadratically with page density.",
        impact: "The step now grows linearly with the number of text fragments on a page.",
      },
      {
        title: "Per-File Partial Success for Lot Imports",
        decision: "Rebuilt lot import as a multi-file upload that reports success or failure per file.",
        reason: "In an all-or-nothing import, one bad file throws away every good one in the batch.",
        impact: "One invalid file no longer aborts the batch; tested with 5 categories in a single request.",
      },
    ],
    technicalHighlights: [
      "Took in-book PDF search from proof of concept to production Solr indexing",
      "Recursive XY-cut region detection and coordinate-based table reconstruction",
      "Ran inside the existing Hangfire job: no new infrastructure",
      "Cut a line-grouping step from O(n²) to O(n)",
      "Shipped 7 queue and filter features and fixed 3 query bugs",
      "Fixed video downloads that saved an HTML page as .mp4",
    ],
    constraints: [
      "Client code and documents are proprietary; the diagram is reconstructed at the architecture level.",
    ],
    metrics: [
      { value: "O(n)", label: "Line grouping, was O(n²)" },
      { value: "7", label: "Features shipped" },
      { value: "3", label: "Query bugs fixed" },
      { value: "Per-file", label: "Import results" },
    ],
    architectureNote:
      "PDF upload → existing Hangfire job → XY-cut regions → table reconstruction → page-relative positions → Apache Solr → search hits highlighted in the viewer at any zoom.",
  },
  {
    slug: "landteller",
    title: "LandTeller / ViewTeller",
    elevatorPitch:
      "A multi-tenant land-sales platform on a .NET API and Frappe/ERPNext, where I closed a sold-lot data exposure, developed fixes for 3 critical tenant-isolation findings, and built sales dashboards covered by 18 automated tests.",
    domain: "Land Sales / Multi-Tenant Platform",
    role: "Software Engineer · security and data",
    period: "Oct 2026 – Present",
    status: "In progress",
    featured: true,
    tags: [
      { label: ".NET", category: "backend" },
      { label: "Frappe/ERPNext", category: "backend" },
      { label: "Frappe Insights", category: "data" },
      { label: "Multi-tenancy", category: "infra" },
      { label: "Security review", category: "infra" },
    ],
    challenge:
      "In a multi-tenant platform, one missing check can show a tenant data that belongs to someone else. A security review raised 33 findings, 5 of them critical and 6 high, and sold-lot data was reachable where it should not have been. Sales dashboards also needed correct data underneath them.",
    solution:
      "Closed the sold-lot exposure across the .NET API and the Frappe/ERPNext app, with a documented 403 contract for the frontend and .NET regression tests. Developed fixes for 3 critical tenant-isolation findings across 3 repositories. Built Frappe Insights sales dashboards backed by 2 data-repair patches and 18 automated tests.",
    architectureOverview: [
      ".NET API: tenant-scoped access checks; sold lots return a documented 403",
      "Frontend: consumes the 403 contract instead of guessing at empty results",
      "Regression tests: .NET test suites so the fixes cannot silently regress",
      "Frappe/ERPNext: sales data source for reporting",
      "Data repair: 2 patches that fix the records the dashboards read",
      "Frappe Insights: sales dashboards with 18 automated tests",
    ],
    engineeringDecisions: [
      {
        title: "A Documented 403 Contract",
        decision: "Return an explicit, documented 403 for sold lots instead of quietly filtering them out.",
        reason:
          "Silent filtering makes 'not allowed' look like 'not found', and the frontend cannot tell the two apart. An explicit status is testable on both sides.",
        impact: "The frontend has a stable contract, and the rule is pinned by .NET regression tests.",
      },
      {
        title: "Regression Tests With Every Security Fix",
        decision: "Pair each access-control fix with tests that fail if the hole reopens.",
        reason: "Security fixes regress quietly; nobody notices a missing check until it is exploited.",
        impact: "Added 2 .NET test suites around the tenant-isolation fixes; the sold-lot fix has its own regression tests.",
      },
      {
        title: "Repair the Data Before Charting It",
        decision: "Wrote 2 data-repair patches before building the sales dashboards.",
        reason: "A dashboard over inconsistent records only makes wrong numbers look official.",
        impact: "Dashboards are built on repaired data and covered by 18 automated tests.",
      },
    ],
    technicalHighlights: [
      "Closed a sold-lot data exposure across the .NET API and Frappe/ERPNext app",
      "Developed fixes for 3 critical tenant-isolation findings from a 33-finding security review",
      "2 .NET test suites so the fixes cannot regress",
      "Built Frappe Insights sales dashboards with 18 automated tests",
      "2 data-repair patches under the dashboards",
      "Fixed broken attachment links",
    ],
    constraints: [
      "Ongoing engagement: the tenant-isolation fixes are developed and tested but not yet merged, and the dashboards are built but not yet launched.",
      "Client code is proprietary; no findings, endpoints or data are shown here.",
    ],
    metrics: [
      { value: "33", label: "Review findings" },
      { value: "3", label: "Critical fixes developed" },
      { value: "18", label: "Dashboard tests" },
      { value: "2", label: ".NET test suites" },
    ],
    architectureNote:
      "Frontend → .NET API (tenant checks; sold lots → documented 403) ← regression suites. ERPNext data → 2 repair patches → Frappe Insights dashboards ← 18 tests.",
  },
  {
    slug: "myendo-mobile",
    title: "MyEndo Mobile Platform",
    elevatorPitch:
      "A cross-platform patient health application combining personalized onboarding, a dynamic questionnaire engine, offline-first content access, and event-driven research journey integration — built for iOS and Android with multi-environment release discipline.",
    domain: "Mobile Health / Patient Engagement",
    role: "Mobile engineer · release owner",
    period: "Dec 2025 – Present",
    status: "Production",
    featured: true,
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
        title: "Native Kotlin Patch for Fullscreen Video",
        decision: "Fixed Android fullscreen video zoom and rotation with a native Kotlin patch.",
        reason: "JavaScript gesture approaches proved impossible for this behaviour; the fix had to live below the React Native layer.",
        impact: "Fullscreen video zoom and rotation work on Android.",
      },
      {
        title: "Root Cause Over Restart",
        decision: "Traced a staging outage where every analytics endpoint returned 502 to a failed ZooKeeper container with no restart policy, then wrote the runbook.",
        reason: "Restarting services would have cleared the symptom and left the same failure waiting to recur.",
        impact: "The cause is known and the recovery steps are written down.",
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
      "Own releases through v1.4 (Android build 28) via Fastlane to TestFlight and Firebase App Distribution",
      "Traced a staging outage (every analytics endpoint returning 502) to a failed ZooKeeper container with no restart policy, then wrote the recovery runbook",
      "Encrypted user identifiers and emails in PostHog across 63 tracked event types",
      "Fixed Android fullscreen video zoom and rotation with a native Kotlin patch",
      "Load-test script with adaptive backpressure",
    ],
    constraints: [
      "Hardcoded build mode selection in API config is a production risk; runtime environment-variable-driven selection should be standardized.",
      "Existing README does not capture architecture or product context, making onboarding harder for new contributors — a known improvement target.",
      "Some naming inconsistencies (questionnaire spelling variants) create low-level maintenance friction that compounds over time.",
    ],
    metrics: [
      { value: "v1.4", label: "Releases shipped" },
      { value: "4", label: "Environments" },
      { value: "5", label: "Question types" },
      { value: "63", label: "Tracked event types" },
    ],
    architectureNote:
      "Push Notification → Eligibility Gate → Redux State → Navigation → Questionnaire Engine → SQLite + MMKV persistence → PostHog analytics event.",
  },
  {
    slug: "ted2-frontend-monorepo",
    title: "TED2 Monorepo (FEW Center)",
    elevatorPitch:
      "A cross-platform frontend platform connecting a Next.js web app and React Native mobile app through shared internal packages, RFC-governed architecture rules, and environment-specific delivery workflows.",
    domain: "Platform Architecture / Frontend Infrastructure",
    role: "Frontend platform engineer · RFC author",
    period: "2026",
    status: "Production",
    featured: true,
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
        title: "Native Image Downsampling",
        decision: "Traced a ~900MB iPad memory spike to full-resolution image decoding and switched to native downsampling.",
        reason: "Decoding images at full resolution for on-screen thumbnails spent memory the device did not have, and the spike crashed the app.",
        impact: "Eliminated the memory spike and the crashes it caused.",
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
      "Authored the architecture RFCs governing the monorepo",
      "Eliminated iPad crashes by tracing a ~900MB memory spike to full-resolution image decoding and switching to native downsampling",
      "Benchmarked 3 real-time protocols (Socket.IO, MQTT, WebRTC) with an in-app latency pipeline",
    ],
    constraints: [
      "RFC mentions some package structure that differs slightly from current folders — indicates active evolution.",
      "Mixed package manager artifacts (yarn.lock and package-lock.json) suggest tooling migration overlap that should be resolved.",
    ],
    metrics: [
      { value: "~900MB", label: "Memory spike eliminated" },
      { value: "3", label: "Protocols benchmarked" },
      { value: "2", label: "Apps (Web + Mobile)" },
      { value: "8+", label: "Shared Packages" },
    ],
    architectureNote:
      "Apps consume @ted2/* packages. Packages have unidirectional dependency rules. Turborepo orchestrates builds. RFC enforces architecture boundaries.",
  },
  {
    slug: "malani-wholesale",
    title: "Malani Wholesale Management System",
    elevatorPitch:
      "A wholesale and distribution management system I built solo in 5 weeks: 119 REST endpoints, 31 data models, 44 pages and 733 automated tests, now in production use.",
    domain: "Wholesale & Distribution",
    role: "Sole developer",
    period: "Aug – Sep 2026",
    status: "Production",
    featured: true,
    tags: [
      { label: "NestJS", category: "backend" },
      { label: "Next.js", category: "frontend" },
      { label: "Prisma", category: "data" },
      { label: "PostgreSQL", category: "data" },
      { label: "Turborepo", category: "infra" },
      { label: "Orval", category: "frontend" },
      { label: "Formik + Yup", category: "frontend" },
    ],
    challenge:
      "A wholesale business needed one system for its purchase lifecycle, payments and receipts, and it had to be built by one engineer in 5 weeks without trading away correctness.",
    solution:
      "A Turborepo monorepo with a NestJS + Prisma API over PostgreSQL (119 endpoints across 15 modules, 31 models) and a Next.js web app (44 pages) that calls the API through Orval-generated typed hooks, with a shared UI and translation package. Delivered in 9 sprints with 733 automated tests.",
    architectureOverview: [
      "apps/api: NestJS, 119 REST endpoints across 15 modules",
      "Prisma + PostgreSQL: 31 data models",
      "apps/web: Next.js, 44 pages, Formik + Yup forms",
      "Orval: typed hooks generated from the API contract",
      "Shared packages: UI components and translations",
      "Tests: 733 automated tests across the system",
    ],
    engineeringDecisions: [
      {
        title: "Generated Typed Hooks (Orval)",
        decision: "Generate the web app's data hooks from the API contract instead of writing fetch calls by hand.",
        reason: "With one developer moving fast across 119 endpoints, hand-written clients drift from the API without anyone noticing.",
        impact: "An API change that breaks the web app fails at compile time, not in production.",
      },
      {
        title: "Shared UI and Translation Package",
        decision: "Put UI components and translations in one shared package in the monorepo.",
        reason: "44 pages built in 5 weeks stay consistent only if they draw from one place.",
        impact: "Pages share one component set and one source of strings.",
      },
      {
        title: "15 Modules, One Owner",
        decision: "Split the API into 15 NestJS modules rather than one large service.",
        reason: "Clear module boundaries keep a 119-endpoint API navigable when one person builds and maintains all of it.",
        impact: "Purchase lifecycle, payments and receipts sit behind their own module boundaries, backed by 733 automated tests.",
      },
    ],
    technicalHighlights: [
      "Built solo in 5 weeks across 9 sprints; now in production use",
      "119 REST endpoints across 15 NestJS modules",
      "31 Prisma data models on PostgreSQL",
      "44 Next.js pages with Orval-generated typed hooks",
      "Purchase lifecycle, payments and receipts",
      "733 automated tests",
    ],
    constraints: ["Client code is proprietary; the architecture is described, not shown."],
    metrics: [
      { value: "119", label: "REST endpoints" },
      { value: "31", label: "Data models" },
      { value: "44", label: "Pages" },
      { value: "733", label: "Automated tests" },
    ],
    architectureNote:
      "Next.js pages → Orval typed hooks → NestJS API (15 modules) → Prisma → PostgreSQL. Shared UI + i18n package across the Turborepo.",
  },
  {
    slug: "hamzatex-operations",
    title: "HamzaTex Operations Suite",
    elevatorPitch:
      "A full-stack textile inventory and accounting app I built solo and that is now in production use: a .NET 10 backend with 159 REST endpoints and 43 entities, about 57 React Native screens, and a pre-release security audit that closed 7 issues.",
    domain: "Business Operations / Textile Industry",
    role: "Solo full-stack developer",
    period: "Nov 2025 – Present",
    status: "Production",
    featured: false,
    tags: [
      { label: "ASP.NET Core (.NET 10)", category: "backend" },
      { label: "EF Core", category: "data" },
      { label: "React Native", category: "mobile" },
      { label: "TypeScript", category: "frontend" },
      { label: "Zustand", category: "frontend" },
      { label: "TanStack Query", category: "frontend" },
      { label: "Orval", category: "frontend" },
      { label: "QuestPDF", category: "backend" },
      { label: "JWT", category: "backend" },
    ],
    challenge:
      "Small-to-mid operational teams running inventory and finance in disconnected tools make daily decisions slowly and with high error rates. Manual reconciliation creates inaccurate stock levels, incorrect pricing, and audit-unfriendly transaction records.",
    solution:
      "An API-first .NET 10 platform where stock movements update product quantity, average cost and movement snapshots in one transaction. JWT role-based policies (AdminOnly / StaffOnly / AdminOrStaff) enforce operational boundaries, QuestPDF generates reports server-side, and a React Native client of about 57 screens uses Zustand, TanStack Query and Orval-generated hooks.",
    architectureOverview: [
      "ASP.NET Core (.NET 10) Web API: 159 REST endpoints, service layer isolating business rules from controllers",
      "EF Core: 43 entities with migrations and views for monthly and client-level rollups",
      "QuestPDF: backend-generated reports for consistent output",
      "JWT role-based policies with custom role-claim extraction",
      "React Native client: about 57 screens on Zustand, TanStack Query and Orval-generated hooks",
      "Ownership checks: users can only reach their own records",
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
      "Built solo (257 commits); now in production use",
      "Pre-release security audit closed 7 issues, including ownership checks that stop users accessing other users' records",
      "Atomic stock movement: quantity + average cost + movement snapshot in one transaction",
      "Role-based access control: AdminOnly, StaffOnly, AdminOrStaff authorization policies",
      "Custom role claim extraction for flexible identity mapping",
      "Backend-generated PDFs via QuestPDF for consistent operational reporting",
      "Database views for monthly rollups and client-level financial summaries",
      "Automatic migration and seed on startup to reduce environment drift",
    ],
    constraints: [
      "Solo project: architecture and security decisions were checked through a dedicated pre-release audit rather than a team review.",
    ],
    metrics: [
      { value: "159", label: "REST endpoints" },
      { value: "~57", label: "Screens" },
      { value: "43", label: "Entities" },
      { value: "7", label: "Audit issues closed" },
    ],
    architectureNote:
      "React Native client → Orval hooks → ASP.NET Core (.NET 10) API → service layer (domain rules, ownership checks) → EF Core → QuestPDF reports.",
  },

  // ─── Resume projects ──────────────────────────────────────────────────────,
  {
    slug: "ecodocs-backend",
    title: "EcoDocs Backend Platform",
    elevatorPitch:
      "A domain-heavy agritech backend platform powering end-to-end operational workflows — from field scheduling and multi-tenant data access to background job orchestration and notification pipelines.",
    domain: "Agritech Operations",
    role: "Backend Architecture & Platform Engineering",
    period: "2025",
    status: "Production",
    featured: false,
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
    period: "2025",
    status: "Production",
    featured: false,
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
    slug: "farmdocs-platform",
    title: "FarmDocs Field Operations Platform",
    elevatorPitch:
      "A cross-platform agritech monorepo connecting a React web admin for planners and a React Native mobile app for field workers — unified through a shared domain package that enforces consistent business rules across both surfaces.",
    domain: "Agritech / Field Operations",
    role: "Full-Stack Platform Engineering",
    period: "2025",
    status: "Production",
    featured: false,
    tags: [
      { label: "React (Web Admin)", category: "frontend" },
      { label: "React Native 0.81", category: "mobile" },
      { label: "React 19", category: "frontend" },
      { label: "SQLite", category: "data" },
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
      "Upgraded to React Native 0.81 and React 19, adding TypeScript, across 2 client variants without a rewrite",
      "Offline-first field app (Redux, SQLite) across 3 release environments",
    ],
    constraints: [
      "wml hot-linking adds a manual step in the mobile development loop — a proper internal package publishing workflow would improve DX.",
    ],
    metrics: [
      { value: "RN 0.81", label: "Upgraded, no rewrite" },
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
    period: "2025",
    status: "Production",
    featured: false,
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
    slug: "realtime-transport-poc",
    title: "Real-Time Transport Comparison POC",
    elevatorPitch:
      "A structured engineering experiment comparing Socket.io, MQTT, and WebRTC for real-time image synchronization — using the same product UX across all three transports to produce evidence-based protocol selection rather than opinion.",
    domain: "Real-Time Systems / Protocol Research (FEW Center)",
    role: "Systems Engineering & POC Architecture",
    period: "Feb – Mar 2026",
    status: "Research",
    featured: false,
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
    slug: "sales-ingestion-tooling",
    title: "Sales Data Ingestion Tooling",
    elevatorPitch:
      "A Python automation layer that uploads case-study URLs from CSV into the RAG platform's ingestion API — with operator-in-the-loop controls, explicit upload modes, and failure-safe execution that makes content pipeline reruns safe and repeatable.",
    domain: "Data Engineering / AI Platform Operations",
    role: "Trainee Software Engineer",
    period: "2025",
    status: "Internal",
    featured: false,
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

  // ─── Research & AI Projects (from resume) ────────────────────────────────,
  {
    slug: "license-plate-detection",
    title: "License Plate Detection System",
    elevatorPitch:
      "A real-time computer vision system that detects and annotates vehicle license plates using a custom-trained YOLO v8 model — with GPU-accelerated PyTorch training on a custom dataset and OpenCV preprocessing for production-ready inference.",
    domain: "Computer Vision / Real-Time Detection",
    role: "App Developer Intern",
    period: "Jun – Aug 2024",
    status: "Research",
    featured: false,
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
  {
    // TODO(hamza): EEG project is not in the v5/v6 resume; confirm the period and whether to keep it.
    slug: "eeg-emotion-classification",
    title: "EEG-Based Emotion Classification",
    elevatorPitch:
      "A deep learning research project classifying human emotions from raw EEG brain signals — combining signal preprocessing, feature extraction, and neural network training to map brainwave patterns to emotional states.",
    domain: "Deep Learning / Neuroscience Research",
    role: "ML Research Engineering",
    period: "2024–Present",
    status: "Research",
    featured: false,
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
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
