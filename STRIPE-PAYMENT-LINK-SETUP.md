# Stripe Payment Link Setup Guide

## Your Product Details:
- **Product ID:** prod_Tg6H96qgfV1qRP
- **Price ID:** price_1Sik4pRia8z8dQ23h2lNrvog
- **Price:** $6.99 CAD per month
- **Product Name:** Trading Xbert Pro Membership

## Steps to Create Payment Link:

### 1. Go to Stripe Dashboard
Visit: https://dashboard.stripe.com/payment-links

### 2. Click "New Payment Link" or "Create payment link"

### 3. Select Your Product
- Choose "Trading Xbert Pro Membership" ($6.99 CAD/month)
- OR manually select:
  - Product: prod_Tg6H96qgfV1qRP
  - Price: price_1Sik4pRia8z8dQ23h2lNrvog

### 4. Configure Settings:
- **Collect customer information:** ✅ Email address (required)
- **After payment:** Redirect to website
  - Success URL: `https://www.tradingxbert.com/profile?subscribed=true`
  - Cancel URL: `https://www.tradingxbert.com/pricing`
- **Allow promotion codes:** ✅ (optional)

### 5. Click "Create Link"

### 6. Copy the Payment Link
It will look like:
- **Test Mode:** `https://buy.stripe.com/test_XXXXXXXXX`
- **Live Mode:** `https://buy.stripe.com/XXXXXXXXX`

### 7. Update Your Website

Once you have the payment link, run this command in your terminal:

```bash
# Replace YOURLINK with your actual Stripe payment link ID
$link = "PASTE_YOUR_STRIPE_LINK_HERE"
(Get-Content "C:\Users\BigDa\TradingXbert\app\pricing\page.tsx") -replace 'https://buy.stripe.com/test_YOURLINK', $link | Set-Content "C:\Users\BigDa\TradingXbert\app\pricing\page.tsx"
```

Or manually edit these files:
1. `app/pricing/page.tsx` - Line 52 (in Pro plan href)
2. `app/pricing/page.tsx` - Line 255 (in CTA section)

Replace `https://buy.stripe.com/test_YOURLINK` with your actual link.

### 8. Deploy
```bash
git add .
git commit -m "Add Stripe payment link"
git push
vercel --prod
```

## Important Notes:

### Test Mode vs Live Mode
- Start in **Test Mode** to test the payment flow
- Use test card: `4242 4242 4242 4242`
- When ready, switch to **Live Mode** and create a new payment link

### Webhook Setup (Required for subscription verification)
1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://www.tradingxbert.com/api/stripe-webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the webhook signing secret
6. Add to Vercel environment variables:
   - `STRIPE_WEBHOOK_SECRET=whsec_xxxxx`

### Environment Variables Needed:
```
STRIPE_SECRET_KEY=sk_test_xxxxx (or sk_live_xxxxx)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx (or pk_live_xxxxx)
```

## Quick Test Checklist:
- [ ] Created payment link in Stripe
- [ ] Updated pricing page with link
- [ ] Tested checkout with test card (4242...)
- [ ] Verified redirect to profile page
- [ ] Set up webhook endpoint
- [ ] Added webhook secret to Vercel
- [ ] Tested subscription creation
- [ ] Ready to switch to live mode!
