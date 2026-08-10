"use client";

import Image from "next/image";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { useLanguage } from "@/lib/language";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";
import GradientText from "./GradientText";

// Order matches t.why.reasons (VIDEO FIRST, NO TEAM, GRAB ATTENTION, END-TO-END).
const REASON_IMAGES = [
  "/images/why/video-first.jpg",
  "/images/why/no-team.jpg",
  "/images/why/grab-attention.jpg",
  "/images/why/end-to-end.jpg",
];

const MAX_TILT_DEG = 9;

type Reason = { tag: string; title: string; copy: string };

function ReasonCard({ reason, image }: { reason: Reason; image: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Cursor-tracked 3D tilt — desktop mice only (matchMedia below), so it never
  // fights touch scrolling and never gets stuck mid-tilt with no pointer to
  // return it to neutral. Reduced-motion users get the plain fade/scale reveal.
  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * MAX_TILT_DEG;
    const rotateX = (0.5 - py) * MAX_TILT_DEG;
    // A short transition here (rather than none) smooths out the gaps between
    // discrete pointermove samples, so the tilt reads as fluid instead of
    // snapping between positions — the longer easing below is only for the
    // settle-back on leave, which needs a slower, more visible ease.
    card.style.transition = "transform 0.15s ease-out";
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    card.style.transform = "";
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group relative overflow-hidden rounded-lg border-t border-line p-6 will-change-transform"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="scale-110 -rotate-1 object-cover opacity-0 transition-[opacity,transform] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/0 transition-colors duration-[1600ms] ease-out delay-150 group-hover:bg-black/70"
      />
      <div className="relative">
        <p className="font-mono text-[11px] tracking-[0.2em] text-accent-soft">{reason.tag}</p>
        <h3 className="mt-3 text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
          {reason.title}
        </h3>
        <p className="mt-2 text-sm text-muted transition-colors group-hover:text-white/90">
          {reason.copy}
        </p>
      </div>
    </div>
  );
}

export default function Why() {
  const { t } = useLanguage();

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <Eyebrow>{t.why.eyebrow}</Eyebrow>
        <h2 className="display-type mt-3 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          {t.why.titleA} <GradientText className="heading-accent">{t.why.titleB}</GradientText>
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {t.why.reasons.map((reason, i) => (
          <Reveal key={reason.tag} delay={i * 90}>
            <ReasonCard reason={reason} image={REASON_IMAGES[i]} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
