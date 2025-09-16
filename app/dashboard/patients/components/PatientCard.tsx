// // app/dashboard/patients/components/PatientCard.tsx
// 'use client';

// import React from 'react';
// import { PatientSummary } from '@/types/fhir';
// import {
//   EyeIcon,
//   PencilIcon,
//   TrashIcon,
//   PhoneIcon,
//   EnvelopeIcon,
//   CalendarIcon,
// } from '@heroicons/react/24/outline';

// interface PatientCardProps {
//   patient: PatientSummary;
//   onView: () => void;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// export function PatientCard({ patient, onView, onEdit, onDelete }: PatientCardProps) {
//   const getInitials = (name: string) =>
//     name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);

//   const getStatusColor = (active: boolean) =>
//     active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-500';

//   const getGenderIcon = (gender: string) => {
//     const colors = {
//       male: 'bg-blue-100 text-blue-600',
//       female: 'bg-pink-100 text-pink-600',
//       other: 'bg-purple-100 text-purple-600',
//       unknown: 'bg-gray-100 text-gray-600',
//     };
//     return colors[gender as keyof typeof colors] || colors.unknown;
//   };

//   return (
//     <div className="glass-panel card-hover rounded-xl transition group flex flex-col h-full">
//       <div className="p-6 flex-1 flex flex-col">
//         {/* Header */}
//         <div className="flex items-center space-x-3">
//           <div className={`h-12 w-12 rounded-full flex items-center justify-center font-semibold text-base shadow-sm ${getGenderIcon(patient.gender)}`}>
//             {getInitials(patient.name)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h3 className="text-lg font-bold text-gray-900 truncate">{patient.name}</h3>
//             <p className="text-xs text-gray-500">ID: {patient.id}</p>
//           </div>
//           <span className={`badge px-2.5 py-0.5 ${getStatusColor(patient.active)} font-semibold`}>
//             {patient.active ? 'Active' : 'Inactive'}
//           </span>
//         </div>

//         {/* Info */}
//         <div className="mt-3 space-y-1">
//           <div className="flex items-center text-sm text-gray-600">
//             <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
//             {patient.age} years old
//             <span className="mx-2">•</span>
//             <span className="capitalize">{patient.gender}</span>
//           </div>
//           {patient.phone && (
//             <div className="flex items-center text-sm text-gray-600">
//               <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
//               {patient.phone}
//             </div>
//           )}
//           {patient.email && (
//             <div className="flex items-center text-sm text-gray-600">
//               <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
//               <span className="truncate">{patient.email}</span>
//             </div>
//           )}
//         </div>

//         {/* Birth Date */}
//         {patient.birthDate && (
//           <div className="mt-2 text-xs text-gray-500">Born: {new Date(patient.birthDate).toLocaleDateString()}</div>
//         )}

//         {/* Actions */}
//         <div className="mt-5 flex gap-2">
//           <button onClick={onView} className="btn-outline flex-1 flex items-center justify-center gap-1">
//             <EyeIcon className="h-4 w-4" />
//             View
//           </button>
//           <button onClick={onEdit} className="btn-calm flex-1 flex items-center justify-center gap-1">
//             <PencilIcon className="h-4 w-4" />
//             Edit
//           </button>
//           <button onClick={onDelete} className="btn-danger flex items-center justify-center gap-1">
//             <TrashIcon className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
