# TradingXbert - Complete Deployment Checklist

## ✅ COMPLETED
- [x] Git repository initialized
- [x] Initial commit created
- [x] All code files added to repository

---

## 🚀 DEPLOYMENT STEPS (Follow in Order)

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named `tradingxbert` or `TradingXbert`
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"
5. Copy the remote URL (it will look like: `https://github.com/YOUR-USERNAME/tradingxbert.git`)
6. In your terminal, run:
   ```powershell
   cd c:\Users\BigDa\TradingXbert
   git remote add origin https://github.com/YOUR-USERNAME/tradingxbert.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Set Up Vercel Account
1. Go to https://vercel.com/signup
2. Sign up with your GitHub account
3. Grant Vercel access to your GitHub repositories

### Step 3: Deploy to Vercel
1. Go to https://vercel.com/new
2. Click "Import" next to your `tradingxbert` repository
3. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### Step 4: Add Environment Variables in Vercel
Click "Environment Variables" and add these (one by one):

#### Required for Basic Functionality:
```
NEXT_PUBLIC_METADATA_BASE=https://tradingxbert.vercel.app
```
(Update this with your custom domain later)

#### Required for OpenAI API (CRITICAL):
```
OPENAI_API_KEY=your-actual-openai-key-here
```
⚠️ **ACTION REQUIRED**: Get your API key from https://platform.openai.com/api-keys

#### Required for Authentication:
```
NEXTAUTH_SECRET=generate-a-32-character-random-string
NEXTAUTH_URL=https://tradingxbert.vercel.app
```
Generate secret: https://generate-secret.vercel.app/32 or run:
```powershell
openssl rand -base64 32
```

#### Required for Google OAuth:
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```
⚠️ **Set up in Step 5 below**

#### Required for Database:
```
DATABASE_URL=your-postgres-connection-string
```
⚠️ **Set up in Step 6 below**

#### Optional - Email Magic Link (if you want email login):
```
EMAIL_SERVER=smtp://username:password@smtp.yourprovider.com:587
EMAIL_FROM=noreply@tradingxbert.com
```

4. Click "Deploy" - Vercel will build and deploy your site

### Step 5: Set Up Google OAuth
1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth 2.0 Client ID"
5. Configure consent screen if prompted:
   - User Type: External
   - App name: TradingXbert
   - User support email: your email
   - Developer contact: your email
6. Create OAuth Client ID:
   - Application type: Web application
   - Name: TradingXbert Production
   - Authorized redirect URIs:
     * `https://tradingxbert.vercel.app/api/auth/callback/google`
     * `https://yourdomain.com/api/auth/callback/google` (if you have custom domain)
7. Copy the Client ID and Client Secret
8. Go back to Vercel > Settings > Environment Variables
9. Add/Update:
   - `GOOGLE_CLIENT_ID`: paste your client ID
   - `GOOGLE_CLIENT_SECRET`: paste your client secret
10. Redeploy the site (Vercel > Deployments > menu > Redeploy)

### Step 6: Set Up Production Database (Vercel Postgres)
1. In Vercel, go to your project > "Storage" tab
2. Click "Create Database"
3. Select "Postgres" (Vercel Postgres - has free tier)
4. Name it: `tradingxbert-db`
5. Select region (choose closest to your users)
6. Click "Create"
7. Vercel will automatically add `DATABASE_URL` and other env vars
8. Go to your project settings and verify the DATABASE_URL is added
9. Update your [prisma/schema.prisma](prisma/schema.prisma) datasource:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
10. Commit and push this change:
    ```powershell
    git add prisma/schema.prisma
    git commit -m "Update database to PostgreSQL for production"
    git push
    ```
11. Vercel will auto-deploy with the new database

### Step 7: Run Database Migrations
After deploying with Postgres:
1. Install Vercel CLI locally:
   ```powershell
   npm install -g vercel
   ```
2. Login to Vercel:
   ```powershell
   vercel login
   ```
3. Link your project:
   ```powershell
   cd c:\Users\BigDa\TradingXbert
   vercel link
   ```
4. Pull environment variables:
   ```powershell
   vercel env pull .env.production
   ```
5. Run Prisma migrations:
   ```powershell
   npx prisma migrate dev --name init
   npx prisma generate
   ```
6. Push schema to production database:
   ```powershell
   npx prisma db push
   ```

### Step 8: Add Custom Domain (Optional)
1. In Vercel, go to your project > Settings > Domains
2. Add your domain: `www.tradingxbert.com`
3. Vercel will show DNS records to add
4. Go to your domain registrar (GoDaddy, Namecheap, etc.)
5. Add the DNS records shown by Vercel:
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com (or as shown)
6. For root domain `tradingxbert.com`:
   - Add A records pointing to Vercel's IPs
   - Or use ALIAS/ANAME if supported
7. Wait for DNS propagation (can take up to 48 hours, usually 1-2 hours)
8. Once verified, update environment variables:
   - `NEXTAUTH_URL=https://www.tradingxbert.com`
   - `NEXT_PUBLIC_METADATA_BASE=https://www.tradingxbert.com`
9. Update Google OAuth redirect URIs to include your custom domain
10. Redeploy

### Step 9: Set Up Stripe (for Payments)
1. Go to https://stripe.com and sign up
2. Get your API keys from Dashboard > Developers > API Keys
3. In Vercel, add environment variables:
   ```
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   STRIPE_WEBHOOK_SECRET=your-webhook-signing-secret
   ```
4. Set up webhook endpoint in Stripe:
   - Go to Dashboard > Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe-webhook`
   - Select events: `checkout.session.completed`
   - Copy the webhook signing secret and add to Vercel env vars
5. Create a product in Stripe:
   - Go to Dashboard > Products
   - Create "TradingXbert Pro"
   - Price: $9.99/month, recurring
   - Copy the price ID
6. Update [app/pricing/page.tsx](app/pricing/page.tsx) with your Stripe payment link

### Step 10: Test Everything
1. Visit your deployed site
2. Test sign-in with Google ✓
3. Test free analysis (10/month limit) ✓
4. Test timeframe restrictions ✓
5. Test payment flow ✓
6. Check all pages load ✓
7. Test SEO metadata ✓
8. Check mobile responsiveness ✓

---

## 📋 QUICK REFERENCE

### Your URLs
- **GitHub Repo**: https://github.com/YOUR-USERNAME/tradingxbert
- **Vercel Project**: https://vercel.com/YOUR-USERNAME/tradingxbert
- **Live Site**: https://tradingxbert.vercel.app
- **Custom Domain**: https://www.tradingxbert.com (after setup)

### Important Commands
```powershell
# Deploy to GitHub
git add .
git commit -m "your message"
git push

# Vercel will auto-deploy on every push to main branch

# Local development
npm install
npm run dev

# Database commands
npx prisma studio        # View database
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema to database
```

### Critical API Keys Needed
- [ ] OpenAI API Key (https://platform.openai.com/api-keys)
- [ ] Google OAuth credentials (https://console.cloud.google.com/)
- [ ] Stripe API keys (https://stripe.com)
- [ ] Database URL (auto-generated by Vercel Postgres)

---

## 🆘 TROUBLESHOOTING

### Error: "Invalid OAuth redirect URI"
- Add all possible URLs to Google OAuth settings
- Include both vercel.app and custom domain
- Don't forget `/api/auth/callback/google` path

### Error: "Database connection failed"
- Check DATABASE_URL is set in Vercel
- Ensure Prisma schema uses `postgresql` provider
- Run `npx prisma db push` to sync schema

### Error: "OpenAI API key not found"
- Add OPENAI_API_KEY in Vercel environment variables
- Redeploy after adding env vars
- Check for typos in variable name

### Site shows "404" or won't load
- Check build logs in Vercel
- Ensure `next.config.js` is correct
- Verify all imports are correct case
- Check for TypeScript errors

---

## ✨ POST-LAUNCH

After successful deployment:
1. Submit sitemap to Google Search Console
2. Set up Google Analytics (optional)
3. Monitor OpenAI API usage and costs
4. Set up monitoring/alerts in Vercel
5. Create backup of database
6. Document your deployment process
7. Set up domain email (optional)

---

## 💰 COST ESTIMATE

| Service | Cost | Notes |
|---------|------|-------|
| Vercel | Free | Hobby plan sufficient to start |
| Vercel Postgres | Free | 256MB storage, 60 hours compute |
| OpenAI API | ~$5-20/mo | Depends on usage |
| Stripe | $0 + fees | 2.9% + $0.30 per transaction |
| Domain | ~$12/year | If using custom domain |
| **Total** | **~$5-20/mo** | Plus domain registration |

---

**Good luck with your launch! 🚀**
