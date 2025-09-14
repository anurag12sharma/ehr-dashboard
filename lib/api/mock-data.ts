export const mockPatientBundle = {
    resourceType: "Bundle",
    type: "searchset",
    total: 25,
    entry: [
      {
        resource: {
          resourceType: "Patient",
          id: "patient-001",
          name: [
            {
              family: "Doe",
              given: ["John", "Michael"]
            }
          ],
          gender: "male",
          birthDate: "1985-03-15",
          telecom: [
            {
              system: "phone",
              value: "555-0123",
              use: "home"
            },
            {
              system: "email",
              value: "john.doe@email.com"
            }
          ],
          address: [
            {
              line: ["123 Main St"],
              city: "Anytown",
              state: "CA",
              postalCode: "12345",
              country: "US"
            }
          ]
        }
      },
      {
        resource: {
          resourceType: "Patient",
          id: "patient-002",
          name: [
            {
              family: "Smith",
              given: ["Jane", "Elizabeth"]
            }
          ],
          gender: "female",
          birthDate: "1992-07-22",
          telecom: [
            {
              system: "phone",
              value: "555-0456"
            }
          ]
        }
      },
      {
        resource: {
          resourceType: "Patient",
          id: "patient-003",
          name: [
            {
              family: "Johnson",
              given: ["Robert", "William"]
            }
          ],
          gender: "male",
          birthDate: "1978-11-08"
        }
      }
    ]
  };
  
  export const mockAppointmentBundle = {
    resourceType: "Bundle",
    type: "searchset",
    total: 15,
    entry: [
      {
        resource: {
          resourceType: "Appointment",
          id: "appointment-001",
          status: "booked",
          start: "2025-09-16T10:00:00Z",
          end: "2025-09-16T10:30:00Z",
          participant: [
            {
              actor: {
                reference: "Patient/patient-001"
              },
              status: "accepted"
            }
          ],
          description: "Regular checkup"
        }
      }
    ]
  };
  