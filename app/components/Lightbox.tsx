"use client";

import { useEffect, useRef, useState } from "react";

const CLOSE_MS = 200;

export type LightboxFrame = {
  num: string;
  ph: string;
  title: string;
  subtitle: string;
  video?: string;
};

export default function Lightbox({
  frames,
  index,
  onClose,
  onNavigate,
  aspect = "aspect-3/2",
  panelWidth = "max-w-lg",
}: {
  frames: LightboxFrame[];
  index: number;
  onClose: () => void;
  onNavigate: (direction: -1 | 1) => void;
  aspect?: string;
  panelWidth?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const [closing, setClosing] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    onNavigate(dir);
  };

  const requestClose = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    setClosing(true);
    window.setTimeout(onClose, CLOSE_MS);
  };

  useEffect(() => {
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestClose();
        return;
      }
      if (e.key === "ArrowRight") {
        go(1);
        return;
      }
      if (e.key === "ArrowLeft") {
        go(-1);
        return;
      }
      if (e.key === "Tab") {
        const focusables = containerRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const list = Array.from(focusables);
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onNavigate]);

  const frame = frames[index];

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const dx = e.clientX - pointerStartX.current;
    if (Math.abs(dx) > 40) {
      go(dx < 0 ? 1 : -1);
    }
    pointerStartX.current = null;
  };

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${frame.title}: ${frame.subtitle}`}
      className={`lightbox-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm ${
        closing ? "is-closing" : ""
      }`}
      onClick={requestClose}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={requestClose}
        className="absolute right-4 top-4 z-20 rounded-md border border-line bg-card p-2 text-fg transition-colors hover:border-accent hover:text-accent"
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className={`lightbox-panel relative w-full ${panelWidth} overflow-hidden rounded-md border border-line bg-card ${
          closing ? "is-closing" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative ${aspect} w-full overflow-hidden`}>
          <div
            key={frame.num}
            className={`absolute inset-0 ${
              direction === 1 ? "lightbox-slide-next" : "lightbox-slide-prev"
            }`}
          >
            {frame.video ? (
              <video
                key={frame.video}
                className="frame-media absolute inset-0 h-full w-full object-cover"
                src={`/videos/hero/${frame.video}.mp4`}
                poster={`/videos/hero/${frame.video}.jpg`}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            ) : (
              <div className={`frame-media ph ${frame.ph} absolute inset-0`} />
            )}
            <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-widest text-white/85">
              Frame {frame.num}
            </span>
            <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-widest text-accent-soft/90">
              {index + 1} / {frames.length}
            </span>
          </div>

          {/* Overlaid on the media itself (not floated off the panel edge)
              so they never collide with the panel border on narrow/portrait
              layouts where there's no gutter outside the panel to sit in. */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/65 hover:text-accent sm:p-2"
            aria-label="Previous frame"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/65 hover:text-accent sm:p-2"
            aria-label="Next frame"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="sprocket-thin" aria-hidden="true" />
        <div className="px-4 py-3">
          <p className="text-sm font-medium">{frame.title}</p>
          <p className="text-xs text-muted">{frame.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
