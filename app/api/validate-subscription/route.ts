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
      return NextResponse.json({ isPro: false });
    }

    // Admins always get Pro access
    if (ADMIN_EMAILS.includes(session.user.email)) {
      // Also ensure they have a pro subscription in database
      const { prisma } = await import('@/lib/prisma');
      
      let user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: session.user.email,
            name: session.user.name || session.user.email.split('@')[0],
          },
        });
      }

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

      return NextResponse.json({ isPro: true, admin: true });
    }

    // Import prisma here to avoid circular dependencies
    const { prisma } = await import('@/lib/prisma');
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ isPro: false });
    }

    const isPro = await checkUserIsPro(user.id);
    
    return NextResponse.json({ isPro });
  } catch (error) {
    console.error('Error validating subscription:', error);
    return NextResponse.json({ isPro: false });
  }
}
