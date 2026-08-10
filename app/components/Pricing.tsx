"use client";

import { useLanguage } from "@/lib/language";
import { waLink } from "@/lib/contact";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";
import GlareHover from "./GlareHover";
import GradientText from "./GradientText";

const tierMeta = [{ featured: false }, { featured: true }, { featured: false }];

export default function Pricing() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="pricing"
      className="glow-top relative isolate overflow-hidden py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <Eyebrow>{t.pricing.eyebrow}</Eyebrow>
          <h2 className="display-type mt-3 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
            {t.pricing.titleA}{" "}
            <GradientText className="heading-accent">{t.pricing.titleB}</GradientText>
          </h2>
          <p className="mt-4 inline-block rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent-soft">
            {t.pricing.referral}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {t.pricing.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 100} className="h-full">
              <GlareHover
                glareColor="#0cc0df"
                glareOpacity={tierMeta[i].featured ? 0.35 : 0.2}
                glareSize={220}
                transitionDuration={700}
                className={`flex h-full flex-col rounded-lg border bg-card p-6 transition-all duration-300 hover:scale-[1.02] sm:p-8 ${
                  tierMeta[i].featured
                    ? "border-accent shadow-[0_0_1px_rgba(12,192,223,0.6),0_0_36px_-4px_rgba(12,192,223,0.45)]"
                    : "border-line hover:border-accent-deep"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="display-type text-xl font-bold">
                    {tier.name}
                  </h3>
                  {tierMeta[i].featured && (
                    <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                      {t.pricing.featuredTag}
                    </span>
                  )}
                </div>
                <p className="mt-4">
                  <span className="display-type text-4xl font-bold">
                    {tier.price}
                  </span>
                  <span className="ml-1 font-mono text-xs text-muted">
                    {tier.unit}
                  </span>
                </p>
                <p className="mt-3 text-sm text-muted">{tier.blurb}</p>
                <ul className="mt-5 grow space-y-2 border-t border-line pt-5">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-baseline gap-2 text-sm text-fg/85"
                    >
                      <span className="text-accent" aria-hidden="true">
                        →
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 rounded-lg px-5 py-2.5 text-center text-sm font-semibold transition-all hover:scale-[1.03] ${
                    tierMeta[i].featured
                      ? "bg-accent text-black hover:bg-accent-soft"
                      : "border border-line text-fg hover:border-accent hover:text-accent"
                  }`}
                >
                  {tier.cta}
                </a>
                <p className="mt-3 text-xs text-muted">{tier.footnote}</p>
              </GlareHover>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl text-sm text-muted">
            {t.pricing.note}{" "}
            <a
              href={waLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline-offset-4 transition-colors hover:text-accent-soft hover:underline"
            >
              {t.nav.cta}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
