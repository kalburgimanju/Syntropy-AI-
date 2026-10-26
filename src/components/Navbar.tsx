import React from 'react';
import { Calendar, UserCheck, ShieldAlert, Award, Bot, Sparkles, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenDiagnostic: () => void;
  isCoachView: boolean;
  setIsCoachView: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenDiagnostic,
  isCoachView,
  setIsCoachView,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => setActiveTab('overview')} 
          className="text-left group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            S
          </div>
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group-hover:text-indigo-300 transition-colors">
            Syntropy AI Coaching
          </span>
        </button>

        {/* Zone 2: 4-5 clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('services')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'services' ? 'text-indigo-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Coaching Services
          </button>
          
          <button
            onClick={() => setActiveTab('tracker')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'tracker' ? 'text-indigo-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Client Progress Tracker
          </button>

          <button
            onClick={onOpenDiagnostic}
            className="whitespace-nowrap shrink-0 transition-colors text-slate-300 hover:text-indigo-300 flex items-center gap-1.5"
          >
            <span>AI Diagnostic</span>
          </button>

          <button
            onClick={() => setActiveTab('simulation')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'simulation' ? 'text-indigo-400 font-semibold' : 'text-slate-300'
            }`}
          >
            AI Practice Lab
          </button>

          <button
            onClick={() => setIsCoachView(!isCoachView)}
            className="whitespace-nowrap shrink-0 text-xs px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            {isCoachView ? 'Switch to Client View' : 'Coach Management View'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm shadow-indigo-600/30 transition-all hover:shadow-indigo-500/40 whitespace-nowrap shrink-0"
          >
            Schedule Session
          </button>
        </div>

      </div>

      {/* Mobile nav subbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-slate-900/90 border-t border-slate-800 text-xs overflow-x-auto gap-4">
        <button
          onClick={() => setActiveTab('services')}
          className={`whitespace-nowrap ${activeTab === 'services' ? 'text-indigo-400 font-semibold' : 'text-slate-400'}`}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab('tracker')}
          className={`whitespace-nowrap ${activeTab === 'tracker' ? 'text-indigo-400 font-semibold' : 'text-slate-400'}`}
        >
          Progress Tracker
        </button>
        <button
          onClick={onOpenDiagnostic}
          className="whitespace-nowrap text-indigo-300 font-medium"
        >
          Diagnostic
        </button>
        <button
          onClick={() => setActiveTab('simulation')}
          className={`whitespace-nowrap ${activeTab === 'simulation' ? 'text-indigo-400 font-semibold' : 'text-slate-400'}`}
        >
          Practice Lab
        </button>
        <button
          onClick={() => setIsCoachView(!isCoachView)}
          className="whitespace-nowrap text-slate-300"
        >
          {isCoachView ? 'Client View' : 'Coach Mode'}
        </button>
      </div>
    </header>
  );
};
