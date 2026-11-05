import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import CommandPalette from "@/components/CommandPalette";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";
import "./globals.css";

// Latin subsets keep the hero font small. Mono is decorative (eyebrows, chips), so it skips preload.
const GeistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const GeistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", preload: false });

const title = `${site.name} | ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: ["Full-Stack Engineer", "React Native", "Angular", "ASP.NET Core", "Next.js", "TypeScript", "LLM", "RAG", site.name],
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: { title, description: site.description, type: "website", locale: "en_US", url: "/", siteName: site.name },
  twitter: { card: "summary_large_image", title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070B14" },
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
  ],
};

// Runs before paint so the saved/OS theme never flashes.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||(!t&&matchMedia("(prefers-color-scheme: light)").matches))document.documentElement.dataset.theme="light"}catch(e){}`;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Software Engineer",
  worksFor: { "@type": "Organization", name: "Folio3" },
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "FAST-NUCES" },
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: [site.github, site.linkedin],
  knowsAbout: ["React Native", "TypeScript", "Angular", "Next.js", "ASP.NET Core", "C#", "PostgreSQL", "LLM", "RAG"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body className="bg-bg font-sans text-text-primary antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
          Skip to content
        </a>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <CommandPalette projects={projects.map(({ slug, title }) => ({ slug, title }))} />
      </body>
    </html>
  );
}
