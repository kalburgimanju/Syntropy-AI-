import React from 'react';
import { Calendar, ArrowRight, CheckCircle2, ShieldCheck, Zap, Compass, Users } from 'lucide-react';

interface HeroSectionProps {
  onScheduleClick: () => void;
  onDiagnosticClick: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScheduleClick,
  onDiagnosticClick,
  onExploreServices,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Hero: Content & High-Impact Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Unboxed editorial category kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-4">
              <span>Executive & Technical AI Advisory</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>1:1 Mentorship</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Enterprise Delivery</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6 text-balance max-w-2xl">
              Turn Artificial Intelligence from theoretical hype into verified business momentum.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
              Bespoke 1:1 coaching, agentic architecture advisory, and executive governance. We partner with founders, CTOs, and engineering leaders to design, deploy, and scale dependable AI workflows with clear ROI.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <button
                onClick={onScheduleClick}
                className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/30 transition-all hover:shadow-indigo-500/40 flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Coaching Session</span>
              </button>

              <button
                onClick={onDiagnosticClick}
                className="px-5 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>Take AI Needs Diagnostic</span>
              </button>
            </div>

            {/* Quiet trust badges */}
            <div className="pt-6 border-t border-slate-800/70 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tailored 1:1 Roadmap</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero-Data-Retention Safeguards</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hands-on Code & Pipeline Teardowns</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset with Coach Card Overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/70 shadow-2xl shadow-black/60 bg-slate-900 group">
              <img
                src="/src/assets/images/hero_ai_coaching_advisory_1793011159580.jpg"
                alt="Executive AI coaching advisory session in modern boardroom"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              
              {/* Bottom Card Annotation */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-left">
                <div className="flex items-center gap-3">
                  <img
                    src="/src/assets/images/portrait_master_coach_1793011160037.jpg"
                    alt="Sarah Lin, Principal AI Strategist"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">Sarah Lin</div>
                    <div className="text-xs text-slate-400">Principal AI Advisor & Strategic Coach</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-xs font-mono font-bold text-emerald-400 tabular-nums">98.6%</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column KPI Proof Strip below the Hero Split */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums mb-1">
              45+
            </div>
            <div className="text-xs font-medium text-slate-400">
              Enterprise Leaders & Founders Coached
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              FinTech, SaaS, Healthcare & Cloud
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-indigo-400 tabular-nums mb-1">
              65%
            </div>
            <div className="text-xs font-medium text-slate-400">
              Repetitive Workflow Elimination
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Autonomous agents deployed into production
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums mb-1">
              100%
            </div>
            <div className="text-xs font-medium text-slate-400">
              Board-Approved Governance
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Zero security breaches across client models
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 tabular-nums mb-1">
              14 Days
            </div>
            <div className="text-xs font-medium text-slate-400">
              Average Time to Tangible ROI
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              From intake audit to first working workflow
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
