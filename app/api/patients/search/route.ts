// app/api/patients/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { patientService } from '@/lib/services/patient-service';

// GET /api/patients/search?q={query} - Search patients
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({
        success: false,
        error: 'Search query is required',
      }, { status: 400 });
    }

    const patients = await patientService.searchPatients(query);

    return NextResponse.json({
      success: true,
      data: patients,
      count: patients.length,
      query,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('GET /api/patients/search failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Search failed',
    }, { status: 500 });
  }
}
