# 🚀 Next Steps to Enable Payments

Your code is ready! Now you need to configure the infrastructure:

## Step 1: Create Vercel Postgres Database (5 minutes)

1. Go to https://vercel.com/brandsagaceceo/tradingxbert/stores
2. Click **Create Database**
3. Select **Postgres**
4. Click **Create**

✅ This automatically adds `DATABASE_URL` to your environment variables

## Step 2: Get Stripe Keys (5 minutes)

### Get API Keys:
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy the **Secret key** (starts with `sk_test_`)
3. Copy the **Publishable key** (starts with `pk_test_`)

### Set Up Webhook:
1. Go to https://dashboard.stripe.com/test/webhooks
2. Click **Add endpoint**
3. URL: `https://tradingxbert.com/api/stripe-webhook`
4. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

### Create Product:
1. Go to https://dashboard.stripe.com/test/products
2. Click **Add product**
3. Name: "TradingXbert Pro"
4. Price: $29.00 USD per month
5. Click **Save**
6. Copy the **Price ID** (starts with `price_`)

## Step 3: Add to Vercel (2 minutes)

Go to https://vercel.com/brandsagaceceo/tradingxbert/settings/environment-variables

Click **Add New** for each:

```
STRIPE_SECRET_KEY = sk_test_xxxxx (from Step 2)
STRIPE_PUBLISHABLE_KEY = pk_test_xxxxx (from Step 2)
STRIPE_WEBHOOK_SECRET = whsec_xxxxx (from Step 2)
STRIPE_PRICE_ID = price_xxxxx (from Step 2)
```

Select: **Production**, **Preview**, and **Development** for all

## Step 4: Run Database Migration (local, 2 minutes)

```bash
# Pull the DATABASE_URL from Vercel
vercel env pull .env

# Create database tables
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

## Step 5: Redeploy (triggers automatically)

Once you add the Stripe env vars in Vercel, it will auto-redeploy.

Or manually:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

## Step 6: Test It! (5 minutes)

1. Go to https://tradingxbert.com/pricing
2. Click **Get Pro**
3. Use test card: `4242 4242 4242 4242`
4. Complete payment
5. Go back to homepage - you should have unlimited analyses!

---

## What Changed:

✅ Added `Subscription` model to database
✅ Stripe webhook now saves subscriptions to database
✅ Created `/api/validate-subscription` endpoint
✅ Usage limits check for Pro subscription
✅ All code is deployed and ready

## What's Left:

⏳ Create Vercel Postgres database (Step 1)
⏳ Add Stripe environment variables (Steps 2-3)
⏳ Run database migration locally (Step 4)

**Total time: ~15 minutes**

---

Need help? Check [STRIPE-SETUP.md](STRIPE-SETUP.md) for detailed instructions.
