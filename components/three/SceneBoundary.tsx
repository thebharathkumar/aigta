"use client";

import { Component, type ReactNode } from "react";

// If WebGL is unavailable or the scene throws, fall back silently. The hero
// already renders a gradient behind, so the page stays intact.
export default class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // Swallow: the gradient fallback is enough.
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
