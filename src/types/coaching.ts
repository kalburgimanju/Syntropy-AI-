export type CoachingCategory = 
  | 'executive' 
  | 'workflow' 
  | 'engineering' 
  | 'governance' 
  | 'tactical';

export interface ServicePackage {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  popular?: boolean;
}

export interface CoachingService {
  id: string;
  title: string;
  category: CoachingCategory;
  subtitle: string;
  tagline: string;
  description: string;
  targetAudience: string;
  deliverables: string[];
  curriculum: {
    title: string;
    description: string;
  }[];
  packages: ServicePackage[];
  typicalOutcomes: string;
  image?: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  packageId: string;
  packageName: string;
  price: number;
  clientName: string;
  clientEmail: string;
  organization: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM - 11:00 AM EST"
  timeZone: string;
  notes: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingUrl: string;
  createdAt: string;
}

export interface ActionItem {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface Milestone {
  id: string;
  phase: string;
  timeframe: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  deliverables: string[];
  progressPercent: number;
}

export interface SessionNote {
  id: string;
  date: string;
  sessionTitle: string;
  durationMinutes: number;
  keyTakeaways: string[];
  homework: string[];
  docLink?: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  enrolledServiceId: string;
  enrolledServiceName: string;
  startDate: string;
  overallProgress: number; // 0-100
  weeklyImplementationHours: number;
  productivityGainPercent: number;
  standardizedPromptsCount: number;
  skillsAcquired: string[];
  milestones: Milestone[];
  actionItems: ActionItem[];
  sessionNotes: SessionNote[];
  reflections: {
    id: string;
    date: string;
    win: string;
    blocker: string;
    coachFeedback?: string;
  }[];
}

export interface DiagnosticResult {
  recommendedServiceId: string;
  suggestedServiceTitle: string;
  executiveSummary: string;
  immediateWins: string[];
  firstSessionAgenda: string;
  estimatedTimeToImpact: string;
}

export interface PreSessionBrief {
  executiveFocus: string;
  probingQuestions: string[];
  recommendedHandsOnExercise: string;
  keyPitfallsToWatch: string;
  prepChecklist: string[];
}
