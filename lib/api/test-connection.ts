// import { modMedClient } from './modmed-client';
// import { FHIRBundle } from './modmed-client';

/**
 * Test authentication and basic API connectivity
 */
export async function testModMedConnection(): Promise<void> {
  try {
    console.log('🔍 Testing ModMed API connection...');
    
    // Try to get a list of patients
    // const patientsBundle = await modMedClient.get<FHIRBundle>('/Patient', {
    //   '_count': '5' // Limit to 5 patients for testing
    // });

    // console.log('✅ API Connection Test Results:');
    // console.log(`   - Authentication: SUCCESS`);
    // console.log(`   - Patients found: ${patientsBundle.total || 'Unknown'}`);
    // console.log(`   - Bundle entries: ${patientsBundle.entry?.length || 0}`);
    
  // if (patientsBundle.entry && patientsBundle.entry.length > 0) {
  //   const firstPatient = patientsBundle.entry[0].resource;
  //   console.log(`   - First patient ID: ${firstPatient.id}`);
  // }

  } catch (error) {
    console.error('❌ API Connection Test Failed:');
    console.error(`   - Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
}
