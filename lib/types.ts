export interface TechTag {
  label: string;
  category: "backend" | "frontend" | "mobile" | "infra" | "ai" | "data";
}

export interface EngineeringDecision {
  title: string;
  decision: string;
  reason: string;
  impact: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  elevatorPitch: string;
  domain: string;
  role: string;
  year: string;
  status: "Production" | "Research" | "Internal" | "POC";
  featured: boolean;
  accentColor: string;
  tags: TechTag[];
  challenge: string;
  solution: string;
  architectureOverview: string[];
  engineeringDecisions: EngineeringDecision[];
  technicalHighlights: string[];
  constraints: string[];
  metrics?: ProjectMetric[];
  architectureNote?: string;
}
