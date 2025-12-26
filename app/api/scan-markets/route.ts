import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { analyzeMarketData, fetchMarketData, MONITORED_PAIRS } from '@/lib/marketAnalysis';
import { sendBulkAlerts } from '@/lib/emailService';

export const maxDuration = 60; // 60 seconds timeout

export async function GET(req: Request) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🤖 Starting AI market scan...');

    const alerts: any[] = [];
    
    // Analyze each monitored pair
    for (const pair of MONITORED_PAIRS) {
      try {
        // Fetch market data
        const marketData = await fetchMarketData(pair);
        
        // Analyze with AI
        const analysis = await analyzeMarketData(marketData);
        
        // If strong signal detected, prepare alert
        if (analysis.shouldAlert && analysis.confidence >= 75) {
          alerts.push({
            pair,
            signal: analysis.signal,
            confidence: analysis.confidence,
            price: `$${marketData.price.toFixed(2)}`,
            keyLevels: analysis.keyLevels,
            reasoning: analysis.reasoning,
          });
          
          console.log(`📊 Signal found: ${pair} ${analysis.signal} (${analysis.confidence}%)`);
        }
      } catch (error) {
        console.error(`Error analyzing ${pair}:`, error);
      }
    }

    // If we have alerts, send to subscribers
    if (alerts.length > 0) {
      // Get active subscribers
      const subscribers = await prisma.alertSubscription.findMany({
        where: { active: true },
        select: { email: true },
      });

      const emails = subscribers.map(s => s.email);
      
      if (emails.length > 0) {
        // Send each alert
        for (const alert of alerts) {
          const result = await sendBulkAlerts(emails, alert);
          console.log(`📧 Sent ${alert.pair} alert to ${result.successful}/${result.total} subscribers`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      scanned: MONITORED_PAIRS.length,
      alertsSent: alerts.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in market scan:', error);
    return NextResponse.json({ error: 'Scan failed' }, { status: 500 });
  }
}
