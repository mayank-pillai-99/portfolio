import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Toolkit from "@/components/Toolkit";
import Contact from "@/components/Contact";
import Divider from "@/components/Divider";
import ScrollProgress from "@/components/ScrollProgress";
import Spotlight from "@/components/Spotlight";
import Ambient from "@/components/Ambient";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Intro />
      <Ambient />
      <ScrollProgress />
      <Spotlight />
      <Nav />
      <BackToTop />
      <main>
        <Hero />
        <Projects />
        <Divider color="var(--color-neural)" />
        <Experience />
        <div className="band relative mt-12 py-[3vw]">
          <Toolkit />
        </div>
        <Contact />
      </main>
      <footer className="border-t border-line px-4 py-8 text-center font-mono text-xs text-dim">
        © {new Date().getFullYear()} MAYANK PILLAI · BUILT WITH NEXT.JS
      </footer>
    </>
  );
}
