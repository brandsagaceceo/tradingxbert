import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { checkUserIsPro } from '@/lib/subscription';

// Admin emails with automatic Pro access
const ADMIN_EMAILS = [
  'brandsagaceo@gmail.com',
];

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      console.log('❌ No session or email');
      return NextResponse.json({ isPro: false, error: 'Not authenticated' });
    }

    console.log(`🔍 Checking subscription for: ${session.user.email}`);

    // Import prisma here to avoid circular dependencies
    const { prisma } = await import('@/lib/prisma');
    
    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true },
    });

    if (!user) {
      console.log(`📝 Creating new user: ${session.user.email}`);
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || session.user.email.split('@')[0],
        },
        include: { subscription: true },
      });
    }

    console.log(`👤 User found: ${user.email}, ID: ${user.id}`);
    console.log(`📊 Has subscription: ${user.subscription ? 'Yes' : 'No'}`);

    // Check if admin - admins get automatic Pro
    if (ADMIN_EMAILS.includes(session.user.email)) {
      console.log(`👑 Admin detected: ${session.user.email}`);
      
      // Ensure admin has active pro subscription
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

      await prisma.subscription.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          stripeCustomerId: 'admin_access',
          stripeSubscriptionId: `admin_${user.id}`,
          stripePriceId: 'admin',
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

      console.log(`✅ Admin Pro access granted`);
      return NextResponse.json({ isPro: true, admin: true, email: session.user.email });
    }

    // Check database subscription for all users
    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id },
    });

    if (!subscription) {
      console.log(`❌ No subscription found for ${user.email}`);
      return NextResponse.json({ isPro: false, email: session.user.email, userId: user.id });
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
