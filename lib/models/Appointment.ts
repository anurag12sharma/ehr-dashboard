import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  fhirId: string;
  resourceType: string;
  status: string;
  serviceType: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
  }[];
  appointmentType: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
  };
  reasonReference: {
    reference: string;
    display: string;
  }[];
  priority: number;
  description: string;
  start: string;
  end: string;
  minutesDuration: number;
  slot: {
    reference: string;
  }[];
  participant: {
    actor: {
      reference: string;
      display: string;
    };
    required: string;
    status: string;
  }[];
  meta?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>({
  fhirId: { type: String, required: true, unique: true },
  resourceType: { type: String, default: 'Appointment' },
  status: { type: String, required: true },
  serviceType: [{
    coding: [{
      system: String,
      code: String,
      display: String
    }]
  }],
  appointmentType: {
    coding: [{
      system: String,
      code: String,
      display: String
    }]
  },
  reasonReference: [{
    reference: String,
    display: String
  }],
  priority: { type: Number, default: 5 },
  description: String,
  start: { type: String, required: true },
  end: { type: String, required: true },
  minutesDuration: Number,
  slot: [{
    reference: String
  }],
  participant: [{
    actor: {
      reference: String,
      display: String
    },
    required: String,
    status: String
  }],
  meta: Schema.Types.Mixed
}, {
  timestamps: true
});

export const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
