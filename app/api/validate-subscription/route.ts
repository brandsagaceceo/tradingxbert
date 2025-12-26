import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { checkUserIsPro } from '@/lib/subscription';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ isPro: false });
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
