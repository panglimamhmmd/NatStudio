"use client";

import { useLanguage } from "@/lib/language";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";

export default function Services() {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="glow-top mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
    >
      <Reveal>
        <Eyebrow>{t.services.eyebrow}</Eyebrow>
        <h2 className="display-type mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          {t.services.titleA} <span className="heading-accent">{t.services.titleB}</span>
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {t.services.cards.map((service, i) => (
          <Reveal key={service.tag} delay={i * 100} className="h-full">
            <article className="h-full rounded-md border border-line bg-card p-6 transition-all duration-300 hover:scale-[1.02] hover:border-accent sm:p-8">
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent-soft">
                {service.tag}
              </p>
              <h3 className="display-type mt-3 text-xl font-bold">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{service.copy}</p>
              <ul className="mt-5 space-y-2 border-t border-line pt-5">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-2 text-sm text-fg/85"
                  >
                    <span className="text-accent" aria-hidden="true">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
