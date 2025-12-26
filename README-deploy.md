Deploying TradingXbert (Vercel) — quick guide

This repository is a Next.js 14 (App Router) TypeScript project.
Below are step-by-step instructions to deploy to Vercel and wire your domain `www.tradingxbert.com`.

1) Prepare environment
- Copy `.env.production.example` to `.env.production` and fill values.
- Important: set `NEXT_PUBLIC_METADATA_BASE=https://www.tradingxbert.com`
- Add your `OPENAI_API_KEY` (server-side secret) if you plan to enable live AI analysis.

2) Create a GitHub repository (if you don't already have one)
- Initialize git locally and push to GitHub:

```powershell
git init
git add -A
git commit -m "chore: initial TradingXbert source"
# create new GitHub repo then add remote
git remote add origin https://github.com/<your-username>/tradingxbert.git
git push -u origin main
```

3) Deploy to Vercel (recommended)
- Sign in to https://vercel.com with your GitHub account.
- Click "New Project" and import the GitHub repository.
- Vercel will detect Next.js. Accept defaults.
- In Project Settings -> Environment Variables, add:
  - `OPENAI_API_KEY` = your OpenAI key (Production)
  - `NEXT_PUBLIC_METADATA_BASE` = `https://www.tradingxbert.com` (Production)
- Deploy the project. Vercel will provide a preview URL for each push and a production URL once you set the domain.

4) Add your custom domain in Vercel
- In the Vercel project dashboard -> Domains, add `www.tradingxbert.com`.
- Vercel will show DNS records to add at your registrar. Common options:
  - Add an ALIAS/CNAME record for `www` pointing to `cname.vercel-dns.com` (Vercel will show exact target)
  - For the root domain `tradingxbert.com`, add the A records Vercel suggests or use ALIAS/ANAME if supported.
- After adding DNS records, Vercel will verify and provision SSL automatically.

5) Optional: Use Cloudflare for DNS
- If you use Cloudflare, add the same DNS records. When using Cloudflare, set the proxy (orange cloud) OFF for the Vercel verification step; you can enable it later if desired.

6) Post-deploy checks
- Confirm `https://www.tradingxbert.com` loads and the metadata resolves.
- Check `https://www.tradingxbert.com/robots.txt` and `sitemap.xml` for correct URLs.
- In Vercel, add any additional environment variables (e.g., `NEXT_PUBLIC_USE_MOCK`) in Production if needed.

7) Testing without OpenAI
- To test the UI without an OpenAI key, set `NEXT_PUBLIC_USE_MOCK=1` (dev/test only) and restart the dev server or set it as an ENV in Vercel for preview.

Need help?
- If you want, I can initialize git, create the GitHub repo, push the code, and set up a Vercel project (you'll need to approve access in your Vercel account). Tell me which parts you'd like me to do.
