"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Theme = "los-santos" | "vice";
type SoundName = "click" | "whoosh" | "stamp" | "siren";

type GameState = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  muted: boolean;
  toggleMute: () => void;
  wanted: number; // 0 to 5
  setWanted: (n: number) => void;
  play: (name: SoundName) => void;
};

const GameContext = createContext<GameState | null>(null);

export function useGame(): GameState {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("los-santos");
  const [muted, setMuted] = useState(true); // muted by default per spec
  const [wanted, setWanted] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Reflect the theme onto the document so CSS variables switch.
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "vice") root.setAttribute("data-theme", "vice");
    else root.removeAttribute("data-theme");
  }, [theme]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleTheme = useCallback(
    () => setThemeState((p) => (p === "los-santos" ? "vice" : "los-santos")),
    []
  );
  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  // Tiny Web Audio layer. Generates short synthetic blips so there are no
  // external audio assets. Stays silent while muted.
  const play = useCallback(
    (name: SoundName) => {
      if (muted) return;
      try {
        if (!audioCtxRef.current) {
          const Ctor =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext;
          audioCtxRef.current = new Ctor();
        }
        const ac = audioCtxRef.current;
        if (!ac) return;
        if (ac.state === "suspended") void ac.resume();

        const now = ac.currentTime;
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain);
        gain.connect(ac.destination);

        const presets: Record<
          SoundName,
          { type: OscillatorType; from: number; to: number; dur: number; vol: number }
        > = {
          click: { type: "square", from: 660, to: 880, dur: 0.06, vol: 0.05 },
          whoosh: { type: "sawtooth", from: 120, to: 720, dur: 0.45, vol: 0.06 },
          stamp: { type: "triangle", from: 300, to: 90, dur: 0.25, vol: 0.08 },
          siren: { type: "sine", from: 480, to: 980, dur: 0.5, vol: 0.06 },
        };
        const p = presets[name];
        osc.type = p.type;
        osc.frequency.setValueAtTime(p.from, now);
        osc.frequency.exponentialRampToValueAtTime(p.to, now + p.dur);
        gain.gain.setValueAtTime(p.vol, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + p.dur);
        osc.start(now);
        osc.stop(now + p.dur);
      } catch {
        // Audio is pure flavor. Never let it break the UI.
      }
    },
    [muted]
  );

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme, muted, toggleMute, wanted, setWanted, play }),
    [theme, toggleTheme, setTheme, muted, toggleMute, wanted, play]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
