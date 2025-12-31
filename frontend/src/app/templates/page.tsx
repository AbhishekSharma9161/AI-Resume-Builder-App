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
  ArrowLeft,
  Eye,
  FileText,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const templates = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    category: "Professional",
    description: "Clean and modern design perfect for corporate roles",
    color: "blue",
    preview: {
      header: { name: "JOHN SMITH", title: "Marketing Manager", contact: "john@email.com • (555) 123-4567" },
      sections: ["PROFILE", "EXPERIENCE", "EDUCATION", "SKILLS"]
    }
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    category: "Creative",
    description: "Bold and creative layout for design professionals",
    color: "purple",
    preview: {
      header: { name: "SARAH JONES", title: "Graphic Designer", contact: "sarah@email.com • (555) 987-6543" },
      sections: ["ABOUT", "WORK EXPERIENCE", "PORTFOLIO", "SKILLS"]
    }
  },
  {
    id: "tech-minimalist",
    name: "Tech Minimalist",
    category: "Technology",
    description: "Minimalist design ideal for tech professionals",
    color: "green",
    preview: {
      header: { name: "ALEX CHEN", title: "Software Engineer", contact: "alex@email.com • (555) 456-7890" },
      sections: ["SUMMARY", "EXPERIENCE", "PROJECTS", "TECHNICAL SKILLS"]
    }
  },
  {
    id: "executive-classic",
    name: "Executive Classic",
    category: "Executive",
    description: "Traditional and elegant design for senior positions",
    color: "slate",
    preview: {
      header: { name: "MICHAEL BROWN", title: "Senior Director", contact: "michael@email.com • (555) 321-0987" },
      sections: ["EXECUTIVE SUMMARY", "PROFESSIONAL EXPERIENCE", "EDUCATION", "ACHIEVEMENTS"]
    }
  },
  {
    id: "startup-dynamic",
    name: "Startup Dynamic",
    category: "Startup",
    description: "Energetic design perfect for startup environments",
    color: "orange",
    preview: {
      header: { name: "EMMA WILSON", title: "Product Manager", contact: "emma@email.com • (555) 654-3210" },
      sections: ["PROFILE", "EXPERIENCE", "PROJECTS", "SKILLS"]
    }
  },
  {
    id: "academic-scholar",
    name: "Academic Scholar",
    category: "Academic",
    description: "Professional layout ideal for academic positions",
    color: "indigo",
    preview: {
      header: { name: "DR. LISA GARCIA", title: "Research Scientist", contact: "lisa@university.edu • (555) 789-0123" },
      sections: ["RESEARCH INTERESTS", "EXPERIENCE", "PUBLICATIONS", "EDUCATION"]
    }
  }
];

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    accent: "bg-blue-600",
    text: "text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700"
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    accent: "bg-purple-600",
    text: "text-purple-600",
    button: "bg-purple-600 hover:bg-purple-700"
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    accent: "bg-green-600",
    text: "text-green-600",
    button: "bg-green-600 hover:bg-green-700"
  },
  slate: {
    bg: "bg-slate-50",
    border: "border-slate-200",
    accent: "bg-slate-600",
    text: "text-slate-600",
    button: "bg-slate-600 hover:bg-slate-700"
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    accent: "bg-orange-600",
    text: "text-orange-600",
    button: "bg-orange-600 hover:bg-orange-700"
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    accent: "bg-indigo-600",
    text: "text-indigo-600",
    button: "bg-indigo-600 hover:bg-indigo-700"
  }
};

export default function TemplatesPage() {
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
                <h1 className="text-xl font-bold text-slate-900">Resume Templates</h1>
              </div>
            </div>
            <Button asChild size="sm">
              <Link href="/builder">Start Building</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Perfect Template
          </h1>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Select from our collection of professionally designed templates. All templates are ATS-optimized and ready to use.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-blue-100">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Professional Design</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>ATS Optimized</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              <span>AI Enhanced</span>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {templates.map((template) => {
              const colors = colorClasses[template.color as keyof typeof colorClasses];
              return (
                <Card key={template.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  {/* Template Preview */}
                  <div className={`${colors.bg} ${colors.border} border-b p-6 relative`}>
                    <div className="bg-white rounded-lg shadow-lg p-4 transform group-hover:scale-105 transition-transform duration-300">
                      {/* Header */}
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{template.preview.header.name}</h3>
                        <p className={`text-sm font-medium ${colors.text} mb-1`}>{template.preview.header.title}</p>
                        <p className="text-xs text-slate-500">{template.preview.header.contact}</p>
                      </div>
                      
                      {/* Sections */}
                      <div className="space-y-3">
                        {template.preview.sections.map((section, index) => (
                          <div key={section}>
                            <div className={`h-1 ${colors.accent} rounded mb-2`}></div>
                            <h4 className="text-xs font-semibold text-slate-900 mb-1">{section}</h4>
                            <div className="space-y-1">
                              <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                              <div className="h-1.5 bg-slate-200 rounded w-4/5"></div>
                              {index < 2 && <div className="h-1.5 bg-slate-200 rounded w-3/4"></div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Template Preview Label */}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-slate-600">
                      Template Preview
                    </div>
                  </div>

                  {/* Template Info */}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="group-hover:text-blue-600 transition-colors">
                          {template.name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {template.description}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className={`${colors.text} bg-transparent border ${colors.border}`}>
                        {template.category}
                      </Badge>
                    </div>
                  </CardHeader>

                  {/* Actions */}
                  <CardContent className="pt-0">
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-3 h-3 mr-2" />
                        Preview
                      </Button>
                      <Button size="sm" className={`flex-1 text-white ${colors.button}`} asChild>
                        <Link href={`/builder?template=${template.id}`}>
                          Use Template
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 py-16">
        <div className="px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Your Resume?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Choose any template above and start building your professional resume with our AI-powered builder.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-base font-semibold">
            <Link href="/builder">
              Start Building Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}