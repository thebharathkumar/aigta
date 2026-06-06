"use client";

// Original racing helmet built from SVG. Used as the driver avatar.
export default function Helmet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <linearGradient id="helmetShell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--f1-red)" />
          <stop offset="100%" stopColor="#5e0400" />
        </linearGradient>
      </defs>
      {/* Shell */}
      <path
        d="M18 70 Q18 26 60 24 Q102 26 102 70 L102 84 Q102 92 94 92 L26 92 Q18 92 18 84 Z"
        fill="url(#helmetShell)"
      />
      {/* Top accent stripe */}
      <path d="M44 26 Q60 22 76 26 L70 46 L50 46 Z" fill="var(--accent)" />
      {/* Visor */}
      <path
        d="M30 58 Q30 50 42 49 L88 49 Q96 50 96 60 L96 70 Q96 74 88 74 L40 74 Q30 74 30 66 Z"
        fill="#0b0b10"
      />
      <path d="M34 60 L92 56" stroke="var(--hud-cyan)" strokeWidth={2} opacity={0.7} />
      {/* Chin bar */}
      <rect x={26} y={86} width={68} height={8} rx={4} fill="#16161c" />
    </svg>
  );
}
