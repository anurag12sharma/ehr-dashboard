// app/dashboard/patients/components/PatientCard.tsx
'use client';

import React from 'react';
import { PatientSummary } from '@/types/fhir';
import { 
  EyeIcon, 
  PencilIcon, 
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface PatientCardProps {
  patient: PatientSummary;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function PatientCard({ patient, onView, onEdit, onDelete }: PatientCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (active: boolean) => {
    return active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getGenderIcon = (gender: string) => {
    const colors = {
      male: 'bg-blue-100 text-blue-600',
      female: 'bg-pink-100 text-pink-600',
      other: 'bg-purple-100 text-purple-600',
      unknown: 'bg-gray-100 text-gray-600'
    };
    return colors[gender as keyof typeof colors] || colors.unknown;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center font-medium text-sm ${getGenderIcon(patient.gender)}`}>
            {getInitials(patient.name)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {patient.name}
            </h3>
            <p className="text-sm text-gray-500">ID: {patient.id}</p>
          </div>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(patient.active)}`}>
            {patient.active ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Patient Info */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span>{patient.age} years old</span>
            <span className="mx-2">•</span>
            <span className="capitalize">{patient.gender}</span>
          </div>
          
          {patient.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
              <span>{patient.phone}</span>
            </div>
          )}
          
          {patient.email && (
            <div className="flex items-center text-sm text-gray-600">
              <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
              <span className="truncate">{patient.email}</span>
            </div>
          )}
        </div>

        {/* Birth Date */}
        {patient.birthDate && (
          <div className="mt-3 text-xs text-gray-500">
            Born: {new Date(patient.birthDate).toLocaleDateString()}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex space-x-2">
          <button
            onClick={onView}
            className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <EyeIcon className="h-4 w-4 mr-1" />
            View
          </button>
          <button
            onClick={onEdit}
            className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
