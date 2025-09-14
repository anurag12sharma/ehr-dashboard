import { OAuthTokenResponse, OAuthRequest, AuthState, APIError } from '@/types/auth';

export class ModMedOAuth {
  private static instance: ModMedOAuth;
  private authState: AuthState | null = null;

  public static getInstance(): ModMedOAuth {
    if (!ModMedOAuth.instance) {
      ModMedOAuth.instance = new ModMedOAuth();
    }
    return ModMedOAuth.instance;
  }

  private createFormBody(data: Record<string, string | undefined>): URLSearchParams {
    const filteredData: Record<string, string> = {};
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        filteredData[key] = value;
      }
    });
    return new URLSearchParams(filteredData);
  }

  private getEndpoints() {
    const baseUrl = process.env.MODMED_BASE_URL;
    const firmPrefix = process.env.MODMED_FIRM_PREFIX;
    
    if (!baseUrl || !firmPrefix) {
      throw new Error('Missing required environment variables: MODMED_BASE_URL, MODMED_FIRM_PREFIX');
    }

    return {
      tokenEndpoint: `${baseUrl}/${firmPrefix}/ema/ws/oauth2/grant`,
      apiBase: process.env.MODMED_FHIR_URL,
    };
  }

  /**
   * Mock authentication for development (bypasses CloudFront issues)
   */
  private async authenticateMock(): Promise<AuthState> {
    console.log('🔐 Using mock authentication (CloudFront blocking real requests)...');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const tokenData = {
      scope: "apiportal",
      token_type: "Bearer",
      access_token: process.env.ACCESS_TOKEN!,
      refresh_token: process.env.REFRESH_TOKEN!
    };

    const expiresInMs = 3600 * 1000; // 1 hour
    const expiresAt = Date.now() + expiresInMs;

    this.authState = {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt,
      scope: tokenData.scope,
    };

    console.log('✅ Mock authentication successful - ready for development');
    return this.authState;
  }

  /**
   * Real authentication (currently blocked by CloudFront)
   */
  private async authenticateReal(): Promise<AuthState> {
    const endpoints = this.getEndpoints();
    
    const requestBody = {
      grant_type: 'password' as const,
      username: process.env.MODMED_USERNAME!,
      password: process.env.MODMED_PASSWORD!,
    };

    try {
      console.log('🔐 Requesting OAuth token from ModMed...');
      
      const response = await fetch(endpoints.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': process.env.MODMED_API_KEY!,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        body: this.createFormBody(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OAuth failed: ${response.status} - ${errorText}`);
      }

      const tokenData: OAuthTokenResponse = await response.json();
      
      const expiresInMs = (tokenData.expires_in || 3600) * 1000;
      const expiresAt = Date.now() + expiresInMs;

      this.authState = {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt,
        scope: tokenData.scope,
      };

      return this.authState;

    } catch (error) {
      console.error('❌ Real OAuth authentication failed:', error);
      throw error;
    }
  }

  /**
   * Main authenticate method - uses mock in development
   */
  public async authenticate(): Promise<AuthState> {
    if (process.env.NODE_ENV === 'development') {
      return this.authenticateMock();
    } else {
      // In production, try real authentication
      return this.authenticateReal();
    }
  }

  public async refreshToken(): Promise<AuthState> {
    if (!this.authState?.refreshToken) {
      throw new Error('No refresh token available. Full authentication required.');
    }

    // In development, just extend the mock token
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Refreshing mock token...');
      const expiresInMs = 3600 * 1000;
      const expiresAt = Date.now() + expiresInMs;
      
      this.authState.expiresAt = expiresAt;
      console.log('✅ Mock token refreshed successfully');
      return this.authState;
    }

    // Real refresh token logic would go here
    return this.authenticate();
  }

  public async getValidAccessToken(): Promise<string> {
    if (!this.authState) {
      await this.authenticate();
    }

    const bufferTime = 5 * 60 * 1000;
    const isExpired = this.authState!.expiresAt - bufferTime < Date.now();

    if (isExpired) {
      try {
        await this.refreshToken();
      } catch (error) {
        console.log('Refresh failed, attempting full authentication...');
        await this.authenticate();
      }
    }

    return this.authState!.accessToken;
  }

  public isAuthenticated(): boolean {
    return this.authState !== null && this.authState.expiresAt > Date.now();
  }

  public logout(): void {
    this.authState = null;
    console.log('🚪 Logged out - auth state cleared');
  }

  public getAuthState(): AuthState | null {
    return this.authState;
  }
}

export const modMedAuth = ModMedOAuth.getInstance();
