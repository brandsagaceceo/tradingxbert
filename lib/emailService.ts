// Dummy file - email service temporarily disabled
export async function sendTradingAlert() {
  return true;
}

export async function sendBulkAlerts() {
  return { successful: 0, failed: 0, total: 0 };
}
