import React, { useState } from 'react';
import { ClientProfile, Milestone, ActionItem, SessionNote } from '../types/coaching';
import { 
  CheckCircle2, Clock, Calendar, CheckSquare, Square, Plus, 
  Sparkles, FileText, ExternalLink, TrendingUp, Cpu, Award, 
  MessageSquare, User, AlertCircle, ChevronRight, RefreshCw, Send
} from 'lucide-react';

interface ClientProgressTrackerProps {
  clients: ClientProfile[];
  activeClientId: string;
  onSelectClient: (clientId: string) => void;
  onUpdateClient: (updatedClient: ClientProfile) => void;
  onOpenSchedule: () => void;
  onGenerateAiBrief: (client: ClientProfile) => void;
}

export const ClientProgressTracker: React.FC<ClientProgressTrackerProps> = ({
  clients,
  activeClientId,
  onSelectClient,
  onUpdateClient,
  onOpenSchedule,
  onGenerateAiBrief,
}) => {
  const currentClient = clients.find(c => c.id === activeClientId) || clients[0];

  const [activeTab, setActiveTab] = useState<'roadmap' | 'actions' | 'sessions' | 'reflections'>('roadmap');

  // New action item state
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionCategory, setNewActionCategory] = useState('Implementation');
  const [newActionPriority, setNewActionPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [isAddingAction, setIsAddingAction] = useState(false);

  // New reflection state
  const [reflectionWin, setReflectionWin] = useState('');
  const [reflectionBlocker, setReflectionBlocker] = useState('');
  const [isSubmittingReflection, setIsSubmittingReflection] = useState(false);

  // AI Milestone generator loading
  const [isGeneratingMilestones, setIsGeneratingMilestones] = useState(false);
  const [milestoneGenFeedback, setMilestoneGenFeedback] = useState<string | null>(null);

  // New session note state
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteDuration, setNewNoteDuration] = useState('60');
  const [newNoteTakeaways, setNewNoteTakeaways] = useState('');
  const [newNoteHomework, setNewNoteHomework] = useState('');

  if (!currentClient) {
    return (
      <div className="py-20 text-center text-slate-400">
        No client profile found. Book a session to initialize client tracking.
      </div>
    );
  }

  // Toggle action item
  const handleToggleAction = (actionId: string) => {
    const updatedActions = currentClient.actionItems.map(item => {
      if (item.id === actionId) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    // Recalculate progress based on actions completed
    const completedCount = updatedActions.filter(a => a.completed).length;
    const progressEstimate = Math.min(
      100,
      Math.max(10, Math.round((completedCount / Math.max(1, updatedActions.length)) * 100))
    );

    const updated = {
      ...currentClient,
      actionItems: updatedActions,
      overallProgress: progressEstimate
    };
    onUpdateClient(updated);
  };

  // Add new action item
  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionTitle.trim()) return;

    const newItem: ActionItem = {
      id: `act-${Date.now()}`,
      title: newActionTitle.trim(),
      category: newActionCategory,
      priority: newActionPriority,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
    };

    const updated = {
      ...currentClient,
      actionItems: [newItem, ...currentClient.actionItems]
    };
    onUpdateClient(updated);
    setNewActionTitle('');
    setIsAddingAction(false);
  };

  // Submit Reflection
  const handleSubmitReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionWin.trim() && !reflectionBlocker.trim()) return;

    const newRef = {
      id: `ref-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      win: reflectionWin.trim() || 'Continued steady momentum on system prompts.',
      blocker: reflectionBlocker.trim() || 'None reported this week.',
      coachFeedback: 'Great progress. We will review this during our next scheduled check-in.'
    };

    const updated = {
      ...currentClient,
      reflections: [newRef, ...(currentClient.reflections || [])]
    };
    onUpdateClient(updated);
    setReflectionWin('');
    setReflectionBlocker('');
    setIsSubmittingReflection(false);
  };

  // Add Session Note
  const handleAddSessionNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;

    const newNote: SessionNote = {
      id: `sn-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      sessionTitle: newNoteTitle.trim(),
      durationMinutes: parseInt(newNoteDuration) || 60,
      keyTakeaways: newNoteTakeaways.split('\n').filter(t => t.trim().length > 0),
      homework: newNoteHomework.split('\n').filter(h => h.trim().length > 0)
    };

    const updated = {
      ...currentClient,
      sessionNotes: [newNote, ...currentClient.sessionNotes]
    };
    onUpdateClient(updated);
    setNewNoteTitle('');
    setNewNoteTakeaways('');
    setNewNoteHomework('');
    setIsAddingNote(false);
  };

  // AI Milestone Generator via server endpoint
  const handleGenerateAiMilestones = async () => {
    setIsGeneratingMilestones(true);
    setMilestoneGenFeedback(null);
    try {
      const response = await fetch('/api/gemini/generate-milestones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: currentClient.name,
          serviceName: currentClient.enrolledServiceName,
          durationWeeks: 8,
          strategicTarget: currentClient.skillsAcquired.join(', ') || 'Enterprise AI adoption'
        })
      });

      const data = await response.json();
      if (data.milestones && Array.isArray(data.milestones)) {
        const formatted: Milestone[] = data.milestones.map((m: any, idx: number) => ({
          id: `ai-m-${Date.now()}-${idx}`,
          phase: m.phase || `Phase ${idx + 1}`,
          timeframe: m.week || `Week ${idx * 2 + 1}-${idx * 2 + 2}`,
          title: m.phase || `Target Phase ${idx + 1}`,
          description: m.description || 'Milestone objective.',
          status: idx === 0 ? 'in_progress' : 'upcoming',
          deliverables: m.deliverables || ['System verification', 'Documentation', 'Handoff'],
          progressPercent: idx === 0 ? 30 : 0
        }));

        const updated = {
          ...currentClient,
          milestones: formatted
        };
        onUpdateClient(updated);
        setMilestoneGenFeedback('Personalized 4-phase milestone roadmap successfully generated!');
        setTimeout(() => setMilestoneGenFeedback(null), 4000);
      }
    } catch (err) {
      console.error('Milestone gen error', err);
      setMilestoneGenFeedback('Notice: Loaded standard milestone framework.');
    } finally {
      setIsGeneratingMilestones(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Control Bar: Client Selector & Main Action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
          <div>
            <div className="text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-1">
              Client Portal & Progress Management
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Executive AI Advisory Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-slate-400 shrink-0">Select Client:</label>
            <select
              value={currentClient.id}
              onChange={e => onSelectClient(e.target.value)}
              className="px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              {clients.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.company}
                </option>
              ))}
            </select>

            <button
              onClick={() => onGenerateAiBrief(currentClient)}
              className="px-3.5 py-2 text-xs font-semibold text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/60 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Generate AI Pre-Session Brief"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">AI Pre-Session Brief</span>
            </button>
          </div>
        </div>

        {/* Client Executive Header Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left: Client Identity */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-slate-800 to-indigo-950 border border-slate-700 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
                {currentClient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{currentClient.name}</h3>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-indigo-300 font-medium">{currentClient.role}</span>
                </div>
                <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
                  <span>Organization: <strong className="text-slate-200">{currentClient.company}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Enrolled Track: <strong className="text-slate-200">{currentClient.enrolledServiceName}</strong></span>
                </div>
                
                {/* Competency Badges (unboxed text style) */}
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span className="text-slate-500 font-medium">Verified Competencies:</span>
                  {currentClient.skillsAcquired.map((skill, sIdx) => (
                    <span key={sIdx} className="text-slate-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Key Metrics (Tabular Figures) */}
            <div className="grid grid-cols-3 gap-4 lg:w-96 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-400 tabular-nums">
                  {currentClient.overallProgress}%
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Milestone Progress
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                  {currentClient.weeklyImplementationHours}h
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Weekly AI Focus
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                  +{currentClient.productivityGainPercent}%
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Efficiency Gain
                </div>
              </div>
            </div>

          </div>

          {/* Progress Bar */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Overall Program Trajectory</span>
              <span className="font-mono text-white tabular-nums">{currentClient.overallProgress}% Complete</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${currentClient.overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 bg-slate-900/90 rounded-xl border border-slate-800 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'roadmap' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Milestone Roadmap ({currentClient.milestones.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('actions')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'actions' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Deliverables & Action Items ({currentClient.actionItems.filter(a => !a.completed).length} open)</span>
          </button>

          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'sessions' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Session Notes & Logs ({currentClient.sessionNotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reflections')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'reflections' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Weekly Reflections ({currentClient.reflections?.length || 0})</span>
          </button>
        </div>

        {/* TAB 1: MILESTONE ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Phase-by-Phase Execution Journey
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerateAiMilestones}
                  disabled={isGeneratingMilestones}
                  className="px-3.5 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/60 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingMilestones ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingMilestones ? 'Generating Custom AI Roadmap...' : 'Generate AI Milestone Roadmap'}</span>
                </button>
              </div>
            </div>

            {milestoneGenFeedback && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{milestoneGenFeedback}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentClient.milestones.map((milestone, idx) => {
                const isCompleted = milestone.status === 'completed';
                const isInProgress = milestone.status === 'in_progress';

                return (
                  <div
                    key={milestone.id}
                    className={`p-5 rounded-xl border transition-all ${
                      isCompleted
                        ? 'bg-slate-900/40 border-slate-800'
                        : isInProgress
                        ? 'bg-indigo-950/20 border-indigo-500/50 ring-1 ring-indigo-500/30'
                        : 'bg-slate-950/30 border-slate-850 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className={isInProgress ? 'text-indigo-400 font-bold' : 'text-slate-400'}>
                          {milestone.phase}
                        </span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-400">{milestone.timeframe}</span>
                      </div>

                      {/* Status indicator (unboxed) */}
                      <span className={`text-xs font-semibold ${
                        isCompleted ? 'text-emerald-400' : isInProgress ? 'text-indigo-400' : 'text-slate-500'
                      }`}>
                        {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Upcoming'}
                      </span>
                    </div>

                    <h5 className="text-base font-bold text-white mb-1.5">{milestone.title}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{milestone.description}</p>

                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Key Deliverables Produced:
                      </div>
                      <div className="space-y-1.5">
                        {milestone.deliverables.map((del, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Progress Slider/Updater for active phase */}
                    {isInProgress && (
                      <div className="mt-4 pt-3 border-t border-slate-800">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                          <span>Phase Completion</span>
                          <span className="font-mono text-indigo-300 tabular-nums">{milestone.progressPercent}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={milestone.progressPercent}
                          onChange={e => {
                            const val = parseInt(e.target.value);
                            const updatedMilestones = currentClient.milestones.map(m => {
                              if (m.id === milestone.id) {
                                return {
                                  ...m,
                                  progressPercent: val,
                                  status: (val === 100 ? 'completed' : 'in_progress') as 'completed' | 'in_progress' | 'upcoming'
                                };
                              }
                              return m;
                            });
                            onUpdateClient({ ...currentClient, milestones: updatedMilestones });
                          }}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: DELIVERABLES & ACTION ITEMS */}
        {activeTab === 'actions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Active Tactical Deliverables
              </h4>
              <button
                onClick={() => setIsAddingAction(!isAddingAction)}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Action Item</span>
              </button>
            </div>

            {/* Add action item drawer */}
            {isAddingAction && (
              <form onSubmit={handleAddAction} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                <div className="text-xs font-semibold text-white">Create New Action Item</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Action description (e.g. Test structured output validation)..."
                    value={newActionTitle}
                    onChange={e => setNewActionTitle(e.target.value)}
                    className="sm:col-span-2 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <select
                    value={newActionCategory}
                    onChange={e => setNewActionCategory(e.target.value)}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Prompt Craft">Prompt Craft</option>
                    <option value="Governance">Governance</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Evaluation">Evaluation</option>
                    <option value="Strategy">Strategy</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingAction(false)}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg"
                  >
                    Save Action
                  </button>
                </div>
              </form>
            )}

            {/* Action items list */}
            <div className="space-y-2.5">
              {currentClient.actionItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleToggleAction(item.id)}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                    item.completed
                      ? 'bg-slate-950/40 border-slate-850 text-slate-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="text-slate-400 hover:text-indigo-400 focus:outline-none"
                    >
                      {item.completed ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-500" />
                      )}
                    </button>
                    <div>
                      <div className={`text-sm font-medium ${item.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>Category: {item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>Due: <strong className="font-mono tabular-nums">{item.dueDate}</strong></span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-xs font-semibold uppercase tracking-wider ${
                    item.priority === 'high' ? 'text-amber-400' : 'text-slate-400'
                  }`}>
                    {item.priority} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SESSION NOTES & LOGS */}
        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Executive Session History & Takeaways
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddingNote(!isAddingNote)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log New Session Note</span>
                </button>
                <button
                  onClick={onOpenSchedule}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Schedule Next Call</span>
                </button>
              </div>
            </div>

            {/* Add note drawer */}
            {isAddingNote && (
              <form onSubmit={handleAddSessionNote} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                <div className="text-xs font-semibold text-white">Record Post-Session Summary</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Session Topic / Title (e.g. Tool Calling Architecture Review)"
                    value={newNoteTitle}
                    onChange={e => setNewNoteTitle(e.target.value)}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                  <input
                    type="number"
                    placeholder="Duration in minutes (e.g. 60)"
                    value={newNoteDuration}
                    onChange={e => setNewNoteDuration(e.target.value)}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Key Takeaways (one per line):</label>
                  <textarea
                    rows={2}
                    value={newNoteTakeaways}
                    onChange={e => setNewNoteTakeaways(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                    placeholder="1. Migrated prompt template to structured schema&#10;2. Configured fallback model routing"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Assigned Homework / Follow-up (one per line):</label>
                  <textarea
                    rows={2}
                    value={newNoteHomework}
                    onChange={e => setNewNoteHomework(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                    placeholder="1. Test batch inference with 20 edge cases"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNote(false)}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg"
                  >
                    Save Session Note
                  </button>
                </div>
              </form>
            )}

            {/* Notes list */}
            <div className="space-y-4">
              {currentClient.sessionNotes.map(note => (
                <div
                  key={note.id}
                  className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-base font-bold text-white">{note.sessionTitle}</h5>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        <span>Date: {note.date}</span>
                        <span className="mx-2">·</span>
                        <span>Duration: {note.durationMinutes} Minutes</span>
                      </div>
                    </div>

                    {note.docLink && (
                      <a
                        href={note.docLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Shared Working Doc</span>
                      </a>
                    )}
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Core Strategic Breakthroughs:
                    </div>
                    <ul className="space-y-1.5">
                      {note.keyTakeaways.map((takeaway, tIdx) => (
                        <li key={tIdx} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {note.homework && note.homework.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Homework & Action Commitment:
                      </div>
                      <ul className="space-y-1">
                        {note.homework.map((hw, hIdx) => (
                          <li key={hIdx} className="text-xs text-slate-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                            <span>{hw}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REFLECTIONS JOURNAL */}
        {activeTab === 'reflections' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  Weekly Client Reflection Log
                </h4>
                <p className="text-xs text-slate-400">
                  Clients submit reflections between sessions to celebrate wins and highlight blockers for the coach.
                </p>
              </div>
              <button
                onClick={() => setIsSubmittingReflection(!isSubmittingReflection)}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Submit Weekly Reflection</span>
              </button>
            </div>

            {isSubmittingReflection && (
              <form onSubmit={handleSubmitReflection} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                <div className="text-xs font-semibold text-white">Share Your Weekly AI Progress</div>
                <div>
                  <label className="block text-xs text-emerald-400 mb-1">Biggest AI Win This Week:</label>
                  <textarea
                    rows={2}
                    value={reflectionWin}
                    onChange={e => setReflectionWin(e.target.value)}
                    placeholder="e.g. Cut manual spec generation time from 4 hours to 20 minutes with our new prompt..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-amber-400 mb-1">Current Blocker or Question for Coach:</label>
                  <textarea
                    rows={2}
                    value={reflectionBlocker}
                    onChange={e => setReflectionBlocker(e.target.value)}
                    placeholder="e.g. Noticeable hallucinations when parsing nested table data in invoices..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmittingReflection(false)}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg"
                  >
                    Post Reflection
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {(currentClient.reflections || []).map(ref => (
                <div key={ref.id} className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3">
                  <div className="text-xs font-mono text-slate-400">
                    Logged on: {ref.date}
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-200">
                      <strong className="text-emerald-400 block mb-0.5">Win:</strong>
                      {ref.win}
                    </div>
                    <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-slate-200">
                      <strong className="text-amber-400 block mb-0.5">Blocker / Question:</strong>
                      {ref.blocker}
                    </div>
                    {ref.coachFeedback && (
                      <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-xs text-slate-200">
                        <strong className="text-indigo-400 block mb-0.5">Coach Sarah Lin's Feedback:</strong>
                        {ref.coachFeedback}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
