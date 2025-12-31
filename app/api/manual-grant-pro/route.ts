import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, secret } = await req.json();
    
    // Simple security check
    if (secret !== 'tradingxbert2025') {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 403 });
    }

    console.log(`🔧 Manual Pro grant for: ${email}`);

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0],
        },
      });
      console.log(`✅ Created user: ${email}`);
    }

    // Create/update Pro subscription
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    const subscription = await prisma.subscription.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        stripeCustomerId: `manual_${Date.now()}`,
        stripeSubscriptionId: `manual_${user.id}_${Date.now()}`,
        stripePriceId: 'manual_grant',
        stripeCurrentPeriodEnd: oneYearFromNow,
        status: 'active',
        plan: 'pro',
      },
      update: {
        stripeCurrentPeriodEnd: oneYearFromNow,
        status: 'active',
        plan: 'pro',
      },
    });

    console.log(`✅ Pro subscription granted to ${email}`);
    console.log(`   Expires: ${oneYearFromNow.toISOString()}`);

    return NextResponse.json({ 
      success: true, 
      message: `Pro access granted to ${email}`,
      expiresAt: oneYearFromNow,
      subscription 
    });
  } catch (error) {
    console.error('❌ Error granting Pro:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
