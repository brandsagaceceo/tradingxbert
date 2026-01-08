# 🔑 API Keys - Quick Setup Guide

## 📧 RESEND (Email Notifications) - REQUIRED

**Cost:** FREE (100 emails/day)  
**Time:** 2 minutes  
**Link:** https://resend.com

### Setup Steps:
1. Go to https://resend.com
2. Click "Sign Up" (use GitHub or email)
3. Go to "API Keys" in dashboard
4. Click "Create API Key"
5. Copy the key (starts with `re_`)
6. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
   ```

### Verify Domain (Production):
1. Go to "Domains" in Resend dashboard
2. Click "Add Domain"
3. Enter: `tradingxbert.com`
4. Add DNS records to your domain registrar:
   - SPF record
   - DKIM records (2)
   - DMARC record
5. Wait 5-10 minutes for verification
6. Test sending email!

**Your from email will be:** `alerts@tradingxbert.com`

---

## 💰 STRIPE (Already Configured)

You already have Stripe set up! The webhook is now fixed.

**What's in your `.env.local`:**
```
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Webhook URL:** `https://tradingxbert.com/api/stripe-webhook`

✅ **FIXED:** Now returns proper HTTP 200 responses!

---

## 📊 TWELVE DATA (Live Stock Prices) - OPTIONAL

**Cost:** $29/month (Grow plan)  
**Link:** https://twelvedata.com/pricing

### Setup Steps:
1. Go to https://twelvedata.com
2. Sign up for account
3. Choose "Grow" plan ($29/month)
4. Go to dashboard → API
5. Copy your API key
6. Add to `.env.local`:
   ```
   TWELVE_DATA_API_KEY=your_key_here
   ```

**What you get:**
- Real-time stock prices (AAPL, TSLA, etc.)
- 800 API calls/minute (vs 8 on free)
- US stocks + international markets
- Forex pairs
- Crypto (but we already have this from CoinGecko)

**Do you need this?**
- ✅ If you want LIVE stock prices
- ❌ If fallback data is good enough
- Current fallback is accurate for Jan 3, 2026

---

## 📱 TWILIO (SMS Notifications) - OPTIONAL

**Cost:** $1/month for phone number + $0.0075 per SMS  
**Link:** https://www.twilio.com

### Setup Steps:
1. Go to https://www.twilio.com
2. Sign up (get $15 free credit!)
3. Get a phone number ($1/month)
4. Go to Console → Account
5. Copy your credentials
6. Add to `.env.local`:
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
   TWILIO_PHONE_NUMBER=+1234567890
   ```

**What you get:**
- SMS alerts for trade signals
- Pro users get instant SMS
- More engagement!

**Cost calculation:**
- 100 SMS/month = $0.75 + $1 number = $1.75/month
- 1000 SMS/month = $7.50 + $1 number = $8.50/month

---

## 🌐 COINGECKO (Crypto Prices) - ALREADY WORKING

**Cost:** FREE ✅  
**Status:** Already integrated!

No API key needed! Currently using their free API:
- Bitcoin, Ethereum, Solana, XRP, Cardano, etc.
- Updates every 30 seconds
- 24h price changes
- No setup required!

---

## 💱 EXCHANGERATE API (Forex) - ALREADY WORKING

**Cost:** FREE ✅  
**Status:** Already integrated!

No API key needed! Getting live forex rates:
- EUR/USD, GBP/USD, JPY/USD
- Updates every 5 minutes
- No limits on free tier
- No setup required!

---

## 📋 Priority Setup Order

### Do First (Required):
1. **Resend** - Get email notifications working

### Do Next (Recommended):
2. **Verify domain** - Production emails from your domain

### Do Later (Optional):
3. **Twelve Data** - If you want live stock prices
4. **Twilio** - If you want SMS notifications

---

## ✅ Current Status

| Service | Status | Cost |
|---------|--------|------|
| Stripe | ✅ Working | You have it |
| CoinGecko | ✅ Working | FREE |
| ExchangeRate | ✅ Working | FREE |
| Resend | ⚠️ Needs key | FREE |
| Twelve Data | ⏸️ Optional | $29/month |
| Twilio | ⏸️ Optional | ~$2-10/month |

---

## 🔒 Security Notes

### ❌ Never commit API keys to GitHub!

Your `.env.local` file is already in `.gitignore` ✅

### ✅ Add to Vercel:
1. Go to Vercel dashboard
2. Select your project
3. Settings → Environment Variables
4. Add each key there

### ✅ Vercel automatically loads:
- `.env.local` (local development)
- Vercel env variables (production)

---

## 🧪 Test After Setup

### Test Email:
```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Test email sent! Check your inbox."
}
```

### Test Prices:
```bash
curl http://localhost:3000/api/live-prices
```

Should see live crypto and forex prices!

---

## 📞 Support Links

- **Resend Docs:** https://resend.com/docs
- **Stripe Webhooks:** https://stripe.com/docs/webhooks
- **Twelve Data:** https://twelvedata.com/docs
- **Twilio:** https://www.twilio.com/docs

---

## 🚀 Quick Start

Just run these commands:

```bash
# 1. Copy environment template
cp .env.example .env.local

# 2. Edit and add your Resend key
nano .env.local

# 3. Start dev server
npm run dev

# 4. Test email
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com"}'
```

Done! 🎉
