import { PatientSummary, AppointmentSummary } from '@/types/fhir';
import { IPatient } from '@/lib/models/Patient';
import { IAppointment } from '@/lib/models/Appointment';

// ------------------- Patient summary for rows/cards -------------------
export function transformPatientToSummary(patient: IPatient): PatientSummary {
  const primaryName = patient.name?.[0] || { family: '', given: [] };
  const primaryPhone = patient.telecom?.find(t => t.system === 'phone')?.value || '';
  const primaryEmail = patient.telecom?.find(t => t.system === 'email')?.value || '';
  const id = patient.fhirId || (patient as any).id || '';
  return {
    id,
    name: [primaryName.given?.[0], primaryName.family].filter(Boolean).join(' ').trim(),
    email: primaryEmail,
    phone: primaryPhone,
    birthDate: patient.birthDate || '',
    gender: patient.gender,
    age: calculateAge(patient.birthDate),
    active: typeof patient.active === 'boolean' ? patient.active : true,
  };
}

// ------------------- Patient FULL detail (demographics, history, allergies, etc) -------------------
export function transformPatientToDetail(patient: IPatient) {
  const summary = transformPatientToSummary(patient);
  return {
    ...summary,
    id: patient.fhirId || (patient as any).id || '',
    identifiers: patient.identifier || [],
    address: patient.address?.[0] || {},
    maritalStatus: patient.maritalStatus || null,
    deceasedBoolean: patient.deceasedBoolean || false,
    meta: patient.meta || null,
    extension: patient.extension || [],
    medicalHistory: patient.medicalHistory || [],
    allergies: patient.allergies || [],
    createdAt: patient.createdAt,
    updatedAt: patient.updatedAt,
  };
}

// ------------------- Appointment summary -------------------
export function transformAppointmentToSummary(appointment: IAppointment): AppointmentSummary {
  const patient = appointment.participant?.find(p => p.actor?.reference?.includes('Patient'));
  const practitioner = appointment.participant?.find(p => p.actor?.reference?.includes('Practitioner'));

  const startDate = new Date(appointment.start);
  const today = new Date().toDateString();

  return {
    id: appointment.fhirId,
    patientId: patient?.actor?.reference?.split('/').pop() || '',
    title:
      appointment.description ||
      appointment.appointmentType?.coding?.[0]?.display ||
      'Medical Appointment',
    patientName: patient?.actor?.display || 'Unknown Patient',
    practitionerName: practitioner?.actor?.display || 'Unknown Practitioner',
    startDateTime: appointment.start,
    endDateTime: appointment.end,
    duration: appointment.minutesDuration || 30,
    status: appointment.status,
    appointmentType: appointment.appointmentType?.coding?.[0]?.code || 'consultation',
    location: 'Main Office', // Can extract dynamically if needed
    reason: appointment.reasonReference?.[0]?.display || '',
    priority: appointment.priority === 1 ? 'urgent' : 'routine',
    isToday: startDate.toDateString() === today,
    isUpcoming: startDate > new Date(),
  };
}

function calculateAge(birthDate: string): number {
  if (!birthDate) return 0;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// --------------- Main update (create/edit) DB transformer ---------------
export function transformPatientFormToDatabase(formData: any): Partial<IPatient> {
  return {
    fhirId: formData.id || `patient-${Date.now()}`,
    active: formData.active ?? true,
    // ----- Demographic -----
    name: [{
      family: formData.lastName || '',
      given: [formData.firstName || '']
    }],
    gender: formData.gender || 'unknown',
    birthDate: formData.birthDate || '',
    // ----- Contact -----
    telecom: [
      ...(formData.phone ? [{
        system: 'phone',
        value: formData.phone,
        use: 'home',
        rank: 1
      }] : []),
      ...(formData.email ? [{
        system: 'email',
        value: formData.email
      }] : [])
    ],
    address: formData.address ? [{
      use: 'home',
      type: 'both',
      line: [
        formData.address.line1 || '',
        ...(formData.address.line2 ? [formData.address.line2] : [])
      ],
      city: formData.address.city || '',
      state: formData.address.state || '',
      postalCode: formData.address.postalCode || '',
      country: formData.address.country || ''
    }] : [],
    identifier: [{
      system: 'PMS',
      value: formData.id || `patient-${Date.now()}`
    }],
    // Extended fields:
    medicalHistory: formData.medicalHistory || [],
    allergies: formData.allergies || [],
  };
}

export function transformAppointmentFormToDatabase(formData: any): Partial<IAppointment> {
  const startDate = new Date(formData.startDateTime);
  const durationMs = (formData.duration || 30) * 60000;
  const endDate = formData.endDateTime
    ? new Date(formData.endDateTime)
    : new Date(startDate.getTime() + durationMs);

  return {
    fhirId: formData.id || `appointment-${Date.now()}`,
    status: formData.status || 'booked',
    appointmentType: {
      coding: [{
        system: 'http://terminology.hl7.org/CodeSystem/v2-0276',
        code: formData.appointmentType || 'ROUTINE',
        display: formData.title || 'Medical Appointment'
      }]
    },
    description: formData.title || formData.reason || 'Medical Appointment',
    start: startDate.toISOString(),
    end: endDate.toISOString(),
    minutesDuration: formData.duration || 30,
    priority: formData.priority === 'urgent' ? 1 : 5,
    // Participants: always include patient. Practitioner only if present.
    participant: [
      {
        actor: {
          reference: `Patient/${formData.patientId}`,
          display: formData.patientName || 'Unknown Patient'
        },
        required: 'required',
        status: 'accepted'
      },
      ...(formData.practitionerName ? [{
        actor: {
          reference: `Practitioner/${formData.practitionerId || 'unknown'}`,
          display: formData.practitionerName
        },
        required: 'required',
        status: 'accepted'
      }] : [])
    ],
    reasonReference: formData.reason ? [{
      reference: '',
      display: formData.reason
    }] : [],
    // Add other supported fields as needed (serviceType, slot, etc) without deleting existing properties
  };
}

// --- Clinical Note Summary (for table/card/list) ---
export function transformClinicalNoteToSummary(note: any) {
  return {
    id: note.fhirId || note._id?.toString() || '',
    patientId: note.patientId,
    authorId: note.authorId,
    authorName: note.authorName,
    category: note.category || 'progress',
    type: note.type || 'clinical-note',
    status: note.status || 'final',
    title: note.title,
    date: note.date,
    content: note.content,
    encounterId: note.encounterId || null,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  };
}

// --- Clinical Note DB Transformer (for create/edit) ---
export function transformClinicalNoteFormToDatabase(formData: any) {
  return {
    fhirId: formData.id || `clinical-note-${Date.now()}`,
    patientId: formData.patientId,
    authorId: formData.authorId,
    authorName: formData.authorName,
    category: formData.category || 'progress',
    type: formData.type || 'clinical-note',
    status: formData.status || 'final',
    title: formData.title,
    date: formData.date || new Date().toISOString(),
    content: formData.content,
    encounterId: formData.encounterId || undefined,
    meta: formData.meta || undefined,
  };
}

