import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        hudgreen: "var(--hud-green)",
        hudgold: "var(--hud-gold)",
        hudcyan: "var(--hud-cyan)",
        hudpink: "var(--hud-pink)",
        hudblue: "var(--hud-blue)",
        wanted: "var(--wanted)",
        ink: "var(--text)",
        muted: "var(--muted)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        hud: "0 0 0 1px rgba(130,170,255,0.08), 0 8px 30px rgba(0,0,0,0.5)",
        glow: "0 0 28px rgba(34,211,238,0.45)",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        shake: {
          "0%, 100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-3px, 2px)" },
          "40%": { transform: "translate(3px, -2px)" },
          "60%": { transform: "translate(-2px, -1px)" },
          "80%": { transform: "translate(2px, 1px)" },
        },
        siren: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255,93,162,0.0)" },
          "50%": { boxShadow: "0 0 40px 6px rgba(255,93,162,0.55)" },
        },
      },
      animation: {
        scanline: "scanline 6s linear infinite",
        shake: "shake 0.4s ease-in-out",
        siren: "siren 0.6s ease-in-out 3",
      },
    },
  },
  plugins: [],
};

export default config;
