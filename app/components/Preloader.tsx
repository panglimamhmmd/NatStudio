"use client";

import { useEffect, useRef, useState } from "react";

const OUT = "cubic-bezier(0.16,1,0.30,1)";
const BACK = "cubic-bezier(0.34,1.56,0.64,1)";
const SWOOSH_EASE = "cubic-bezier(0.22,1,0.36,1)";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const artRef = useRef<SVGGElement>(null);
  const swooshRef = useRef<SVGPathElement>(null);
  const sparkRef = useRef<SVGCircleElement>(null);
  const sp1Ref = useRef<SVGPathElement>(null);
  const sp2Ref = useRef<SVGPathElement>(null);
  const sp3Ref = useRef<SVGPathElement>(null);
  const natRef = useRef<SVGTextElement>(null);
  const studioRef = useRef<SVGTextElement>(null);
  const taglineRef = useRef<SVGGElement>(null);
  const tag1Ref = useRef<SVGTextElement>(null);
  const tag2Ref = useRef<SVGTextElement>(null);
  const tag3Ref = useRef<SVGTextElement>(null);

  const exitRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;
    let exited = false;
    let rafId: number | null = null;
    const animations: Animation[] = [];
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = (
      el: Element,
      frames: Keyframe[],
      dur: number,
      delay: number,
      ease: string
    ) => {
      const a = el.animate(frames, {
        duration: dur * 1000,
        delay: delay * 1000,
        easing: ease,
        fill: "both",
      });
      animations.push(a);
      return a;
    };

    const exitNow = () => {
      if (cancelled || exited) return;
      exited = true;
      timers.forEach(clearTimeout);
      if (rafId !== null) cancelAnimationFrame(rafId);
      animations.forEach((a) => a.cancel());

      // Unpause the Hero's own entrance animations right as we start
      // dissolving — by the time the overlay is gone they're already
      // mid-motion instead of snapping straight to their end state.
      document.documentElement.classList.remove("intro-pending");
      setProgress(100);
      setFading(true);

      if (contentRef.current) {
        const reducedNow = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        const frames = reducedNow
          ? [{ opacity: 1 }, { opacity: 0 }]
          : [
              { opacity: 1, transform: "scale(1)" },
              { opacity: 0, transform: "scale(1.06)" },
            ];
        contentRef.current.animate(frames, {
          duration: reducedNow ? 300 : 420,
          easing: OUT,
          fill: "forwards",
        });
      }

      const fadeMs = 500;
      timers.push(
        setTimeout(() => {
          if (!cancelled) setVisible(false);
        }, fadeMs)
      );
    };
    exitRef.current = exitNow;

    const start = () => {
      if (cancelled) return;
      const nat = natRef.current;
      const studio = studioRef.current;
      const sw = swooshRef.current;
      if (!nat || !studio || !sw) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const nb = nat.getBBox();
      studio.setAttribute("x", String(Math.round(nb.x + nb.width + 2)));
      const sb = studio.getBBox();
      const left = Math.round(nb.x);
      const right = Math.round(sb.x + sb.width);
      tag1Ref.current?.setAttribute("x", String(left + 2));
      tag2Ref.current?.setAttribute(
        "x",
        String(Math.round((left + right) / 2))
      );
      tag3Ref.current?.setAttribute("x", String(right - 2));

      // The hand-placed coordinates above (swoosh, sparkles, text) don't sit
      // symmetrically inside the original 0-660 viewBox — there's far more
      // empty space to the left of "Nat" than to the right of the swoosh's
      // tail. Centering the <svg> box on screen still leaves the artwork
      // itself looking pushed right, which is most visible on mobile where
      // it fills most of the viewport width. Re-measure the actual rendered
      // artwork and recenter the viewBox around it instead of the fixed box.
      if (svgRef.current && artRef.current) {
        const ab = artRef.current.getBBox();
        const padX = 24;
        svgRef.current.setAttribute(
          "viewBox",
          `${ab.x - padX} 0 ${ab.width + padX * 2} 262`
        );
      }

      const len = sw.getTotalLength();
      sw.style.strokeDasharray = String(len);
      sw.style.strokeDashoffset = String(len);

      let total = 1.75;

      if (reduced) {
        [
          nat,
          studio,
          sw,
          sp1Ref.current,
          sp2Ref.current,
          sp3Ref.current,
          taglineRef.current,
        ].forEach((el) => {
          if (el) run(el, [{ opacity: 0 }, { opacity: 1 }], 0.3, 0, OUT);
        });
        total = 0.3;
        setProgress(100);
      } else {
        run(
          sw,
          [
            { strokeDashoffset: len, opacity: 1 },
            { strokeDashoffset: 0, opacity: 1 },
          ],
          0.7,
          0,
          SWOOSH_EASE
        );

        // A quick spark right as the line finishes drawing — punctuation
        // for the stroke landing, not just a straight cut to the next beat.
        if (sparkRef.current) {
          run(
            sparkRef.current,
            [
              { opacity: 0, transform: "scale(0.3)" },
              { opacity: 0.9, transform: "scale(1.15)", offset: 0.4 },
              { opacity: 0, transform: "scale(2)" },
            ],
            0.32,
            0.62,
            OUT
          );
        }

        [sp1Ref.current, sp2Ref.current, sp3Ref.current].forEach((el, i) => {
          if (!el) return;
          run(
            el,
            [
              { opacity: 0, transform: "scale(0.2) rotate(-25deg)" },
              { opacity: 1, transform: "none" },
            ],
            0.35,
            0.45 + i * 0.08,
            BACK
          );
        });

        [nat, studio].forEach((el) => {
          run(
            el,
            [
              { opacity: 0, transform: "translateY(22px)" },
              { opacity: 1, transform: "none" },
            ],
            0.55,
            0.75,
            OUT
          );
        });

        if (taglineRef.current) {
          run(
            taglineRef.current,
            [
              { opacity: 0, transform: "translateY(10px)" },
              { opacity: 1, transform: "none" },
            ],
            0.45,
            1.1,
            OUT
          );
        }

        const startTs = performance.now();
        const tick = (now: number) => {
          const pct = Math.min(100, ((now - startTs) / (total * 1000)) * 100);
          setProgress(Math.round(pct));
          if (pct < 100 && !cancelled) {
            rafId = requestAnimationFrame(tick);
          }
        };
        rafId = requestAnimationFrame(tick);
      }

      const holdMs = reduced ? 250 : 850;

      if (!reduced) {
        // A brief idle shimmer on the sparkles while we hold on the
        // settled logo, so the pause before exit still has some life.
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            [sp1Ref.current, sp2Ref.current, sp3Ref.current].forEach(
              (el, i) => {
                if (!el) return;
                const a = el.animate(
                  [
                    { opacity: 1, transform: "scale(1)" },
                    { opacity: 0.5, transform: "scale(1.18)" },
                    { opacity: 1, transform: "scale(1)" },
                  ],
                  { duration: 700, easing: "ease-in-out", delay: i * 60 }
                );
                animations.push(a);
              }
            );
          }, total * 1000)
        );
      }

      timers.push(
        setTimeout(() => exitRef.current(), total * 1000 + holdMs)
      );
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(start);
    } else {
      start();
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exitRef.current();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", onKey);
      timers.forEach(clearTimeout);
      if (rafId !== null) cancelAnimationFrame(rafId);
      animations.forEach((a) => a.cancel());
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      id="ns-preloader"
      role="button"
      tabIndex={0}
      aria-label="Lewati intro"
      onClick={() => exitRef.current()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") exitRef.current();
      }}
      className={`fixed inset-0 z-[100] flex cursor-pointer flex-col bg-base preloader-glow transition-opacity duration-500 ease-out ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="preloader-edge" />

      <div
        ref={contentRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg
          ref={svgRef}
          viewBox="0 0 660 262"
          style={{ width: "min(460px, 82vw)", height: "auto", overflow: "visible" }}
        >
          <g ref={artRef}>
          <circle
            ref={sparkRef}
            cx={600}
            cy={126}
            r={14}
            fill="var(--accent-soft)"
            opacity={0}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <path
            ref={swooshRef}
            d="M252,96 C336,26 542,14 604,44 C648,64 638,114 600,126"
            fill="none"
            stroke="var(--accent)"
            strokeWidth={4}
            strokeLinecap="round"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <path
            ref={sp1Ref}
            d="M238,46 Q241.1,66.9 262,70 Q241.1,73.1 238,94 Q234.9,73.1 214,70 Q234.9,66.9 238,46Z"
            fill="var(--accent)"
            opacity={0}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <path
            ref={sp2Ref}
            d="M270,22 Q271.6,32.4 282,34 Q271.6,35.6 270,46 Q268.4,35.6 258,34 Q268.4,32.4 270,22Z"
            fill="var(--accent)"
            opacity={0}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <path
            ref={sp3Ref}
            d="M272,83 Q273.2,90.8 281,92 Q273.2,93.2 272,101 Q270.8,93.2 263,92 Q270.8,90.8 272,83Z"
            fill="var(--accent)"
            opacity={0}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <text
            ref={natRef}
            x={110}
            y={196}
            fill="var(--accent)"
            opacity={0}
            style={{
              font: "800 104px var(--font-jakarta), Arial, sans-serif",
              letterSpacing: "-3px",
              transformBox: "fill-box",
              transformOrigin: "center",
            }}
          >
            Nat
          </text>
          <text
            ref={studioRef}
            x={270}
            y={196}
            fill="var(--fg)"
            opacity={0}
            style={{
              font: "800 104px var(--font-jakarta), Arial, sans-serif",
              letterSpacing: "-3px",
              transformBox: "fill-box",
              transformOrigin: "center",
            }}
          >
            Studio
          </text>
          <g
            ref={taglineRef}
            opacity={0}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <text
              ref={tag1Ref}
              x={112}
              y={230}
              textAnchor="start"
              fill="var(--muted)"
              style={{
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: "1.4px",
              }}
            >
              CONTENT
            </text>
            <text
              ref={tag2Ref}
              x={340}
              y={230}
              textAnchor="middle"
              fill="var(--muted)"
              style={{
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: "1.4px",
              }}
            >
              PRODUCTION
            </text>
            <text
              ref={tag3Ref}
              x={568}
              y={230}
              textAnchor="end"
              fill="var(--muted)"
              style={{
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: "1.4px",
              }}
            >
              STUDIO
            </text>
          </g>
          </g>
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col">
        <div className="flex items-end justify-between px-5 pb-4 sm:px-8 sm:pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/80 tabular-nums">
            Memuat reel — {progress}%
          </p>
          <p className="preloader-hint font-mono text-[10px] uppercase tracking-[0.2em] text-muted/50">
            Ketuk untuk lewati
          </p>
        </div>

        <div className="preloader-edge" />
      </div>
    </div>
  );
}
