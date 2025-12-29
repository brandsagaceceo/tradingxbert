import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.redirect(new URL('/?signin=required', req.url));
    }

    // Get the origin for redirect URLs
    const origin = req.nextUrl.origin;

    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email,
      line_items: [
        {
          price: 'price_1Sik4pRia8z8dQ23h2lNrvog', // Your Pro Plan price ID
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/profile?success=true`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        userId: session.user.email,
      },
      subscription_data: {
        metadata: {
          userId: session.user.email,
        },
      },
    });

    if (!checkoutSession.url) {
      throw new Error('No checkout URL generated');
    }

    return NextResponse.redirect(checkoutSession.url);
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.redirect(new URL(`/pricing?error=${encodeURIComponent(error.message)}`, req.url));
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
