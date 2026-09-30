export type InsightCategory = 'all' | 'blueprint' | 'case-study' | 'article' | 'research';

export type InsightBadge =
  | 'SYSTEM BLUEPRINT'
  | 'ARCHITECTURE BREAKDOWN'
  | 'EXPERIMENT'
  | 'BUILD NOTE';

export interface TechCategory {
  id: string;
  label: string;
  description?: string;
}

export const TECH_CATEGORIES: TechCategory[] = [
  { id: 'all', label: 'All Articles' },
  { id: 'ai-agents', label: 'AI & Agents' },
  { id: 'software-engineering', label: 'Software Engineering' },
  { id: 'automation', label: 'Automation' },
  { id: 'web-digital', label: 'Web & Digital' },
  { id: 'data-intelligence', label: 'Data & Intelligence' },
  { id: 'architecture-integration', label: 'Architecture & Integration' },
];

/** @deprecated Use TECH_CATEGORIES instead */
export const INSIGHT_L2_SERVICES = TECH_CATEGORIES;

export interface InsightSpecimen {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: 'blueprint' | 'case-study' | 'article' | 'research';
  badge: InsightBadge;
  disciplineId: string;
  disciplineName: string;
  techCategoryId: string;
  techCategoryLabel: string;
  serviceId?: string;
  serviceName?: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  tags: string[];
  featured?: boolean;
  videoSrc?: string;
  image: string;
  keyTakeaway: string;
  empiricalMetric: {
    label: string;
    value: string;
  };
  architectureEquation?: {
    left: string;
    operator: string;
    right: string;
    outcome: string;
  };
  keySections: string[];
  content?: string;
  youtubeUrl?: string;
}

export const INSIGHT_CATEGORIES = [
  { id: 'all', label: 'All Knowledge', anchor: 'all', count: 8 },
  { id: 'blueprint', label: 'System Blueprints', anchor: 'blueprints', count: 2 },
  { id: 'case-study', label: 'Case Studies', anchor: 'case-studies', count: 2 },
  { id: 'article', label: 'Articles & Blog', anchor: 'articles', count: 2 },
  { id: 'research', label: 'Research & Whitepapers', anchor: 'research', count: 2 },
] as const;

export const INSIGHT_DISCIPLINES = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'ai-intelligent-systems', label: 'AI & Intelligent Systems' },
  { id: 'software-product-engineering', label: 'Software & Product Engineering' },
  { id: 'automation-digital-operations', label: 'Automation & Operations' },
  { id: 'digital-transformation', label: 'Digital Transformation' },
  { id: 'data-business-intelligence', label: 'Data & BI' },
  { id: 'technology-integration', label: 'Technology Integration' },
] as const;

export const INSIGHT_SPECIMENS: InsightSpecimen[] = [];
