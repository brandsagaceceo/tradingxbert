import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    await prisma.alertSubscription.update({
      where: { email },
      data: { active: false },
    });

    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #0a0a0f; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .container { text-align: center; max-width: 500px; padding: 40px; background: #1a1a2e; border-radius: 20px; border: 1px solid rgba(255, 215, 0, 0.3); }
          .emoji { font-size: 64px; margin-bottom: 20px; }
          h1 { color: #FFD700; margin-bottom: 20px; }
          p { color: #aaa; line-height: 1.6; }
          a { color: #FFD700; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="emoji">✅</div>
          <h1>Unsubscribed Successfully</h1>
          <p>You've been removed from TradingXbert AI trading alerts.</p>
          <p style="margin-top: 30px;">Changed your mind? <a href="https://tradingxbert.com">Subscribe again</a></p>
        </div>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 });
  }
}
