import { useEffect } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Recognition from "./components/Recognition.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ToTop from "./components/ToTop.jsx";
import FlightPath from "./components/FlightPath.jsx";

/* One observer for every `.reveal` element on the page — reveals each as it
   nears the viewport and immediately shows anything already on screen
   (covers deep links and short pages that never scroll). */
function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".reveal:not(.in)"));
    if (!nodes.length) return undefined;

    const show = (el) => el.classList.add("in");
    const vh = () => window.innerHeight || document.documentElement.clientHeight || 900;
    /* Reveal anything whose top is inside the viewport. This must be the FULL
       height, not a fraction — the hero fills the screen exactly, so its CTAs
       sit flush with the bottom edge and any margin here leaves them invisible
       on load. The observer below keeps the softer margin for scrolling. */
    const check = () => {
      for (const el of nodes) {
        if (!el.classList.contains("in") && el.getBoundingClientRect().top < vh()) show(el);
      }
    };

    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && show(e.target)),
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      nodes.forEach((n) => io.observe(n));
    }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    check();

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);
}

export default function App() {
  useReveal();
  return (
    <div className="relative min-h-screen">
      <Nav />
      <FlightPath />
      <main>
        <Hero />
        {/* About owns its own screen and ends with the scrolling org band */}
        <About />
        <Experience />
        <Recognition />
        <Contact />
      </main>
      <Footer />
      <ToTop />
    </div>
  );
}
