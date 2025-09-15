import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/services/database-service';
import { transformClinicalNoteToSummary, transformClinicalNoteFormToDatabase } from '@/lib/transformers/database-transformers';

// GET: List clinical notes (optionally filter by patientId)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patientId') ?? undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

    const notes = await databaseService.getClinicalNotes({
      patientId,
      limit,
      offset
    });

    const notesSummaries = notes.map(transformClinicalNoteToSummary);

    return NextResponse.json({
      success: true,
      data: notesSummaries,
      count: notesSummaries.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GET /api/clinical-notes failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch clinical notes',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

// POST: Create a new clinical note
export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const dbNoteData = transformClinicalNoteFormToDatabase(formData);

    const note = await databaseService.createClinicalNote(dbNoteData);
    const noteSummary = transformClinicalNoteToSummary(note);

    return NextResponse.json({
      success: true,
      data: noteSummary,
      message: 'Clinical note created successfully',
      timestamp: new Date().toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/clinical-notes failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create clinical note',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
