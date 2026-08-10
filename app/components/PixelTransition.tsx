"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";

interface PixelTransitionProps {
  firstContent: ReactNode;
  secondContent: ReactNode;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  once?: boolean;
  aspectRatio?: string;
  className?: string;
  style?: CSSProperties;
  /** Set to false when nesting inside another focusable/clickable element
   *  (e.g. a <button>) — skips tabIndex/click/focus handling and reveals
   *  on hover only, avoiding invalid nested-interactive content. */
  interactive?: boolean;
}

export default function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = "currentColor",
  animationStepDuration = 0.3,
  once = false,
  aspectRatio = "100%",
  className = "",
  style,
  interactive = true,
}: PixelTransitionProps) {
  const [isActive, setIsActive] = useState(false);
  const [covered, setCovered] = useState(false);

  const pixels = useMemo(() => {
    const total = gridSize * gridSize;
    const size = 100 / gridSize;
    return Array.from({ length: total }, (_, i) => {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      const delayRank = (i * 2654435761) % total;
      return {
        key: i,
        style: {
          width: `${size}%`,
          height: `${size}%`,
          left: `${col * size}%`,
          top: `${row * size}%`,
          backgroundColor: pixelColor,
          transitionDelay: `${(delayRank / total) * animationStepDuration}s`,
        } as CSSProperties,
      };
    });
  }, [gridSize, pixelColor, animationStepDuration]);

  const swap = (activate: boolean) => {
    setCovered(true);
    window.setTimeout(() => {
      setIsActive(activate);
      setCovered(false);
    }, animationStepDuration * 1000);
  };

  const handleEnter = () => {
    if (!isActive) swap(true);
  };
  const handleLeave = () => {
    if (isActive && !once) swap(false);
  };
  const handleClick = () => {
    if (!isActive) swap(true);
    else if (!once) swap(false);
  };

  return (
    <div
      className={`pixel-transition relative overflow-hidden ${className}`}
      style={style}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...(interactive
        ? { onClick: handleClick, onFocus: handleEnter, onBlur: handleLeave, tabIndex: 0 }
        : {})}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className="pixel-transition__layer" aria-hidden={isActive}>
        {firstContent}
      </div>
      <div
        className="pixel-transition__layer pixel-transition__layer--active"
        style={{ display: isActive ? "block" : "none" }}
        aria-hidden={!isActive}
      >
        {secondContent}
      </div>
      <div className="pixel-transition__pixels">
        {pixels.map((pixel) => (
          <div
            key={pixel.key}
            className="pixel-transition__pixel"
            style={{
              ...pixel.style,
              opacity: covered ? 1 : 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
