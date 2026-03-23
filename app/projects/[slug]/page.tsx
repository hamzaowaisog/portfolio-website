import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectHero from "@/components/project/ProjectHero";
import ArchitectureSection from "@/components/project/ArchitectureSection";
import DecisionLog from "@/components/project/DecisionLog";
import TechnicalHighlights from "@/components/project/TechnicalHighlights";
import ConstraintsPanel from "@/components/project/ConstraintsPanel";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Muhammad Hamza — Platform Engineer`,
    description: project.elevatorPitch,
    openGraph: {
      title: `${project.title} | Platform Architecture Case Study`,
      description: project.elevatorPitch,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  // Get next featured project for navigation
  const allSlugs = projects.map((p) => p.slug);
  const currentIdx = allSlugs.indexOf(slug);
  const nextProject =
    currentIdx < allSlugs.length - 1
      ? { slug: projects[currentIdx + 1].slug, title: projects[currentIdx + 1].title }
      : null;

  return (
    <main className="bg-bg min-h-screen">
      <Navbar />

      <ProjectHero project={project} />

      <ArchitectureSection project={project} />

      <DecisionLog
        decisions={project.engineeringDecisions}
        accentColor={project.accentColor}
      />

      <TechnicalHighlights
        highlights={project.technicalHighlights}
        accentColor={project.accentColor}
      />

      <ConstraintsPanel
        constraints={project.constraints}
        accentColor={project.accentColor}
        nextProject={nextProject}
      />

      <Footer />
    </main>
  );
}
