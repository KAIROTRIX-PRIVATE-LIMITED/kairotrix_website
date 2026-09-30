import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { findAssistantResponse, AssistantResponse } from '@/data/aiAssistantKnowledge';
import { getActiveWorkSpecimens } from '@/lib/services/workService';

interface ChatRequestBody {
  message: string;
  sessionId?: string;
}

export function cleanChatText(raw: string): string {
  if (!raw) return '';
  return raw
    // Remove RAG or system prompt banner leaks
    .replace(/\[(?:DOCUMENT|VERIFIED)[^\]]*\]/gi, '')
    .replace(/={3,}.*?={3,}/g, '')
    // Remove markdown table header separator lines (|---|---|)
    .replace(/^\s*\|?[-+:| ]{3,}\|?\s*$/gm, '')
    // Convert table lines | Col1 | Col2 | to Col1 — Col2
    .replace(/^\s*\|\s*([^|\n]+)\s*\|\s*([^|\n]+)\s*\|\s*$/gm, '$1 — $2')
    // Remove remaining table pipe symbols
    .replace(/\|/g, ' ')
    // Remove horizontal rules (---, ___, ***)
    .replace(/^\s*[-*_]{3,}\s*$/gm, '')
    // Standardize bullet points (*, -, +, •) to clean bullet symbol
    .replace(/^\s*[*•\-+]\s+/gm, '• ')
    // Remove markdown heading prefixes (###, ##, #)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic markdown stars (**bold**, *italic*, ***both***)
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    // Remove any remaining stray asterisks
    .replace(/\*/g, '')
    // Remove backtick code fences and inline backticks
    .replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, ''))
    .replace(/`+/g, '')
    // Clean markdown links [Text](url) -> Text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    // Clean excessive blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function POST(request: Request) {
  try {
    const body: ChatRequestBody = await request.json();
    const { message, sessionId } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    const cleanMessage = message.trim();
    const effectiveSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    // 1. Check AI Agent Master Switch from Database
    let isAgentEnabled = true;
    let agentConfig: any = null;

    try {
      agentConfig = await prisma.aiAgentConfig.findUnique({
        where: { id: 'default' },
      });
      if (agentConfig && agentConfig.isEnabled === false) {
        isAgentEnabled = false;
      }
    } catch {
      // Fallback: If DB is unreachable, keep default enabled
      isAgentEnabled = true;
    }

    if (!isAgentEnabled) {
      return NextResponse.json({
        reply: {
          text: "KIRO is currently offline for scheduled maintenance. You can reach out directly to our principal engineers via our **Contact** page.",
          actions: [{ label: "Contact Us", href: "/contact", variant: "primary" }],
          suggestedFollowUps: [],
        },
        sessionId: effectiveSessionId,
        paused: true,
      });
    }

    // 2. Generate Reply (Hybrid: Groq Two-Tier Pipeline -> OpenAI -> Deterministic Knowledge Matcher)
    let reply: AssistantResponse;
    const groqApiKey = process.env.GROQ_API_KEY;
    const openAiApiKey = process.env.OPENAI_API_KEY;

    if (groqApiKey && agentConfig?.mode !== 'DETERMINISTIC') {
      try {
        // 1. RAG Retrieval from Company Knowledge Documents
        let ragContext = '';
        try {
          let activeDocs: any[] = [];
          if ((prisma as any).companyDocument) {
            activeDocs = await prisma.companyDocument.findMany({
              where: { isActive: true },
              orderBy: { order: 'asc' },
            });
          } else {
            activeDocs = await prisma.$queryRawUnsafe(
              'SELECT * FROM "CompanyDocument" WHERE "isActive" = true ORDER BY "order" ASC'
            );
          }

          if (activeDocs.length > 0) {
            const queryLower = cleanMessage.toLowerCase();
            const queryTokens = queryLower.split(/\s+/).filter((t) => t.length > 2);

            const scoredDocs = activeDocs.map((doc) => {
              let score = 0;
              const titleLower = doc.title.toLowerCase();
              const contentLower = doc.content.toLowerCase();
              const tagsLower: string[] = (Array.isArray(doc.tags) ? doc.tags : []).map((t: string) =>
                String(t).toLowerCase()
              );

              for (const token of queryTokens) {
                if (titleLower.includes(token)) score += 6;
                if (tagsLower.some((tag: string) => tag.includes(token))) score += 4;
                if (contentLower.includes(token)) score += 1;
              }
              return { doc, score };
            });

            scoredDocs.sort((a, b) => b.score - a.score);

            const relevantDocs = scoredDocs[0].score > 0
              ? scoredDocs.filter((s) => s.score > 0).slice(0, 3).map((s) => s.doc)
              : activeDocs.slice(0, 3);

            ragContext = relevantDocs
              .map((d) => `[DOCUMENT: ${d.title} (${d.category})]\n${d.content}`)
              .join('\n\n---\n\n');
          }
        } catch (ragErr) {
          console.warn('RAG document retrieval skipped:', ragErr);
        }

        const activeProjects = await getActiveWorkSpecimens();
        const projectSummaries = activeProjects
          .slice(0, 5)
          .map((p) => `• ${p.title} (${p.disciplineName}): ${p.invariant}`)
          .join('\n');

function resolveAssistantActions(
  userQuery: string,
  aiText: string
): { label: string; href: string; variant: 'primary' | 'secondary' }[] {
  const combined = (userQuery + ' ' + aiText).toLowerCase();

  // 1. AI Agents & Autonomous Swarms
  if (
    combined.includes('agent') ||
    combined.includes('autonomous') ||
    combined.includes('swarm') ||
    combined.includes('copilot') ||
    combined.includes('voice ai') ||
    combined.includes('ai calling')
  ) {
    return [
      { label: 'Explore AI Agents', href: '/solutions/ai-intelligent-systems#ai-agents', variant: 'primary' },
      { label: 'Discuss Your Project', href: '/contact', variant: 'secondary' },
    ];
  }

  // 2. AI Knowledge Systems & Enterprise RAG
  if (
    combined.includes('rag') ||
    combined.includes('knowledge base') ||
    combined.includes('document intelligence') ||
    combined.includes('vector') ||
    combined.includes('company document') ||
    combined.includes('pdf extraction')
  ) {
    return [
      { label: 'Explore Knowledge Systems & RAG', href: '/solutions/ai-intelligent-systems#knowledge-systems', variant: 'primary' },
      { label: 'Discuss Your Project', href: '/contact', variant: 'secondary' },
    ];
  }

  // 3. AI & Intelligent Systems (General / ML / Fine-Tuning)
  if (
    combined.includes('machine learning') ||
    combined.includes('fine-tuning') ||
    combined.includes('lora') ||
    combined.includes('genai') ||
    combined.includes('artificial intelligence') ||
    combined.includes('ai application')
  ) {
    return [
      { label: 'Explore AI & Intelligent Systems', href: '/solutions/ai-intelligent-systems', variant: 'primary' },
      { label: 'Discuss Your Project', href: '/contact', variant: 'secondary' },
    ];
  }

  // 4. Custom Software & Enterprise Platforms
  if (
    combined.includes('custom software') ||
    combined.includes('internal tool') ||
    combined.includes('microservice') ||
    combined.includes('business system')
  ) {
    return [
      { label: 'Explore Custom Software', href: '/solutions/software-product-engineering#custom-software', variant: 'primary' },
      { label: 'Discuss Your Project', href: '/contact', variant: 'secondary' },
    ];
  }

  // 5. SaaS / Web Application Development / MVP
  if (
    combined.includes('saas') ||
    combined.includes('web app') ||
    combined.includes('mvp') ||
    combined.includes('product engineering') ||
    combined.includes('product development') ||
    combined.includes('portal')
  ) {
    return [
      { label: 'Explore Web & Product Engineering', href: '/solutions/software-product-engineering#web-apps', variant: 'primary' },
      { label: 'Discuss Your Project', href: '/contact', variant: 'secondary' },
    ];
  }

  // 6. Automation & Digital Operations / Workflows / Approvals
  if (
    combined.includes('automat') ||
    combined.includes('workflow') ||
    combined.includes('approval') ||
    combined.includes('manual task') ||
    combined.includes('data entry') ||
    combined.includes('invoice processing')
  ) {
    return [
      { label: 'Explore Automation Solutions', href: '/solutions/automation-digital-operations', variant: 'primary' },
      { label: 'Discuss Your Project', href: '/contact', variant: 'secondary' },
    ];
  }

  // 7. Technology Integration / API / CRM / ERP
  if (
    combined.includes('integrat') ||
    combined.includes('api') ||
    combined.includes('crm') ||
    combined.includes('erp') ||
    combined.includes('hubspot') ||
    combined.includes('salesforce') ||
    combined.includes('synchroniz') ||
    combined.includes('data migration')
  ) {
    return [
      { label: 'Explore Technology Integration', href: '/solutions/technology-integration', variant: 'primary' },
      { label: 'Discuss Your Project', href: '/contact', variant: 'secondary' },
    ];
  }

  // 8. Data & Business Intelligence / Dashboards / Analytics
  if (
    combined.includes('dashboard') ||
    combined.includes('analytics') ||
    combined.includes('business intelligence') ||
    combined.includes('kpi') ||
    combined.includes('warehouse') ||
    combined.includes('clickhouse')
  ) {
    return [
      { label: 'Explore Data & BI Solutions', href: '/solutions/data-business-intelligence', variant: 'primary' },
      { label: 'Discuss Your Project', href: '/contact', variant: 'secondary' },
    ];
  }

  // 9. Digital Transformation / Websites / Modernization / UI/UX
  if (
    combined.includes('website') ||
    combined.includes('redesign') ||
    combined.includes('ui/ux') ||
    combined.includes('moderniz') ||
    combined.includes('digitiz') ||
    combined.includes('cms')
  ) {
    return [
      { label: 'Explore Digital Transformation', href: '/solutions/digital-transformation', variant: 'primary' },
      { label: 'Discuss Your Project', href: '/contact', variant: 'secondary' },
    ];
  }

  // 10. Work / Projects / Case Studies / Examples
  if (
    combined.includes('work') ||
    combined.includes('project') ||
    combined.includes('portfolio') ||
    combined.includes('case stud') ||
    combined.includes('specimen') ||
    combined.includes('what have you built') ||
    combined.includes('example')
  ) {
    return [
      { label: 'View Verified Work Proof', href: '/work', variant: 'primary' },
      { label: 'Explore Solutions', href: '/solutions', variant: 'secondary' },
    ];
  }

  // 11. Insights / Articles / Engineering Concepts
  if (
    combined.includes('insight') ||
    combined.includes('article') ||
    combined.includes('blueprint') ||
    combined.includes('learn') ||
    combined.includes('architecture breakdown')
  ) {
    return [
      { label: 'Read Engineering Insights', href: '/insights', variant: 'primary' },
      { label: 'Explore Solutions', href: '/solutions', variant: 'secondary' },
    ];
  }

  // 12. About KAIROTRIX / Company
  if (
    combined.includes('who is kairotrix') ||
    combined.includes('about kairotrix') ||
    combined.includes('team') ||
    combined.includes('philosophy') ||
    combined.includes('who are you')
  ) {
    return [
      { label: 'About KAIROTRIX', href: '/about', variant: 'primary' },
      { label: 'Explore Solutions', href: '/solutions', variant: 'secondary' },
    ];
  }

  // 13. Consultation / Contact / Quote / Starting a Project
  if (
    combined.includes('contact') ||
    combined.includes('quote') ||
    combined.includes('pricing') ||
    combined.includes('start a project') ||
    combined.includes('hire') ||
    combined.includes('consult')
  ) {
    return [
      { label: 'Discuss Your Project', href: '/contact', variant: 'primary' },
      { label: 'Explore Solutions', href: '/solutions', variant: 'secondary' },
    ];
  }

  // Default
  return [
    { label: 'Explore Solutions', href: '/solutions', variant: 'primary' },
    { label: 'Discuss Your Project', href: '/contact', variant: 'secondary' },
  ];
}

        const systemPrompt =
          agentConfig?.systemPrompt ||
          `You are KIRO, technical representative and systems navigator for KAIROTRIX.
Company Tagline: "Built to evolve. Made to solve."
Philosophy: Problem-first engineering. We identify business bottlenecks first, then select AI, custom software, workflow automation, or data integration.

Core Disciplines:
AI & Intelligent Systems (/solutions/ai-intelligent-systems)
  • AI Application Development (#ai-apps)
  • AI Agent Development (#ai-agents)
  • AI / ML Development & Fine-Tuning (#genai-ml)
  • AI Knowledge Systems & Enterprise RAG (#knowledge-systems)
Software & Product Engineering (/solutions/software-product-engineering)
  • Custom Software Development (#custom-software)
  • Web Application Development (#web-apps)
  • Product Development & Engineering (#product-dev)
  • Product Design & Design Systems (#product-design)
Automation & Digital Operations (/solutions/automation-digital-operations)
  • Business Process Automation (#process-automation)
  • Workflow & Task Orchestration (#workflows)
  • Document & Approval Automation (#document-automation)
  • Autonomous Digital Operations (#digital-ops)
Digital Transformation (/solutions/digital-transformation)
  • Website Development & Web Craft (#website-development)
  • Process Digitization & Modernization (#process-digitization)
  • UI/UX Research & Interface Design (#ui-ux-design)
  • Headless CMS & Web Modernization (#cms-modernization)
Data & Business Intelligence (/solutions/data-business-intelligence)
  • Business Data Analytics & Warehousing (#analytics)
  • Executive & KPI Dashboards (#dashboards)
  • Predictive Modeling & Forecasting (#predictive)
  • Natural-Language Data Queries (#nl-queries)
Technology Integration (/solutions/technology-integration)
  • API & System Integration (#api-integration)
  • CRM & ERP Synchronization (#crm-erp)
  • Payment & Billing Gateways (#payments)
  • Cross-System Data Synchronization (#data-sync)

Additional Destinations:
• Work & Projects Proof: /work
• Engineering Insights: /insights
• Company Overview & Philosophy: /about
• Consultation & Inquiries: /contact

Key Invariants: 100% Client-Owned IP, Direct Principal Engineers, Zero Vanity Metrics, Sub-Second Production Performance.

${ragContext ? `=== VERIFIED COMPANY KNOWLEDGE BASE (RAG) ===\n${ragContext}\n==============================================` : ''}

Active Production Specimens:
${projectSummaries}

Routing & Navigation Guidelines:
- Understand visitor intent first: USER INTENT → RELEVANT CONTENT → BEST DESTINATION.
- Never dump the entire navigation tree. Recommend at most ONE primary destination and ONE optional secondary destination.
- Use ONLY verified URLs and section hashes above (e.g. /solutions/ai-intelligent-systems#ai-agents). NEVER invent slugs.
- Use "Solutions", never "Capability".
- Never output internal numbers or taxonomy codes (such as 01.1, 1.1, 06.1). Always refer to solutions and services by their plain professional names.
- Do not force the contact page prematurely when visitors are just exploring or asking technical questions.
- Grounded, concise, technical, and confident. Never use generic corporate AI buzzwords.

Output & Presentation Guidelines:
- Output ONLY clean, natural plain text with paragraphs and simple bullet points (•).
- Do NOT use markdown tables, ascii boxes, or vertical pipes (|).
- Do NOT use horizontal divider lines (--- or ___).
- Do NOT use raw markdown headers (### or ##).
- Do NOT clutter text with asterisks (**) or decorative stars.`;

        // Select single stable Groq model (verified active: openai/gpt-oss-20b)
        const primaryModel =
          process.env.GROQ_MODEL ||
          (agentConfig?.model &&
          !agentConfig.model.includes('llama') &&
          !agentConfig.model.includes('prompt-guard')
            ? agentConfig.model
            : 'openai/gpt-oss-20b');

        // Direct single call to Groq
        let responseText = '';
        let groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: primaryModel,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: cleanMessage },
            ],
            temperature: agentConfig?.temperature ?? 0.3,
            max_tokens: 600,
          }),
        });

        // If primary model returned error, retry with qwen/qwen3.8-27b
        if (!groqRes.ok && primaryModel !== 'qwen/qwen3.8-27b') {
          console.warn(`Groq model ${primaryModel} returned status ${groqRes.status}. Retrying with qwen/qwen3.8-27b...`);
          groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${groqApiKey}`,
            },
            body: JSON.stringify({
              model: 'qwen/qwen3.8-27b',
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: cleanMessage },
              ],
              temperature: agentConfig?.temperature ?? 0.3,
              max_tokens: 600,
            }),
          });
        }

        if (groqRes.ok) {
          const aiData = await groqRes.json();
          const rawText = aiData.choices?.[0]?.message?.content?.trim() || '';
          responseText = cleanChatText(rawText);
          reply = {
            text: responseText || findAssistantResponse(cleanMessage).text,
            actions: resolveAssistantActions(cleanMessage, responseText),
            suggestedFollowUps: [
              'What solutions does KAIROTRIX build?',
              'How does your engagement process work?',
              'Speak with an engineer',
            ],
          };
        } else {
          const errData = await groqRes.text();
          console.warn('Groq API error response:', groqRes.status, errData);
          reply = findAssistantResponse(cleanMessage);
        }
      } catch (groqErr) {
        console.warn('Groq API network error, falling back smoothly:', groqErr);
        reply = findAssistantResponse(cleanMessage);
      }
    } else if (openAiApiKey && agentConfig?.mode !== 'DETERMINISTIC') {
      try {
        // Fallback OpenAI LLM path
        const activeProjects = await getActiveWorkSpecimens();
        const projectSummaries = activeProjects
          .slice(0, 5)
          .map((p) => `• ${p.title} (${p.disciplineName}): ${p.invariant}`)
          .join('\n');

        const systemPrompt =
          agentConfig?.systemPrompt ||
          `You are KIRO, technical guide for KAIROTRIX.
Company Tagline: "Built to evolve. Made to solve."
Core Offerings: AI & Intelligent Systems, Custom Software & Product Engineering, Automation & Operations, Digital Transformation, Data & BI, Technology Integration.
Key Invariants: 100% Client-Owned IP, Direct Principal Engineers, Zero-Hallucination Guardrails.

Active Representative Builds:
${projectSummaries}

Guidelines:
- Grounded, concise, technical, and direct. No generic AI buzzwords.
- If asked how to initiate a project, direct them to /contact.`;

        const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiApiKey}`,
          },
          body: JSON.stringify({
            model: agentConfig?.model || 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: cleanMessage },
            ],
            temperature: agentConfig?.temperature ?? 0.3,
            max_tokens: 400,
          }),
        });

        if (openAiRes.ok) {
          const aiData = await openAiRes.json();
          const responseText = aiData.choices?.[0]?.message?.content?.trim();
          reply = {
            text: responseText || findAssistantResponse(cleanMessage).text,
            actions: [
              { label: 'Discuss Your Project', href: '/contact', variant: 'primary' },
              { label: 'Explore Solutions', href: '/solutions', variant: 'secondary' },
            ],
            suggestedFollowUps: [
              'What solutions does KAIROTRIX build?',
              'How does your engagement process work?',
              'Speak with an engineer',
            ],
          };
        } else {
          reply = findAssistantResponse(cleanMessage);
        }
      } catch (llmErr) {
        console.warn('LLM call failed, smoothly falling back to deterministic knowledge:', llmErr);
        reply = findAssistantResponse(cleanMessage);
      }
    } else {
      // Deterministic Knowledge Matcher
      reply = findAssistantResponse(cleanMessage);
    }

    // 3. PostgreSQL Conversation & Lead Capture Logging (Background Safe)
    try {
      // Detect Email in message for automatic Lead Capture
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
      const emailMatch = cleanMessage.match(emailRegex);
      const detectedEmail = emailMatch ? emailMatch[0] : null;

      const conversation = await prisma.conversation.upsert({
        where: { sessionId: effectiveSessionId },
        update: {
          updatedAt: new Date(),
          ...(detectedEmail && {
            leadEmail: detectedEmail,
            status: 'QUALIFIED_LEAD',
          }),
        },
        create: {
          sessionId: effectiveSessionId,
          status: detectedEmail ? 'QUALIFIED_LEAD' : 'ACTIVE',
          leadEmail: detectedEmail,
          requirementSummary: cleanMessage.slice(0, 500),
        },
      });

      // Save User Message
      await prisma.chatMessage.create({
        data: {
          conversationId: conversation.id,
          sender: 'user',
          text: cleanMessage,
        },
      });

      // Save KIRO Reply
      await prisma.chatMessage.create({
        data: {
          conversationId: conversation.id,
          sender: 'kiro',
          text: reply.text,
          actions: reply.actions ? (reply.actions as any) : undefined,
        },
      });

      // If an email was detected, also create a ContactInquiry lead record
      if (detectedEmail) {
        await prisma.contactInquiry.create({
          data: {
            name: 'KIRO Chat Visitor',
            email: detectedEmail,
            interest: 'Inquiry via AI Assistant',
            message: `Lead qualified by KIRO in session ${effectiveSessionId}. User inquiry: "${cleanMessage}"`,
            status: 'NEW',
          },
        });
      }
    } catch (dbErr) {
      console.warn('Could not record chat to PostgreSQL (DB might be offline):', dbErr);
    }

    return NextResponse.json({
      reply,
      sessionId: effectiveSessionId,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Chat API Error:', err);
    return NextResponse.json(
      { error: err?.message || 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
