import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Eye, Download } from "lucide-react";

export default function TemplatesPage() {
  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      category: "Professional",
      description: "Clean and modern design perfect for corporate roles",
      preview: "/api/placeholder/400/500",
    },
    {
      id: 2,
      name: "Creative Designer",
      category: "Creative",
      description: "Bold and creative layout for design professionals",
      preview: "/api/placeholder/400/500",
    },
    {
      id: 3,
      name: "Tech Minimalist",
      category: "Technology",
      description: "Minimalist design ideal for tech professionals",
      preview: "/api/placeholder/400/500",
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
              <h1 className="text-2xl font-bold text-slate-900">Resume Templates</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Choose Your Perfect Template
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Select from our collection of professionally designed templates.
              All templates are ATS-optimized and ready to use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[4/5] bg-slate-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    Template Preview
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="secondary">{template.category}</Badge>
                  </div>
                  <p className="text-slate-600 text-sm">{template.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <Link href="/builder">Use Template</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
