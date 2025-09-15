'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ClinicalNoteSummary } from '@/types/fhir';
import { ClinicalNoteModal } from './components/ClinicalNoteModal';

export default function ClinicalNotesPage() {
  const [notes, setNotes] = useState<ClinicalNoteSummary[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<ClinicalNoteSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<ClinicalNoteSummary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  // Load notes from API
  const loadNotes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/clinical-notes');
      const result = await response.json();
      if (result.success) {
        setNotes(result.data);
        setFilteredNotes(result.data);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadNotes(); }, [loadNotes]);

  // Filter notes
  useEffect(() => {
    let filtered = notes;
    if (searchQuery.trim()) {
      filtered = notes.filter(note =>
        (note.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.content || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.authorName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.patientId || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredNotes(filtered);
  }, [searchQuery, notes]);

  // Modal handlers
  const handleCreateNote = () => {
    setSelectedNote(null);
    setModalMode('create');
    setIsModalOpen(true);
  };
  const handleEditNote = (note: ClinicalNoteSummary) => {
    setSelectedNote(note);
    setModalMode('edit');
    setIsModalOpen(true);
  };
  const handleViewNote = (note: ClinicalNoteSummary) => {
    setSelectedNote(note);
    setModalMode('view');
    setIsModalOpen(true);
  };
  const handleDeleteNote = async (noteId: string) => {
    try {
      await fetch(`/api/clinical-notes/${noteId}`, { method: 'DELETE' });
      await loadNotes();
    } catch {
      // silent
    }
  };
  const handleModalSubmit = async (data: any) => {
    try {
      const url = modalMode === 'create'
        ? '/api/clinical-notes'
        : `/api/clinical-notes/${selectedNote?.id}`;
      const method = modalMode === 'create' ? 'POST' : 'PUT';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsModalOpen(false);
        await loadNotes();
        return { success: true };
      } else {
        const result = await response.json();
        return { success: false, error: result.error };
      }
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Clinical Notes</h1>
          <p className="text-sm text-gray-500">
            View and document patient clinical notes
          </p>
        </div>
        <button onClick={handleCreateNote} className="btn-main flex items-center gap-2">
          <PlusIcon className="-ml-0.5 h-5 w-5" />
          Add Note
        </button>
      </div>

      {/* Search Bar */}
      <div className="glass-panel py-4 px-6 flex items-center gap-4">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          className="w-full rounded-xl border-none outline-none bg-white/70 py-2.5 pl-3 pr-4 text-base text-gray-900 shadow ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400 transition"
          placeholder="Search notes by title, patient, content, or author..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
      </div>

      {/* Notes List or Empty State */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="loading-spinner" />
          <span className="ml-3 text-gray-500">Loading notes...</span>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center">
          <h3 className="mt-3 text-base font-semibold text-gray-900">No clinical notes found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery
              ? 'Try adjusting your search terms.'
              : 'Get started by documenting a clinical note.'}
          </p>
          {!searchQuery && (
            <button
              onClick={handleCreateNote}
              className="btn-main mt-6 flex items-center gap-2"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" />
              Add Note
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map(note => (
            <div key={note.id} className="glass-panel card-hover p-5 rounded-xl shadow border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{note.title}</h3>
                  <div className="text-xs text-gray-400">{note.date && (new Date(note.date)).toLocaleString()}</div>
                </div>
                <span className="ml-2 inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 border border-blue-100">
                  {note.category}
                </span>
              </div>
              <div className="mt-2 text-gray-600 text-sm line-clamp-3">{note.content}</div>
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <span>By: {note.authorName}</span>
                <span>Patient: {note.patientId}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn-outline flex-1" onClick={() => handleViewNote(note)}>View</button>
                <button className="btn-calm flex-1" onClick={() => handleEditNote(note)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDeleteNote(note.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal */}
      {isModalOpen && (
        <ClinicalNoteModal
          mode={modalMode}
          note={selectedNote}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}
