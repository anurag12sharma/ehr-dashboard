import mongoose, { Schema, Document } from 'mongoose';

// ---- Types ----

export interface IMedicalHistoryEntry {
  condition: string;
  diagnosisDate?: string;
  notes?: string;
}

export interface IAllergyEntry {
  substance: string;
  reaction?: string;
  severity?: string;
  notes?: string;
}

export interface IPatient extends Document {
  fhirId: string;
  resourceType: string;
  active: boolean;
  // --- Demographics ---
  name: {
    family: string;
    given: string[];
  }[];
  gender: string;
  birthDate: string;
  // --- Contact ---
  telecom: {
    system: string;
    value: string;
    use?: string;
    rank?: number;
  }[];
  address: {
    use?: string;
    type?: string;
    line: string[];
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;    
  }[];
  // --- System/ID ---
  identifier: {
    system: string;
    value: string;
  }[];
  extension?: any[];
  maritalStatus?: any;
  deceasedBoolean?: boolean;
  meta?: any;
  medicalHistory?: IMedicalHistoryEntry[];
  allergies?: IAllergyEntry[];
  createdAt: Date;
  updatedAt: Date;
}

// ---- Schemas ----

const AddressSchema = new Schema({
  use: String,
  type: String,
  line: [String],
  city: String,
  state: String,
  country: String,  
  postalCode: String,
}, { _id: false });

const MedicalHistoryEntrySchema = new Schema({
  condition: { type: String, required: true },
  diagnosisDate: String,
  notes: String,
}, { _id: false });

const AllergyEntrySchema = new Schema({
  substance: { type: String, required: true },
  reaction: String,
  severity: String,
  notes: String,
}, { _id: false });

const PatientSchema = new Schema<IPatient>({
  fhirId: { type: String, required: true, unique: true },
  resourceType: { type: String, default: 'Patient' },
  active: { type: Boolean, default: true },
  // --- Demographics ---
  name: [{
    family: { type: String, required: true },
    given: [String]
  }],
  gender: { type: String, required: true },
  birthDate: { type: String, required: true },
  // --- Contact ---
  telecom: [{
    system: { type: String, required: true },  // 'phone', 'email', etc.
    value: { type: String, required: true },
    use: String,
    rank: Number
  }],
  address: [AddressSchema],
  // --- System/ID ---
  identifier: [{
    system: { type: String, required: true },
    value: { type: String, required: true }
  }],
  extension: [Schema.Types.Mixed],
  maritalStatus: Schema.Types.Mixed,
  deceasedBoolean: Boolean,
  meta: Schema.Types.Mixed,
  // --- Extended fields ---
  medicalHistory: [MedicalHistoryEntrySchema],
  allergies: [AllergyEntrySchema],
}, {
  timestamps: true
});

export const Patient = mongoose.models.Patient || mongoose.model<IPatient>('Patient', PatientSchema);
