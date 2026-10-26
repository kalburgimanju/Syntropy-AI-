import React, { useState } from 'react';
import { Booking, ClientProfile, CoachingService, CoachingCategory } from '../types/coaching';
import { 
  Users, DollarSign, Calendar, CheckCircle2, Clock, Video, 
  Plus, ArrowUpRight, TrendingUp, Shield, Sparkles, Filter 
} from 'lucide-react';

interface CoachAdminViewProps {
  bookings: Booking[];
  clients: ClientProfile[];
  services: CoachingService[];
  onUpdateBookingStatus: (bookingId: string, status: 'upcoming' | 'completed' | 'cancelled') => void;
  onSelectClientForInspection: (clientId: string) => void;
  onAddNewService: (service: CoachingService) => void;
}

export const CoachAdminView: React.FC<CoachAdminViewProps> = ({
  bookings,
  clients,
  services,
  onUpdateBookingStatus,
  onSelectClientForInspection,
  onAddNewService,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreatingService, setIsCreatingService] = useState<boolean>(false);

  // New Service Form State
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceCategory, setServiceCategory] = useState<CoachingCategory>('executive');
  const [serviceTagline, setServiceTagline] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceAudience, setServiceAudience] = useState('');
  const [servicePrice, setServicePrice] = useState('750');
  const [serviceDuration, setServiceDuration] = useState('60 Minutes');

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);
  const upcomingBookingsCount = bookings.filter(b => b.status === 'upcoming').length;
  const completedBookingsCount = bookings.filter(b => b.status === 'completed').length;

  const filteredBookings = filterStatus === 'all'
    ? bookings
    : bookings.filter(b => b.status === filterStatus);

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle.trim()) return;

    const newService: CoachingService = {
      id: `custom-${Date.now()}`,
      title: serviceTitle.trim(),
      category: serviceCategory,
      subtitle: serviceTagline.trim() || 'Custom bespoke advisory package',
      tagline: serviceTagline.trim() || 'Direct tailored coaching',
      description: serviceDescription.trim() || 'Specialized engagement configured for unique enterprise client requirements.',
      targetAudience: serviceAudience.trim() || 'Enterprise Leaders',
      deliverables: [
        'Dedicated Architecture Audit',
        'Customized Implementation Code & System Prompt Diff',
        'Full Session Recording & Executive Brief'
      ],
      curriculum: [
        {
          title: 'Initial Discovery & Root-Cause Analysis',
          description: 'Assess technical requirements and operational friction points.'
        },
        {
          title: 'Applied Architecture & Implementation Drill',
          description: 'Live hands-on refactoring and validation.'
        }
      ],
      packages: [
        {
          id: `pkg-${Date.now()}`,
          name: 'Executive Consultation',
          duration: serviceDuration,
          price: parseInt(servicePrice) || 600,
          description: 'Bespoke high-urgency advisory call.'
        }
      ],
      typicalOutcomes: 'Direct resolution of specialized architecture challenge.'
    };

    onAddNewService(newService);
    setServiceTitle('');
    setServiceTagline('');
    setServiceDescription('');
    setServiceAudience('');
    setIsCreatingService(false);
  };

  return (
    <section className="py-12 sm:py-16 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
          <div>
            <div className="text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-1">
              Coach Command Center
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              AI Coaching Practice Operations
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCreatingService(!isCreatingService)}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Launch New Coaching Service</span>
            </button>
          </div>
        </div>

        {/* Business KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-medium text-slate-400 mb-1">Total Pipeline Booked</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
              <TrendingUp className="w-3 h-3" />
              <span>+24% month-over-month</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-medium text-slate-400 mb-1">Active Coaching Clients</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-indigo-400 tabular-nums">
              {clients.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Retained enterprise accounts
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-medium text-slate-400 mb-1">Upcoming Scheduled Sessions</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              {upcomingBookingsCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Next 14 business days
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-medium text-slate-400 mb-1">Client Satisfaction Score</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 tabular-nums">
              4.9 / 5.0
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Based on {completedBookingsCount + 8} completed reviews
            </div>
          </div>
        </div>

        {/* Create Service Modal/Form Drawer */}
        {isCreatingService && (
          <form onSubmit={handleCreateService} className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/50 mb-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Create & Publish New Coaching Service</h3>
              <button
                type="button"
                onClick={() => setIsCreatingService(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Service Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Healthcare AI HIPAA Architecture Sprint"
                  value={serviceTitle}
                  onChange={e => setServiceTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Category Track *</label>
                <select
                  value={serviceCategory}
                  onChange={e => setServiceCategory(e.target.value as CoachingCategory)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                >
                  <option value="executive">Executive Strategy</option>
                  <option value="workflow">Workflow & Agents</option>
                  <option value="engineering">Engineering Mentorship</option>
                  <option value="governance">Compliance & Safety</option>
                  <option value="tactical">Tactical Blitz</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Short Tagline *</label>
                <input
                  type="text"
                  placeholder="e.g. Ensure medical model pipelines conform to strict privacy protocols"
                  value={serviceTagline}
                  onChange={e => setServiceTagline(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Target Audience</label>
                <input
                  type="text"
                  placeholder="e.g. Clinical Tech Founders, Healthcare CTOs"
                  value={serviceAudience}
                  onChange={e => setServiceAudience(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Package Price ($ USD)</label>
                <input
                  type="number"
                  value={servicePrice}
                  onChange={e => setServicePrice(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Session Duration</label>
                <input
                  type="text"
                  value={serviceDuration}
                  onChange={e => setServiceDuration(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Detailed Description</label>
              <textarea
                rows={2}
                value={serviceDescription}
                onChange={e => setServiceDescription(e.target.value)}
                placeholder="Explain the structure, outcomes, and value proposition of this new offering..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatingService(false)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg"
              >
                Publish Service
              </button>
            </div>
          </form>
        )}

        {/* Client Roster Overview */}
        <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Active Retained Client Accounts</h3>
            <span className="text-xs text-slate-400">{clients.length} Total Enrolled</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider">Client & Role</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider">Enrolled Track</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider text-right">Roadmap Progress</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider text-right">Weekly Focus</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {clients.map(client => (
                  <tr key={client.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{client.name}</div>
                      <div className="text-[11px] text-slate-400">{client.role} · {client.company}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {client.enrolledServiceName}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono font-bold text-indigo-400 tabular-nums">
                        {client.overallProgress}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-300 tabular-nums">
                      {client.weeklyImplementationHours}h / wk
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onSelectClientForInspection(client.id)}
                        className="px-3 py-1.5 text-xs text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/60 rounded-lg border border-indigo-700/60 transition-colors inline-flex items-center gap-1 font-medium whitespace-nowrap shrink-0"
                      >
                        <span>Open Dashboard</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bookings Pipeline Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-white">Coaching Sessions & Bookings Pipeline</h3>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filter:</span>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              >
                <option value="all">All Statuses</option>
                <option value="upcoming">Upcoming Only</option>
                <option value="completed">Completed Only</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider">Client & Contact</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider">Service Track</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider">Date & Time Slot</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider text-right">Price</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider text-center">Status</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider text-right">Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBookings.map(b => (
                  <tr key={b.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{b.clientName}</div>
                      <div className="text-[11px] text-slate-400">{b.clientEmail}</div>
                      <div className="text-[11px] text-slate-500">{b.organization}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-200 font-medium">{b.serviceTitle}</div>
                      <div className="text-[11px] text-slate-400">{b.packageName}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-300 tabular-nums">
                      <div>{b.date}</div>
                      <div className="text-[11px] text-slate-500">{b.timeSlot}</div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-white tabular-nums">
                      ${b.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-xs font-semibold ${
                        b.status === 'upcoming'
                          ? 'text-indigo-400'
                          : b.status === 'completed'
                          ? 'text-emerald-400'
                          : 'text-slate-500'
                      }`}>
                        {b.status === 'upcoming' ? 'Upcoming' : b.status === 'completed' ? 'Completed' : 'Cancelled'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {b.status === 'upcoming' && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, 'completed')}
                            className="px-2.5 py-1 text-[11px] text-emerald-300 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-700/50 rounded-md transition-colors"
                          >
                            Mark Complete
                          </button>
                        )}
                        <a
                          href={b.meetingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
                          title="Open meeting room"
                        >
                          <Video className="w-4 h-4 text-indigo-400" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
