"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Section, Reveal, Eyebrow, Heading } from "../ui/Section";

type Node = { id: string; x: number; y: number; label: string; kind: "core" | "agent" | "tool" | "io" };

const NODES: Node[] = [
  { id: "user", x: 70, y: 230, label: "User", kind: "io" },
  { id: "orch", x: 330, y: 230, label: "Orchestrator", kind: "core" },
  { id: "planner", x: 330, y: 80, label: "Planner", kind: "agent" },
  { id: "retriever", x: 560, y: 110, label: "RAG Retriever", kind: "agent" },
  { id: "vector", x: 760, y: 110, label: "Vector Store", kind: "tool" },
  { id: "mcp", x: 600, y: 240, label: "MCP Tools", kind: "tool" },
  { id: "verifier", x: 560, y: 370, label: "Verifier", kind: "agent" },
  { id: "model", x: 330, y: 380, label: "Claude / Bedrock", kind: "tool" },
  { id: "out", x: 760, y: 300, label: "Response", kind: "io" },
];

const EDGES: [string, string][] = [
  ["user", "orch"],
  ["orch", "planner"],
  ["planner", "orch"],
  ["orch", "retriever"],
  ["retriever", "vector"],
  ["orch", "mcp"],
  ["orch", "verifier"],
  ["verifier", "orch"],
  ["orch", "model"],
  ["retriever", "out"],
  ["mcp", "out"],
];

const pos = (id: string) => NODES.find((n) => n.id === id)!;

const kindColor: Record<Node["kind"], string> = {
  core: "var(--hud-pink)",
  agent: "var(--hud-cyan)",
  tool: "var(--hud-blue)",
  io: "var(--hud-green)",
};

function Packet({ from, to, delay }: { from: Node; to: Node; delay: number }) {
  return (
    <motion.circle
      r={4}
      fill="#fff"
      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
      animate={{ cx: [from.x, to.x], cy: [from.y, to.y], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.6, delay, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
      style={{ filter: "drop-shadow(0 0 6px var(--hud-cyan))" }}
    />
  );
}

export default function AgentGraph() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  // Cycle a "live" node so the graph pulses like a running trace.
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % NODES.length), 900);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <Section id="orchestration">
      <Reveal>
        <Eyebrow>Live Trace</Eyebrow>
        <Heading>MULTI-AGENT ORCHESTRATION</Heading>
        <p className="mt-3 max-w-2xl text-muted">
          How I build production AI: a LangGraph orchestrator routes work across specialized agents,
          calls MCP tool servers and Claude on Amazon Bedrock, grounds answers with RAG, and runs a
          verifier loop. This is a live schematic of that flow.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#070912]/80 p-2 shadow-hud backdrop-blur">
          <svg viewBox="0 0 840 460" className="h-auto w-full" role="img" aria-label="Multi-agent orchestration diagram">
            {/* Edges */}
            {EDGES.map(([a, b], i) => {
              const na = pos(a);
              const nb = pos(b);
              return (
                <line
                  key={i}
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke="rgba(120,170,255,0.22)"
                  strokeWidth={1.5}
                  strokeDasharray="4 5"
                />
              );
            })}

            {/* Flowing packets */}
            {!reduced &&
              EDGES.map(([a, b], i) => (
                <Packet key={`p${i}`} from={pos(a)} to={pos(b)} delay={(i % 6) * 0.35} />
              ))}

            {/* Nodes */}
            {NODES.map((n, i) => {
              const isActive = i === active;
              const color = kindColor[n.kind];
              const r = n.kind === "core" ? 30 : 22;
              return (
                <g key={n.id}>
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    r={r}
                    fill="#0a0e1c"
                    stroke={color}
                    strokeWidth={isActive ? 3 : 1.5}
                    animate={
                      reduced
                        ? {}
                        : { opacity: isActive ? 1 : 0.85, scale: isActive ? 1.12 : 1 }
                    }
                    style={{ transformOrigin: `${n.x}px ${n.y}px`, filter: isActive ? `drop-shadow(0 0 14px ${color})` : "none" }}
                  />
                  <text
                    x={n.x}
                    y={n.y + r + 16}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize={13}
                    fill="var(--text)"
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-4 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-wide text-muted">
          {(["core", "agent", "tool", "io"] as const).map((k) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: kindColor[k] }} />
              {k === "io" ? "input / output" : k}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
