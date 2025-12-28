// Email service using fetch instead of nodemailer
interface AlertEmail {
  to: string;
  signal: 'LONG' | 'SHORT' | 'WAIT';
  pair: string;
  confidence: number;
  price: string;
  keyLevels: string;
  reasoning: string;
  chartUrl?: string;
}

/**
 * Send trading alert email with enhanced HTML template
 */
export async function sendTradingAlert(alert: AlertEmail) {
  const signalColor = alert.signal === "LONG" ? "#10b981" : alert.signal === "SHORT" ? "#ef4444" : "#f59e0b";
  const signalEmoji = alert.signal === "LONG" ? "🚀" : alert.signal === "SHORT" ? "📉" : "⏸️";
  
  const htmlTemplate = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#0a0a0f;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background-color:#1a1a2e;border-radius:16px;">
    <tr>
      <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:40px 20px;text-align:center;">
        <h1 style="margin:0;color:white;font-size:32px;">${signalEmoji} ${alert.signal} Alert!</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:30px 20px;">
        <div style="background:rgba(255,255,255,0.05);border-left:4px solid ${signalColor};border-radius:12px;padding:20px;margin-bottom:20px;">
          <h2 style="margin:0 0 10px 0;color:${signalColor};font-size:28px;">${alert.pair}</h2>
          <p style="margin:0;color:#e5e5e5;font-size:18px;"><strong>${alert.confidence}%</strong> Confidence</p>
          <p style="margin:10px 0 0 0;color:#e5e5e5;">Entry: ${alert.price}</p>
        </div>
        <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.2);border-radius:12px;padding:20px;margin-bottom:20px;">
          <p style="margin:0 0 10px 0;color:#ffd700;font-size:12px;text-transform:uppercase;">🎯 Key Levels</p>
          <p style="margin:0;color:#e5e5e5;font-size:14px;white-space:pre-line;font-family:monospace;">${alert.keyLevels}</p>
        </div>
        <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:20px;">
          <p style="margin:0 0 10px 0;color:#9ca3af;font-size:12px;">ANALYSIS</p>
          <p style="margin:0;color:#e5e5e5;font-size:14px;line-height:1.6;">${alert.reasoning}</p>
        </div>
        <div style="text-align:center;margin-top:30px;">
          <a href="https://www.tradingxbert.com" style="display:inline-block;background:linear-gradient(135deg,#ffd700,#ffa500);color:#000;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:bold;">View Full Analysis →</a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background:rgba(255,255,255,0.02);padding:20px;text-align:center;">
        <p style="margin:0;color:#9ca3af;font-size:12px;">TradingXbert AI  •  <a href="https://www.tradingxbert.com/pricing" style="color:#6366f1;">Upgrade to Pro</a></p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  console.log(`✉️ Email alert would be sent to ${alert.to}:`, {
    signal: alert.signal,
    pair: alert.pair,
    confidence: alert.confidence
  });
  
  // In production, implement with your email service (SendGrid, AWS SES, Resend)
  // Example:
  // await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     from: 'alerts@tradingxbert.com',
  //     to: alert.to,
  //     subject: `${signalEmoji} ${alert.signal} Alert: ${alert.pair} (${alert.confidence}%)`,
  //     html: htmlTemplate
  //   })
  // });
  
  return true;
}

export async function sendBulkAlerts(subscribers: string[], alert: Omit<AlertEmail, 'to'>) {
  console.log(`📧 Would send to ${subscribers.length} subscribers:`, alert);
  
  // Send to all subscribers
  const promises = subscribers.map(email => 
    sendTradingAlert({ ...alert, to: email })
  );
  
  await Promise.all(promises);
  
  return { successful: subscribers.length, failed: 0, total: subscribers.length };
}

/**
 * Send SMS notification for Pro users
 * Requires Twilio or similar SMS service
 */
export async function sendSMSAlert(phoneNumber: string, alert: Omit<AlertEmail, 'to'>) {
  const message = `🚀 TradingXbert: ${alert.signal} ${alert.pair} @ ${alert.price} (${alert.confidence}% confidence). Check email for details!`;
  
  console.log(`📱 SMS would be sent to ${phoneNumber}: ${message}`);
  
  // In production, implement with Twilio:
  // const response = await fetch(
  //   `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       'Authorization': 'Basic ' + Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')
  //     },
  //     body: new URLSearchParams({
  //       To: phoneNumber,
  //       From: process.env.TWILIO_PHONE_NUMBER!,
  //       Body: message
  //     })
  //   }
  // );
  
  return true;
}
