export interface AthenaPatient {
    patientid: number;
    firstname: string;
    lastname: string;
    email?: string;
    homephone?: string;
    mobilephone?: string;
    sex?: string;
    dob?: string;
    age?: number;
    status?: string;
    address1?: string;
    city?: string;
    state?: string;
    zip?: string;
  }
  
  export interface AthenaAppointment {
    appointmentid: number;
    date: string;
    starttime?: string;
    duration?: number;
    appointmenttype?: string;
    appointmentstatus?: string;
    patientid?: number;
    patient?: {
      firstname?: string;
      lastname?: string;
    };
    provider?: {
      firstname?: string;
      lastname?: string;
    };
    departmentname?: string;
    reasonname?: string;
  }
  