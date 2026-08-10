"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

interface ShinyTextProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  speed?: number;
  color?: string;
  shineColor?: string;
  spread?: number;
  direction?: "left" | "right";
  delay?: number;
  pauseOnHover?: boolean;
}

export default function ShinyText({
  children,
  className = "",
  disabled = false,
  speed = 3,
  color = "var(--accent)",
  shineColor = "#ffffff",
  spread = 120,
  direction = "left",
  delay = 0,
  pauseOnHover = false,
}: ShinyTextProps) {
  const [paused, setPaused] = useState(false);

  // Custom properties (not literal background/clip props) so the gradient
  // sweep also reaches nested .word spans — see the .shiny-text rules in
  // globals.css. background-clip: text only clips an element's OWN text, so
  // setting it just here would render nothing when children (like the hero's
  // word-by-word reveal) hold the actual text nodes.
  const style = {
    "--shiny-gradient": `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    "--shiny-duration": `${speed}s`,
    "--shiny-delay": `${delay}s`,
    "--shiny-direction": direction === "left" ? "normal" : "reverse",
    "--shiny-play-state": paused ? "paused" : "running",
  } as CSSProperties;

  return (
    <span
      className={`shiny-text ${disabled ? "shiny-text-disabled" : ""} ${className}`}
      style={style}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
    >
      {children}
    </span>
  );
}
