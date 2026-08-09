"use client";

import { useLanguage } from "@/lib/language";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";

const MAP_QUERY = "-6.3557376,106.6952352";
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
const MAP_LINK = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}`;

export default function Location() {
  const { t } = useLanguage();

  return (
    <section
      id="location"
      className="glow-top mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
    >
      <Reveal>
        <Eyebrow>{t.location.eyebrow}</Eyebrow>
        <h2 className="display-type mt-3 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          {t.location.titleA}{" "}
          <span className="heading-accent">{t.location.titleB}</span>
        </h2>
        <p className="mt-4 max-w-lg text-sm text-muted sm:text-[1rem]">
          {t.location.body}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <Reveal className="flex flex-col justify-between rounded-md border border-line bg-card p-6 sm:p-8">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent-soft">
              {t.location.badge}
            </p>
            <p className="display-type mt-3 text-lg font-semibold">
              {t.location.area}
            </p>
            <p className="mt-2 text-sm text-muted">{t.location.note}</p>
          </div>
          <ul className="mt-6 space-y-2 border-t border-line pt-5">
            {t.location.points.map((point) => (
              <li
                key={point}
                className="flex items-baseline gap-2 text-sm text-fg/85"
              >
                <span className="text-accent" aria-hidden="true">
                  —
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={100}
          className="relative aspect-4/3 overflow-hidden rounded-md border border-line sm:aspect-16/10"
        >
          <iframe
            src={MAP_SRC}
            title={`${t.location.area} — ${t.location.mapTag}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
          <div className="frame-tint absolute inset-0" aria-hidden="true" />
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group absolute inset-0 z-10 transition-colors hover:bg-base/10"
            aria-label={`${t.location.area} — ${t.location.mapTag}`}
          >
            <span className="pointer-events-none absolute left-2 top-2 rounded-sm bg-base/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-soft transition-colors group-hover:text-accent">
              {t.location.mapTag} ↗
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
