// app/dashboard/layout.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z' },
  { name: 'Patients', href: '/dashboard/patients', icon: 'M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z' },
  { name: 'Appointments', href: '/dashboard/appointments', icon: 'M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"' },
  { name: 'List', href: '/dashboard/list', icon: 'M6 4.75A.75.75 0 0 1 6.75 4h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 4.75ZM6 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 10Zm0 5.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75ZM1.99 4.75a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 15.25a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 10a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1V10Z'},
  { name: 'Clinical Notes', href: '/dashboard/clinical-notes', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'},
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
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd"  d={item.icon} clip-rule="evenodd"/>
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
