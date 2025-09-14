"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle, ArrowRight, Download, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  const billing = searchParams.get('billing');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="text-center shadow-2xl border-0">
          <CardHeader className="pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            <CardTitle className="text-3xl text-slate-900 mb-4">
              Welcome to ResumeAI {plan && plan.charAt(0).toUpperCase() + plan.slice(1)}!
            </CardTitle>
            <p className="text-slate-600 text-lg">
              Your subscription has been activated successfully. You now have access to all premium features.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Download className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="font-medium">Create Your Resume</p>
                  <p className="text-slate-600">Start building with premium templates</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="font-medium">AI Optimization</p>
                  <p className="text-slate-600">Get AI-powered suggestions</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-medium">Download & Apply</p>
                  <p className="text-slate-600">Export in multiple formats</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button size="lg" className="w-full" asChild>
                <Link href="/builder">
                  Start Building Your Resume
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/account">
                    View Account
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/templates">
                    Browse Templates
                  </Link>
                </Button>
              </div>
            </div>

            <div className="text-sm text-slate-500 pt-4 border-t">
              <p>
                Questions? Contact our support team at{" "}
                <a href="mailto:support@resumeai.com" className="text-blue-600 hover:underline">
                  support@resumeai.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}