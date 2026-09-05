import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Orbitron, Rajdhani, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "KAIROTRIX — AI Technology & Software Solutions",
  description:
    "Practical, accessible technology partner. We build intelligent AI systems, custom software, workflow automation, and digital platforms designed to solve real business problems.",
  keywords: [
    "AI solutions",
    "AI agent development",
    "custom software development",
    "workflow automation",
    "digital transformation",
    "intelligent systems",
    "KAIROTRIX",
  ],
  authors: [{ name: "KAIROTRIX" }],
  icons: {
    icon: "/assets/brand/PRIMARY_LOGO_SQUARE/BLACK.svg",
    shortcut: "/assets/brand/PRIMARY_LOGO_SQUARE/BLACK.svg",
    apple: "/assets/brand/PRIMARY_LOGO_SQUARE/BLACK.svg",
  },
  openGraph: {
    title: "KAIROTRIX — Built to evolve",
    description:
      "Technology that moves ideas into real-world solutions. AI systems, custom software, and automation built with digital craft.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAFC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${rajdhani.variable} ${plusJakarta.variable} light antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          href="/assets/brand/PRIMARY_LOGO_SQUARE/BLACK.svg"
          type="image/svg+xml"
        />
      </head>
      <body className="bg-[#FAFAFC] text-neutral-900 min-h-screen flex flex-col selection:bg-brand-500 selection:text-white">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
