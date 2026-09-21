import prisma from '@/lib/prisma';

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  badge?: string | null;
  image: string;
  twitter?: string | null;
  linkedin?: string | null;
  github?: string | null;
  order: number;
  isActive: boolean;
}

export interface TeamConfigData {
  isTeamSectionVisible: boolean;
  members: TeamMemberData[];
}

export const INITIAL_TEAM_MEMBERS: TeamMemberData[] = [
  {
    id: 'team_grace',
    name: 'Grace Thompson',
    role: 'Head of AI Systems',
    badge: 'AI Systems',
    image: '/assets/images/about/team-grace.jpg',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    order: 0,
    isActive: true,
  },
  {
    id: 'team_ethan',
    name: 'Ethan Cole',
    role: 'Founder & Chief Architect',
    badge: 'Founder',
    image: '/assets/images/about/team-ethan.jpg',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    order: 1,
    isActive: true,
  },
  {
    id: 'team_sophia',
    name: 'Sophia Bennett',
    role: 'Head of Product & Design',
    badge: 'Product & UX',
    image: '/assets/images/about/team-sophia.jpg',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    order: 2,
    isActive: true,
  },
];

/**
 * Retrieves public team configuration & active members using direct raw SQL.
 * Resilient fallback to default initial state if DB is unreachable.
 */
export async function getTeamConfig(): Promise<TeamConfigData> {
  let isTeamSectionVisible = true;
  let members: TeamMemberData[] = INITIAL_TEAM_MEMBERS;

  // 1. Fetch section visibility config
  try {
    const configRows = await prisma.$queryRaw<Array<{ isTeamSectionVisible: boolean }>>`
      SELECT "isTeamSectionVisible" FROM "AboutConfig" WHERE id = 'default' LIMIT 1
    `;
    if (configRows && configRows.length > 0) {
      isTeamSectionVisible = Boolean(
        configRows[0].isTeamSectionVisible ?? (configRows[0] as any).isteamsectionvisible
      );
    }
  } catch (e) {
    console.warn('Config query error:', e);
  }

  // 2. Fetch active team members
  try {
    const dbMembers = await prisma.$queryRaw<TeamMemberData[]>`
      SELECT id, name, role, badge, image, twitter, linkedin, github, "order", "isActive"
      FROM "TeamMember"
      WHERE "isActive" = true
      ORDER BY "order" ASC, "createdAt" ASC
    `;

    if (dbMembers && dbMembers.length > 0) {
      members = dbMembers.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        badge: m.badge || null,
        image: m.image,
        twitter: m.twitter || null,
        linkedin: m.linkedin || null,
        github: m.github || null,
        order: Number(m.order) || 0,
        isActive: Boolean(m.isActive ?? (m as any).isactive),
      }));
    }
  } catch (error) {
    console.warn('getTeamConfig members query error:', error);
  }

  return {
    isTeamSectionVisible,
    members,
  };
}

/**
 * Retrieves all team members for admin view (both active & inactive).
 */
export async function getAdminTeamData(): Promise<{
  isTeamSectionVisible: boolean;
  members: TeamMemberData[];
}> {
  let isTeamSectionVisible = true;
  let members: TeamMemberData[] = INITIAL_TEAM_MEMBERS;

  try {
    const configRows = await prisma.$queryRaw<Array<{ isTeamSectionVisible: boolean }>>`
      SELECT "isTeamSectionVisible" FROM "AboutConfig" WHERE id = 'default' LIMIT 1
    `;
    if (configRows && configRows.length > 0) {
      isTeamSectionVisible = Boolean(
        configRows[0].isTeamSectionVisible ?? (configRows[0] as any).isteamsectionvisible
      );
    }
  } catch (e) {
    console.warn('Admin config query error:', e);
  }

  try {
    const dbMembers = await prisma.$queryRaw<TeamMemberData[]>`
      SELECT id, name, role, badge, image, twitter, linkedin, github, "order", "isActive"
      FROM "TeamMember"
      ORDER BY "order" ASC, "createdAt" ASC
    `;

    if (dbMembers && dbMembers.length > 0) {
      members = dbMembers.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        badge: m.badge || null,
        image: m.image,
        twitter: m.twitter || null,
        linkedin: m.linkedin || null,
        github: m.github || null,
        order: Number(m.order) || 0,
        isActive: Boolean(m.isActive ?? (m as any).isactive),
      }));
    }
  } catch (error) {
    console.warn('getAdminTeamData members query error:', error);
  }

  return {
    isTeamSectionVisible,
    members,
  };
}
