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
  ArrowRight,
  Download,
  Eye,
  FileText,
  Star,
  Users,
  Briefcase,
  GraduationCap,
  Code,
  Palette,
  Building,
  Stethoscope,
} from "lucide-react";

const examples = [
  {
    id: "software-engineer",
    name: "Alex Chen",
    role: "Software Engineer",
    industry: "Technology",
    experience: "5+ years",
    icon: Code,
    color: "blue",
    highlights: ["React & Node.js", "Full-stack development", "Team leadership"],
    description: "Senior software engineer with expertise in modern web technologies and agile development.",
    preview: {
      sections: ["Technical Skills", "Professional Experience", "Projects", "Education"],
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"]
    }
  },
  {
    id: "marketing-manager",
    name: "Sarah Johnson",
    role: "Marketing Manager",
    industry: "Marketing",
    experience: "7+ years",
    icon: Briefcase,
    color: "purple",
    highlights: ["Digital Marketing", "Campaign Management", "Analytics"],
    description: "Results-driven marketing professional with proven track record in digital campaigns.",
    preview: {
      sections: ["Core Competencies", "Professional Experience", "Achievements", "Education"],
      skills: ["SEO/SEM", "Google Analytics", "Social Media", "Content Strategy"]
    }
  },
  {
    id: "graphic-designer",
    name: "Emma Rodriguez",
    role: "Graphic Designer",
    industry: "Creative",
    experience: "4+ years",
    icon: Palette,
    color: "pink",
    highlights: ["Brand Identity", "UI/UX Design", "Creative Direction"],
    description: "Creative designer specializing in brand identity and user experience design.",
    preview: {
      sections: ["Design Skills", "Work Experience", "Portfolio", "Education"],
      skills: ["Adobe Creative Suite", "Figma", "Branding", "Typography"]
    }
  },
  {
    id: "project-manager",
    name: "Michael Brown",
    role: "Project Manager",
    industry: "Business",
    experience: "8+ years",
    icon: Building,
    color: "green",
    highlights: ["Agile/Scrum", "Team Leadership", "Process Improvement"],
    description: "Experienced project manager with expertise in agile methodologies and team leadership.",
    preview: {
      sections: ["Professional Summary", "Experience", "Certifications", "Skills"],
      skills: ["PMP Certified", "Scrum Master", "Risk Management", "Stakeholder Management"]
    }
  },
  {
    id: "data-scientist",
    name: "Dr. Lisa Wang",
    role: "Data Scientist",
    industry: "Analytics",
    experience: "6+ years",
    icon: GraduationCap,
    color: "indigo",
    highlights: ["Machine Learning", "Statistical Analysis", "Python/R"],
    description: "PhD data scientist with expertise in machine learning and predictive analytics.",
    preview: {
      sections: ["Research Experience", "Technical Skills", "Publications", "Education"],
      skills: ["Python", "R", "TensorFlow", "SQL", "Statistics"]
    }
  },
  {
    id: "nurse-practitioner",
    name: "Jennifer Davis",
    role: "Nurse Practitioner",
    industry: "Healthcare",
    experience: "10+ years",
    icon: Stethoscope,
    color: "red",
    highlights: ["Patient Care", "Clinical Excellence", "Healthcare Leadership"],
    description: "Experienced nurse practitioner with specialization in family medicine and patient care.",
    preview: {
      sections: ["Clinical Experience", "Certifications", "Education", "Professional Skills"],
      skills: ["Patient Assessment", "Treatment Planning", "EMR Systems", "Healthcare Compliance"]
    }
  }
];

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    accent: "bg-blue-600",
    text: "text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700",
    icon: "text-blue-600"
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    accent: "bg-purple-600",
    text: "text-purple-600",
    button: "bg-purple-600 hover:bg-purple-700",
    icon: "text-purple-600"
  },
  pink: {
    bg: "bg-pink-50",
    border: "border-pink-200",
    accent: "bg-pink-600",
    text: "text-pink-600",
    button: "bg-pink-600 hover:bg-pink-700",
    icon: "text-pink-600"
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    accent: "bg-green-600",
    text: "text-green-600",
    button: "bg-green-600 hover:bg-green-700",
    icon: "text-green-600"
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    accent: "bg-indigo-600",
    text: "text-indigo-600",
    button: "bg-indigo-600 hover:bg-indigo-700",
    icon: "text-indigo-600"
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    accent: "bg-red-600",
    text: "text-red-600",
    button: "bg-red-600 hover:bg-red-700",
    icon: "text-red-600"
  }
};

export default function ExamplesPage() {
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
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/templates">View Templates</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/builder">Start Building</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Professional Resume Examples
          </h1>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Get inspired by real resume examples from various industries. See how professionals showcase their skills and experience.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-blue-100">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Industry Specific</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Real Examples</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>ATS Optimized</span>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="py-16">
        <div className="px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {examples.map((example) => {
              const colors = colorClasses[example.color as keyof typeof colorClasses];
              const IconComponent = example.icon;
              
              return (
                <Card key={example.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  {/* Resume Preview */}
                  <div className={`${colors.bg} ${colors.border} border-b p-6 relative`}>
                    <div className="bg-white rounded-lg shadow-lg p-4 transform group-hover:scale-105 transition-transform duration-300">
                      {/* Header */}
                      <div className="text-center mb-4">
                        <div className={`w-12 h-12 ${colors.accent} rounded-full flex items-center justify-center mx-auto mb-3`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{example.name}</h3>
                        <p className={`text-sm font-medium ${colors.text} mb-1`}>{example.role}</p>
                        <p className="text-xs text-slate-500">{example.experience} experience</p>
                      </div>
                      
                      {/* Sections */}
                      <div className="space-y-3">
                        {example.preview.sections.map((section, index) => (
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

                      {/* Skills Preview */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <div className="flex flex-wrap gap-1">
                          {example.preview.skills.slice(0, 3).map((skill) => (
                            <span key={skill} className={`px-2 py-1 ${colors.bg} ${colors.text} text-xs rounded`}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Industry Badge */}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-slate-600">
                      {example.industry}
                    </div>
                  </div>

                  {/* Example Info */}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="group-hover:text-blue-600 transition-colors">
                          {example.role}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {example.description}
                        </CardDescription>
                      </div>
                    </div>
                    
                    {/* Highlights */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-slate-900 mb-2">Key Highlights:</h4>
                      <ul className="space-y-1">
                        {example.highlights.map((highlight) => (
                          <li key={highlight} className="text-sm text-slate-600 flex items-center">
                            <div className={`w-1.5 h-1.5 ${colors.accent} rounded-full mr-2`}></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardHeader>

                  {/* Actions */}
                  <CardContent className="pt-0">
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-3 h-3 mr-2" />
                        View Full Resume
                      </Button>
                      <Button size="sm" className={`flex-1 text-white ${colors.button}`} asChild>
                        <Link href={`/builder?example=${example.id}`}>
                          Use This Example
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
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Use any of these examples as inspiration or start from scratch with our AI-powered resume builder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-base font-semibold">
              <Link href="/builder">
                Start Building Now <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base border-slate-600 text-slate-300 hover:bg-slate-700">
              <Link href="/templates">
                Browse Templates
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}