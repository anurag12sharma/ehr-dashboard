'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UserGroupIcon,
  CalendarDaysIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalPatients: number;
  todaysAppointments: number;
  upcomingAppointments: number;
  pendingAppointments: number;
}

interface PatientSearchResult {
  id: string;
  name: string;
  gender: string;
  birthDate: string;
  phone?: string;
  email?: string;
  active?: boolean;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    todaysAppointments: 0,
    upcomingAppointments: 0,
    pendingAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  // Patient Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<PatientSearchResult[] | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);

      // Load stats from your custom stats endpoint!
      const res = await fetch('/api/dashboard/stats');
      const statsResult = await res.json();

      if (statsResult.success) {
        setStats({
          totalPatients: statsResult.data.totalPatients,
          todaysAppointments: statsResult.data.todaysAppointments,
          upcomingAppointments: statsResult.data.upcomingAppointments,
          pendingAppointments: statsResult.data.pendingAppointments,
        });
      }
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handler for searching patients
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setSearching(true);
    setSearchResults(null);
    setSearchError(null);

    try {
      // You can search by name, fhirId, identifier, etc. (using `q` covers all)
      const url = `/api/patients?q=${encodeURIComponent(searchTerm.trim())}&limit=10`;
      const res = await fetch(url);
      const json = await res.json();

      if (json.success) {
        setSearchResults(json.data);
        setSearchError(null);
      } else {
        setSearchResults([]);
        setSearchError(json.error || 'No patients found');
      }
    } catch (err) {
      setSearchResults([]);
      setSearchError('Error searching for patients');
    } finally {
      setSearching(false);
    }
  };

  const quickActions = [
    {
      name: 'Add New Patient',
      href: '/dashboard/patients',
      icon: UserGroupIcon,
      description: 'Register a new patient in the system',
      color: 'bg-blue-500',
    },
    {
      name: 'Schedule Appointment',
      href: '/dashboard/appointments',
      icon: CalendarDaysIcon,
      description: 'Book a new appointment for a patient',
      color: 'bg-emerald-500',
    },
    {
      name: 'View Clinical Notes',
      href: '/dashboard/clinical-notes',
      icon: ChartBarIcon,
      description: 'Access patient clinical notes',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome to your EHR management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* ...[stats cards unchanged]... */}
        {/* Example: */}
        <div className="glass-panel card-hover flex items-center border-l-4 border-blue-500">
          <div className="p-2 rounded-lg bg-blue-100 mr-4">
            <UserGroupIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Total Patients</div>
            <div className="text-2xl font-semibold text-gray-900">
              {loading ? '...' : stats.totalPatients}
            </div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              +12% this month
            </div>
          </div>
        </div>
        {/* [repeat for other stat cards...] */}
        <div className="glass-panel card-hover flex items-center border-l-4 border-emerald-500">
          <div className="p-2 rounded-lg bg-emerald-100 mr-4">
            <CalendarDaysIcon className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Today's Appointments</div>
            <div className="text-2xl font-semibold text-gray-900">
              {loading ? '...' : stats.todaysAppointments}
            </div>
          </div>
        </div>
        <div className="glass-panel card-hover flex items-center border-l-4 border-purple-500">
          <div className="p-2 rounded-lg bg-purple-100 mr-4">
            <ClockIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Upcoming</div>
            <div className="text-2xl font-semibold text-gray-900">
              {loading ? '...' : stats.upcomingAppointments}
            </div>
          </div>
        </div>
        <div className="glass-panel card-hover flex items-center border-l-4 border-yellow-500">
          <div className="p-2 rounded-lg bg-yellow-100 mr-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Pending</div>
            <div className="text-2xl font-semibold text-gray-900">
              {loading ? '...' : stats.pendingAppointments}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-panel">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <p className="text-sm text-gray-500">Frequently used actions</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex items-center space-x-4 p-4 card-hover rounded-lg border border-gray-200 bg-white hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-200"
            >
              <span className={`p-2 rounded-lg ${action.color} shadow`}>
                <action.icon className="h-5 w-5 text-white" />
              </span>
              <span>
                <div className="text-[1rem] font-semibold text-gray-900">{action.name}</div>
                <div className="text-sm text-gray-500">{action.description}</div>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-panel">
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-sm text-gray-500">Latest updates and changes</p>
        </div>
        <div className="text-center py-8 text-gray-500 flex flex-col items-center">
          <ChartBarIcon className="h-10 w-10 mb-3 text-gray-400" />
          <span className="mb-1 font-medium text-gray-700">No recent activity</span>
          <span className="text-sm">Activity will appear here as you use the system.</span>
        </div>
      </div>
    </div>
  );
}
