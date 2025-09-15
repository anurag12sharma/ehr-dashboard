import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/services/database-service';
import { transformPatientToSummary, transformPatientFormToDatabase } from '@/lib/transformers/database-transformers';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
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
      data: transformPatientToSummary(patient),
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
    const formData = await request.json();
    const updateData = transformPatientFormToDatabase(formData);
    
    const patient = await databaseService.updatePatient(id, updateData);
    
    if (!patient) {
      return NextResponse.json({
        success: false,
        error: 'Patient not found',
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: transformPatientToSummary(patient),
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

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  try {
    const deleted = await databaseService.deletePatient(id);
    
    if (!deleted) {
      return NextResponse.json({
        success: false,
        error: 'Patient not found',
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Patient deleted successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`DELETE /api/patients/${id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete patient',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
