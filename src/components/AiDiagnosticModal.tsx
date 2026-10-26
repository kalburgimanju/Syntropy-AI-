import React, { useState } from 'react';
import { DiagnosticResult, CoachingService } from '../types/coaching';
import { X, Sparkles, Compass, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

interface AiDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: CoachingService[];
  onApplyRecommendation: (serviceId: string, notes: string) => void;
}

export const AiDiagnosticModal: React.FC<AiDiagnosticModalProps> = ({
  isOpen,
  onClose,
  services,
  onApplyRecommendation,
}) => {
  if (!isOpen) return null;

  const [role, setRole] = useState('VP of Engineering / Tech Leader');
  const [organization, setOrganization] = useState('Mid-Market SaaS (80-250 employees)');
  const [aiExperience, setAiExperience] = useState('Experimenting with frontier APIs & internal prototypes');
  const [primaryGoal, setPrimaryGoal] = useState('Deploy autonomous agentic workflows and enforce enterprise governance');
  const [currentBlocker, setCurrentBlocker] = useState('Hallucinations in complex document parsing and lack of internal evaluation metrics');
  const [preferredPace, setPreferredPace] = useState('Weekly Intensive (4-Week Accelerator)');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const handleRunDiagnostic = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          organization,
          aiExperience,
          primaryGoal,
          currentBlocker,
          preferredPace
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Diagnostic error:', err);
      // Fallback
      setResult({
        recommendedServiceId: 'exec-ai-strategy',
        suggestedServiceTitle: 'Executive AI Transformation & Strategy',
        executiveSummary: 'Your organization is positioned to leverage frontier models, but requires clear security guardrails and evaluation metrics before scaling to production.',
        immediateWins: [
          'Formulate zero-retention API agreements and data privacy boundaries',
          'Deploy first high-value automated document synthesis pipeline',
          'Establish continuous regression evaluation benchmarks'
        ],
        firstSessionAgenda: 'Map current engineering bottlenecks, establish baseline accuracy metrics, and architect a 90-day rollout plan.',
        estimatedTimeToImpact: '14 Days'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleScheduleFromDiagnostic = () => {
    if (!result) return;
    const notes = `Diagnostic Findings:\n- Goal: ${primaryGoal}\n- Core Blocker: ${currentBlocker}\n- First Session Focus: ${result.firstSessionAgenda}`;
    onApplyRecommendation(result.recommendedServiceId, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-bold text-white">AI Needs & Readiness Diagnostic</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {!result ? (
            <form onSubmit={handleRunDiagnostic} className="space-y-5">
              <div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Answer 5 quick strategic questions. Our Gemini-powered diagnostic engine will evaluate your organizational maturity and prescribe the highest-leverage coaching service and immediate quick wins.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Current Role & Scope
                </label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Founder / CEO">Founder / CEO</option>
                  <option value="CTO / VP of Engineering">CTO / VP of Engineering</option>
                  <option value="Head of Product / AI PM">Head of Product / AI PM</option>
                  <option value="Staff / Principal Software Engineer">Staff / Principal Software Engineer</option>
                  <option value="Enterprise Compliance / Risk Officer">Enterprise Compliance / Risk Officer</option>
                  <option value="Tech Professional Pivoting to AI">Tech Professional Pivoting to AI</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Company Scale / Industry
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={e => setOrganization(e.target.value)}
                  placeholder="e.g. Series A FinTech (45 employees)"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Current AI Technical Experience
                </label>
                <select
                  value={aiExperience}
                  onChange={e => setAiExperience(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Beginner: Just starting to explore LLM APIs">Beginner: Just starting to explore LLM APIs</option>
                  <option value="Intermediate: Experimenting with prompts and basic prototypes">Intermediate: Experimenting with prompts and basic prototypes</option>
                  <option value="Advanced: In production with basic models, seeking agentic reliability">Advanced: In production with basic models, seeking agentic reliability</option>
                  <option value="Enterprise: Managing complex multi-model systems and strict compliance">Enterprise: Managing complex multi-model systems and strict compliance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Top Priority Strategic Objective
                </label>
                <input
                  type="text"
                  value={primaryGoal}
                  onChange={e => setPrimaryGoal(e.target.value)}
                  placeholder="e.g. Automate customer support triage with 99% accuracy"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Biggest Technical or Operational Blocker
                </label>
                <textarea
                  rows={2}
                  value={currentBlocker}
                  onChange={e => setCurrentBlocker(e.target.value)}
                  placeholder="e.g. Unpredictable JSON outputs, high token costs, team resistance..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-2 transition-all shadow-md shadow-indigo-600/30 disabled:opacity-50 whitespace-nowrap shrink-0"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Diagnostic...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Run AI Diagnostic</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/40">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 mb-1">
                  Prescribed Coaching Track
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {result.suggestedServiceTitle}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result.executiveSummary}
                </p>
                <div className="mt-3 text-xs text-indigo-300 font-mono">
                  Estimated Time to Tangible ROI: <strong className="text-white">{result.estimatedTimeToImpact}</strong>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Immediate High-Impact Quick Wins:
                </div>
                <div className="space-y-2">
                  {result.immediateWins.map((win, wIdx) => (
                    <div key={wIdx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{win}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Proposed First Session Agenda:
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result.firstSessionAgenda}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="px-3.5 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Edit Responses
                </button>

                <button
                  type="button"
                  onClick={handleScheduleFromDiagnostic}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all whitespace-nowrap shrink-0"
                >
                  <span>Schedule This Recommended Track</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
