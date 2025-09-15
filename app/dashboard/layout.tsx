// app/dashboard/layout.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z' },
  { name: 'Patients', href: '/dashboard/patients', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
  { name: 'Appointments', href: '/dashboard/appointments', icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5' },
  { name: 'List', href: '/patients', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-800/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white rounded-r-2xl pt-6 pb-4 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center px-6">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="ml-3 text-xl font-extrabold text-gray-900">EHR Dashboard</h1>
          </div>
          <nav className="mt-8 flex-1 px-4 space-y-2">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-3 text-base font-semibold rounded-lg transition-all ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-900 shadow'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-800'
                }`}
              >
                <svg className="mr-4 h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d={item.icon} clipRule="evenodd" />
                </svg>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop glassmorphic sidebar */}
<div
  className="
    hidden md:flex fixed z-30
    flex-col items-stretch
    left-8 top-1/2 -translate-y-1/2
    w-60 max-w-[90vw] min-h-[480px]
    rounded-2xl border border-blue-100/80
    bg-white/60 backdrop-blur-md
    shadow-xl px-6 py-7
    transition-all
  "
  style={{
    // Optionally, adjust for screen height
    // maxHeight: "80vh"
  }}
>
  <div className="flex items-center mb-10 gap-3 pl-1">
    <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-inner ring-2 ring-blue-200/30">
      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h1 className="ml-2 text-xl font-extrabold text-slate-900 tracking-tight">EHR Dashboard</h1>
  </div>
  <nav className="flex-1 flex flex-col gap-1">
    {navigation.map(item => (
      <Link
        key={item.name}
        href={item.href}
        className={`
          flex items-center gap-3 font-medium rounded-lg px-3 py-2 transition-all
          ${pathname === item.href
            ? 'bg-blue-100 text-blue-900 shadow border-l-4 border-blue-600'
            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
          }
        `}
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d={item.icon} clipRule="evenodd" />
        </svg>
        <span>{item.name}</span>
      </Link>
    ))}
  </nav>
  <div className="mt-10 flex items-center gap-3 rounded-lg px-2 py-2 bg-white/70 shadow-inner">
    <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center mr-1">
      <span className="text-base text-white font-semibold">A</span>
    </div>
    <div>
      <div className="font-semibold text-gray-900 text-sm">Dev Anurag</div>
      <div className="text-xs text-gray-500">Administrator</div>
    </div>
  </div>
</div>


      {/* Main content */}
      <div className="md:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-10 min-h-screen">
          <main>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
