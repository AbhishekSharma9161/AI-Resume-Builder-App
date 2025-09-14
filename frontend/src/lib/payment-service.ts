// Payment service utilities for Stripe integration

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  stripePriceId?: string;
}

export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      '1 resume download per month',
      'Basic templates',
      'Standard formatting',
      'Email support'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 9.99,
    interval: 'month',
    features: [
      'Unlimited resume downloads',
      'Premium templates',
      'AI-powered content suggestions',
      'ATS optimization',
      'Cover letter builder',
      'Priority support'
    ],
    stripePriceId: 'price_professional_monthly'
  },
  {
    id: 'executive',
    name: 'Executive',
    price: 19.99,
    interval: 'month',
    features: [
      'Everything in Professional',
      'Executive templates',
      'Personal branding consultation',
      'LinkedIn profile optimization',
      'Interview preparation guide',
      'Dedicated success manager'
    ],
    stripePriceId: 'price_executive_monthly'
  }
];

export interface CheckoutSession {
  sessionId: string;
  url: string;
}

export class PaymentService {
  private static instance: PaymentService;
  
  static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }
  
  async createCheckoutSession(planId: string, billingCycle: 'monthly' | 'yearly'): Promise<CheckoutSession> {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          billingCycle,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Payment service error:', error);
      throw error;
    }
  }
  
  async redirectToCheckout(sessionId: string): Promise<void> {
    // In a real implementation, this would use Stripe.js
    // For demo purposes, we'll redirect to a success page
    window.location.href = `/checkout/success?session_id=${sessionId}`;
  }
  
  getPlan(planId: string): PaymentPlan | undefined {
    return PAYMENT_PLANS.find(plan => plan.id === planId);
  }
  
  getAllPlans(): PaymentPlan[] {
    return PAYMENT_PLANS;
  }
}

export const paymentService = PaymentService.getInstance();