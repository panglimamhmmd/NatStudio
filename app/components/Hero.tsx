"use client";

import { useState, type CSSProperties } from "react";
import { useLanguage } from "@/lib/language";
import { waLink } from "@/lib/contact";
import Lightbox from "./Lightbox";

const stripFrames = [
  { num: "001", ph: "ph-3", video: "34408" },
  { num: "002", ph: "ph-6", video: "50635" },
  { num: "003", ph: "ph-1", video: "50641" },
  { num: "004", ph: "ph-9", video: "46353" },
  { num: "005", ph: "ph-12", video: "44066" },
  { num: "006", ph: "ph-4", video: "44076" },
  { num: "007", ph: "ph-7", video: "44054" },
  { num: "008", ph: "ph-2", video: "44074" },
];

function delay(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

function Words({
  text,
  from,
  suffix,
}: {
  text: string;
  from: number;
  suffix?: React.ReactNode;
}) {
  const parts = text.split(" ");
  return (
    <>
      {parts.map((word, i) => {
        const isLast = i === parts.length - 1;
        return (
          <span key={`${word}-${i}`}>
            <span className="word" style={delay(from + i)}>
              {word}
              {isLast && suffix}
            </span>
            {!isLast && " "}
          </span>
        );
      })}
    </>
  );
}

/*
 * 9:16 portrait slots show a static poster (extracted frame) for the passive
 * scrolling strip — real playback only kicks in inside the Lightbox, so we're
 * not decoding 16 concurrent videos in the marquee.
 */
function StripSet({
  hidden,
  note,
  onOpen,
}: {
  hidden?: boolean;
  note: string;
  onOpen?: (index: number) => void;
}) {
  return (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
      {stripFrames.map((frame, i) => {
        const Tag = onOpen ? "button" : "div";
        return (
          <Tag
            key={frame.num}
            type={onOpen ? "button" : undefined}
            tabIndex={hidden ? -1 : undefined}
            onClick={onOpen ? () => onOpen(i) : undefined}
            className="frame group relative mx-1.5 aspect-9/16 h-72 shrink-0 overflow-hidden rounded-md border border-line text-left transition-transform duration-300 hover:scale-[1.03] sm:h-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/videos/hero/${frame.video}.jpg`}
              alt=""
              className="frame-media absolute inset-0 h-full w-full object-cover"
            />
            <div className="frame-tint absolute inset-0" aria-hidden="true" />
            <svg
              viewBox="0 0 24 24"
              className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-white/60 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
              fill="currentColor"
            >
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
            <span className="absolute left-2 top-2 font-mono text-[10px] tracking-widest text-white/85">
              FRAME {frame.num}
            </span>
            <span className="absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-widest text-accent-soft/90">
              {note}
            </span>
          </Tag>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const { lang, t } = useLanguage();
  const wordsA = t.hero.titleA.split(" ").length;
  const wordsB = t.hero.titleB.split(" ").length;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const lightboxFrames = stripFrames.map((frame) => ({
    num: frame.num,
    ph: frame.ph,
    video: frame.video,
    title: `Reel ${frame.num}`,
    subtitle: t.hero.stripNote,
  }));

  return (
    <section
      id="top"
      className="glow-hero flex min-h-[80vh] flex-col overflow-hidden"
    >
      <div
        key={lang}
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 sm:py-20"
      >
        <p
          className="rise flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
          style={delay(0)}
        >
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
          {t.hero.eyebrow}
        </p>
        <h1 className="display-type mt-6 max-w-4xl text-[clamp(2.75rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tight">
          <Words text={t.hero.titleA} from={1} />{" "}
          <span className="heading-accent">
            <Words
              text={t.hero.titleB}
              from={1 + wordsA}
              suffix={
                <span
                  className="not-italic font-sans text-accent"
                  style={{ marginLeft: "-0.15em" }}
                >
                  .
                </span>
              }
            />
          </span>
        </h1>
        <p
          className="rise mt-8 max-w-xl text-base text-muted sm:text-lg"
          style={delay(1 + wordsA + wordsB)}
        >
          {t.hero.body}
        </p>
        <div
          className="rise mt-10 flex flex-wrap gap-6"
          style={delay(2 + wordsA + wordsB)}
        >
          <a
            href="#work"
            className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-black transition-all hover:scale-105 hover:bg-accent-soft"
          >
            {t.hero.ctaWork}
          </a>
          <a
            href={waLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-line px-6 py-3 text-sm font-semibold text-fg transition-all hover:scale-105 hover:border-accent hover:text-accent"
          >
            {t.hero.ctaContact}
          </a>
        </div>
      </div>

      {/* Portrait film strip — 9:16 video slots. Pauses on hover, static under reduced motion */}
      <div className="filmstrip border-y border-line bg-card/70">
        <div className="sprocket-thin" aria-hidden="true" />
        <div className="overflow-hidden py-2">
          <div className="filmstrip-track flex w-max">
            <StripSet note={t.hero.stripNote} onOpen={setActiveIndex} />
            <StripSet note={t.hero.stripNote} hidden />
          </div>
        </div>
        <div className="sprocket-thin" aria-hidden="true" />
      </div>

      {activeIndex !== null && (
        <Lightbox
          frames={lightboxFrames}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={(direction) =>
            setActiveIndex((current) => {
              if (current === null) return current;
              return (current + direction + lightboxFrames.length) % lightboxFrames.length;
            })
          }
          aspect="aspect-9/16"
          panelWidth="max-w-xs sm:max-w-sm"
        />
      )}
    </section>
  );
}
