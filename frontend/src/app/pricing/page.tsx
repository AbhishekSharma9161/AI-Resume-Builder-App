"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { ArrowLeft, Check, Crown, Zap, Star, Users, Shield, Headphones, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);


  const handlePayment = async (planId: string) => {
    // This would integrate with Stripe
    console.log(`Processing payment for plan: ${planId}`);
    // Redirect to Stripe Checkout or handle payment
    window.location.href = `/api/checkout?plan=${planId}&billing=${isYearly ? 'yearly' : 'monthly'}`;
  };

  const plans = [
    {
      id: "free",
      name: "Free",
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "Perfect for getting started",
      features: [
        "1 resume download per month",
        "3 basic templates",
        "Standard formatting",
        "Email support",
        "Basic ATS optimization",
      ],
      popular: false,
      icon: Zap,
      color: "text-slate-500",
      stripePriceId: null,
    },
    {
      id: "professional",
      name: "Professional",
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      description: "For active job seekers",
      features: [
        "Unlimited resume downloads",
        "50+ premium templates",
        "AI-powered content suggestions",
        "Advanced ATS optimization",
        "Cover letter builder",
        "Multiple file formats (PDF, Word, TXT)",
        "Priority email support",
        "Resume analytics",
      ],
      popular: true,
      icon: Crown,
      color: "text-blue-500",
      stripePriceId: {
        monthly: "price_professional_monthly",
        yearly: "price_professional_yearly"
      },
    },
    {
      id: "executive",
      name: "Executive",
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      description: "For senior professionals",
      features: [
        "Everything in Professional",
        "Executive & C-level templates",
        "Personal branding consultation",
        "LinkedIn profile optimization",
        "Interview preparation guide",
        "Salary negotiation tips",
        "Dedicated success manager",
        "1-on-1 career coaching session",
        "Priority phone support",
      ],
      popular: false,
      icon: Sparkles,
      color: "text-purple-500",
      stripePriceId: {
        monthly: "price_executive_monthly",
        yearly: "price_executive_yearly"
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-slate-900">Pricing Plans</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-8">
              Select the perfect plan for your career goals. All plans include
              our core resume building features with a 30-day money-back guarantee.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm ${!isYearly ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-blue-600"
              />
              <span className={`text-sm ${isYearly ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                Yearly
              </span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Save 17%
              </Badge>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">50,000+</div>
              <p className="text-slate-600 text-sm">Happy Users</p>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">4.9/5</div>
              <p className="text-slate-600 text-sm">User Rating</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">95%</div>
              <p className="text-slate-600 text-sm">Success Rate</p>
            </div>
            <div className="text-center">
              <Headphones className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">24/7</div>
              <p className="text-slate-600 text-sm">Support</p>
            </div>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
              const yearlyDiscount = plan.monthlyPrice > 0 ? Math.round((1 - (plan.yearlyPrice / (plan.monthlyPrice * 12))) * 100) : 0;
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Card 
                    className={`relative h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                      plan.popular ? 'ring-2 ring-blue-500 shadow-xl scale-105' : 'hover:shadow-lg'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-sm font-medium">
                          <Star className="w-3 h-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <div className="mb-4">
                        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${
                          plan.id === 'free' ? 'from-slate-400 to-slate-500' :
                          plan.id === 'professional' ? 'from-blue-500 to-blue-600' :
                          'from-purple-500 to-purple-600'
                        } flex items-center justify-center`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <div className="mb-4">
                        <div className="flex items-baseline justify-center">
                          <span className="text-4xl font-bold text-slate-900">
                            ${currentPrice === 0 ? '0' : currentPrice.toFixed(2)}
                          </span>
                          {currentPrice > 0 && (
                            <span className="text-slate-600 ml-2">
                              /{isYearly ? 'year' : 'month'}
                            </span>
                          )}
                        </div>
                        {isYearly && plan.monthlyPrice > 0 && (
                          <div className="text-sm text-green-600 mt-1">
                            Save {yearlyDiscount}% vs monthly
                          </div>
                        )}
                      </div>
                      <p className="text-slate-600">{plan.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 flex-1 flex flex-col">
                      <ul className="space-y-3 flex-1">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="pt-4">
                        {plan.id === "free" ? (
                          <Button className="w-full" variant="outline" asChild>
                            <Link href="/builder">
                              Get Started Free
                            </Link>
                          </Button>
                        ) : (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}`}
                                variant={plan.popular ? "default" : "outline"}
                              >
                                Start {plan.name} Plan
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Complete Your Purchase</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="text-center p-6 bg-slate-50 rounded-lg">
                                  <Icon className={`w-12 h-12 mx-auto mb-3 ${plan.color}`} />
                                  <h3 className="text-lg font-semibold">{plan.name} Plan</h3>
                                  <div className="text-2xl font-bold text-slate-900 mt-2">
                                    ${currentPrice.toFixed(2)}/{isYearly ? 'year' : 'month'}
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <Button 
                                    className="w-full"
                                    onClick={() => handlePayment(plan.id)}
                                  >
                                    Continue to Payment
                                  </Button>
                                  <div className="text-xs text-slate-500 text-center space-y-1">
                                    <p>✅ Secure payment powered by Stripe</p>
                                    <p>✅ 30-day money-back guarantee</p>
                                    <p>✅ Cancel anytime, no questions asked</p>
                                    <p>✅ All major credit cards accepted</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Payment Methods */}
          <motion.div 
            className="text-center mt-12 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Secure Payment Methods</h3>
            <div className="flex justify-center items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                <span>Visa</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                <span>Mastercard</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">AMEX</div>
                <span>American Express</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-8 h-5 bg-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold">PP</div>
                <span>PayPal</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              All payments are processed securely through Stripe with 256-bit SSL encryption
            </p>
          </motion.div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">
              Need a custom solution for your organization?
            </p>
            <Button variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
