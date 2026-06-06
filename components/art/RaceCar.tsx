"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Original side-view formula car built entirely from SVG. No real team marks.
// Wheels spin and the whole car bobs slightly so it reads as "alive".
export default function RaceCar({
  className = "",
  spin = true,
}: {
  className?: string;
  spin?: boolean;
}) {
  const reduced = useReducedMotion();
  const wheel = (cx: number) => (
    <motion.g
      style={{ transformOrigin: `${cx}px 150px`, transformBox: "fill-box" } as React.CSSProperties}
      animate={spin && !reduced ? { rotate: 360 } : {}}
      transition={{ repeat: Infinity, ease: "linear", duration: 0.5 }}
    >
      <circle cx={cx} cy={150} r={26} fill="#0c0c10" stroke="#2a2a33" strokeWidth={3} />
      <circle cx={cx} cy={150} r={11} fill="var(--accent)" />
      <rect x={cx - 1.5} y={130} width={3} height={40} fill="#1b1b22" />
      <rect x={cx - 20} y={148.5} width={40} height={3} fill="#1b1b22" />
    </motion.g>
  );

  return (
    <motion.svg
      viewBox="0 0 400 200"
      className={className}
      animate={reduced ? {} : { y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--f1-red)" />
          <stop offset="100%" stopColor="#7a0500" />
        </linearGradient>
      </defs>

      {/* Floor / shadow */}
      <ellipse cx={200} cy={182} rx={170} ry={9} fill="#000" opacity={0.45} />

      {/* Rear wing */}
      <rect x={28} y={92} width={46} height={9} rx={2} fill="#16161c" />
      <rect x={40} y={101} width={8} height={26} fill="#16161c" />

      {/* Sidepod and engine cover */}
      <path
        d="M70 150 L70 132 Q90 96 150 96 L210 96 Q250 96 264 120 L300 130 L300 150 Z"
        fill="url(#carBody)"
      />
      {/* Cockpit / halo */}
      <path d="M150 96 Q165 70 195 72 Q220 74 224 96 Z" fill="#101015" />
      <path
        d="M168 78 Q195 62 222 80"
        fill="none"
        stroke="var(--accent)"
        strokeWidth={4}
        strokeLinecap="round"
      />
      {/* Driver helmet bubble */}
      <circle cx={195} cy={88} r={11} fill="var(--hud-cyan)" />

      {/* Nose */}
      <path d="M300 132 L372 144 Q380 146 372 150 L300 150 Z" fill="url(#carBody)" />
      {/* Front wing */}
      <rect x={352} y={150} width={40} height={7} rx={2} fill="#16161c" />

      {/* Livery accents */}
      <rect x={96} y={120} width={120} height={6} rx={3} fill="var(--accent)" opacity={0.85} />
      <text x={120} y={140} fontFamily="var(--font-mono)" fontSize={14} fill="#fff" opacity={0.7}>
        BKR
      </text>

      {wheel(110)}
      {wheel(300)}
    </motion.svg>
  );
}
