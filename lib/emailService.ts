const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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
  const signalColor = alert.signal === 'LONG' ? '#10b981' : '#ef4444';
  const signalEmoji = alert.signal === 'LONG' ? '🚀' : '🔻';
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #0a0a0f; color: #ffffff; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 20px; padding: 30px; border: 1px solid rgba(255, 215, 0, 0.3); }
    .header { text-align: center; margin-bottom: 30px; }
    .logo { font-size: 32px; font-weight: bold; background: linear-gradient(90deg, #FFD700, #FFA500); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .signal-badge { display: inline-block; padding: 12px 24px; border-radius: 12px; font-size: 24px; font-weight: bold; margin: 20px 0; background: ${signalColor}; color: white; }
    .pair { font-size: 28px; font-weight: bold; margin: 10px 0; }
    .confidence { font-size: 18px; color: #FFD700; margin: 10px 0; }
    .section { background: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 20px; margin: 15px 0; }
    .section-title { color: #FFD700; font-weight: bold; margin-bottom: 10px; }
    .chart { width: 100%; border-radius: 12px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); font-size: 12px; color: #888; }
    .cta-button { display: inline-block; padding: 15px 30px; background: linear-gradient(90deg, #FFD700, #FFA500); color: #000; text-decoration: none; border-radius: 12px; font-weight: bold; margin: 20px 0; }
    .unsubscribe { color: #666; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">📊 TradingXbert AI</div>
      <p style="color: #888;">High-Probability Setup Detected</p>
    </div>

    <div style="text-align: center;">
      <div class="signal-badge">${signalEmoji} ${alert.signal} SIGNAL</div>
      <div class="pair">${alert.pair}</div>
      <div class="confidence">Confidence: ${alert.confidence}%</div>
      <p style="color: #aaa;">Current Price: ${alert.price}</p>
    </div>

    ${alert.chartUrl ? `<img src="${alert.chartUrl}" alt="Chart" class="chart" />` : ''}

    <div class="section">
      <div class="section-title">🎯 Key Levels</div>
      <p>${alert.keyLevels}</p>
    </div>

    <div class="section">
      <div class="section-title">🧠 AI Analysis</div>
      <p>${alert.reasoning}</p>
    </div>

    <div style="text-align: center;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://tradingxbert.com'}" class="cta-button">
        Analyze Your Own Charts →
      </a>
    </div>

    <div class="footer">
      <p><strong>⚠️ Risk Disclaimer:</strong> This is AI-generated analysis for educational purposes. Always do your own research and manage risk properly.</p>
      <p style="margin-top: 20px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/api/alert-unsubscribe?email=${encodeURIComponent(alert.to)}" class="unsubscribe">
          Unsubscribe from alerts
        </a>
      </p>
      <p style="margin-top: 10px;">© ${new Date().getFullYear()} TradingXbert. AI-Powered Trading Analysis.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `"TradingXbert AI" <${process.env.SMTP_USER}>`,
      to: alert.to,
      subject: `${signalEmoji} ${alert.signal} Signal: ${alert.pair} (${alert.confidence}% confidence)`,
      html,
    });
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function sendBulkAlerts(subscribers: string[], alert: Omit<AlertEmail, 'to'>) {
  const results = await Promise.allSettled(
    subscribers.map(email => sendTradingAlert({ ...alert, to: email }))
  );
  
  const successful = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;
  
  return { successful, failed, total: subscribers.length };
}
