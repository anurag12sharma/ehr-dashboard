// lib/auth/oauth.ts
export interface AuthState {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // UNIX ms timestamp
  scope: string;
}

export class ModMedOAuth {
  private static instance: ModMedOAuth;
  private authState: AuthState | null = null;

  public static getInstance(): ModMedOAuth {
    if (!ModMedOAuth.instance) {
      ModMedOAuth.instance = new ModMedOAuth();
    }
    return ModMedOAuth.instance;
  }

  /**
   * Loads tokens from environment variables—NO API CALL!
   */
  public async authenticate(): Promise<AuthState> {
    const accessToken = process.env.ACCESS_TOKEN;
    const refreshToken = process.env.REFRESH_TOKEN;

    if (!accessToken || !refreshToken) {
      throw new Error('Missing ACCESS_TOKEN or REFRESH_TOKEN in environment variables.');
    }

    // Default to "valid for 1 hour" from when server starts (unless you want to parse and extract expiry from the JWT itself)
    const expiresAt = Date.now() + 60 * 60 * 1000;
    const scope = 'apiportal'; // You can set this if you know it

    this.authState = {
      accessToken,
      refreshToken,
      expiresAt,
      scope
    };
    return this.authState;
  }

  public async getValidAccessToken(): Promise<string> {
    // Always reload from env when requested
    if (!this.authState) {
      await this.authenticate();
    }
    // There is no real expiry check here—add your logic if you want.
    return this.authState!.accessToken;
  }

  public isAuthenticated(): boolean {
    return this.authState !== null;
  }

  public logout(): void {
    this.authState = null;
  }

  public getAuthState(): AuthState | null {
    return this.authState;
  }

  /**
   * Utility to help users when tokens are missing/stale
   */
  public hasEnvironmentTokens(): boolean {
    return !!(process.env.ACCESS_TOKEN && process.env.REFRESH_TOKEN);
  }

  public getTokenUpdateInstructions(): string {
    return `
To update your ModMed tokens:
1. Go to https://portal.api.modmed.com/reference/post_ws-oauth2-grant#/
2. Get fresh access_token and refresh_token using the same credentials and x-api-key.
3. Copy them into .env.local as ACCESS_TOKEN and REFRESH_TOKEN.
4. Restart your dev server.
    `.trim();
  }
}

export const modMedAuth = ModMedOAuth.getInstance();
