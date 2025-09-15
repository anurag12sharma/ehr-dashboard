import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/services/database-service';

export async function GET(request: NextRequest) {
  try {
    const stats = await databaseService.getStats();

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GET /api/dashboard/stats failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch stats',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
