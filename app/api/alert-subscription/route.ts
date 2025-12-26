import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await prisma.alertSubscription.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ message: 'Already subscribed to alerts!' });
    }

    // Create subscription
    await prisma.alertSubscription.create({
      data: {
        email,
        active: true,
      },
    });

    return NextResponse.json({ success: true, message: 'Successfully subscribed to trading alerts!' });
  } catch (error) {
    console.error('Error subscribing to alerts:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { email } = await req.json();

    await prisma.alertSubscription.update({
      where: { email },
      data: { active: false },
    });

    return NextResponse.json({ success: true, message: 'Unsubscribed from alerts' });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 });
  }
}
