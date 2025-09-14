// app/api/test-auth/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Read environment variables directly
    const accessToken = process.env.ACCESS_TOKEN;
    const refreshToken = process.env.REFRESH_TOKEN;

    if (!accessToken || !refreshToken) {
      return NextResponse.json({
        success: false,
        error: 'Missing ACCESS_TOKEN or REFRESH_TOKEN in environment variables.',
        instructions:
          `To test authentication with mock tokens:\n` +
          `1. Go to the ModMed API Portal and obtain a fresh access_token and refresh_token.\n` +
          `2. Update .env.local with ACCESS_TOKEN=... and REFRESH_TOKEN=...\n` +
          `3. Restart your dev server.`
      }, { status: 400 });
    }

    // Fake expiration time logic for testing (assume 1h validity from server boot)
    const fakeExpiry = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    return NextResponse.json({
      success: true,
      message: 'Environment tokens loaded. Authentication simulated.',
      data: {
        accessTokenShort: accessToken.slice(0, 30) + '...' + accessToken.slice(-6),
        refreshTokenShort: refreshToken.slice(0, 30) + '...' + refreshToken.slice(-6),
        expiresAt: fakeExpiry,
      },
      instructions: 'When tokens expire, update them in .env.local and restart the dev server.'
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
