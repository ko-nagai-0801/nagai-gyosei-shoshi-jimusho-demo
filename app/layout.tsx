import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  display: "swap",
});

const siteName = "永井行政書士事務所";
const siteDescription =
  "採用担当者とクライアントに向けて、UI設計力と実装品質を提示するポートフォリオ用デモサイト。";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://nagai-gyosei-shoshi-jimusho-demo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | デモサイト`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "行政書士",
    "ポートフォリオ",
    "Next.js",
    "TypeScript",
    "UIデザイン",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteName} | デモサイト`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteName}のOGP画像`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | デモサイト`,
    description: siteDescription,
    images: ["/twitter-image"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon" }],
    apple: [{ url: "/apple-icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSans.variable} ${notoSerif.variable} antialiased`}
      >
        <div className="min-h-dvh bg-[--surface] text-[--ink]">
          <SiteHeader />
          <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-16 pt-6 md:px-8 md:pt-8">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
