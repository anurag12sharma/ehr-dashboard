// app/api/appointments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { appointmentService } from '@/lib/services/appointment-service';
import { AppointmentFormData } from '@/types/fhir';

// GET /api/appointments/[id] - Get appointment by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointment = await appointmentService.getAppointmentById(params.id);

    return NextResponse.json({
      success: true,
      data: appointment,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error(`GET /api/appointments/${params.id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Appointment not found',
    }, { status: 404 });
  }
}

// PUT /api/appointments/[id] - Update appointment
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointmentData: AppointmentFormData = await request.json();

    // Basic validation
    if (!appointmentData.patientId) {
      return NextResponse.json({
        success: false,
        error: 'Patient ID is required',
      }, { status: 400 });
    }

    if (!appointmentData.title) {
      return NextResponse.json({
        success: false,
        error: 'Appointment title is required',
      }, { status: 400 });
    }

    const updatedAppointment = await appointmentService.updateAppointment(params.id, appointmentData);

    return NextResponse.json({
      success: true,
      data: updatedAppointment,
      message: 'Appointment updated successfully',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error(`PUT /api/appointments/${params.id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update appointment',
    }, { status: 500 });
  }
}

// DELETE /api/appointments/[id] - Delete appointment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await appointmentService.deleteAppointment(params.id);

    return NextResponse.json({
      success: true,
      message: 'Appointment deleted successfully',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error(`DELETE /api/appointments/${params.id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete appointment',
    }, { status: 500 });
  }
}
