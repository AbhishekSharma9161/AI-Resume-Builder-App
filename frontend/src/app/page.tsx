"use client";

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
  X,
  User,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    let animationInterval: NodeJS.Timeout | null = null;
    let isAnimating = false;

    function startStepAnimation() {
      if (isAnimating) return;
      isAnimating = true;

      const icons = document.querySelectorAll('.step-icon');

      function animateSequence() {
        icons.forEach((icon, index) => {
          setTimeout(() => {
            const element = icon as HTMLElement;
            element.style.opacity = '0';
            element.style.transform = 'scale(0.3) translateY(20px)';

            setTimeout(() => {
              element.style.transition = 'all 0.6s ease-out';
              element.style.opacity = '1';
              element.style.transform = 'scale(1.1) translateY(-5px)';

              setTimeout(() => {
                element.style.transform = 'scale(1) translateY(0)';
              }, 300);
            }, 50);
          }, index * 300);
        });
      }

      // Start immediately
      animateSequence();

      // Repeat every 3 seconds
      animationInterval = setInterval(animateSequence, 3000);
    }

    function stopStepAnimation() {
      if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
      }
      isAnimating = false;
    }

    // Intersection Observer for scroll detection
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startStepAnimation();
        } else {
          stopStepAnimation();
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    });

    const section = document.getElementById('how-it-works');
    if (section) {
      observer.observe(section);
    }

    // Cleanup function
    return () => {
      observer.disconnect();
      stopStepAnimation();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="px-6 py-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">ResumeAI</span>
          </div>
          
          {/* Desktop Navigation */}
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
            
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
            ) : user ? (
              // Logged in user
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-slate-600">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <Button asChild size="sm">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => signOut()}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              // Not logged in
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Sign In
                </Link>
                <Button asChild size="sm">
                  <Link href="/login">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {!loading && user ? (
              <Button asChild size="sm" className="text-xs px-3">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="text-xs px-3">
                <Link href="/login">Get Started</Link>
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 md:hidden">
            <div className="px-6 py-4 space-y-4">
              <Link
                href="/templates"
                className="block text-slate-600 hover:text-slate-900 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Templates
              </Link>
              <Link
                href="/examples"
                className="block text-slate-600 hover:text-slate-900 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Examples
              </Link>
              <Link
                href="/pricing"
                className="block text-slate-600 hover:text-slate-900 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              
              {user ? (
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-2 text-slate-600 mb-3">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block text-slate-600 hover:text-slate-900 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      setIsMobileMenuOpen(false)
                    }}
                    className="block text-slate-600 hover:text-slate-900 transition-colors py-2 w-full text-left"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block text-slate-600 hover:text-slate-900 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 min-h-[calc(100vh-80px)] flex items-center text-center relative overflow-hidden bg-gradient-to-br from-cyan-100 via-blue-200 to-indigo-300">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/90 backdrop-blur-sm text-cyan-300 text-sm font-medium mb-6 shadow-lg">
                <Sparkles className="w-3 h-3 mr-2 text-cyan-400" />
                AI-Powered Resume Builder
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600">
                  Build Your Perfect Resume with{" "}
                </span>
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 pb-2">
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
              <p className="text-xl text-slate-600 mb-8 max-w-2xl">
                Create professional, ATS-optimized resumes in minutes with our
                AI-powered builder. Get personalized suggestions, smart formatting,
                and industry-specific content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-base">
                  <Link href="/builder">
                    Start Building Free <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-base" asChild>
                  <Link href="/examples">View Examples</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-slate-500">
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

            {/* Right Content - Resume Preview */}
            <div className="relative mt-8 lg:mt-0">
              <div className="relative transform rotate-1 lg:rotate-3 hover:rotate-0 transition-transform duration-500">
                {/* Resume Preview Card */}
                <div className="bg-white rounded-lg shadow-2xl p-4 lg:p-8 max-w-sm lg:max-w-md mx-auto transform hover:scale-105 transition-all duration-300">
                  {/* Resume Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">EMMA WILSON</h3>
                    <p className="text-slate-600 text-sm">Product Manager</p>
                    <div className="flex justify-center space-x-4 text-xs text-slate-500 mt-2">
                      <span>emma@email.com</span>
                      <span>•</span>
                      <span>(555) 123-4567</span>
                    </div>
                  </div>

                  {/* Resume Sections */}
                  <div className="space-y-4">
                    {/* Profile Section */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-2 border-b border-slate-200 pb-1">PROFILE</h4>
                      <div className="space-y-1">
                        <div className="h-2 bg-slate-200 rounded w-full"></div>
                        <div className="h-2 bg-slate-200 rounded w-4/5"></div>
                        <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                      </div>
                    </div>

                    {/* Experience Section */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-2 border-b border-slate-200 pb-1">WORK EXPERIENCE</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h5 className="text-xs font-medium text-slate-800">Senior Product Manager</h5>
                            <span className="text-xs text-slate-500">2021-2024</span>
                          </div>
                          <p className="text-xs text-slate-600 mb-1">TechCorp Inc.</p>
                          <div className="space-y-1">
                            <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-5/6"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h5 className="text-xs font-medium text-slate-800">Product Manager</h5>
                            <span className="text-xs text-slate-500">2019-2021</span>
                          </div>
                          <p className="text-xs text-slate-600 mb-1">StartupXYZ</p>
                          <div className="space-y-1">
                            <div className="h-1.5 bg-slate-200 rounded w-4/5"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-3/4"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skills Section */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-2 border-b border-slate-200 pb-1">SKILLS</h4>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Product Strategy</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Analytics</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Leadership</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg animate-bounce">
                  ATS Optimized
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg animate-pulse">
                  AI Enhanced
                </div>
              </div>
            </div>
          </div>

          {/* Company Logos in Hero Section */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="text-center">
              <p className="text-slate-600 text-sm font-medium mb-6">
                Our customers have been hired by <sup className="text-blue-600">*</sup>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70 hover:opacity-100 transition-opacity duration-300">
                {/* HDFC Bank */}
                <div className="flex items-center justify-center h-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <svg width="100" height="24" viewBox="0 0 100 24" className="fill-slate-700">
                    <rect x="0" y="6" width="14" height="12" rx="1" fill="currentColor" />
                    <rect x="2" y="8" width="10" height="8" rx="0.5" fill="white" />
                    <rect x="4" y="10" width="6" height="4" fill="currentColor" />
                    <text x="18" y="16" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif" fill="currentColor">HDFC BANK</text>
                  </svg>
                </div>

                {/* Tech Mahindra */}
                <div className="flex items-center justify-center h-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <svg width="110" height="24" viewBox="0 0 110 24" className="fill-slate-700">
                    <text x="0" y="12" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif" fill="currentColor">TECH</text>
                    <text x="0" y="22" fontSize="12" fontWeight="300" fontFamily="Arial, sans-serif" fill="currentColor">mahindra</text>
                  </svg>
                </div>

                {/* Genpact */}
                <div className="flex items-center justify-center h-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <svg width="90" height="24" viewBox="0 0 90 24" className="fill-slate-700">
                    <circle cx="8" cy="12" r="7" fill="currentColor" />
                    <circle cx="8" cy="12" r="4" fill="white" />
                    <text x="20" y="16" fontSize="12" fontWeight="normal" fontFamily="Arial, sans-serif" fill="currentColor">genpact</text>
                  </svg>
                </div>

                {/* Accenture */}
                <div className="flex items-center justify-center h-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <svg width="100" height="24" viewBox="0 0 100 24" className="fill-slate-700">
                    <text x="0" y="16" fontSize="12" fontWeight="normal" fontFamily="Arial, sans-serif" fill="currentColor">accenture</text>
                    <polygon points="78,8 85,12 78,16" fill="currentColor" />
                  </svg>
                </div>

                {/* Deloitte */}
                <div className="flex items-center justify-center h-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <svg width="80" height="24" viewBox="0 0 80 24" className="fill-slate-700">
                    <text x="0" y="16" fontSize="12" fontWeight="normal" fontFamily="Arial, sans-serif" fill="currentColor">Deloitte</text>
                    <circle cx="68" cy="12" r="2.5" fill="#86BC25" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                <sup>*</sup> Based on customer surveys and success stories from our user base
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-200 py-20 lg:py-32">
        <div className="px-6">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Why Choose ResumeAI?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Our AI-powered platform combines advanced technology with
              professional design to help you create resumes that get results.
            </p>
          </div>

          {/* Responsive Scrolling Section */}
          <div className="relative">
            {/* Desktop: Infinite Marquee */}
            <div className="hidden md:block relative overflow-hidden">
              <div className="flex animate-marquee space-x-8">
                {/* First set of cards */}
                <Card className="min-w-[350px] border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
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

              <Card className="min-w-[350px] border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
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

              <Card className="min-w-[350px] border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
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

              <Card className="min-w-[350px] border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                {/* Real-time Analytics Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-50"></div>
                <div className="absolute top-4 right-4 w-16 h-16 opacity-15">
                  {/* Analytics chart pattern */}
                  <div className="flex items-end space-x-1 h-full">
                    <div className="w-2 bg-orange-400 rounded-t animate-pulse" style={{ height: '60%' }}></div>
                    <div className="w-2 bg-red-400 rounded-t animate-pulse delay-100" style={{ height: '80%' }}></div>
                    <div className="w-2 bg-orange-500 rounded-t animate-pulse delay-200" style={{ height: '40%' }}></div>
                    <div className="w-2 bg-red-500 rounded-t animate-pulse delay-300" style={{ height: '90%' }}></div>
                  </div>
                </div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-orange-600 transition-colors">
                    Real-time Analytics
                  </CardTitle>
                  <CardDescription>
                    Track your resume performance with detailed analytics, view counts, and optimization suggestions to improve your job search success.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="min-w-[350px] border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                {/* Export Options Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50 opacity-50"></div>
                <div className="absolute top-2 right-2 w-20 h-16 opacity-15">
                  {/* File format icons */}
                  <div className="grid grid-cols-2 gap-1">
                    <div className="bg-violet-400 rounded text-white text-xs flex items-center justify-center font-bold">PDF</div>
                    <div className="bg-purple-400 rounded text-white text-xs flex items-center justify-center font-bold">DOC</div>
                    <div className="bg-violet-500 rounded text-white text-xs flex items-center justify-center font-bold">TXT</div>
                    <div className="bg-purple-500 rounded text-white text-xs flex items-center justify-center font-bold">HTML</div>
                  </div>
                </div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-violet-600 transition-colors">
                    Multiple Export Options
                  </CardTitle>
                  <CardDescription>
                    Download your resume in multiple formats including PDF, Word, and plain text. Perfect for different application requirements.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Duplicate set for seamless loop */}
              <Card className="min-w-[350px] border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-50"></div>
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-blue-600">
                    <defs>
                      <pattern id="neural2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.3" />
                        <line x1="10" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                        <line x1="10" y1="10" x2="10" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#neural2)" />
                  </svg>
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

              <Card className="min-w-[350px] border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-50"></div>
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

              <Card className="min-w-[350px] border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50"></div>
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

              <Card className="min-w-[350px] border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-50"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-orange-600 transition-colors">
                    Real-time Analytics
                  </CardTitle>
                  <CardDescription>
                    Track your resume performance with detailed analytics, view counts, and optimization suggestions to improve your job search success.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="min-w-[350px] border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50 opacity-50"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-violet-600 transition-colors">
                    Multiple Export Options
                  </CardTitle>
                  <CardDescription>
                    Download your resume in multiple formats including PDF, Word, and plain text. Perfect for different application requirements.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            </div>

            {/* Mobile: Horizontal Scroll with 2-3 visible cards */}
            <div className="md:hidden mt-8">
              <div className="flex overflow-x-auto space-x-4 px-6 pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
                {/* Mobile Card 1 */}
                <Card className="min-w-[280px] flex-shrink-0 snap-start border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-3">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">AI-Powered Content</CardTitle>
                    <CardDescription className="text-sm">
                      Get intelligent suggestions for job descriptions and skills tailored to your industry.
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Mobile Card 2 */}
                <Card className="min-w-[280px] flex-shrink-0 snap-start border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">ATS Optimization</CardTitle>
                    <CardDescription className="text-sm">
                      Ensure your resume passes Applicant Tracking Systems with optimized formatting.
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Mobile Card 3 */}
                <Card className="min-w-[280px] flex-shrink-0 snap-start border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-3">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">Professional Templates</CardTitle>
                    <CardDescription className="text-sm">
                      Choose from dozens of professionally designed templates for all industries.
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Mobile Card 4 */}
                <Card className="min-w-[280px] flex-shrink-0 snap-start border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-3">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">Real-time Analytics</CardTitle>
                    <CardDescription className="text-sm">
                      Track your resume performance with detailed analytics and optimization tips.
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Mobile Card 5 */}
                <Card className="min-w-[280px] flex-shrink-0 snap-start border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mb-3">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">Multiple Export Options</CardTitle>
                    <CardDescription className="text-sm">
                      Download in PDF, Word, and plain text formats for different applications.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20 lg:py-32" id="how-it-works">
        <div className="px-6">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Create your perfect resume in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl mb-6 shadow-lg step-icon opacity-0" data-step="1">
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
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl mb-6 shadow-lg step-icon opacity-0" data-step="2">
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
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl mb-6 shadow-lg step-icon opacity-0" data-step="3">
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

      {/* CTA Section with Colorful Blocks */}
      <section className="bg-white py-20 lg:py-32 relative overflow-hidden">
        <div className="px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center relative py-12 lg:py-20">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 md:mb-10 leading-tight">
              Creating a winning resume is{" "}
              <span className="text-orange-500">
                the quickest and easiest way
              </span>{" "}
              to get more job interviews.
            </h2>
            <p className="text-slate-600 mb-8 md:mb-12 text-lg md:text-xl max-w-2xl mx-auto">
              Get more job offers with AI Resume Builder's online resume builder.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold rounded-full"
            >
              <Link href="/builder">
                Try Now <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>

            {/* Scattered Blocks Around Text - Visible on All Devices */}
            
            {/* Top Left Area */}
            <div className="absolute -top-8 md:-top-16 -left-16 md:-left-32">
              <div className="w-16 h-20 md:w-24 md:h-32 bg-pink-300 rounded-xl transform rotate-12 shadow-lg"></div>
            </div>
            
            <div className="absolute -top-4 md:-top-8 -left-8 md:-left-16">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-blue-600 rounded-lg transform -rotate-6 shadow-md"></div>
            </div>

            {/* Top Right Area */}
            <div className="absolute -top-6 md:-top-12 -right-12 md:-right-28">
              <div className="w-12 h-16 md:w-20 md:h-28 bg-gradient-to-br from-blue-400 to-blue-700 rounded-xl transform -rotate-15 shadow-lg"></div>
            </div>

            <div className="absolute top-2 md:top-4 -right-6 md:-right-14">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-200 rounded-lg transform rotate-45 shadow-sm border border-gray-300"></div>
            </div>

            {/* Left Side */}
            <div className="absolute top-16 md:top-24 -left-20 md:-left-36">
              <div className="w-14 h-8 md:w-22 md:h-12 bg-gradient-to-r from-gray-200 to-gray-400 rounded-lg transform rotate-6 shadow-sm"></div>
            </div>

            <div className="absolute top-32 md:top-48 -left-12 md:-left-20">
              <div className="w-6 h-6 md:w-10 md:h-10 bg-purple-500 rounded transform rotate-45 shadow-sm"></div>
            </div>

            {/* Right Side */}
            <div className="absolute top-20 md:top-32 -right-16 md:-right-32">
              <div className="w-12 h-14 md:w-20 md:h-24 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg transform rotate-8 shadow-md"></div>
            </div>

            <div className="absolute top-40 md:top-56 -right-8 md:-right-16">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-400 rounded-lg transform -rotate-12 shadow-sm"></div>
            </div>

            {/* Bottom Left Area */}
            <div className="absolute -bottom-8 md:-bottom-16 -left-18 md:-left-34">
              <div className="w-20 h-6 md:w-28 md:h-10 bg-yellow-200 rounded-lg transform -rotate-3 shadow-sm"></div>
            </div>

            <div className="absolute -bottom-4 md:-bottom-8 -left-8 md:-left-16">
              <div className="w-8 h-12 md:w-12 md:h-18 bg-pink-400 rounded-lg transform rotate-12 shadow-sm"></div>
            </div>

            {/* Bottom Right Area */}
            <div className="absolute -bottom-6 md:-bottom-12 -right-14 md:-right-30">
              <div className="w-16 h-8 md:w-24 md:h-12 bg-pink-300 rounded-lg transform -rotate-8 shadow-sm"></div>
            </div>

            <div className="absolute -bottom-2 md:-bottom-4 -right-6 md:-right-12">
              <div className="w-6 h-6 md:w-10 md:h-10 bg-green-300 rounded transform rotate-30 shadow-sm"></div>
            </div>

            {/* Small Floating Accents */}
            <div className="absolute top-8 md:top-16 left-1/4 w-3 h-3 md:w-5 md:h-5 bg-yellow-400 rounded-full opacity-70"></div>
            <div className="absolute bottom-12 md:bottom-20 right-1/3 w-2 h-2 md:w-4 md:h-4 bg-purple-300 rounded-full opacity-60"></div>
            <div className="absolute top-24 md:top-40 right-1/4 w-4 h-4 md:w-6 md:h-6 bg-green-200 rounded opacity-50 transform rotate-45"></div>
          </div>
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
            <p>&copy; 2026 ResumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
