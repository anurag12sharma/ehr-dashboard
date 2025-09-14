// lib/api/modmed-client.ts (switch back to mock mode)
import { modMedAuth } from '@/lib/auth/oauth';
import { mockPatientBundle, mockAppointmentBundle } from './mock-data';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface APIRequestConfig {
  method?: HTTPMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}

export interface FHIRBundle<T = any> {
  resourceType: 'Bundle';
  id?: string;
  type: 'searchset' | 'collection';
  total?: number;
  entry?: Array<{
    resource: T;
    fullUrl?: string;
  }>;
  link?: Array<{
    relation: string;
    url: string;
  }>;
}

// In-memory stores for mock data with real FHIR structure
let mockPatientsStore = [...mockPatientBundle.entry];
let mockAppointmentsStore = [...mockAppointmentBundle.entry];
let nextPatientId = 375395; // Continue from real ID sequence
let nextAppointmentId = 4;

export class ModMedClient {
  private baseURL: string;
  private isMockMode: boolean;

  constructor() {
    this.baseURL = process.env.MODMED_FHIR_URL || '';
    // Always use mock mode until backend access is enabled
    this.isMockMode = true;

    console.log('🎭 ModMed Client initialized in MOCK MODE with real FHIR structure');
  }

  private buildURL(endpoint: string, params?: Record<string, string>): string {
    let url = this.baseURL + endpoint;
    if (params && Object.keys(params).length > 0) {
      const query = new URLSearchParams(params).toString();
      url += (url.includes('?') ? '&' : '?') + query;
    }
    return url;
  }

  private async makeMockRequest<T>(
    endpoint: string,
    config: APIRequestConfig = {}
  ): Promise<T> {
    console.log(`🎭 Mock API (Real FHIR Structure): ${config.method || 'GET'} ${endpoint}`);
    await new Promise(resolve => setTimeout(resolve, 300));

    const { method = 'GET', body } = config;

    if (endpoint.includes('/Patient')) {
      if (method === 'GET') {
        if (endpoint.includes('/Patient/')) {
          // Get single patient
          const patientId = endpoint.split('/').pop();
          const patient = mockPatientsStore.find(p => p.resource.id === patientId);
          if (patient) {
            return patient.resource as T;
          } else {
            throw new Error('Patient not found');
          }
        } else {
          // Get patients list
          return {
            ...mockPatientBundle,
            entry: mockPatientsStore,
            total: mockPatientsStore.length
          } as T;
        }
      } else if (method === 'POST') {
        // Create patient
        const newPatient = {
          fullUrl: `https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/${nextPatientId}`,
          resource: {
            ...body,
            id: `${nextPatientId++}`,
            resourceType: 'Patient',
            meta: {
              lastUpdated: new Date().toISOString()
            },
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
          }
        };
        mockPatientsStore.push(newPatient);
        return newPatient.resource as T;
      } else if (method === 'PUT') {
        // Update patient
        const patientId = endpoint.split('/').pop();
        const index = mockPatientsStore.findIndex(p => p.resource.id === patientId);
        if (index !== -1) {
          mockPatientsStore[index].resource = { 
            ...body, 
            id: patientId,
            meta: {
              ...mockPatientsStore[index].resource.meta,
              lastUpdated: new Date().toISOString()
            }
          };
          return mockPatientsStore[index].resource as T;
        } else {
          throw new Error('Patient not found');
        }
      } else if (method === 'DELETE') {
        // Actually delete patient from store
        const patientId = endpoint.split('/').pop();
        const index = mockPatientsStore.findIndex(p => p.resource.id === patientId);
        if (index !== -1) {
          mockPatientsStore.splice(index, 1);
          return { success: true } as T;
        } else {
          throw new Error('Patient not found');
        }
      }
    } else if (endpoint.includes('/Appointment')) {
      // Handle appointments (similar structure)
      if (method === 'GET') {
        return {
          resourceType: "Bundle",
          type: "searchset",
          total: mockAppointmentsStore.length,
          entry: mockAppointmentsStore
        } as T;
      }
    }

    return {
      resourceType: "Bundle",
      type: "searchset",
      total: 0,
      entry: []
    } as T;
  }

  public async makeRequest<T = any>(
    endpoint: string,
    config: APIRequestConfig = {}
  ): Promise<T> {
    // Always use mock requests until backend access is enabled
    return this.makeMockRequest<T>(endpoint, config);
  }

  private async handleAPIError(response: Response, endpoint: string): Promise<never> {
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;
    try {
      const text = await response.text();
      errorMessage += ` | ${text.slice(0, 200)}`;
    } catch { /* ignore parse errors */ }
    throw new Error(`${errorMessage} (${endpoint})`);
  }

  public async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'GET', params });
  }

  public async post<T>(endpoint: string, data: any): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'POST', body: data });
  }

  public async put<T>(endpoint: string, data: any): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'PUT', body: data });
  }

  public async delete<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' });
  }
}

export const modMedClient = new ModMedClient();
