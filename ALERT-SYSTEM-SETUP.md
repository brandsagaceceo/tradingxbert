# AI Trading Alert System Setup

## 🚀 Automated Trading Alerts

Your site now has a complete AI-powered alert system that:
- Scans top crypto pairs every hour
- Uses GPT-4 to analyze market data
- Emails subscribers when strong setups appear
- Sends professional HTML emails with charts

---

## 📧 Email Configuration

Add these to your Vercel environment variables:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CRON_SECRET=create-random-secret-here
NEXT_PUBLIC_SITE_URL=https://tradingxbert.com
```

### Gmail Setup:
1. Enable 2FA on your Gmail account
2. Go to https://myaccount.google.com/apppasswords
3. Create an "App Password" for "Mail"
4. Use that password for `SMTP_PASS`

### Other Email Providers:
- **SendGrid**: `smtp.sendgrid.net` (more reliable for bulk)
- **Mailgun**: `smtp.mailgun.org`
- **AWS SES**: Configure with your AWS credentials

---

## ⏰ Set Up Cron Job (Automated Scanning)

### Option 1: Vercel Cron (Recommended)

1. Create `vercel.json` with cron config:

```json
{
  "crons": [{
    "path": "/api/scan-markets",
    "schedule": "0 * * * *"
  }]
}
```

2. Redeploy: `git push origin main`

This runs every hour automatically!

### Option 2: External Cron Service

Use **cron-job.org** or **EasyCron**:

1. Create account
2. Add job:
   - URL: `https://tradingxbert.com/api/scan-markets`
   - Schedule: Every hour (`0 * * * *`)
   - Headers: `Authorization: Bearer YOUR_CRON_SECRET`

---

## 🔌 Connect Real Market Data

Currently using mock data. Replace with real API:

### Option A: CoinGecko (Free)
```typescript
// In lib/marketAnalysis.ts
export async function fetchMarketData(pair: string): Promise<MarketData> {
  const coinId = pair.split('/')[0].toLowerCase();
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true`
  );
  const data = await response.json();
  return {
    pair,
    price: data[coinId].usd,
    change24h: data[coinId].usd_24h_change,
    volume24h: data[coinId].usd_24h_vol,
    // ... etc
  };
}
```

### Option B: Binance (More Data)
```bash
npm install binance-api-node
```

```typescript
import Binance from 'binance-api-node';
const client = Binance();

export async function fetchMarketData(pair: string): Promise<MarketData> {
  const ticker = await client.prices();
  const stats = await client.dailyStats({ symbol: pair });
  // ... parse data
}
```

---

## 🧪 Test the System

### 1. Test Email Sending:
```bash
curl -X GET "http://localhost:3000/api/scan-markets" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### 2. Test Alert Subscription:
1. Go to homepage
2. Enter email in alert box
3. Check inbox for confirmation

### 3. Manual Trigger:
Visit `/api/scan-markets` with the correct auth header

---

## 📊 What Gets Sent

When AI detects setup with >75% confidence:

```
Subject: 🚀 LONG Signal: BTC/USD (87% confidence)

Email includes:
- Signal type (LONG/SHORT) with emoji
- Confidence percentage
- Current price
- Key support/resistance levels
- AI reasoning (2-3 sentences)
- Link to analyze own charts
- Unsubscribe link
```

---

## 🎯 Customization Options

### Change Scan Frequency:
- Vercel cron: Edit schedule in `vercel.json`
- Every 30 min: `*/30 * * * *`
- Every 4 hours: `0 */4 * * *`

### Adjust Confidence Threshold:
In `/api/scan-markets/route.ts`:
```typescript
if (analysis.shouldAlert && analysis.confidence >= 80) { // Was 75
```

### Add More Pairs:
In `lib/marketAnalysis.ts`:
```typescript
export const MONITORED_PAIRS = [
  'BTC/USD',
  'ETH/USD',
  'LINK/USD', // Add more
  'MATIC/USD',
];
```

---

## 📈 Monitor Performance

Check Vercel logs:
1. Go to your project → Deployments → Functions
2. Click on `/api/scan-markets`
3. View execution logs

You'll see:
```
🤖 Starting AI market scan...
📊 Signal found: BTC/USD LONG (87%)
📧 Sent BTC/USD alert to 143/150 subscribers
```

---

## ⚠️ Important Notes

1. **Rate Limits**: Free APIs have limits (CoinGecko: 50 calls/min)
2. **Costs**: OpenAI API charges per GPT-4 call (~$0.03/scan)
3. **Email Limits**: Gmail: 500/day, SendGrid free: 100/day
4. **Database**: Run migration for `AlertSubscription` table

---

## 🚀 Deploy

```bash
git add -A
git commit -m "Add AI alert system"
git push origin main
```

Add environment variables in Vercel, then you're live!

---

Need help? All the code is ready - just configure your email provider and you're sending AI alerts! 🎉
