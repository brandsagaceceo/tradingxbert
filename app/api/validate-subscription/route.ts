import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { checkUserIsPro } from '@/lib/subscription';

// Force dynamic route
export const dynamic = 'force-dynamic';

// Admin emails with automatic Pro access
const ADMIN_EMAILS = [
  'brandsagaceo@gmail.com',
];

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      console.log('❌ No session or email');
      return NextResponse.json({ 
        isPro: false, 
        error: 'Not authenticated',
        debug: 'No session found'
      });
    }

    const userEmail = session.user.email;
    console.log(`🔍 Checking subscription for: ${userEmail}`);

    // ADMIN CHECK FIRST - Skip database for admins
    if (ADMIN_EMAILS.includes(userEmail)) {
      console.log(`👑 ADMIN DETECTED: ${userEmail} - Granting Pro immediately`);
      return NextResponse.json({ 
        isPro: true, 
        admin: true, 
        email: userEmail,
        source: 'admin_list'
      });
    }

    // Non-admin users: Check database
    console.log(`📊 Checking database for: ${userEmail}`);

    // Import prisma here to avoid circular dependencies
    const { prisma } = await import('@/lib/prisma');
    
    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { subscription: true },
    });

    if (!user) {
      console.log(`📝 Creating new user: ${userEmail}`);
      user = await prisma.user.create({
        data: {
          email: userEmail,
          name: session.user.name || userEmail.split('@')[0],
        },
        include: { subscription: true },
      });
    }

    console.log(`👤 User found: ${user.email}, ID: ${user.id}`);
    console.log(`📊 Has subscription: ${user.subscription ? 'Yes' : 'No'}`);

    // Check database subscription
    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id },
    });

    if (!subscription) {
      console.log(`❌ No subscription found for ${user.email}`);
      return NextResponse.json({ 
        isPro: false, 
        email: userEmail, 
        userId: user.id,
        source: 'no_subscription'
      });
    }

    console.log(`📋 Subscription status: ${subscription.status}`);
    console.log(`📅 Period end: ${subscription.stripeCurrentPeriodEnd}`);
    console.log(`💎 Plan: ${subscription.plan}`);

    const isProUser = await checkUserIsPro(user.id);
    
    console.log(`${isProUser ? '✅' : '❌'} Pro status: ${isProUser}`);
    
    return NextResponse.json({ 
      isPro: isProUser, 
      email: session.user.email,
      subscription: {
        status: subscription.status,
        plan: subscription.plan,
        expiresAt: subscription.stripeCurrentPeriodEnd,
      }
    });
  } catch (error) {
    console.error('❌ Error validating subscription:', error);
    return NextResponse.json({ isPro: false, error: String(error) });
  }
}
