// import { PatientSummary, AppointmentSummary } from '@/types/fhir';

// export function transformAthenaPatientToSummary(athenaPatient: any): PatientSummary {
//   return {
//     id: athenaPatient.patientid.toString(),
//     name: `${athenaPatient.firstname || ''} ${athenaPatient.lastname || ''}`.trim(),
//     email: athenaPatient.email || '',
//     phone: athenaPatient.homephone || athenaPatient.mobilephone || '',
//     birthDate: athenaPatient.dob || '',
//     gender: athenaPatient.sex?.toLowerCase() || 'unknown',
//     age: athenaPatient.age || calculateAge(athenaPatient.dob),
//     active: athenaPatient.status !== 'inactive',
//   };
// }

// export function transformAthenaAppointmentToSummary(athenaAppointment: any): AppointmentSummary {
//   const startDateTime = `${athenaAppointment.date}T${athenaAppointment.starttime || '00:00'}:00`;
//   const duration = athenaAppointment.duration || 30;
//   const endDateTime = new Date(new Date(startDateTime).getTime() + duration * 60000).toISOString();

//   return {
//     id: athenaAppointment.appointmentid.toString(),
//     title: athenaAppointment.appointmenttype || 'Medical Appointment',
//     patientId: athenaAppointment.patientid?.toString()       // <-- Add this line!
//       ?? athenaAppointment.patient?.patientid?.toString()    // handle both flat & nested cases, if any
//       ?? '',    
//     patientName: `${athenaAppointment.patient?.firstname || ''} ${athenaAppointment.patient?.lastname || ''}`.trim(),
//     practitionerName: `${athenaAppointment.provider?.firstname || ''} ${athenaAppointment.provider?.lastname || ''}`.trim(),
//     startDateTime,
//     endDateTime,
//     duration,
//     status: mapAthenaAppointmentStatus(athenaAppointment.appointmentstatus),
//     appointmentType: athenaAppointment.appointmenttype?.toLowerCase() || 'consultation',
//     location: athenaAppointment.departmentname || 'Main Office',
//     reason: athenaAppointment.reasonname || '',
//     priority: 'routine',
//     isToday: athenaAppointment.date === new Date().toISOString().split('T')[0],
//     isUpcoming: new Date(startDateTime) > new Date(),
//   };
// }

// function calculateAge(birthDate: string): number {
//   if (!birthDate) return 0;
//   const today = new Date();
//   const birth = new Date(birthDate);
//   let age = today.getFullYear() - birth.getFullYear();
//   const monthDiff = today.getMonth() - birth.getMonth();
//   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
//     age--;
//   }
//   return age;
// }

// function mapAthenaAppointmentStatus(athenaStatus: string): string {
//   const statusMap: { [key: string]: string } = {
//     'SCHEDULED': 'booked',
//     'CONFIRMED': 'booked',
//     'ARRIVED': 'arrived',
//     'CHECKED IN': 'arrived',
//     'COMPLETED': 'fulfilled',
//     'CANCELLED': 'cancelled',
//     'NO SHOW': 'noshow',
//     'PENDING': 'pending',
//   };
  
//   return statusMap[athenaStatus?.toUpperCase()] || 'pending';
// }

// export function transformPatientFormDataToAthena(formData: any) {
//   return {
//     firstname: formData.firstName,
//     lastname: formData.lastName,
//     email: formData.email,
//     homephone: formData.phone,
//     sex: formData.gender?.toUpperCase(),
//     dob: formData.birthDate,
//     address1: formData.address?.line1,
//     address2: formData.address?.line2,
//     city: formData.address?.city,
//     state: formData.address?.state,
//     zip: formData.address?.postalCode,
//     status: formData.active ? 'active' : 'inactive',
//   };
// }

// export function transformAppointmentFormDataToAthena(formData: any) {
//   const startDate = new Date(formData.startDateTime);
//   return {
//     patientid: formData.patientId,
//     appointmenttype: formData.appointmentType,
//     date: startDate.toISOString().split('T')[0],
//     starttime: startDate.toTimeString().substring(0, 5),
//     duration: formData.duration,
//     reasonname: formData.reason,
//     notes: formData.notes,
//   };
// }
