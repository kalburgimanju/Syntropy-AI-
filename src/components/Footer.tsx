import React from 'react';
import { Mail, Shield, Calendar, Compass, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onScheduleClick: () => void;
  onDiagnosticClick: () => void;
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScheduleClick,
  onDiagnosticClick,
  onNavigateTab,
}) => {
  return (
    <footer className="bg-[#080C14] border-t border-slate-800/80 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                S
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Syntropy AI Coaching
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Strategic AI advisory, executive transformation, and hands-on workflow architecture. We convert frontier intelligence into high-ROI production systems.
            </p>

            <div className="text-[11px] text-slate-500">
              San Francisco, CA & Global Remote Advisory Desk
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Platform Features
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateTab('services')}
                  className="hover:text-white transition-colors"
                >
                  Coaching Services Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('tracker')}
                  className="hover:text-white transition-colors"
                >
                  Client Progress & Milestones
                </button>
              </li>
              <li>
                <button
                  onClick={onDiagnosticClick}
                  className="hover:text-white transition-colors"
                >
                  AI Needs Diagnostic
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('simulation')}
                  className="hover:text-white transition-colors"
                >
                  AI Simulation Rehearsal Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Engagement */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Direct Advisory Inquiries
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have a specialized enterprise AI mandate or board-level transformation request?
            </p>
            <div className="pt-1 flex flex-col gap-2">
              <button
                onClick={onScheduleClick}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Discovery Call</span>
              </button>
              <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                <Mail className="w-3 h-3 text-indigo-400" />
                <span>advisory@syntropy-coaching.ai</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright and Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Syntropy AI Coaching & Advisory Group. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Client Zero-Data-Retention Protected</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise Terms</span>
            <span aria-hidden="true">·</span>
            <span>SOC2 Type II Aligned</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
