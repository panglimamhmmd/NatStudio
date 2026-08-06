"use client";

import { useLanguage } from "@/lib/language";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";

export default function Faq() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <Eyebrow>{t.faq.eyebrow}</Eyebrow>
        <h2 className="display-type mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          {t.faq.titleA} <span className="heading-accent">{t.faq.titleB}</span>
        </h2>
      </Reveal>

      <div className="mt-10 border-t border-line">
        {t.faq.items.map((faq, i) => (
          <Reveal key={faq.q} delay={i * 60}>
            <details
              name="faq-accordion"
              className="faq-item group border-b border-line transition-all duration-300 open:rounded-md open:border-b-transparent open:bg-card open:px-4"
            >
              <summary className="flex items-center justify-between gap-4 py-5 text-base font-medium text-fg transition-colors sm:text-lg">
                <span className="transition-colors group-hover:text-accent group-open:text-accent">
                  {faq.q}
                </span>
                <span
                  className="faq-icon shrink-0 font-mono text-xl leading-none text-muted transition-colors group-open:text-accent"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pb-6 pr-8 text-sm text-muted sm:text-[1rem]">
                {faq.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
