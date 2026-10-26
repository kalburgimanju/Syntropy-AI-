import React, { useState } from 'react';
import { CoachingService, ServicePackage, Booking } from '../types/coaching';
import { X, Calendar as CalendarIcon, Clock, CheckCircle2, Download, Video, ArrowRight, ArrowLeft, Globe, User, Mail, Building, FileText } from 'lucide-react';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: CoachingService[];
  preSelectedService?: CoachingService | null;
  preSelectedPackage?: ServicePackage | null;
  onBookingConfirmed: (newBooking: Booking) => void;
}

export const SchedulingModal: React.FC<SchedulingModalProps> = ({
  isOpen,
  onClose,
  services,
  preSelectedService,
  preSelectedPackage,
  onBookingConfirmed,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preSelectedService?.id || services[0]?.id || ''
  );
  const currentService = services.find(s => s.id === selectedServiceId) || services[0];

  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    preSelectedPackage?.id || currentService?.packages[0]?.id || ''
  );
  const currentPackage = currentService?.packages.find(p => p.id === selectedPackageId) || currentService?.packages[0];

  // Date and Time State
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM - 11:15 AM EST');
  const [timeZone, setTimeZone] = useState<string>('America/New_York (EST)');

  // Client Details Form
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const availableSlots = [
    '09:00 AM - 10:15 AM EST',
    '10:30 AM - 11:45 AM EST',
    '01:00 PM - 02:15 PM EST',
    '02:30 PM - 03:45 PM EST',
    '04:00 PM - 05:15 PM EST',
    '06:00 PM - 07:15 PM EST',
  ];

  const timeZones = [
    'America/New_York (EST)',
    'America/Chicago (CST)',
    'America/Los_Angeles (PST)',
    'Europe/London (GMT)',
    'Europe/Berlin (CET)',
    'Asia/Singapore (SGT)',
    'Asia/Tokyo (JST)',
    'Asia/Kolkata (IST)',
  ];

  const validateClientForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!clientName.trim()) errors.name = 'Full name is required';
    if (!clientEmail.trim() || !clientEmail.includes('@')) errors.email = 'Valid work email is required';
    if (!organization.trim()) errors.organization = 'Organization / Company is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmBooking = () => {
    if (!validateClientForm()) return;

    const newBooking: Booking = {
      id: `book-${Date.now().toString().slice(-6)}`,
      serviceId: currentService.id,
      serviceTitle: currentService.title,
      packageId: currentPackage.id,
      packageName: currentPackage.name,
      price: currentPackage.price,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      organization: organization.trim(),
      date: selectedDate,
      timeSlot: selectedSlot,
      timeZone: timeZone,
      notes: notes.trim(),
      status: 'upcoming',
      meetingUrl: 'https://meet.google.com/ais-syntropy-coaching',
      createdAt: new Date().toISOString()
    };

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
    setStep(4);
  };

  const downloadIcsCalendar = () => {
    if (!confirmedBooking) return;
    const dateFormatted = confirmedBooking.date.replace(/-/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Syntropy AI Coaching//Scheduling Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${confirmedBooking.id}@syntropy-ai.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${dateFormatted}T140000Z`,
      `DTEND:${dateFormatted}T151500Z`,
      `SUMMARY:AI Coaching: ${confirmedBooking.serviceTitle}`,
      `DESCRIPTION:AI Coaching Advisory Session with Principal Coach Sarah Lin.\\nMeeting Link: ${confirmedBooking.meetingUrl}\\nClient Notes: ${confirmedBooking.notes || 'None'}`,
      `LOCATION:${confirmedBooking.meetingUrl}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Syntropy-AI-Coaching-${confirmedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
              Session Booking Engine
            </div>
            <div className="text-sm font-bold text-white">
              {step === 4 ? 'Appointment Confirmed' : `Step ${step} of 3: ${
                step === 1 ? 'Select Service & Tier' : step === 2 ? 'Choose Date & Time' : 'Client Intake Profile'
              }`}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: SERVICE & PACKAGE SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Select Coaching Program
                </label>
                <select
                  value={selectedServiceId}
                  onChange={e => {
                    setSelectedServiceId(e.target.value);
                    const s = services.find(x => x.id === e.target.value);
                    if (s && s.packages.length > 0) {
                      setSelectedPackageId(s.packages[0].id);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1.5">
                  {currentService.tagline}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Select Format & Cadence
                </label>
                <div className="space-y-3">
                  {currentService.packages.map(pkg => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedPackageId === pkg.id
                          ? 'bg-indigo-950/30 border-indigo-500 ring-1 ring-indigo-500/40'
                          : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-white">{pkg.name}</span>
                        <span className="text-base font-bold font-mono text-indigo-300 tabular-nums">
                          ${pkg.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mb-1">
                        Duration: {pkg.duration}
                      </div>
                      <div className="text-xs text-slate-400 leading-relaxed">
                        {pkg.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <span>Continue to Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME SELECTION */}
          {step === 2 && (
            <div className="space-y-6">
              
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">{currentService.title}</div>
                  <div className="text-xs text-slate-400">{currentPackage.name} (${currentPackage.price})</div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-indigo-400 hover:underline"
                >
                  Change
                </button>
              </div>

              {/* Date Input & Quick Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Session Date
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
                    <CalendarIcon className="w-4 h-4 text-indigo-400" />
                    <span>Guaranteed availability</span>
                  </div>
                </div>
              </div>

              {/* Time Zone */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Client Time Zone
                </label>
                <select
                  value={timeZone}
                  onChange={e => setTimeZone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {timeZones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                  Available Consultation Slots
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {availableSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-lg border text-xs font-mono font-medium text-left transition-all flex items-center justify-between ${
                        selectedSlot === slot
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                          : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="tabular-nums">{slot}</span>
                      {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <span>Continue to Intake Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: CLIENT INTAKE FORM */}
          {step === 3 && (
            <div className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Dr. Alex Mercer"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.name ? 'border-rose-500' : 'border-slate-700'
                      }`}
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-[11px] text-rose-400 mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Work Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="alex@enterprise.com"
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      formErrors.email ? 'border-rose-500' : 'border-slate-700'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-rose-400 mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Organization / Company *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vanguard Systems"
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      formErrors.organization ? 'border-rose-500' : 'border-slate-700'
                    }`}
                  />
                  {formErrors.organization && (
                    <p className="text-[11px] text-rose-400 mt-1">{formErrors.organization}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Current Role / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VP Engineering, Product Lead"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Primary Objective & Technical Blockers
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your current tech stack, target workflow goals, and key questions you want to dissect during the session..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                />
              </div>

              {/* Summary snippet */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white">Date:</span> {selectedDate} · <span className="font-semibold text-white">Slot:</span> {selectedSlot}
                </div>
                <div className="font-mono font-bold text-indigo-400 tabular-nums">
                  ${currentPackage.price}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all whitespace-nowrap shrink-0"
                >
                  <span>Confirm & Lock In Session</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 4: CONFIRMATION & CALENDAR ACTIONS */}
          {step === 4 && confirmedBooking && (
            <div className="text-center py-4 space-y-6">
              
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-1.5">
                  Coaching Session Confirmed!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  A calendar invite and preparation agenda have been reserved for {confirmedBooking.clientName} ({confirmedBooking.clientEmail}).
                </p>
              </div>

              {/* Details card */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2">
                <div className="flex justify-between pb-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-semibold text-white text-right">{confirmedBooking.serviceTitle}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Package:</span>
                  <span className="text-slate-200">{confirmedBooking.packageName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Date & Slot:</span>
                  <span className="font-mono text-indigo-300 tabular-nums">{confirmedBooking.date} · {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Virtual Meeting:</span>
                  <a
                    href={confirmedBooking.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Video Room</span>
                  </a>
                </div>
              </div>

              {/* Calendar Download Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={downloadIcsCalendar}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4 text-indigo-400" />
                  <span>Download .ICS Calendar Event</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Done & View in Portal</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
