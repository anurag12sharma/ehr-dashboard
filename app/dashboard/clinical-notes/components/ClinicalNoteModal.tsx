'use client';

import React, { useState, useEffect } from 'react';
import { ClinicalNoteSummary } from '@/types/fhir';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ClinicalNoteModalProps {
  mode: 'create' | 'edit' | 'view';
  note: ClinicalNoteSummary | null;
  onClose: () => void;
  onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
}

const initialFormData: Partial<ClinicalNoteSummary> = {
  patientId: '',
  authorId: '',
  authorName: '',
  category: 'progress',
  type: 'clinical-note',
  status: 'final',
  title: '',
  date: '',
  content: '',
};

export function ClinicalNoteModal({ mode, note, onClose, onSubmit }: ClinicalNoteModalProps) {
  const [formData, setFormData] = useState<Partial<ClinicalNoteSummary>>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isView = mode === 'view';

  useEffect(() => {
    if ((mode === 'edit' || mode === 'view') && note) {
      setFormData({
        id: note.id,
        patientId: note.patientId,
        authorId: note.authorId,
        authorName: note.authorName,
        category: note.category,
        type: note.type,
        status: note.status,
        title: note.title,
        date: note.date,
        content: note.content,
        encounterId: note.encounterId,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [note, mode]);

  const handleInputChange = (field: keyof ClinicalNoteSummary, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isView) return;
    setLoading(true);
    setError(null);

    // Fallback defaults for required properties
    const data = {
      ...formData,
      date: formData.date || new Date().toISOString(),
      category: formData.category || 'progress',
      type: formData.type || 'clinical-note',
      status: formData.status || 'final',
    };

    const result = await onSubmit(data);
    setLoading(false);
    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Operation failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-lg glass-panel fade-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-8 py-5">
          <h3 className="text-xl font-bold text-gray-900">
            {mode === 'create' ? 'Add Clinical Note'
              : mode === 'edit' ? 'Edit Clinical Note'
              : 'Clinical Note Details'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="px-8 pb-8 pt-5">
          {isView ? (
            <div className="space-y-6 px-2 pb-2 pt-2">
              <div>
                <div className="text-xs text-gray-500">Title</div>
                <div className="font-medium text-gray-900">{formData.title}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Date</div>
                <div className="font-medium text-gray-900">{formData.date && (new Date(formData.date)).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Patient ID</div>
                <div className="font-medium text-gray-900">{formData.patientId}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Author</div>
                <div className="font-medium text-gray-900">{formData.authorName}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Category</div>
                <div className="font-medium text-gray-900">{formData.category}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Status</div>
                <div className="font-medium text-gray-900">{formData.status}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Content</div>
                <div className="font-medium text-gray-900 whitespace-pre-line">{formData.content}</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="rounded-md bg-red-50 p-4 text-red-700 mb-4">{error}</div>
              )}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Title *</label>
                <input
                  type="text"
                  required
                  disabled={isView}
                  value={formData.title || ''}
                  onChange={e => handleInputChange('title', e.target.value)}
                  className="input-soft"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Patient ID *</label>
                  <input
                    type="text"
                    required
                    disabled={isView}
                    value={formData.patientId || ''}
                    onChange={e => handleInputChange('patientId', e.target.value)}
                    className="input-soft"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="datetime-local"
                    disabled={isView}
                    value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
                    onChange={e => handleInputChange('date', e.target.value)}
                    className="input-soft"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Author Name *</label>
                  <input
                    type="text"
                    required
                    disabled={isView}
                    value={formData.authorName || ''}
                    onChange={e => handleInputChange('authorName', e.target.value)}
                    className="input-soft"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Author ID *</label>
                  <input
                    type="text"
                    required
                    disabled={isView}
                    value={formData.authorId || ''}
                    onChange={e => handleInputChange('authorId', e.target.value)}
                    className="input-soft"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    disabled={isView}
                    value={formData.category || ''}
                    onChange={e => handleInputChange('category', e.target.value)}
                    className="input-soft"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
                  <select
                    disabled={isView}
                    value={formData.status || 'final'}
                    onChange={e => handleInputChange('status', e.target.value)}
                    className="input-soft"
                  >
                    <option value="final">Final</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Content *</label>
                <textarea
                  required
                  minLength={3}
                  disabled={isView}
                  rows={6}
                  value={formData.content || ''}
                  onChange={e => handleInputChange('content', e.target.value)}
                  className="input-soft"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={onClose} className="btn-outline">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn-main">
                  {loading
                    ? (mode === 'create' ? 'Saving...' : 'Updating...')
                    : (mode === 'create' ? 'Save Note' : 'Update Note')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
