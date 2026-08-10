import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

const SITE_URL = "https://natstudio.vercel.app"; // switch to https://natstudio.id once that domain is live
const SITE_NAME = "NatStudio";
const TITLE = "NatStudio: Social Content, Photography & Motion";
const DESCRIPTION =
  "Natstudio plans, shoots, and edits content for brands: social, photography, and motion. Every post starts with a shot.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "content studio",
    "social media content",
    "photography studio",
    "video production",
    "motion graphics",
    "brand content",
    "NatStudio",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1012",
  colorScheme: "dark",
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
        <Analytics />
      </body>
    </html>
  );
}
