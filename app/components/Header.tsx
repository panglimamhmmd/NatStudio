"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useLanguage } from "@/lib/language";
import { waLink } from "@/lib/contact";
import { useLightboxOpen } from "@/lib/lightbox";
import type { Lang } from "@/lib/dictionary";
import GlareHover from "./GlareHover";

const langs: Lang[] = ["en", "id"];

function delay(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor">
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
  );
}

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const lightboxOpen = useLightboxOpen();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [underline, setUnderline] = useState({
    x: 0,
    width: 0,
    visible: false,
  });

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled((prev) => {
          const y = window.scrollY;
          // Hysteresis: different thresholds for entering/leaving the
          // scrolled state so hovering near the boundary doesn't
          // restart the transition mid-flight.
          if (prev) return y > 4;
          return y > 24;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useLayoutEffect(() => {
    const el = activeId ? navRefs.current[activeId] : null;
    if (!el) {
      setUnderline((prev) => ({ ...prev, visible: false }));
      return;
    }
    setUnderline({ x: el.offsetLeft, width: el.offsetWidth, visible: true });
  }, [activeId, t.nav.items]);

  useEffect(() => {
    const el = activeId ? navRefs.current[activeId] : null;
    if (!el) return;
    const timeout = setTimeout(() => {
      setUnderline({ x: el.offsetLeft, width: el.offsetWidth, visible: true });
    }, 520);
    return () => clearTimeout(timeout);
  }, [scrolled, activeId]);

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
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
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
    <header
      aria-hidden={lightboxOpen}
      className={`fixed inset-x-0 top-0 z-50 transition-opacity duration-200 ease-out ${
        lightboxOpen ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`flex max-w-6xl items-center justify-between gap-4 border bg-gradient-to-b px-4 backdrop-blur-xl transition-[background-color,background-image,box-shadow,border-color,margin,height,max-width,border-radius,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 ${
          scrolled
            ? "bg-base/60 from-accent/10 to-transparent mx-3 mt-3 h-14 rounded-lg border-line shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_-8px_rgba(0,0,0,0.55)] sm:mx-4 md:mx-auto md:max-w-5xl md:px-8"
            : "bg-base/0 from-accent/0 to-transparent mx-0 mt-0 h-16 rounded-none border-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0),0_10px_30px_-8px_rgba(0,0,0,0)] md:mx-auto md:max-w-full md:px-8 lg:px-12"
        }`}
      >
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

        <nav
          aria-label="Main"
          className={`relative hidden items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:flex ${
            scrolled ? "gap-6" : "gap-10 lg:gap-14"
          }`}
        >
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
            className="hidden items-center gap-1 rounded-lg border border-line p-0.5 font-mono text-[11px] md:flex"
            role="group"
            aria-label="Language"
          >
            {langs.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`rounded-lg px-2 py-1 uppercase tracking-widest transition-colors ${
                  lang === code
                    ? "bg-accent text-black"
                    : "text-muted hover:text-accent"
                }`}
              >
                {code === "en" ? "ENG" : "IND"}
              </button>
            ))}
          </div>

          <GlareHover
            glareColor="#eafcff"
            glareOpacity={0.4}
            glareAngle={-30}
            glareSize={200}
            transitionDuration={800}
            className="hidden rounded-lg md:inline-block"
          >
            <a
              href={waLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent-soft"
            >
              {t.nav.cta}
            </a>
          </GlareHover>

          <GlareHover
            glareColor="#eafcff"
            glareOpacity={0.4}
            glareAngle={-30}
            glareSize={200}
            transitionDuration={800}
            className="rounded-lg md:hidden"
          >
            <a
              href={waLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.nav.cta}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-black transition-colors hover:bg-accent-soft"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </GlareHover>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg transition-colors hover:border-accent hover:text-accent md:hidden"
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

      {menuOpen && (
        <div id="mobile-menu" className="bg-base px-4 pb-6 pt-4 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {t.nav.items.map((item, i) => {
              const id = item.href.replace("#", "");
              const active = activeId === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rise rounded-lg px-2 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-card text-accent"
                      : "text-muted hover:bg-card hover:text-accent"
                  }`}
                  style={delay(i)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div
            className="rise mt-4 flex items-center gap-3"
            style={delay(t.nav.items.length)}
          >
            <div
              className="flex items-center gap-1 rounded-lg border border-line p-0.5 font-mono text-[11px]"
              role="group"
              aria-label="Language"
            >
              {langs.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`rounded-lg px-2 py-1 uppercase tracking-widest transition-colors ${
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
              className="flex-1 rounded-lg bg-accent px-4 py-2 text-center text-sm font-semibold text-black transition-all hover:bg-accent-soft"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
