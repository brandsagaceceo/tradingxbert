import Stripe from 'stripe';

// Use node runtime for stripe webhook so we can access Buffer and raw body
export const runtime = 'nodejs';

function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable');
  }
  return new Stripe(key, { apiVersion: '2025-11-17.clover' });
}

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature') || '';

  let event: any;

  try {
    const stripe = getStripeClient();
    const buf = await req.arrayBuffer();
    const raw = Buffer.from(buf);
    event = stripe.webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error('Error verifying Stripe webhook signature:', err);
    return new Response(`Webhook Error: ${err?.message || String(err)}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.updated':
    case 'customer.subscription.created': {
      const subscription = event.data.object as Stripe.Subscription;
      // Update user subscription status in your database
      console.log(`Subscription updated: ${subscription.id}`);
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      // Handle subscription cancellation
      console.log(`Subscription canceled: ${subscription.id}`);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}