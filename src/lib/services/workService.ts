import prisma from '@/lib/prisma';
import { WORK_SPECIMENS, WorkSpecimen, WorkBadge, WorkType } from '@/data/workData';

/**
 * Retrieves all active work specimens from PostgreSQL database.
 * Falls back to static workData if database is unseeded or temporarily unreachable.
 */
export async function getActiveWorkSpecimens(): Promise<WorkSpecimen[]> {
  try {
    const dbProjects = await prisma.project.findMany({
      where: { status: 'ACTIVE' },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    if (dbProjects && dbProjects.length > 0) {
      return dbProjects.map((p) => {
        const equation = p.systemEquation
          ? (p.systemEquation as unknown as {
              left: string;
              operator: string;
              right: string;
              outcome: string;
            })
          : undefined;

        return {
          id: p.id,
          slug: p.slug,
          title: p.title,
          headline: p.headline,
          badge: p.badge as WorkBadge,
          type: p.type as WorkSpecimen['type'],
          disciplineId: p.disciplineId,
          disciplineName: p.disciplineName,
          summary: p.summary,
          invariant: p.invariant,
          metric: p.metric,
          metricLabel: p.metricLabel,
          techStack: Array.isArray(p.techStack) ? p.techStack : [],
          video: p.video || undefined,
          image: p.image,
          featured: p.featured,
          year: p.year,
          client: p.client,
          systemEquation: equation,
          keyDeliverables: Array.isArray(p.keyDeliverables) ? p.keyDeliverables : [],
        };
      });
    }
  } catch (error) {
    console.warn('PostgreSQL query skipped or failed, falling back to static workData:', error);
  }

  // Fallback to static verified specimens
  return WORK_SPECIMENS;
}

/**
 * Retrieves a single work specimen by its slug.
 */
export async function getWorkSpecimenBySlug(slug: string): Promise<WorkSpecimen | null> {
  try {
    const project = await prisma.project.findFirst({
      where: { slug, status: 'ACTIVE' },
    });

    if (project) {
      const equation = project.systemEquation
        ? (project.systemEquation as unknown as {
            left: string;
            operator: string;
            right: string;
            outcome: string;
          })
        : undefined;

      return {
        id: project.id,
        slug: project.slug,
        title: project.title,
        headline: project.headline,
        badge: project.badge as WorkBadge,
        type: project.type as WorkSpecimen['type'],
        disciplineId: project.disciplineId,
        disciplineName: project.disciplineName,
        summary: project.summary,
        invariant: project.invariant,
        metric: project.metric,
        metricLabel: project.metricLabel,
        techStack: Array.isArray(project.techStack) ? project.techStack : [],
        video: project.video || undefined,
        image: project.image,
        featured: project.featured,
        year: project.year,
        client: project.client,
        systemEquation: equation,
        keyDeliverables: Array.isArray(project.keyDeliverables) ? project.keyDeliverables : [],
      };
    }
  } catch (error) {
    console.warn('PostgreSQL slug query failed, falling back to static workData:', error);
  }

  return WORK_SPECIMENS.find((s) => s.slug === slug) || null;
}
