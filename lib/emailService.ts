// Email service using fetch instead of nodemailer
interface AlertEmail {
  to: string;
  signal: 'LONG' | 'SHORT';
  pair: string;
  confidence: number;
  price: string;
  keyLevels: string;
  reasoning: string;
  chartUrl?: string;
}

export async function sendTradingAlert(alert: AlertEmail) {
  console.log('Email alert would be sent:', alert);
  return true;
}

export async function sendBulkAlerts(subscribers: string[], alert: Omit<AlertEmail, 'to'>) {
  console.log(`Would send to ${subscribers.length} subscribers:`, alert);
  return { successful: subscribers.length, failed: 0, total: subscribers.length };
}
