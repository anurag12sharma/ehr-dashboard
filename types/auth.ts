/**
 * OAuth token response from ModMed API
 * Based on OAuth 2.0 specification + ModMed documentation
 */
export interface OAuthTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in?: number; // Optional - some APIs provide this
}

/**
 * OAuth request payload for password grant
 */
export interface OAuthRequest {
  grant_type: 'password' | 'refresh_token';
  username?: string;
  password?: string;
  refresh_token?: string;
}

/**
 * Stored authentication state
 */
export interface AuthState {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // Unix timestamp
  scope: string;
}

/**
 * API Error response structure
 */
export interface APIError {
  error: string;
  error_description?: string;
  status: number;
}
