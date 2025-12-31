"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import {
  paymentService,
  paymentPlans,
  Subscription,
} from "@/lib/payment-service";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionCardProps {
  userId: string;
  onUpgrade?: (planId: string) => void;
}

export default function SubscriptionCard({
  userId,
  onUpgrade,
}: SubscriptionCardProps) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSubscription();
  }, [userId]);

  const loadSubscription = async () => {
    try {
      const sub = await paymentService.getSubscription(userId);
      setSubscription(sub);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to load subscription details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription || subscription.planId === "free") return;

    setIsUpdating(true);
    try {
      await paymentService.cancelSubscription(subscription.id);
      setSubscription({
        ...subscription,
        cancelAtPeriodEnd: true,
      });

      toast({
        title: "Subscription Cancelled",
        description: "Your subscription will end at the current period.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to cancel subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleResumeSubscription = async () => {
    if (!subscription) return;

    setIsUpdating(true);
    try {
      await paymentService.resumeSubscription(subscription.id);
      setSubscription({
        ...subscription,
        cancelAtPeriodEnd: false,
      });

      toast({
        title: "Subscription Resumed",
        description: "Your subscription has been reactivated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to resume subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-slate-600">No subscription found</p>
        </CardContent>
      </Card>
    );
  }

  const currentPlan = paymentPlans.find(
    (plan) => plan.id === subscription.planId,
  );
  const isFreePlan = subscription.planId === "free";
  const isPremiumPlan = subscription.planId !== "free";

  return (
    <Card className={isPremiumPlan ? "border-blue-200 bg-blue-50/50" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {isPremiumPlan && <Crown className="w-5 h-5 text-blue-600" />}
            Current Plan: {currentPlan?.name}
          </CardTitle>
          <Badge
            variant={subscription.status === "active" ? "default" : "secondary"}
            className={subscription.status === "active" ? "bg-green-600" : ""}
          >
            {subscription.status === "active" ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </>
            ) : (
              subscription.status
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Plan Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-600">Price</p>
            <p className="font-semibold">
              {isFreePlan
                ? "Free"
                : `$${currentPlan?.price}/${currentPlan?.interval}`}
            </p>
          </div>
          <div>
            <p className="text-slate-600">Next billing</p>
            <p className="font-semibold">
              {isFreePlan
                ? "N/A"
                : subscription.currentPeriodEnd.toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Cancellation Notice */}
        {subscription.cancelAtPeriodEnd && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
              <div className="text-sm text-orange-800">
                <p className="font-medium">Subscription Ending</p>
                <p>
                  Your subscription will end on{" "}
                  {subscription.currentPeriodEnd.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Current Plan Features */}
        <div>
          <p className="text-sm font-medium text-slate-900 mb-2">
            Plan Features:
          </p>
          <ul className="text-sm text-slate-600 space-y-1">
            {currentPlan?.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
            {currentPlan && currentPlan.features.length > 3 && (
              <li className="text-slate-500 text-xs">
                +{currentPlan.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {isFreePlan ? (
            <Button
              className="w-full"
              onClick={() => onUpgrade?.("professional")}
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Professional
            </Button>
          ) : (
            <div className="space-y-2">
              {subscription.cancelAtPeriodEnd ? (
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleResumeSubscription}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Resume Subscription
                </Button>
              ) : (
                <>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => onUpgrade?.("executive")}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Executive
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={handleCancelSubscription}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CreditCard className="w-4 h-4 mr-2" />
                    )}
                    Cancel Subscription
                  </Button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="text-xs text-slate-500 text-center">
          <CreditCard className="w-3 h-3 inline mr-1" />
          Secure payments powered by Stripe
        </div>
      </CardContent>
    </Card>
  );
}
