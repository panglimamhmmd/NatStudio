"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "@/lib/language";
import { waLink } from "@/lib/contact";
import Lightbox from "./Lightbox";
import ShapeGrid from "./ShapeGrid";
import ShinyText from "./ShinyText";
import GradientText from "./GradientText";
import GlareHover from "./GlareHover";
import ClickSpark from "./ClickSpark";

const stripFrames = [
  { num: "001", ph: "ph-3", video: "armont-rizky" },
  { num: "002", ph: "ph-1", video: "gramercy-natalia" },
  { num: "003", ph: "ph-2", video: "belova-rizky" },
  { num: "004", ph: "ph-9", video: "anza-megacung" },
  { num: "005", ph: "ph-5", video: "castillo-rizky" },
  { num: "006", ph: "ph-8", video: "cgs-natalia" },
  { num: "007", ph: "ph-4", video: "izzi-kiky" },
  { num: "008", ph: "ph-6", video: "eonna-elyon-nuh" },
];

function delay(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

function Words({ text, from }: { text: string; from: number }) {
  const parts = text.split(" ");
  return (
    <>
      {parts.map((word, i) => {
        const isLast = i === parts.length - 1;
        return (
          <span key={`${word}-${i}`}>
            <span className="word" style={delay(from + i)}>
              {word}
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
            <svg
              viewBox="0 0 24 24"
              className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-white/60 transition-transform duration-300 group-hover:scale-110 group-active:scale-110"
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
  const [dragging, setDragging] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const handleTouchStart = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setDragging(true);
  };

  const handleScroll = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setDragging(false), 2000);
  };

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
      className="glow-hero relative isolate flex min-h-screen flex-col overflow-hidden pt-24 sm:pt-20"
    >
      <ShapeGrid
        className="absolute inset-0 -z-10 opacity-40"
        direction="diagonal"
        speed={0.35}
        squareSize={58}
        shape="hexagon"
        borderColor="rgba(255, 255, 255, 0.11)"
        hoverFillColor="rgba(12,192,223,0.22)"
        hoverTrailAmount={2}
      />
      <div
        key={lang}
        className="pointer-events-none relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 sm:py-20"
      >
        <p
          className="rise flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
          style={delay(0)}
        >
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
          {t.hero.eyebrow}
        </p>
        <h1 className="display-type mt-6 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight">
          <ShinyText className="block" color="var(--fg)" speed={2.6} shineColor="#eafcff">
            <Words text={t.hero.titleA} from={1} />
          </ShinyText>
          <GradientText className="block heading-accent">
            <Words text={t.hero.titleB} from={1 + wordsA} />
          </GradientText>
        </h1>
        <p
          className="rise mt-8 max-w-xl text-base text-muted sm:text-lg"
          style={delay(1 + wordsA + wordsB)}
        >
          {t.hero.body}
        </p>
        <ClickSpark
          sparkColor="#0cc0df"
          sparkCount={10}
          sparkRadius={22}
          duration={500}
          className="rise mt-10 flex flex-wrap items-center gap-6"
          style={delay(2 + wordsA + wordsB)}
        >
          <GlareHover
            glareColor="#eafcff"
            glareOpacity={0.4}
            glareAngle={-30}
            glareSize={200}
            transitionDuration={800}
            className="pointer-events-auto rounded-md"
          >
            <a
              href={waLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md bg-gradient-to-br from-accent-soft to-accent px-6 py-3 text-sm font-semibold text-black"
            >
              {t.hero.ctaContact}
            </a>
          </GlareHover>
          <GlareHover
            glareColor="#0cc0df"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={200}
            transitionDuration={800}
            className="pointer-events-auto rounded-md"
          >
            <a
              href="#hero-filmstrip"
              className="block rounded-md border border-line px-6 py-3 text-sm font-semibold text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {t.hero.ctaWork}
            </a>
          </GlareHover>
        </ClickSpark>
        <p
          className="rise mt-3 text-[11px] italic text-muted/70 sm:text-xs"
          style={delay(3 + wordsA + wordsB)}
        >
          {t.hero.ctaMicro}
        </p>
      </div>

      {/* Portrait film strip — 9:16 video slots. Pauses on hover/touch, swipeable
          on mobile, static under reduced motion */}
      <div
        id="hero-filmstrip"
        className={`filmstrip scroll-mt-24 border-y border-line bg-card/70${dragging ? " is-interacting" : ""}`}
      >
        <div className="sprocket-thin" aria-hidden="true" />
        <div
          className="filmstrip-scroll py-2"
          onTouchStart={handleTouchStart}
          onScroll={handleScroll}
        >
          <div className="filmstrip-track flex w-max">
            <StripSet note={t.hero.stripNote} onOpen={setActiveIndex} />
            <StripSet note={t.hero.stripNote} hidden onOpen={setActiveIndex} />
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
              return (
                (current + direction + lightboxFrames.length) %
                lightboxFrames.length
              );
            })
          }
          aspect="aspect-9/16"
          panelWidth="max-w-xs sm:max-w-sm"
        />
      )}
    </section>
  );
}
