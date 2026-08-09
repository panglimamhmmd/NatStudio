import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Fraunces } from "next/font/google";
import { LanguageProvider } from "@/lib/language";
import Preloader from "./components/Preloader";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "Natstudio: Social Content, Photography & Motion",
  description:
    "Natstudio plans, shoots, and edits content for brands: social, photography, and motion. Every post starts with a shot.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${jetbrains.variable} ${fraunces.variable} h-full antialiased intro-pending`}
    >
      <body className="min-h-full flex flex-col">
        {/* Without JS neither the IntersectionObserver nor the preloader's
            unpause ever fires — never hide/pause content */}
        <noscript>
          <style>{`
            .reveal{opacity:1 !important;transform:none !important}
            #ns-preloader{display:none !important}
            :root.intro-pending .word,
            :root.intro-pending .rise{animation-play-state:running !important}
          `}</style>
        </noscript>
        <Preloader />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
