"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Eye,
  FileText,
  Plus,
  Trash2,
  Brain,
  Loader2,
  Save,
  FolderOpen,
} from "lucide-react";

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
  };
  summary: string;
  experience: any[];
  education: any[];
  projects: any[];
  skills: string[];
}

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
    },
    summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
  });

  const [activeTab, setActiveTab] = useState("personal");
  const [isGenerating, setIsGenerating] = useState(false);

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
                <h1 className="text-xl font-bold text-slate-900">Resume Builder</h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                    <CardDescription>
                      Basic details about yourself
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            personalInfo: {
                              ...resumeData.personalInfo,
                              fullName: e.target.value,
                            },
                          })
                        }
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            personalInfo: {
                              ...resumeData.personalInfo,
                              email: e.target.value,
                            },
                          })
                        }
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            personalInfo: {
                              ...resumeData.personalInfo,
                              phone: e.target.value,
                            },
                          })
                        }
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={resumeData.personalInfo.location}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            personalInfo: {
                              ...resumeData.personalInfo,
                              location: e.target.value,
                            },
                          })
                        }
                        placeholder="New York, NY"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Professional Summary</CardTitle>
                    <CardDescription>
                      A brief overview of your professional background
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={resumeData.summary}
                      onChange={(e) =>
                        setResumeData({ ...resumeData, summary: e.target.value })
                      }
                      placeholder="Write a compelling professional summary..."
                      rows={4}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                      ) : (
                        <Brain className="w-3 h-3 mr-2" />
                      )}
                      AI Enhance
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Work Experience</CardTitle>
                    <CardDescription>
                      Your professional work history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Education</CardTitle>
                    <CardDescription>
                      Your educational background
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Skills</CardTitle>
                    <CardDescription>
                      Your key technical and soft skills
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input placeholder="Add a skill and press Enter" />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {resumeData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                          <button className="ml-1 hover:text-destructive">
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Main Content - Resume Preview */}
        <div className="flex-1 bg-slate-50 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-slate-900">
                      {resumeData.personalInfo.fullName || "Your Name"}
                    </h1>
                    <div className="text-slate-600 space-y-1">
                      <p>{resumeData.personalInfo.email}</p>
                      <p>{resumeData.personalInfo.phone}</p>
                      <p>{resumeData.personalInfo.location}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Summary */}
                  {resumeData.summary && (
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 mb-3">
                        Professional Summary
                      </h2>
                      <p className="text-slate-700 leading-relaxed">
                        {resumeData.summary}
                      </p>
                    </div>
                  )}

                  {/* Experience */}
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-3">
                      Experience
                    </h2>
                    {resumeData.experience.length === 0 ? (
                      <p className="text-slate-500 italic">No experience added yet</p>
                    ) : (
                      <div className="space-y-4">
                        {/* Experience items would go here */}
                      </div>
                    )}
                  </div>

                  {/* Education */}
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-3">
                      Education
                    </h2>
                    {resumeData.education.length === 0 ? (
                      <p className="text-slate-500 italic">No education added yet</p>
                    ) : (
                      <div className="space-y-4">
                        {/* Education items would go here */}
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  {resumeData.skills.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 mb-3">
                        Skills
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
