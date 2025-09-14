// lib/services/patient-service.ts
import { modMedClient, FHIRBundle } from '@/lib/api/modmed-client';
import { FHIRPatient, PatientFormData, PatientSummary } from '@/types/fhir';

export class PatientService {
  /**
   * Get all patients with optional filtering
   */
  async getPatients(params?: {
    _count?: number;
    name?: string;
    gender?: string;
    active?: boolean;
  }): Promise<PatientSummary[]> {
    try {
      const queryParams: Record<string, string> = {};
      
      if (params?._count) queryParams._count = params._count.toString();
      if (params?.name) queryParams.name = params.name;
      if (params?.gender) queryParams.gender = params.gender;
      if (params?.active !== undefined) queryParams.active = params.active.toString();

      const bundle = await modMedClient.get<FHIRBundle<FHIRPatient>>('/Patient', queryParams);
      
      return (bundle.entry || []).map(entry => this.transformToSummary(entry.resource));
    } catch (error) {
      console.error('Failed to fetch patients:', error);
      throw new Error('Unable to load patients. Please try again.');
    }
  }

  /**
   * Get patient by ID
   */
  async getPatientById(id: string): Promise<FHIRPatient> {
    try {
      const patient = await modMedClient.get<FHIRPatient>(`/Patient/${id}`);
      return patient;
    } catch (error) {
      console.error(`Failed to fetch patient ${id}:`, error);
      throw new Error('Patient not found or unable to load patient details.');
    }
  }

  /**
   * Create new patient
   */
  async createPatient(patientData: PatientFormData): Promise<FHIRPatient> {
    try {
      const fhirPatient = this.transformToFHIR(patientData);
      const createdPatient = await modMedClient.post<FHIRPatient>('/Patient', fhirPatient);
      return createdPatient;
    } catch (error) {
      console.error('Failed to create patient:', error);
      throw new Error('Unable to create patient. Please check your input and try again.');
    }
  }

  /**
   * Update existing patient
   */
  async updatePatient(id: string, patientData: PatientFormData): Promise<FHIRPatient> {
    try {
      const fhirPatient = this.transformToFHIR(patientData);
      fhirPatient.id = id;
      const updatedPatient = await modMedClient.put<FHIRPatient>(`/Patient/${id}`, fhirPatient);
      return updatedPatient;
    } catch (error) {
      console.error(`Failed to update patient ${id}:`, error);
      throw new Error('Unable to update patient. Please try again.');
    }
  }

  /**
   * Delete patient (soft delete - set active: false)
   */
  async deletePatient(id: string): Promise<void> {
    try {
      // In FHIR, we typically soft delete by setting active: false
      const patient = await this.getPatientById(id);
      patient.active = false;
      await modMedClient.put<FHIRPatient>(`/Patient/${id}`, patient);
    } catch (error) {
      console.error(`Failed to delete patient ${id}:`, error);
      throw new Error('Unable to delete patient. Please try again.');
    }
  }

  /**
   * Search patients by name or identifier
   */
  async searchPatients(query: string): Promise<PatientSummary[]> {
    try {
      const params = {
        name: query,
        _count: 20
      };
      return await this.getPatients(params);
    } catch (error) {
      console.error('Failed to search patients:', error);
      throw new Error('Search failed. Please try again.');
    }
  }

  /**
   * Transform FHIR Patient to PatientSummary for lists
   */
  private transformToSummary(fhirPatient: FHIRPatient): PatientSummary {
    const name = fhirPatient.name?.[0];
    const fullName = name ? `${name.given?.[0] || ''} ${name.family || ''}`.trim() : 'Unknown';
    
    const phone = fhirPatient.telecom?.find(t => t.system === 'phone')?.value;
    const email = fhirPatient.telecom?.find(t => t.system === 'email')?.value;
    
    const age = fhirPatient.birthDate ? this.calculateAge(fhirPatient.birthDate) : 0;

    return {
      id: fhirPatient.id || '',
      name: fullName,
      gender: fhirPatient.gender || 'unknown',
      birthDate: fhirPatient.birthDate || '',
      age,
      phone,
      email,
      active: fhirPatient.active !== false,
    };
  }

  /**
   * Transform PatientFormData to FHIR Patient
   */
  private transformToFHIR(formData: PatientFormData): FHIRPatient {
    const patient: FHIRPatient = {
      resourceType: 'Patient',
      active: formData.active,
      name: [
        {
          use: 'official',
          family: formData.lastName,
          given: [formData.firstName]
        }
      ],
      gender: formData.gender,
      birthDate: formData.birthDate,
      telecom: [],
      address: [
        {
          use: 'home',
          type: 'physical',
          line: [formData.address.line1],
          city: formData.address.city,
          state: formData.address.state,
          postalCode: formData.address.postalCode,
          country: formData.address.country
        }
      ]
    };

    // Add optional fields
    if (formData.address.line2) {
      patient.address![0].line!.push(formData.address.line2);
    }

    if (formData.phone) {
      patient.telecom!.push({
        system: 'phone',
        value: formData.phone,
        use: 'home'
      });
    }

    if (formData.email) {
      patient.telecom!.push({
        system: 'email',
        value: formData.email
      });
    }

    if (formData.medicalRecordNumber) {
      patient.identifier = [
        {
          use: 'official',
          system: 'http://hospital.example.org/patients',
          value: formData.medicalRecordNumber
        }
      ];
    }

    // Add emergency contact if provided
    if (formData.emergencyContact) {
      patient.contact = [
        {
          relationship: [
            {
              text: formData.emergencyContact.relationship
            }
          ],
          name: {
            text: formData.emergencyContact.name
          },
          telecom: [
            {
              system: 'phone',
              value: formData.emergencyContact.phone
            }
          ]
        }
      ];
    }

    return patient;
  }

  /**
   * Transform FHIR Patient to form data
   */
  transformToFormData(fhirPatient: FHIRPatient): PatientFormData {
    const name = fhirPatient.name?.[0];
    const address = fhirPatient.address?.[0];
    const phone = fhirPatient.telecom?.find(t => t.system === 'phone')?.value;
    const email = fhirPatient.telecom?.find(t => t.system === 'email')?.value;
    const contact = fhirPatient.contact?.[0];

    return {
      id: fhirPatient.id,
      firstName: name?.given?.[0] || '',
      lastName: name?.family || '',
      email: email || '',
      phone: phone || '',
      gender: fhirPatient.gender || 'unknown',
      birthDate: fhirPatient.birthDate || '',
      address: {
        line1: address?.line?.[0] || '',
        line2: address?.line?.[1] || '',
        city: address?.city || '',
        state: address?.state || '',
        postalCode: address?.postalCode || '',
        country: address?.country || 'US'
      },
      emergencyContact: contact ? {
        name: contact.name?.text || '',
        relationship: contact.relationship?.[0]?.text || '',
        phone: contact.telecom?.find(t => t.system === 'phone')?.value || ''
      } : undefined,
      medicalRecordNumber: fhirPatient.identifier?.find(i => i.use === 'official')?.value,
      active: fhirPatient.active !== false
    };
  }

  /**
   * Calculate age from birth date
   */
  private calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }
}

// Export singleton instance
export const patientService = new PatientService();
