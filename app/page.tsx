import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Leadership from "@/components/Leadership";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Work />
      <Experience />
      <Leadership />
      <Skills />
      <Contact />
    </main>
  );
}
