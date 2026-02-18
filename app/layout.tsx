import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import { themeEffect } from "utils/themeEffect";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Ji Min Lee",
    template: "%s | Ji Min Lee",
  },
  description: "Ji Min Lee's portfolio — software engineer focused on full-stack and applied AI.",
  openGraph: {
    title: "Ji Min Lee | Portfolio",
    description: "Full-stack and applied AI projects, writing, and resume.",
    url: baseUrl,
    siteName: "Ji Min Lee Portfolio",
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

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx("text-black bg-white dark:text-white dark:bg-black", GeistSans.variable, GeistMono.variable)}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})()`,
          }}
        />
      </head>
      <body className="antialiased max-w-3xl mx-auto mt-8 px-4 lg:px-0">
        <main className="flex-auto min-w-0 mt-6 flex flex-col">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
