import { NextResponse } from 'next/server';
import { testModMedConnection } from '@/lib/api/test-connection';

export async function GET() {
  try {
    await testModMedConnection();
    
    return NextResponse.json({
      success: true,
      message: 'ModMed API authentication successful!',
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Auth test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
