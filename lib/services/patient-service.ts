// lib/services/patient-service.ts - Real FHIR version
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

      console.log('🔍 Fetching patients from ModMed FHIR API...');
      const bundle = await modMedClient.get<FHIRBundle<FHIRPatient>>('/Patient', queryParams);
      
      console.log(`✅ Retrieved ${bundle.entry?.length || 0} patients from API`);
      return (bundle.entry || []).map(entry => this.transformToSummary(entry.resource));
    } catch (error) {
      console.error('Failed to fetch patients:', error);
      throw new Error('Unable to load patients from ModMed API. Please try again.');
    }
  }

  /**
   * Get patient by ID
   */
  async getPatientById(id: string): Promise<FHIRPatient> {
    try {
      console.log(`🔍 Fetching patient ${id} from ModMed FHIR API...`);
      const patient = await modMedClient.get<FHIRPatient>(`/Patient/${id}`);
      return patient;
    } catch (error) {
      console.error(`Failed to fetch patient ${id}:`, error);
      throw new Error('Patient not found in ModMed API or unable to load patient details.');
    }
  }

  /**
   * Create new patient
   */
  async createPatient(patientData: PatientFormData): Promise<FHIRPatient> {
    try {
      console.log('📝 Creating new patient in ModMed FHIR API...');
      const fhirPatient = this.transformToFHIR(patientData);
      const createdPatient = await modMedClient.post<FHIRPatient>('/Patient', fhirPatient);
      console.log('✅ Patient created successfully');
      return createdPatient;
    } catch (error) {
      console.error('Failed to create patient:', error);
      throw new Error('Unable to create patient in ModMed API. Please check your input and try again.');
    }
  }

  /**
   * Update existing patient
   */
  async updatePatient(id: string, patientData: PatientFormData): Promise<FHIRPatient> {
    try {
      console.log(`📝 Updating patient ${id} in ModMed FHIR API...`);
      const fhirPatient = this.transformToFHIR(patientData);
      fhirPatient.id = id;
      const updatedPatient = await modMedClient.put<FHIRPatient>(`/Patient/${id}`, fhirPatient);
      console.log('✅ Patient updated successfully');
      return updatedPatient;
    } catch (error) {
      console.error(`Failed to update patient ${id}:`, error);
      throw new Error('Unable to update patient in ModMed API. Please try again.');
    }
  }

  /**
   * Delete patient
   */
  async deletePatient(id: string): Promise<void> {
    try {
      console.log(`🗑️ Deleting patient ${id} from ModMed FHIR API...`);
      await modMedClient.delete<void>(`/Patient/${id}`);
      console.log('✅ Patient deleted successfully');
    } catch (error) {
      console.error(`Failed to delete patient ${id}:`, error);
      throw new Error('Unable to delete patient from ModMed API. Please try again.');
    }
  }

  /**
   * Search patients by name or identifier
   */
  async searchPatients(query: string): Promise<PatientSummary[]> {
    try {
      console.log(`🔍 Searching patients for: "${query}"`);
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
    const fullName = name ? `${name.given?.join(' ') || ''} ${name.family || ''}`.trim() : 'Unknown';
    
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
          type: 'both',
          line: [formData.address.line1],
          city: formData.address.city,
          state: formData.address.state,
          postalCode: formData.address.postalCode,
          country: formData.address.country
        }
      ],
      deceasedBoolean: false,
      extension: [
        {
          url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
          extension: [
            {
              url: "text",
              valueString: "Unspecified"
            }
          ]
        }
      ]
    };
    // Add second address line if provided
    if (formData.address.line2) {
        patient.address![0].line!.push(formData.address.line2);
      }
  
      // Add telecom if provided
      if (formData.phone) {
        patient.telecom!.push({
          system: 'phone',
          value: formData.phone,
          use: 'mobile',
          rank: 1
        });
      }
  
      if (formData.email) {
        patient.telecom!.push({
          system: 'email',
          value: formData.email
        });
      }
  
      // Add identifier if medical record number provided
      if (formData.medicalRecordNumber) {
        patient.identifier = [
          {
            system: 'http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR',
            value: formData.medicalRecordNumber
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
      medicalRecordNumber: fhirPatient.identifier?.find(
        i => i.system === 'http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR'
      )?.value,
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

export const patientService = new PatientService();
