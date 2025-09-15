import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/services/database-service';
import { transformAppointmentToSummary, transformAppointmentFormToDatabase } from '@/lib/transformers/database-transformers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startdate') ?? searchParams.get('startDate') ?? undefined;
    const endDate = searchParams.get('enddate') ?? searchParams.get('endDate') ?? undefined;
    const patientId = searchParams.get('patientId') ?? undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

    const appointments = await databaseService.getAppointments({ 
      startDate, 
      endDate, 
      patientId, 
      limit, 
      offset 
    });
    
    const appointmentSummaries = appointments.map(transformAppointmentToSummary);

    return NextResponse.json({
      success: true,
      data: appointmentSummaries,
      count: appointmentSummaries.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GET /api/appointments failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch appointments',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const databaseAppointmentData = transformAppointmentFormToDatabase(formData);
    
    const appointment = await databaseService.createAppointment(databaseAppointmentData);
    const appointmentSummary = transformAppointmentToSummary(appointment);
    
    return NextResponse.json({
      success: true,
      data: appointmentSummary,
      message: 'Appointment created successfully',
      timestamp: new Date().toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/appointments failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create appointment',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
