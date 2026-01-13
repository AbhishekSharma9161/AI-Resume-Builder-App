"use client";

import { useState, useRef, useEffect } from "react";
import * as React from "react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
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
  Edit,
  Calendar,
} from "lucide-react";
import { aiService } from "@/lib/ai-service";
import { exportToPDF } from "@/lib/pdf-export";
import { dbService } from "@/lib/database";

interface Experience {
  id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id?: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface ResumeData {
  id?: string;
  title: string;
  lastModified?: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
    codechef?: string;
    codeforces?: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  certifications: Certification[];
  languages: Language[];
  achievements: string[];
}

interface Project {
  id?: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
  url?: string;
  github?: string;
}

interface Certification {
  id?: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

interface Language {
  id?: string;
  name: string;
  proficiency: string; // Native, Fluent, Intermediate, Basic
}

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    title: "My Resume",
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
      portfolio: "",
      twitter: "",
      codechef: "",
      codeforces: "",
    },
    summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    certifications: [],
    languages: [],
    achievements: [],
  });

  const [activeTab, setActiveTab] = useState("personal");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showATSScore, setShowATSScore] = useState(false);
  const [atsScore, setATSScore] = useState<{score: number; suggestions: string[]; feedback: string} | null>(null);

  // Experience form state
  const [experienceForm, setExperienceForm] = useState<Experience>({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });
  const [showExperienceDialog, setShowExperienceDialog] = useState(false);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null);

  // Education form state
  const [educationForm, setEducationForm] = useState<Education>({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    gpa: "",
  });
  const [showEducationDialog, setShowEducationDialog] = useState(false);
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null);

  // Project form state
  const [projectForm, setProjectForm] = useState<Project>({
    name: "",
    description: "",
    technologies: [],
    startDate: "",
    endDate: "",
    current: false,
    url: "",
    github: "",
  });
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);

  // Certification form state
  const [certificationForm, setCertificationForm] = useState<Certification>({
    name: "",
    issuer: "",
    date: "",
    expiryDate: "",
    credentialId: "",
    url: "",
  });
  const [showCertificationDialog, setShowCertificationDialog] = useState(false);
  const [editingCertificationIndex, setEditingCertificationIndex] = useState<number | null>(null);

  // Language form state
  const [languageForm, setLanguageForm] = useState<Language>({
    name: "",
    proficiency: "Intermediate",
  });
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [editingLanguageIndex, setEditingLanguageIndex] = useState<number | null>(null);

  // Achievement input
  const [achievementInput, setAchievementInput] = useState("");

  // AI Enhancement
  const handleAIEnhance = async () => {
    if (!resumeData.summary.trim()) {
      toast.error("Please add some content to your summary first");
      return;
    }

    setIsGenerating(true);
    try {
      const suggestions = await aiService.generateSummary(
        "Professional", // You could extract this from experience
        resumeData.experience.map(exp => exp.position),
        resumeData.skills
      );

      if (suggestions.length > 0) {
        setResumeData({
          ...resumeData,
          summary: suggestions[0].content
        });
        toast.success("Summary enhanced with AI!");
      }
    } catch (error) {
      toast.error("Failed to enhance summary");
    } finally {
      setIsGenerating(false);
    }
  };

  // Skills management
  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      if (!resumeData.skills.includes(skillInput.trim())) {
        setResumeData({
          ...resumeData,
          skills: [...resumeData.skills, skillInput.trim()]
        });
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  // Experience management
  const handleAddExperience = () => {
    if (editingExperienceIndex !== null) {
      const updatedExperience = [...resumeData.experience];
      updatedExperience[editingExperienceIndex] = experienceForm;
      setResumeData({ ...resumeData, experience: updatedExperience });
      setEditingExperienceIndex(null);
    } else {
      setResumeData({
        ...resumeData,
        experience: [...resumeData.experience, experienceForm]
      });
    }
    
    setExperienceForm({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    setShowExperienceDialog(false);
    toast.success("Experience added successfully!");
  };

  const handleEditExperience = (index: number) => {
    setExperienceForm(resumeData.experience[index]);
    setEditingExperienceIndex(index);
    setShowExperienceDialog(true);
  };

  const handleDeleteExperience = (index: number) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index)
    });
    toast.success("Experience deleted");
  };

  // Education management
  const handleAddEducation = () => {
    if (editingEducationIndex !== null) {
      const updatedEducation = [...resumeData.education];
      updatedEducation[editingEducationIndex] = educationForm;
      setResumeData({ ...resumeData, education: updatedEducation });
      setEditingEducationIndex(null);
    } else {
      setResumeData({
        ...resumeData,
        education: [...resumeData.education, educationForm]
      });
    }
    
    setEducationForm({
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      gpa: "",
    });
    setShowEducationDialog(false);
    toast.success("Education added successfully!");
  };

  const handleEditEducation = (index: number) => {
    setEducationForm(resumeData.education[index]);
    setEditingEducationIndex(index);
    setShowEducationDialog(true);
  };

  const handleDeleteEducation = (index: number) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index)
    });
    toast.success("Education deleted");
  };

  // Project management
  const handleAddProject = () => {
    if (editingProjectIndex !== null) {
      const updatedProjects = [...resumeData.projects];
      updatedProjects[editingProjectIndex] = projectForm;
      setResumeData({ ...resumeData, projects: updatedProjects });
      setEditingProjectIndex(null);
    } else {
      setResumeData({
        ...resumeData,
        projects: [...resumeData.projects, projectForm]
      });
    }
    
    setProjectForm({
      name: "",
      description: "",
      technologies: [],
      startDate: "",
      endDate: "",
      current: false,
      url: "",
      github: "",
    });
    setShowProjectDialog(false);
    toast.success("Project added successfully!");
  };

  const handleEditProject = (index: number) => {
    setProjectForm(resumeData.projects[index]);
    setEditingProjectIndex(index);
    setShowProjectDialog(true);
  };

  const handleDeleteProject = (index: number) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((_, i) => i !== index)
    });
    toast.success("Project deleted");
  };

  // Certification management
  const handleAddCertification = () => {
    if (editingCertificationIndex !== null) {
      const updatedCertifications = [...resumeData.certifications];
      updatedCertifications[editingCertificationIndex] = certificationForm;
      setResumeData({ ...resumeData, certifications: updatedCertifications });
      setEditingCertificationIndex(null);
    } else {
      setResumeData({
        ...resumeData,
        certifications: [...resumeData.certifications, certificationForm]
      });
    }
    
    setCertificationForm({
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: "",
      url: "",
    });
    setShowCertificationDialog(false);
    toast.success("Certification added successfully!");
  };

  const handleEditCertification = (index: number) => {
    setCertificationForm(resumeData.certifications[index]);
    setEditingCertificationIndex(index);
    setShowCertificationDialog(true);
  };

  const handleDeleteCertification = (index: number) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter((_, i) => i !== index)
    });
    toast.success("Certification deleted");
  };

  // Language management
  const handleAddLanguage = () => {
    if (editingLanguageIndex !== null) {
      const updatedLanguages = [...resumeData.languages];
      updatedLanguages[editingLanguageIndex] = languageForm;
      setResumeData({ ...resumeData, languages: updatedLanguages });
      setEditingLanguageIndex(null);
    } else {
      setResumeData({
        ...resumeData,
        languages: [...resumeData.languages, languageForm]
      });
    }
    
    setLanguageForm({
      name: "",
      proficiency: "Intermediate",
    });
    setShowLanguageDialog(false);
    toast.success("Language added successfully!");
  };

  const handleEditLanguage = (index: number) => {
    setLanguageForm(resumeData.languages[index]);
    setEditingLanguageIndex(index);
    setShowLanguageDialog(true);
  };

  const handleDeleteLanguage = (index: number) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.filter((_, i) => i !== index)
    });
    toast.success("Language deleted");
  };

  // Achievement management
  const handleAddAchievement = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && achievementInput.trim()) {
      if (!resumeData.achievements.includes(achievementInput.trim())) {
        setResumeData({
          ...resumeData,
          achievements: [...resumeData.achievements, achievementInput.trim()]
        });
      }
      setAchievementInput("");









    }
  };

  const handleRemoveAchievement = (achievementToRemove: string) => {
    setResumeData({
      ...resumeData,
      achievements: resumeData.achievements.filter(achievement => achievement !== achievementToRemove)
    });
  };































  // Save functionality with better feedback
  const handleSave = async () => {
    if (!resumeData.personalInfo.fullName.trim()) {
      toast.error("Please add your name before saving");
      return;
    }

    setIsSaving(true);
    try {
      // Generate a unique ID for the resume
      const resumeId = resumeData.id || `resume_${Date.now()}`;
      const savedResume = { ...resumeData, id: resumeId, lastModified: new Date().toISOString() };
      
      // Save to localStorage (in production, this would go to your backend)
      const existingResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]');
      const resumeIndex = existingResumes.findIndex((r: any) => r.id === resumeId);
      
      if (resumeIndex >= 0) {
        existingResumes[resumeIndex] = savedResume;
        toast.success("Resume updated successfully!");
      } else {
        existingResumes.push(savedResume);
        toast.success("Resume saved successfully!");
      }
      
      localStorage.setItem('savedResumes', JSON.stringify(existingResumes));
      localStorage.setItem('currentResume', JSON.stringify(savedResume));
      
      setResumeData(savedResume);
      
      // Show where it's saved
      toast.success(
        `Resume saved locally! You can find it in your browser's saved resumes. 
        ${existingResumes.length} resume(s) total.`,
        { duration: 4000 }
      );
    } catch (error) {
      toast.error("Failed to save resume");
    } finally {
      setIsSaving(false);
    }
  };

  // Load saved resume on component mount
  React.useEffect(() => {
    const savedResume = localStorage.getItem('currentResume');
    if (savedResume) {
      try {
        const parsed = JSON.parse(savedResume);
        setResumeData(parsed);
      } catch (error) {
        console.error('Failed to load saved resume:', error);
      }
    }
  }, []);

  // AI Enhancement for experience descriptions
  const handleAIEnhanceExperience = async () => {
    if (!experienceForm.description.trim()) {
      toast.error("Please add some description first");
      return;
    }

    setIsGenerating(true);
    try {
      const suggestions = await aiService.optimizeJobDescription(
        experienceForm.description,
        experienceForm.position || "Professional"
      );

      if (suggestions.length > 0) {
        setExperienceForm({
          ...experienceForm,
          description: suggestions[0].content
        });
        toast.success("Description enhanced with AI!");
      }
    } catch (error) {
      toast.error("Failed to enhance description");

    } finally {
      setIsGenerating(false);
    }
  };

  // Preview with ATS Score
  const handlePreview = async () => {
    if (!showPreview) {
      // Calculate ATS score when entering preview mode
      try {
        const score = await aiService.getATSScore(resumeData);
        setATSScore(score);
        setShowATSScore(true);
      } catch (error) {
        toast.error("Failed to calculate ATS score");
      }
    }
    setShowPreview(!showPreview);
  };

  // Enhanced PDF Export with save dialog
  const handleExportPDF = () => {
    try {
      // Create a temporary link to trigger download with save dialog
      const fileName = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_") || "Resume"}.pdf`;
      
      // For now, we'll use the existing PDF export
      // In a real app, you might want to use the File System Access API for folder selection
      exportToPDF(resumeData);
      toast.success(`PDF saved as ${fileName}!`);
    } catch (error) {
      toast.error("Failed to export PDF");
    }
  };

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
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Draft
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handlePreview}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? "Edit" : "Preview"}
              </Button>
              <Button 
                size="sm"
                onClick={handleExportPDF}
              >
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
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>
                    
                    <Separator />
                    <h4 className="font-medium text-sm">Social Links & Portfolio</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.personalInfo.linkedin}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                linkedin: e.target.value,
                              },
                            })
                          }
                          placeholder="https://linkedin.com/in/johndoe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          value={resumeData.personalInfo.github}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                github: e.target.value,
                              },
                            })
                          }
                          placeholder="https://github.com/johndoe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="portfolio">Portfolio/Website</Label>
                        <Input
                          id="portfolio"
                          value={resumeData.personalInfo.portfolio}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                portfolio: e.target.value,
                              },
                            })
                          }
                          placeholder="https://johndoe.dev"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="codechef">CodeChef</Label>
                          <Input
                            id="codechef"
                            value={resumeData.personalInfo.codechef}
                            onChange={(e) =>
                              setResumeData({
                                ...resumeData,
                                personalInfo: {
                                  ...resumeData.personalInfo,
                                  codechef: e.target.value,
                                },
                              })
                            }
                            placeholder="https://codechef.com/users/johndoe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="codeforces">Codeforces</Label>
                          <Input
                            id="codeforces"
                            value={resumeData.personalInfo.codeforces}
                            onChange={(e) =>
                              setResumeData({
                                ...resumeData,
                                personalInfo: {
                                  ...resumeData.personalInfo,
                                  codeforces: e.target.value,
                                },
                              })
                            }
                            placeholder="https://codeforces.com/profile/johndoe"
                          />
                        </div>
                      </div>
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
                      onClick={handleAIEnhance}
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
                    <Dialog open={showExperienceDialog} onOpenChange={setShowExperienceDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Experience
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            {editingExperienceIndex !== null ? "Edit Experience" : "Add Experience"}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="position">Position</Label>
                              <Input
                                id="position"
                                value={experienceForm.position}
                                onChange={(e) => setExperienceForm({...experienceForm, position: e.target.value})}
                                placeholder="Software Engineer"
                              />
                            </div>
                            <div>
                              <Label htmlFor="company">Company</Label>
                              <Input
                                id="company"
                                value={experienceForm.company}
                                onChange={(e) => setExperienceForm({...experienceForm, company: e.target.value})}
                                placeholder="Tech Corp"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="startDate">Start Date</Label>
                              <Input
                                id="startDate"
                                type="month"
                                value={experienceForm.startDate}
                                onChange={(e) => setExperienceForm({...experienceForm, startDate: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="endDate">End Date</Label>
                              <Input
                                id="endDate"
                                type="month"
                                value={experienceForm.endDate}
                                onChange={(e) => setExperienceForm({...experienceForm, endDate: e.target.value})}
                                disabled={experienceForm.current}
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="current"
                              checked={experienceForm.current}
                              onCheckedChange={(checked) => setExperienceForm({...experienceForm, current: checked as boolean})}
                            />
                            <Label htmlFor="current">I currently work here</Label>
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={experienceForm.description}
                              onChange={(e) => setExperienceForm({...experienceForm, description: e.target.value})}
                              placeholder="Describe your responsibilities and achievements..."
                              rows={4}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={handleAIEnhanceExperience}
                              disabled={isGenerating}
                            >
                              {isGenerating ? (
                                <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                              ) : (
                                <Brain className="w-3 h-3 mr-2" />
                              )}
                              AI Enhance Description
                            </Button>
                          </div>
                          <Button onClick={handleAddExperience}>
                            {editingExperienceIndex !== null ? "Update Experience" : "Add Experience"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {/* Experience List */}
                    <div className="mt-4 space-y-3">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{exp.position}</h4>
                              <p className="text-sm text-muted-foreground">{exp.company}</p>
                              <p className="text-xs text-muted-foreground">
                                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                              </p>
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditExperience(index)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteExperience(index)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
                    <Dialog open={showEducationDialog} onOpenChange={setShowEducationDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Education
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            {editingEducationIndex !== null ? "Edit Education" : "Add Education"}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="school">School</Label>
                              <Input
                                id="school"
                                value={educationForm.school}
                                onChange={(e) => setEducationForm({...educationForm, school: e.target.value})}
                                placeholder="University of Technology"
                              />
                            </div>
                            <div>
                              <Label htmlFor="degree">Degree</Label>
                              <Input
                                id="degree"
                                value={educationForm.degree}
                                onChange={(e) => setEducationForm({...educationForm, degree: e.target.value})}
                                placeholder="Bachelor of Science"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="fieldOfStudy">Field of Study</Label>
                            <Input
                              id="fieldOfStudy"
                              value={educationForm.fieldOfStudy}
                              onChange={(e) => setEducationForm({...educationForm, fieldOfStudy: e.target.value})}
                              placeholder="Computer Science"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="startDate">Start Date</Label>
                              <Input
                                id="startDate"
                                type="month"
                                value={educationForm.startDate}
                                onChange={(e) => setEducationForm({...educationForm, startDate: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="endDate">End Date</Label>
                              <Input
                                id="endDate"
                                type="month"
                                value={educationForm.endDate}
                                onChange={(e) => setEducationForm({...educationForm, endDate: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="gpa">GPA (Optional)</Label>
                              <Input
                                id="gpa"
                                value={educationForm.gpa}
                                onChange={(e) => setEducationForm({...educationForm, gpa: e.target.value})}
                                placeholder="3.8"
                              />
                            </div>
                          </div>
                          <Button onClick={handleAddEducation}>
                            {editingEducationIndex !== null ? "Update Education" : "Add Education"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {/* Education List */}
                    <div className="mt-4 space-y-3">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{edu.degree} in {edu.fieldOfStudy}</h4>
                              <p className="text-sm text-muted-foreground">{edu.school}</p>
                              <p className="text-xs text-muted-foreground">
                                {edu.startDate} - {edu.endDate}
                                {edu.gpa && ` • GPA: ${edu.gpa}`}
                              </p>
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditEducation(index)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteEducation(index)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
                    <Input 
                      placeholder="Add a skill and press Enter" 
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleAddSkill}
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {resumeData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                          <button 
                            className="ml-1 hover:text-destructive"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Projects</CardTitle>
                    <CardDescription>
                      Personal or professional projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Project
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            {editingProjectIndex !== null ? "Edit Project" : "Add Project"}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <Label htmlFor="projectName">Project Name</Label>
                            <Input
                              id="projectName"
                              value={projectForm.name}
                              onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                              placeholder="My Awesome Project"
                            />
                          </div>
                          <div>
                            <Label htmlFor="projectDescription">Description</Label>
                            <Textarea
                              id="projectDescription"
                              value={projectForm.description}
                              onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                              placeholder="Describe what this project does..."
                              rows={3}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="projectUrl">Live URL (Optional)</Label>
                              <Input
                                id="projectUrl"
                                value={projectForm.url}
                                onChange={(e) => setProjectForm({...projectForm, url: e.target.value})}
                                placeholder="https://myproject.com"
                              />
                            </div>
                            <div>
                              <Label htmlFor="projectGithub">GitHub URL (Optional)</Label>
                              <Input
                                id="projectGithub"
                                value={projectForm.github}
                                onChange={(e) => setProjectForm({...projectForm, github: e.target.value})}
                                placeholder="https://github.com/user/project"
                              />
                            </div>
                          </div>
                          <Button onClick={handleAddProject}>
                            {editingProjectIndex !== null ? "Update Project" : "Add Project"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {/* Project List */}
                    <div className="mt-4 space-y-3">
                      {resumeData.projects.map((project, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{project.name}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditProject(index)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteProject(index)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Certifications</CardTitle>
                    <CardDescription>
                      Professional certifications and licenses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog open={showCertificationDialog} onOpenChange={setShowCertificationDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Certification
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            {editingCertificationIndex !== null ? "Edit Certification" : "Add Certification"}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="certName">Certification Name</Label>
                              <Input
                                id="certName"
                                value={certificationForm.name}
                                onChange={(e) => setCertificationForm({...certificationForm, name: e.target.value})}
                                placeholder="AWS Solutions Architect"
                              />
                            </div>
                            <div>
                              <Label htmlFor="certIssuer">Issuing Organization</Label>
                              <Input
                                id="certIssuer"
                                value={certificationForm.issuer}
                                onChange={(e) => setCertificationForm({...certificationForm, issuer: e.target.value})}
                                placeholder="Amazon Web Services"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="certDate">Issue Date</Label>
                              <Input
                                id="certDate"
                                type="month"
                                value={certificationForm.date}
                                onChange={(e) => setCertificationForm({...certificationForm, date: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="certExpiry">Expiry Date (Optional)</Label>
                              <Input
                                id="certExpiry"
                                type="month"
                                value={certificationForm.expiryDate}
                                onChange={(e) => setCertificationForm({...certificationForm, expiryDate: e.target.value})}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="credentialId">Credential ID (Optional)</Label>
                            <Input
                              id="credentialId"
                              value={certificationForm.credentialId}
                              onChange={(e) => setCertificationForm({...certificationForm, credentialId: e.target.value})}
                              placeholder="ABC123456"
                            />
                          </div>
                          <Button onClick={handleAddCertification}>
                            {editingCertificationIndex !== null ? "Update Certification" : "Add Certification"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {/* Certification List */}
                    <div className="mt-4 space-y-3">
                      {resumeData.certifications.map((cert, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{cert.name}</h4>
                              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                              <p className="text-xs text-muted-foreground">
                                {cert.date} {cert.expiryDate && `- ${cert.expiryDate}`}
                              </p>
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditCertification(index)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteCertification(index)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Languages</CardTitle>
                    <CardDescription>
                      Languages you speak and proficiency levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Language
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>
                            {editingLanguageIndex !== null ? "Edit Language" : "Add Language"}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <Label htmlFor="languageName">Language</Label>
                            <Input
                              id="languageName"
                              value={languageForm.name}
                              onChange={(e) => setLanguageForm({...languageForm, name: e.target.value})}
                              placeholder="Spanish"
                            />
                          </div>
                          <div>
                            <Label htmlFor="proficiency">Proficiency Level</Label>
                            <select
                              id="proficiency"
                              value={languageForm.proficiency}
                              onChange={(e) => setLanguageForm({...languageForm, proficiency: e.target.value})}
                              className="w-full p-2 border rounded-md"
                            >
                              <option value="Native">Native</option>
                              <option value="Fluent">Fluent</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Basic">Basic</option>
                            </select>
                          </div>
                          <Button onClick={handleAddLanguage}>
                            {editingLanguageIndex !== null ? "Update Language" : "Add Language"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {/* Language List */}
                    <div className="mt-4 space-y-2">
                      {resumeData.languages.map((lang, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                          <div>
                            <span className="font-medium">{lang.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">({lang.proficiency})</span>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditLanguage(index)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteLanguage(index)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Achievements</CardTitle>
                    <CardDescription>
                      Awards, honors, and notable accomplishments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input 
                      placeholder="Add an achievement and press Enter" 
                      value={achievementInput}
                      onChange={(e) => setAchievementInput(e.target.value)}
                      onKeyDown={handleAddAchievement}
                    />
                    <div className="mt-3 space-y-2">
                      {resumeData.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                          <span className="text-sm">{achievement}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAchievement(achievement)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Main Content - Resume Preview or ATS Score */}
        <div className="flex-1 bg-slate-50 overflow-y-auto">
          <div className="p-6">
            {showATSScore && atsScore ? (
              /* ATS Score Screen */
              <div className="max-w-2xl mx-auto">
                <Card className="bg-white shadow-lg">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">ATS Compatibility Score</CardTitle>
                    <CardDescription>
                      How well your resume performs with Applicant Tracking Systems
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Score Circle */}
                    <div className="flex justify-center">
                      <div className="relative w-32 h-32">
                        <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{atsScore.score}</div>
                            <div className="text-sm text-gray-500">/ 100</div>
                          </div>
                        </div>
                        <div 
                          className="absolute top-0 left-0 w-32 h-32 rounded-full border-8 border-blue-600 border-t-transparent transform -rotate-90"
                          style={{
                            clipPath: `polygon(50% 50%, 50% 0%, ${50 + (atsScore.score / 100) * 50}% 0%, ${50 + (atsScore.score / 100) * 50}% 100%, 50% 100%)`
                          }}
                        />
                      </div>
                    </div>

                    {/* Feedback */}
                    <div className="text-center">
                      <p className="text-lg font-medium text-gray-900">{atsScore.feedback}</p>
                    </div>

                    {/* Suggestions */}
                    {atsScore.suggestions.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Recommendations for Improvement:</h3>
                        <ul className="space-y-2">
                          {atsScore.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-700">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setShowATSScore(false)}
                      >
                        Back to Edit
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          setShowATSScore(false);
                          setShowPreview(true);
                        }}
                      >
                        View Resume Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Resume Preview */
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
                          {/* Social Links */}
                          <div className="flex justify-center space-x-4 text-sm">
                            {resumeData.personalInfo.linkedin && (
                              <a href={resumeData.personalInfo.linkedin} className="text-blue-600 hover:underline">
                                LinkedIn
                              </a>
                            )}
                            {resumeData.personalInfo.github && (
                              <a href={resumeData.personalInfo.github} className="text-blue-600 hover:underline">
                                GitHub
                              </a>
                            )}
                            {resumeData.personalInfo.portfolio && (
                              <a href={resumeData.personalInfo.portfolio} className="text-blue-600 hover:underline">
                                Portfolio
                              </a>
                            )}
                          </div>
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
                            {resumeData.experience.map((exp, index) => (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-semibold text-slate-900">{exp.position}</h3>
                                    <p className="text-slate-700">{exp.company}</p>
                                  </div>
                                  <p className="text-sm text-slate-600">
                                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                  </p>
                                </div>
                                {exp.description && (
                                  <p className="text-slate-700 text-sm leading-relaxed">
                                    {exp.description}
                                  </p>
                                )}
                              </div>
                            ))}
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
                            {resumeData.education.map((edu, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-semibold text-slate-900">
                                      {edu.degree} in {edu.fieldOfStudy}
                                    </h3>
                                    <p className="text-slate-700">{edu.school}</p>
                                  </div>
                                  <p className="text-sm text-slate-600">
                                    {edu.startDate} - {edu.endDate}
                                  </p>
                                </div>
                                {edu.gpa && (
                                  <p className="text-sm text-slate-600">GPA: {edu.gpa}</p>
                                )}
                              </div>
                            ))}
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

                      {/* Projects */}
                      {resumeData.projects.length > 0 && (
                        <div>
                          <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            Projects
                          </h2>
                          <div className="space-y-4">
                            {resumeData.projects.map((project, index) => (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-start">
                                  <h3 className="font-semibold text-slate-900">{project.name}</h3>
                                  <div className="flex space-x-2 text-sm">
                                    {project.url && (
                                      <a href={project.url} className="text-blue-600 hover:underline">
                                        Live
                                      </a>
                                    )}
                                    {project.github && (
                                      <a href={project.github} className="text-blue-600 hover:underline">
                                        GitHub
                                      </a>
                                    )}
                                  </div>
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                  {project.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Certifications */}
                      {resumeData.certifications.length > 0 && (
                        <div>
                          <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            Certifications
                          </h2>
                          <div className="space-y-3">
                            {resumeData.certifications.map((cert, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-semibold text-slate-900">{cert.name}</h3>
                                    <p className="text-slate-700">{cert.issuer}</p>
                                  </div>
                                  <p className="text-sm text-slate-600">
                                    {cert.date} {cert.expiryDate && `- ${cert.expiryDate}`}
                                  </p>
                                </div>
                                {cert.credentialId && (
                                  <p className="text-sm text-slate-600">ID: {cert.credentialId}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Languages */}
                      {resumeData.languages.length > 0 && (
                        <div>
                          <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            Languages
                          </h2>
                          <div className="flex flex-wrap gap-3">
                            {resumeData.languages.map((lang, index) => (
                              <div key={index} className="text-sm">
                                <span className="font-medium">{lang.name}</span>
                                <span className="text-slate-600 ml-1">({lang.proficiency})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Achievements */}
                      {resumeData.achievements.length > 0 && (
                        <div>
                          <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            Achievements
                          </h2>
                          <ul className="space-y-2">
                            {resumeData.achievements.map((achievement, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-slate-700 text-sm">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}