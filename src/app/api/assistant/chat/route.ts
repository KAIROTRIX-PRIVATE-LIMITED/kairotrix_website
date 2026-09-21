import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { findAssistantResponse, AssistantResponse } from '@/data/aiAssistantKnowledge';
import { getActiveWorkSpecimens } from '@/lib/services/workService';

interface ChatRequestBody {
  message: string;
  sessionId?: string;
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

    // 2. Generate Reply (Hybrid: LLM if OPENAI_API_KEY is present, else Deterministic Knowledge Matcher)
    let reply: AssistantResponse;
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && agentConfig?.mode !== 'DETERMINISTIC') {
      try {
        // Build dynamic grounding from live active projects
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
            Authorization: `Bearer ${apiKey}`,
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
