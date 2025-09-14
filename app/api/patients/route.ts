import { NextRequest, NextResponse } from 'next/server';
import { patientService } from '@/lib/services/patient-service';
import { PatientFormData } from '@/types/fhir';

// GET /api/patients - List patients with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const params = {
      _count: searchParams.get('_count') ? parseInt(searchParams.get('_count')!) : undefined,
      name: searchParams.get('name') || undefined,
      gender: searchParams.get('gender') || undefined,
      active: searchParams.get('active') ? searchParams.get('active') === 'true' : undefined,
    };

    const patients = await patientService.getPatients(params);

    return NextResponse.json({
      success: true,
      data: patients,
      count: patients.length,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('GET /api/patients failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch patients',
    }, { status: 500 });
  }
}

// POST /api/patients - Create new patient
export async function POST(request: NextRequest) {
  try {
    const patientData: PatientFormData = await request.json();

    // Basic validation
    if (!patientData.firstName || !patientData.lastName) {
      return NextResponse.json({
        success: false,
        error: 'First name and last name are required',
      }, { status: 400 });
    }

    if (!patientData.birthDate) {
      return NextResponse.json({
        success: false,
        error: 'Birth date is required',
      }, { status: 400 });
    }

    const newPatient = await patientService.createPatient(patientData);

    return NextResponse.json({
      success: true,
      data: newPatient,
      message: 'Patient created successfully',
      timestamp: new Date().toISOString(),
    }, { status: 201 });

  } catch (error) {
    console.error('POST /api/patients failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create patient',
    }, { status: 500 });
  }
}
