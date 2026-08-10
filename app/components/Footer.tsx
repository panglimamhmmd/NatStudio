"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language";
import { waLink } from "@/lib/contact";
import LightRays from "./LightRays";

const socials = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Behance", href: "#" },
];

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer id="contact" className="glow-top relative isolate overflow-hidden bg-card/70">
      {/* <LightRays
        className="absolute inset-0 -z-10 opacity-50"
        raysOrigin="top-center"
        raysColor="#0cc0df"
        raysSpeed={0.9}
        lightSpread={0.65}
        rayLength={1.4}
        fadeDistance={1.1}
        saturation={0.9}
        followMouse
        mouseInfluence={0.08}
        noiseAmount={0.05}
      /> */}
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Image
              src="/images/natstudio-logo.png"
              alt="Natstudio"
              width={1394}
              height={589}
              className="h-9 w-auto"
            />
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {t.footer.tagline}
            </p>
            <p className="mt-6 max-w-sm text-sm text-muted">{t.footer.body}</p>
            <a
              href={waLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black transition-all hover:scale-105 hover:bg-accent-soft"
            >
              {t.nav.cta}
            </a>
            <a
              href="mailto:natstudiocreative@gmail.com"
              className="mt-3 block text-sm text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              natstudiocreative@gmail.com
            </a>
          </div>

          <nav aria-label="Social links">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {t.footer.elsewhere}
            </p>
            <ul className="mt-4 space-y-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="inline-block text-sm text-muted transition-all hover:translate-x-1 hover:text-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">{t.footer.copyright}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {t.footer.meta}
          </p>
        </div>
      </div>
    </footer>
  );
}
