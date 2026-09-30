export type WorkType = 'all' | 'project' | 'experiment' | 'demo' | 'capability';

export type WorkBadge = 'CLIENT PROJECT' | 'KAIROTRIX BUILD' | 'EXPERIMENT' | 'TECHNICAL DEMO' | 'CAPABILITY';

export interface WorkSpecimen {
  id: string;
  slug: string;
  title: string;
  headline: string;
  badge: WorkBadge;
  type: 'project' | 'experiment' | 'demo' | 'capability';
  disciplineId: string;
  disciplineName: string;
  summary: string;
  invariant: string;
  metric: string;
  metricLabel: string;
  techStack: string[];
  video?: string;
  image: string;
  featured?: boolean;
  year: string;
  client: string;
  systemEquation?: {
    left: string;
    operator: string;
    right: string;
    outcome: string;
  };
  keyDeliverables: string[];
}

export const WORK_DISCIPLINES = [
  { id: 'all', label: 'All Work' },
  { id: 'ai-intelligent-systems', label: 'AI & Intelligent Systems' },
  { id: 'software-product-engineering', label: 'Software & Product Engineering' },
  { id: 'automation-digital-operations', label: 'Automation & Operations' },
  { id: 'digital-transformation', label: 'Digital Transformation' },
  { id: 'data-business-intelligence', label: 'Data & BI' },
  { id: 'technology-integration', label: 'Technology Integration' },
] as const;

export const WORK_TYPES = [
  { id: 'all', label: 'All Specimens', count: 12 },
  { id: 'project', label: 'Projects', count: 4 },
  { id: 'experiment', label: 'Experiments', count: 2 },
  { id: 'demo', label: 'Technical Demos', count: 3 },
  { id: 'capability', label: 'Capabilities & Tech', count: 3 },
] as const;

export const WORK_TECH_FILTERS = [
  'All Technologies',
  'Next.js 15',
  'Python',
  'FastAPI',
  'WebSockets',
  'Vector RAG',
  'Redis',
  'Go',
  'ClickHouse',
  'Docker',
] as const;

export const WORK_SPECIMENS: WorkSpecimen[] = [];
