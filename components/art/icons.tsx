// Small original SVG glyphs for the F1 theme.

export function CheckeredFlagIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M4 3 L4 21" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <g fill="currentColor">
        <rect x={6} y={4} width={4} height={4} />
        <rect x={14} y={4} width={4} height={4} />
        <rect x={10} y={8} width={4} height={4} />
        <rect x={18} y={8} width={4} height={4} />
        <rect x={6} y={12} width={4} height={4} />
        <rect x={14} y={12} width={4} height={4} />
      </g>
      <rect x={6} y={4} width={16} height={12} fill="none" stroke="currentColor" strokeWidth={1} opacity={0.4} />
    </svg>
  );
}
