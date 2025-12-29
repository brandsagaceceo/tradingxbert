import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.redirect(new URL('/?signin=required', req.url));
    }

    // Redirect to Stripe Checkout
    const stripeUrl = "https://buy.stripe.com/test_00g4ivbY84ks6yseUU";
    return NextResponse.redirect(stripeUrl);
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  return GET(req);
}
