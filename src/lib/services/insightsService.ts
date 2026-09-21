import prisma from '@/lib/prisma';
import {
  INSIGHT_SPECIMENS,
  InsightSpecimen,
  InsightBadge,
} from '@/data/insightsData';

/**
 * Retrieves all published insight specimens from PostgreSQL database.
 * Falls back to static insightsData if database is unseeded or temporarily unreachable.
 */
export async function getPublishedInsights(): Promise<InsightSpecimen[]> {
  try {
    const dbInsights = await prisma.insight.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    if (dbInsights && dbInsights.length > 0) {
      return dbInsights.map((i) => {
        const equation = i.architectureEquation
          ? (i.architectureEquation as unknown as {
              left: string;
              operator: string;
              right: string;
              outcome: string;
            })
          : undefined;

        const staticMatch = INSIGHT_SPECIMENS.find((s) => s.slug === i.slug);

        return {
          id: i.id,
          slug: i.slug,
          title: i.title,
          subtitle: i.subtitle,
          excerpt: i.excerpt,
          content: i.content || staticMatch?.content || undefined,
          category: i.category as InsightSpecimen['category'],
          badge: i.badge as InsightBadge,
          disciplineId: i.disciplineId,
          disciplineName: i.disciplineName,
          techCategoryId: staticMatch?.techCategoryId || 'software-web',
          techCategoryLabel: staticMatch?.techCategoryLabel || 'Software & Web Engineering',
          serviceId: staticMatch?.serviceId || i.disciplineId,
          serviceName: staticMatch?.serviceName || i.disciplineName,
          date: i.date,
          readTime: i.readTime,
          author: i.author,
          authorRole: i.authorRole,
          tags: Array.isArray(i.tags) ? i.tags : [],
          featured: i.featured,
          videoSrc: i.videoSrc || undefined,
          image: i.image,
          keyTakeaway: i.keyTakeaway,
          empiricalMetric: {
            label: i.empiricalMetricLabel || 'Verification',
            value: i.empiricalMetricValue || '100%',
          },
          architectureEquation: equation,
          keySections: Array.isArray(i.keySections) ? i.keySections : [],
        };
      });
    }
  } catch (error) {
    console.warn('PostgreSQL query skipped or failed, falling back to static insightsData:', error);
  }

  // Fallback to static verified knowledge specimens
  return INSIGHT_SPECIMENS;
}

/**
 * Retrieves a single insight specimen by its slug.
 * Supports previewing drafts or review articles when allowUnpublished is true.
 */
export async function getInsightBySlug(
  slug: string,
  allowUnpublished = false
): Promise<InsightSpecimen | null> {
  try {
    const whereClause: { slug: string; status?: string } = { slug };
    if (!allowUnpublished) {
      whereClause.status = 'PUBLISHED';
    }

    const insight = await prisma.insight.findFirst({
      where: whereClause,
    });

    if (insight) {
      const equation = insight.architectureEquation
        ? (insight.architectureEquation as unknown as {
            left: string;
            operator: string;
            right: string;
            outcome: string;
          })
        : undefined;

      const staticMatch = INSIGHT_SPECIMENS.find((s) => s.slug === insight.slug);

      return {
        id: insight.id,
        slug: insight.slug,
        title: insight.title,
        subtitle: insight.subtitle,
        excerpt: insight.excerpt,
        content: insight.content || staticMatch?.content || undefined,
        category: insight.category as InsightSpecimen['category'],
        badge: insight.badge as InsightBadge,
        disciplineId: insight.disciplineId,
        disciplineName: insight.disciplineName,
        techCategoryId: staticMatch?.techCategoryId || 'software-web',
        techCategoryLabel: staticMatch?.techCategoryLabel || 'Software & Web Engineering',
        serviceId: staticMatch?.serviceId || insight.disciplineId,
        serviceName: staticMatch?.serviceName || insight.disciplineName,
        date: insight.date,
        readTime: insight.readTime,
        author: insight.author,
        authorRole: insight.authorRole,
        tags: Array.isArray(insight.tags) ? insight.tags : [],
        featured: insight.featured,
        videoSrc: insight.videoSrc || undefined,
        image: insight.image,
        keyTakeaway: insight.keyTakeaway,
        empiricalMetric: {
          label: insight.empiricalMetricLabel || 'Verification',
          value: insight.empiricalMetricValue || '100%',
        },
        architectureEquation: equation,
        keySections: Array.isArray(insight.keySections) ? insight.keySections : [],
      };
    }
  } catch (error) {
    console.warn('PostgreSQL slug query failed, falling back to static insightsData:', error);
  }

  return INSIGHT_SPECIMENS.find((i) => i.slug === slug) || null;
}

/**
 * Retrieves related insights for the bottom recommendations on an article page.
 */
export async function getRelatedInsights(
  currentSlug: string,
  techCategoryId?: string,
  limit = 2
): Promise<InsightSpecimen[]> {
  const all = await getPublishedInsights();
  const candidates = all.filter((i) => i.slug !== currentSlug);

  if (techCategoryId) {
    const sameCategory = candidates.filter((i) => i.techCategoryId === techCategoryId);
    if (sameCategory.length >= limit) {
      return sameCategory.slice(0, limit);
    }
    const remaining = candidates.filter((i) => i.techCategoryId !== techCategoryId);
    return [...sameCategory, ...remaining].slice(0, limit);
  }

  return candidates.slice(0, limit);
}
