import React, { useState, useEffect } from 'react';
import { ClientProfile, PreSessionBrief } from '../types/coaching';
import { X, Sparkles, HelpCircle, AlertTriangle, CheckSquare, Dumbbell, Loader2, Copy, Check } from 'lucide-react';

interface AiPreSessionBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientProfile | null;
}

export const AiPreSessionBriefModal: React.FC<AiPreSessionBriefModalProps> = ({
  isOpen,
  onClose,
  client,
}) => {
  if (!isOpen || !client) return null;

  const [brief, setBrief] = useState<PreSessionBrief | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!client) return;
    const current = client;
    let isMounted = true;
    async function fetchBrief() {
      setLoading(true);
      try {
        const response = await fetch('/api/gemini/prep-brief', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientName: current.name,
            serviceTitle: current.enrolledServiceName,
            sessionDate: 'Upcoming Session',
            clientGoal: current.skillsAcquired.join(', '),
            targetChallenges: current.actionItems.filter(a => !a.completed).map(a => a.title).join('; ') || 'Scale reliable autonomous workflows'
          })
        });
        const data = await response.json();
        if (isMounted) setBrief(data);
      } catch (err) {
        console.error('Failed to load brief', err);
        if (isMounted) {
          setBrief({
            executiveFocus: `Prepare structured framework for ${current.name}'s ${current.enrolledServiceName} session.`,
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
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchBrief();
    return () => { isMounted = false; };
  }, [client]);

  const handleCopyText = () => {
    if (!brief) return;
    const text = [
      `AI COACHING PRE-SESSION BRIEF FOR ${client.name.toUpperCase()}`,
      `Service: ${client.enrolledServiceName}`,
      `Executive Focus: ${brief.executiveFocus}`,
      `\nProbing Diagnostic Questions:`,
      ...brief.probingQuestions.map((q, i) => `${i + 1}. ${q}`),
      `\nRecommended Hands-On Drill:\n${brief.recommendedHandsOnExercise}`,
      `\nPitfall Warning:\n${brief.keyPitfallsToWatch}`,
      `\nPreparation Checklist:`,
      ...brief.prepChecklist.map(c => `- ${c}`)
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-bold text-white">AI Pre-Session Intelligence Brief</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
              <p className="text-xs text-slate-400">
                Synthesizing executive coaching brief for {client.name}...
              </p>
            </div>
          ) : brief ? (
            <div className="space-y-6">
              
              {/* Executive Focus */}
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/40">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 mb-1">
                  Session Primary Intent
                </div>
                <p className="text-sm text-slate-200 font-medium leading-relaxed">
                  {brief.executiveFocus}
                </p>
              </div>

              {/* Probing Diagnostic Questions */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  <HelpCircle className="w-4 h-4 text-indigo-400" />
                  <span>3 Incisive Discovery Questions for the Call</span>
                </div>
                <div className="space-y-2">
                  {brief.probingQuestions.map((q, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5">
                      <span className="font-mono font-bold text-indigo-400 tabular-nums">{idx + 1}.</span>
                      <span className="leading-relaxed">{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Hands-on drill */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Dumbbell className="w-4 h-4 text-emerald-400" />
                  <span>Recommended 15-Minute Hands-On Drill</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {brief.recommendedHandsOnExercise}
                </p>
              </div>

              {/* Pitfalls to watch */}
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-slate-300 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-400 block mb-0.5">Critical Common Trap:</strong>
                  {brief.keyPitfallsToWatch}
                </div>
              </div>

              {/* Prep Checklist */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Pre-Session Readiness Checklist:
                </div>
                <div className="space-y-1.5">
                  {brief.prepChecklist.map((item, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer action */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <button
                  onClick={handleCopyText}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Brief Notes'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>

            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
};
