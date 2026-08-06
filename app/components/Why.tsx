"use client";

import { useLanguage } from "@/lib/language";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";

export default function Why() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <Eyebrow>{t.why.eyebrow}</Eyebrow>
        <h2 className="display-type mt-3 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          {t.why.titleA} <span className="heading-accent">{t.why.titleB}</span>
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {t.why.reasons.map((reason, i) => (
          <Reveal key={reason.tag} delay={i * 90}>
            <div className="group rounded-md border-t border-line pt-5 transition-transform duration-300 hover:-translate-y-1">
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent-soft">
                {reason.tag}
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{reason.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
