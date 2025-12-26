import { prisma } from './prisma';

export async function getUserSubscription(userId: string) {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    return subscription;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
}

export function isPro(subscription: any): boolean {
  if (!subscription) return false;
  
  // Check if subscription is active and not expired
  const isActive = subscription.status === 'active';
  const notExpired = subscription.stripeCurrentPeriodEnd 
    ? new Date(subscription.stripeCurrentPeriodEnd).getTime() > Date.now()
    : false;
  
  return isActive && notExpired && subscription.plan === 'pro';
}

export async function checkUserIsPro(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  return isPro(subscription);
}
