import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule for all crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Core search engine discovery crawlers
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Search-oriented AI discovery and citation crawlers
      // OAI-SearchBot powers ChatGPT Search indexing and citations (separate from model training)
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Model training crawlers (kept distinct from search-discovery crawlers)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://www.kairotrix.in/sitemap.xml",
  };
}
