import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SplashEntrance } from "@/components/SplashEntrance";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techhappynews.com"),
  title: {
    default: "techHappy — Good News Now",
    template: "%s | techHappy",
  },
  description: "Real progress in technology happening every day. Verified breakthroughs across clean energy, biotechnology, and open access — paired with a vetted directory of high-impact non-profits.",
  openGraph: {
    title: "techHappy — Good News Now",
    description: "Real progress in technology happening every day. Verified breakthroughs across clean energy, biotechnology, and open access.",
    url: "https://techhappynews.com",
    siteName: "techHappy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "techHappy — Good News Now",
    description: "Real progress in technology happening every day. Verified breakthroughs across clean energy, biotechnology, and open access.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${newsreader.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#080c12] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300 font-sans antialiased">
        <SplashEntrance />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
