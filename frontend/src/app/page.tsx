import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Download,
  FileText,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">ResumeAI</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/templates"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Templates
            </Link>
            <Link
              href="/examples"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Examples
            </Link>
            <Link
              href="/pricing"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/account"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Account
            </Link>
            <Button asChild size="sm">
              <Link href="/builder">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 min-h-[calc(100vh-80px)] flex items-center text-center relative overflow-hidden bg-gradient-to-br from-cyan-100 via-blue-200 to-indigo-300">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/90 backdrop-blur-sm text-cyan-300 text-sm font-medium mb-6 shadow-lg">
            <Sparkles className="w-3 h-3 mr-2 text-cyan-400" />
            AI-Powered Resume Builder
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600">
              Build Your Perfect Resume with{" "}
            </span>
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              AI Magic
              {/* Static sparkle effects around the text */}
              <span className="absolute -top-2 -right-3 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
              <span className="absolute -bottom-2 -left-3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping delay-100"></span>
              <span className="absolute top-1/2 -right-4 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-200"></span>
              <span className="absolute -top-3 left-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-300"></span>
              <span className="absolute -bottom-3 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping delay-500"></span>
              <span className="absolute top-0 -left-2 w-1 h-1 bg-green-400 rounded-full animate-ping delay-700"></span>
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Create professional, ATS-optimized resumes in minutes with our
            AI-powered builder. Get personalized suggestions, smart formatting,
            and industry-specific content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/builder">
                Start Building Free <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base" asChild>
              <Link href="/examples">View Examples</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>50K+ users</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>100K+ downloads</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-200 py-16">
        <div className="px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose ResumeAI?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our AI-powered platform combines advanced technology with
              professional design to help you create resumes that get results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              {/* AI Brain Pattern Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-50"></div>
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                {/* Neural network pattern */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-blue-600"
                >
                  <defs>
                    <pattern
                      id="neural"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="2"
                        fill="currentColor"
                        opacity="0.3"
                      />
                      <line
                        x1="10"
                        y1="10"
                        x2="30"
                        y2="10"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        opacity="0.2"
                      />
                      <line
                        x1="10"
                        y1="10"
                        x2="10"
                        y2="30"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        opacity="0.2"
                      />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#neural)" />
                </svg>
              </div>
              <div className="absolute bottom-2 right-2 opacity-20">
                <div className="flex space-x-1">
                  <div className="w-2 h-6 bg-blue-400 rounded animate-pulse"></div>
                  <div className="w-2 h-4 bg-cyan-400 rounded animate-pulse delay-100"></div>
                  <div className="w-2 h-8 bg-blue-500 rounded animate-pulse delay-200"></div>
                  <div className="w-2 h-3 bg-cyan-500 rounded animate-pulse delay-300"></div>
                </div>
              </div>
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  AI-Powered Content
                </CardTitle>
                <CardDescription>
                  Get intelligent suggestions for job descriptions, skills, and
                  achievements tailored to your industry with advanced machine
                  learning.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              {/* ATS Scanner Pattern Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-50"></div>
              <div className="absolute top-4 right-4 w-20 h-20 opacity-10">
                {/* Document scanner pattern */}
                <div className="space-y-1">
                  <div className="h-1 bg-purple-600 rounded w-full animate-pulse"></div>
                  <div className="h-1 bg-indigo-600 rounded w-3/4 animate-pulse delay-100"></div>
                  <div className="h-1 bg-purple-600 rounded w-5/6 animate-pulse delay-200"></div>
                  <div className="h-1 bg-indigo-600 rounded w-2/3 animate-pulse delay-300"></div>
                  <div className="h-1 bg-purple-600 rounded w-4/5 animate-pulse delay-400"></div>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 opacity-20">
                <div className="w-8 h-8 border-2 border-purple-400 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
                </div>
              </div>
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="group-hover:text-purple-600 transition-colors">
                  ATS Optimization
                </CardTitle>
                <CardDescription>
                  Our AI ensures your resume passes Applicant Tracking Systems
                  with optimized formatting, keywords, and structure analysis.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              {/* Template Grid Pattern Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50"></div>
              <div className="absolute top-2 right-2 w-16 h-20 opacity-15">
                {/* Mini template previews */}
                <div className="grid grid-cols-2 gap-1 h-full">
                  <div className="bg-green-400 rounded-sm flex flex-col p-0.5 space-y-0.5">
                    <div className="h-0.5 bg-white rounded w-full"></div>
                    <div className="h-0.5 bg-white/80 rounded w-3/4"></div>
                    <div className="h-0.5 bg-white/60 rounded w-2/3"></div>
                  </div>
                  <div className="bg-emerald-400 rounded-sm flex flex-col p-0.5 space-y-0.5">
                    <div className="h-0.5 bg-white rounded w-full"></div>
                    <div className="h-0.5 bg-white/80 rounded w-4/5"></div>
                    <div className="h-0.5 bg-white/60 rounded w-3/4"></div>
                  </div>
                  <div className="bg-teal-400 rounded-sm flex flex-col p-0.5 space-y-0.5">
                    <div className="h-0.5 bg-white rounded w-full"></div>
                    <div className="h-0.5 bg-white/80 rounded w-2/3"></div>
                    <div className="h-0.5 bg-white/60 rounded w-3/4"></div>
                  </div>
                  <div className="bg-green-500 rounded-sm flex flex-col p-0.5 space-y-0.5">
                    <div className="h-0.5 bg-white rounded w-full"></div>
                    <div className="h-0.5 bg-white/80 rounded w-3/4"></div>
                    <div className="h-0.5 bg-white/60 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="group-hover:text-green-600 transition-colors">
                  Professional Templates
                </CardTitle>
                <CardDescription>
                  Choose from dozens of professionally designed templates that
                  work across all industries and career levels, all
                  ATS-optimized.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Create your perfect resume in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Add Your Information
              </h3>
              <p className="text-slate-600">
                Simply input your basic details, work experience, and skills.
                Our AI will help optimize everything.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Choose a Template
              </h3>
              <p className="text-slate-600">
                Select from our collection of professional templates designed
                for different industries and roles.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Download & Apply
              </h3>
              <p className="text-slate-600">
                Get your polished resume in multiple formats and start applying
                to your dream jobs immediately.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Button asChild size="lg" className="text-base">
              <Link href="/builder">
                Get Started Now <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Dream Resume?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of job seekers who've landed their dream jobs with
            ResumeAI. Start building your professional resume today.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-base font-semibold"
          >
            <Link href="/builder">
              Get Started for Free <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">ResumeAI</span>
              </div>
              <p className="text-slate-400">
                Build professional resumes with the power of AI
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link
                    href="/builder"
                    className="hover:text-white transition-colors"
                  >
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link
                    href="/templates"
                    className="hover:text-white transition-colors"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/examples"
                    className="hover:text-white transition-colors"
                  >
                    Examples
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link
                    href="/tips"
                    className="hover:text-white transition-colors"
                  >
                    Resume Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cover-letters"
                    className="hover:text-white transition-colors"
                  >
                    Cover Letters
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career-advice"
                    className="hover:text-white transition-colors"
                  >
                    Career Advice
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 ResumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
