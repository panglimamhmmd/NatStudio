"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  pauseOnHover?: boolean;
}

// Monochrome cyan sweep — dark accent to light accent, same hue throughout.
const DEFAULT_COLORS = ["#087e91", "#0cc0df", "#7de3f4"];

export default function GradientText({
  children,
  className = "",
  colors = DEFAULT_COLORS,
  animationSpeed = 8,
  pauseOnHover = false,
}: GradientTextProps) {
  const [paused, setPaused] = useState(false);

  // Same reasoning as ShinyText: background-clip: text only clips an
  // element's OWN text, so this is exposed as CSS custom properties and
  // applied via the .gradient-text / .gradient-text .word rules in
  // globals.css rather than clipped here directly — otherwise nested .word
  // spans (Hero's word-by-word reveal) would render invisible.
  const loop = [...colors, colors[0]].join(", ");
  const style = {
    "--gradient-image": `linear-gradient(90deg, ${loop})`,
    "--gradient-duration": `${animationSpeed}s`,
    "--gradient-play-state": paused ? "paused" : "running",
  } as CSSProperties;

  return (
    <span
      className={`gradient-text ${className}`}
      style={style}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
    >
      {children}
    </span>
  );
}
