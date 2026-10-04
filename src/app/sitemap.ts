import type { MetadataRoute } from "next";
import { ALL_SOLUTION_SLUGS } from "@/data/solutionsData";
import { getPublishedInsights } from "@/lib/services/insightsService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.kairotrix.in";

  // Core static public pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic Solution pages generated directly from solutionsData.ts
  const solutionRoutes: MetadataRoute.Sitemap = ALL_SOLUTION_SLUGS.map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic Insights / Case Studies / Engineering articles
  let insightRoutes: MetadataRoute.Sitemap = [];
  try {
    const publishedInsights = await getPublishedInsights();
    insightRoutes = publishedInsights.map((article) => {
      const parsedDate = article.date ? new Date(article.date) : null;
      const lastModified = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : new Date();

      return {
        url: `${baseUrl}/insights/${article.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      };
    });
  } catch (err) {
    console.warn("Could not query dynamic insights for sitemap:", err);
  }

  return [...staticRoutes, ...solutionRoutes, ...insightRoutes];
}
