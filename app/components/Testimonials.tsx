"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language";
import type { Dict } from "@/lib/dictionary";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";

type Item = Dict["testimonials"]["items"][number];

const rowAPh = ["ph-1", "ph-3", "ph-5", "ph-7", "ph-9"];
const rowBPh = ["ph-2", "ph-4", "ph-6", "ph-8", "ph-10"];

function monogram(tag: string) {
  const label = tag.split(",")[1]?.trim() ?? tag;
  const words = label.match(/[A-Za-z]+/g) ?? [label];
  return words.length > 1
    ? words[0][0] + words[1][0]
    : words[0].slice(0, 2);
}

function Card({ quote, tag, ph }: Item & { ph: string }) {
  return (
    <article className="group flex h-full min-h-[188px] w-72 shrink-0 snap-start flex-col rounded-md border border-line bg-card p-5 transition-all duration-300 hover:z-10 hover:scale-[1.03] hover:border-accent hover:bg-card-hi sm:w-80 sm:min-h-[176px] sm:p-6">
      <p className="text-sm leading-relaxed text-fg transition-colors duration-300 group-hover:text-accent-soft sm:text-[1rem]">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-auto flex items-center gap-3 border-t border-line pt-4 transition-colors duration-300 group-hover:border-accent/40">
        <span
          className={`ph ${ph} relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full`}
          aria-hidden="true"
        >
          <span className="absolute inset-0 bg-black/25" />
          <span className="relative m-auto font-mono text-[10px] font-bold uppercase text-white">
            {monogram(tag)}
          </span>
        </span>
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors duration-300 group-hover:text-fg">
          {tag}
        </p>
      </div>
    </article>
  );
}

function Row({
  items,
  ph,
  reverse,
}: {
  items: Item[];
  ph: string[];
  reverse?: boolean;
}) {
  const cards = items.map((item, i) => ({ ...item, ph: ph[i % ph.length] }));
  const rowRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Manual drag/scroll takes priority over the auto-marquee — pause it the
  // moment the user touches the row, and only let it pick back up once
  // they've been still for a bit (covers touch drag, wheel/trackpad, and
  // momentum scroll all through one "still interacting" signal).
  const pause = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    rowRef.current?.classList.add("is-interacting");
  };
  const scheduleResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      rowRef.current?.classList.remove("is-interacting");
    }, 700);
  };

  // The track holds the card set twice back-to-back (for the CSS marquee's
  // seamless loop). Manual dragging can reuse that same duplicate: the
  // instant scroll position nears either end, jump by exactly one set's
  // width — since both halves are pixel-identical, the jump is invisible
  // and the user just keeps dragging into "more" cards forever.
  const wrapIfNeeded = () => {
    const el = rowRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    const edge = 4;
    if (el.scrollLeft <= edge) {
      el.scrollLeft += halfWidth;
    } else if (el.scrollLeft >= halfWidth * 2 - el.clientWidth - edge) {
      el.scrollLeft -= halfWidth;
    }
  };

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 2;
  }, []);

  return (
    <div
      ref={rowRef}
      className="marquee-row"
      onPointerDown={pause}
      onPointerUp={scheduleResume}
      onPointerCancel={scheduleResume}
      onScroll={() => {
        pause();
        scheduleResume();
        wrapIfNeeded();
      }}
    >
      <div
        className={`flex w-max gap-4 ${reverse ? "marquee-track-reverse" : "marquee-track"}`}
      >
        {[false, true].map((isDuplicate) => (
          <div
            key={isDuplicate ? "dup" : "src"}
            className="flex shrink-0 gap-4 pr-4"
            aria-hidden={isDuplicate || undefined}
          >
            {cards.map((card, i) => (
              <Card key={`${isDuplicate ? "dup" : "src"}-${i}`} {...card} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();
  const rowA = t.testimonials.items.slice(0, 5);
  const rowB = t.testimonials.items.slice(5, 10);

  return (
    <section id="testimonials" className="overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <Eyebrow>{t.testimonials.eyebrow}</Eyebrow>
          <h2 className="display-type mt-3 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
            {t.testimonials.titleA}{" "}
            <span className="heading-accent">{t.testimonials.titleB}</span>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={100} className="border-y border-line bg-card/70 py-8">
        <div className="space-y-4">
          <Row items={rowA} ph={rowAPh} reverse />
          <Row items={rowB} ph={rowBPh} />
        </div>
      </Reveal>
    </section>
  );
}
