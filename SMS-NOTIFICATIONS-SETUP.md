# SMS Notifications Setup Guide

## Overview
TradingXbert now supports SMS notifications for Pro users! Get instant text alerts when the AI detects high-confidence trading opportunities.

## Features
- ✅ Email notifications (included in all plans)
- ✅ SMS notifications (Pro plan only)
- ✅ Customizable alert thresholds
- ✅ Rich HTML email templates
- ✅ Instant mobile notifications

## Setup Instructions

### 1. Email Notifications (All Users)

Email notifications work out of the box using the email address from your Google account.

**To enable:**
1. Sign in to TradingXbert
2. Go to your Profile page
3. Enable "Trade Alerts" toggle
4. Select your alert preferences

### 2. SMS Notifications (Pro Users Only)

SMS notifications require Twilio integration. Follow these steps:

#### A. Create a Twilio Account
1. Sign up at https://www.twilio.com/try-twilio
2. Get $15 free credit for testing
3. Verify your phone number

#### B. Get Your Twilio Credentials
1. Go to https://console.twilio.com
2. Copy your Account SID
3. Copy your Auth Token
4. Get a Twilio phone number

#### C. Add Environment Variables to Vercel
1. Go to https://vercel.com/brandsagaceceos-projects/tradingxbert/settings/environment-variables
2. Add these variables:
   - `TWILIO_ACCOUNT_SID` = your Account SID
   - `TWILIO_AUTH_TOKEN` = your Auth Token
   - `TWILIO_PHONE_NUMBER` = your Twilio phone number (format: +1234567890)

3. Redeploy your site: `vercel --prod`

#### D. Enable in Your Profile
1. Upgrade to Pro plan
2. Go to Profile settings
3. Add your mobile number
4. Enable "SMS Alerts" toggle

## Alert Types

### High Confidence Alerts (>80%)
- **Email**: Sent immediately
- **SMS**: Sent immediately (Pro only)
- **Format**: "🚀 TradingXbert: LONG BTC/USD @ $45,000 (85% confidence)"

### Medium Confidence Alerts (60-80%)
- **Email**: Sent immediately
- **SMS**: Optional (configurable in settings)

### Daily Summary
- **Email**: Daily digest at 6 PM (all users)
- **SMS**: Not sent for summaries

## Cost Information

### Email Notifications
- **Cost**: FREE for all users
- **Limit**: Unlimited

### SMS Notifications
- **Cost**: Covered by your Pro subscription
- **Twilio Pricing**: ~$0.0079 per SMS in US
- **Estimated Monthly Cost**: $5-10 for active traders (covered in Pro plan)

## Testing

To test your SMS notifications:

```bash
# Run the test script
node scripts/testSMS.js
```

Or send a test alert from your profile page.

## Troubleshooting

### SMS Not Received
1. Check your phone number is verified in Twilio
2. Ensure TWILIO environment variables are set in Vercel
3. Check Twilio console for delivery status
4. Verify you're on the Pro plan

### Email Not Received
1. Check your spam folder
2. Verify your email in your profile
3. Enable trade alerts in settings
4. Check browser console for errors

## Code Examples

### Send Email Alert
```typescript
import { sendTradingAlert } from '@/lib/emailService';

await sendTradingAlert({
  to: user.email,
  signal: 'LONG',
  pair: 'BTC/USD',
  confidence: 85,
  price: '$45,000',
  keyLevels: 'Support: $44,000\nResistance: $46,500',
  reasoning: 'Strong bullish momentum with volume confirmation'
});
```

### Send SMS Alert (Pro Users)
```typescript
import { sendSMSAlert } from '@/lib/emailService';

await sendSMSAlert(user.phoneNumber, {
  signal: 'LONG',
  pair: 'BTC/USD',
  confidence: 85,
  price: '$45,000',
  keyLevels: 'Support: $44,000\nResistance: $46,500',
  reasoning: 'Strong bullish momentum'
});
```

## Future Enhancements

- [ ] Telegram bot integration
- [ ] Discord webhook notifications
- [ ] WhatsApp Business API
- [ ] Customizable alert schedules
- [ ] Alert history and analytics
- [ ] Multi-language support

## Support

Need help setting up notifications?
- Email: support@tradingxbert.com
- Discord: [Join our community]
- Docs: https://www.tradingxbert.com/docs

## Privacy

- We never share your phone number with third parties
- SMS messages are sent only for trade alerts you've enabled
- You can disable notifications anytime from your profile
- All data is encrypted and stored securely
