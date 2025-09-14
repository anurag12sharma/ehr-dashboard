/**
 * FHIR R4 Patient Resource Types
 * Based on HL7 FHIR R4 specification
 */

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
  
  export interface FHIRPatient {
    resourceType: 'Patient';
    id?: string;
    meta?: {
      versionId?: string;
      lastUpdated?: string;
      profile?: string[];
    };
    identifier?: FHIRIdentifier[];
    active?: boolean;
    name?: FHIRHumanName[];
    telecom?: FHIRContactPoint[];
    gender?: 'male' | 'female' | 'other' | 'unknown';
    birthDate?: string; // YYYY-MM-DD format
    deceased?: boolean | string;
    address?: FHIRAddress[];
    maritalStatus?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    };
    contact?: FHIRPatientContact[];
    communication?: Array<{
      language: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
        text?: string;
      };
      preferred?: boolean;
    }>;
    generalPractitioner?: Array<{
      reference?: string;
      display?: string;
    }>;
  }
  
  /**
   * Simplified Patient for forms and UI
   */
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
  }
  
  /**
   * Patient list item for tables/cards
   */
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
  