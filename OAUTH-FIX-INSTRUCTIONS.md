# Fix OAuth Redirect URI Error

## Problem
Getting "Error 400: redirect_uri_mismatch" when signing in with Google.

## Solution
You need to add the production domain to your Google OAuth credentials.

## Steps to Fix:

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/apis/credentials
   - Sign in with: brandsagaceo@gmail.com

2. **Find Your OAuth Client:**
   - Look for the OAuth 2.0 Client ID you're using
   - Client ID starts with: `301518527566-84a8vvc6n6p14tscvnaifgcqcp6udkcv.apps.googleusercontent.com`

3. **Add Authorized Redirect URIs:**
   Click on your OAuth client and add these URLs to "Authorized redirect URIs":
   
   ```
   https://www.tradingxbert.com/api/auth/callback/google
   https://tradingxbert.com/api/auth/callback/google
   https://tradingxbert.vercel.app/api/auth/callback/google
   ```

4. **Save Changes:**
   - Click "Save" at the bottom
   - Wait 5-10 minutes for changes to propagate

5. **Test Sign In:**
   - Go to https://www.tradingxbert.com
   - Click "Sign In" 
   - Should now work without error!

## Current Environment Variables (Already Set ✅)
- `NEXTAUTH_URL=https://www.tradingxbert.com` ✅
- `NEXT_PUBLIC_METADATA_BASE=https://www.tradingxbert.com` ✅
- `GOOGLE_CLIENT_ID` ✅
- `GOOGLE_CLIENT_SECRET` ✅

## Why This Happens
OAuth requires you to whitelist exact callback URLs for security. When you add a custom domain, you need to add that domain's callback URL to the allowed list in Google Cloud Console.

## Alternative: Use Vercel Domain Temporarily
If you want to test immediately, you can also use:
- https://tradingxbert-bd7zevl0c-brandsagaceceos-projects.vercel.app

But make sure to add the custom domain URLs for the final production site.
