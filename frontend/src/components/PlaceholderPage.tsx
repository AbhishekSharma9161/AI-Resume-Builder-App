import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, FileText, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  features?: string[];
}

export default function PlaceholderPage({
  title,
  description,
  features = [],
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">
                  {title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Construction className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Coming Soon!</CardTitle>
            <CardDescription className="text-lg">{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {features.length > 0 && (
              <div className="space-y-2">
                <p className="font-medium text-slate-900">What to expect:</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  {features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="space-y-2">
              <Button asChild>
                <Link href="/builder">Start Building Your Resume Now</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/templates">Browse Templates</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
