import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Check, Crown, Zap } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "1 resume download per month",
        "Basic templates",
        "Standard formatting",
        "Email support",
      ],
      popular: false,
    },
    {
      id: "professional",
      name: "Professional",
      price: "$9.99",
      period: "per month",
      description: "For active job seekers",
      features: [
        "Unlimited resume downloads",
        "Premium templates",
        "AI-powered content suggestions",
        "ATS optimization",
        "Cover letter builder",
        "Priority support",
      ],
      popular: true,
    },
    {
      id: "executive",
      name: "Executive",
      price: "$19.99",
      period: "per month",
      description: "For senior professionals",
      features: [
        "Everything in Professional",
        "Executive templates",
        "Personal branding consultation",
        "LinkedIn profile optimization",
        "Interview preparation guide",
        "Dedicated success manager",
      ],
      popular: false,
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Select the perfect plan for your career goals. All plans include
              our core resume building features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative ${plan.popular ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="mb-4">
                    {plan.id === "free" && <Zap className="w-8 h-8 mx-auto text-slate-500" />}
                    {plan.id === "professional" && <Crown className="w-8 h-8 mx-auto text-blue-500" />}
                    {plan.id === "executive" && <Crown className="w-8 h-8 mx-auto text-purple-500" />}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-slate-600 ml-1">/{plan.period}</span>
                  </div>
                  <p className="text-slate-600 mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href={plan.id === "free" ? "/builder" : "/checkout"}>
                      {plan.id === "free" ? "Get Started" : `Start ${plan.name} Plan`}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
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
