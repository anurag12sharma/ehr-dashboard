// app/api/appointments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { appointmentService } from '@/lib/services/appointment-service';
import { AppointmentFormData } from '@/types/fhir';

// GET /api/appointments - List appointments with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const params = {
      _count: searchParams.get('_count') ? parseInt(searchParams.get('_count')!) : undefined,
      patient: searchParams.get('patient') || undefined,
      practitioner: searchParams.get('practitioner') || undefined,
      status: searchParams.get('status') || undefined,
      date: searchParams.get('date') || undefined,
    };

    const appointments = await appointmentService.getAppointments(params);

    return NextResponse.json({
      success: true,
      data: appointments,
      count: appointments.length,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('GET /api/appointments failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch appointments',
    }, { status: 500 });
  }
}

// POST /api/appointments - Create new appointment
export async function POST(request: NextRequest) {
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

    if (!appointmentData.startDateTime) {
      return NextResponse.json({
        success: false,
        error: 'Start date and time is required',
      }, { status: 400 });
    }

    const newAppointment = await appointmentService.createAppointment(appointmentData);

    return NextResponse.json({
      success: true,
      data: newAppointment,
      message: 'Appointment created successfully',
      timestamp: new Date().toISOString(),
    }, { status: 201 });

  } catch (error) {
    console.error('POST /api/appointments failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create appointment',
    }, { status: 500 });
  }
}
