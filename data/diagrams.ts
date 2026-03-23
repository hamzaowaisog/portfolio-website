import type { ArchDiagramProps } from "@/components/project/ArchitectureDiagram";

type DiagramData = Omit<ArchDiagramProps, "accentColor">;

export const diagrams: Record<string, DiagramData> = {
  "ecodocs-backend": {
    title: "ecodocs.architecture",
    nodes: [
      { id: "client",   label: "Web / Mobile",  sublabel: "React / React Native", type: "client" },
      { id: "webapi",   label: "WebAPI",         sublabel: "ASP.NET Core",          type: "api" },
      { id: "bll",      label: "BLL",            sublabel: "Business Services",     type: "service" },
      { id: "dal",      label: "DAL",            sublabel: "EF Core + Tenancy",     type: "data" },
      { id: "db",       label: "SQL Server",     sublabel: "Multi-tenant DB",       type: "data" },
      { id: "hangfire", label: "Hangfire",        sublabel: "Queue Jobs",            type: "infra" },
      { id: "quartz",   label: "Quartz.NET",     sublabel: "Cron Scheduler",        type: "infra" },
      { id: "notif",    label: "Notifications",  sublabel: "Push / Email",          type: "external" },
    ],
    edges: [
      { from: "client",   to: "webapi",   label: "HTTPS / JWT" },
      { from: "webapi",   to: "bll",      label: "DI services" },
      { from: "bll",      to: "dal",      label: "repositories" },
      { from: "dal",      to: "db",       label: "EF Core" },
      { from: "bll",      to: "hangfire", label: "enqueue" },
      { from: "bll",      to: "quartz",   label: "schedule" },
      { from: "hangfire", to: "notif",    label: "dispatch" },
    ],
  },

  "folio3-sales-bot": {
    title: "salesbot.architecture",
    nodes: [
      { id: "admin",    label: "Admin UI",      sublabel: "React + Router",         type: "client" },
      { id: "chat",     label: "Chat UI",       sublabel: "React",                  type: "client" },
      { id: "api",      label: "FastAPI",        sublabel: "Python backend",         type: "api" },
      { id: "router",   label: "Intent Router", sublabel: "Structured vs Semantic",  type: "service" },
      { id: "pinecone", label: "Pinecone",       sublabel: "Vector Store",           type: "data" },
      { id: "postgres", label: "PostgreSQL",     sublabel: "Metadata + Auth",        type: "data" },
      { id: "s3",       label: "S3 Storage",     sublabel: "Documents",              type: "infra" },
      { id: "langfuse", label: "Langfuse",        sublabel: "LLM Observability",     type: "external" },
    ],
    edges: [
      // Horizontal row-1 edges — midpoint (t=0.5) is fine
      { from: "admin",    to: "api",      label: "upload / manage" },
      { from: "chat",     to: "api",      label: "query" },
      { from: "api",      to: "router",   label: "classify intent" },
      { from: "router",   to: "pinecone", label: "semantic search" },
      // Diagonal edges crossing into row 2 — stagger t so labels don't collide
      { from: "router",   to: "postgres", label: "structured query", labelT: 0.28 },
      { from: "api",      to: "s3",       label: "doc access",        labelT: 0.55, labelOffsetY: -10 },
      { from: "api",      to: "langfuse", label: "trace LLM calls",   labelT: 0.68, labelOffsetY: 10 },
    ],
  },

  "myendo-mobile": {
    title: "myendo.architecture",
    nodes: [
      { id: "nav",    label: "Navigation",    sublabel: "Auth-gated routes",    type: "client" },
      { id: "quiz",   label: "Questionnaire", sublabel: "Dynamic engine",       type: "service" },
      { id: "redux",  label: "Redux Toolkit", sublabel: "App state",            type: "service" },
      { id: "api",    label: "API Client",    sublabel: "Axios + interceptors",  type: "api" },
      { id: "sqlite", label: "SQLite",        sublabel: "Offline content",       type: "data" },
      { id: "mmkv",   label: "MMKV",          sublabel: "Key-value store",       type: "data" },
      { id: "fcm",    label: "Firebase",       sublabel: "Push notifications",    type: "external" },
      { id: "posthog",label: "PostHog",        sublabel: "Analytics",             type: "external" },
    ],
    edges: [
      { from: "nav",    to: "quiz",    label: "deep-link",    labelT: 0.5 },
      { from: "nav",    to: "redux",   label: "state",        labelT: 0.5 },
      { from: "quiz",   to: "api",     label: "submit",       labelT: 0.5 },
      { from: "api",    to: "sqlite",  label: "persist",      labelT: 0.5 },
      { from: "redux",  to: "mmkv",    label: "cache",        labelT: 0.5 },
      { from: "fcm",    to: "nav",     label: "notification", labelT: 0.30 },
      { from: "quiz",   to: "posthog", label: "events",       labelT: 0.65 },
    ],
  },

  "ted2-frontend-monorepo": {
    title: "ted2.monorepo.architecture",
    nodes: [
      { id: "web",    label: "apps/web",     sublabel: "Next.js 16",          type: "client" },
      { id: "mobile", label: "apps/mobile",  sublabel: "React Native 0.81",   type: "client" },
      { id: "api",    label: "@ted2/api",    sublabel: "Orval-generated",      type: "api" },
      { id: "store",  label: "@ted2/store",  sublabel: "Zustand UI-state",     type: "service" },
      { id: "types",  label: "@ted2/types",  sublabel: "Shared contracts",     type: "infra" },
      { id: "utils",  label: "@ted2/utils",  sublabel: "Core helpers",         type: "infra" },
      { id: "turbo",  label: "Turborepo",    sublabel: "Build orchestration",  type: "infra" },
    ],
    edges: [
      // web & mobile → api/store go diagonally; stagger labels
      { from: "web",    to: "api",    label: "consumes", labelT: 0.35 },
      { from: "mobile", to: "api",    label: "consumes", labelT: 0.55, labelOffsetY: 10 },
      { from: "web",    to: "store",  label: "UI state", labelT: 0.40 },
      { from: "mobile", to: "store",  label: "UI state", labelT: 0.60, labelOffsetY: 10 },
      { from: "api",    to: "types",  label: "typed",    labelT: 0.5 },
      { from: "turbo",  to: "web",    label: "builds",   labelT: 0.35 },
      { from: "turbo",  to: "mobile", label: "builds",   labelT: 0.60, labelOffsetY: 10 },
    ],
  },

  "realtime-transport-poc": {
    title: "transport.comparison.architecture",
    nodes: [
      { id: "rn",      label: "React Native",   sublabel: "Evaluator / Client",   type: "client" },
      { id: "sio",     label: "Socket.io",       sublabel: "Server-managed",       type: "api" },
      { id: "mqtt",    label: "MQTT Broker",     sublabel: "Pub/Sub",              type: "infra" },
      { id: "wrtc",    label: "WebRTC",          sublabel: "P2P + Signaling",      type: "infra" },
      { id: "metrics", label: "Latency Metrics", sublabel: "In-app ACK pipeline",  type: "service" },
      { id: "server",  label: "Node/Express",    sublabel: "Signaling + Auth",     type: "api" },
    ],
    edges: [
      // rn fans out to 3 protocol nodes — stagger labels
      { from: "rn",     to: "sio",     label: "Socket.io path", labelT: 0.35 },
      { from: "rn",     to: "mqtt",    label: "MQTT path",       labelT: 0.50 },
      { from: "rn",     to: "wrtc",    label: "WebRTC path",     labelT: 0.65 },
      // protocol nodes fan into metrics — stagger labels
      { from: "sio",    to: "metrics", label: "ACK", labelT: 0.35 },
      { from: "mqtt",   to: "metrics", label: "ACK", labelT: 0.50, labelOffsetY: -12 },
      { from: "wrtc",   to: "metrics", label: "ACK", labelT: 0.65, labelOffsetY: 12 },
      { from: "server", to: "wrtc",    label: "signaling", labelT: 0.5 },
    ],
  },

  "hamzatex-operations": {
    title: "hamzatex.architecture",
    nodes: [
      { id: "rn",      label: "React Native",   sublabel: "Expo client",          type: "client" },
      { id: "api",     label: "ASP.NET Core",   sublabel: ".NET 9 Web API",       type: "api" },
      { id: "svc",     label: "Service Layer",  sublabel: "Domain logic",         type: "service" },
      { id: "ef",      label: "EF Core",         sublabel: "+ MySQL",              type: "data" },
      { id: "identity",label: "JWT + Identity", sublabel: "Role policies",        type: "infra" },
      { id: "pdf",     label: "QuestPDF",        sublabel: "Report generation",    type: "service" },
    ],
    edges: [
      { from: "rn",       to: "api",      label: "REST + JWT" },
      { from: "api",      to: "identity", label: "authorize" },
      { from: "api",      to: "svc",      label: "delegate" },
      { from: "svc",      to: "ef",       label: "persist" },
      { from: "svc",      to: "pdf",      label: "generate" },
    ],
  },

  "farmdocs-platform": {
    title: "farmdocs.monorepo.architecture",
    nodes: [
      { id: "web",    label: "packages/web",    sublabel: "React Admin",           type: "client" },
      { id: "mobile", label: "packages/mobile", sublabel: "React Native",          type: "client" },
      { id: "common", label: "@ecodocs/common", sublabel: "Shared domain layer",   type: "service" },
      { id: "api",    label: "API Client",       sublabel: "In common package",     type: "api" },
      { id: "store",  label: "Store Setup",      sublabel: "Redux / shared state",  type: "service" },
      { id: "fl",     label: "Fastlane",          sublabel: "QA / UAT / Prod",       type: "infra" },
      { id: "backend",label: "Backend API",       sublabel: "EcoDocs Platform",      type: "external" },
    ],
    edges: [
      { from: "web",    to: "common",  label: "consumes",    labelT: 0.35 },
      { from: "mobile", to: "common",  label: "consumes",    labelT: 0.60, labelOffsetY: 10 },
      { from: "common", to: "api",     label: "provides",    labelT: 0.40 },
      { from: "common", to: "store",   label: "provides",    labelT: 0.60, labelOffsetY: 10 },
      { from: "api",    to: "backend", label: "HTTPS",       labelT: 0.50 },
      { from: "mobile", to: "fl",      label: "distribute",  labelT: 0.50 },
    ],
  },

  "groalliance-platform": {
    title: "groalliance.variant.architecture",
    nodes: [
      { id: "core",    label: "Platform Core",   sublabel: "Shared web/mobile/common", type: "service" },
      { id: "env",     label: "Client Config",   sublabel: "Env / app IDs / branding", type: "infra" },
      { id: "web",     label: "Web Admin",        sublabel: "GroAlliance branded",      type: "client" },
      { id: "mobile",  label: "Mobile App",       sublabel: "GroAlliance branded",      type: "client" },
      { id: "fl",      label: "Fastlane Lanes",   sublabel: "QA / UAT / Prod",          type: "infra" },
      { id: "backend", label: "Backend API",       sublabel: "EcoDocs Core",             type: "external" },
    ],
    edges: [
      { from: "core",   to: "web",     label: "powers",    labelT: 0.35 },
      { from: "core",   to: "mobile",  label: "powers",    labelT: 0.60, labelOffsetY: 10 },
      { from: "env",    to: "web",     label: "configure", labelT: 0.35, labelOffsetY: -10 },
      { from: "env",    to: "mobile",  label: "configure", labelT: 0.60 },
      { from: "mobile", to: "fl",      label: "release",   labelT: 0.50 },
      { from: "web",    to: "backend", label: "API calls", labelT: 0.50 },
    ],
  },

  "sales-ingestion-tooling": {
    title: "ingestion.pipeline.architecture",
    nodes: [
      { id: "csv",     label: "CSV Source",     sublabel: "URLs + metadata",        type: "client" },
      { id: "parser",  label: "Row Parser",      sublabel: "Normalize + filter",     type: "service" },
      { id: "mode",    label: "Mode Selector",   sublabel: "new / replace / add",    type: "service" },
      { id: "ctrl",    label: "Operator Loop",   sublabel: "next / all / skip",      type: "service" },
      { id: "apicli",  label: "API Client",       sublabel: "auth + base URL",        type: "api" },
      { id: "ingest",  label: "FastAPI Endpoint", sublabel: "Ingestion API",          type: "api" },
      { id: "store",   label: "Pinecone + PG",   sublabel: "Vector + metadata",      type: "data" },
    ],
    edges: [
      { from: "csv",    to: "parser",  label: "raw rows" },
      { from: "parser", to: "mode",    label: "clean rows" },
      { from: "mode",   to: "ctrl",    label: "staged" },
      { from: "ctrl",   to: "apicli",  label: "approved" },
      { from: "apicli", to: "ingest",  label: "POST" },
      { from: "ingest", to: "store",   label: "embed + store" },
    ],
  },

  "eeg-emotion-classification": {
    title: "eeg.classification.pipeline",
    nodes: [
      { id: "raw",     label: "Raw EEG Data",    sublabel: "Multi-channel signals",     type: "data" },
      { id: "clean",   label: "Preprocessing",   sublabel: "Artifact removal + filter", type: "service" },
      { id: "feat",    label: "Feature Extract",  sublabel: "Freq. bands + stats",       type: "service" },
      { id: "split",   label: "Train / Val Split",sublabel: "Scikit-learn",              type: "service" },
      { id: "model",   label: "Keras Model",      sublabel: "TensorFlow DNN",            type: "ai" },
      { id: "eval",    label: "Evaluation",        sublabel: "F1 · Accuracy · CM",        type: "service" },
      { id: "pred",    label: "Emotion Class",     sublabel: "Output prediction",         type: "client" },
    ],
    edges: [
      { from: "raw",   to: "clean",  label: "raw signals" },
      { from: "clean", to: "feat",   label: "clean epochs" },
      { from: "feat",  to: "split",  label: "feature vectors" },
      { from: "split", to: "model",  label: "train set" },
      { from: "model", to: "eval",   label: "predictions" },
      { from: "eval",  to: "pred",   label: "class label" },
    ],
  },

  "license-plate-detection": {
    title: "license.plate.detection.pipeline",
    nodes: [
      { id: "input",   label: "Video / Images",  sublabel: "Input frames",              type: "client" },
      { id: "cv",      label: "OpenCV Prep",      sublabel: "Resize + normalize",        type: "service" },
      { id: "dataset", label: "Custom Dataset",   sublabel: "Annotated plates",          type: "data" },
      { id: "train",   label: "PyTorch Training", sublabel: "CUDA / NVIDIA 940MX",       type: "infra" },
      { id: "yolo",    label: "YOLO v8 Model",    sublabel: "Fine-tuned weights",        type: "ai" },
      { id: "bbox",    label: "Bounding Boxes",   sublabel: "Plate + vehicle",           type: "service" },
      { id: "csv",     label: "CSV Output",        sublabel: "Coordinates per frame",     type: "data" },
    ],
    edges: [
      { from: "dataset", to: "train",  label: "fine-tune" },
      { from: "train",   to: "yolo",   label: "weights" },
      { from: "input",   to: "cv",     label: "raw frames" },
      { from: "cv",      to: "yolo",   label: "preprocessed" },
      { from: "yolo",    to: "bbox",   label: "detections" },
      { from: "bbox",    to: "csv",    label: "store coords" },
    ],
  },
};
