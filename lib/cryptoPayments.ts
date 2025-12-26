import axios from 'axios';

const COINBASE_API_URL = 'https://api.commerce.coinbase.com';
const API_KEY = process.env.COINBASE_API_KEY;

if (!API_KEY) {
  throw new Error('Coinbase API key is missing. Please set COINBASE_API_KEY in your environment variables.');
}

/**
 * Create a new charge for cryptocurrency payments.
 * @param {string} name - The name of the product/service.
 * @param {string} description - A short description of the product/service.
 * @param {number} amount - The amount to charge in USD.
 * @param {string} currency - The currency (e.g., USD).
 * @returns {Promise<object>} - The charge details.
 */
export async function createCryptoCharge(name: string, description: string, amount: number, currency: string = 'USD') {
  try {
    const response = await axios.post(
      `${COINBASE_API_URL}/charges`,
      {
        name,
        description,
        pricing_type: 'fixed_price',
        local_price: {
          amount: amount.toFixed(2),
          currency,
        },
        metadata: {
          integration: 'TradingXbert',
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CC-Api-Key': API_KEY,
          'X-CC-Version': '2018-03-22',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating crypto charge:', error);
    throw new Error('Failed to create crypto charge.');
  }
}

/**
 * Get the status of a charge.
 * @param {string} chargeId - The ID of the charge.
 * @returns {Promise<object>} - The charge status.
 */
export async function getChargeStatus(chargeId: string) {
  try {
    const response = await axios.get(`${COINBASE_API_URL}/charges/${chargeId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': API_KEY,
        'X-CC-Version': '2018-03-22',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching charge status:', error);
    throw new Error('Failed to fetch charge status.');
  }
}