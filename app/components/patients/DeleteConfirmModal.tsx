'use client';

import React from 'react';
import { PatientSummary } from '@/types/fhir';

interface DeleteConfirmModalProps {
  patient: PatientSummary;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ patient, onConfirm, onCancel }: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay with blur */}
      <div
        className="fixed inset-0 bg-gray-800/30 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      ></div>

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl glass-panel shadow-xl fade-in">
        <div className="p-6">
          <div className="flex items-center mb-3">
            <div className="flex-shrink-0 rounded-full bg-red-100 flex items-center justify-center h-12 w-12">
              <svg className="h-7 w-7 text-red-700" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-800">Delete Patient</h3>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-3">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">{patient.name}</span>?
              This will <span className="font-semibold">deactivate</span> 
            </p>
            <div className="mt-4 rounded-lg bg-yellow-50 p-4">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-yellow-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-800 mb-1">
                    This action cannot be undone through the interface.
                  </p>
                  <p className="text-xs text-yellow-700">
                    Contact your system administrator if you need to reactivate this record.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 flex justify-end space-x-3 px-6 py-4 rounded-b-2xl">
          <button
            type="button"
            onClick={onConfirm}
            className="btn-main bg-red-600 hover:bg-red-700"
          >
            Delete Patient
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
