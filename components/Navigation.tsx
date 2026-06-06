"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useGame } from "./providers/GameProvider";

// Inline steering-wheel glyph, original art.
function SteeringWheel({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx={24} cy={24} r={20} fill="none" stroke="currentColor" strokeWidth={3} />
      <circle cx={24} cy={24} r={6} fill="currentColor" />
      <path d="M24 30 L24 44" stroke="currentColor" strokeWidth={3} />
      <path d="M19 25 L6 33" stroke="currentColor" strokeWidth={3} />
      <path d="M29 25 L42 33" stroke="currentColor" strokeWidth={3} />
      <rect x={16} y={12} width={16} height={5} rx={2} fill="currentColor" />
    </svg>
  );
}

export default function Navigation({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [wheelOpen, setWheelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();
  const { play } = useGame();

  // Tab opens and closes the desktop steering wheel.
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
        className="carbon pointer-events-auto fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 shadow-hud transition-transform hover:scale-105 hover:rotate-12"
        aria-label="Open steering wheel menu"
        aria-expanded={wheelOpen || menuOpen}
      >
        <SteeringWheel className="h-7 w-7 text-hudcyan" />
      </button>

      {/* Desktop radial steering wheel */}
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
              aria-label="Steering wheel navigation"
            >
              {/* Hub */}
              <div className="carbon absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/10 text-center shadow-hud">
                <SteeringWheel className="h-8 w-8 text-hudcyan" />
                <span className="mt-1 font-display text-xs text-hudcyan">SELECT</span>
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
                    className="carbon absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/10 text-center shadow-hud transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
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
              className="carbon absolute right-0 top-0 flex h-full w-72 max-w-[80vw] flex-col gap-1 border-l border-white/10 p-5 pt-16 shadow-hud"
              initial={{ x: reduced ? 0 : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: reduced ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              aria-label="Pit menu navigation"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-2xl text-[var(--accent)]">PIT MENU</span>
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
                  className="flex items-center gap-3 rounded-lg border border-transparent px-4 py-4 text-left font-display text-xl tracking-wide transition-colors hover:border-white/10 hover:bg-white/5 hover:text-[var(--accent)]"
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
