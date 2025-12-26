# Stripe & Database Setup Guide

## 1. Set Up Vercel Postgres Database

### Create Database:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `tradingxbert` project
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose region (same as your deployment for best performance)
7. Click **Create**

✅ Vercel will automatically add `DATABASE_URL` to your environment variables

### Connect Database Locally:
```bash
# Pull environment variables to local .env file
vercel env pull .env

# Install Prisma CLI if not already installed
npm install -D prisma

# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma migrate deploy

# (Optional) View database in browser
npx prisma studio
```

---

## 2. Get Stripe API Keys

### API Keys:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy **Secret key** (starts with `sk_live_` or `sk_test_`)
3. Copy **Publishable key** (starts with `pk_live_` or `pk_test_`)

### Create Product & Price:
1. Go to [Stripe Products](https://dashboard.stripe.com/products)
2. Click **+ Add product**
3. Name: "TradingXbert Pro"
4. Set pricing: $29/month (or your price)
5. Click **Save product**
6. Copy the **Price ID** (starts with `price_`)

### Set Up Webhook:
1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **+ Add endpoint**
3. Endpoint URL: `https://tradingxbert.com/api/stripe-webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

---

## 3. Add Environment Variables to Vercel

Go to: [Vercel Project Settings → Environment Variables](https://vercel.com/brandsagaceceo/tradingxbert/settings/environment-variables)

Add these variables (for **Production**, **Preview**, and **Development**):

```
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
STRIPE_PRICE_ID=price_xxxxxxxxxxxxx
```

---

## 4. Update Payment Link

1. Edit [app/pricing/page.tsx](app/pricing/page.tsx)
2. Update the "Get Pro" button link to Stripe Checkout:

### Option A: Create Payment Link in Stripe
1. Go to [Payment Links](https://dashboard.stripe.com/payment-links)
2. Click **+ New**
3. Select your Pro product
4. Copy the payment link URL
5. Update the button href in pricing page

### Option B: Use Stripe Checkout (Recommended)
Create API endpoint at `app/api/create-checkout-session/route.ts` to dynamically create checkout sessions with customer email pre-filled.

---

## 5. Test Payment Flow

### Test Mode:
1. Use Stripe test keys (`sk_test_...` and `pk_test_...`)
2. Test card: `4242 4242 4242 4242`
3. Any future expiry date and CVC

### Verify:
1. Complete test payment
2. Check Vercel logs for webhook events
3. Verify subscription appears in database:
   ```bash
   npx prisma studio
   ```
4. Sign in with test user email
5. Confirm Pro features are unlocked

### Go Live:
1. Replace test keys with live keys in Vercel env vars
2. Update webhook URL to use live mode endpoint
3. Redeploy: `git push origin main`

---

## 6. Monitor & Maintain

### Check Logs:
- Vercel: [Project → Logs](https://vercel.com/brandsagaceceo/tradingxbert/logs)
- Stripe: [Developers → Webhooks → Events](https://dashboard.stripe.com/webhooks)

### Database Access:
```bash
# View data locally
npx prisma studio

# Run migrations
npx prisma migrate deploy
```

### Subscription Status:
Users can check their subscription at: `https://tradingxbert.com/api/validate-subscription`

---

## Current Status Checklist

- [x] Prisma schema updated with Subscription model
- [x] Stripe webhook handler created and processing events
- [x] Subscription validation endpoint created
- [x] Usage limit logic updated to check Pro status
- [ ] **Vercel Postgres database created**
- [ ] **Database migrated (`npx prisma migrate deploy`)**
- [ ] **Stripe API keys added to Vercel env vars**
- [ ] **Stripe webhook endpoint configured**
- [ ] **Payment flow tested**

---

## Quick Commands

```bash
# Deploy database changes
vercel env pull .env
npx prisma migrate deploy
npx prisma generate

# View database
npx prisma studio

# Test locally
npm run dev

# Deploy to production
git add .
git commit -m "Add Stripe subscription tracking"
git push origin main
```
