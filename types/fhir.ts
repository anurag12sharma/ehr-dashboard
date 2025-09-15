/**
 * FHIR R4 Patient Resource Types
 * Based on HL7 FHIR R4 specification
 */

// --- Demographics and Contact Info ---
export interface FHIRHumanName {
  use?: 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';
  family?: string;
  given?: string[];
  prefix?: string[];
  suffix?: string[];
  text?: string;
}

export interface FHIRContactPoint {
  system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
  value?: string;
  use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
  rank?: number;
}

export interface FHIRAddress {
  use?: 'home' | 'work' | 'temp' | 'old' | 'billing';
  type?: 'postal' | 'physical' | 'both';
  line?: string[];
  city?: string;
  district?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface FHIRIdentifier {
  use?: 'usual' | 'official' | 'temp' | 'secondary' | 'old';
  system?: string;
  value?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
}

export interface FHIRPatientContact {
  relationship?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  name?: FHIRHumanName;
  telecom?: FHIRContactPoint[];
  address?: FHIRAddress;
  gender?: 'male' | 'female' | 'other' | 'unknown';
}

// --- Extended Types for Medical History & Allergies ---
export interface MedicalHistoryEntry {
  condition: string;
  diagnosisDate?: string;
  notes?: string;
}
export interface AllergyEntry {
  substance: string;
  reaction?: string;
  severity?: string;
  notes?: string;
}

// --- Core FHIRPatient, with extensions for history/allergies ---
export interface FHIRPatient {
  resourceType: 'Patient';
  id?: string;
  meta?: FHIRMeta;
  extension?: FHIRExtension[];
  identifier?: FHIRIdentifier[];
  active?: boolean;
  name?: FHIRHumanName[];
  telecom?: FHIRContactPoint[];
  gender?: 'male' | 'female' | 'other' | 'unknown';
  birthDate?: string;
  deceasedBoolean?: boolean;
  deceasedDateTime?: string;
  address?: FHIRAddress[];
  maritalStatus?: FHIRCodeableConcept;
  contact?: FHIRPatientContact[];
  communication?: Array<{
    language: FHIRCodeableConcept;
    preferred?: boolean;
  }>;
  generalPractitioner?: Array<{
    reference?: string;
    display?: string;
  }>;
  // ---- Extensions ----
  medicalHistory?: MedicalHistoryEntry[];
  allergies?: AllergyEntry[];
}

// For forms and UI convenience
export interface PatientFormData {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  gender: 'male' | 'female' | 'other' | 'unknown';
  birthDate: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalRecordNumber?: string;
  active: boolean;
  // Optional support for input/edit:
  medicalHistory?: MedicalHistoryEntry[];
  allergies?: AllergyEntry[];
}

export interface PatientSummary {
  id: string;
  name: string;
  gender: string;
  birthDate: string;
  age: number;
  phone?: string;
  email?: string;
  lastVisit?: string;
  active: boolean;
}

// ---- Appointment Types (unchanged, but included for completeness) ----
export interface FHIRAppointmentParticipant {
  type?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  actor?: {
    reference?: string;
    display?: string;
  };
  required?: 'required' | 'optional' | 'information-only';
  status: 'accepted' | 'declined' | 'tentative' | 'needs-action';
  period?: {
    start?: string;
    end?: string;
  };
}

export interface FHIRAppointment {
  resourceType: 'Appointment';
  id?: string;
  meta?: FHIRMeta;
  identifier?: FHIRIdentifier[];
  status: 'proposed' | 'pending' | 'booked' | 'arrived' | 'fulfilled' | 'cancelled' | 'noshow' | 'entered-in-error' | 'checked-in' | 'waitlist';
  cancelationReason?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  serviceCategory?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  serviceType?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  specialty?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  appointmentType?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  reasonReference?: Array<{
    reference?: string;
    display?: string;
  }>;
  priority?: number;
  description?: string;
  supportingInformation?: Array<{
    reference?: string;
    display?: string;
  }>;
  start?: string; // dateTime
  end?: string; // dateTime
  minutesDuration?: number;
  slot?: Array<{
    reference?: string;
  }>;
  created?: string; // dateTime
  comment?: string;
  patientInstruction?: string;
  basedOn?: Array<{
    reference?: string;
  }>;
  participant: FHIRAppointmentParticipant[];
  requestedPeriod?: Array<{
    start?: string;
    end?: string;
  }>;
}

// ---- Simplified Appointment (UI) ----
export interface AppointmentFormData {
  id?: string;
  patientId: string;
  patientName?: string;
  practitionerId?: string;
  practitionerName?: string;
  title: string;
  description?: string;
  appointmentType: 'checkup' | 'consultation' | 'follow-up' | 'procedure' | 'emergency' | 'other';
  status: "booked" | "proposed" | "pending" | "arrived" | "fulfilled" | "cancelled" | "noshow" | "entered-in-error" | "checked-in" | "waitlist";
  startDateTime: string;
  endDateTime: string;
  duration: number;
  reason?: string;
  notes?: string;
  location?: string;
  priority: 'routine' | 'urgent' | 'stat';
  reminderSent?: boolean;
}

export interface AppointmentSummary {
  id: string;
  patientId: string;
  patientName: string;
  practitionerName?: string;
  title: string;
  appointmentType: string;
  status: string;
  startDateTime: string;
  endDateTime: string;
  duration: number;
  location?: string;
  priority: string;
  isUpcoming: boolean;
  isToday: boolean;
  reason?: string;    
}

// ---- FHIR Utility/support types ----
export interface FHIRMeta {
  lastUpdated?: string;
  versionId?: string;
  profile?: string[];
}

export interface FHIRExtension {
  url: string;
  valueString?: string;
  extension?: FHIRExtension[];
}

export interface FHIRCoding {
  system?: string;
  code?: string;
  display?: string;
}

export interface FHIRCodeableConcept {
  coding?: FHIRCoding[];
  text?: string;
}


export interface ClinicalNoteSummary {
  id: string;
  patientId: string;
  authorId: string;
  authorName: string;
  category: string;      // e.g. "progress", "discharge", etc.
  type: string;          // e.g. "clinical-note"
  status: string;        // e.g. "final", "draft"
  title: string;
  date: string;          // ISO date string
  content: string;
  encounterId?: string;
  createdAt?: string;
  updatedAt?: string;
}
