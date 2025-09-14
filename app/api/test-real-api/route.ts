// app/api/test-real-api/route.ts (updated for mock mode with real structure)
import { NextResponse } from 'next/server';
import { modMedClient, FHIRBundle } from '@/lib/api/modmed-client';
import { FHIRPatient } from '@/types/fhir';

export async function GET() {
  try {
    console.log('🧪 Testing ModMed integration with real FHIR structure (mock mode)...');
    
    // Test patient fetch
    const patientsBundle = await modMedClient.get<FHIRBundle<FHIRPatient>>('/Patient', { _count: '5' });
    console.log('✅ Patient fetch successful');
    
    // Test single patient
    let singlePatient = null;
    if (patientsBundle.entry && patientsBundle.entry.length > 0) {
      const firstPatientId = patientsBundle.entry[0].resource.id;
      singlePatient = await modMedClient.get(`/Patient/${firstPatientId}`);
      console.log('✅ Single patient fetch successful');
    }

    return NextResponse.json({
      success: true,
      message: 'ModMed integration working with real FHIR structure (mock mode)!',
      data: {
        mode: 'MOCK_WITH_REAL_FHIR_STRUCTURE',
        totalPatients: patientsBundle.total,
        samplePatients: patientsBundle.entry?.slice(0, 3).map(entry => ({
          id: entry.resource.id,
          name: entry.resource.name?.[0],
          gender: entry.resource.gender,
          birthDate: entry.resource.birthDate,
          lastUpdated: entry.resource.meta?.lastUpdated,
          identifiers: entry.resource.identifier?.map(id => ({
            system: id.system,
            value: id.value
          }))
        })),
        singlePatientTest: singlePatient ? 'SUCCESS' : 'SKIPPED'
      },
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('❌ Mock API test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Mock API test failed',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
