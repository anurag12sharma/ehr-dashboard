// lib/services/appointment-service.ts
import { modMedClient, FHIRBundle } from '@/lib/api/modmed-client';
import { FHIRAppointment, AppointmentFormData, AppointmentSummary } from '@/types/fhir';

export class AppointmentService {
  /**
   * Get all appointments with optional filtering
   */
  async getAppointments(params?: {
    _count?: number;
    patient?: string;
    practitioner?: string;
    status?: string;
    date?: string;
  }): Promise<AppointmentSummary[]> {
    try {
      const queryParams: Record<string, string> = {};
      
      if (params?._count) queryParams._count = params._count.toString();
      if (params?.patient) queryParams.patient = params.patient;
      if (params?.practitioner) queryParams.practitioner = params.practitioner;
      if (params?.status) queryParams.status = params.status;
      if (params?.date) queryParams.date = params.date;

      const bundle = await modMedClient.get<FHIRBundle<FHIRAppointment>>('/Appointment', queryParams);
      
      return (bundle.entry || []).map(entry => this.transformToSummary(entry.resource));
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      throw new Error('Unable to load appointments. Please try again.');
    }
  }

  /**
   * Get appointment by ID
   */
  async getAppointmentById(id: string): Promise<FHIRAppointment> {
    try {
      const appointment = await modMedClient.get<FHIRAppointment>(`/Appointment/${id}`);
      return appointment;
    } catch (error) {
      console.error(`Failed to fetch appointment ${id}:`, error);
      throw new Error('Appointment not found or unable to load appointment details.');
    }
  }

  /**
   * Create new appointment
   */
  async createAppointment(appointmentData: AppointmentFormData): Promise<FHIRAppointment> {
    try {
      const fhirAppointment = this.transformToFHIR(appointmentData);
      const createdAppointment = await modMedClient.post<FHIRAppointment>('/Appointment', fhirAppointment);
      return createdAppointment;
    } catch (error) {
      console.error('Failed to create appointment:', error);
      throw new Error('Unable to create appointment. Please check your input and try again.');
    }
  }

  /**
   * Update existing appointment
   */
  async updateAppointment(id: string, appointmentData: AppointmentFormData): Promise<FHIRAppointment> {
    try {
      const fhirAppointment = this.transformToFHIR(appointmentData);
      fhirAppointment.id = id;
      const updatedAppointment = await modMedClient.put<FHIRAppointment>(`/Appointment/${id}`, fhirAppointment);
      return updatedAppointment;
    } catch (error) {
      console.error(`Failed to update appointment ${id}:`, error);
      throw new Error('Unable to update appointment. Please try again.');
    }
  }

  /**
   * Delete appointment
   */
  async deleteAppointment(id: string): Promise<void> {
    try {
      await modMedClient.delete<void>(`/Appointment/${id}`);
    } catch (error) {
      console.error(`Failed to delete appointment ${id}:`, error);
      throw new Error('Unable to delete appointment. Please try again.');
    }
  }

  /**
   * Search appointments by patient name or appointment details
   */
  async searchAppointments(query: string): Promise<AppointmentSummary[]> {
    try {
      const params = {
        patient: query,
        _count: 20
      };
      return await this.getAppointments(params);
    } catch (error) {
      console.error('Failed to search appointments:', error);
      throw new Error('Search failed. Please try again.');
    }
  }

  /**
   * Get today's appointments
   */
  async getTodaysAppointments(): Promise<AppointmentSummary[]> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const params = {
        date: today,
        _count: 50
      };
      return await this.getAppointments(params);
    } catch (error) {
      console.error('Failed to fetch today\'s appointments:', error);
      throw new Error('Unable to load today\'s appointments.');
    }
  }

  /**
   * Get upcoming appointments
   */
  async getUpcomingAppointments(days: number = 7): Promise<AppointmentSummary[]> {
    try {
      const appointments = await this.getAppointments({ _count: 100 });
      const now = new Date();
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + days);
      
      return appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.startDateTime);
        return appointmentDate >= now && appointmentDate <= futureDate;
      });
    } catch (error) {
      console.error('Failed to fetch upcoming appointments:', error);
      throw new Error('Unable to load upcoming appointments.');
    }
  }

  /**
   * Transform FHIR Appointment to AppointmentSummary for lists
   */
  private transformToSummary(fhirAppointment: FHIRAppointment): AppointmentSummary {
    const patient = fhirAppointment.participant?.find(p => p.actor?.reference?.includes('Patient'));
    const practitioner = fhirAppointment.participant?.find(p => p.actor?.reference?.includes('Practitioner'));
    
    const now = new Date();
    const appointmentDate = new Date(fhirAppointment.start || '');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      id: fhirAppointment.id || '',
      patientId: patient?.actor?.reference?.split('/')[1] || '',
      patientName: patient?.actor?.display || 'Unknown Patient',
      practitionerName: practitioner?.actor?.display || 'Dr. Smith',
      title: fhirAppointment.description || 'Medical Appointment',
      appointmentType: fhirAppointment.appointmentType?.text || 'checkup',
      status: fhirAppointment.status,
      startDateTime: fhirAppointment.start || '',
      endDateTime: fhirAppointment.end || '',
      duration: fhirAppointment.minutesDuration || 30,
      location: 'Room 101', // Default location
      priority: 'routine',
      isUpcoming: appointmentDate > now,
      isToday: appointmentDate >= today && appointmentDate < tomorrow,
    };
  }

  /**
   * Transform AppointmentFormData to FHIR Appointment
   */
  private transformToFHIR(formData: AppointmentFormData): FHIRAppointment {
    const appointment: FHIRAppointment = {
      resourceType: 'Appointment',
      status: formData.status,
      description: formData.title,
      comment: formData.notes,
      start: formData.startDateTime,
      end: formData.endDateTime,
      minutesDuration: formData.duration,
      participant: [
        {
          actor: {
            reference: `Patient/${formData.patientId}`,
            display: formData.patientName || 'Patient'
          },
          status: 'accepted'
        }
      ]
    };

    // Add appointment type
    if (formData.appointmentType) {
      appointment.appointmentType = {
        text: formData.appointmentType
      };
    }

    // Add reason
    if (formData.reason) {
      appointment.reasonCode = [
        {
          text: formData.reason
        }
      ];
    }

    // Add practitioner if provided
    if (formData.practitionerId) {
      appointment.participant.push({
        actor: {
          reference: `Practitioner/${formData.practitionerId}`,
          display: formData.practitionerName || 'Doctor'
        },
        status: 'accepted'
      });
    }

    return appointment;
  }

  /**
   * Transform FHIR Appointment to form data
   */
  transformToFormData(fhirAppointment: FHIRAppointment): AppointmentFormData {
    const patient = fhirAppointment.participant?.find(p => p.actor?.reference?.includes('Patient'));
    const practitioner = fhirAppointment.participant?.find(p => p.actor?.reference?.includes('Practitioner'));

    return {
      id: fhirAppointment.id,
      patientId: patient?.actor?.reference?.split('/')[1] || '',
      patientName: patient?.actor?.display || '',
      practitionerId: practitioner?.actor?.reference?.split('/')[1],
      practitionerName: practitioner?.actor?.display || '',
      title: fhirAppointment.description || '',
      description: fhirAppointment.comment || '',
      appointmentType: (fhirAppointment.appointmentType?.text as any) || 'checkup',
      status: fhirAppointment.status,
      startDateTime: fhirAppointment.start || '',
      endDateTime: fhirAppointment.end || '',
      duration: fhirAppointment.minutesDuration || 30,
      reason: fhirAppointment.reasonCode?.[0]?.text || '',
      notes: fhirAppointment.comment || '',
      priority: 'routine'
    };
  }
}

// Export singleton instance
export const appointmentService = new AppointmentService();
