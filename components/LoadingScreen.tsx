"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { loadingTips, profile } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useGame } from "./providers/GameProvider";
import RaceCar from "./art/RaceCar";

// F1 start-lights sequence. Five lights illuminate one by one, then lights out
// and the car launches, dismissing into the hero.
export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [lights, setLights] = useState(0); // 0 to 5 lit
  const [lightsOut, setLightsOut] = useState(false);
  const [ready, setReady] = useState(false);
  const [tip, setTip] = useState(0);
  const [launched, setLaunched] = useState(false);
  const reduced = useReducedMotion();
  const { play } = useGame();

  // Light up the five lights, then go dark ("lights out") and arm the launch.
  useEffect(() => {
    if (lights < 5) {
      const id = setTimeout(() => {
        setLights((l) => l + 1);
        play("click");
      }, 600);
      return () => clearTimeout(id);
    }
    const hold = setTimeout(() => {
      setLightsOut(true);
      setReady(true);
      play("rev");
    }, 700);
    return () => clearTimeout(hold);
  }, [lights, play]);

  // Cycle the boot tip lines.
  useEffect(() => {
    const id = setInterval(() => setTip((t) => (t + 1) % loadingTips.length), 760);
    return () => clearInterval(id);
  }, []);

  const launch = () => {
    if (!ready || launched) return;
    play("whoosh");
    setLaunched(true);
    setTimeout(onDone, reduced ? 0 : 700);
  };

  useEffect(() => {
    const onKey = () => launch();
    if (ready) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, launched]);

  const progress = Math.min(100, Math.round((lights / 5) * 100));

  return (
    <AnimatePresence>
      {!launched && (
        <motion.div
          key="lights"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#050507]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.7 }}
          onClick={launch}
          role="dialog"
          aria-label="Race start lights. Press any key or click to launch."
        >
          <div className="scanlines" aria-hidden />

          <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-hudcyan">
            Formation Lap Complete
          </p>
          <h1 className="mb-8 px-6 text-center font-display text-3xl text-ink md:text-5xl">
            {profile.name}
          </h1>

          {/* The five-light gantry. */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 px-5 py-4 md:gap-5 md:px-8 md:py-6">
            {Array.from({ length: 5 }).map((_, i) => {
              const lit = !lightsOut && i < lights;
              return (
                <div key={i} className="flex flex-col gap-2">
                  {[0, 1].map((row) => (
                    <motion.span
                      key={row}
                      className="block h-7 w-7 rounded-full md:h-10 md:w-10"
                      style={{
                        background: lit ? "var(--f1-red)" : "#1a1a1f",
                        boxShadow: lit ? "0 0 22px 4px rgba(225,6,0,0.7)" : "none",
                      }}
                      animate={lightsOut ? { background: "#0c0c10" } : {}}
                    />
                  ))}
                </div>
              );
            })}
          </div>

          <div className="mt-8 h-6">
            <AnimatePresence mode="wait">
              {ready ? (
                <motion.button
                  key="go"
                  type="button"
                  onClick={launch}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-display text-2xl tracking-[0.2em] text-hudgreen md:text-3xl"
                >
                  <motion.span animate={reduced ? {} : { opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 0.9 }}>
                    LIGHTS OUT. TAP TO GO
                  </motion.span>
                </motion.button>
              ) : (
                <motion.span
                  key="tip"
                  className="font-mono text-xs text-muted md:text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  aria-live="polite"
                >
                  {loadingTips[tip]} {progress}%
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Launching car. */}
          <motion.div
            className="pointer-events-none absolute bottom-10 w-[260px] md:w-[360px]"
            initial={{ x: "-60vw", opacity: 0 }}
            animate={
              launched && !reduced
                ? { x: "120vw", opacity: 1 }
                : { x: 0, opacity: 1 }
            }
            transition={{ duration: launched ? 0.7 : 0.9, ease: launched ? "easeIn" : "easeOut" }}
          >
            <RaceCar />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
