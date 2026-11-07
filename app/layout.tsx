import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { SwipeProvider } from "./components/swipe-provider";
import { baseUrl } from "./sitemap";
import { themeEffect } from "utils/themeEffect";

// Self-hosted (from @fontsource) so builds don't depend on fetching Google Fonts.
const dmSerif = localFont({
  src: "./fonts/dm-serif-display-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = localFont({
  src: [
    { path: "./fonts/dm-sans-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/dm-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Jimin Lee",
    template: "%s | Jimin Lee",
  },
  description: "Jimin Lee — Software Engineer, Full-Stack & AI Systems. M.S. CS (AI) at USC, graduating May 2027 and open to new grad roles.",
  openGraph: {
    title: "Jimin Lee",
    description: "Software Engineer, Full-Stack & AI Systems. M.S. CS (AI) at USC, graduating May 2027 and open to new grad roles.",
    url: baseUrl,
    siteName: "Jimin Lee",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(" ");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-[#f9f8f4] dark:text-white dark:bg-neutral-950",
        GeistSans.variable,
        GeistMono.variable,
        dmSerif.variable,
        dmSans.variable,
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})()`,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[#f9f8f4] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
        <main className="flex-auto min-w-0 flex flex-col pt-[60px]">
          <Navbar />
          <SwipeProvider>{children}</SwipeProvider>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
