// app/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  UserGroupIcon,
  CalendarDaysIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalPatients: number;
  todaysAppointments: number;
  upcomingAppointments: number;
  pendingAppointments: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    todaysAppointments: 0,
    upcomingAppointments: 0,
    pendingAppointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Load patients count
      const patientsResponse = await fetch('/api/patients');
      const patientsResult = await patientsResponse.json();
      
      // Load appointments
      const appointmentsResponse = await fetch('/api/appointments');
      const appointmentsResult = await appointmentsResponse.json();
      
      if (patientsResult.success && appointmentsResult.success) {
        const patients = patientsResult.data;
        const appointments = appointmentsResult.data;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const todaysAppointments = appointments.filter((apt: any) => {
          const aptDate = new Date(apt.startDateTime);
          return aptDate >= today && aptDate < tomorrow;
        }).length;
        
        const upcomingAppointments = appointments.filter((apt: any) => {
          const aptDate = new Date(apt.startDateTime);
          return aptDate > new Date();
        }).length;
        
        const pendingAppointments = appointments.filter((apt: any) => 
          apt.status === 'pending'
        ).length;
        
        setStats({
          totalPatients: patients.length,
          todaysAppointments,
          upcomingAppointments,
          pendingAppointments
        });
      }
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      name: 'Add New Patient',
      href: '/dashboard/patients',
      icon: UserGroupIcon,
      description: 'Register a new patient in the system',
      color: 'bg-blue-500'
    },
    {
      name: 'Schedule Appointment',
      href: '/dashboard/appointments',
      icon: CalendarDaysIcon,
      description: 'Book a new appointment for a patient',
      color: 'bg-green-500'
    },
    {
      name: 'View Records',
      href: '/dashboard/records',
      icon: ChartBarIcon,
      description: 'Access patient medical records',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome to your EHR management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border-l-4 border-blue-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Patients</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {loading ? '...' : stats.totalPatients}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                      <span className="sr-only">Increased by</span>
                      12%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border-l-4 border-green-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CalendarDaysIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Today's Appointments</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {loading ? '...' : stats.todaysAppointments}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg border-l-4 border-purple-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Upcoming</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {loading ? '...' : stats.upcomingAppointments}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg border-l-4 border-yellow-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {loading ? '...' : stats.pendingAppointments}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          <p className="text-sm text-gray-500">Frequently used actions</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-colors"
              >
                <div className={`flex-shrink-0 rounded-lg p-2 ${action.color}`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-900">
                    {action.name}
                  </span>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <p className="text-sm text-gray-500">Latest updates and changes</p>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No recent activity</h3>
            <p className="mt-1 text-sm text-gray-500">
              Activity will appear here as you use the system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
