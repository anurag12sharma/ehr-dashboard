// 'use client';

// import React, { useState, useEffect } from 'react';
// import { PatientFormData, PatientSummary } from '@/types/fhir';
// import { XMarkIcon } from '@heroicons/react/24/outline';

// type MedicalHistoryEntry = {
//   condition: string;
//   diagnosisDate?: string;
//   notes?: string;
// };
// type AllergyEntry = {
//   substance: string;
//   reaction?: string;
//   severity?: string;
//   notes?: string;
// };
// type TelecomEntry = { system: 'email' | 'phone'; value: string };
// type AddressEntry = { line?: string[]; city?: string; state?: string; postalCode?: string; country?: string };

// interface PatientModalProps {
//   mode: 'create' | 'edit' | 'view';
//   patient: PatientApiData | PatientSummary | null;
//   onClose: () => void;
//   onSubmit: (data: PatientFormData) => Promise<{ success: boolean; error?: string }>;
// }


// export interface PatientApiData {
//   id?: string;
//   fhirId?: string;
//   name?: { given?: string[]; family?: string }[];
//   telecom?: TelecomEntry[];
//   address?: AddressEntry[];
//   active?: boolean;
//   gender?: string;
//   birthDate?: string;
//   email?: string;
//   phone?: string;
//   medicalHistory?: MedicalHistoryEntry[];
//   allergies?: AllergyEntry[];
// }


// const initialFormData: PatientFormData = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   phone: '',
//   gender: 'unknown',
//   birthDate: '',
//   address: {
//     line1: '',
//     line2: '',
//     city: '',
//     state: '',
//     postalCode: '',
//     country: 'US',
//   },
//   emergencyContact: {
//     name: '',
//     relationship: '',
//     phone: '',
//   },
//   medicalRecordNumber: '',
//   active: true,
//   medicalHistory: [],
//   allergies: [],
// };

// export function PatientModal({ mode, patient, onClose, onSubmit }: PatientModalProps) {
//   const [formData, setFormData] = useState<PatientFormData>(initialFormData);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loadingPatient, setLoadingPatient] = useState(false);
//   const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryEntry[]>([]);
// const [allergies, setAllergies] = useState<AllergyEntry[]>([]);


//   useEffect(() => {
//     if ((mode === 'edit' || mode === 'view') && patient) {
//       loadPatientData();
//     }
//     if (mode === 'create') {
//       setFormData(initialFormData);
//       setMedicalHistory([]);
//       setAllergies([]);
//       setLoadingPatient(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [mode, patient]);

//   const loadPatientData = async () => {
//     if (!patient) return;
//     setLoadingPatient(true);
//     try {
//       const response = await fetch(`/api/patients/${patient.id}`);
//       const result = await response.json();
//       if (result.success && result.data) {
//         const data = result.data;
//         setFormData(prev => ({
//           ...prev,
//           id: data.fhirId || data.id || '',
//           firstName:
//             Array.isArray(data.name) && data.name.length > 0 && data.name[0].given?.[0]
//               ? data.name[0].given[0]
//               : '',
//           lastName:
//             Array.isArray(data.name) && data.name.length > 0 && data.name[0].family
//               ? data.name[0].family
//               : '',
//               email: data.telecom?.find((t: TelecomEntry) => t.system === 'email')?.value || data.email || '',
//               phone: data.telecom?.find((t: TelecomEntry) => t.system === 'phone')?.value || data.phone || '',              
//           gender: data.gender || 'unknown',
//           birthDate: data.birthDate || '',
//           address: {
//             line1: data.address?.[0]?.line?.[0] || '',
//             line2: data.address?.[0]?.line?.[1] || '',
//             city: data.address?.[0]?.city || '',
//             state: data.address?.[0]?.state || '',
//             postalCode: data.address?.[0]?.postalCode || '',
//             country: data.address?.[0]?.country || 'US',
//           },
//           active: typeof data.active === 'boolean' ? data.active : true,
//         }));
//         setMedicalHistory(data.medicalHistory || []);
//         setAllergies(data.allergies || []);
//       }
//     } catch {
//       setError('Failed to load patient data');
//     } finally {
//       setLoadingPatient(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (mode === 'view') return;
//     setLoading(true);
//     setError(null);
//     const result = await onSubmit(formData);
//     setLoading(false);
//     if (result.success) onClose();
//     else setError(result.error || 'Operation failed');
//   };

//   const handleInputChange = <K extends keyof PatientFormData>(
//     field: K,
//     value: PatientFormData[K]
//   ) =>
//     setFormData(prev => ({ ...prev, [field]: value }));

//   const handleAddressChange = (
//     field: keyof PatientFormData['address'],
//     value: string
//   ) =>
//     setFormData(prev => ({
//       ...prev,
//       address: { ...prev.address, [field]: value },
//     }));

//   const getModalTitle = () => {
//     switch (mode) {
//       case 'create': return 'Add New Patient';
//       case 'edit': return 'Edit Patient';
//       case 'view': return 'Patient Details';
//     }
//   };

//   const isReadonly = mode === 'view';

//   // MAIN RENDER
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Background overlay with blur */}
//       <div
//         className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       ></div>
//       <div className="relative z-10 w-full max-w-2xl glass-panel rounded-2xl fade-in max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-gray-100 p-6">
//           <h3 className="text-xl font-bold text-gray-900">{getModalTitle()}</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition"
//           >
//             <XMarkIcon className="h-6 w-6" />
//           </button>
//         </div>
//         <div className="px-6 pb-7 pt-5">
//         {loadingPatient ? (
//   <div className="flex justify-center items-center py-12">
//     <div className="loading-spinner"></div>
//     <span className="ml-3 text-gray-500">Loading patient data...</span>
//   </div>
// )  : (
//             <form onSubmit={handleSubmit} className="space-y-8">
//               {error && (
//                 <div className="rounded-md bg-red-50 p-4 text-red-700 mb-4">{error}</div>
//               )}

//               {/* Patient ID & Status */}
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-medium text-gray-700">
//                     Patient ID
//                   </label>
//                   <input
//                     type="text"
//                     disabled
//                     value={formData.id || ''}
//                     className="input-soft"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-medium text-gray-700">
//                     Status
//                   </label>
//                   <input
//                     type="text"
//                     disabled
//                     value={formData.active ? 'Active' : 'Inactive'}
//                     className="input-soft"
//                   />
//                 </div>
//               </div>

//               {/* Name */}
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-medium text-gray-700">
//                     First Name *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     disabled={isReadonly}
//                     value={formData.firstName}
//                     onChange={e => handleInputChange('firstName', e.target.value)}
//                     className="input-soft"
//                     autoComplete="off"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-medium text-gray-700">
//                     Last Name *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     disabled={isReadonly}
//                     value={formData.lastName}
//                     onChange={e => handleInputChange('lastName', e.target.value)}
//                     className="input-soft"
//                     autoComplete="off"
//                   />
//                 </div>
//               </div>

//               {/* Gender / Birthdate */}
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-medium text-gray-700">
//                     Gender
//                   </label>
//                   <select
//                     value={formData.gender}
//                     disabled={isReadonly}
//                     onChange={e =>
//                       handleInputChange('gender', e.target.value as PatientFormData['gender'])
//                     }
//                     className="input-soft"
//                   >
//                     <option value="unknown">Unknown</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-medium text-gray-700">
//                     Date of Birth *
//                   </label>
//                   <input
//                     type="date"
//                     required
//                     disabled={isReadonly}
//                     value={formData.birthDate}
//                     onChange={e => handleInputChange('birthDate', e.target.value)}
//                     className="input-soft"
//                   />
//                 </div>
//               </div>

//               {/* Email / Phone */}
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     disabled={isReadonly}
//                     value={formData.email}
//                     onChange={e => handleInputChange('email', e.target.value)}
//                     className="input-soft"
//                     autoComplete="off"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-medium text-gray-700">
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     disabled={isReadonly}
//                     value={formData.phone}
//                     onChange={e => handleInputChange('phone', e.target.value)}
//                     className="input-soft"
//                     autoComplete="off"
//                   />
//                 </div>
//               </div>

//               {/* Address Section */}
//               <div className="border-t border-gray-200 pt-6">
//                 <h4 className="text-md font-medium text-gray-900 mb-4">Address</h4>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Street Address
//                     </label>
//                     <input
//                       type="text"
//                       disabled={isReadonly}
//                       value={formData.address.line1}
//                       onChange={e => handleAddressChange('line1', e.target.value)}
//                       className="input-soft"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Street Address 2
//                     </label>
//                     <input
//                       type="text"
//                       disabled={isReadonly}
//                       value={formData.address.line2}
//                       onChange={e => handleAddressChange('line2', e.target.value)}
//                       className="input-soft"
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         City
//                       </label>
//                       <input
//                         type="text"
//                         disabled={isReadonly}
//                         value={formData.address.city}
//                         onChange={e => handleAddressChange('city', e.target.value)}
//                         className="input-soft"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         State
//                       </label>
//                       <input
//                         type="text"
//                         disabled={isReadonly}
//                         value={formData.address.state}
//                         onChange={e => handleAddressChange('state', e.target.value)}
//                         className="input-soft"
//                       />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Postal Code
//                       </label>
//                       <input
//                         type="text"
//                         disabled={isReadonly}
//                         value={formData.address.postalCode}
//                         onChange={e => handleAddressChange('postalCode', e.target.value)}
//                         className="input-soft"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Country
//                       </label>
//                       <input
//                         type="text"
//                         disabled={isReadonly}
//                         value={formData.address.country}
//                         onChange={e => handleAddressChange('country', e.target.value)}
//                         className="input-soft"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Medical History */}
//               <div>
//                 <div className="text-xs text-gray-500 mt-4 mb-1">Medical History</div>
//                 {medicalHistory.length === 0 ? (
//                   <div className="italic text-xs text-gray-400">No history reported</div>
//                 ) : (
//                   <ul className="list-disc ml-6 text-sm">
//                     {medicalHistory.map((entry, i) => (
//                       <li key={i}>
//                         <span className="font-semibold">{entry.condition}</span>
//                         {entry.diagnosisDate && (
//                           <span className="ml-2 text-xs text-gray-500">({entry.diagnosisDate})</span>
//                         )}
//                         {entry.notes && (
//                           <span className="ml-2 italic text-gray-600">{entry.notes}</span>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>

//               {/* Allergies */}
//               <div>
//                 <div className="text-xs text-gray-500 mt-4 mb-1">Allergies</div>
//                 {allergies.length === 0 ? (
//                   <div className="italic text-xs text-gray-400">No allergies reported</div>
//                 ) : (
//                   <ul className="list-disc ml-6 text-sm">
//                     {allergies.map((entry, i) => (
//                       <li key={i}>
//                         <span className="font-semibold">{entry.substance}</span>
//                         {entry.reaction && (
//                           <span className="ml-2 text-xs text-red-600">Reaction: {entry.reaction}</span>
//                         )}
//                         {entry.severity && (
//                           <span className="ml-2 text-xs text-yellow-700">Severity: {entry.severity}</span>
//                         )}
//                         {entry.notes && (
//                           <span className="ml-2 italic text-gray-600">{entry.notes}</span>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>

//               {/* Active Checkbox */}
//               <div className="flex items-center pt-1">
//                 <input
//                   id="active"
//                   type="checkbox"
//                   checked={formData.active}
//                   disabled={isReadonly}
//                   onChange={e => handleInputChange('active', e.target.checked)}
//                   className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
//                   Patient is active
//                 </label>
//               </div>

//               {/* Save/Cancel Buttons */}
//               {!isReadonly && (
//                 <div className="flex justify-end gap-2 pt-6">
//                   <button type="button" onClick={onClose} className="btn-outline">
//                     Cancel
//                   </button>
//                   <button type="submit" disabled={loading} className="btn-main">
//                     {loading
//                       ? (mode === 'create' ? 'Creating...' : 'Updating...')
//                       : (mode === 'create' ? 'Create Patient' : 'Update Patient')}
//                   </button>
//                 </div>
//               )}
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
