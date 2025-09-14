// app/api/patients/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { patientService } from '@/lib/services/patient-service';
import { PatientFormData } from '@/types/fhir';

// GET /api/patients/[id] - Get patient by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const patient = await patientService.getPatientById(params.id);

    return NextResponse.json({
      success: true,
      data: patient,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error(`GET /api/patients/${params.id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Patient not found',
    }, { status: 404 });
  }
}

// PUT /api/patients/[id] - Update patient
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const patientData: PatientFormData = await request.json();

    // Basic validation
    if (!patientData.firstName || !patientData.lastName) {
      return NextResponse.json({
        success: false,
        error: 'First name and last name are required',
      }, { status: 400 });
    }

    const updatedPatient = await patientService.updatePatient(params.id, patientData);

    return NextResponse.json({
      success: true,
      data: updatedPatient,
      message: 'Patient updated successfully',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error(`PUT /api/patients/${params.id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update patient',
    }, { status: 500 });
  }
}

// DELETE /api/patients/[id] - Delete (deactivate) patient
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await patientService.deletePatient(params.id);

    return NextResponse.json({
      success: true,
      message: 'Patient deactivated successfully',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error(`DELETE /api/patients/${params.id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete patient',
    }, { status: 500 });
  }
}
