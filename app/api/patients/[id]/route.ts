import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/services/database-service';
// Optionally: import { transformPatientToDetail } from '@/lib/transformers/database-transformers';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const patient = await databaseService.getPatientById(id);

    if (!patient) {
      return NextResponse.json({
        success: false,
        error: 'Patient not found',
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    // If you want to format patient with a transformer, replace patient below with transformPatientToDetail(patient)
    return NextResponse.json({
      success: true,
      data: patient,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`GET /api/patients/${id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch patient',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

// Add PUT and DELETE handlers below if needed for full REST support
