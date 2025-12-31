import { RequestHandler } from "express";
import { z } from "zod";

// Payment plan configuration
export const paymentPlans = [
  {
    id: "free",
    name: "Starter",
    price: 0,
    interval: "month",
    stripePriceId: null,
  },
  {
    id: "professional",
    name: "Professional",
    price: 9.99,
    interval: "month",
    stripePriceId: "price_professional_monthly",
  },
  {
    id: "executive",
    name: "Executive",
    price: 19.99,
    interval: "month",
    stripePriceId: "price_executive_monthly",
  },
];

const CreateCheckoutSessionSchema = z.object({
  planId: z.string(),
  userId: z.string(),
  successUrl: z.string().optional(),
  cancelUrl: z.string().optional(),
});

// Create Stripe checkout session
export const createCheckoutSession: RequestHandler = async (req, res) => {
  try {
    const { planId, userId, successUrl, cancelUrl } =
      CreateCheckoutSessionSchema.parse(req.body);

    const plan = paymentPlans.find((p) => p.id === planId);
    if (!plan || plan.price === 0) {
      return res.status(400).json({ error: "Invalid plan selected" });
    }

    // In production, create actual Stripe session:
    /*
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: plan.stripePriceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: successUrl || `${req.headers.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.origin}/pricing`,
      customer_email: req.body.email, // Pass from frontend
      metadata: {
        userId,
        planId,
      },
      subscription_data: {
        trial_period_days: planId === 'professional' ? 7 : 14,
      },
    });

    res.json({ sessionId: session.id, url: session.url });
    */

    // Mock response for demo
    const mockSession = {
      sessionId: `cs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      url: `/payment/success?session_id=cs_${Date.now()}&plan=${planId}`,
    };

    res.json(mockSession);
  } catch (error) {
    console.error("Checkout session creation failed:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

// Handle Stripe webhooks
export const handleWebhook: RequestHandler = async (req, res) => {
  try {
    // In production, verify Stripe webhook signature:
    /*
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        await handleSubscriptionCreated(session);
        break;
      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        await handlePaymentSucceeded(invoice);
        break;
      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        await handleSubscriptionCancelled(subscription);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    */

    // Mock webhook handling for demo
    console.log("Webhook received:", req.body);
    res.json({ received: true });
  } catch (error) {
    console.error("Webhook handling failed:", error);
    res.status(500).json({ error: "Webhook handling failed" });
  }
};

// Get user subscription
export const getUserSubscription: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    // In production, fetch from database
    /*
    const subscription = await db.subscription.findFirst({
      where: { userId },
      include: { plan: true }
    });
    */

    // Mock subscription for demo
    const mockSubscription = {
      id: "sub_" + Math.random().toString(36).substr(2, 9),
      planId: "free",
      status: "active",
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false,
      trialEnd: null,
    };

    res.json(mockSubscription);
  } catch (error) {
    console.error("Failed to get subscription:", error);
    res.status(500).json({ error: "Failed to get subscription" });
  }
};

// Cancel subscription
export const cancelSubscription: RequestHandler = async (req, res) => {
  try {
    const { subscriptionId } = req.params;

    // In production, cancel Stripe subscription:
    /*
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true
    });
    
    // Update in database
    await db.subscription.update({
      where: { stripeSubscriptionId: subscriptionId },
      data: { cancelAtPeriodEnd: true }
    });
    */

    // Mock cancellation for demo
    console.log("Subscription cancelled:", subscriptionId);
    res.json({ success: true, cancelAtPeriodEnd: true });
  } catch (error) {
    console.error("Failed to cancel subscription:", error);
    res.status(500).json({ error: "Failed to cancel subscription" });
  }
};

// Resume subscription
export const resumeSubscription: RequestHandler = async (req, res) => {
  try {
    const { subscriptionId } = req.params;

    // In production, resume Stripe subscription:
    /*
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false
    });
    
    // Update in database
    await db.subscription.update({
      where: { stripeSubscriptionId: subscriptionId },
      data: { cancelAtPeriodEnd: false }
    });
    */

    // Mock resume for demo
    console.log("Subscription resumed:", subscriptionId);
    res.json({ success: true, cancelAtPeriodEnd: false });
  } catch (error) {
    console.error("Failed to resume subscription:", error);
    res.status(500).json({ error: "Failed to resume subscription" });
  }
};

// Helper functions for webhook handling
async function handleSubscriptionCreated(session: any) {
  // Create subscription record in database
  console.log("New subscription created:", session);
}

async function handlePaymentSucceeded(invoice: any) {
  // Update payment history in database
  console.log("Payment succeeded:", invoice);
}

async function handleSubscriptionCancelled(subscription: any) {
  // Update subscription status in database
  console.log("Subscription cancelled:", subscription);
}
