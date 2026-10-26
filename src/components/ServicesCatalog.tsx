import React, { useState } from 'react';
import { CoachingService, ServicePackage, CoachingCategory } from '../types/coaching';
import { Check, Clock, ChevronDown, ChevronUp, Sparkles, ArrowRight, Shield, Cpu, Target, UserCheck, Flame } from 'lucide-react';

interface ServicesCatalogProps {
  services: CoachingService[];
  onSelectServiceAndPackage: (service: CoachingService, pkg: ServicePackage) => void;
  onOpenDiagnostic: () => void;
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({
  services,
  onSelectServiceAndPackage,
  onOpenDiagnostic,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCurriculum, setExpandedCurriculum] = useState<Record<string, boolean>>({});

  const toggleCurriculum = (serviceId: string) => {
    setExpandedCurriculum(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'executive', label: 'Executive Strategy' },
    { id: 'workflow', label: 'Workflow & Agents' },
    { id: 'engineering', label: 'Engineering Mentorship' },
    { id: 'governance', label: 'Compliance & Safety' },
    { id: 'tactical', label: 'Tactical Blitz' },
  ];

  const getCategoryIcon = (category: CoachingCategory) => {
    switch (category) {
      case 'executive': return <Target className="w-4 h-4 text-indigo-400" />;
      case 'workflow': return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'engineering': return <UserCheck className="w-4 h-4 text-blue-400" />;
      case 'governance': return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'tactical': return <Flame className="w-4 h-4 text-amber-400" />;
      default: return <Sparkles className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <section id="services-section" className="py-16 sm:py-20 border-b border-slate-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-2">
            Practice Offerings
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Specialized AI Coaching Services
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Every engagement combines 1:1 strategic partnership with hands-on technical architecture. Choose a focused sprint or an ongoing transformation cadence.
          </p>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800 mb-10 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services List / Asymmetric Grid */}
        <div className="space-y-12">
          {filteredServices.map((service, index) => {
            const isCurriculumOpen = !!expandedCurriculum[service.id];
            const editorialIndex = `0${index + 1}.`;

            return (
              <div
                key={service.id}
                className="rounded-2xl border border-slate-800/90 bg-slate-900/60 overflow-hidden hover:border-slate-700/80 transition-colors"
              >
                {/* Header row */}
                <div className="p-6 sm:p-8 border-b border-slate-800/70">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    
                    <div className="max-w-2xl">
                      {/* Unboxed metadata row */}
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1.5 font-medium text-slate-300">
                          {getCategoryIcon(service.category)}
                          <span className="capitalize">{service.category} Track</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Target: {service.targetAudience}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        {editorialIndex} {service.title}
                      </h3>

                      <p className="text-sm font-medium text-indigo-300/90 mb-3">
                        {service.tagline}
                      </p>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Typical outcome card */}
                    <div className="lg:w-72 shrink-0 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Verified Outcome Benchmark
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {service.typicalOutcomes}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Deliverables & Curriculum Split */}
                <div className="p-6 sm:p-8 bg-slate-900/30 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-slate-800/70">
                  
                  {/* Left: Tangible Deliverables */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                      Tangible Deliverables Included
                    </h4>
                    <ul className="space-y-2.5">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Curriculum Breakdown */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Curriculum Framework ({service.curriculum.length} Core Modules)
                      </h4>
                      <button
                        onClick={() => toggleCurriculum(service.id)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                      >
                        <span>{isCurriculumOpen ? 'Collapse' : 'Expand Syllabus'}</span>
                        {isCurriculumOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {service.curriculum.slice(0, isCurriculumOpen ? undefined : 2).map((mod, mIdx) => (
                        <div key={mIdx} className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
                          <div className="text-xs font-semibold text-white mb-1">
                            {mIdx + 1}. {mod.title}
                          </div>
                          <p className="text-[12px] text-slate-400 leading-snug">
                            {mod.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Package Options & Booking Strip */}
                <div className="p-6 sm:p-8 bg-slate-950/80">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                    Available Engagement Packages
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {service.packages.map(pkg => (
                      <div
                        key={pkg.id}
                        className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                          pkg.popular
                            ? 'bg-indigo-950/20 border-indigo-500/50 ring-1 ring-indigo-500/30'
                            : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-sm font-semibold text-white">{pkg.name}</span>
                            {pkg.popular && (
                              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">
                                Most Popular
                              </span>
                            )}
                          </div>

                          <div className="flex items-baseline gap-1.5 mb-2">
                            <span className="text-2xl font-bold font-mono text-white tabular-nums">
                              ${pkg.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-slate-400">
                              / {pkg.duration}
                            </span>
                          </div>

                          <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            {pkg.description}
                          </p>
                        </div>

                        <button
                          onClick={() => onSelectServiceAndPackage(service, pkg)}
                          className={`w-full py-2.5 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${
                            pkg.popular
                              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          <span>Select & Schedule</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Diagnostic Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-lg font-bold text-white mb-1.5">
              Unsure which coaching program fits your timeline and technical maturity?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Complete our 2-minute AI Diagnostic to receive an instant strategic assessment and tailored recommendation.
            </p>
          </div>
          <button
            onClick={onOpenDiagnostic}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            Start Diagnostic Assessment
          </button>
        </div>

      </div>
    </section>
  );
};
