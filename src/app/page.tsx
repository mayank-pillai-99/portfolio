import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Bento from "@/components/Bento";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
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
        <Bento />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer id="site-footer" className="border-t border-line px-4 py-8 text-center font-mono text-xs text-dim">
        © {new Date().getFullYear()} MAYANK PILLAI · BUILT WITH NEXT.JS
      </footer>
    </>
  );
}
