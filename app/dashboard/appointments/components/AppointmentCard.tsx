// app/dashboard/appointments/components/AppointmentCard.tsx
'use client';

import React from 'react';
import { AppointmentSummary } from '@/types/fhir';
import { 
  EyeIcon, 
  PencilIcon, 
  TrashIcon,
  ClockIcon,
  UserIcon,
  MapPinIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface AppointmentCardProps {
  appointment: AppointmentSummary;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function AppointmentCard({ appointment, onView, onEdit, onDelete }: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      booked: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      fulfilled: 'bg-blue-100 text-blue-800 border-blue-200',
      arrived: 'bg-purple-100 text-purple-800 border-purple-200',
      noshow: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      checkup: 'bg-blue-50 text-blue-700',
      consultation: 'bg-green-50 text-green-700',
      'follow-up': 'bg-purple-50 text-purple-700',
      procedure: 'bg-orange-50 text-orange-700',
      emergency: 'bg-red-50 text-red-700',
      other: 'bg-gray-50 text-gray-700'
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'urgent' || priority === 'stat') {
      return (
        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
      );
    }
    return null;
  };

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateTime: string) => {
    return new Date(dateTime).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isUpcoming = new Date(appointment.startDateTime) > new Date();
  const isToday = appointment.isToday;

  return (
    <div className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 ${
      isToday ? 'border-blue-200 ring-1 ring-blue-100' : 'border-gray-200'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {appointment.title}
              </h3>
              {getPriorityIcon(appointment.priority)}
              {isToday && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                  Today
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">ID: {appointment.id}</p>
          </div>
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(appointment.status)}`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>
        </div>

        {/* Patient Info */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <UserIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-900 font-medium">{appointment.patientName}</span>
          </div>
          
          {appointment.practitionerName && (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-green-600"></div>
              </div>
              <span className="text-sm text-gray-600">{appointment.practitionerName}</span>
            </div>
          )}

          {appointment.location && (
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{appointment.location}</span>
            </div>
          )}
        </div>

        {/* Date and Time */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">
                {formatDate(appointment.startDateTime)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {formatTime(appointment.startDateTime)} - {formatTime(appointment.endDateTime)}
              </span>
            </div>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Duration: {appointment.duration} minutes
          </div>
        </div>

        {/* Appointment Type */}
        <div className="mt-3">
          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getTypeColor(appointment.appointmentType)}`}>
            {appointment.appointmentType.charAt(0).toUpperCase() + appointment.appointmentType.slice(1)}
          </span>
        </div>

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
