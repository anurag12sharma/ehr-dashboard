import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/services/database-service';
import { transformAppointmentToSummary, transformAppointmentFormToDatabase } from '@/lib/transformers/database-transformers';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } =await context.params;
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

// --- Robust PUT: with provider/patient conflict/overlap check before update ---
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const formData = await request.json();
    const updateData = transformAppointmentFormToDatabase(formData);

    // Get the previous appointment details (so we don't treat this appt as a conflict with itself)
    const originalAppt = await databaseService.getAppointmentById(id);

    // Only perform overlap check if timing/provider has actually changed
    let conflict = null;
    if (
      updateData.start !== originalAppt?.start ||
      updateData.end !== originalAppt?.end ||
      JSON.stringify(updateData.participant) !== JSON.stringify(originalAppt?.participant)
    ) {
      if (!updateData.start || !updateData.end) {
        return NextResponse.json({
          success: false,
          error: 'Missing start or end date/time for appointment.',
          timestamp: new Date().toISOString(),
        }, { status: 400 });
      }
      const participants = Array.isArray(updateData.participant) ? updateData.participant : [];
      conflict = await databaseService.findConflictingAppointment(
        participants,
        updateData.start,
        updateData.end,
        id // Pass id to exclude current appointment
      );

    }

    if (conflict) {
      return NextResponse.json({
        success: false,
        error: 'Conflicting appointment exists at this time.',
        conflict,
        timestamp: new Date().toISOString(),
      }, { status: 409 });
    }

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
  const { id } =await context.params;
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
