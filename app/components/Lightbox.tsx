"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { setLightboxOpen } from "@/lib/lightbox";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const [closing, setClosing] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [muted, setMuted] = useState(false);
  const [buffering, setBuffering] = useState(false);

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
    setLightboxOpen(true);
    return () => setLightboxOpen(false);
  }, []);

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
  const prevFrame = frames[(index - 1 + frames.length) % frames.length];
  const nextFrame = frames[(index + 1) % frames.length];

  // A fresh <video> element (remounted via `key`) starts buffering from
  // scratch, so assume the worst until it proves otherwise.
  useEffect(() => {
    setBuffering(!!frame.video);
  }, [frame.video]);

  // Try to autoplay with sound — opening the lightbox is itself a click,
  // which satisfies the browser's user-gesture requirement for unmuted
  // playback. Falls back to muted (with the toggle button) if a browser
  // blocks it anyway.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !frame.video) return;
    v.muted = false;
    const playPromise = v.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => setMuted(false))
        .catch(() => {
          v.muted = true;
          setMuted(true);
          v.play().catch(() => {});
        });
    }
  }, [frame.video]);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next) v.play().catch(() => {});
  };

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

  return createPortal(
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
        className="absolute right-4 top-4 z-20 rounded-lg border border-line bg-card p-2 text-fg transition-colors hover:border-accent hover:text-accent"
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className={`lightbox-panel relative w-full ${panelWidth} overflow-hidden rounded-lg border border-line bg-card ${
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
                ref={videoRef}
                className="frame-media absolute inset-0 h-full w-full object-cover"
                src={`/videos/hero/${frame.video}.mp4`}
                poster={`/videos/hero/${frame.video}.jpg`}
                loop
                playsInline
                preload="auto"
                onWaiting={() => setBuffering(true)}
                onPlaying={() => setBuffering(false)}
                onCanPlay={() => setBuffering(false)}
              />
            ) : (
              <div className={`frame-media ph ${frame.ph} absolute inset-0`} />
            )}
            {frame.video && buffering && (
              <div
                className="absolute inset-0 z-[5] flex items-center justify-center bg-black/20"
                aria-hidden="true"
              >
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              </div>
            )}
            <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-widest text-white/85">
              Frame {frame.num}
            </span>
            <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-widest text-accent-soft/90">
              {index + 1} / {frames.length}
            </span>
            {frame.video && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="absolute bottom-3 left-3 z-10 rounded-full bg-black/45 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/65 hover:text-accent sm:p-2"
                aria-label={muted ? "Unmute video" : "Mute video"}
              >
                {muted ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 9l6 6M22 9l-6 6" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            )}
          </div>

          {/* Silently warm the browser's cache for the two adjacent frames
              so that a next/prev click usually hits an already-buffered
              video instead of starting a fresh download. */}
          {frames.length > 1 &&
            [prevFrame, nextFrame]
              .filter(
                (f, i, arr) =>
                  f.video && f.video !== frame.video && arr.findIndex((x) => x.video === f.video) === i
              )
              .map((f) => (
                <video
                  key={`preload-${f.video}`}
                  src={`/videos/hero/${f.video}.mp4`}
                  preload="auto"
                  muted
                  playsInline
                  className="sr-only"
                  aria-hidden="true"
                />
              ))}

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
    </div>,
    document.body
  );
}
