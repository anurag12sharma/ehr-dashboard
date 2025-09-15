import mongoose, { Schema, Document } from 'mongoose';

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
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema({
  use: String,
  type: String,
  line: [String],          // ⬅️ this is the only correct way for FHIR "line"
  city: String,
  state: String,
  postalCode: String,
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
  address: [AddressSchema],         // ⬅️ this is correct: array of AddressSchema
  identifier: [{
    system: { type: String, required: true },
    value: { type: String, required: true }
  }],
  extension: [Schema.Types.Mixed],
  maritalStatus: Schema.Types.Mixed,
  deceasedBoolean: Boolean,
  meta: Schema.Types.Mixed
}, {
  timestamps: true
});

export const Patient = mongoose.models.Patient || mongoose.model<IPatient>('Patient', PatientSchema);
