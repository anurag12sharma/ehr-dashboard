// app/api/auth/client-auth/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  // This will be called from the client-side, so it should work
  const encodedParams = new URLSearchParams();
  encodedParams.set('grant_type', process.env.GRANT_TYPE!);
  encodedParams.set('username', process.env.MODMED_USERNAME!);
  encodedParams.set('password', process.env.MODMED_PASSWORD!);

  try {
    const response = await fetch('https://stage.ema-api.com/ema-dev/firm/apiportal/ema/ws/oauth2/grant', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 'Zt9tXPIgz17uxEU6gkZPWa3ZAFhZOqm04oEDHC1f',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: encodedParams
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Authentication failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Authentication failed' },
      { status: 500 }
    );
  }
}
