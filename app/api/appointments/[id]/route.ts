import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/services/database-service';
import { transformAppointmentToSummary, transformAppointmentFormToDatabase } from '@/lib/transformers/database-transformers';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  try {
    const appointment = await databaseService.getAppointmentById(id);
    
    if (!appointment) {
      return NextResponse.json({
        success: false,
        error: 'Appointment not found',
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: transformAppointmentToSummary(appointment),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`GET /api/appointments/${id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch appointment',
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
    const updateData = transformAppointmentFormToDatabase(formData);
    
    const appointment = await databaseService.updateAppointment(id, updateData);
    
    if (!appointment) {
      return NextResponse.json({
        success: false,
        error: 'Appointment not found',
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: transformAppointmentToSummary(appointment),
      message: 'Appointment updated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`PUT /api/appointments/${id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update appointment',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const deleted = await databaseService.deleteAppointment(id);
    
    if (!deleted) {
      return NextResponse.json({
        success: false,
        error: 'Appointment not found',
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment deleted successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`DELETE /api/appointments/${id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete appointment',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
