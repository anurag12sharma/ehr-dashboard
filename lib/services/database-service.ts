import connectDB from "@/lib/mongodb";
import { Patient, IPatient } from "@/lib/models/Patient";
import { Appointment, IAppointment } from "@/lib/models/Appointment";
import { ClinicalNote, IClinicalNote } from "@/lib/models/ClinicalNote";
import { PatientSummary, AppointmentSummary } from "@/types/fhir";

type Participant = {
  actor?: {
    reference?: string;
    display?: string;
  };
  [key: string]: unknown;
};

class DatabaseService {
  async init() {
    await connectDB();
  }

  // Patient Methods
  async getPatients(
    params: {
      filter?: Record<string, unknown>;
      search?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<IPatient[]> {
    await this.init();
    const { filter = {}, limit = 50, offset = 0 } = params;
    return Patient.find(filter)
      .limit(limit)
      .skip(offset)
      .sort({ updatedAt: -1 })
      .exec();
  }

  async getPatientById(id: string): Promise<IPatient | null> {
    await this.init();
    return Patient.findOne({ fhirId: id }).exec();
  }

  async createPatient(patientData: Partial<IPatient>): Promise<IPatient> {
    await this.init();
    const patient = new Patient(patientData);
    return patient.save();
  }

  async updatePatient(
    id: string,
    patientData: Partial<IPatient>
  ): Promise<IPatient | null> {
    await this.init();
    return Patient.findOneAndUpdate({ fhirId: id }, patientData, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async deletePatient(id: string): Promise<boolean> {
    await this.init();
    const result = await Patient.findOneAndDelete({ fhirId: id }).exec();
    return result !== null;
  }

  // ---- Appointment Methods ----
  async getAppointments(
    params: {
      startDate?: string;
      endDate?: string;
      patientId?: string;
      providerId?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<IAppointment[]> {
    await this.init();
    const {
      startDate,
      endDate,
      patientId,
      providerId,
      limit = 50,
      offset = 0,
    } = params;
    const query: Record<string, unknown> = {};

    // Date filtering
    if (startDate || endDate) {
      query.start = {};
      if (startDate || endDate) {
        query.start = {};
        if (startDate)
          (query.start as Record<string, string>).$gte = new Date(
            startDate
          ).toISOString();
        if (endDate)
          (query.start as Record<string, string>).$lte = new Date(
            endDate
          ).toISOString();
      }
    }

    // Patient filtering
    if (patientId) {
      query["participant.actor.reference"] = {
        $regex: `Patient/${patientId}`,
        $options: "i",
      };
    }
    // Provider filtering (matches any participant.actor.reference e.g. "Practitioner/123")
    if (providerId) {
      if (!query["participant.actor.reference"])
        query["participant.actor.reference"] = {};
      const ref = query["participant.actor.reference"];
      if (ref && typeof ref === "object" && "$regex" in ref) {
        const prevRegex = (ref as { $regex: string }).$regex;
        query.$or = [
          {
            "participant.actor.reference": { $regex: prevRegex, $options: "i" },
          },
          {
            "participant.actor.reference": {
              $regex: `Practitioner/${providerId}`,
              $options: "i",
            },
          },
        ];
        delete query["participant.actor.reference"];
      } else {
        query["participant.actor.reference"] = {
          $regex: `Practitioner/${providerId}`,
          $options: "i",
        };
      }
    }

    return Appointment.find(query)
      .limit(limit)
      .skip(offset)
      .sort({ start: 1 })
      .exec();
  }

  async getAppointmentById(id: string): Promise<IAppointment | null> {
    await this.init();
    return Appointment.findOne({ fhirId: id }).exec();
  }

  async createAppointment(
    appointmentData: Partial<IAppointment>
  ): Promise<IAppointment> {
    await this.init();
    const appointment = new Appointment(appointmentData);
    return appointment.save();
  }

  async updateAppointment(
    id: string,
    appointmentData: Partial<IAppointment>
  ): Promise<IAppointment | null> {
    await this.init();
    return Appointment.findOneAndUpdate({ fhirId: id }, appointmentData, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async deleteAppointment(id: string): Promise<boolean> {
    await this.init();
    const result = await Appointment.findOneAndDelete({ fhirId: id }).exec();
    return result !== null;
  }

  /**
   * Find a single overlapping appointment for any participant (provider, patient),
   * within [start, end]. Excludes appointment with excludeId (used when rescheduling).
   * Returns the conflicting appointment if found, or null.
   */
  async findConflictingAppointment(
    participants: Participant[],
    startIso: string,
    endIso: string,
    excludeId?: string
  ): Promise<IAppointment | null> {
    await this.init();
    if (!participants || !startIso || !endIso) return null;
    const providerRefs = participants
      .filter(
        (p) =>
          !!p.actor?.reference && p.actor.reference.startsWith("Practitioner/")
      )
      .map((p) => (p.actor as { reference: string }).reference);

    if (providerRefs.length === 0) return null;

    const query: Record<string, unknown> = {
      "participant.actor.reference": { $in: providerRefs },
      start: { $lt: endIso },
      end: { $gt: startIso },
    };
    if (excludeId) {
      query.fhirId = { $ne: excludeId };
    }
    return Appointment.findOne(query).exec();
  }

  // --- Clinical Note Methods ---
  async getClinicalNotes(
    params: {
      patientId?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<IClinicalNote[]> {
    await this.init();
    const { patientId, limit = 50, offset = 0 } = params;
    const query: Record<string, unknown> = {};
    if (patientId) {
      query.patientId = patientId;
    }
    return ClinicalNote.find(query)
      .limit(limit)
      .skip(offset)
      .sort({ date: -1 })
      .exec();
  }

  async createClinicalNote(
    noteData: Partial<IClinicalNote>
  ): Promise<IClinicalNote> {
    await this.init();
    const note = new ClinicalNote(noteData);
    return note.save();
  }

  async getClinicalNoteById(id: string): Promise<IClinicalNote | null> {
    await this.init();
    return ClinicalNote.findOne({ fhirId: id }).exec();
  }

  async updateClinicalNote(
    id: string,
    noteData: Partial<IClinicalNote>
  ): Promise<IClinicalNote | null> {
    await this.init();
    return ClinicalNote.findOneAndUpdate({ fhirId: id }, noteData, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async deleteClinicalNote(id: string): Promise<boolean> {
    await this.init();
    const result = await ClinicalNote.findOneAndDelete({ fhirId: id }).exec();
    return result !== null;
  }

  // Utility Methods
  async getStats() {
    await this.init();
    const [patientCount, appointmentCount, todayAppointments] =
      await Promise.all([
        Patient.countDocuments({ active: true }),
        Appointment.countDocuments(),
        Appointment.countDocuments({
          start: {
            $gte: new Date().toISOString().split("T")[0] + "T00:00:00.000Z",
            $lt: new Date().toISOString().split("T")[0] + "T23:59:59.999Z",
          },
        }),
      ]);
    return {
      totalPatients: patientCount,
      totalAppointments: appointmentCount,
      todaysAppointments: todayAppointments,
      upcomingAppointments: await Appointment.countDocuments({
        start: { $gte: new Date().toISOString() },
      }),
      pendingAppointments: await Appointment.countDocuments({
        status: "pending",
      }),
    };
  }
}

export const databaseService = new DatabaseService();
