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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Eye,
  FileText,
  Star,
  Users,
  Briefcase,
  GraduationCap,
  Code,
  Heart,
  Building,
  Palette,
  Search,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const resumeExamples = [
  {
    id: 1,
    title: "Software Engineer Resume",
    category: "Technology",
    industry: "Software Development",
    experience: "3-5 years",
    rating: 4.9,
    downloads: 1250,
    tags: ["React", "Node.js", "Python", "AWS"],
    description: "Perfect for mid-level software engineers with full-stack experience",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Marketing Manager Resume",
    category: "Marketing",
    industry: "Digital Marketing",
    experience: "5+ years",
    rating: 4.8,
    downloads: 980,
    tags: ["Digital Marketing", "Analytics", "Campaign Management", "ROI"],
    description: "Ideal for marketing professionals with leadership experience",
    icon: Briefcase,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Recent Graduate Resume",
    category: "Entry Level",
    industry: "Various",
    experience: "0-1 years",
    rating: 4.7,
    downloads: 2100,
    tags: ["Internships", "Projects", "Education", "Skills"],
    description: "Great template for new graduates entering the job market",
    icon: GraduationCap,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Healthcare Professional Resume",
    category: "Healthcare",
    industry: "Medical",
    experience: "2+ years",
    rating: 4.9,
    downloads: 750,
    tags: ["Patient Care", "Medical Records", "Compliance", "Teamwork"],
    description: "Specialized format for healthcare workers and medical professionals",
    icon: Heart,
    color: "from-red-500 to-pink-500",
  },
  {
    id: 5,
    title: "Business Analyst Resume",
    category: "Business",
    industry: "Consulting",
    experience: "3+ years",
    rating: 4.8,
    downloads: 890,
    tags: ["Data Analysis", "Process Improvement", "Stakeholder Management"],
    description: "Perfect for business analysts and consultants",
    icon: Building,
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: 6,
    title: "Creative Designer Resume",
    category: "Design",
    industry: "Creative",
    experience: "2+ years",
    rating: 4.7,
    downloads: 1100,
    tags: ["UI/UX", "Graphic Design", "Adobe Creative Suite", "Portfolio"],
    description: "Showcase your creativity with this designer-focused template",
    icon: Palette,
    color: "from-indigo-500 to-purple-500",
  },
];

const categories = [
  "All",
  "Technology",
  "Marketing",
  "Entry Level",
  "Healthcare",
  "Business",
  "Design",
];

export default function ExamplesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExamples = resumeExamples.filter(example => {
    const matchesCategory = selectedCategory === "All" || example.category === selectedCategory;
    const matchesSearch = example.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         example.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">Resume Examples</h1>
              </div>
            </div>
            <Button asChild>
              <Link href="/builder">
                Create Your Resume
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Professional Resume Examples
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg">
            Browse our collection of professionally designed resume examples across different industries. 
            Each template is ATS-optimized and crafted by career experts to help you land your dream job.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="max-w-2xl mx-auto mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search by job title, skills, or industry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">50,000+</div>
              <p className="text-slate-600">Templates Downloaded</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-yellow-500 fill-current" />
              </div>
              <div className="text-2xl font-bold text-slate-900">4.8/5</div>
              <p className="text-slate-600">Average Rating</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">95%</div>
              <p className="text-slate-600">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Resume Examples Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredExamples.map((example, index) => {
            const IconComponent = example.icon;
            return (
              <motion.div
                key={example.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden hover:-translate-y-2">
                {/* Preview Image Placeholder */}
                <div className={`h-48 bg-gradient-to-br ${example.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {example.category}
                    </Badge>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>{example.title}</DialogTitle>
                        </DialogHeader>
                        <div className="bg-white p-8 rounded-lg">
                          <p className="text-center text-slate-500">Resume preview would be displayed here</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="secondary" asChild>
                      <Link href={`/builder?example=${example.id}`}>
                        <Download className="w-4 h-4 mr-2" />
                        Use Template
                      </Link>
                    </Button>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">
                    {example.title}
                  </CardTitle>
                  <CardDescription>
                    {example.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{example.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>{example.downloads.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Industry & Experience */}
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Industry:</span>
                        <span className="font-medium">{example.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Experience:</span>
                        <span className="font-medium">{example.experience}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {example.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-3 h-3 mr-2" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                          <DialogHeader>
                            <DialogTitle>{example.title}</DialogTitle>
                          </DialogHeader>
                          <div className="bg-white p-8 rounded-lg">
                            <p className="text-center text-slate-500">Resume preview would be displayed here</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={`/builder?example=${example.id}`} prefetch={true}>
                          Use Template
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <div className="text-center mt-16 py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Create Your Professional Resume?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Use our AI-powered resume builder to create a standout resume that gets you hired. 
            Choose from professional templates and get personalized suggestions.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/builder" prefetch={true}>
              Start Building Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
