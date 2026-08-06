"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";
import Lightbox from "./Lightbox";

const frameMeta = [
  { num: "003", ph: "ph-3" },
  { num: "007", ph: "ph-4" },
  { num: "009", ph: "ph-6" },
  { num: "014", ph: "ph-7", highlight: true },
  { num: "017", ph: "ph-1" },
  { num: "022", ph: "ph-8" },
  { num: "026", ph: "ph-2" },
  { num: "031", ph: "ph-12" },
  { num: "034", ph: "ph-5" },
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
          {t.work.titleA} <span className="heading-accent">{t.work.titleB}</span>
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
                <div className="relative aspect-3/2 overflow-hidden rounded-md border border-line transition-all duration-300 group-hover:scale-[1.03] group-hover:border-accent">
                  <div className={`frame-media ph ${frame.ph} absolute inset-0`} />
                  <span
                    className={`absolute left-2 top-2 font-mono text-[10px] uppercase tracking-widest ${
                      frame.highlight ? "text-accent" : "text-white/85"
                    }`}
                  >
                    Frame {frame.num}
                  </span>
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
