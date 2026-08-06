"use client";

import { useLanguage } from "@/lib/language";
import { waLink } from "@/lib/contact";

const socials = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Behance", href: "#" },
];

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer id="contact" className="glow-top bg-card/70">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="display-type text-2xl font-bold uppercase tracking-tight">
              Natstudio
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {t.footer.tagline}
            </p>
            <p className="mt-6 max-w-sm text-sm text-muted">{t.footer.body}</p>
            <a
              href={waLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black transition-all hover:scale-105 hover:bg-accent-soft"
            >
              {t.nav.cta}
            </a>
            <a
              href="mailto:hello@natstudio.id"
              className="mt-3 block text-sm text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              hello@natstudio.id
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
