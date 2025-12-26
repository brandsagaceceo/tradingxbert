import { createCryptoCharge, getChargeStatus } from '../lib/cryptoPayments';

async function testCryptoCharge() {
  try {
    console.log('Creating a test crypto charge...');
    const charge = await createCryptoCharge(
      'Test Product',
      'This is a test charge for $10',
      10
    );
    console.log('Charge created successfully:', charge);

    const chargeId = charge.data.id;
    console.log(`Charge ID: ${chargeId}`);

    console.log('Fetching charge status...');
    const status = await getChargeStatus(chargeId);
    console.log('Charge status:', status);
  } catch (error) {
    console.error('Error during crypto payment testing:', error);
  }
}

testCryptoCharge();