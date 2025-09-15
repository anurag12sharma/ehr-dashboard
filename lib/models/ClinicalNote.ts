import mongoose, { Schema, Document } from 'mongoose';

export interface IClinicalNote extends Document {
  fhirId: string;
  resourceType: string;
  status: string; // e.g. 'final', 'draft'
  patientId: string;
  authorId: string;
  authorName: string;
  category: string; // e.g. 'progress', 'discharge', etc.
  type: string;     // e.g. 'clinical-note'
  title: string;
  content: string;
  encounterId?: string;
  date: string;     // ISO string
  meta?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const ClinicalNoteSchema = new Schema<IClinicalNote>({
  fhirId: { type: String, required: true, unique: true },
  resourceType: { type: String, default: 'ClinicalNote' },
  status: { type: String, default: 'final' },
  patientId: { type: String, required: true },
  authorId: { type: String, required: true },
  authorName: { type: String, required: true },
  category: { type: String, default: 'progress' },
  type: { type: String, default: 'clinical-note' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  encounterId: { type: String },
  date: { type: String, required: true }, // ISO date string
  meta: { type: Schema.Types.Mixed },
}, {
  timestamps: true
});

export const ClinicalNote = mongoose.models.ClinicalNote || mongoose.model<IClinicalNote>('ClinicalNote', ClinicalNoteSchema);
