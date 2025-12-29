import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import Stripe from 'stripe';

// Clean the Stripe key (remove any whitespace/newlines)
const stripeKey = (process.env.STRIPE_SECRET_KEY || '').trim().replace(/[\r\n]/g, '');

const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-11-17.clover',
  maxNetworkRetries: 3,
  timeout: 20000, // 20 seconds
});

// Fallback direct payment link
const FALLBACK_STRIPE_URL = "https://buy.stripe.com/test_00g4ivbY84ks6yseUU";

export async function GET(req: NextRequest) {
  try {
    console.log('Stripe checkout initiated');
    
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      console.log('No user session found');
      return NextResponse.redirect(new URL('/?signin=required', req.url));
    }

    console.log('User email:', session.user.email);

    // Verify Stripe key is configured and valid
    if (!stripeKey || stripeKey === 'dummy' || stripeKey.length < 20) {
      console.error('Stripe secret key not configured properly, using fallback');
      return NextResponse.redirect(FALLBACK_STRIPE_URL);
    }

    // Get the origin for redirect URLs
    const origin = req.nextUrl.origin;
    console.log('Origin:', origin);

    // Create Stripe Checkout Session
    console.log('Creating Stripe checkout session...');
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

    console.log('Checkout session created:', checkoutSession.id);

    if (!checkoutSession.url) {
      console.error('No checkout URL generated, using fallback');
      return NextResponse.redirect(FALLBACK_STRIPE_URL);
    }

    console.log('Redirecting to:', checkoutSession.url);
    return NextResponse.redirect(checkoutSession.url);
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode,
      requestId: error.requestId
    });
    
    // Use fallback link if there's a connection error
    if (error.type === 'StripeConnectionError' || error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET') {
      console.log('Connection error, using fallback payment link');
      return NextResponse.redirect(FALLBACK_STRIPE_URL);
    }
    
    let errorMessage = 'Payment system error. Please try again.';
    if (error.type === 'StripeAuthenticationError') {
      console.log('Auth error, using fallback payment link');
      return NextResponse.redirect(FALLBACK_STRIPE_URL);
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.redirect(new URL(`/pricing?error=${encodeURIComponent(errorMessage)}`, req.url));
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
