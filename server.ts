import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. AI Coaching Diagnostic Endpoint
app.post('/api/gemini/diagnose', async (req, res) => {
  try {
    const { role, organization, aiExperience, primaryGoal, currentBlocker, preferredPace } = req.body;

    if (!ai) {
      return res.json({
        recommendedServiceId: 'exec-ai-strategy',
        executiveSummary: `Based on your role (${role || 'Leader'}) and current challenge with ${currentBlocker || 'AI implementation'}, an executive advisory cadence focusing on high-leverage workflows and governance will unlock immediate momentum.`,
        suggestedServiceTitle: 'Executive AI Transformation Coaching',
        immediateWins: [
          'Audit current repetitive team workflows for 30-50% time savings',
          'Establish a safe data governance framework for model experimentation',
          'Deploy first high-impact automated intelligence loop'
        ],
        firstSessionAgenda: 'Map organizational high-value AI leverage points, assess security boundaries, and prioritize high-ROI initiatives.',
        estimatedTimeToImpact: '14 Days'
      });
    }

    const prompt = `You are a world-class Executive AI Coach and Enterprise AI Strategist.
A prospective coaching client has completed an intake diagnostic with the following details:
- Role / Title: ${role || 'Not specified'}
- Organization / Industry: ${organization || 'General Tech'}
- Current AI Experience Level: ${aiExperience || 'Intermediate'}
- Primary Strategic Goal: ${primaryGoal || 'Scale team productivity with generative AI'}
- Biggest Blocker / Frustration: ${currentBlocker || 'Uncertainty around tool selection and team adoption'}
- Preferred Coaching Cadence: ${preferredPace || 'Weekly Intensive'}

Analyze this profile and return a JSON object with:
- "recommendedServiceId": One of ["exec-ai-strategy", "workflow-automation", "career-mentorship", "ethical-compliance", "rapid-sprint"]
- "suggestedServiceTitle": Clean human title of the recommended service
- "executiveSummary": 2 concise sentences diagnosing the core bottleneck and coaching thesis
- "immediateWins": Array of 3 specific, measurable, high-impact short-term deliverables
- "firstSessionAgenda": Concrete 1-sentence focus for their initial 60-minute coaching session
- "estimatedTimeToImpact": Realistic timeframe (e.g. "10-14 Days", "3 Weeks")

Respond in pure JSON format with no markdown blocks or backticks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (err: any) {
    console.error('Diagnostic error:', err);
    return res.status(500).json({
      error: 'Failed to generate diagnostic',
      details: err?.message || 'Server error',
      fallback: {
        recommendedServiceId: 'exec-ai-strategy',
        suggestedServiceTitle: 'Executive AI Transformation Coaching',
        executiveSummary: 'Tailored 1:1 advisory to align strategic leadership with frontier AI operational frameworks.',
        immediateWins: [
          'Identify top 3 high-impact internal AI use cases',
          'Deploy an executive prompt & context playbook',
          'Eliminate redundant manual documentation via LLM agents'
        ],
        firstSessionAgenda: 'Deep-dive discovery on current technical friction points and 90-day transformation trajectory.',
        estimatedTimeToImpact: '14 Days'
      }
    });
  }
});

// 2. Pre-Session Brief Generator (For Coach & Client prep)
app.post('/api/gemini/prep-brief', async (req, res) => {
  try {
    const { clientName, serviceTitle, sessionDate, clientGoal, targetChallenges } = req.body;

    if (!ai) {
      return res.json({
        executiveFocus: `Prepare structured framework for ${clientName}'s ${serviceTitle} session.`,
        probingQuestions: [
          'What is the single most time-consuming manual bottleneck your team encountered this past week?',
          'Where do you feel the biggest gap between theoretical AI hype and actual working execution?',
          'What measurable metric would prove this coaching session generated 10x ROI?'
        ],
        recommendedHandsOnExercise: 'Live teardown of their core prompt architecture and pipeline review.',
        keyPitfallsToWatch: 'Avoid over-engineering autonomous loops before standardizing single-turn reliability.',
        prepChecklist: [
          'Review client past milestone submissions',
          'Prepare tailored system prompt examples',
          'Have interactive architecture canvas ready'
        ]
      });
    }

    const prompt = `You are a Senior AI Coaching Partner preparing an executive briefing for an upcoming high-stakes 1:1 AI coaching session.
Client Name: ${clientName}
Service: ${serviceTitle}
Scheduled Date: ${sessionDate}
Client Goal: ${clientGoal}
Current Challenges: ${targetChallenges}

Generate a structured pre-session coaching brief as a JSON object with:
- "executiveFocus": 1-2 sentence core objective of this session
- "probingQuestions": Array of 3 incisive, non-obvious questions the coach should ask
- "recommendedHandsOnExercise": A concrete 15-minute hands-on drill or audit to conduct during the call
- "keyPitfallsToWatch": 1 sentence warning on common traps for this specific challenge
- "prepChecklist": Array of 3 actionable prep steps for the participant before joining

Respond in pure JSON format without markdown ticks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    return res.json(JSON.parse(text));
  } catch (err: any) {
    console.error('Prep brief error:', err);
    return res.status(500).json({ error: 'Failed to generate prep brief', details: err?.message });
  }
});

// 3. AI Custom Milestone Roadmap Generator
app.post('/api/gemini/generate-milestones', async (req, res) => {
  try {
    const { clientName, serviceName, durationWeeks, strategicTarget } = req.body;

    if (!ai) {
      return res.json({
        milestones: [
          {
            phase: 'Phase 1: Foundation & Baseline Audit',
            week: 'Week 1-2',
            description: 'Assess existing stack, establish baseline efficiency benchmarks, and secure prompt templates.',
            deliverables: ['AI readiness scorecard', 'Core system prompt library', 'Security & boundary policy']
          },
          {
            phase: 'Phase 2: Workflow & Prototype Engine',
            week: 'Week 3-4',
            description: 'Implement first operational agentic pipeline and automated review process.',
            deliverables: ['Working automated ingestion loop', 'Error recovery protocols', 'Initial team testing']
          },
          {
            phase: 'Phase 3: Scale & Multi-Tool Integration',
            week: 'Week 5-6',
            description: 'Connect frontier models with external business data and continuous evaluation.',
            deliverables: ['Knowledge grounding architecture', 'Multi-step agent validation', 'ROI dashboard']
          },
          {
            phase: 'Phase 4: Autonomous Operations & Mastery',
            week: 'Week 7-8',
            description: 'Transition to autonomous workflows with human-in-the-loop governance.',
            deliverables: ['Full playbook documentation', 'Team handoff workshop', 'Long-term maintenance guide']
          }
        ]
      });
    }

    const prompt = `Generate a customized 4-phase client coaching milestone roadmap.
Client: ${clientName || 'Client'}
Coaching Program: ${serviceName || 'Applied AI Coaching'}
Duration: ${durationWeeks || 8} weeks
Strategic Target: ${strategicTarget || 'Deploy production AI workflows'}

Return a JSON object with:
"milestones": Array of 4 phase objects, each with:
- "phase": string title (e.g. "Phase 1: Foundation & Security")
- "week": string duration (e.g. "Week 1-2")
- "description": 1-2 sentence overview of phase goals
- "deliverables": Array of 3 concrete tangible artifacts produced

Respond in pure JSON format without markdown ticks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    return res.json(JSON.parse(text));
  } catch (err: any) {
    console.error('Milestone error:', err);
    return res.status(500).json({ error: 'Failed to generate milestones', details: err?.message });
  }
});

// 4. Interactive AI Coaching Simulation / Practice Lab
app.post('/api/gemini/coaching-simulation', async (req, res) => {
  try {
    const { messages, scenario } = req.body;

    if (!ai) {
      return res.json({
        reply: "Welcome to your AI Coaching Lab. In this simulation, I will challenge your architectural decisions and refine your strategic execution before your live 1:1 session. What specific AI capability or organizational workflow are we stress-testing today?"
      });
    }

    const systemInstruction = `You are Coach Syntropy, a top-tier Principal AI Advisor and executive coach.
Your style:
- Deeply practical, rigorous, constructive, and encouraging.
- Avoid generic pleasantries; cut straight to actionable mechanics, architecture, prompt craftsmanship, and business leverage.
- Current Scenario: ${scenario || 'General AI Coaching Strategy & Technical Drill'}.
- Provide direct feedback and ask one focused clarifying question to keep the client thinking critically.`;

    const formattedContents = (messages || []).map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({ reply: response.text || 'Understood. Let us proceed.' });
  } catch (err: any) {
    console.error('Simulation error:', err);
    return res.status(500).json({ error: 'Failed simulation turn', details: err?.message });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Syntropy AI Coaching Server listening on port ${port}`);
  });
}

startServer();
