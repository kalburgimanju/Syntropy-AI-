/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CoachingService, ServicePackage, Booking, ClientProfile 
} from './types/coaching';
import { 
  loadBookings, saveBookings, 
  loadClients, saveClients, 
  loadServices, saveServices 
} from './data/mockCoachingData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesCatalog } from './components/ServicesCatalog';
import { ClientProgressTracker } from './components/ClientProgressTracker';
import { SchedulingModal } from './components/SchedulingModal';
import { AiDiagnosticModal } from './components/AiDiagnosticModal';
import { AiPreSessionBriefModal } from './components/AiPreSessionBriefModal';
import { AiSimulationLab } from './components/AiSimulationLab';
import { CoachAdminView } from './components/CoachAdminView';
import { Footer } from './components/Footer';
import { CheckCircle2, Sparkles, ArrowRight, Video } from 'lucide-react';

export default function App() {
  const [services, setServices] = useState<CoachingService[]>(() => loadServices());
  const [bookings, setBookings] = useState<Booking[]>(() => loadBookings());
  const [clients, setClients] = useState<ClientProfile[]>(() => loadClients());
  const [activeClientId, setActiveClientId] = useState<string>(() => loadClients()[0]?.id || 'client-1');

  // Navigation and View state
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isCoachView, setIsCoachView] = useState<boolean>(false);

  // Modals
  const [isSchedulingOpen, setIsSchedulingOpen] = useState<boolean>(false);
  const [preSelectedService, setPreSelectedService] = useState<CoachingService | null>(null);
  const [preSelectedPackage, setPreSelectedPackage] = useState<ServicePackage | null>(null);

  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState<boolean>(false);
  const [isBriefOpen, setIsBriefOpen] = useState<boolean>(false);
  const [briefClient, setBriefClient] = useState<ClientProfile | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Sync state changes to localStorage
  useEffect(() => {
    saveBookings(bookings);
  }, [bookings]);

  useEffect(() => {
    saveClients(clients);
  }, [clients]);

  useEffect(() => {
    saveServices(services);
  }, [services]);

  // Handle Booking from Services Catalog
  const handleSelectServiceAndPackage = (service: CoachingService, pkg: ServicePackage) => {
    setPreSelectedService(service);
    setPreSelectedPackage(pkg);
    setIsSchedulingOpen(true);
  };

  // Handle Confirmed Booking
  const handleBookingConfirmed = (newBooking: Booking) => {
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);

    // Check if client exists by email
    const existingClientIndex = clients.findIndex(
      c => c.email.toLowerCase() === newBooking.clientEmail.toLowerCase()
    );

    if (existingClientIndex >= 0) {
      // Update existing client
      const updatedClient = { ...clients[existingClientIndex] };
      updatedClient.enrolledServiceId = newBooking.serviceId;
      updatedClient.enrolledServiceName = newBooking.serviceTitle;
      
      const updatedClientsList = [...clients];
      updatedClientsList[existingClientIndex] = updatedClient;
      setClients(updatedClientsList);
      setActiveClientId(updatedClient.id);
    } else {
      // Create new client profile for progress tracking
      const newClientProfile: ClientProfile = {
        id: `client-${Date.now().toString().slice(-5)}`,
        name: newBooking.clientName,
        email: newBooking.clientEmail,
        role: 'Client Lead',
        company: newBooking.organization,
        enrolledServiceId: newBooking.serviceId,
        enrolledServiceName: newBooking.serviceTitle,
        startDate: newBooking.date,
        overallProgress: 15,
        weeklyImplementationHours: 8.0,
        productivityGainPercent: 20,
        standardizedPromptsCount: 4,
        skillsAcquired: ['Initial AI Diagnostic', 'Security Readiness'],
        milestones: [
          {
            id: `m-init-1`,
            phase: 'Phase 1',
            timeframe: 'Week 1-2',
            title: 'Diagnostic Audit & Technical Baseline',
            description: `Teardown of ${newBooking.organization}'s current workflows and establishing core system prompts.`,
            status: 'in_progress',
            deliverables: ['Baseline Metric Scorecard', 'Standardized System Prompt', 'Security Guardrail Charter'],
            progressPercent: 25
          },
          {
            id: `m-init-2`,
            phase: 'Phase 2',
            timeframe: 'Week 3-4',
            title: 'Applied Workflow Prototype',
            description: 'Deploy first automated agentic loop into staging.',
            status: 'upcoming',
            deliverables: ['Working Model Prototype', 'Evaluation Suite', 'Error Handling Matrix'],
            progressPercent: 0
          },
          {
            id: `m-init-3`,
            phase: 'Phase 3',
            timeframe: 'Week 5-6',
            title: 'Team Enablement & Governance',
            description: 'Empower operational teams and establish continuous review cadence.',
            status: 'upcoming',
            deliverables: ['Team Playbook', 'Handoff Workshop', 'ROI Report'],
            progressPercent: 0
          }
        ],
        actionItems: [
          {
            id: `act-init-1`,
            title: `Review intake context for ${newBooking.serviceTitle}`,
            category: 'Preparation',
            dueDate: newBooking.date,
            completed: false,
            priority: 'high'
          },
          {
            id: `act-init-2`,
            title: 'Gather existing team prompts and document samples for teardown',
            category: 'Audit',
            dueDate: newBooking.date,
            completed: false,
            priority: 'medium'
          }
        ],
        sessionNotes: [],
        reflections: []
      };

      const updatedClientsList = [newClientProfile, ...clients];
      setClients(updatedClientsList);
      setActiveClientId(newClientProfile.id);
    }

    showToast(`Session successfully scheduled for ${newBooking.clientName}! Profile synced with Progress Tracker.`);
  };

  // Update client from Progress Tracker
  const handleUpdateClient = (updatedClient: ClientProfile) => {
    const updated = clients.map(c => c.id === updatedClient.id ? updatedClient : c);
    setClients(updated);
  };

  // Open AI Brief Modal
  const handleOpenAiBrief = (client: ClientProfile) => {
    setBriefClient(client);
    setIsBriefOpen(true);
  };

  // Apply Diagnostic Recommendation
  const handleApplyDiagnosticRecommendation = (serviceId: string, notes: string) => {
    const foundService = services.find(s => s.id === serviceId) || services[0];
    setPreSelectedService(foundService);
    if (foundService.packages.length > 0) {
      setPreSelectedPackage(foundService.packages[0]);
    }
    setIsSchedulingOpen(true);
    showToast(`Recommended service loaded: ${foundService.title}`);
  };

  // Update booking status in coach view
  const handleUpdateBookingStatus = (bookingId: string, status: 'upcoming' | 'completed' | 'cancelled') => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status } : b);
    setBookings(updated);
    showToast(`Session booking updated to ${status}.`);
  };

  // Add new service from coach view
  const handleAddNewService = (newService: CoachingService) => {
    const updated = [newService, ...services];
    setServices(updated);
    showToast(`New service "${newService.title}" launched and added to public catalog!`);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => {
          setPreSelectedService(null);
          setPreSelectedPackage(null);
          setIsSchedulingOpen(true);
        }}
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
        isCoachView={isCoachView}
        setIsCoachView={setIsCoachView}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 border border-emerald-500/50 shadow-2xl shadow-black/80 flex items-center gap-3 text-xs text-white max-w-md animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="leading-relaxed">{toastMessage}</span>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1">
        
        {/* If Coach Business Mode is Active */}
        {isCoachView ? (
          <CoachAdminView
            bookings={bookings}
            clients={clients}
            services={services}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onSelectClientForInspection={(clientId) => {
              setActiveClientId(clientId);
              setIsCoachView(false);
              setActiveTab('tracker');
            }}
            onAddNewService={handleAddNewService}
          />
        ) : (
          <>
            {/* OVERVIEW / HOME VIEW */}
            {activeTab === 'overview' && (
              <>
                <HeroSection
                  onScheduleClick={() => {
                    setPreSelectedService(null);
                    setPreSelectedPackage(null);
                    setIsSchedulingOpen(true);
                  }}
                  onDiagnosticClick={() => setIsDiagnosticOpen(true)}
                  onExploreServices={() => setActiveTab('services')}
                />

                <ServicesCatalog
                  services={services}
                  onSelectServiceAndPackage={handleSelectServiceAndPackage}
                  onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
                />

                <ClientProgressTracker
                  clients={clients}
                  activeClientId={activeClientId}
                  onSelectClient={setActiveClientId}
                  onUpdateClient={handleUpdateClient}
                  onOpenSchedule={() => {
                    setPreSelectedService(null);
                    setPreSelectedPackage(null);
                    setIsSchedulingOpen(true);
                  }}
                  onGenerateAiBrief={handleOpenAiBrief}
                />

                <AiSimulationLab />
              </>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <ServicesCatalog
                services={services}
                onSelectServiceAndPackage={handleSelectServiceAndPackage}
                onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
              />
            )}

            {/* PROGRESS TRACKER TAB */}
            {activeTab === 'tracker' && (
              <ClientProgressTracker
                clients={clients}
                activeClientId={activeClientId}
                onSelectClient={setActiveClientId}
                onUpdateClient={handleUpdateClient}
                onOpenSchedule={() => {
                  setPreSelectedService(null);
                  setPreSelectedPackage(null);
                  setIsSchedulingOpen(true);
                }}
                onGenerateAiBrief={handleOpenAiBrief}
              />
            )}

            {/* AI SIMULATION LAB TAB */}
            {activeTab === 'simulation' && (
              <AiSimulationLab />
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <Footer
        onScheduleClick={() => {
          setPreSelectedService(null);
          setPreSelectedPackage(null);
          setIsSchedulingOpen(true);
        }}
        onDiagnosticClick={() => setIsDiagnosticOpen(true)}
        onNavigateTab={(tab) => {
          setIsCoachView(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Scheduling Engine Modal */}
      <SchedulingModal
        isOpen={isSchedulingOpen}
        onClose={() => setIsSchedulingOpen(false)}
        services={services}
        preSelectedService={preSelectedService}
        preSelectedPackage={preSelectedPackage}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* AI Diagnostic Modal */}
      <AiDiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        services={services}
        onApplyRecommendation={handleApplyDiagnosticRecommendation}
      />

      {/* AI Pre-Session Brief Modal */}
      <AiPreSessionBriefModal
        isOpen={isBriefOpen}
        onClose={() => setIsBriefOpen(false)}
        client={briefClient}
      />

    </div>
  );
}
