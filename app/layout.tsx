import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thebharath.co"),
  title: "Bharath Kumar Rajesh // AI Engineer",
  description:
    "GTA-inspired open-world portfolio. AI Engineer building production multi-agent systems: LangGraph, Claude on Amazon Bedrock, MCP, RAG, and LLM observability.",
  keywords: [
    "AI Engineer",
    "Forward Deployed Engineer",
    "LangGraph",
    "MCP",
    "RAG",
    "Claude on Amazon Bedrock",
    "Bharath Kumar Rajesh",
  ],
  authors: [{ name: "Bharath Kumar Rajesh" }],
  openGraph: {
    title: "Bharath Kumar Rajesh // AI Engineer",
    description:
      "An explorable open-world portfolio. Agentic systems, evals, and frontier-model tooling.",
    url: "https://thebharath.co",
    siteName: "thebharath.co",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0E10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
