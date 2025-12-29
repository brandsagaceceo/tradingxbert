import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
  maxNetworkRetries: 3,
  timeout: 20000, // 20 seconds
});

export async function GET(req: NextRequest) {
  try {
    console.log('Stripe checkout initiated');
    
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      console.log('No user session found');
      return NextResponse.redirect(new URL('/?signin=required', req.url));
    }

    console.log('User email:', session.user.email);

    // Verify Stripe key is configured
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'dummy') {
      console.error('Stripe secret key not configured');
      return NextResponse.redirect(new URL('/pricing?error=Payment system not configured', req.url));
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
      console.error('No checkout URL generated');
      throw new Error('No checkout URL generated');
    }

    console.log('Redirecting to:', checkoutSession.url);
    return NextResponse.redirect(checkoutSession.url);
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode
    });
    
    let errorMessage = 'Payment system error. Please try again.';
    if (error.type === 'StripeConnectionError') {
      errorMessage = 'Connection to payment provider failed. Please check your internet connection and try again.';
    } else if (error.type === 'StripeAuthenticationError') {
      errorMessage = 'Payment system configuration error. Please contact support.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.redirect(new URL(`/pricing?error=${encodeURIComponent(errorMessage)}`, req.url));
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
