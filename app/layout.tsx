import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Bodoni_Moda } from "next/font/google";
import { LanguageProvider } from "@/lib/language";
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

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["italic"],
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
      className={`${jakarta.variable} ${jetbrains.variable} ${bodoniModa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Without JS the IntersectionObserver never fires — never hide content */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
