-- Migration: Update video paths and image paths to plain English
-- Description: Replaces cryptic stock video filenames with clean, human-readable plain English asset names

-- 1. Update Project table videos
UPDATE "Project"
SET "video" = '/assets/videos/ai-assistant.mp4'
WHERE "slug" IN ('autonomous-operations-agent', 'declarative-agent-orchestrator');

UPDATE "Project"
SET "video" = '/assets/videos/smart-search.mp4'
WHERE "slug" = 'enterprise-semantic-rag';

UPDATE "Project"
SET "video" = '/assets/videos/live-dashboard.mp4'
WHERE "slug" IN ('fintech-trading-portal', 'real-time-telemetry-portal');

UPDATE "Project"
SET "video" = '/assets/videos/automated-workflows.mp4'
WHERE "slug" = 'event-driven-workflow-bridge';

UPDATE "Project"
SET "video" = '/assets/videos/invoice-scanner.mp4'
WHERE "slug" IN ('intelligent-document-triage', 'heterogeneous-api-gateway');

UPDATE "Project"
SET "video" = '/assets/videos/banking-software.mp4'
WHERE "slug" = 'headless-enterprise-experience';

UPDATE "Project"
SET "video" = '/assets/videos/online-store.mp4'
WHERE "slug" IN ('distributed-telemetry-bi-warehouse', 'realtime-predictive-ml-surveillance');

UPDATE "Project"
SET "video" = '/assets/videos/data-sync.mp4'
WHERE "slug" = 'zero-trust-cloud-microservices';

-- 2. Update Insight table videos and correct image paths
UPDATE "Insight"
SET "videoSrc" = '/assets/videos/smart-search.mp4', "image" = '/assets/images/service/SERVICE01.png'
WHERE "slug" = 'deterministic-ai-agents';

UPDATE "Insight"
SET "videoSrc" = '/assets/videos/automated-workflows.mp4', "image" = '/assets/images/service/SERVICE03.png'
WHERE "slug" = 'declarative-automation-bridge';

UPDATE "Insight"
SET "videoSrc" = '/assets/videos/live-dashboard.mp4', "image" = '/assets/images/service/SERVICE04.png'
WHERE "slug" = 'legacy-spreadsheets-to-event-bridge';

UPDATE "Insight"
SET "videoSrc" = '/assets/videos/invoice-scanner.mp4', "image" = '/assets/images/service/SERVICE06.png'
WHERE "slug" = 'document-automation-human-in-loop';

UPDATE "Insight"
SET "videoSrc" = '/assets/videos/banking-software.mp4', "image" = '/assets/images/service/SERVICE02.png'
WHERE "slug" = 'sub-50ms-telemetry-nextjs';

UPDATE "Insight"
SET "videoSrc" = '/assets/videos/ai-assistant.mp4', "image" = '/assets/images/service/SERVICE02.png'
WHERE "slug" = 'problem-first-vs-saas-sprawl';

UPDATE "Insight"
SET "videoSrc" = '/assets/videos/data-sync.mp4', "image" = '/assets/images/service/SERVICE05.png'
WHERE "slug" = 'rag-vector-vs-hybrid-benchmarks';

UPDATE "Insight"
SET "videoSrc" = '/assets/videos/online-store.mp4', "image" = '/assets/images/service/SERVICE01.png'
WHERE "slug" = 'llm-context-caching-benchmarks';
