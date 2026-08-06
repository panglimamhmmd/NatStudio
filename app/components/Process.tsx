"use client";

import { useLanguage } from "@/lib/language";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";

const stepMeta = [
  { num: "001", ph: "ph-2" },
  { num: "002", ph: "ph-10" },
  { num: "003", ph: "ph-5" },
  { num: "004", ph: "ph-6" },
  { num: "005", ph: "ph-3" },
  { num: "006", ph: "ph-12" },
];

export default function Process() {
  const { t } = useLanguage();

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

      {/* The process rendered as a strip of film frames */}
      <div className="mt-10 border-y border-line bg-card/70">
        <div className="sprocket-thin" aria-hidden="true" />
        <ol className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-3">
          {t.process.steps.map((step, i) => (
            <li key={stepMeta[i].num} className="frame">
              <Reveal delay={i * 120} className="h-full">
                <div className="h-full overflow-hidden rounded-md border border-line bg-base transition-all duration-300 hover:scale-[1.02] hover:border-accent">
                  <div className="relative h-20">
                    <div
                      className={`frame-media ph ${stepMeta[i].ph} absolute inset-0`}
                    />
                    <span className="absolute left-3 top-2.5 font-mono text-[10px] tracking-widest text-white/85">
                      FRAME {stepMeta[i].num}
                    </span>
                    <span className="absolute right-3 top-2.5 font-mono text-[10px] tracking-widest text-white/85">
                      {step.meta}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="display-type text-lg font-bold">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{step.copy}</p>
                  </div>
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
