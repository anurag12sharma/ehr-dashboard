import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/services/database-service';
import { transformClinicalNoteToSummary, transformClinicalNoteFormToDatabase } from '@/lib/transformers/database-transformers';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const note = await databaseService.getClinicalNoteById(id);

    if (!note) {
      return NextResponse.json({
        success: false,
        error: 'Clinical note not found',
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: transformClinicalNoteToSummary(note),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`GET /api/clinical-notes/${id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch clinical note',
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
    const updateData = transformClinicalNoteFormToDatabase(formData);

    const note = await databaseService.updateClinicalNote(id, updateData);

    if (!note) {
      return NextResponse.json({
        success: false,
        error: 'Clinical note not found',
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: transformClinicalNoteToSummary(note),
      message: 'Clinical note updated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`PUT /api/clinical-notes/${id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update clinical note',
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
    const deleted = await databaseService.deleteClinicalNote(id);

    if (!deleted) {
      return NextResponse.json({
        success: false,
        error: 'Clinical note not found',
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Clinical note deleted successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`DELETE /api/clinical-notes/${id} failed:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete clinical note',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
