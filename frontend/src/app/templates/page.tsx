"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Eye, Star, Users, Briefcase, Palette, Code, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");


  const categories = [
    { id: "all", name: "All Templates", icon: Briefcase },
    { id: "professional", name: "Professional", icon: Briefcase },
    { id: "creative", name: "Creative", icon: Palette },
    { id: "technology", name: "Technology", icon: Code },
    { id: "academic", name: "Academic", icon: GraduationCap },
  ];

  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      category: "professional",
      description: "Clean and modern design perfect for corporate roles and business professionals",
      rating: 4.9,
      downloads: 15420,
      featured: true,
      colors: ["#2563eb", "#1e40af", "#1d4ed8"],
      preview: `
        <div class="bg-white p-8 font-sans max-w-2xl mx-auto">
          <div class="border-l-4 border-blue-600 pl-6 mb-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">John Smith</h1>
            <p class="text-lg text-blue-600 font-medium">Senior Software Engineer</p>
            <div class="text-sm text-gray-600 mt-2">
              <p>📧 john.smith@email.com | 📱 (555) 123-4567</p>
              <p>📍 San Francisco, CA | 💼 linkedin.com/in/johnsmith</p>
            </div>
          </div>
          
          <div class="mb-6">
            <h2 class="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">Professional Summary</h2>
            <p class="text-gray-700 leading-relaxed">Experienced software engineer with 8+ years developing scalable web applications...</p>
          </div>
          
          <div class="mb-6">
            <h2 class="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">Experience</h2>
            <div class="mb-4">
              <h3 class="font-bold text-gray-900">Senior Software Engineer</h3>
              <p class="text-blue-600 font-medium">Tech Corp • 2020 - Present</p>
              <ul class="text-gray-700 mt-2 list-disc list-inside">
                <li>Led development of microservices architecture</li>
                <li>Improved system performance by 40%</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h2 class="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">Skills</h2>
            <div class="flex flex-wrap gap-2">
              <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">JavaScript</span>
              <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React</span>
              <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Node.js</span>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 2,
      name: "Creative Designer",
      category: "creative",
      description: "Bold and creative layout perfect for designers, artists, and creative professionals",
      rating: 4.8,
      downloads: 12350,
      featured: true,
      colors: ["#ec4899", "#be185d", "#9d174d"],
      preview: `
        <div class="bg-gradient-to-br from-pink-50 to-purple-50 p-8 font-sans max-w-2xl mx-auto">
          <div class="text-center mb-8">
            <div class="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-white text-2xl font-bold">JS</span>
            </div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">Jane Smith</h1>
            <p class="text-xl text-gray-700 font-medium">Creative Designer</p>
            <div class="text-sm text-gray-600 mt-2">
              <p>✨ jane@creative.com | 🎨 behance.net/janesmith</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h2 class="text-lg font-bold text-pink-600 mb-3 flex items-center">
                <span class="w-2 h-2 bg-pink-600 rounded-full mr-2"></span>
                About Me
              </h2>
              <p class="text-gray-700 text-sm leading-relaxed">Passionate designer with 5+ years creating stunning visual experiences...</p>
            </div>
            
            <div>
              <h2 class="text-lg font-bold text-purple-600 mb-3 flex items-center">
                <span class="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                Skills
              </h2>
              <div class="space-y-2">
                <div class="flex items-center">
                  <span class="text-sm text-gray-700 w-20">Photoshop</span>
                  <div class="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                    <div class="bg-pink-500 h-2 rounded-full" style="width: 95%"></div>
                  </div>
                </div>
                <div class="flex items-center">
                  <span class="text-sm text-gray-700 w-20">Illustrator</span>
                  <div class="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: 90%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 3,
      name: "Tech Minimalist",
      category: "technology",
      description: "Clean, minimalist design ideal for developers and tech professionals",
      rating: 4.7,
      downloads: 18900,
      featured: false,
      colors: ["#059669", "#047857", "#065f46"],
      preview: `
        <div class="bg-white p-8 font-mono max-w-2xl mx-auto border-l-4 border-green-600">
          <div class="mb-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-1">$ whoami</h1>
            <h2 class="text-3xl font-bold text-green-600 mb-2">Alex Johnson</h2>
            <p class="text-gray-700">Full Stack Developer</p>
            <div class="text-sm text-gray-600 mt-2 font-sans">
              <p>📧 alex@dev.com | 🌐 github.com/alexj | 📍 Seattle, WA</p>
            </div>
          </div>
          
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-900 mb-3">// Experience</h2>
            <div class="space-y-3">
              <div class="border-l-2 border-green-600 pl-4">
                <h3 class="font-bold text-gray-900">Senior Developer</h3>
                <p class="text-green-600 text-sm">StartupCo • 2021-Present</p>
                <p class="text-gray-700 text-sm mt-1">Built scalable applications serving 1M+ users</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 class="text-lg font-bold text-gray-900 mb-3">// Tech Stack</h2>
            <div class="grid grid-cols-3 gap-2 text-sm">
              <span class="bg-gray-100 px-2 py-1 rounded">JavaScript</span>
              <span class="bg-gray-100 px-2 py-1 rounded">Python</span>
              <span class="bg-gray-100 px-2 py-1 rounded">React</span>
              <span class="bg-gray-100 px-2 py-1 rounded">Node.js</span>
              <span class="bg-gray-100 px-2 py-1 rounded">Docker</span>
              <span class="bg-gray-100 px-2 py-1 rounded">AWS</span>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 4,
      name: "Executive Elite",
      category: "professional",
      description: "Premium design for C-level executives and senior management",
      rating: 4.9,
      downloads: 8750,
      featured: true,
      colors: ["#1f2937", "#374151", "#4b5563"],
      preview: `
        <div class="bg-white p-8 font-serif max-w-2xl mx-auto">
          <div class="text-center border-b-2 border-gray-900 pb-6 mb-6">
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Robert Williams</h1>
            <p class="text-xl text-gray-700 italic">Chief Executive Officer</p>
            <div class="text-sm text-gray-600 mt-3">
              <p>📧 r.williams@company.com | 📱 (555) 987-6543 | 📍 New York, NY</p>
            </div>
          </div>
          
          <div class="mb-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4 text-center">EXECUTIVE SUMMARY</h2>
            <p class="text-gray-700 leading-relaxed text-center italic">Visionary leader with 15+ years driving organizational growth and transformation...</p>
          </div>
          
          <div class="grid grid-cols-2 gap-8">
            <div>
              <h2 class="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">EXPERIENCE</h2>
              <div class="space-y-3">
                <div>
                  <h3 class="font-bold text-gray-900">CEO</h3>
                  <p class="text-gray-600 text-sm">Global Corp • 2018-Present</p>
                  <p class="text-gray-700 text-sm">Led $2B revenue growth</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 class="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">ACHIEVEMENTS</h2>
              <ul class="text-gray-700 text-sm space-y-1">
                <li>• Increased market share by 35%</li>
                <li>• Led successful IPO</li>
                <li>• Built high-performing teams</li>
              </ul>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 5,
      name: "Academic Scholar",
      category: "academic",
      description: "Professional template for researchers, professors, and academic professionals",
      rating: 4.6,
      downloads: 6420,
      featured: false,
      colors: ["#7c3aed", "#6d28d9", "#5b21b6"],
      preview: `
        <div class="bg-white p-8 font-serif max-w-2xl mx-auto">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Dr. Sarah Chen</h1>
            <p class="text-lg text-purple-700 font-medium">Associate Professor of Computer Science</p>
            <p class="text-sm text-gray-600 mt-2">University of Technology • Department of Computer Science</p>
            <div class="text-sm text-gray-600 mt-2">
              <p>📧 s.chen@university.edu | 🌐 orcid.org/0000-0000-0000-0000</p>
            </div>
          </div>
          
          <div class="mb-6">
            <h2 class="text-lg font-bold text-purple-700 mb-3 border-b-2 border-purple-700 pb-1">RESEARCH INTERESTS</h2>
            <p class="text-gray-700 text-sm">Machine Learning, Natural Language Processing, Computational Linguistics</p>
          </div>
          
          <div class="mb-6">
            <h2 class="text-lg font-bold text-purple-700 mb-3 border-b-2 border-purple-700 pb-1">EDUCATION</h2>
            <div class="space-y-2">
              <div>
                <h3 class="font-bold text-gray-900 text-sm">Ph.D. Computer Science</h3>
                <p class="text-gray-600 text-sm">Stanford University • 2015</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 class="text-lg font-bold text-purple-700 mb-3 border-b-2 border-purple-700 pb-1">SELECTED PUBLICATIONS</h2>
            <div class="text-sm text-gray-700 space-y-2">
              <p>• Chen, S. et al. "Advanced NLP Techniques" Nature AI (2023)</p>
              <p>• Chen, S. "Machine Learning Applications" ICML (2022)</p>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 6,
      name: "Startup Founder",
      category: "creative",
      description: "Dynamic template for entrepreneurs and startup founders",
      rating: 4.8,
      downloads: 9870,
      featured: false,
      colors: ["#f59e0b", "#d97706", "#b45309"],
      preview: `
        <div class="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 font-sans max-w-2xl mx-auto">
          <div class="flex items-start gap-6 mb-8">
            <div class="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
              <span class="text-white text-xl font-bold">MJ</span>
            </div>
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-gray-900 mb-1">Mike Johnson</h1>
              <p class="text-xl text-orange-600 font-bold">Founder & CEO</p>
              <p class="text-gray-700 text-sm mt-1">Building the future of fintech</p>
              <div class="text-sm text-gray-600 mt-2">
                <p>🚀 mike@startup.com | 💼 linkedin.com/in/mikej</p>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h2 class="text-lg font-bold text-orange-600 mb-3">🎯 Vision</h2>
              <p class="text-gray-700 text-sm leading-relaxed">Passionate entrepreneur building innovative solutions that transform industries...</p>
              
              <h2 class="text-lg font-bold text-orange-600 mb-3 mt-4">🏆 Achievements</h2>
              <ul class="text-gray-700 text-sm space-y-1">
                <li>• Raised $5M Series A</li>
                <li>• 100K+ active users</li>
                <li>• Featured in TechCrunch</li>
              </ul>
            </div>
            
            <div>
              <h2 class="text-lg font-bold text-orange-600 mb-3">💼 Experience</h2>
              <div class="space-y-3">
                <div>
                  <h3 class="font-bold text-gray-900 text-sm">Founder & CEO</h3>
                  <p class="text-orange-600 text-sm">FinTech Startup • 2020-Present</p>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 text-sm">Product Manager</h3>
                  <p class="text-orange-600 text-sm">Tech Giant • 2018-2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 7,
      name: "Sales Professional",
      category: "professional",
      description: "Results-driven template perfect for sales professionals and account managers",
      rating: 4.8,
      downloads: 11200,
      featured: false,
      colors: ["#f59e0b", "#d97706", "#b45309"],
      preview: `
        <div class="bg-white p-8 font-sans max-w-2xl mx-auto">
          <div class="flex items-center gap-6 mb-8">
            <div class="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
              <span class="text-white text-2xl font-bold">MR</span>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-1">Mark Rodriguez</h1>
              <p class="text-xl text-orange-600 font-bold">Senior Sales Manager</p>
              <div class="text-sm text-gray-600 mt-2">
                <p>📧 mark.rodriguez@email.com | 📱 (555) 987-6543</p>
                <p>📍 Chicago, IL | 💼 linkedin.com/in/markrodriguez</p>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h2 class="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-600 pb-1">SALES ACHIEVEMENTS</h2>
            <div class="grid grid-cols-3 gap-4 text-center">
              <div class="bg-orange-50 p-3 rounded">
                <div class="text-2xl font-bold text-orange-600">150%</div>
                <p class="text-sm text-gray-600">Quota Achievement</p>
              </div>
              <div class="bg-orange-50 p-3 rounded">
                <div class="text-2xl font-bold text-orange-600">$2.5M</div>
                <p class="text-sm text-gray-600">Revenue Generated</p>
              </div>
              <div class="bg-orange-50 p-3 rounded">
                <div class="text-2xl font-bold text-orange-600">95%</div>
                <p class="text-sm text-gray-600">Client Retention</p>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h2 class="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-600 pb-1">EXPERIENCE</h2>
            <div class="space-y-3">
              <div>
                <h3 class="font-bold text-gray-900">Senior Sales Manager</h3>
                <p class="text-orange-600 font-medium">TechCorp Solutions • 2020-Present</p>
                <ul class="text-gray-700 mt-2 list-disc list-inside text-sm">
                  <li>Exceeded annual sales targets by 150% for 3 consecutive years</li>
                  <li>Managed portfolio of 50+ enterprise clients worth $2.5M ARR</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 8,
      name: "Marketing Specialist",
      category: "creative",
      description: "Eye-catching design for marketing professionals and digital marketers",
      rating: 4.7,
      downloads: 9650,
      featured: false,
      colors: ["#ec4899", "#be185d", "#9d174d"],
      preview: `
        <div class="bg-gradient-to-br from-pink-50 to-purple-50 p-8 font-sans max-w-2xl mx-auto">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">Emma Wilson</h1>
            <p class="text-xl text-gray-700 font-medium">Digital Marketing Specialist</p>
            <div class="text-sm text-gray-600 mt-2">
              <p>📧 emma.wilson@email.com | 🌐 emmawilson.com</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div class="bg-white p-4 rounded-lg shadow-sm">
              <h2 class="text-lg font-bold text-pink-600 mb-3">📊 Campaign Results</h2>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>CTR Improvement</span>
                  <span class="font-bold text-pink-600">+245%</span>
                </div>
                <div class="flex justify-between">
                  <span>Lead Generation</span>
                  <span class="font-bold text-pink-600">+180%</span>
                </div>
                <div class="flex justify-between">
                  <span>ROI</span>
                  <span class="font-bold text-pink-600">+320%</span>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-sm">
              <h2 class="text-lg font-bold text-purple-600 mb-3">🛠️ Tools & Skills</h2>
              <div class="flex flex-wrap gap-1">
                <span class="bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs">Google Ads</span>
                <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">Facebook Ads</span>
                <span class="bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs">Analytics</span>
                <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">SEO</span>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <h2 class="text-lg font-bold text-pink-600 mb-3">💼 Experience</h2>
            <div>
              <h3 class="font-bold text-gray-900">Digital Marketing Specialist</h3>
              <p class="text-pink-600 text-sm">Growth Agency • 2021-Present</p>
              <p class="text-gray-700 text-sm mt-1">Led multi-channel campaigns generating $1M+ in revenue</p>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 9,
      name: "Data Scientist",
      category: "technology",
      description: "Modern template for data scientists and analytics professionals",
      rating: 4.9,
      downloads: 7890,
      featured: false,
      colors: ["#6366f1", "#4f46e5", "#4338ca"],
      preview: `
        <div class="bg-white p-8 font-mono max-w-2xl mx-auto">
          <div class="border-l-4 border-indigo-600 pl-6 mb-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-1"># Data Scientist</h1>
            <h2 class="text-3xl font-bold text-indigo-600 mb-2">Dr. Lisa Chen</h2>
            <p class="text-gray-700">Machine Learning Engineer</p>
            <div class="text-sm text-gray-600 mt-2 font-sans">
              <p>📧 lisa.chen@email.com | 🌐 github.com/lisachen | 📍 San Francisco, CA</p>
            </div>
          </div>
          
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-900 mb-3">## Technical Skills</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h3 class="font-bold text-indigo-600 text-sm mb-2">Languages</h3>
                <div class="space-y-1 text-sm">
                  <div class="flex items-center">
                    <span class="w-16">Python</span>
                    <div class="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                      <div class="bg-indigo-600 h-2 rounded-full" style="width: 95%"></div>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <span class="w-16">R</span>
                    <div class="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                      <div class="bg-indigo-600 h-2 rounded-full" style="width: 85%"></div>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <span class="w-16">SQL</span>
                    <div class="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                      <div class="bg-indigo-600 h-2 rounded-full" style="width: 90%"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 class="font-bold text-indigo-600 text-sm mb-2">Frameworks</h3>
                <div class="grid grid-cols-2 gap-1 text-xs">
                  <span class="bg-gray-100 px-2 py-1 rounded">TensorFlow</span>
                  <span class="bg-gray-100 px-2 py-1 rounded">PyTorch</span>
                  <span class="bg-gray-100 px-2 py-1 rounded">Scikit-learn</span>
                  <span class="bg-gray-100 px-2 py-1 rounded">Pandas</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 class="text-lg font-bold text-gray-900 mb-3">## Experience</h2>
            <div class="border-l-2 border-indigo-600 pl-4">
              <h3 class="font-bold text-gray-900">Senior Data Scientist</h3>
              <p class="text-indigo-600 text-sm">AI Startup • 2022-Present</p>
              <p class="text-gray-700 text-sm mt-1">Built ML models improving prediction accuracy by 40%</p>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 10,
      name: "Research Scholar",
      category: "academic",
      description: "Comprehensive template for PhD candidates and research professionals",
      rating: 4.6,
      downloads: 5430,
      featured: false,
      colors: ["#059669", "#047857", "#065f46"],
      preview: `
        <div class="bg-white p-8 font-serif max-w-2xl mx-auto">
          <div class="text-center mb-8 border-b-2 border-green-700 pb-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Dr. James Thompson</h1>
            <p class="text-lg text-green-700 font-medium">Research Fellow in Biomedical Engineering</p>
            <p class="text-sm text-gray-600 mt-2">Harvard Medical School • Department of Biomedical Engineering</p>
            <div class="text-sm text-gray-600 mt-2">
              <p>📧 j.thompson@harvard.edu | 🌐 orcid.org/0000-0000-0000-0001</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h2 class="text-lg font-bold text-green-700 mb-3 border-b-2 border-green-700 pb-1">EDUCATION</h2>
              <div class="space-y-2 text-sm">
                <div>
                  <h3 class="font-bold text-gray-900">Ph.D. Biomedical Engineering</h3>
                  <p class="text-gray-600">MIT • 2020</p>
                  <p class="text-gray-600 italic">Thesis: "Novel Approaches to Tissue Engineering"</p>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900">M.S. Bioengineering</h3>
                  <p class="text-gray-600">Stanford University • 2016</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 class="text-lg font-bold text-green-700 mb-3 border-b-2 border-green-700 pb-1">RESEARCH METRICS</h2>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>Publications:</span>
                  <span class="font-bold">25</span>
                </div>
                <div class="flex justify-between">
                  <span>Citations:</span>
                  <span class="font-bold">1,250</span>
                </div>
                <div class="flex justify-between">
                  <span>H-index:</span>
                  <span class="font-bold">18</span>
                </div>
                <div class="flex justify-between">
                  <span>Grants:</span>
                  <span class="font-bold">$2.5M</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 class="text-lg font-bold text-green-700 mb-3 border-b-2 border-green-700 pb-1">SELECTED PUBLICATIONS</h2>
            <div class="text-sm text-gray-700 space-y-2">
              <p>• Thompson, J. et al. "Advanced Tissue Engineering Techniques" <em>Nature Biomedical Engineering</em> (2023)</p>
              <p>• Thompson, J., Smith, A. "Regenerative Medicine Applications" <em>Cell</em> (2022)</p>
              <p>• Thompson, J. "Biomaterial Innovations" <em>Science</em> (2021)</p>
            </div>
          </div>
        </div>
      `,
    },
  ];

  const filteredTemplates = selectedCategory === "all"
    ? templates
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              className="text-4xl font-bold text-slate-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Professional Resume Templates
            </motion.h1>
            <motion.p
              className="text-slate-600 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Choose from our collection of professionally designed, ATS-optimized templates.
              Each template is crafted by design experts and loved by hiring managers.
            </motion.p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{category.name}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>

          {/* Templates Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group relative">
                  {template.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}

                  <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden">
                    <div
                      className="absolute inset-0 scale-75 origin-top-left transform transition-transform group-hover:scale-80"
                      dangerouslySetInnerHTML={{ __html: template.preview }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                    {/* Preview Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-white/90 text-slate-900 hover:bg-white">
                            <Eye className="w-4 h-4 mr-2" />
                            Full Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                          <DialogHeader>
                            <DialogTitle>{template.name}</DialogTitle>
                          </DialogHeader>
                          <div
                            className="w-full"
                            dangerouslySetInnerHTML={{ __html: template.preview }}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {template.name}
                        </CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{template.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{template.downloads.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{template.description}</p>

                    {/* Color Palette */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs text-slate-500">Colors:</span>
                      <div className="flex gap-1">
                        {template.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full border border-slate-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                          <DialogHeader>
                            <DialogTitle>{template.name}</DialogTitle>
                          </DialogHeader>
                          <div
                            className="w-full"
                            dangerouslySetInnerHTML={{ __html: template.preview }}
                          />
                        </DialogContent>
                      </Dialog>

                      <Button size="sm" className="flex-1" asChild>
                        <Link href={`/builder?template=${template.id}`}>
                          Use Template
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* View More Section */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Want to see more templates?</h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                We have 50+ more professional templates available. Browse our complete collection 
                to find the perfect design for your career.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" variant="outline">
                  View All Templates
                </Button>
                <Button size="lg" asChild>
                  <Link href="/builder">
                    Start Building Now
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">Can't find the perfect template?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our AI-powered builder can create a custom template based on your industry,
              experience level, and personal preferences.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/builder">
                Create Custom Template
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
