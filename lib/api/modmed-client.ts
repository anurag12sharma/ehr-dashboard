import { modMedAuth } from '@/lib/auth/oauth';
import { mockPatientBundle, mockAppointmentBundle } from './mock-data';

/**
 * HTTP Methods supported by the API
 */
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * API Request configuration
 */
interface APIRequestConfig {
  method?: HTTPMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}

/**
 * FHIR Bundle response
 */
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

/**
 * ModMed API Client
 * Handles all communication with ModMed FHIR API, using either real or mock data
 */
export class ModMedClient {
  private baseURL: string;
  private isMockMode: boolean;

  constructor() {
    this.baseURL = process.env.MODMED_FHIR_URL || '';
    this.isMockMode = process.env.NODE_ENV === 'development';

    if (!this.baseURL && !this.isMockMode) {
      throw new Error('MODMED_FHIR_URL environment variable is required');
    }
  }

  /**
   * Build URL with parameters
   */
  private buildURL(endpoint: string, params?: Record<string, string>): string {
    let url = this.baseURL + endpoint;
    if (params && Object.keys(params).length > 0) {
      const query = new URLSearchParams(params).toString();
      url += (url.includes('?') ? '&' : '?') + query;
    }
    return url;
  }

  /**
   * Mock API responses for development
   */
  private async makeMockRequest<T>(endpoint: string): Promise<T> {
    console.log(`🎭 Mock API: ${endpoint}`);
    await this.delay(300);

    if (endpoint.includes('/Patient')) {
      return mockPatientBundle as T;
    } else if (endpoint.includes('/Appointment')) {
      return mockAppointmentBundle as T;
    } else {
      // Return a generic empty bundle for unknown resources
      return {
        resourceType: "Bundle",
        type: "searchset",
        total: 0,
        entry: []
      } as T;
    }
  }

  public async makeRequest<T = any>(
    endpoint: string,
    config: APIRequestConfig = {}
  ): Promise<T> {
    if (this.isMockMode) {
      return this.makeMockRequest<T>(endpoint);
    }

    const { method = 'GET', headers = {}, body, params } = config;

    try {
      const accessToken = await modMedAuth.getValidAccessToken();
      const url = this.buildURL(endpoint, params);

      const requestHeaders: HeadersInit = {
        'Authorization': `Bearer ${accessToken}`,
        'x-api-key': process.env.MODMED_API_KEY!,
        'Accept': 'application/fhir+json',
        'Content-Type': 'application/fhir+json',
        ...headers,
      };

      let requestBody: string | undefined;
      if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        requestBody = typeof body === 'string' ? body : JSON.stringify(body);
      }

      console.log(`🌐 ${method} ${endpoint} (${url})`);

      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: requestBody,
      });

      if (!response.ok) {
        await this.handleAPIError(response, endpoint);
      }

      const responseData = await response.json();
      console.log(`✅ ${method} ${endpoint} - Success`);
      return responseData as T;

    } catch (error) {
      console.error(`❌ ${method} ${endpoint} - Failed:`, error);
      throw error;
    }
  }

  /**
   * Handle API errors with proper error messages
   */
  private async handleAPIError(response: Response, endpoint: string): Promise<never> {
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;
    try {
      const text = await response.text();
      errorMessage += ` | ${text.slice(0, 200)}`; // Show start of error response
    } catch { /* ignore parse errors */ }
    throw new Error(`${errorMessage} (${endpoint})`);
  }

  // Convenience methods for common operations

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

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const modMedClient = new ModMedClient();
