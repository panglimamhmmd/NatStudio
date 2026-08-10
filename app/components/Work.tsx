"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";
import Lightbox from "./Lightbox";
import PixelTransition from "./PixelTransition";
import GradientText from "./GradientText";

const frameMeta = [
  { num: "003", ph: "ph-3" },
  { num: "007", ph: "ph-4" },
  { num: "009", ph: "ph-6" },
  { num: "014", ph: "ph-7", highlight: true },
];

export default function Work() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const frames = frameMeta.map((frame, i) => ({
    ...frame,
    title: t.work.frames[i].client,
    subtitle: t.work.frames[i].label,
  }));

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <Eyebrow>{t.work.eyebrow}</Eyebrow>
        <h2 className="display-type mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          {t.work.titleA} <GradientText className="heading-accent">{t.work.titleB}</GradientText>
        </h2>
        <p className="mt-4 max-w-lg text-muted">{t.work.sub}</p>
      </Reveal>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {frames.map((frame, i) => (
          <li key={frame.num} className="frame group">
            <Reveal delay={(i % 4) * 80}>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="block w-full text-left"
                aria-label={`Open ${frame.title}: ${frame.subtitle}`}
              >
                <div className="relative aspect-3/2 overflow-hidden rounded-lg border border-line transition-all duration-300 group-hover:scale-[1.03] group-hover:border-accent group-active:scale-[1.03] group-active:border-accent">
                  <PixelTransition
                    interactive={false}
                    aspectRatio="0%"
                    gridSize={8}
                    pixelColor="var(--base)"
                    animationStepDuration={0.25}
                    className="absolute inset-0 h-full w-full"
                    firstContent={
                      <div className="relative h-full w-full">
                        <div className={`frame-media ph ${frame.ph} absolute inset-0`} />
                        <span
                          className={`absolute left-2 top-2 font-mono text-[10px] uppercase tracking-widest ${
                            frame.highlight ? "text-accent" : "text-white/85"
                          }`}
                        >
                          Frame {frame.num}
                        </span>
                      </div>
                    }
                    secondContent={
                      <div className="relative h-full w-full">
                        <div className={`frame-media ph ${frame.ph} absolute inset-0`} />
                        <div className="frame-tint absolute inset-0" aria-hidden="true" />
                        <span
                          className={`absolute left-2 top-2 font-mono text-[10px] uppercase tracking-widest ${
                            frame.highlight ? "text-accent" : "text-white/85"
                          }`}
                        >
                          Frame {frame.num}
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-accent-soft">
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                          </svg>
                          View reel
                        </span>
                      </div>
                    }
                  />
                </div>
                <p className="mt-2 text-sm font-medium leading-snug">
                  {frame.title}
                  <span className="block font-normal text-muted">
                    {frame.subtitle}
                  </span>
                </p>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={160} className="mt-10 flex justify-center">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-line px-6 py-3 text-sm font-semibold text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          {t.work.seeMore}
        </a>
      </Reveal>

      {activeIndex !== null && (
        <Lightbox
          frames={frames}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={(direction) =>
            setActiveIndex((current) => {
              if (current === null) return current;
              return (current + direction + frames.length) % frames.length;
            })
          }
        />
      )}
    </section>
  );
}
