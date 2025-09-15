import { PatientSummary, AppointmentSummary } from "@/types/fhir";
import { IPatient } from "@/lib/models/Patient";
import { IAppointment } from "@/lib/models/Appointment";
import { IClinicalNote } from "@/lib/models/ClinicalNote";

// --- Patient summary for rows/cards ---
export function transformPatientToSummary(patient: IPatient): PatientSummary {
  const primaryName = patient.name?.[0] || { family: "", given: [] };
  const primaryPhone =
    patient.telecom?.find((t) => t.system === "phone")?.value || "";
  const primaryEmail =
    patient.telecom?.find((t) => t.system === "email")?.value || "";
  const id = patient.fhirId || (patient as { id?: string }).id || "";
  return {
    id,
    name: [primaryName.given?.[0], primaryName.family]
      .filter(Boolean)
      .join(" ")
      .trim(),
    email: primaryEmail,
    phone: primaryPhone,
    birthDate: patient.birthDate || "",
    gender: patient.gender,
    age: calculateAge(patient.birthDate),
    active: typeof patient.active === "boolean" ? patient.active : true,
  };
}

// --- Patient Full Detail ---
export function transformPatientToDetail(patient: IPatient) {
  const summary = transformPatientToSummary(patient);
  return {
    ...summary,
    id: patient.fhirId || (patient as { id?: string }).id || "",
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

// --- Appointment Summary ---
export function transformAppointmentToSummary(
  appointment: IAppointment
): AppointmentSummary {
  const patient = appointment.participant?.find((p) =>
    p.actor?.reference?.includes("Patient")
  );
  const practitioner = appointment.participant?.find((p) =>
    p.actor?.reference?.includes("Practitioner")
  );
  const startDate = new Date(appointment.start);
  const today = new Date().toDateString();
  return {
    id: appointment.fhirId,
    patientId: patient?.actor?.reference?.split("/").pop() || "",
    title:
      appointment.description ||
      appointment.appointmentType?.coding?.[0]?.display ||
      "Medical Appointment",
    patientName: patient?.actor?.display || "Unknown Patient",
    practitionerName: practitioner?.actor?.display || "Unknown Practitioner",
    startDateTime: appointment.start,
    endDateTime: appointment.end,
    duration: appointment.minutesDuration || 30,
    status: appointment.status,
    appointmentType:
      appointment.appointmentType?.coding?.[0]?.code || "consultation",
    location: "Main Office", // Can extract dynamically if needed
    reason: appointment.reasonReference?.[0]?.display || "",
    priority: appointment.priority === 1 ? "urgent" : "routine",
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

// --- Main update (create/edit) DB transformer ---
type PatientFormData = {
  id?: string;
  active?: boolean;
  firstName?: string;
  lastName?: string;
  gender?: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  medicalHistory?: IPatient["medicalHistory"];
  allergies?: IPatient["allergies"];
};

export function transformPatientFormToDatabase(
  formData: PatientFormData
): Partial<IPatient> {
  return {
    fhirId: formData.id || `patient-${Date.now()}`,
    active: formData.active ?? true,
    name: [
      {
        family: formData.lastName || "",
        given: [formData.firstName || ""],
      },
    ],
    gender: formData.gender || "unknown",
    birthDate: formData.birthDate || "",
    telecom: [
      ...(formData.phone
        ? [
            {
              system: "phone",
              value: formData.phone,
              use: "home",
              rank: 1,
            },
          ]
        : []),
      ...(formData.email
        ? [
            {
              system: "email",
              value: formData.email,
            },
          ]
        : []),
    ],
    address: formData.address
      ? [
          {
            use: "home",
            type: "both",
            line: [
              formData.address.line1 || "",
              ...(formData.address.line2 ? [formData.address.line2] : []),
            ],
            city: formData.address.city || "",
            state: formData.address.state || "",
            postalCode: formData.address.postalCode || "",
            country: formData.address.country || "",
          },
        ]
      : [],
    identifier: [
      {
        system: "PMS",
        value: formData.id || `patient-${Date.now()}`,
      },
    ],
    medicalHistory: formData.medicalHistory || [],
    allergies: formData.allergies || [],
  };
}

type AppointmentFormData = {
  id?: string;
  status?: string;
  appointmentType?: string;
  title?: string;
  reason?: string;
  startDateTime: string;
  endDateTime?: string;
  duration?: number;
  priority?: "urgent" | "routine";
  patientId: string;
  patientName?: string;
  practitionerId?: string;
  practitionerName?: string;
};

export function transformAppointmentFormToDatabase(
  formData: AppointmentFormData
): Partial<IAppointment> {
  const startDate = new Date(formData.startDateTime);
  const durationMs = (formData.duration || 30) * 60000;
  const endDate = formData.endDateTime
    ? new Date(formData.endDateTime)
    : new Date(startDate.getTime() + durationMs);

  return {
    fhirId: formData.id || `appointment-${Date.now()}`,
    status: formData.status || "booked",
    appointmentType: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/v2-0276",
          code: formData.appointmentType || "ROUTINE",
          display: formData.title || "Medical Appointment",
        },
      ],
    },
    description: formData.title || formData.reason || "Medical Appointment",
    start: startDate.toISOString(),
    end: endDate.toISOString(),
    minutesDuration: formData.duration || 30,
    priority: formData.priority === "urgent" ? 1 : 5,
    participant: [
      {
        actor: {
          reference: `Patient/${formData.patientId}`,
          display: formData.patientName || "Unknown Patient",
        },
        required: "required",
        status: "accepted",
      },
      ...(formData.practitionerName
        ? [
            {
              actor: {
                reference: `Practitioner/${
                  formData.practitionerId || "unknown"
                }`,
                display: formData.practitionerName,
              },
              required: "required",
              status: "accepted",
            },
          ]
        : []),
    ],
    reasonReference: formData.reason
      ? [
          {
            reference: "",
            display: formData.reason,
          },
        ]
      : [],
  };
}

// --- Clinical Note Summary (for table/card/list) ---
export function transformClinicalNoteToSummary(note: IClinicalNote) {
  return {
    id: note.fhirId || note._id?.toString() || "",
    patientId: note.patientId,
    authorId: note.authorId,
    authorName: note.authorName,
    category: note.category || "progress",
    type: note.type || "clinical-note",
    status: note.status || "final",
    title: note.title,
    date: note.date,
    content: note.content,
    encounterId: note.encounterId || null,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  };
}

type ClinicalNoteFormData = {
  id?: string;
  patientId: string;
  authorId: string;
  authorName: string;
  category?: string;
  type?: string;
  status?: string;
  title: string;
  date?: string;
  content: string;
  encounterId?: string;
  meta?: unknown;
};

export function transformClinicalNoteFormToDatabase(
  formData: ClinicalNoteFormData
): Partial<IClinicalNote> {
  return {
    fhirId: formData.id || `clinical-note-${Date.now()}`,
    patientId: formData.patientId,
    authorId: formData.authorId,
    authorName: formData.authorName,
    category: formData.category || "progress",
    type: formData.type || "clinical-note",
    status: formData.status || "final",
    title: formData.title,
    date: formData.date || new Date().toISOString(),
    content: formData.content,
    encounterId: formData.encounterId || undefined,
    meta:
      typeof formData.meta === "object" &&
      formData.meta !== null &&
      !Array.isArray(formData.meta)
        ? (formData.meta as Record<string, unknown>)
        : undefined,
  };
}
