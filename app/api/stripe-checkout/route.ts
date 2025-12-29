import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import Stripe from 'stripe';

// Clean the Stripe key (remove any whitespace/newlines)
const stripeKey = (process.env.STRIPE_SECRET_KEY || '').trim().replace(/[\r\n]/g, '');

const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-11-17.clover',
});

export async function POST(req: NextRequest) {
  try {
    console.log('Stripe checkout initiated');
    
    const session = await getServerSession();
    const userEmail = session?.user?.email || '';

    // Get the origin for redirect URLs
    const origin = process.env.NEXTAUTH_URL || 'https://www.tradingxbert.com';
    console.log('Origin:', origin);

    // Create Stripe Checkout Session
    console.log('Creating Stripe checkout session...');
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: userEmail,
      line_items: [
        {
          price: 'price_1SijBoRia8z8dQ23UVC7XVEE',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/profile?success=true`,
      cancel_url: `${origin}/pricing?canceled=true`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      metadata: {
        userId: userEmail,
      },
      subscription_data: {
        metadata: {
          userId: userEmail,
        },
      },
    });

    console.log('Checkout session created:', checkoutSession.id);

    if (!checkoutSession.url) {
      throw new Error('No checkout URL generated');
    }

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}
