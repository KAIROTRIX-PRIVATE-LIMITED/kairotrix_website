import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Orbitron, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CursorProvider } from "@/context/CursorContext";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kairotrix.in"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "KAIROTRIX — AI Technology & Software Solutions",
    template: "%s | KAIROTRIX",
  },
  description:
    "KAIROTRIX builds custom AI systems, software, and automation designed to solve real business problems. Practical technology — problem-first, built to last.",
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
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    url: "https://www.kairotrix.in",
    siteName: "KAIROTRIX",
    locale: "en_IN",
    title: "KAIROTRIX — Built to evolve",
    description:
      "Technology that moves ideas into real-world solutions. AI systems, custom software, and automation built with digital craft.",
    images: [
      {
        url: "/assets/images/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "KAIROTRIX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAIROTRIX — Built to evolve",
    description:
      "Technology that moves ideas into real-world solutions. AI systems, custom software, and automation built with digital craft.",
    images: ["/assets/images/og/og-default.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAFC",
  width: "device-width",
  initialScale: 1,
};

import { PreloaderProvider } from "@/context/PreloaderContext";
import { Preloader } from "@/components/ui/Preloader";
import { PageEntranceWrapper } from "@/components/ui/PageEntranceWrapper";

const GLOBAL_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.kairotrix.in/#organization",
      name: "KAIROTRIX",
      alternateName: ["KAIROTRIX PRIVATE LIMITED", "Kairotrix"],
      url: "https://www.kairotrix.in/",
      logo: "https://www.kairotrix.in/assets/brand/PRIMARY_LOGO_SQUARE/BLACK.png",
      image: "https://www.kairotrix.in/assets/images/og/og-default.png",
      description:
        "KAIROTRIX is a technology company building custom software, AI systems, business automation, websites, data solutions, and technology integrations around real business problems.",
      slogan: "Built to Evolve",
      email: "kairotrix.official@gmail.com",
      sameAs: [
        "https://www.instagram.com/kairotrix/",
        "https://www.facebook.com/people/Kairotrix/61593750965365/",
        "https://www.linkedin.com/company/kairotrix/",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "general inquiries",
          email: "kairotrix.official@gmail.com",
          availableLanguage: ["English"],
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "KAIROTRIX Core Solutions",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": "https://www.kairotrix.in/solutions/ai-intelligent-systems#service",
              name: "AI & Intelligent Systems",
              url: "https://www.kairotrix.in/solutions/ai-intelligent-systems",
              description:
                "Custom AI applications, intelligent agents, machine learning adaptation, and knowledge retrieval systems (RAG).",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": "https://www.kairotrix.in/solutions/software-product-engineering#service",
              name: "Software & Product Engineering",
              url: "https://www.kairotrix.in/solutions/software-product-engineering",
              description:
                "Purpose-built business software, responsive web applications, end-to-end product development, and design systems.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": "https://www.kairotrix.in/solutions/automation-digital-operations#service",
              name: "Automation & Digital Operations",
              url: "https://www.kairotrix.in/solutions/automation-digital-operations",
              description:
                "Business process automation, background task orchestration, document workflows, and operational monitoring.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": "https://www.kairotrix.in/solutions/digital-transformation#service",
              name: "Digital Transformation",
              url: "https://www.kairotrix.in/solutions/digital-transformation",
              description:
                "High-performance digital platforms, manual process digitization, and UI/UX modernization.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": "https://www.kairotrix.in/solutions/data-business-intelligence#service",
              name: "Data & Business Intelligence",
              url: "https://www.kairotrix.in/solutions/data-business-intelligence",
              description:
                "Analytical data storage, executive KPI dashboards, predictive modeling, and natural-language data queries.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": "https://www.kairotrix.in/solutions/technology-integration#service",
              name: "Technology Integration",
              url: "https://www.kairotrix.in/solutions/technology-integration",
              description:
                "Custom API connectors, CRM and ERP synchronization, payment gateway integrations, and cross-system data pipelines.",
            },
          },
        ],
      },
      knowsAbout: [
        "Artificial Intelligence",
        "AI Agents",
        "Custom Software Development",
        "Business Process Automation",
        "Data and Business Intelligence",
        "Technology Integration",
        "Digital Transformation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.kairotrix.in/#website",
      url: "https://www.kairotrix.in",
      name: "KAIROTRIX",
      alternateName: "KAIROTRIX — Built to evolve",
      description:
        "Technology that moves ideas into real-world solutions. AI systems, custom software, and automation built around real business problems.",
      publisher: {
        "@id": "https://www.kairotrix.in/#organization",
      },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${plusJakarta.variable} light antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(GLOBAL_JSON_LD),
          }}
        />
      </head>
      <body className="bg-[#FAFAFC] text-neutral-900 min-h-screen flex flex-col selection:bg-brand-500 selection:text-white">
        <CursorProvider>
          <ThemeProvider>
            <PreloaderProvider>
              <Preloader />
              <CustomCursor />
              <Navbar />
              <main className="flex-1 w-full">
                <PageEntranceWrapper>{children}</PageEntranceWrapper>
              </main>
              <Footer />
              <AIAssistant />
            </PreloaderProvider>
          </ThemeProvider>
        </CursorProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8RSQLHFJGM"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8RSQLHFJGM');
          `}
        </Script>
      </body>
    </html>
  );
}
