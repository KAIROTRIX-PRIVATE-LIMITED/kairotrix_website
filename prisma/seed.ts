import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { WORK_SPECIMENS } from '../src/data/workData';
import { INSIGHT_SPECIMENS } from '../src/data/insightsData';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting KAIROTRIX PostgreSQL Database Seeding...');

  // 1. Seed Default Admin User
  const adminEmail = 'admin@kairotrix.com';
  const defaultPassword = 'KairotrixAdmin2026!';
  const passwordHash = bcrypt.hashSync(defaultPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      name: 'KAIROTRIX Principal Architect',
      passwordHash,
      role: 'ADMIN',
    },
    create: {
      email: adminEmail,
      name: 'KAIROTRIX Principal Architect',
      passwordHash,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin user verified: ${admin.email}`);

  // 2. Seed Work Specimens (Projects, Demos, Experiments)
  console.log(`📦 Seeding ${WORK_SPECIMENS.length} Work Specimens...`);
  for (let i = 0; i < WORK_SPECIMENS.length; i++) {
    const s = WORK_SPECIMENS[i];
    await prisma.project.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        headline: s.headline,
        badge: s.badge,
        type: s.type,
        disciplineId: s.disciplineId,
        disciplineName: s.disciplineName,
        summary: s.summary,
        invariant: s.invariant,
        metric: s.metric,
        metricLabel: s.metricLabel,
        techStack: s.techStack || [],
        video: s.video || null,
        image: s.image,
        featured: Boolean(s.featured),
        year: s.year,
        client: s.client,
        systemEquation: s.systemEquation ? (s.systemEquation as any) : undefined,
        keyDeliverables: s.keyDeliverables || [],
        status: 'ACTIVE',
        order: i,
      },
      create: {
        id: s.id,
        slug: s.slug,
        title: s.title,
        headline: s.headline,
        badge: s.badge,
        type: s.type,
        disciplineId: s.disciplineId,
        disciplineName: s.disciplineName,
        summary: s.summary,
        invariant: s.invariant,
        metric: s.metric,
        metricLabel: s.metricLabel,
        techStack: s.techStack || [],
        video: s.video || null,
        image: s.image,
        featured: Boolean(s.featured),
        year: s.year,
        client: s.client,
        systemEquation: s.systemEquation ? (s.systemEquation as any) : undefined,
        keyDeliverables: s.keyDeliverables || [],
        status: 'ACTIVE',
        order: i,
      },
    });
  }
  console.log(`✅ Successfully seeded ${WORK_SPECIMENS.length} Projects into PostgreSQL database.`);

  // 3. Seed Insight Specimens (Blueprints, Case Studies, Articles, Research)
  console.log(`📖 Seeding ${INSIGHT_SPECIMENS.length} Knowledge Specimens...`);
  for (let i = 0; i < INSIGHT_SPECIMENS.length; i++) {
    const s = INSIGHT_SPECIMENS[i];
    await prisma.insight.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        subtitle: s.subtitle,
        excerpt: s.excerpt,
        category: s.category,
        badge: s.badge,
        disciplineId: s.disciplineId,
        disciplineName: s.disciplineName,
        date: s.date,
        readTime: s.readTime,
        author: s.author,
        authorRole: s.authorRole,
        tags: s.tags || [],
        featured: Boolean(s.featured),
        videoSrc: s.videoSrc || null,
        image: s.image,
        keyTakeaway: s.keyTakeaway,
        empiricalMetricLabel: s.empiricalMetric?.label || null,
        empiricalMetricValue: s.empiricalMetric?.value || null,
        architectureEquation: s.architectureEquation ? (s.architectureEquation as any) : undefined,
        keySections: s.keySections || [],
        status: 'PUBLISHED',
        order: i,
      },
      create: {
        id: s.id,
        slug: s.slug,
        title: s.title,
        subtitle: s.subtitle,
        excerpt: s.excerpt,
        category: s.category,
        badge: s.badge,
        disciplineId: s.disciplineId,
        disciplineName: s.disciplineName,
        date: s.date,
        readTime: s.readTime,
        author: s.author,
        authorRole: s.authorRole,
        tags: s.tags || [],
        featured: Boolean(s.featured),
        videoSrc: s.videoSrc || null,
        image: s.image,
        keyTakeaway: s.keyTakeaway,
        empiricalMetricLabel: s.empiricalMetric?.label || null,
        empiricalMetricValue: s.empiricalMetric?.value || null,
        architectureEquation: s.architectureEquation ? (s.architectureEquation as any) : undefined,
        keySections: s.keySections || [],
        status: 'PUBLISHED',
        order: i,
      },
    });
  }
  console.log(`✅ Successfully seeded ${INSIGHT_SPECIMENS.length} Insights into PostgreSQL database.`);

  // 4. Seed Default AI Agent (KIRO) Configuration
  console.log('🤖 Seeding Default AI Agent Configuration...');
  await prisma.aiAgentConfig.upsert({
    where: { id: 'default' },
    update: {
      isEnabled: true,
      mode: 'HYBRID',
      model: 'gpt-4o-mini',
      temperature: 0.3,
    },
    create: {
      id: 'default',
      isEnabled: true,
      mode: 'HYBRID',
      model: 'gpt-4o-mini',
      temperature: 0.3,
      systemPrompt: `You are KIRO, the digital representative and technical guide for KAIROTRIX.
KAIROTRIX is an AI technology and software solutions company that identifies the customer's real problem first, then selects AI, custom software, workflow automation, data systems, or technology integration as the answer.
Tagline: "Built to evolve. Made to solve."

Core commitments:
1. 100% Client-Owned IP — no vendor lock-in.
2. Direct Principal Engineers — no junior agency bureaucracy.
3. Production Reliability — high throughput, verified telemetry, deterministic guardrails.
4. Problem-First — never push hype when simple software or automation solves the bottleneck better.

Tone and style:
- Grounded, confident, technical, and direct.
- Never use generic marketing buzzwords ("cutting-edge", "revolutionary", "game-changing").
- Provide concise, practical answers.
- When the visitor describes a business bottleneck, recommend the appropriate KAIROTRIX solution area and encourage them to connect with our principal architects at /contact.`,
    },
  });
  console.log('✅ Default AI Agent configuration primed.');

  // 5. Prime About Section Config (Team section hidden until real members are added via Admin)
  console.log('⚙️ Initializing About Section Config...');
  await (prisma as any).aboutConfig.upsert({
    where: { id: 'default' },
    update: { isTeamSectionVisible: false },
    create: { id: 'default', isTeamSectionVisible: false },
  });
  console.log('✅ About section config primed (team section hidden by default).');

  console.log('✨ All seeding completed successfully! Database is primed and operational.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
