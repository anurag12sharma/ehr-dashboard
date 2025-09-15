interface AthenaTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
  }
  
  class AthenaHealthService {
    private baseUrl: string;
    private clientId: string;
    private clientSecret: string;
    private practiceId: string;
    private accessToken: string | null = null;
    private tokenExpiry: number = 0;
  
    constructor() {
      this.baseUrl = process.env.ATHENA_BASE_URL!;
      this.clientId = process.env.ATHENA_CLIENT_ID!;
      this.clientSecret = process.env.ATHENA_CLIENT_SECRET!;
      this.practiceId = process.env.ATHENA_PRACTICE_ID!;
    }
  
    private async getAccessToken(): Promise<string> {
        if (this.accessToken && Date.now() < this.tokenExpiry) {
          return this.accessToken;
        }
      
        console.log('🔐 Attempting to get Athena token...');
        console.log('Base URL:', this.baseUrl);
        console.log('Client ID:', this.clientId ? 'Set' : 'Missing');
        console.log('Client Secret:', this.clientSecret ? 'Set' : 'Missing');
        console.log('Practice ID:', this.practiceId ? this.practiceId : 'Missing');
      
        const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
        const response = await fetch(`${this.baseUrl}/oauth2/v1/token`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'grant_type=client_credentials&scope=athena/service/Athenanet.MDP.*'
        });
      
        console.log('Token response status:', response.status);
      
        if (!response.ok) {
          const errText = await response.text();
          console.error('Token error:', errText);
          throw new Error(`Token request failed: ${response.status} ${response.statusText} - ${errText}`);
        }
      
        const tokenData: AthenaTokenResponse = await response.json();
        console.log('✅ Token received successfully');
        
        this.accessToken = tokenData.access_token;
        this.tokenExpiry = Date.now() + (tokenData.expires_in * 1000) - 60000;
        return this.accessToken;
    }
      
  
    private async makeRequest(endpoint: string, options: RequestInit = {}) {
      const token = await this.getAccessToken();
      
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }
  
      return response.json();
    }
  
    async getPatients(params: { 
        lastname?: string; 
        firstname?: string; 
        dob?: string; 
        anyphone?: string; 
        limit?: number; 
        offset?: number 
      } = {}) {
        const queryParams = new URLSearchParams();
        
        // Add search parameters (Athena requires at least one)
        if (params.lastname) queryParams.set('lastname', params.lastname);
        if (params.firstname) queryParams.set('firstname', params.firstname);
        if (params.dob) queryParams.set('dob', params.dob);
        if (params.anyphone) queryParams.set('anyphone', params.anyphone);
        
        // Add pagination
        if (params.limit !== undefined) queryParams.set('limit', params.limit.toString());
        if (params.offset !== undefined) queryParams.set('offset', params.offset.toString());
      
        // Athena requires at least one search field
        if (!params.lastname && !params.firstname && !params.dob && !params.anyphone) {
          // For demo purposes, search for all patients with common last names
          queryParams.set('lastname', '*'); // This might work, or use a common name
        }
      
        return this.makeRequest(`/v1/${this.practiceId}/patients?${queryParams.toString()}`);
      }
      
  
    async getPatientById(patientId: string) {
      return this.makeRequest(`/v1/${this.practiceId}/patients/${patientId}`);
    }
  
    async createPatient(patientData: any) {
      return this.makeRequest(`/v1/${this.practiceId}/patients`, {
        method: 'POST',
        body: JSON.stringify(patientData),
      });
    }
  
    async updatePatient(patientId: string, patientData: any) {
      return this.makeRequest(`/v1/${this.practiceId}/patients/${patientId}`, {
        method: 'PUT',
        body: JSON.stringify(patientData),
      });
    }
  
    // Appointment Methods
    async getAppointments(params: { 
      startdate?: string; 
      enddate?: string; 
      limit?: number; 
      offset?: number 
    } = {}) {
      const today = new Date().toISOString().split('T')[0];
      const queryParams = new URLSearchParams({
        startdate: params.startdate || today,
        enddate: params.enddate || today,
        limit: (params.limit || 50).toString(),
        offset: (params.offset || 0).toString(),
      });
      
      return this.makeRequest(`/v1/${this.practiceId}/appointments?${queryParams}`);
    }
  
    async getAppointmentById(appointmentId: string) {
      return this.makeRequest(`/v1/${this.practiceId}/appointments/${appointmentId}`);
    }
  
    async createAppointment(appointmentData: any) {
      return this.makeRequest(`/v1/${this.practiceId}/appointments`, {
        method: 'POST',
        body: JSON.stringify(appointmentData),
      });
    }

    // Add a search method specifically for patient search
async searchPatients(searchQuery: string) {
    const queryParams = new URLSearchParams();
    
    // Try to determine if it's a phone number or name
    if (/^\d+/.test(searchQuery)) {
      queryParams.set('anyphone', searchQuery);
    } else {
      queryParams.set('lastname', searchQuery);
    }
    
    return this.makeRequest(`/v1/${this.practiceId}/patients?${queryParams.toString()}`);
  }
  
    async updateAppointment(appointmentId: string, appointmentData: any) {
      return this.makeRequest(`/v1/${this.practiceId}/appointments/${appointmentId}`, {
        method: 'PUT',
        body: JSON.stringify(appointmentData),
      });
    }
  }
  
  export const athenaService = new AthenaHealthService();
  