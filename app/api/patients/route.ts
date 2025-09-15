import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/services/database-service';
import { transformPatientToSummary, transformPatientFormToDatabase } from '@/lib/transformers/database-transformers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') ?? searchParams.get('q') ?? undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

    const patients = await databaseService.getPatients({ search, limit, offset });
    const patientSummaries = patients.map(transformPatientToSummary);

    return NextResponse.json({
      success: true,
      data: patientSummaries,
      count: patientSummaries.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GET /api/patients failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch patients',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const databasePatientData = transformPatientFormToDatabase(formData);
    
    const patient = await databaseService.createPatient(databasePatientData);
    const patientSummary = transformPatientToSummary(patient);
    
    return NextResponse.json({
      success: true,
      data: patientSummary,
      message: 'Patient created successfully',
      timestamp: new Date().toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/patients failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create patient',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
