import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Subscription {
  id: string;
  planId: string;
  planName: string;
  status: 'active' | 'cancelled' | 'expired';
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

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
  const { toast } = useToast();

  useEffect(() => {
    // Mock subscription data - in a real app, fetch from API
    const mockSubscription: Subscription = {
      id: 'sub_123',
      planId: 'professional',
      planName: 'Professional',
      status: 'active',
      currentPeriodEnd: '2024-12-15',
      cancelAtPeriodEnd: false,
    };

    setTimeout(() => {
      setSubscription(mockSubscription);
      setIsLoading(false);
    }, 1000);
  }, [userId]);

  const handleCancelSubscription = async () => {
    try {
      // Mock cancellation - in a real app, call API
      setSubscription(prev => prev ? {
        ...prev,
        cancelAtPeriodEnd: true
      } : null);
      
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription will end at the current period.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReactivateSubscription = async () => {
    try {
      // Mock reactivation - in a real app, call API
      setSubscription(prev => prev ? {
        ...prev,
        cancelAtPeriodEnd: false
      } : null);
      
      toast({
        title: "Subscription Reactivated",
        description: "Your subscription has been reactivated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reactivate subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Active Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            You don't have an active subscription. Upgrade to unlock premium features.
          </p>
          <Button onClick={() => onUpgrade?.('professional')}>
            Upgrade to Professional
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          Current Subscription
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{subscription.planName} Plan</h3>
            <p className="text-sm text-gray-600">
              {subscription.status === 'active' ? 'Active' : 'Inactive'}
            </p>
          </div>
          <Badge 
            variant={subscription.status === 'active' ? 'default' : 'secondary'}
            className={subscription.status === 'active' ? 'bg-green-500' : ''}
          >
            {subscription.status === 'active' ? (
              <Check className="w-3 h-3 mr-1" />
            ) : (
              <X className="w-3 h-3 mr-1" />
            )}
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </Badge>
        </div>

        <div className="text-sm text-gray-600">
          <p>
            {subscription.cancelAtPeriodEnd 
              ? `Expires on ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
              : `Renews on ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
            }
          </p>
        </div>

        <div className="flex gap-2">
          {subscription.cancelAtPeriodEnd ? (
            <Button 
              variant="outline" 
              onClick={handleReactivateSubscription}
              className="flex-1"
            >
              Reactivate
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={handleCancelSubscription}
              className="flex-1"
            >
              Cancel Subscription
            </Button>
          )}
          
          <Button 
            onClick={() => onUpgrade?.('executive')}
            className="flex-1"
          >
            Upgrade Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}