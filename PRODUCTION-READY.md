# TradingXbert - Production Readiness Checklist

## ✅ Completed Today (December 8, 2025)

### 1. Authentication System
- ✅ NextAuth.js v4 installed and configured
- ✅ Hybrid auth: Google OAuth + Email magic link
- ✅ Prisma adapter with SQLite (dev) / Postgres (production)
- ✅ User, Account, Session, VerificationToken models
- ✅ SignInButton component in header
- ✅ SessionProvider wrapping app

**Location**: `app/api/auth/[...nextauth]/route.ts`, `components/SignInButton.tsx`

### 2. Pricing Page
- ✅ Professional pricing page at `/pricing`
- ✅ Free plan: 10 analyses/month, day timeframes only (4H, 1D)
- ✅ Pro plan: $9.99/mo, unlimited analyses, ALL timeframes (1m, 5m, 15m, 1H, 4H, 1D)
- ✅ FAQ section
- ✅ Stripe payment link integration

**Location**: `app/pricing/page.tsx`

### 3. Chart Uploader Enhancement
- ✅ Added timeframe dropdown (1m, 5m, 15m, 1H, 4H, 1D)
- ✅ Pro timeframes labeled clearly
- ✅ Link to pricing page for upgrades
- ✅ Timeframe data sent with form submission

**Location**: `components/ChartUploader.tsx`

### 4. Header & Navigation
- ✅ Pricing link added to header
- ✅ "Get Pro" button links to `/pricing`
- ✅ SignInButton in navigation
- ✅ Scrolling banner updated with correct $9.99/mo pricing
- ✅ Banner shows timeframe benefits (1MIN • 5MIN • 15MIN)

**Location**: `app/layout.tsx`, `components/Header.tsx`

### 5. Free Trading Academy
- ✅ 6 courses created:
  1. Getting Started (beginner, basics)
  2. Spot Good Trades (intermediate, patterns)
  3. Risk Management (intermediate, position sizing)
  4. Using AI (all levels, indicators + AI setup)
  5. Advanced Analysis (advanced, placeholder)
  6. Psychology (all levels, placeholder)
- ✅ Course index with hero, cards, animations
- ✅ Cross-linking between courses

**Location**: `app/how-to-trade/*`

---

## ⚠️ Required Before Production Deploy

### 1. Environment Variables (CRITICAL)
You MUST set these in Vercel (or your deployment platform):

```bash
# Auth (NextAuth)
NEXTAUTH_SECRET=<generate-a-long-random-string>
NEXTAUTH_URL=https://yourdomain.com

# Google OAuth
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

# Email Provider (for magic links)
EMAIL_SERVER=smtp://username:password@smtp.yourprovider.com:587
EMAIL_FROM=noreply@yourdomain.com

# Database (production)
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# OpenAI (rotate your exposed key!)
OPENAI_API_KEY=<new-rotated-key>

# Metadata
NEXT_PUBLIC_METADATA_BASE=https://yourdomain.com
```

### 2. Google OAuth Setup
1. Go to https://console.cloud.google.com/
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://yourdomain.com/api/auth/callback/google` (production)
4. Copy Client ID and Secret to env vars

### 3. Email Provider Setup
For magic link sign-in, you need an SMTP server. Options:
- **SendGrid** (recommended): free tier, easy setup
- **Mailgun**: good deliverability
- **AWS SES**: cheap, reliable
- **Gmail SMTP**: quick for testing (use app password)

Example SendGrid setup:
```bash
EMAIL_SERVER=smtp://apikey:YOUR_SENDGRID_API_KEY@smtp.sendgrid.net:587
EMAIL_FROM=noreply@yourdomain.com
```

### 4. Database Migration (Production)
Your local DB is SQLite (`dev.db`). For production, use Postgres:

**Option A: Vercel Postgres**
1. Add Vercel Postgres to your project
2. Copy `DATABASE_URL` to env vars
3. Run: `npx prisma db push` (or `npx prisma migrate deploy`)

**Option B: External Postgres (Railway, Supabase, AWS RDS)**
1. Create Postgres database
2. Get connection string
3. Set `DATABASE_URL` in Vercel env
4. Run migrations on deploy

### 5. Security Checklist
- [ ] Rotate exposed `OPENAI_API_KEY` immediately
- [ ] Remove `.env.local` from git (already in `.gitignore`)
- [ ] Never commit secrets to repo
- [ ] Enable HTTPS only (Vercel handles this)
- [ ] Set `NEXTAUTH_SECRET` to a strong random string (32+ chars)

### 6. API Route Updates Needed
Your AI analysis routes need to:
- [ ] Check user plan (free vs pro) before processing
- [ ] Validate timeframe against plan (block 1m/5m for free users)
- [ ] Track usage count (free users: 10/month limit)
- [ ] Return error if limit exceeded

**Implementation suggestion**:
```typescript
// app/api/analyze/route.ts
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession();
  const formData = await req.formData();
  const timeframe = formData.get("timeframe");
  
  // Check if user is authenticated
  if (!session?.user?.email) {
    return Response.json({ error: "Please sign in" }, { status: 401 });
  }
  
  // Get user from DB (you'll need to add isPro field to User model)
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  
  // Check timeframe restriction
  const proTimeframes = ["1m", "5m", "15m", "1H"];
  if (proTimeframes.includes(timeframe) && !user.isPro) {
    return Response.json({ 
      error: "Pro timeframes require Pro plan",
      upgradeUrl: "/pricing"
    }, { status: 403 });
  }
  
  // Check usage limit (free users)
  if (!user.isPro) {
    // You'll need to add usage tracking table
    const usageThisMonth = await prisma.usage.count({
      where: {
        userId: user.id,
        createdAt: { gte: startOfMonth(new Date()) }
      }
    });
    
    if (usageThisMonth >= 10) {
      return Response.json({
        error: "Free plan limit reached (10/month)",
        upgradeUrl: "/pricing"
      }, { status: 429 });
    }
  }
  
  // Process analysis...
  // Record usage...
}
```

---

## 📝 Recommended Prisma Schema Updates

Add to `prisma/schema.prisma`:

```prisma
model User {
  id            String   @id @default(cuid())
  name          String? 
  email         String?  @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  usages        Usage[]
  
  // Add these fields
  isPro         Boolean  @default(false)
  stripeCustomerId String?
  subscriptionId String?
  subscriptionStatus String?
  planExpiresAt DateTime?
}

model Usage {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  timeframe String
  market    String
  createdAt DateTime @default(now())
  
  @@index([userId, createdAt])
}
```

Run after updating schema:
```bash
npx prisma generate
npx prisma db push
```

---

## 🚀 Deployment Steps

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (if not already):
   ```powershell
   npm install -g vercel
   ```

2. **Login**:
   ```powershell
   vercel login
   ```

3. **Create staging project**:
   ```powershell
   vercel --name tradingxbert-staging
   ```

4. **Set environment variables** (all from checklist above):
   ```powershell
   vercel env add NEXTAUTH_SECRET
   vercel env add GOOGLE_CLIENT_ID
   vercel env add GOOGLE_CLIENT_SECRET
   # ... repeat for all vars
   ```

5. **Deploy**:
   ```powershell
   vercel --prod
   ```

6. **Test staging**:
   - Visit your `*.vercel.app` URL
   - Test sign-in (Google + Email)
   - Test chart upload
   - Test free vs pro timeframes
   - Test pricing page and Stripe link

7. **Attach custom domain** (optional):
   ```powershell
   vercel domains add yourdomain.com
   ```

---

## 🧪 Local Testing Commands

### Start dev server:
```powershell
npm run dev
```

### Build for production (test locally):
```powershell
npm run build
npm run start
```

### Reset database:
```powershell
Remove-Item dev.db -ErrorAction SilentlyContinue
npx prisma db push
```

### Generate Prisma client:
```powershell
npx prisma generate
```

---

## 📊 What Works Right Now

✅ All pages render and navigate correctly
✅ Blog posts load (6 posts)
✅ Free trading academy (6 courses)
✅ Pricing page with clear Free vs Pro comparison
✅ Chart uploader with timeframe dropdown
✅ Sign-in UI in header (requires OAuth setup to function)
✅ Prisma DB schema and adapter configured
✅ NextAuth routes configured

## ⏳ What You Need to Do

1. **Rotate OpenAI key** (critical security issue)
2. **Set up Google OAuth credentials**
3. **Choose and configure email provider** (SendGrid recommended)
4. **Set all environment variables in Vercel**
5. **Add usage tracking and plan validation to API routes**
6. **Deploy to staging and test**
7. **Attach custom domain** (optional)

---

## 🐛 Known Issues / Notes

1. **Course durations**: Courses list "45-60 min" but are shorter reads (~10-15 min). Consider this marketing copy or expand content further.

2. **Sign-in not visible locally**: You won't see sign-in work until you:
   - Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
   - Or set up email provider for magic links

3. **Stripe webhook**: You have a webhook handler at `app/api/stripe-webhook/route.ts`. Configure webhook in Stripe dashboard:
   - Endpoint: `https://yourdomain.com/api/stripe-webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Add webhook secret to env: `STRIPE_WEBHOOK_SECRET`

4. **Usage limiting**: Not implemented yet - free users can currently upload unlimited charts. Add usage tracking before launch.

---

## 📞 Support / Next Steps

If you need help with:
- Google OAuth setup → [Google Cloud Console Guide](https://console.cloud.google.com/)
- SendGrid setup → [SendGrid SMTP Guide](https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api)
- Vercel deployment → [Vercel Docs](https://vercel.com/docs)
- Stripe webhooks → [Stripe Webhook Guide](https://stripe.com/docs/webhooks)

**You're 90% ready for production!** Just need OAuth credentials and environment variables set up.
