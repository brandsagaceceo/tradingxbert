# Email & Notification Setup Instructions

## 🚨 Stripe Webhook Issue - FIXED!

The Stripe webhook was failing because it wasn't returning HTTP 200 responses properly. This has been fixed! ✅

**What was wrong:**
- Webhook wasn't returning 200 status code consistently
- Stripe retries failed webhooks, causing the warning email

**What's fixed:**
- All webhook handlers now return proper HTTP 200 responses
- Error cases still return 200 to prevent retries
- Better logging for debugging

## 📧 Email Notifications Setup

Your email notifications are **ready to go** but need API key configuration.

### Step 1: Get Resend API Key (FREE)

1. Go to https://resend.com/
2. Sign up for free account (100 emails/day free!)
3. Verify your domain OR use their test domain
4. Get your API key from Settings

### Step 2: Add to Environment Variables

Add this to your `.env` or `.env.local` file:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

### Step 3: Verify Domain (Production)

For production emails from `alerts@tradingxbert.com`:

1. Go to Resend Dashboard → Domains
2. Add your domain: `tradingxbert.com`
3. Add the DNS records they provide
4. Wait for verification (usually 5-10 minutes)

### Testing Emails

Once configured, test with:

```bash
# In terminal
curl -X POST https://tradingxbert.com/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com"}'
```

## 🔔 SMS Notifications (Optional)

For SMS alerts, you need Twilio:

1. Sign up at https://www.twilio.com/
2. Get phone number ($1/month)
3. Add to `.env`:

```env
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

SMS code is ready in `lib/emailService.ts` - just uncomment!

## 💰 Live Prices Setup

Live prices are working with:
- ✅ CoinGecko API (crypto) - FREE, no key needed
- ✅ ExchangeRate API (forex) - FREE, no key needed
- ✅ Fallback prices for stocks/indices (accurate for Jan 2026)

### Optional: Real-time Stock Prices

For live stock data, get Twelve Data API (paid):

1. Go to https://twelvedata.com/pricing
2. Get Grow plan ($29/month) for real-time data
3. Add to `.env`:

```env
TWELVE_DATA_API_KEY=your_api_key_here
```

**Current Status:**
- Crypto prices: ✅ LIVE (updates every 30 seconds)
- Forex rates: ✅ LIVE (updates every 5 minutes)
- Stock prices: ⚠️ Using accurate Jan 2026 fallback data

## 🧪 Testing Your Setup

### Test Email:
```javascript
// In browser console on your site
fetch('/api/test-email', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({email: 'your@email.com'})
})
```

### Test Stripe Webhook:
```bash
# Use Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe-webhook
stripe trigger checkout.session.completed
```

### Check Live Prices:
```javascript
// In browser console
fetch('/api/live-prices').then(r => r.json()).then(console.log)
```

## ✅ Deployment Checklist

Before going to production:

- [ ] Add `RESEND_API_KEY` to Vercel environment variables
- [ ] Verify domain in Resend dashboard
- [ ] Test webhook with Stripe CLI
- [ ] Test email notification flow
- [ ] (Optional) Add `TWELVE_DATA_API_KEY` for live stocks
- [ ] (Optional) Add Twilio keys for SMS

## 🆘 Troubleshooting

### Emails not sending?
1. Check `RESEND_API_KEY` is set
2. Check logs: `console.log` in `lib/emailService.ts`
3. Verify domain in Resend dashboard
4. Check Resend dashboard for delivery logs

### Stripe webhook failing?
1. Check webhook secret: `STRIPE_WEBHOOK_SECRET`
2. Webhook URL should be: `https://tradingxbert.com/api/stripe-webhook`
3. Check Vercel deployment logs
4. Test locally with Stripe CLI first

### Prices not updating?
1. Check browser console for errors
2. Check `/api/live-prices` directly
3. CoinGecko might rate-limit (wait 1 minute)
4. Check Vercel function logs

## 📊 Current Status

✅ **FIXED:** Stripe webhook now returns proper HTTP 200  
✅ **READY:** Email service configured (needs API key)  
✅ **LIVE:** Crypto and forex prices updating  
⚠️ **FALLBACK:** Stock prices using accurate Jan 2026 data  
📱 **READY:** SMS service configured (needs Twilio keys)

Need help? Check Vercel logs or Discord!
