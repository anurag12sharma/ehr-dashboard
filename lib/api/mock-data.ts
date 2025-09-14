// lib/api/mock-data.ts (updated with more patients)
export const mockPatientBundle = {
  "resourceType": "Bundle",
  "id": "840768d4-b783-473d-adcb-313d71a136da",
  "meta": {
    "lastUpdated": "2025-09-14T14:25:58.569+00:00"
  },
  "type": "searchset",
  "total": 50,
  "link": [
    {
      "relation": "self",
      "url": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/"
    },
    {
      "relation": "next",
      "url": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/?page=2"
    }
  ],
  "entry": [
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375390",
      "resource": {
        "resourceType": "Patient",
        "id": "375390",
        "meta": {
          "lastUpdated": "2025-05-13T15:50:44.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "112416PAT000000002"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "MM0000000002"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Test",
            "given": [
              "Female"
            ]
          }
        ],
        "gender": "female",
        "birthDate": "2000-09-09",
        "deceasedBoolean": false,
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375391",
      "resource": {
        "resourceType": "Patient",
        "id": "375391",
        "meta": {
          "lastUpdated": "2025-09-14T11:22:42.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "112416PAT000000001"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "MM0000000003"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Test-updated",
            "given": [
              "check final name Test-updated"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5551234567",
            "use": "mobile",
            "rank": 1
          },
          {
            "system": "email",
            "value": "updated.email@example.com"
          }
        ],
        "gender": "male",
        "birthDate": "1995-09-12",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "123 Updated Street"
            ],
            "city": "New City",
            "state": "CA",
            "postalCode": "90210"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392",
      "resource": {
        "resourceType": "Patient",
        "id": "375392",
        "meta": {
          "lastUpdated": "2025-05-13T17:29:02.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "112416PAT000000003"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "MM0000000001"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Test",
            "given": [
              "Child"
            ]
          }
        ],
        "gender": "unknown",
        "birthDate": "2018-09-13",
        "deceasedBoolean": false,
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375404",
      "resource": {
        "resourceType": "Patient",
        "id": "375404",
        "meta": {
          "lastUpdated": "2025-05-13T15:50:47.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
            "extension": [
              {
                "url": "ombCategory",
                "valueCoding": {
                  "system": "http://hl7.org/fhir/us/core/STU3/ValueSet-omb-race-category.html",
                  "code": "2106-3",
                  "display": "White"
                }
              },
              {
                "url": "text",
                "valueString": "White"
              }
            ]
          },
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "ombCategory",
                "valueCoding": {
                  "system": "http://hl7.org/fhir/us/core/STU3/ValueSet-omb-ethnicity-category.html",
                  "code": "2135-2",
                  "display": "Hispanic or Latino"
                }
              },
              {
                "url": "text",
                "valueString": "Hispanic or Latino"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "252168475"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "243842198"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "148987557"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Costello",
            "given": [
              "Valeria"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5559274399",
            "use": "home",
            "rank": 1
          },
          {
            "system": "phone",
            "value": "5554846436",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5553158940",
            "use": "work"
          },
          {
            "system": "email",
            "value": "vcostello@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1972-05-07",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "529582 View Avenue"
            ],
            "city": "Boynton Beach",
            "state": "FL",
            "postalCode": "33437"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "63756 First Way"
            ],
            "city": "Leesburg",
            "state": "FL",
            "postalCode": "33749"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375405",
      "resource": {
        "resourceType": "Patient",
        "id": "375405",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "1"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "288316102"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "333224444"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "O'hara",
            "given": [
              "Shana",
              "M"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5558505336",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5554839947",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5553497679",
            "use": "work"
          },
          {
            "system": "email",
            "value": "Shana1@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1982-06-02",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "23934 Washington Street"
            ],
            "city": "Hudson",
            "state": "NY",
            "postalCode": "12534"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "39541 Fifth Way"
            ],
            "city": "Palm Beach Gardens",
            "state": "FL",
            "postalCode": "33418"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375406",
      "resource": {
        "resourceType": "Patient",
        "id": "375406",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "554443624"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "920006117"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "532314000"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Peoples",
            "given": [
              "Savannah"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5558681499",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5553894880",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5555076402",
            "use": "home"
          },
          {
            "system": "email",
            "value": "speoples@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1983-06-16",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "46693 Elm Way"
            ],
            "city": "Georgetown",
            "state": "NY",
            "postalCode": "13072"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "69641 Happy Lane"
            ],
            "city": "Boynton Beach",
            "state": "FL",
            "postalCode": "33437"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375407",
      "resource": {
        "resourceType": "Patient",
        "id": "375407",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "159168301"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "864144696"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "393724694"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Cornett",
            "given": [
              "Brian"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5554325716",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5557641702",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5556418530",
            "use": "work"
          },
          {
            "system": "email",
            "value": "bcornett@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1984-12-16",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "68221 Park Avenue"
            ],
            "city": "Gulfport",
            "state": "FL",
            "postalCode": "33707"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "29889 Fourth Avenue"
            ],
            "city": "Gulfport",
            "state": "FL",
            "postalCode": "33707"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375408",
      "resource": {
        "resourceType": "Patient",
        "id": "375408",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "796241079"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "756489661"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "283950481"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Aragon",
            "given": [
              "Brian"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5553338929",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5551191943",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5555638359",
            "use": "work"
          },
          {
            "system": "email",
            "value": "baragon@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1969-08-11",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "82497 Ninth Lane"
            ],
            "city": "Georgetown",
            "state": "NY",
            "postalCode": "13072"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "87078 Happy Avenue"
            ],
            "city": "Plantation",
            "state": "FL",
            "postalCode": "33322"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375409",
      "resource": {
        "resourceType": "Patient",
        "id": "375409",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "885213169"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "516379685"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "322044308"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Frederick",
            "given": [
              "Bryan"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5558061328",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5552105984",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5557598161",
            "use": "work"
          },
          {
            "system": "email",
            "value": "bfrederick@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1997-12-05",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "99129 Maple Lane"
            ],
            "city": "Gulfport",
            "state": "FL",
            "postalCode": "33707"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "2109 Hill Avenue"
            ],
            "city": "Plantation",
            "state": "FL",
            "postalCode": "33322"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375410",
      "resource": {
        "resourceType": "Patient",
        "id": "375410",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "413922410"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "261496663"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "858259610"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Baxter",
            "given": [
              "Cynthia"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5557933121",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5559826860",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5556894192",
            "use": "mobile"
          },
          {
            "system": "email",
            "value": "cbaxter@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1979-11-14",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "80431 Sedona Street"
            ],
            "city": "Lake Worth",
            "state": "FL",
            "postalCode": "33463"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "27116 First Avenue"
            ],
            "city": "Boynton Beach",
            "state": "FL",
            "postalCode": "33437"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375411",
      "resource": {
        "resourceType": "Patient",
        "id": "375411",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "650500121"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "241614087"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "889650494"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Ross",
            "given": [
              "Sydney"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5554971797",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5555924773",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5552905693",
            "use": "home"
          },
          {
            "system": "email",
            "value": "sross@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1963-04-25",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "77502 Elm Avenue"
            ],
            "city": "Hudson",
            "state": "NY",
            "postalCode": "12534"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "22065 Park Street"
            ],
            "city": "Hudson",
            "state": "NY",
            "postalCode": "12534"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375412",
      "resource": {
        "resourceType": "Patient",
        "id": "375412",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "177581490"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "930468744"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "698766949"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Allen",
            "given": [
              "Carlos"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5554107077",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5551517923",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5556759624",
            "use": "work"
          },
          {
            "system": "email",
            "value": "callen@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1966-01-06",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "76604 Cedar Lane"
            ],
            "city": "Hudson",
            "state": "NY",
            "postalCode": "12534"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "67933 Sedona Way"
            ],
            "city": "Plantation",
            "state": "FL",
            "postalCode": "33322"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375413",
      "resource": {
        "resourceType": "Patient",
        "id": "375413",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "740506536"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "744002704"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "198394979"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Mccormick",
            "given": [
              "Margaret"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5554111337",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5555082861",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5554281724",
            "use": "work"
          },
          {
            "system": "email",
            "value": "mmccormick@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1996-05-08",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "50742 Knottywood Way"
            ],
            "city": "South Bay",
            "state": "FL",
            "postalCode": "33493"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "19213 Fifth Way"
            ],
            "city": "Plantation",
            "state": "FL",
            "postalCode": "33322"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375414",
      "resource": {
        "resourceType": "Patient",
        "id": "375414",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "711189864"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "304028642"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "504593335"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Lucero",
            "given": [
              "Sofia"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5553879808",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5553655628",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5554935993",
            "use": "work"
          },
          {
            "system": "email",
            "value": "slucero@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "2006-04-16",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "7382 Lake Lane"
            ],
            "city": "Plantation",
            "state": "FL",
            "postalCode": "33322"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "93073 Sixth Street"
            ],
            "city": "South Bay",
            "state": "FL",
            "postalCode": "33493"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375415",
      "resource": {
        "resourceType": "Patient",
        "id": "375415",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "113123511"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "588371834"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "415405492"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Cortez",
            "given": [
              "Alexis"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5555022552",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5554881138",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5551781371",
            "use": "work"
          },
          {
            "system": "email",
            "value": "acortez@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1986-12-31",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "55608 Washington Lane"
            ],
            "city": "Lake Worth",
            "state": "FL",
            "postalCode": "33463"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "32313 Seventh Lane"
            ],
            "city": "South Bay",
            "state": "FL",
            "postalCode": "33493"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375416",
      "resource": {
        "resourceType": "Patient",
        "id": "375416",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "579345153"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "717441108"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "258896142"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Schafer",
            "given": [
              "Justin"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5552157518",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5552916409",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5556653277",
            "use": "work"
          },
          {
            "system": "email",
            "value": "jschafer@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1967-12-31",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "63957 View Lane"
            ],
            "city": "Boynton Beach",
            "state": "FL",
            "postalCode": "33437"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "74968 Merlot Avenue"
            ],
            "city": "Hudson",
            "state": "NY",
            "postalCode": "12534"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375417",
      "resource": {
        "resourceType": "Patient",
        "id": "375417",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "454964621"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "852000617"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "252289676"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Ladd",
            "given": [
              "Gregory"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5557375116",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5551414376",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5554188795",
            "use": "work"
          },
          {
            "system": "email",
            "value": "gladd@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1977-05-23",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "84563 Eighth Street"
            ],
            "city": "Gulfport",
            "state": "FL",
            "postalCode": "33707"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "96378 Fifth Avenue"
            ],
            "city": "Plantation",
            "state": "FL",
            "postalCode": "33322"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375418",
      "resource": {
        "resourceType": "Patient",
        "id": "375418",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "170970713"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "193936345"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "865112992"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Flores",
            "given": [
              "Robert"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5559758837",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5554734102",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5554807663",
            "use": "home"
          },
          {
            "system": "email",
            "value": "rflores@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1958-04-05",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "temp",
            "type": "both",
            "line": [
              "32747 Third Avenue"
            ],
            "city": "Boynton Beach",
            "state": "FL",
            "postalCode": "33437"
          },
          {
            "use": "home",
            "type": "both",
            "line": [
              "1828 Knottywood Avenue"
            ],
            "city": "Boynton Beach",
            "state": "FL",
            "postalCode": "33437"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375419",
      "resource": {
        "resourceType": "Patient",
        "id": "375419",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "348995452"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "604227695"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "988659199"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Alexander",
            "given": [
              "Vanessa"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5551809096",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5556096578",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5552114554",
            "use": "home"
          },
          {
            "system": "email",
            "value": "valexander@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1959-06-10",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "temp",
            "type": "both",
            "line": [
              "94604 Sixth Avenue"
            ],
            "city": "Palm Beach Gardens",
            "state": "FL",
            "postalCode": "33418"
          },
          {
            "use": "home",
            "type": "both",
            "line": [
              "77519 Fourth Avenue"
            ],
            "city": "Boynton Beach",
            "state": "FL",
            "postalCode": "33437"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375420",
      "resource": {
        "resourceType": "Patient",
        "id": "375420",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "243448112"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "787083812"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "618852197"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Washburn",
            "given": [
              "Carolyn"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5559762760",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5552298029",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5552749922",
            "use": "mobile"
          },
          {
            "system": "email",
            "value": "cwashburn@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1963-01-26",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "93135 Main Lane"
            ],
            "city": "Gulfport",
            "state": "FL",
            "postalCode": "33707"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "11181 Maple Lane"
            ],
            "city": "Plantation",
            "state": "FL",
            "postalCode": "33322"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375421",
      "resource": {
        "resourceType": "Patient",
        "id": "375421",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "898205629"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "436827439"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "559999035"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Tracy",
            "given": [
              "Robert"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5553483413",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5551118654",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5557736745",
            "use": "work"
          },
          {
            "system": "email",
            "value": "rtracy@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1960-11-28",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "85370 Happy Way"
            ],
            "city": "Lake Worth",
            "state": "FL",
            "postalCode": "33463"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "65545 First Avenue"
            ],
            "city": "Hudson",
            "state": "NY",
            "postalCode": "12534"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375422",
      "resource": {
        "resourceType": "Patient",
        "id": "375422",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:51.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "270876085"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "321927927"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "582555182"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Noodleman",
            "given": [
              "David"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5553283877",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5558261987",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5559438812",
            "use": "work"
          },
          {
            "system": "email",
            "value": "david@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1989-08-29",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "74291 Sixth Lane"
            ],
            "city": "Leesburg",
            "state": "FL",
            "postalCode": "33749"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "46840 Maple Way"
            ],
            "city": "Plantation",
            "state": "FL",
            "postalCode": "33322"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375423",
      "resource": {
        "resourceType": "Patient",
        "id": "375423",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "201400179"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "688858246"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "253098048"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Cooley",
            "given": [
              "Caroline"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5555724887",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5556789543",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5556398254",
            "use": "work"
          },
          {
            "system": "email",
            "value": "ccooley@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "2002-09-29",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "89958 Lake Street"
            ],
            "city": "Hudson",
            "state": "NY",
            "postalCode": "12534"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "75679 First Way"
            ],
            "city": "Plantation",
            "state": "FL",
            "postalCode": "33322"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375424",
      "resource": {
        "resourceType": "Patient",
        "id": "375424",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "254798386"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "206054947"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "917144782"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Brock",
            "given": [
              "Mia"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5556767613",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5557289935",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5554644033",
            "use": "work"
          },
          {
            "system": "email",
            "value": "mbrock@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1983-03-30",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "65077 Seventh Avenue"
            ],
            "city": "Leesburg",
            "state": "FL",
            "postalCode": "33749"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "96112 Oak Way"
            ],
            "city": "Leesburg",
            "state": "FL",
            "postalCode": "33749"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375425",
      "resource": {
        "resourceType": "Patient",
        "id": "375425",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "195407424"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "641688617"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "480414911"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Chin",
            "given": [
              "Frank"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5554446247",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5557083676",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5559898899",
            "use": "home"
          },
          {
            "system": "email",
            "value": "fchin@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1995-08-29",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "temp",
            "type": "both",
            "line": [
              "97273 Merlot Lane"
            ],
            "city": "Gulfport",
            "state": "FL",
            "postalCode": "33707"
          },
          {
            "use": "home",
            "type": "both",
            "line": [
              "32519 View Way"
            ],
            "city": "Palm Beach Gardens",
            "state": "FL",
            "postalCode": "33418"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375426",
      "resource": {
        "resourceType": "Patient",
        "id": "375426",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "422125739"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "571422511"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "426749943"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Solis",
            "given": [
              "Barbara"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5558926824",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5554111825",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5556771509",
            "use": "mobile"
          },
          {
            "system": "email",
            "value": "bsolis@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1986-01-03",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "57987 Maple Avenue"
            ],
            "city": "Lake Worth",
            "state": "FL",
            "postalCode": "33463"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "51085 Hill Way"
            ],
            "city": "Leesburg",
            "state": "FL",
            "postalCode": "33749"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375427",
      "resource": {
        "resourceType": "Patient",
        "id": "375427",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "560373208"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "136941176"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "445381685"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Castaneda",
            "given": [
              "Hayden"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5554264017",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5553387141",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5559699550",
            "use": "mobile"
          },
          {
            "system": "email",
            "value": "hcastaneda@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1990-06-06",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "44083 Lake Lane"
            ],
            "city": "Gulfport",
            "state": "FL",
            "postalCode": "33707"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "25391 Lake Avenue"
            ],
            "city": "Leesburg",
            "state": "FL",
            "postalCode": "33749"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375428",
      "resource": {
        "resourceType": "Patient",
        "id": "375428",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "526995643"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "144201892"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "883622947"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Sherman",
            "given": [
              "Joshua"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5552302124",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5551428988",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5559675480",
            "use": "home"
          },
          {
            "system": "email",
            "value": "jsherman@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "2004-08-07",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "temp",
            "type": "both",
            "line": [
              "71768 Sixth Street"
            ],
            "city": "Hudson",
            "state": "NY",
            "postalCode": "12534"
          },
          {
            "use": "home",
            "type": "both",
            "line": [
              "7251 Fourth Way"
            ],
            "city": "Palm Beach Gardens",
            "state": "FL",
            "postalCode": "33418"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375429",
      "resource": {
        "resourceType": "Patient",
        "id": "375429",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "887973157"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "889282683"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "568566901"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Hathaway",
            "given": [
              "Henry"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5558032902",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5554727724",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5559389638",
            "use": "home"
          },
          {
            "system": "email",
            "value": "hhathaway@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1976-11-07",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "temp",
            "type": "both",
            "line": [
              "19153 Cedar Way"
            ],
            "city": "Leesburg",
            "state": "FL",
            "postalCode": "33749"
          },
          {
            "use": "home",
            "type": "both",
            "line": [
              "10507 Fourth Lane"
            ],
            "city": "Leesburg",
            "state": "FL",
            "postalCode": "33749"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375430",
      "resource": {
        "resourceType": "Patient",
        "id": "375430",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "863962402"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "668679897"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "756705777"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Knox",
            "given": [
              "Lauren"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5555547526",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5558967402",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5554772476",
            "use": "work"
          },
          {
            "system": "email",
            "value": "lknox@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1961-07-09",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "52044 Ninth Avenue"
            ],
            "city": "Gulfport",
            "state": "FL",
            "postalCode": "33707"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "75659 Park Street"
            ],
            "city": "Palm Beach Gardens",
            "state": "FL",
            "postalCode": "33418"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375431",
      "resource": {
        "resourceType": "Patient",
        "id": "375431",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "965136692"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "957230528"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "761458611"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Talbot",
            "given": [
              "Robert"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5556588803",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5553717647",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5552641663",
            "use": "work"
          },
          {
            "system": "email",
            "value": "rtalbot@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1959-10-12",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "6708 Happy Street"
            ],
            "city": "South Bay",
            "state": "FL",
            "postalCode": "33493"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "87271 Fourth Way"
            ],
            "city": "Lake Worth",
            "state": "FL",
            "postalCode": "33463"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375432",
      "resource": {
        "resourceType": "Patient",
        "id": "375432",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "504450775"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "652029257"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "988655457"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Rhoades",
            "given": [
              "Frances"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5557504903",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5555345768",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5551361329",
            "use": "work"
          },
          {
            "system": "email",
            "value": "frhoades@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1997-07-16",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "67572 Fifth Avenue"
            ],
            "city": "Leesburg",
            "state": "FL",
            "postalCode": "33749"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "78849 Knottywood Lane"
            ],
            "city": "Palm Beach Gardens",
            "state": "FL",
            "postalCode": "33418"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375433",
      "resource": {
        "resourceType": "Patient",
        "id": "375433",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "535684114"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "875020588"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "544975296"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Yang",
            "given": [
              "Edward"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5551928507",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5558502705",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5555342455",
            "use": "home"
          },
          {
            "system": "email",
            "value": "eyang@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1967-01-03",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "temp",
            "type": "both",
            "line": [
              "70700 Maple Street"
            ],
            "city": "Hudson",
            "state": "NY",
            "postalCode": "12534"
          },
          {
            "use": "home",
            "type": "both",
            "line": [
              "51132 View Way"
            ],
            "city": "Plantation",
            "state": "FL",
            "postalCode": "33322"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375434",
      "resource": {
        "resourceType": "Patient",
        "id": "375434",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "550919639"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "406760398"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "755741497"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Boudreaux",
            "given": [
              "Aaliyah"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5554936096",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5557447048",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5551576440",
            "use": "home"
          },
          {
            "system": "email",
            "value": "aboudreaux@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1976-11-01",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "temp",
            "type": "both",
            "line": [
              "79557 Lake Way"
            ],
            "city": "Lake Worth",
            "state": "FL",
            "postalCode": "33463"
          },
          {
            "use": "home",
            "type": "both",
            "line": [
              "98727 Park Avenue"
            ],
            "city": "Hudson",
            "state": "NY",
            "postalCode": "12534"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375435",
      "resource": {
        "resourceType": "Patient",
        "id": "375435",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:51.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "961775842"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "108671265"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "933673156"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Atridge",
            "given": [
              "Melissa"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5555312620",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5558718343",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5554275766",
            "use": "mobile"
          },
          {
            "system": "email",
            "value": "melissa@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1980-04-14",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "27348 Merlot Way"
            ],
            "city": "Plantation",
            "state": "FL",
            "postalCode": "33322"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "49152 Washington Avenue"
            ],
            "city": "Boynton Beach",
            "state": "FL",
            "postalCode": "33437"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375436",
      "resource": {
        "resourceType": "Patient",
        "id": "375436",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "949162144"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "812308597"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "508837743"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Everett",
            "given": [
              "Tyler"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5553122873",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5555437807",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5555466645",
            "use": "mobile"
          },
          {
            "system": "email",
            "value": "teverett@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1966-12-29",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "63416 First Lane"
            ],
            "city": "Lake Worth",
            "state": "FL",
            "postalCode": "33463"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "94217 Hill Street"
            ],
            "city": "Palm Beach Gardens",
            "state": "FL",
            "postalCode": "33418"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375437",
      "resource": {
        "resourceType": "Patient",
        "id": "375437",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "429917193"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "414928581"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "990675890"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Murillo",
            "given": [
              "Luis"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5553576452",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5552509485",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5551225028",
            "use": "home"
          },
          {
            "system": "email",
            "value": "lmurillo@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "2006-10-14",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "temp",
            "type": "both",
            "line": [
              "85023 First Way"
            ],
            "city": "Palm Beach Gardens",
            "state": "FL",
            "postalCode": "33418"
          },
          {
            "use": "home",
            "type": "both",
            "line": [
              "89120 Washington Lane"
            ],
            "city": "Georgetown",
            "state": "NY",
            "postalCode": "13072"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375438",
      "resource": {
        "resourceType": "Patient",
        "id": "375438",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "410484288"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "686471537"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "300991806"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Trotter",
            "given": [
              "Amy"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5555021705",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5556666793",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5554719169",
            "use": "work"
          },
          {
            "system": "email",
            "value": "atrotter@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1972-09-13",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "39064 Third Avenue"
            ],
            "city": "Hudson",
            "state": "NY",
            "postalCode": "12534"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "16024 Seventh Lane"
            ],
            "city": "Georgetown",
            "state": "NY",
            "postalCode": "13072"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375439",
      "resource": {
        "resourceType": "Patient",
        "id": "375439",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "378270298"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "891210324"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "753307058"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Enriquez",
            "given": [
              "Kimberly"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5559748747",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5559388481",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5557964697",
            "use": "home"
          },
          {
            "system": "email",
            "value": "kenriquez@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "2006-06-10",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "temp",
            "type": "both",
            "line": [
              "18154 Washington Street"
            ],
            "city": "Boynton Beach",
            "state": "FL",
            "postalCode": "33437"
          },
          {
            "use": "home",
            "type": "both",
            "line": [
              "41058 Park Way"
            ],
            "city": "Leesburg",
            "state": "FL",
            "postalCode": "33749"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375440",
      "resource": {
        "resourceType": "Patient",
        "id": "375440",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "262049437"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "304727003"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "420337982"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Blue",
            "given": [
              "Cooper"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5555638021",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5556647565",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5553405016",
            "use": "mobile"
          },
          {
            "system": "email",
            "value": "cblue@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1995-08-16",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "temp",
            "type": "both",
            "line": [
              "51103 View Way"
            ],
            "city": "Palm Beach Gardens",
            "state": "FL",
            "postalCode": "33418"
          },
          {
            "use": "home",
            "type": "both",
            "line": [
              "59106 View Lane"
            ],
            "city": "Hudson",
            "state": "NY",
            "postalCode": "12534"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375441",
      "resource": {
        "resourceType": "Patient",
        "id": "375441",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "300757528"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "376593876"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "341261698"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Hopkins",
            "given": [
              "Caleb"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5558378829",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5554787954",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5556661617",
            "use": "home"
          },
          {
            "system": "email",
            "value": "chopkins@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "2007-06-12",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "temp",
            "type": "both",
            "line": [
              "10955 Ninth Street"
            ],
            "city": "Boynton Beach",
            "state": "FL",
            "postalCode": "33437"
          },
          {
            "use": "home",
            "type": "both",
            "line": [
              "2644 Main Way"
            ],
            "city": "Lake Worth",
            "state": "FL",
            "postalCode": "33463"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375442",
      "resource": {
        "resourceType": "Patient",
        "id": "375442",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "786038488"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "671070261"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "622985360"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Padgett",
            "given": [
              "Timothy"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5553105486",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5559594696",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5552457128",
            "use": "work"
          },
          {
            "system": "email",
            "value": "tpadgett@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1975-06-21",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "98832 Park Avenue"
            ],
            "city": "Palm Beach Gardens",
            "state": "FL",
            "postalCode": "33418"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "2195 Lake Avenue"
            ],
            "city": "Georgetown",
            "state": "NY",
            "postalCode": "13072"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375443",
      "resource": {
        "resourceType": "Patient",
        "id": "375443",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "455427096"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "990584222"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "666278665"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Randall",
            "given": [
              "Caleb"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5556233729",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5555749356",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5556401485",
            "use": "work"
          },
          {
            "system": "email",
            "value": "crandall@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1962-01-09",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "80011 Merlot Way"
            ],
            "city": "Gulfport",
            "state": "FL",
            "postalCode": "33707"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "42748 Ninth Way"
            ],
            "city": "Plantation",
            "state": "FL",
            "postalCode": "33322"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375444",
      "resource": {
        "resourceType": "Patient",
        "id": "375444",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "506942476"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "669998983"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "229522578"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Tolbert",
            "given": [
              "Hayden"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5558978062",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5552061573",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5554616782",
            "use": "work"
          },
          {
            "system": "email",
            "value": "htolbert@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1969-05-03",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "27916 Knottywood Avenue"
            ],
            "city": "Palm Beach Gardens",
            "state": "FL",
            "postalCode": "33418"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "79516 Pine Street"
            ],
            "city": "South Bay",
            "state": "FL",
            "postalCode": "33493"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375445",
      "resource": {
        "resourceType": "Patient",
        "id": "375445",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "378947953"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "547427737"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "115405784"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Pagan",
            "given": [
              "Alex"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5558077680",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5552206905",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5557812749",
            "use": "home"
          },
          {
            "system": "email",
            "value": "apagan@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1993-10-01",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "85532 Park Way"
            ],
            "city": "Hudson",
            "state": "NY",
            "postalCode": "12534"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "78895 Seventh Street"
            ],
            "city": "South Bay",
            "state": "FL",
            "postalCode": "33493"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375446",
      "resource": {
        "resourceType": "Patient",
        "id": "375446",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:52.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "432904437"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "627626261"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "645864967"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Lutz",
            "given": [
              "Cameron"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5555529006",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5559466676",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5555058441",
            "use": "mobile"
          },
          {
            "system": "email",
            "value": "clutz@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1961-02-01",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "5155 Maple Lane"
            ],
            "city": "Plantation",
            "state": "FL",
            "postalCode": "33322"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "70595 Pine Lane"
            ],
            "city": "Gulfport",
            "state": "FL",
            "postalCode": "33707"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375447",
      "resource": {
        "resourceType": "Patient",
        "id": "375447",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "684800462"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "599109388"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "603222373"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Salazar",
            "given": [
              "Jasmine"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5559854832",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5559768246",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5554615422",
            "use": "home"
          },
          {
            "system": "email",
            "value": "jsalazar@nowhere.com"
          }
        ],
        "gender": "female",
        "birthDate": "1994-03-21",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "55802 Fifth Street"
            ],
            "city": "Gulfport",
            "state": "FL",
            "postalCode": "33707"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "51547 Third Street"
            ],
            "city": "Plantation",
            "state": "FL",
            "postalCode": "33322"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375448",
      "resource": {
        "resourceType": "Patient",
        "id": "375448",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "330198571"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "555621083"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "681276633"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Drew",
            "given": [
              "Evan"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5558455002",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5552778011",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5558958700",
            "use": "mobile"
          },
          {
            "system": "email",
            "value": "edrew@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1965-09-16",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "40251 Park Avenue"
            ],
            "city": "Hudson",
            "state": "NY",
            "postalCode": "12534"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "60605 Washington Lane"
            ],
            "city": "Lake Worth",
            "state": "FL",
            "postalCode": "33463"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375449",
      "resource": {
        "resourceType": "Patient",
        "id": "375449",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "373844835"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "158516277"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "694449160"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Rivera",
            "given": [
              "John"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5559122206",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5553202141",
            "use": "home"
          },
          {
            "system": "phone",
            "value": "5555523692",
            "use": "mobile"
          },
          {
            "system": "email",
            "value": "jrivera@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1996-07-13",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "line": [
              "22749 Main Avenue"
            ],
            "city": "Boynton Beach",
            "state": "FL",
            "postalCode": "33437"
          },
          {
            "use": "temp",
            "type": "both",
            "line": [
              "87094 Oak Lane"
            ],
            "city": "Leesburg",
            "state": "FL",
            "postalCode": "33749"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375450",
      "resource": {
        "resourceType": "Patient",
        "id": "375450",
        "meta": {
          "lastUpdated": "2025-02-20T16:24:53.000+00:00"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            "extension": [
              {
                "url": "text",
                "valueString": "Unspecified"
              }
            ]
          }
        ],
        "identifier": [
          {
            "system": "PMS",
            "value": "838389552"
          },
          {
            "system": "http://www.hl7.org/fhir/v2/0203/index.html#v2-0203-MR",
            "value": "710398834"
          },
          {
            "system": "http://hl7.org/fhir/sid/us-ssn",
            "value": "356847344"
          }
        ],
        "active": true,
        "name": [
          {
            "family": "Francis",
            "given": [
              "Jordan"
            ]
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "5558954557",
            "use": "mobile"
          },
          {
            "system": "phone",
            "value": "5556006296",
            "use": "work"
          },
          {
            "system": "phone",
            "value": "5557668193",
            "use": "home"
          },
          {
            "system": "email",
            "value": "jfrancis@nowhere.com"
          }
        ],
        "gender": "male",
        "birthDate": "1958-10-05",
        "deceasedBoolean": false,
        "address": [
          {
            "use": "temp",
            "type": "both",
            "line": [
              "21356 First Way"
            ],
            "city": "Georgetown",
            "state": "NY",
            "postalCode": "13072"
          },
          {
            "use": "home",
            "type": "both",
            "line": [
              "89297 Knottywood Avenue"
            ],
            "city": "South Bay",
            "state": "FL",
            "postalCode": "33493"
          }
        ],
        "maritalStatus": {
          "coding": [
            {
              "system": "http://www.hl7.org/fhir/v2/0002",
              "code": "T",
              "display": "Unreported"
            }
          ],
          "text": "Unreported"
        }
      }
    }
  ]
}

// lib/api/mock-data.ts (add appointment data)

export const mockAppointmentBundle = {
  "resourceType": "Bundle",
  "id": "3b848458-df7b-4fff-81c6-645f6993b359",
  "meta": {
    "lastUpdated": "2025-09-14T14:59:08.672+00:00"
  },
  "type": "searchset",
  "total": 37,
  "link": [
    {
      "relation": "self",
      "url": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment"
    },
    {
      "relation": "next",
      "url": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment?page=2"
    }
  ],
  "entry": [
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/204865",
      "resource": {
        "resourceType": "Appointment",
        "id": "204865",
        "meta": {
          "lastUpdated": "2025-05-15T18:02:15.000+00:00"
        },
        "status": "pending",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-08T19:00:00.000+00:00",
        "end": "2025-05-08T19:10:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-05-08T18:41:05+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/385871",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/385871"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/205149",
      "resource": {
        "resourceType": "Appointment",
        "id": "205149",
        "meta": {
          "lastUpdated": "2025-05-09T16:32:26.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-12T12:00:00.000+00:00",
        "end": "2025-05-12T12:10:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-05-09T16:32:26+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/385871",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/385871"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/205150",
      "resource": {
        "resourceType": "Appointment",
        "id": "205150",
        "meta": {
          "lastUpdated": "2025-09-03T16:39:01.000+00:00"
        },
        "status": "cancelled",
        "cancelationReason": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-cancellation-reason",
              "code": "PATIENT_CANCELLED",
              "display": "Patient Cancelled"
            }
          ],
          "text": "Patient Cancelled"
        },
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-12T12:10:00.000+00:00",
        "end": "2025-05-12T12:20:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-05-09T16:36:27+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/385871",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/385871"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/205151",
      "resource": {
        "resourceType": "Appointment",
        "id": "205151",
        "meta": {
          "lastUpdated": "2025-09-03T16:44:17.000+00:00"
        },
        "status": "cancelled",
        "cancelationReason": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-cancellation-reason",
              "code": "PATIENT_CANCELLED",
              "display": "Patient Cancelled"
            }
          ],
          "text": "Patient Cancelled"
        },
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-12T12:20:00.000+00:00",
        "end": "2025-05-12T12:30:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-05-09T16:37:18+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/385871",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/385871"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/205152",
      "resource": {
        "resourceType": "Appointment",
        "id": "205152",
        "meta": {
          "lastUpdated": "2025-05-09T17:06:58.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-12T19:40:00.000+00:00",
        "end": "2025-05-12T19:50:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-05-09T17:06:58+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/385871",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/385871"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375397",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375397"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/826",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/826"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/208499",
      "resource": {
        "resourceType": "Appointment",
        "id": "208499",
        "meta": {
          "lastUpdated": "2025-05-23T02:33:56.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1959",
              "display": "Surgery"
            }
          ],
          "text": "Surgery"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-23T17:00:00.000+00:00",
        "end": "2025-05-23T17:30:00.000+00:00",
        "minutesDuration": 30,
        "created": "2025-05-23T02:33:56+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387291",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387291"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/208500",
      "resource": {
        "resourceType": "Appointment",
        "id": "208500",
        "meta": {
          "lastUpdated": "2025-05-23T02:45:26.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1959",
              "display": "Surgery"
            }
          ],
          "text": "Surgery"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-23T18:00:00.000+00:00",
        "end": "2025-05-23T18:30:00.000+00:00",
        "minutesDuration": 30,
        "created": "2025-05-23T02:45:26+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387292",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387292"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/208501",
      "resource": {
        "resourceType": "Appointment",
        "id": "208501",
        "meta": {
          "lastUpdated": "2025-05-23T02:49:04.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1959",
              "display": "Surgery"
            }
          ],
          "text": "Surgery"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-23T17:30:00.000+00:00",
        "end": "2025-05-23T18:00:00.000+00:00",
        "minutesDuration": 30,
        "created": "2025-05-23T02:49:04+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387293",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387293"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/208502",
      "resource": {
        "resourceType": "Appointment",
        "id": "208502",
        "meta": {
          "lastUpdated": "2025-05-23T02:51:17.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1959",
              "display": "Surgery"
            }
          ],
          "text": "Surgery"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-23T18:30:00.000+00:00",
        "end": "2025-05-23T19:00:00.000+00:00",
        "minutesDuration": 30,
        "created": "2025-05-23T02:51:17+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387294",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387294"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/208503",
      "resource": {
        "resourceType": "Appointment",
        "id": "208503",
        "meta": {
          "lastUpdated": "2025-05-23T02:56:07.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1959",
              "display": "Surgery"
            }
          ],
          "text": "Surgery"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-23T19:30:00.000+00:00",
        "end": "2025-05-23T20:00:00.000+00:00",
        "minutesDuration": 30,
        "created": "2025-05-23T02:56:07+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387293",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387293"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/208504",
      "resource": {
        "resourceType": "Appointment",
        "id": "208504",
        "meta": {
          "lastUpdated": "2025-05-23T02:57:30.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1959",
              "display": "Surgery"
            }
          ],
          "text": "Surgery"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Medical Non-emergency",
                "display": "MEDICAL_NON_EMERGENCY"
              }
            ],
            "text": "MEDICAL_NON_EMERGENCY"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-23T16:30:00.000+00:00",
        "end": "2025-05-23T17:00:00.000+00:00",
        "minutesDuration": 30,
        "created": "2025-05-23T02:57:30+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/385871",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/385871"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/208778",
      "resource": {
        "resourceType": "Appointment",
        "id": "208778",
        "meta": {
          "lastUpdated": "2025-07-31T05:31:54.000+00:00"
        },
        "status": "cancelled",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1959",
              "display": "Surgery"
            }
          ],
          "text": "Surgery"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-23T19:00:00.000+00:00",
        "end": "2025-05-23T19:30:00.000+00:00",
        "minutesDuration": 30,
        "created": "2025-05-23T13:53:44+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387400",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387400"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/208781",
      "resource": {
        "resourceType": "Appointment",
        "id": "208781",
        "meta": {
          "lastUpdated": "2025-05-23T14:36:22.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1959",
              "display": "Surgery"
            }
          ],
          "text": "Surgery"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-23T20:00:00.000+00:00",
        "end": "2025-05-23T20:30:00.000+00:00",
        "minutesDuration": 30,
        "created": "2025-05-23T14:36:22+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387401",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387401"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/208782",
      "resource": {
        "resourceType": "Appointment",
        "id": "208782",
        "meta": {
          "lastUpdated": "2025-05-23T15:14:24.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1959",
              "display": "Surgery"
            }
          ],
          "text": "Surgery"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-23T20:30:00.000+00:00",
        "end": "2025-05-23T21:00:00.000+00:00",
        "minutesDuration": 30,
        "created": "2025-05-23T15:14:24+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387403",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387403"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/208783",
      "resource": {
        "resourceType": "Appointment",
        "id": "208783",
        "meta": {
          "lastUpdated": "2025-05-23T15:17:18.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1959",
              "display": "Surgery"
            }
          ],
          "text": "Surgery"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-30T17:00:00.000+00:00",
        "end": "2025-05-30T17:30:00.000+00:00",
        "minutesDuration": 30,
        "created": "2025-05-23T15:17:18+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387404",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387404"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/208784",
      "resource": {
        "resourceType": "Appointment",
        "id": "208784",
        "meta": {
          "lastUpdated": "2025-05-23T15:37:51.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1959",
              "display": "Surgery"
            }
          ],
          "text": "Surgery"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-30T20:30:00.000+00:00",
        "end": "2025-05-30T21:00:00.000+00:00",
        "minutesDuration": 30,
        "created": "2025-05-23T15:37:51+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387406",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387406"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/208785",
      "resource": {
        "resourceType": "Appointment",
        "id": "208785",
        "meta": {
          "lastUpdated": "2025-05-23T15:41:30.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1959",
              "display": "Surgery"
            }
          ],
          "text": "Surgery"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-30T19:00:00.000+00:00",
        "end": "2025-05-30T19:30:00.000+00:00",
        "minutesDuration": 30,
        "created": "2025-05-23T15:41:30+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387407",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387407"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/208786",
      "resource": {
        "resourceType": "Appointment",
        "id": "208786",
        "meta": {
          "lastUpdated": "2025-05-23T16:08:37.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-28T14:10:00.000+00:00",
        "end": "2025-05-28T14:20:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-05-23T16:08:37+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387408",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387408"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/208793",
      "resource": {
        "resourceType": "Appointment",
        "id": "208793",
        "meta": {
          "lastUpdated": "2025-05-23T18:33:42.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-05-29T13:10:00.000+00:00",
        "end": "2025-05-29T13:20:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-05-23T18:33:42+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387412",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/387412"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/235806",
      "resource": {
        "resourceType": "Appointment",
        "id": "235806",
        "meta": {
          "lastUpdated": "2025-09-02T11:28:41.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-03T12:00:00.000+00:00",
        "end": "2025-09-03T12:10:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-02T11:28:41+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/235808",
      "resource": {
        "resourceType": "Appointment",
        "id": "235808",
        "meta": {
          "lastUpdated": "2025-09-02T11:42:29.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-03T12:10:00.000+00:00",
        "end": "2025-09-03T12:20:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-02T11:42:29+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/235809",
      "resource": {
        "resourceType": "Appointment",
        "id": "235809",
        "meta": {
          "lastUpdated": "2025-09-02T11:53:15.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-03T12:20:00.000+00:00",
        "end": "2025-09-03T12:30:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-02T11:53:15+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/235811",
      "resource": {
        "resourceType": "Appointment",
        "id": "235811",
        "meta": {
          "lastUpdated": "2025-09-02T11:57:00.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-03T12:30:00.000+00:00",
        "end": "2025-09-03T12:40:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-02T11:57:00+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/235814",
      "resource": {
        "resourceType": "Appointment",
        "id": "235814",
        "meta": {
          "lastUpdated": "2025-09-02T12:17:05.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-03T12:40:00.000+00:00",
        "end": "2025-09-03T12:50:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-02T12:17:05+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/235815",
      "resource": {
        "resourceType": "Appointment",
        "id": "235815",
        "meta": {
          "lastUpdated": "2025-09-02T12:20:00.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-03T13:20:00.000+00:00",
        "end": "2025-09-03T13:30:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-02T12:20:00+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/235816",
      "resource": {
        "resourceType": "Appointment",
        "id": "235816",
        "meta": {
          "lastUpdated": "2025-09-02T12:24:32.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-03T14:20:00.000+00:00",
        "end": "2025-09-03T14:30:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-02T12:24:32+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/235817",
      "resource": {
        "resourceType": "Appointment",
        "id": "235817",
        "meta": {
          "lastUpdated": "2025-09-02T12:27:52.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-03T14:30:00.000+00:00",
        "end": "2025-09-03T14:40:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-02T12:27:52+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/235818",
      "resource": {
        "resourceType": "Appointment",
        "id": "235818",
        "meta": {
          "lastUpdated": "2025-09-02T12:31:45.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-03T14:40:00.000+00:00",
        "end": "2025-09-03T14:50:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-02T12:31:45+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/235831",
      "resource": {
        "resourceType": "Appointment",
        "id": "235831",
        "meta": {
          "lastUpdated": "2025-09-02T13:12:16.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-03T15:10:00.000+00:00",
        "end": "2025-09-03T15:20:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-02T13:12:16+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375392"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/236096",
      "resource": {
        "resourceType": "Appointment",
        "id": "236096",
        "meta": {
          "lastUpdated": "2025-09-03T17:14:59.000+00:00"
        },
        "status": "cancelled",
        "cancelationReason": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-cancellation-reason",
              "code": "PATIENT_CANCELLED",
              "display": "Patient Cancelled"
            }
          ],
          "text": "Patient Cancelled"
        },
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-03T16:10:00.000+00:00",
        "end": "2025-09-03T16:20:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-03T10:04:26+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375405",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375405"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/236102",
      "resource": {
        "resourceType": "Appointment",
        "id": "236102",
        "meta": {
          "lastUpdated": "2025-09-04T05:11:13.000+00:00"
        },
        "status": "cancelled",
        "cancelationReason": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-cancellation-reason",
              "code": "PATIENT_CANCELLED",
              "display": "Patient Cancelled"
            }
          ],
          "text": "Patient Cancelled"
        },
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-08T16:20:00.000+00:00",
        "end": "2025-09-08T16:30:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-03T10:08:23+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375405",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/375405"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/236502",
      "resource": {
        "resourceType": "Appointment",
        "id": "236502",
        "meta": {
          "lastUpdated": "2025-09-04T09:42:04.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-08T12:20:00.000+00:00",
        "end": "2025-09-08T12:30:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-04T09:42:04+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/401109",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/401109"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/236503",
      "resource": {
        "resourceType": "Appointment",
        "id": "236503",
        "meta": {
          "lastUpdated": "2025-09-04T09:55:04.000+00:00"
        },
        "status": "cancelled",
        "cancelationReason": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-cancellation-reason",
              "code": "PATIENT_CANCELLED",
              "display": "Patient Cancelled"
            }
          ],
          "text": "Patient Cancelled"
        },
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-08T12:30:00.000+00:00",
        "end": "2025-09-08T12:40:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-04T09:54:10+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/401109",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/401109"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/236525",
      "resource": {
        "resourceType": "Appointment",
        "id": "236525",
        "meta": {
          "lastUpdated": "2025-09-04T12:05:57.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1958",
              "display": "New Patient"
            }
          ],
          "text": "New Patient"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "true"
            },
            "display": "New Patient: true"
          }
        ],
        "start": "2025-09-10T12:00:00.000+00:00",
        "end": "2025-09-10T12:15:00.000+00:00",
        "minutesDuration": 15,
        "created": "2025-09-04T12:05:57+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/401097",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/401097"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/236742",
      "resource": {
        "resourceType": "Appointment",
        "id": "236742",
        "meta": {
          "lastUpdated": "2025-09-05T06:43:16.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-09T12:10:00.000+00:00",
        "end": "2025-09-09T12:20:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-05T06:43:16+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/401097",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/401097"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/236745",
      "resource": {
        "resourceType": "Appointment",
        "id": "236745",
        "meta": {
          "lastUpdated": "2025-09-05T07:17:37.000+00:00"
        },
        "status": "cancelled",
        "cancelationReason": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-cancellation-reason",
              "code": "PATIENT_CANCELLED",
              "display": "Patient Cancelled"
            }
          ],
          "text": "Patient Cancelled"
        },
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1958",
              "display": "New Patient"
            }
          ],
          "text": "New Patient"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "true"
            },
            "display": "New Patient: true"
          }
        ],
        "start": "2025-09-09T12:20:00.000+00:00",
        "end": "2025-09-09T12:35:00.000+00:00",
        "minutesDuration": 15,
        "created": "2025-09-05T07:02:56+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/401097",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/401097"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Appointment/238352",
      "resource": {
        "resourceType": "Appointment",
        "id": "238352",
        "meta": {
          "lastUpdated": "2025-09-11T13:14:00.000+00:00"
        },
        "status": "booked",
        "appointmentType": {
          "coding": [
            {
              "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/appointment-type",
              "code": "1957",
              "display": "Follow-up"
            }
          ],
          "text": "Follow-up"
        },
        "reasonCode": [
          {
            "coding": [
              {
                "system": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/ValueSet/reportable-reason",
                "code": "Other",
                "display": "OTHER"
              }
            ],
            "text": "OTHER"
          }
        ],
        "supportingInformation": [
          {
            "identifier": {
              "system": "NEW_PATIENT",
              "value": "false"
            },
            "display": "New Patient: false"
          }
        ],
        "start": "2025-09-15T13:20:00.000+00:00",
        "end": "2025-09-15T13:30:00.000+00:00",
        "minutesDuration": 10,
        "created": "2025-09-11T13:14:00+00:00",
        "participant": [
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/402483",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Patient/402483"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Practitioner/375399"
            }
          },
          {
            "actor": {
              "reference": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827",
              "display": "https://stage.ema-api.com/ema-dev/firm/apiportal/ema/fhir/v2/Location/827"
            }
          }
        ]
      }
    }
  ]
}


