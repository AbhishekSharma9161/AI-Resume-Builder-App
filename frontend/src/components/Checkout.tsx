"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CreditCard, Check, AlertCircle } from "lucide-react";
import { paymentService, paymentPlans } from "@/lib/payment-service";
import { useToast } from "@/hooks/use-toast";

interface CheckoutProps {
  planId: string;
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
}

export default function Checkout({
  planId,
  isOpen,
  onClose,
  userId = "demo_user",
}: CheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const plan = paymentPlans.find((p) => p.id === planId);

  if (!plan || plan.price === 0) {
    return null;
  }

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      toast({
        title: "Starting your free trial...",
        description: "Setting up your premium account.",
      });

      // For demo purposes, simulate payment processing and redirect to success page
      setTimeout(() => {
        window.location.href = `/payment/success?session_id=cs_demo_${Date.now()}&plan=${planId}`;
      }, 2000);
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Unable to process payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Upgrade to {plan.name}
          </DialogTitle>
          <DialogDescription>
            Start your subscription to unlock premium features
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader className="text-center">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                ${plan.price}
                <span className="text-lg font-normal text-slate-600">
                  /{plan.interval}
                </span>
              </div>
              <Badge variant="secondary">7-day free trial</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">What's included:</h4>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">7-day free trial</p>
                  <p>
                    You won't be charged until{" "}
                    {new Date(
                      Date.now() + 7 * 24 * 60 * 60 * 1000,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Start Free Trial
                  </>
                )}
              </Button>

              <Button variant="outline" className="w-full" onClick={onClose}>
                Cancel
              </Button>
            </div>

            <div className="text-xs text-slate-500 text-center space-y-1">
              <p>Secure payment powered by Stripe</p>
              <p>Cancel anytime • No long-term commitment</p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
