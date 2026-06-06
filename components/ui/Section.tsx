"use client";

import { motion } from "framer-motion";

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`section-anchor relative mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28 ${className}`}
    >
      {children}
    </section>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 inline-block font-mono text-xs uppercase tracking-[0.3em] text-hudgold">
      {children}
    </span>
  );
}

export function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-4xl leading-none text-ink md:text-6xl">{children}</h2>
  );
}
