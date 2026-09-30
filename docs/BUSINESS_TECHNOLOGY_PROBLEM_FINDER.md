# KAIROTRIX Business Technology Problem Finder — Product & Architecture Specification

> **Feature Name:** Problem Finder / "Find the Right Solution"  
> **Status:** Specification Approved — Architecture & Implementation Phase  
> **System Class:** Specialized Business Technology Diagnostic Engine (Not KIRO)  
> **Target Placement:** `/solutions#find-solution` and standalone problem discovery flows  

---

## 1. Executive Summary & Core Product Concept

The **Problem Finder** is a specialized diagnostic system designed to understand a business operational bottleneck, identify the underlying root cause, propose an objective technical solution direction, and map that direction directly to KAIROTRIX’s service capabilities.

### Public Positioning
- **Section Heading:** `FIND THE RIGHT SOLUTION FOR YOUR PROBLEM.`
- **Eyebrow:** `03 // PROBLEM MATCHING`
- **Lead Narrative:**
  > *"Describe what is not working in your business. We’ll identify the underlying problem, explain how it could be solved, and show where KAIROTRIX can help."*

### Key Psychological Distinction
The feature is **not an "AI chatbot" or marketing gimmick**. The intelligence is invisible. The user experience feels like a **short, focused technical consultation with a Principal Systems Architect**.

---

## 2. KIRO vs. Problem Finder Distinction

| Dimension | KIRO (Website Representative) | Problem Finder (Specialized Diagnostic Engine) |
|---|---|---|
| **Role** | General website assistant & navigator | Specialized diagnostic system |
| **Interaction Model** | Open-ended conversational chat | Structured, progressive problem investigation |
| **Primary Goal** | Answers questions, guides through site | Diagnoses underlying operational bottlenecks |
| **Scope** | Broad company knowledge, FAQs, pages | Deep business process & technology diagnosis |
| **Tone** | Helpful, welcoming digital guide | Analytical, objective, serious, consultative |
| **Output Style** | Plain conversational text & quick links | Structured 3-layer diagnostic blueprint |
| **Context Flow** | Real-time streaming chat messages | Controlled multi-stage analytical state machine |

> **Crucial Difference in Reasoning:**  
> While KIRO can explain *"KAIROTRIX provides workflow automation"*, the Problem Finder reasons:  
> *"Your staff are copying order information from email into the ERP and then entering it again into the warehouse system. The main issue is not simply 'manual work'; it is fragmented data flow between operational systems. A better direction would be system integration combined with event-driven workflow automation."*

---

## 3. The Core Seven-Stage Operating Order

The engine strictly follows this analytical progression:

```text
1. UNDERSTAND
      ↓
2. INVESTIGATE (Dynamic Questioning if evidence is incomplete)
      ↓
3. DIAGNOSE (Distinguish symptom from underlying operational & technical cause)
      ↓
4. DESIGN A DIRECTION (Independent technical architecture proposal)
      ↓
5. VALIDATE (Deterministic guardrails against hallucinated services)
      ↓
6. MATCH KAIROTRIX (Map to official L1 & L2 practice capabilities)
      ↓
7. DISCUSS (Handover structured diagnostic packet to consultation booking)
```

The system **never** jumps from a symptom straight to a sales pitch. It diagnoses objectively first, proves understanding, and only then introduces KAIROTRIX services.

---

## 4. User Experience & Interface Architecture

### 4.1 Focused Analytical Workspace (No Chat Bubbles, No Wizards)
The UI is a single, clean, focused investigation surface:
- **No chat bubbles or avatars**
- **No sidebars, quizzes, or 15-question forms**
- **No rainbow gradients or futuristic AI orbs**
- **Restrained light-theme visual language:**
  - Canvas: `#FAFAFC`
  - Elevated Cards: `#FFFFFF` with thin hairline borders (`border-neutral-200/80`) and subtle shadows
  - KAIROTRIX Violet (`#9333EA`): Reserved strictly for active states, selected options, progress indicators, and primary CTAs

### 4.2 Progressive Investigation Sequence

#### Phase 1: Problem Intake
A generous, spacious input field where visitors describe their challenge in their own words:
```text
┌───────────────────────────────────────────────────────────┐
│              FIND THE RIGHT SOLUTION                      │
│                                                           │
│  Tell us what isn't working in your business.             │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Describe the problem in your own words...           │  │
│  │                                                     │  │
│  └─────────────────────────────────────────────────────┘  │
│  You don't need to know the technical terms.              │
│                                                           │
│                 [ Start Analysis → ]                      │
└───────────────────────────────────────────────────────────┘
```

#### Phase 2: Dynamic Questioning (Not a Fixed Questionnaire)
If the completeness evaluator determines key operational signals are missing, the system asks **1 to 2 targeted, contextual multiple-choice questions** (maximum 3 in complex cases, 0 for clear inputs):
- *Example:* *"Where does the process usually create the most difficulty?"*
  - ○ Information gets entered multiple times
  - ○ Orders are sometimes missed
  - ○ Inventory becomes inaccurate
  - ○ The whole process is too slow
  - ○ Something else
- *Example Follow-up:* *"Does your existing inventory software provide an API or export option?"*
  - ○ Yes
  - ○ No
  - ○ Not sure

#### Phase 3: Analytical Progress States
Instead of a generic *"AI is thinking..."* spinner, the engine displays meaningful state progression:
```text
UNDERSTANDING YOUR WORKFLOW
        ↓
IDENTIFYING THE BOTTLENECK
        ↓
EVALUATING POSSIBLE APPROACHES
        ↓
MATCHING THE RIGHT DIRECTION
```

---

## 5. Three-Layer Diagnostic Result Architecture

### Layer 01 — What We Found (Problem Diagnosis)
Distinguishes the **observed symptom** from the **underlying operational bottleneck** and **technical root cause**:
- **Diagnosis Headline:** e.g. *Fragmented Multi-Channel Order Processing*
- **Symptom vs. Root Cause Breakdown:**
  - *Observed Symptom:* Orders arrive across email and WhatsApp; staff manually retype them into Excel and ERP.
  - *Operational Bottleneck:* Order intake lacks a unified queue, causing staff to spend hours on duplicate data entry and reconciliation.
  - *Likely Technical Condition:* Isolated system silos without automated webhook or API synchronization.

### Layer 02 — How This Could Be Solved (Solution Direction)
An objective, technology-agnostic engineering direction with **zero corporate sales fluff**:
- **Recommended Direction:** e.g. *Unified Event-Driven Intake Pipeline with Automated System Sync*
- **How It Operates:** Orders enter a single validated ingestion queue, update operational records automatically, and alert staff only when an exception occurs.
- **Dynamic Visual Architecture Flow:** A lightweight, generated flow diagram:
  ```text
  WhatsApp / Email Intake
            ↓
    Validation Layer
            ↓
     Order System
            ↓
        Inventory
            ↓
  Exceptions → Staff Review
  ```
- **"Why This Direction?" (Expandable Rationale):**
  - Clarifies why this specific approach fits (e.g., decisions are predictable, data already exists digitally, human attention is better saved for exceptions).
- **"What We Wouldn't Start With" (Objective Guardrail):**
  - Explicitly advises against unnecessary complexity:
    *e.g., "We wouldn't start with autonomous AI agents here. A deterministic API integration and event queue is simpler, faster, and 100% predictable."*

### Layer 03 — Relevant KAIROTRIX Solution
Only after establishing trust and the technical blueprint does the system match KAIROTRIX capabilities:
- **Primary Discipline:** e.g. `03 // Automation & Digital Operations`
- **Matched L2 Practice Capabilities:**
  - `03.1 Business Process Automation`
  - `03.2 Workflow & Task Orchestration`
- **Secondary Discipline (if applicable):**
  - `06 // Technology Integration` (`06.1 API & System Integration`)
- **Primary Conversion CTA:** `[ Book a Technical Discussion → ]`
- **Secondary Action:** `Start Over` / `Refine Problem`

---

## 6. Diagnosis Context Handover to Appointment Flow

When a user clicks **"Book a Technical Discussion"**, they must **never** be forced to re-type or re-explain their problem.

The diagnostic payload is passed directly into the booking/contact state (`/contact?source=problem-finder&session=...`):
```json
{
  "problemSummary": "Manual multi-channel order processing",
  "rootBottleneck": "Disconnected operational tools and duplicate data entry",
  "recommendedDirection": "Unified order workflow + system integration",
  "matchedDisciplines": ["automation-digital-operations", "technology-integration"],
  "matchedServices": ["03.1 Business Process Automation", "06.1 API & System Integration"],
  "userInput": "..."
}
```

The contact page dynamically displays:
> *"Your diagnostic summary has been attached to this consultation request so you don't have to explain everything again."*

---

## 7. System Architecture & Multi-Stage Reasoning Pipeline

```text
                       VISITOR
                          │
                          ▼
                  Problem Finder UI
                          │
                          ▼
                Input Normalization
                          │
                          ▼
             Problem Understanding Engine
                          │
                          ▼
                 Completeness Check
                    │          │
               incomplete   sufficient
                    │          │
                    ▼          ▼
            Clarifying      Diagnosis
             Question        Engine
                               │
                               ▼
                       Solution Reasoner
                               │
                               ▼
                        Service Matcher
                               │
                               ▼
                       Validation Layer
                               │
                               ▼
                          Final Result
```

### Stage 1: Input Normalization
Transforms messy unstructured visitor text into an internal schema:
- `business_process`: (e.g. order fulfillment, lead capture, invoicing)
- `channels`: (e.g. WhatsApp, Email, Sheets)
- `current_tools`: (e.g. Excel, SAP, QuickBooks)
- `manual_steps`: (e.g. copy-pasting, approval chasing)
- `symptoms`: (e.g. errors, delays, missed items)

### Stage 2: Completeness Evaluator
Scores whether sufficient information exists to formulate a responsible diagnosis. If key variables are missing, generates **one single, high-utility multiple-choice question**.

### Stage 3: Problem Diagnosis Engine
Analyzes root causes and operational friction without premature vendor bias. Distinguishes symptoms from structural flaws.

### Stage 4: Solution Reasoner (Vendor-Agnostic)
Synthesizes the optimal systems engineering pattern (event-driven queue, hybrid RAG, API synchronization, custom internal portal) before referencing any KAIROTRIX services.

### Stage 5: Service Matcher (Controlled Taxonomy)
Maps the architectural requirements strictly to the official KAIROTRIX catalog:
- 6 L1 Capability Domains
- 24 L2 Practice Capabilities
- Prohibits hallucinated services or arbitrary naming.

### Stage 6: Validation Layer
Validates outputs programmatically before rendering:
1. Do recommended slugs and service keys exist in the official taxonomy?
2. Is the solution grounded in the visitor's actual statements?
3. Did the engine unnecessarily introduce AI when deterministic software is better?
4. Are assumptions framed with appropriate epistemic modesty (*"Likely issue"* instead of guessing as fact)?

---

## 8. Knowledge Base Architecture

The system utilizes three decoupled knowledge stores:

1. **Business Problem Knowledge (`src/data/problem-finder/problemPatterns.ts`):**
   - Common operational bottlenecks across Sales, Support, Finance, Logistics, and Document workflows.
   - Known failure modes (duplicate entry, sync lag, document sprawl).
2. **Technical Architecture Patterns (`src/data/problem-finder/techPatterns.ts`):**
   - Proven software & systems patterns (Event Bus, Ingestion Queue, OCR Validator, Vector Retrieval, Bi-directional Sync).
   - Guidelines on when to use AI vs. when to use deterministic code.
3. **Official KAIROTRIX Service Taxonomy (`src/data/solutionsData.ts`):**
   - Locked 6 L1 domains and 24 L2 services with deliverables, signals, and anti-patterns.

---

## 9. Epistemic Guardrails & Out-of-Scope Classification

### Scope Classifier
Lightweight evaluation intercepting non-business inputs:
- If a visitor asks general trivia, coding requests, or casual conversation:
  > *"This system is designed specifically to diagnose business and technology bottlenecks. Describe an operational challenge your business is experiencing, and we’ll formulate a suitable technical direction."*

### Language Discipline
- **Weak evidence:** *"Possible operational cause"*
- **Strong evidence:** *"Likely underlying bottleneck"*
- **Never claim:** *"This will guarantee 300% profit"* or fabricate definitive metrics.

---

## 10. Implementation Plan & Milestones

| Phase | Milestone | Deliverables |
|---|---|---|
| **Phase 1** | **Data Models & Knowledge Foundations** | Create `src/data/problem-finder/` containing problem patterns, technical patterns, and structured evaluation rubrics. |
| **Phase 2** | **Backend Diagnostic Pipeline API** | Build `/api/problem-finder/session`, `/api/problem-finder/investigate`, and `/api/problem-finder/diagnose` supporting normalization, completeness scoring, dynamic questioning, and strict JSON output. |
| **Phase 3** | **Validation & Service Matching Layer** | Implement programmatic validation against official 24 L2 services in `solutionsData.ts`. |
| **Phase 4** | **Frontend Analytical Workspace UI** | Build the clean single-workspace component at `src/components/solutions/SolutionsProblemFinder.tsx` with light theme, dynamic questions, architecture visual flow, and 3-layer card layout. |
| **Phase 5** | **Consultation & Booking Handoff** | Wire diagnostic payload handover into `/contact` and test end-to-end user journeys. |
| **Phase 6** | **Review, Testing & Integration** | Integrate into `src/app/solutions/page.tsx`, verify with test cases, and update `docs/BUILD_PROGRESS.md`. |
