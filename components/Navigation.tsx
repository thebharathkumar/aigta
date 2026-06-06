"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useGame } from "./providers/GameProvider";

export default function Navigation({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [wheelOpen, setWheelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();
  const { play } = useGame();

  // Tab opens and closes the desktop weapon wheel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = ["INPUT", "TEXTAREA"].includes(target?.tagName);
      if (e.key === "Tab" && !typing) {
        e.preventDefault();
        setWheelOpen((o) => {
          if (!o) play("whoosh");
          return !o;
        });
      }
      if (e.key === "Escape") {
        setWheelOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [play]);

  const go = (id: string) => {
    play("click");
    setWheelOpen(false);
    setMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Trigger button, bottom-right. Opens wheel on desktop, menu on mobile. */}
      <button
        type="button"
        onClick={() => {
          play("whoosh");
          if (window.innerWidth >= 768) setWheelOpen((o) => !o);
          else setMenuOpen((o) => !o);
        }}
        className="hud-panel pointer-events-auto fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-hud transition-transform hover:scale-105"
        aria-label="Open navigation menu"
        aria-expanded={wheelOpen || menuOpen}
      >
        <Target className="text-hudgold" />
      </button>

      {/* Desktop radial weapon wheel */}
      <AnimatePresence>
        {wheelOpen && (
          <motion.div
            className="fixed inset-0 z-[60] hidden items-center justify-center md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWheelOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div
              className="relative h-[440px] w-[440px]"
              initial={{ scale: reduced ? 1 : 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: reduced ? 1 : 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              role="menu"
              aria-label="Weapon wheel navigation"
            >
              {/* Hub */}
              <div className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/10 bg-surface text-center shadow-hud">
                <span className="font-display text-sm text-hudgold">SELECT</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                  Tab to close
                </span>
              </div>

              {navItems.map((item, i) => {
                const angle = (i / navItems.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 165;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    onClick={() => go(item.id)}
                    className="hud-panel absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center shadow-hud transition-colors hover:border-hudgold/70 hover:text-hudgold"
                    style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: reduced ? 0 : i * 0.03 }}
                  >
                    <span className="px-1 font-display text-xs leading-tight">{item.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile pause menu list */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="hud-panel absolute right-0 top-0 flex h-full w-72 max-w-[80vw] flex-col gap-1 p-5 pt-16 shadow-hud"
              initial={{ x: reduced ? 0 : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: reduced ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              aria-label="Pause menu navigation"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-2xl text-hudgold">PAUSE</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-muted hover:text-ink"
                >
                  <X />
                </button>
              </div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  className="flex items-center gap-3 rounded-lg border border-transparent px-4 py-4 text-left font-display text-xl tracking-wide transition-colors hover:border-white/10 hover:bg-white/5 hover:text-hudgold"
                >
                  <Menu size={16} className="text-muted" />
                  {item.label}
                </button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
