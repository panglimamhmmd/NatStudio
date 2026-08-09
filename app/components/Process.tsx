"use client";

import { forwardRef, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";
import type { Dict } from "@/lib/dictionary";

const stepMeta = [
  { num: "001", img: "sign-payment" },
  { num: "002", img: "consultation" },
  { num: "003", img: "production" },
  { num: "004", img: "post-production" },
  { num: "005", img: "feedback" },
  { num: "006", img: "finalize" },
];

type Step = Dict["process"]["steps"][number];

function StepCard({ step, i }: { step: Step; i: number }) {
  return (
    <div className="h-full overflow-hidden rounded-md border border-line bg-base transition-all duration-300 hover:scale-[1.02] hover:border-accent">
      <div className="relative h-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/process/${stepMeta[i].img}.jpg`}
          alt=""
          className="frame-media absolute inset-0 h-full w-full object-cover"
        />
        <div className="frame-tint absolute inset-0" aria-hidden="true" />
        <span className="absolute left-3 top-2.5 font-mono text-[10px] tracking-widest text-white/85">
          FRAME {stepMeta[i].num}
        </span>
        <span className="absolute right-3 top-2.5 font-mono text-[10px] tracking-widest text-white/85">
          {step.meta}
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="display-type text-lg font-bold">{step.title}</h3>
        <p className="mt-2 text-sm text-muted">{step.copy}</p>
      </div>
    </div>
  );
}

const StepMarker = forwardRef<HTMLSpanElement, { index: number }>(
  function StepMarker({ index }, ref) {
    return (
      <span
        ref={ref}
        className="step-marker relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-base font-mono text-xs font-bold text-accent-soft transition-all duration-300 group-hover:border-accent group-hover:text-accent"
      >
        {index + 1}
      </span>
    );
  },
);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function Process() {
  const { t } = useLanguage();
  const lastIndex = t.process.steps.length - 1;
  const trackRef = useRef<HTMLDivElement>(null);
  const hFillRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const vFillRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const hMarkerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const vMarkerRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // Progress line: fills segment by segment as the timeline crosses the
  // viewport's vertical center, instead of jumping per-step like Reveal.
  // Markers light up once the line has actually passed them.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || lastIndex <= 0) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      // Multiplier so the line finishes well before the track's full
      // height has scrolled past — a straight 0..trackHeight mapping
      // felt sluggish.
      const progress = clamp(
        ((window.innerHeight / 2 - rect.top) / rect.height) * 1.8,
        0,
        1,
      );
      const continuous = progress * lastIndex;
      for (let i = 0; i < lastIndex; i++) {
        const segmentProgress = clamp(continuous - i, 0, 1);
        const h = hFillRefs.current[i];
        if (h) h.style.transform = `scaleX(${segmentProgress})`;
        const v = vFillRefs.current[i];
        if (v) v.style.transform = `scaleY(${segmentProgress})`;
      }
      for (let i = 0; i <= lastIndex; i++) {
        const passed = continuous >= i;
        hMarkerRefs.current[i]?.classList.toggle("is-active", passed);
        vMarkerRefs.current[i]?.classList.toggle("is-active", passed);
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [lastIndex]);

  return (
    <section id="process" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <Eyebrow>{t.process.eyebrow}</Eyebrow>
          <h2 className="display-type mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
            {t.process.titleA} <span className="heading-accent">{t.process.titleB}</span>
          </h2>
        </Reveal>
      </div>

      <div ref={trackRef} className="mt-10 border-y border-line bg-card/70">
        <div className="sprocket-thin" aria-hidden="true" />

        {/* lg+: single-row horizontal stepper, numbered markers connected by a line */}
        <ol className="mx-auto hidden max-w-6xl grid-cols-6 gap-4 px-4 py-8 sm:px-6 lg:grid">
          {t.process.steps.map((step, i) => (
            <li key={step.title} className="group relative">
              {i < lastIndex && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-[18px] h-px w-[calc(100%+1rem)] bg-line"
                >
                  <span
                    ref={(el) => {
                      hFillRefs.current[i] = el;
                    }}
                    style={{ transform: "scaleX(0)" }}
                    className="block h-full w-full origin-left bg-accent transition-transform duration-200 ease-out"
                  />
                </span>
              )}
              <Reveal delay={i * 100} className="flex flex-col items-center">
                <StepMarker
                  index={i}
                  ref={(el) => {
                    hMarkerRefs.current[i] = el;
                  }}
                />
                <div className="mt-4 w-full">
                  <StepCard step={step} i={i} />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* below lg: vertical stepper, markers connected by a line down the left edge */}
        <ol className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:hidden">
          {t.process.steps.map((step, i) => (
            <li key={step.title} className="group">
              <Reveal delay={i * 80} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <StepMarker
                    index={i}
                    ref={(el) => {
                      vMarkerRefs.current[i] = el;
                    }}
                  />
                  {i < lastIndex && (
                    <span aria-hidden="true" className="mt-1 w-px flex-1 bg-line">
                      <span
                        ref={(el) => {
                          vFillRefs.current[i] = el;
                        }}
                        style={{ transform: "scaleY(0)" }}
                        className="block h-full w-full origin-top bg-accent transition-transform duration-200 ease-out"
                      />
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-1">
                  <StepCard step={step} i={i} />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="sprocket-thin" aria-hidden="true" />
      </div>
    </section>
  );
}
