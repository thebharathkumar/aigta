"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { loadingTips, profile } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useGame } from "./providers/GameProvider";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [tip, setTip] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const reduced = useReducedMotion();
  const { play } = useGame();

  // Fill the loading bar from 0 to 100 over a couple of seconds.
  useEffect(() => {
    if (ready) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 9 + 3;
        if (next >= 100) {
          clearInterval(id);
          setReady(true);
          return 100;
        }
        return next;
      });
    }, 140);
    return () => clearInterval(id);
  }, [ready]);

  // Cycle the loading tip lines.
  useEffect(() => {
    const id = setInterval(() => {
      setTip((t) => (t + 1) % loadingTips.length);
    }, 900);
    return () => clearInterval(id);
  }, []);

  const dismiss = () => {
    if (!ready || dismissed) return;
    play("whoosh");
    setDismissed(true);
    // Let the fade play before unmounting upstream.
    setTimeout(onDone, reduced ? 0 : 650);
  };

  // Any key dismisses once ready.
  useEffect(() => {
    const onKey = () => dismiss();
    if (ready) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, dismissed]);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050507]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.65 }}
          onClick={dismiss}
          role="dialog"
          aria-label="Loading screen. Press any key or click to start."
        >
          <div className="scanlines" aria-hidden />

          <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 gap-8 px-6 md:grid-cols-2 md:items-end">
            {/* Original stylized character placeholder with duotone treatment. */}
            <div className="flex justify-center md:justify-start">
              <div className="duotone-portrait relative flex h-[320px] w-[240px] items-end justify-center overflow-hidden rounded-md border border-white/10 md:h-[440px] md:w-[320px]">
                {/* Silhouette built from CSS so no third-party art is used. */}
                <svg
                  viewBox="0 0 200 280"
                  className="h-[88%] w-auto opacity-90"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F2C14E" />
                      <stop offset="100%" stopColor="#7a5c12" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="62" r="40" fill="url(#gold)" />
                  <path
                    d="M40 280 C40 200 60 150 100 150 C140 150 160 200 160 280 Z"
                    fill="url(#gold)"
                  />
                </svg>
                <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-widest text-hudgold/80">
                  Playable Character
                </span>
              </div>
            </div>

            {/* Loading column */}
            <div className="flex flex-col gap-5">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-hudgold">
                LOS SANTOS
              </p>
              <h1 className="font-display text-4xl leading-none text-ink md:text-6xl">
                {profile.name}
              </h1>

              <div className="mt-2">
                <div className="mb-2 flex items-center justify-between font-mono text-xs text-muted">
                  <span aria-live="polite">{loadingTips[tip]}</span>
                  <span className="text-hudgold">{Math.round(progress)}%</span>
                </div>
                <div
                  className="h-3 w-full overflow-hidden rounded-full border border-white/10 bg-black/60"
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-hudgold to-hudgreen transition-[width] duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="h-8">
                {ready && (
                  <motion.button
                    type="button"
                    onClick={dismiss}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-display text-lg tracking-widest text-ink"
                  >
                    <motion.span
                      animate={reduced ? {} : { opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                    >
                      PRESS START
                    </motion.span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
