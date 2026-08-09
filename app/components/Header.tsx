"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "@/lib/language";
import { waLink } from "@/lib/contact";
import type { Lang } from "@/lib/dictionary";

const langs: Lang[] = ["en", "id"];

function delay(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [underline, setUnderline] = useState({ x: 0, width: 0, visible: false });

  useLayoutEffect(() => {
    const el = activeId ? navRefs.current[activeId] : null;
    if (!el) {
      setUnderline((prev) => ({ ...prev, visible: false }));
      return;
    }
    setUnderline({ x: el.offsetLeft, width: el.offsetWidth, visible: true });
  }, [activeId, t.nav.items]);

  useEffect(() => {
    const ids = t.nav.items.map((item) => item.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [t.nav.items]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-base/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#top"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <Image
            src="/images/natstudio-logo.png"
            alt="Natstudio"
            width={1394}
            height={589}
            priority
            className="h-8 w-auto"
          />
        </a>

        <nav aria-label="Main" className="relative hidden items-center gap-7 md:flex">
          {t.nav.items.map((item) => {
            const id = item.href.replace("#", "");
            const active = activeId === id;
            return (
              <a
                key={item.href}
                ref={(el) => {
                  navRefs.current[id] = el;
                }}
                href={item.href}
                className={`py-1 text-sm font-medium transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-accent"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <span
            aria-hidden="true"
            className={`nav-underline ${underline.visible ? "is-visible" : ""}`}
            style={{
              transform: `translateX(${underline.x}px)`,
              width: `${underline.width}px`,
            }}
          />
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className="hidden items-center gap-1 rounded-md border border-line p-0.5 font-mono text-[11px] md:flex"
            role="group"
            aria-label="Language"
          >
            {langs.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`rounded-md px-2 py-1 uppercase tracking-widest transition-colors ${
                  lang === code
                    ? "bg-accent text-black"
                    : "text-muted hover:text-accent"
                }`}
              >
                {code === "en" ? "ENG" : "IND"}
              </button>
            ))}
          </div>

          <a
            href={waLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black shadow-[0_0_0_rgba(12,192,223,0)] transition-all hover:scale-105 hover:bg-accent-soft hover:shadow-[0_0_22px_rgba(12,192,223,0.55)] md:inline-block"
          >
            {t.nav.cta}
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-fg transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className="sprocket-thin border-b border-line" aria-hidden="true" />

      {menuOpen && (
        <div
          id="mobile-menu"
          className="bg-base px-4 pb-6 pt-4 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {t.nav.items.map((item, i) => {
              const id = item.href.replace("#", "");
              const active = activeId === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rise rounded-md px-2 py-2.5 text-sm font-medium transition-colors ${
                    active ? "bg-card text-accent" : "text-muted hover:bg-card hover:text-accent"
                  }`}
                  style={delay(i)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="rise mt-4 flex items-center gap-3" style={delay(t.nav.items.length)}>
            <div
              className="flex items-center gap-1 rounded-md border border-line p-0.5 font-mono text-[11px]"
              role="group"
              aria-label="Language"
            >
              {langs.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`rounded-md px-2 py-1 uppercase tracking-widest transition-colors ${
                    lang === code
                      ? "bg-accent text-black"
                      : "text-muted hover:text-accent"
                  }`}
                >
                  {code === "en" ? "ENG" : "IND"}
                </button>
              ))}
            </div>
            <a
              href={waLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex-1 rounded-md bg-accent px-4 py-2 text-center text-sm font-semibold text-black transition-all hover:bg-accent-soft"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
