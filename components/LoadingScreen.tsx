"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { loadingTips, profile } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useGame } from "./providers/GameProvider";

// Neural boot sequence: a console streams init lines while weights "load",
// then the model goes ready and a tap launches the experience.
export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [launched, setLaunched] = useState(false);
  const reduced = useReducedMotion();
  const { play } = useGame();
  const lineIdx = useRef(0);

  // Fill the progress and append a boot line at each step.
  useEffect(() => {
    if (ready) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 11 + 4);
        if (next >= 100) {
          clearInterval(id);
          setReady(true);
          play("whoosh");
        }
        return next;
      });
    }, 130);
    return () => clearInterval(id);
  }, [ready, play]);

  useEffect(() => {
    const id = setInterval(() => {
      const tip = loadingTips[lineIdx.current % loadingTips.length];
      lineIdx.current += 1;
      setLines((l) => [...l.slice(-5), tip]);
      play("click");
    }, 360);
    return () => clearInterval(id);
  }, [play]);

  const launch = () => {
    if (!ready || launched) return;
    play("whoosh");
    setLaunched(true);
    setTimeout(onDone, reduced ? 0 : 650);
  };

  useEffect(() => {
    const onKey = () => launch();
    if (ready) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, launched]);

  return (
    <AnimatePresence>
      {!launched && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#04040a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.65 }}
          onClick={launch}
          role="dialog"
          aria-label="Boot screen. Press any key or click to enter."
        >
          <div className="scanlines" aria-hidden />
          {/* Faint streaming token rain in the background. */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]" aria-hidden>
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 font-mono text-[10px] leading-4 text-hudcyan"
                style={{ left: `${(i / 18) * 100}%` }}
                initial={{ y: "-20%" }}
                animate={reduced ? {} : { y: "120%" }}
                transition={{ repeat: Infinity, duration: 5 + (i % 5), ease: "linear", delay: i * 0.2 }}
              >
                {Array.from({ length: 20 }).map((_, j) => (
                  <div key={j}>{Math.random() > 0.5 ? "1" : "0"}{Math.round(Math.random() * 9)}</div>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 w-full max-w-xl px-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-hudcyan">
              Neural Runtime
            </p>
            <h1 className="mb-6 font-display text-3xl font-extrabold text-ink md:text-5xl">
              {profile.name}
            </h1>

            {/* Boot console */}
            <div className="glass rounded-xl p-4 font-mono text-xs text-hudgreen md:text-sm">
              {lines.map((l, i) => (
                <div key={i} className="flex gap-2 opacity-90">
                  <span className="text-hudpink">{">"}</span>
                  <span>{l}</span>
                  <span className="text-muted">[ok]</span>
                </div>
              ))}
              {lines.length === 0 && <div className="text-muted">{">"} cold start...</div>}
            </div>

            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between font-mono text-xs">
                <span className="text-muted">loading weights</span>
                <span className="text-hudcyan">{Math.round(progress)}%</span>
              </div>
              <div
                className="h-2 w-full overflow-hidden rounded-full bg-white/5"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-hudblue via-hudcyan to-hudpink transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-6 h-8">
              {ready && (
                <motion.button
                  type="button"
                  onClick={launch}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-xl font-bold tracking-wide text-ink"
                >
                  <motion.span
                    className="glow-text"
                    animate={reduced ? {} : { opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1.1 }}
                  >
                    MODEL READY. TAP TO ENTER
                  </motion.span>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
