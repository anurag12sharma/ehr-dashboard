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
  name: {
    family: string;
    given: string[];
  }[];
  telecom: {
    system: string;
    value: string;
    use?: string;
    rank?: number;
  }[];
  gender: string;
  birthDate: string;
  address: {
    use?: string;
    type?: string;
    line: string[];
    city?: string;
    state?: string;
    postalCode?: string;
  }[];
  identifier: {
    system: string;
    value: string;
  }[];
  extension?: any[];
  maritalStatus?: any;
  deceasedBoolean?: boolean;
  meta?: any;
  // New/Extended fields
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
  name: [{
    family: { type: String, required: true },
    given: [String]
  }],
  telecom: [{
    system: { type: String, required: true },
    value: { type: String, required: true },
    use: String,
    rank: Number
  }],
  gender: { type: String, required: true },
  birthDate: { type: String, required: true },
  address: [AddressSchema],
  identifier: [{
    system: { type: String, required: true },
    value: { type: String, required: true }
  }],
  extension: [Schema.Types.Mixed],
  maritalStatus: Schema.Types.Mixed,
  deceasedBoolean: Boolean,
  meta: Schema.Types.Mixed,
  // --------- New extended fields for detailed view ----------
  medicalHistory: [MedicalHistoryEntrySchema],
  allergies: [AllergyEntrySchema],
}, {
  timestamps: true
});

export const Patient = mongoose.models.Patient || mongoose.model<IPatient>('Patient', PatientSchema);
