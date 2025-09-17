// app/page.tsx
'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 px-4 py-16">
      <main className="max-w-xl w-full flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3">
          <div className="bg-white/70 rounded-full p-4 shadow-lg mb-2">
            <Image
              src="/next.svg"
              alt="Next.js logo"
              width={90}
              height={19}
              priority
            />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-1 tracking-tight drop-shadow-lg">EHR Dashboard</h1>
          <p className="text-center text-gray-700 max-w-xl text-lg font-medium">
            Welcome to your professional Electronic Health Records solution.<br />
            Effortlessly manage patients, appointments, and clinical notes in a secure, modern interface.
          </p>
        </div>
        <section className="glass-panel flex flex-col gap-6 w-full shadow-2xl rounded-2xl p-8 bg-white/60 backdrop-blur-md border border-gray-200">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl py-4 px-6 text-lg font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition shadow-md border border-blue-100 justify-center"
          >
            <span className="text-2xl">📈</span> <span>Enter Dashboard</span>
          </Link>
          <Link
            href="/dashboard/patients"
            className="flex items-center gap-3 rounded-xl py-4 px-6 text-lg font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition shadow-md border border-emerald-100 justify-center"
          >
            <span className="text-2xl">🧑‍⚕️</span> <span>View Patients</span>
          </Link>
          <Link
            href="/dashboard/appointments"
            className="flex items-center gap-3 rounded-xl py-4 px-6 text-lg font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 transition shadow-md border border-purple-100 justify-center"
          >
            <span className="text-2xl">📅</span> <span>Manage Appointments</span>
          </Link>
          <Link
            href="/dashboard/records"
            className="flex items-center gap-3 rounded-xl py-4 px-6 text-lg font-bold text-yellow-700 bg-yellow-50 hover:bg-yellow-100 transition shadow-md border border-yellow-100 justify-center"
          >
            <span className="text-2xl">📂</span> <span>View Clinical Notes</span>
          </Link>
        </section>
        <footer className="mt-8 text-gray-400 text-sm text-center">
          &copy; {new Date().getFullYear()} EHR Dashboard. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
