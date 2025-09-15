import connectDB from '@/lib/mongodb';
import { Patient, IPatient } from '@/lib/models/Patient';
import { Appointment, IAppointment } from '@/lib/models/Appointment';
import { PatientSummary, AppointmentSummary } from '@/types/fhir';

class DatabaseService {
  async init() {
    await connectDB();
  }

  // Patient Methods
  async getPatients(params: {
    search?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<IPatient[]> {
    await this.init();
    
    const { search, limit = 50, offset = 0 } = params;
    
    let query: any = {};
    
    if (search) {
      query = {
        $or: [
          { 'name.family': { $regex: search, $options: 'i' } },
          { 'name.given': { $regex: search, $options: 'i' } },
          { 'telecom.value': { $regex: search, $options: 'i' } }
        ]
      };
    }

    return Patient.find(query)
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

  async updatePatient(id: string, patientData: Partial<IPatient>): Promise<IPatient | null> {
    await this.init();
    return Patient.findOneAndUpdate(
      { fhirId: id },
      patientData,
      { new: true, runValidators: true }
    ).exec();
  }

  async deletePatient(id: string): Promise<boolean> {
    await this.init();
    const result = await Patient.findOneAndDelete({ fhirId: id }).exec();
    return result !== null;
  }

  // Appointment Methods
  async getAppointments(params: {
    startDate?: string;
    endDate?: string;
    patientId?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<IAppointment[]> {
    await this.init();
    
    const { startDate, endDate, patientId, limit = 50, offset = 0 } = params;
    
    let query: any = {};
    
    if (startDate || endDate) {
      query.start = {};
      if (startDate) query.start.$gte = new Date(startDate).toISOString();
      if (endDate) query.start.$lte = new Date(endDate).toISOString();
    }
    
    if (patientId) {
      query['participant.actor.reference'] = { $regex: patientId, $options: 'i' };
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

  async createAppointment(appointmentData: Partial<IAppointment>): Promise<IAppointment> {
    await this.init();
    const appointment = new Appointment(appointmentData);
    return appointment.save();
  }

  async updateAppointment(id: string, appointmentData: Partial<IAppointment>): Promise<IAppointment | null> {
    await this.init();
    return Appointment.findOneAndUpdate(
      { fhirId: id },
      appointmentData,
      { new: true, runValidators: true }
    ).exec();
  }

  async deleteAppointment(id: string): Promise<boolean> {
    await this.init();
    const result = await Appointment.findOneAndDelete({ fhirId: id }).exec();
    return result !== null;
  }

  // Utility Methods
  async getStats() {
    await this.init();
    
    const [patientCount, appointmentCount, todayAppointments] = await Promise.all([
      Patient.countDocuments({ active: true }),
      Appointment.countDocuments(),
      Appointment.countDocuments({
        start: {
          $gte: new Date().toISOString().split('T')[0] + 'T00:00:00.000Z',
          $lt: new Date().toISOString().split('T')[0] + 'T23:59:59.999Z'
        }
      })
    ]);

    return {
      totalPatients: patientCount,
      totalAppointments: appointmentCount,
      todaysAppointments: todayAppointments,
      upcomingAppointments: await Appointment.countDocuments({
        start: { $gte: new Date().toISOString() }
      }),
      pendingAppointments: await Appointment.countDocuments({ status: 'pending' })
    };
  }
}

export const databaseService = new DatabaseService();
