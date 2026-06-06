"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/content";
import { GameProvider } from "@/components/providers/GameProvider";
import LoadingScreen from "@/components/LoadingScreen";
import HUD from "@/components/HUD";
import Navigation from "@/components/Navigation";
import RadioBar from "@/components/RadioBar";
import Hero from "@/components/sections/Hero";
import CheatConsole from "@/components/easter/CheatConsole";
import KonamiWanted from "@/components/easter/KonamiWanted";
import MissionPassed from "@/components/easter/MissionPassed";

// Lazy-load below-the-fold sections to keep the first paint light.
const About = dynamic(() => import("@/components/sections/About"));
const AgentGraph = dynamic(() => import("@/components/sections/AgentGraph"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Publications = dynamic(() => import("@/components/sections/Publications"));
const Certifications = dynamic(() => import("@/components/sections/Certifications"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

const MONEY_TARGET = 10_000_000; // flavor figure the counter lands on at the bottom

function Game() {
  const [loaded, setLoaded] = useState(false);
  const [money, setMoney] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [missionPassed, setMissionPassed] = useState(false);
  const passedOnce = useRef(false);

  // Scroll-money counter. Ticks up with scroll depth, lands on a round number.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const progress = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
        const raw = progress * MONEY_TARGET;
        // Round to the nearest 1000 so it reads like a clean money figure.
        setMoney(Math.round(raw / 1000) * 1000);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [loaded]);

  // Track the active section for the radar and tuner via IntersectionObserver.
  useEffect(() => {
    if (!loaded) return;
    const order = navItems.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = order.indexOf(visible.target.id);
          if (idx >= 0) setActiveIndex(idx);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -40% 0px" }
    );
    order.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [loaded]);

  const navigate = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleProjectsComplete = useCallback(() => {
    if (passedOnce.current) return;
    passedOnce.current = true;
    setMissionPassed(true);
  }, []);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      {/* Texture overlays */}
      <div className="grain-overlay" aria-hidden />
      <div className="vignette-overlay" aria-hidden />

      {loaded && (
        <>
          <HUD money={money} activeIndex={activeIndex} />
          <Navigation onNavigate={navigate} />
          <RadioBar activeIndex={activeIndex} onNavigate={navigate} />
          <CheatConsole />
          <KonamiWanted />
          <MissionPassed show={missionPassed} onHide={() => setMissionPassed(false)} />
        </>
      )}

      <main className={loaded ? "opacity-100 transition-opacity duration-700" : "opacity-0"}>
        <Hero onNavigate={navigate} />
        <About />
        <AgentGraph />
        <Projects onComplete={handleProjectsComplete} />
        <Experience />
        <Publications />
        <Certifications />
        <Contact />

        <footer className="relative border-t border-white/10 px-5 py-10 text-center">
          <div
            className="absolute left-0 right-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, var(--hud-cyan), var(--hud-pink), transparent)" }}
            aria-hidden
          />
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Built with Next.js, Three.js, and Framer Motion. Designed and shipped by Bharath Kumar Rajesh.
          </p>
          <p className="mt-2 font-display text-xl font-bold text-[var(--accent)]">THANKS FOR EXPLORING</p>
        </footer>
      </main>
    </>
  );
}

export default function Page() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}
