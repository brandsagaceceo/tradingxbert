import { NextRequest, NextResponse } from 'next/server';
import { sendTradingAlert } from '@/lib/emailService';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Send test alert
    const result = await sendTradingAlert({
      to: email,
      signal: 'LONG',
      pair: 'BTC/USD',
      confidence: 85,
      price: '$91,356',
      keyLevels: `Entry: $91,356
Target 1: $95,000
Target 2: $98,000
Stop Loss: $89,500`,
      reasoning: 'This is a TEST email to verify your notification system is working correctly. Bitcoin showing strong bullish momentum with institutional buying. Multiple timeframe confirmation and volume support the move.'
    });

    if (result) {
      return NextResponse.json({ 
        success: true, 
        message: 'Test email sent! Check your inbox.' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Email service not configured. Check RESEND_API_KEY in environment variables.' 
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json({ 
      error: 'Failed to send test email',
      details: error?.message 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Use POST with {"email": "your@email.com"} to send test notification' 
  });
}
