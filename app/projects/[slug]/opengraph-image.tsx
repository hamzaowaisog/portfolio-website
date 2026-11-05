import { ogImage, ogSize } from "@/lib/og";
import { getProjectBySlug, projects } from "@/data/projects";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProjectBySlug((await params).slug)!;
  return ogImage(`Case study · ${p.period}`, p.title, p.domain);
}
