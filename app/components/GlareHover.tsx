"use client";

import type { CSSProperties, ReactNode } from "react";

interface GlareHoverProps {
  children?: ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function hexToRgba(hex: string, opacity: number) {
  const clean = hex.replace("#", "");
  if (/^[0-9A-Fa-f]{6}$/.test(clean)) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  if (/^[0-9A-Fa-f]{3}$/.test(clean)) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return hex;
}

export default function GlareHover({
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = "",
  style,
  onClick,
}: GlareHoverProps) {
  const vars = {
    "--gh-angle": `${glareAngle}deg`,
    "--gh-duration": `${transitionDuration}ms`,
    "--gh-size": `${glareSize}%`,
    "--gh-rgba": hexToRgba(glareColor, glareOpacity),
  } as CSSProperties;

  return (
    <div
      className={`glare-hover ${playOnce ? "glare-hover--play-once" : ""} ${className}`}
      style={{ ...vars, ...style }}
      // iOS Safari only evaluates :hover/:active on an element (or its
      // descendants via group-hover/group-active) if it has a bound touch
      // listener — without this, the glare sweep and any active: styling
      // on cards using GlareHover never fire on touch at all.
      onTouchStart={() => {}}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
