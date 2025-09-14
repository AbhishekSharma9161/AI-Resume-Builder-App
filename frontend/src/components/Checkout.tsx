import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, CreditCard, Shield, ArrowLeft } from 'lucide-react';

interface CheckoutProps {
  planId: string;
  planName: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  onBack: () => void;
  onSuccess: () => void;
}

export default function Checkout({
  planId,
  planName,
  price,
  billingCycle,
  features,
  onBack,
  onSuccess,
}: CheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Mock payment processing - in a real app, integrate with Stripe
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      onSuccess();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const totalPrice = billingCycle === 'yearly' ? price * 10 : price; // 2 months free for yearly
  const savings = billingCycle === 'yearly' ? price * 2 : 0;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Plans
        </Button>
        <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
        <p className="text-gray-600">You're upgrading to the {planName} plan</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{planName} Plan</h3>
                <p className="text-sm text-gray-600">
                  Billed {billingCycle}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${price.toFixed(2)}</p>
                <p className="text-sm text-gray-600">per month</p>
              </div>
            </div>

            {billingCycle === 'yearly' && (
              <>
                <Separator />
                <div className="flex justify-between items-center text-green-600">
                  <span>Yearly discount (2 months free)</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
              </>
            )}

            <Separator />
            
            <div className="flex justify-between items-center font-semibold">
              <span>Total {billingCycle === 'yearly' ? '(first year)' : '(monthly)'}</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="space-y-2 pt-4">
              <h4 className="font-medium">Included features:</h4>
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Shield className="w-4 h-4" />
                <span className="font-medium">Secure Payment</span>
              </div>
              <p className="text-sm text-blue-600">
                Your payment information is encrypted and secure. We use Stripe for payment processing.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">Demo Mode</p>
                <p className="text-sm">
                  This is a demonstration. In a real application, you would see Stripe's secure payment form here.
                </p>
              </div>

              <Button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    Complete Purchase - ${totalPrice.toFixed(2)}
                  </>
                )}
              </Button>

              <div className="text-xs text-gray-500 text-center space-y-1">
                <p>By completing this purchase, you agree to our Terms of Service.</p>
                <p>You can cancel your subscription at any time.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}