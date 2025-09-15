import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/services/database-service';
import { transformPatientFormToDatabase } from '@/lib/transformers/database-transformers';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } =await context.params;
  try {
    const patient = await databaseService.getPatientById(id);

    if (!patient) {
      return NextResponse.json({
        success: false,
        error: 'Patient not found',
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

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

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const body = await request.json();
    // Convert incoming form data into database fields (name, telecom, address, etc.)
    const updateData = transformPatientFormToDatabase(body);

    const updatedPatient = await databaseService.updatePatient(id, updateData);

    if (!updatedPatient) {
      return NextResponse.json({
        success: false,
        error: 'Patient not found',
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedPatient,
      message: 'Patient updated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`PUT /api/patients/${id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update patient',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
