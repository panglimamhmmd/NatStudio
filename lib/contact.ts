import type { Lang } from "./dictionary";

const WA_NUMBER = "62882007426240";

const waMessage: Record<Lang, string> = {
  en: "Hi Natstudio, I'd like to start a project.",
  id: "Halo NatStudio, saya mau mulai project.",
};

export function waLink(lang: Lang): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage[lang])}`;
}
