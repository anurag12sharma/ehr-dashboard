// app/page.tsx
'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center fade-in bg-[var(--bg-main)] px-4 py-16">
      <main className="max-w-lg w-full flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <Image
            className="mb-2"
            src="/next.svg"
            alt="Next.js logo"
            width={90}
            height={19}
            priority
          />
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">EHR Dashboard</h1>
          <p className="text-center text-gray-600 max-w-2xl">
            Welcome to your professional Electronic Health Records solution.<br />
            Use the navigation to manage patients, schedule appointments, and securely view health records.
          </p>
        </div>
        <section className="glass-panel flex flex-col gap-5 w-full shadow-lg">
          <Link
            href="/dashboard/patients"
            className="rounded-lg py-4 px-6 text-base font-semibold text-blue-700 hover:bg-blue-50 transition"
          >
            🧑‍⚕️ View Patients
          </Link>
          <Link
            href="/dashboard/appointments"
            className="rounded-lg py-4 px-6 text-base font-semibold text-emerald-700 hover:bg-emerald-50 transition"
          >
            📅 Manage Appointments
          </Link>
          <Link
            href="/dashboard/records"
            className="rounded-lg py-4 px-6 text-base font-semibold text-purple-700 hover:bg-purple-50 transition"
          >
            📂 View Records
          </Link>
        </section>
      </main>
    </div>
  );
}
