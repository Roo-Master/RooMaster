import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Re-generate the page at most once a minute; admin edits also trigger an instant refresh
export const revalidate = 60;

// Ordered the way recruiters scan: pitch, proof (projects), experience, skills, story, contact
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
