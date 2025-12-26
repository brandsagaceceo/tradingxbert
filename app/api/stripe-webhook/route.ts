import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

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
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Get subscription details
        if (session.subscription && session.customer) {
          const stripe = getStripeClient();
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          ) as any;

          // Find user by email
          const customerEmail = session.customer_email || session.customer_details?.email;
          if (customerEmail) {
            const user = await prisma.user.findUnique({
              where: { email: customerEmail },
            });

            if (user) {
              // Create or update subscription
              await prisma.subscription.upsert({
                where: { userId: user.id },
                create: {
                  userId: user.id,
                  stripeCustomerId: session.customer as string,
                  stripeSubscriptionId: subscription.id,
                  stripePriceId: subscription.items?.data?.[0]?.price?.id || null,
                  stripeCurrentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
                  status: subscription.status,
                  plan: 'pro',
                },
                update: {
                  stripeCustomerId: session.customer as string,
                  stripeSubscriptionId: subscription.id,
                  stripePriceId: subscription.items?.data?.[0]?.price?.id || null,
                  stripeCurrentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
                  status: subscription.status,
                  plan: 'pro',
                },
              });
              console.log(`✅ Subscription created/updated for user: ${user.email}`);
            }
          }
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const subscription = event.data.object as any;
        
        // Find user by Stripe customer ID
        const existingSub = await prisma.subscription.findUnique({
          where: { stripeCustomerId: subscription.customer as string },
        });

        if (existingSub) {
          await prisma.subscription.update({
            where: { id: existingSub.id },
            data: {
              stripePriceId: subscription.items?.data?.[0]?.price?.id || null,
              stripeCurrentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
              status: subscription.status,
              plan: subscription.status === 'active' ? 'pro' : existingSub.plan,
            },
          });
          console.log(`✅ Subscription updated: ${subscription.id}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        
        // Find and update subscription to canceled
        const existingSub = await prisma.subscription.findUnique({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (existingSub) {
          await prisma.subscription.update({
            where: { id: existingSub.id },
            data: {
              status: 'canceled',
              plan: 'free',
            },
          });
          console.log(`✅ Subscription canceled: ${subscription.id}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: 'Webhook processing failed' }), { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}