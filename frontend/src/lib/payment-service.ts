// Payment Service for handling Stripe payments and subscriptions
// In production, replace with actual Stripe keys

interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  stripePriceId?: string;
}

export const paymentPlans: PaymentPlan[] = [
  {
    id: "free",
    name: "Starter",
    price: 0,
    interval: "month",
    features: [
      "3 resume templates",
      "Basic AI suggestions",
      "PDF download",
      "ATS optimization",
      "1 resume project",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 9.99,
    interval: "month",
    features: [
      "50+ premium templates",
      "Advanced AI writing assistant",
      "Multiple formats (PDF, Word, HTML)",
      "Cover letter generator",
      "Unlimited resume projects",
      "Priority email support",
      "LinkedIn profile optimization",
    ],
    stripePriceId: "price_professional_monthly",
  },
  {
    id: "executive",
    name: "Executive",
    price: 19.99,
    interval: "month",
    features: [
      "Everything in Professional",
      "Executive resume templates",
      "Personal branding consultation",
      "1-on-1 career coaching session",
      "Interview preparation guide",
      "Salary negotiation templates",
      "Priority phone support",
    ],
    stripePriceId: "price_executive_monthly",
  },
];

export interface PaymentSession {
  sessionId: string;
  url: string;
  planId: string;
}

export interface Subscription {
  id: string;
  planId: string;
  status: "active" | "canceled" | "past_due" | "trialing";
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

class PaymentService {
  private static instance: PaymentService;

  static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  // Create checkout session (demo implementation)
  async createCheckoutSession(
    planId: string,
    userId: string,
  ): Promise<PaymentSession> {
    const plan = paymentPlans.find((p) => p.id === planId);
    if (!plan || plan.price === 0) {
      throw new Error("Invalid plan selected");
    }

    // Demo implementation - simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockSession: PaymentSession = {
      sessionId: `cs_demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      url: `/payment/success?session_id=cs_demo_${Date.now()}&plan=${planId}`,
      planId,
    };

    return mockSession;
  }

  // Get user subscription status
  async getSubscription(userId: string): Promise<Subscription | null> {
    try {
      const response = await fetch(`/api/users/${userId}/subscription`);

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error("Failed to fetch subscription");
      }

      const data = await response.json();
      return {
        id: data.id,
        planId: data.planId,
        status: data.status,
        currentPeriodEnd: new Date(data.currentPeriodEnd),
        cancelAtPeriodEnd: data.cancelAtPeriodEnd,
      };
    } catch (error) {
      console.error("Failed to get subscription:", error);
      // Return free plan as fallback
      return {
        id: "free_subscription",
        planId: "free",
        status: "active",
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        cancelAtPeriodEnd: false,
      };
    }
  }

  // Cancel subscription
  async cancelSubscription(subscriptionId: string): Promise<void> {
    try {
      const response = await fetch(
        `/api/subscriptions/${subscriptionId}/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
      throw error;
    }
  }

  // Resume subscription
  async resumeSubscription(subscriptionId: string): Promise<void> {
    try {
      const response = await fetch(
        `/api/subscriptions/${subscriptionId}/resume`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to resume subscription");
      }
    } catch (error) {
      console.error("Failed to resume subscription:", error);
      throw error;
    }
  }

  // Get plan by ID
  getPlan(planId: string): PaymentPlan | undefined {
    return paymentPlans.find((plan) => plan.id === planId);
  }

  // Check if user has access to feature based on plan
  hasFeatureAccess(userPlanId: string, feature: string): boolean {
    const plan = this.getPlan(userPlanId);
    if (!plan) return false;

    // Free plan restrictions
    if (userPlanId === "free") {
      const restrictedFeatures = [
        "premium_templates",
        "advanced_ai",
        "multiple_formats",
        "cover_letter_generator",
        "unlimited_projects",
        "priority_support",
      ];
      return !restrictedFeatures.includes(feature);
    }

    // Professional and Executive have full access
    return true;
  }
}

export const paymentService = PaymentService.getInstance();
