import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';

// Admin emails who can grant pro access
const ADMIN_EMAILS = [
  'brandsagaceceo@gmail.com',
];

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    // Check if requester is admin
    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

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
    }

    // Create or update subscription with lifetime pro access
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    await prisma.subscription.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        stripeCustomerId: 'manual_grant',
        stripeSubscriptionId: `manual_${user.id}_${Date.now()}`,
        stripePriceId: 'manual',
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

    return NextResponse.json({ 
      success: true, 
      message: `Pro access granted to ${email}`,
      user: { email: user.email, id: user.id }
    });

  } catch (error: any) {
    console.error('Error granting pro access:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
