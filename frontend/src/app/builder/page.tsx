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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ATSScoreChecker } from "@/components/ATSScoreChecker";
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
  Edit3,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Linkedin,
} from "lucide-react";

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
}

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
  experience: Experience[];
  education: Education[];
  projects: Project[];
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
  const [newSkill, setNewSkill] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Experience dialog state
  const [isExperienceDialogOpen, setIsExperienceDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [experienceForm, setExperienceForm] = useState<Omit<Experience, 'id'>>({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  // Education dialog state
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [educationForm, setEducationForm] = useState<Omit<Education, 'id'>>({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    gpa: "",
  });

  // Project dialog state
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<Omit<Project, 'id'>>({
    name: "",
    description: "",
    technologies: [],
    link: "",
    startDate: "",
    endDate: "",
  });
  const [newTechnology, setNewTechnology] = useState("");

  // AI Enhancement
  const handleAIEnhance = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/enhance-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: resumeData.summary,
          experience: resumeData.experience,
          skills: resumeData.skills,
        }),
      });
      
      if (response.ok) {
        const { enhancedSummary } = await response.json();
        setResumeData(prev => ({
          ...prev,
          summary: enhancedSummary
        }));
      }
    } catch (error) {
      console.error('AI enhancement failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Skills Management
  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // AI Enhancement for Experience
  const enhanceExperienceDescription = async (experienceId?: string) => {
    setIsGenerating(true);
    try {
      const currentExp = experienceId
        ? resumeData.experience.find(exp => exp.id === experienceId)
        : experienceForm;

      const response = await fetch('/api/ai/enhance-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: currentExp?.description || '',
          position: currentExp?.position || '',
          company: currentExp?.company || '',
          skills: resumeData.skills,
        }),
      });

      if (response.ok) {
        const { enhancedDescription } = await response.json();

        if (experienceId) {
          // Update existing experience in resume data
          setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
              exp.id === experienceId
                ? { ...exp, description: enhancedDescription }
                : exp
            )
          }));
        } else {
          // Update form for new experience
          setExperienceForm(prev => ({
            ...prev,
            description: enhancedDescription
          }));
        }
      }
    } catch (error) {
      console.error('Experience enhancement failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Experience Management
  const openExperienceDialog = (experience?: Experience) => {
    if (experience) {
      setEditingExperience(experience);
      setExperienceForm(experience);
    } else {
      setEditingExperience(null);
      setExperienceForm({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      });
    }
    setIsExperienceDialogOpen(true);
  };

  const saveExperience = () => {
    if (editingExperience) {
      // Update existing
      setResumeData(prev => ({
        ...prev,
        experience: prev.experience.map(exp => 
          exp.id === editingExperience.id ? { ...experienceForm, id: editingExperience.id } : exp
        )
      }));
    } else {
      // Add new
      const newExperience: Experience = {
        ...experienceForm,
        id: Date.now().toString(),
      };
      setResumeData(prev => ({
        ...prev,
        experience: [...prev.experience, newExperience]
      }));
    }
    setIsExperienceDialogOpen(false);
  };

  const deleteExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  // Education Management
  const openEducationDialog = (education?: Education) => {
    if (education) {
      setEditingEducation(education);
      setEducationForm(education);
    } else {
      setEditingEducation(null);
      setEducationForm({
        school: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        gpa: "",
      });
    }
    setIsEducationDialogOpen(true);
  };

  const saveEducation = () => {
    if (editingEducation) {
      // Update existing
      setResumeData(prev => ({
        ...prev,
        education: prev.education.map(edu => 
          edu.id === editingEducation.id ? { ...educationForm, id: editingEducation.id } : edu
        )
      }));
    } else {
      // Add new
      const newEducation: Education = {
        ...educationForm,
        id: Date.now().toString(),
      };
      setResumeData(prev => ({
        ...prev,
        education: [...prev.education, newEducation]
      }));
    }
    setIsEducationDialogOpen(false);
  };

  const deleteEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // AI Enhancement for Projects
  const enhanceProjectDescription = async (projectId?: string) => {
    setIsGenerating(true);
    try {
      const currentProject = projectId
        ? resumeData.projects.find(proj => proj.id === projectId)
        : projectForm;

      const response = await fetch('/api/ai/enhance-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: currentProject?.description || '',
          name: currentProject?.name || '',
          technologies: currentProject?.technologies || [],
        }),
      });

      if (response.ok) {
        const { enhancedDescription } = await response.json();

        if (projectId) {
          // Update existing project in resume data
          setResumeData(prev => ({
            ...prev,
            projects: prev.projects.map(proj =>
              proj.id === projectId
                ? { ...proj, description: enhancedDescription }
                : proj
            )
          }));
        } else {
          // Update form for new project
          setProjectForm(prev => ({
            ...prev,
            description: enhancedDescription
          }));
        }
      }
    } catch (error) {
      console.error('Project enhancement failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // AI Enhancement for Skills
  const suggestSkills = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/suggest-skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentSkills: resumeData.skills,
          experience: resumeData.experience,
          projects: resumeData.projects,
        }),
      });

      if (response.ok) {
        const { suggestedSkills } = await response.json();

        // Add suggested skills that aren't already in the list
        const newSkills = suggestedSkills.filter(skill =>
          !resumeData.skills.some(existing =>
            existing.toLowerCase() === skill.toLowerCase()
          )
        );

        if (newSkills.length > 0) {
          setResumeData(prev => ({
            ...prev,
            skills: [...prev.skills, ...newSkills.slice(0, 5)] // Add up to 5 suggestions
          }));
        }
      }
    } catch (error) {
      console.error('Skills suggestion failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Project Management
  const openProjectDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setProjectForm(project);
    } else {
      setEditingProject(null);
      setProjectForm({
        name: "",
        description: "",
        technologies: [],
        link: "",
        startDate: "",
        endDate: "",
      });
    }
    setIsProjectDialogOpen(true);
  };

  const saveProject = () => {
    if (editingProject) {
      // Update existing
      setResumeData(prev => ({
        ...prev,
        projects: prev.projects.map(proj => 
          proj.id === editingProject.id ? { ...projectForm, id: editingProject.id } : proj
        )
      }));
    } else {
      // Add new
      const newProject: Project = {
        ...projectForm,
        id: Date.now().toString(),
      };
      setResumeData(prev => ({
        ...prev,
        projects: [...prev.projects, newProject]
      }));
    }
    setIsProjectDialogOpen(false);
  };

  const deleteProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !projectForm.technologies.includes(newTechnology.trim())) {
      setProjectForm(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology("");
    }
  };

  const removeTechnology = (tech: string) => {
    setProjectForm(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  // Save Draft
  const saveDraft = async () => {
    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `${resumeData.personalInfo.fullName || 'Untitled'} Resume`,
          userId: 'temp-user-id', // Replace with actual user ID
          ...resumeData.personalInfo,
          summary: resumeData.summary,
          skills: resumeData.skills,
        }),
      });
      
      if (response.ok) {
        alert('Draft saved successfully!');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save draft');
    }
  };

  // Download PDF
  const downloadPDF = async () => {
    try {
      const { exportToPDF } = await import('@/lib/pdf-export');
      const filename = `${resumeData.personalInfo.fullName || 'Resume'}_Resume.pdf`;
      await exportToPDF('resume-preview', filename);
    } catch (error) {
      console.error('PDF download failed:', error);
      alert('Failed to download PDF. Please try again.');
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
              <Button variant="outline" size="sm" onClick={saveDraft}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsPreviewOpen(true)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" onClick={downloadPDF}>
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
                    <div>
                      <Label htmlFor="website">Website (Optional)</Label>
                      <Input
                        id="website"
                        value={resumeData.personalInfo.website}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            personalInfo: {
                              ...resumeData.personalInfo,
                              website: e.target.value,
                            },
                          })
                        }
                        placeholder="https://johndoe.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
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
                      onClick={handleAIEnhance}
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
                    <div className="space-y-3">
                      {resumeData.experience.map((exp) => (
                        <div key={exp.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium">{exp.position}</h4>
                              <p className="text-sm text-slate-600">{exp.company}</p>
                              <p className="text-xs text-slate-500">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </p>
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => enhanceExperienceDescription(exp.id)}
                                disabled={isGenerating}
                                title="AI Enhance"
                              >
                                {isGenerating ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <Brain className="w-3 h-3" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openExperienceDialog(exp)}
                              >
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteExperience(exp.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          {exp.description && (
                            <p className="text-sm text-slate-700 line-clamp-2">{exp.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-3" onClick={() => openExperienceDialog()}>
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
                    <div className="space-y-3">
                      {resumeData.education.map((edu) => (
                        <div key={edu.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium">{edu.degree}</h4>
                              <p className="text-sm text-slate-600">{edu.school}</p>
                              <p className="text-xs text-slate-500">
                                {edu.fieldOfStudy} | {edu.startDate} - {edu.endDate}
                              </p>
                              {edu.gpa && (
                                <p className="text-xs text-slate-500">GPA: {edu.gpa}</p>
                              )}
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEducationDialog(edu)}
                              >
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteEducation(edu.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-3" onClick={() => openEducationDialog()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Projects</CardTitle>
                    <CardDescription>
                      Notable projects you've worked on
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {resumeData.projects.map((project) => (
                        <div key={project.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium">{project.name}</h4>
                              <p className="text-sm text-slate-600 line-clamp-2">{project.description}</p>
                              <p className="text-xs text-slate-500">
                                {project.startDate} - {project.endDate}
                              </p>
                              {project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {project.technologies.slice(0, 3).map((tech, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                  {project.technologies.length > 3 && (
                                    <span className="text-xs text-slate-500">+{project.technologies.length - 3}</span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => enhanceProjectDescription(project.id)}
                                disabled={isGenerating}
                                title="AI Enhance"
                              >
                                {isGenerating ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <Brain className="w-3 h-3" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openProjectDialog(project)}
                              >
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteProject(project.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-3" onClick={() => openProjectDialog()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
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
                    <div className="flex gap-2 mb-3">
                      <Input
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addSkill();
                          }
                        }}
                      />
                      <Button onClick={addSkill} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="mb-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        disabled={isGenerating}
                        onClick={suggestSkills}
                      >
                        {isGenerating ? (
                          <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                        ) : (
                          <Brain className="w-3 h-3 mr-2" />
                        )}
                        AI Suggest Skills
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="cursor-pointer">
                          {skill}
                          <button
                            className="ml-1 hover:text-destructive"
                            onClick={() => removeSkill(skill)}
                          >
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
          <div className="max-w-2xl mx-auto space-y-6">
            <Card id="resume-preview" className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-slate-900">
                      {resumeData.personalInfo.fullName || "Your Name"}
                    </h1>
                    <div className="text-slate-600 space-y-1">
                      <div className="flex items-center justify-center gap-4 flex-wrap">
                        {resumeData.personalInfo.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span className="text-sm">{resumeData.personalInfo.email}</span>
                          </div>
                        )}
                        {resumeData.personalInfo.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span className="text-sm">{resumeData.personalInfo.phone}</span>
                          </div>
                        )}
                        {resumeData.personalInfo.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="text-sm">{resumeData.personalInfo.location}</span>
                          </div>
                        )}
                      </div>
                      {(resumeData.personalInfo.website || resumeData.personalInfo.linkedin) && (
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                          {resumeData.personalInfo.website && (
                            <div className="flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              <span className="text-sm">{resumeData.personalInfo.website}</span>
                            </div>
                          )}
                          {resumeData.personalInfo.linkedin && (
                            <div className="flex items-center gap-1">
                              <Linkedin className="w-3 h-3" />
                              <span className="text-sm">{resumeData.personalInfo.linkedin}</span>
                            </div>
                          )}
                        </div>
                      )}
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
                  {resumeData.experience.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 mb-3">
                        Experience
                      </h2>
                      <div className="space-y-4">
                        {resumeData.experience.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h3 className="font-semibold text-slate-900">{exp.position}</h3>
                                <p className="text-slate-600">{exp.company}</p>
                              </div>
                              <p className="text-sm text-slate-500">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </p>
                            </div>
                            {exp.description && (
                              <p className="text-slate-700 text-sm mt-2">{exp.description}</p>
                            )}
                          </div>
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
                        {resumeData.projects.map((project) => (
                          <div key={project.id}>
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h3 className="font-semibold text-slate-900">{project.name}</h3>
                                {project.link && (
                                  <a 
                                    href={project.link} 
                                    className="text-blue-600 text-sm hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {project.link}
                                  </a>
                                )}
                              </div>
                              <p className="text-sm text-slate-500">
                                {project.startDate} - {project.endDate}
                              </p>
                            </div>
                            <p className="text-slate-700 text-sm">{project.description}</p>
                            {project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {project.technologies.map((tech, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {resumeData.education.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 mb-3">
                        Education
                      </h2>
                      <div className="space-y-3">
                        {resumeData.education.map((edu) => (
                          <div key={edu.id}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                                <p className="text-slate-600">{edu.school}</p>
                                <p className="text-slate-600 text-sm">{edu.fieldOfStudy}</p>
                                {edu.gpa && (
                                  <p className="text-slate-500 text-sm">GPA: {edu.gpa}</p>
                                )}
                              </div>
                              <p className="text-sm text-slate-500">
                                {edu.startDate} - {edu.endDate}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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

            {/* ATS Score Checker */}
            <ATSScoreChecker resumeData={resumeData} />
          </div>
        </div>
      </div>

      {/* Experience Dialog */}
      <Dialog open={isExperienceDialogOpen} onOpenChange={setIsExperienceDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingExperience ? "Edit Experience" : "Add Experience"}
            </DialogTitle>
            <DialogDescription>
              Add details about your work experience
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={experienceForm.company}
                  onChange={(e) => setExperienceForm(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Company Name"
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={experienceForm.position}
                  onChange={(e) => setExperienceForm(prev => ({ ...prev, position: e.target.value }))}
                  placeholder="Job Title"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  value={experienceForm.startDate}
                  onChange={(e) => setExperienceForm(prev => ({ ...prev, startDate: e.target.value }))}
                  placeholder="MM/YYYY"
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  value={experienceForm.endDate}
                  onChange={(e) => setExperienceForm(prev => ({ ...prev, endDate: e.target.value }))}
                  placeholder="MM/YYYY"
                  disabled={experienceForm.current}
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id="current"
                  checked={experienceForm.current}
                  onCheckedChange={(checked) => 
                    setExperienceForm(prev => ({ 
                      ...prev, 
                      current: checked as boolean,
                      endDate: checked ? "" : prev.endDate
                    }))
                  }
                />
                <Label htmlFor="current">Current Position</Label>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="description">Description</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isGenerating}
                  onClick={() => enhanceExperienceDescription()}
                >
                  {isGenerating ? (
                    <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                  ) : (
                    <Brain className="w-3 h-3 mr-2" />
                  )}
                  AI Enhance
                </Button>
              </div>
              <Textarea
                id="description"
                value={experienceForm.description}
                onChange={(e) => setExperienceForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your responsibilities and achievements..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExperienceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveExperience}>
              {editingExperience ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Education Dialog */}
      <Dialog open={isEducationDialogOpen} onOpenChange={setIsEducationDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingEducation ? "Edit Education" : "Add Education"}
            </DialogTitle>
            <DialogDescription>
              Add details about your education
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="school">School</Label>
                <Input
                  id="school"
                  value={educationForm.school}
                  onChange={(e) => setEducationForm(prev => ({ ...prev, school: e.target.value }))}
                  placeholder="University Name"
                />
              </div>
              <div>
                <Label htmlFor="degree">Degree</Label>
                <Input
                  id="degree"
                  value={educationForm.degree}
                  onChange={(e) => setEducationForm(prev => ({ ...prev, degree: e.target.value }))}
                  placeholder="Bachelor's, Master's, etc."
                />
              </div>
            </div>
            <div>
              <Label htmlFor="fieldOfStudy">Field of Study</Label>
              <Input
                id="fieldOfStudy"
                value={educationForm.fieldOfStudy}
                onChange={(e) => setEducationForm(prev => ({ ...prev, fieldOfStudy: e.target.value }))}
                placeholder="Computer Science, Business, etc."
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="eduStartDate">Start Date</Label>
                <Input
                  id="eduStartDate"
                  value={educationForm.startDate}
                  onChange={(e) => setEducationForm(prev => ({ ...prev, startDate: e.target.value }))}
                  placeholder="MM/YYYY"
                />
              </div>
              <div>
                <Label htmlFor="eduEndDate">End Date</Label>
                <Input
                  id="eduEndDate"
                  value={educationForm.endDate}
                  onChange={(e) => setEducationForm(prev => ({ ...prev, endDate: e.target.value }))}
                  placeholder="MM/YYYY"
                />
              </div>
              <div>
                <Label htmlFor="gpa">GPA (Optional)</Label>
                <Input
                  id="gpa"
                  value={educationForm.gpa}
                  onChange={(e) => setEducationForm(prev => ({ ...prev, gpa: e.target.value }))}
                  placeholder="3.8"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEducationDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEducation}>
              {editingEducation ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Project Dialog */}
      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Edit Project" : "Add Project"}
            </DialogTitle>
            <DialogDescription>
              Add details about your project
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={projectForm.name}
                onChange={(e) => setProjectForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="My Awesome Project"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="projectDescription">Description</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isGenerating}
                  onClick={() => enhanceProjectDescription()}
                >
                  {isGenerating ? (
                    <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                  ) : (
                    <Brain className="w-3 h-3 mr-2" />
                  )}
                  AI Enhance
                </Button>
              </div>
              <Textarea
                id="projectDescription"
                value={projectForm.description}
                onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what the project does and your role..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="projectLink">Project Link (Optional)</Label>
              <Input
                id="projectLink"
                value={projectForm.link}
                onChange={(e) => setProjectForm(prev => ({ ...prev, link: e.target.value }))}
                placeholder="https://github.com/user/project"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectStartDate">Start Date</Label>
                <Input
                  id="projectStartDate"
                  value={projectForm.startDate}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, startDate: e.target.value }))}
                  placeholder="MM/YYYY"
                />
              </div>
              <div>
                <Label htmlFor="projectEndDate">End Date</Label>
                <Input
                  id="projectEndDate"
                  value={projectForm.endDate}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, endDate: e.target.value }))}
                  placeholder="MM/YYYY"
                />
              </div>
            </div>
            <div>
              <Label>Technologies Used</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add a technology"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addTechnology();
                    }
                  }}
                />
                <Button onClick={addTechnology} size="sm" type="button">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {projectForm.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer">
                    {tech}
                    <button
                      className="ml-1 hover:text-destructive"
                      onClick={() => removeTechnology(tech)}
                      type="button"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProjectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveProject}>
              {editingProject ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resume Preview</DialogTitle>
            <DialogDescription>
              This is how your resume will look when printed or exported
            </DialogDescription>
          </DialogHeader>
          <div className="bg-white p-8 shadow-lg">
            {/* Same resume content as in the main preview */}
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-slate-900">
                  {resumeData.personalInfo.fullName || "Your Name"}
                </h1>
                <div className="text-slate-600 space-y-1">
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    {resumeData.personalInfo.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span className="text-sm">{resumeData.personalInfo.email}</span>
                      </div>
                    )}
                    {resumeData.personalInfo.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span className="text-sm">{resumeData.personalInfo.phone}</span>
                      </div>
                    )}
                    {resumeData.personalInfo.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">{resumeData.personalInfo.location}</span>
                      </div>
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
              {resumeData.experience.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-3">
                    Experience
                  </h2>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-semibold text-slate-900">{exp.position}</h3>
                            <p className="text-slate-600">{exp.company}</p>
                          </div>
                          <p className="text-sm text-slate-500">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </p>
                        </div>
                        {exp.description && (
                          <p className="text-slate-700 text-sm mt-2">{exp.description}</p>
                        )}
                      </div>
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
                    {resumeData.projects.map((project) => (
                      <div key={project.id}>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-semibold text-slate-900">{project.name}</h3>
                            {project.link && (
                              <a 
                                href={project.link} 
                                className="text-blue-600 text-sm hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {project.link}
                              </a>
                            )}
                          </div>
                          <p className="text-sm text-slate-500">
                            {project.startDate} - {project.endDate}
                          </p>
                        </div>
                        <p className="text-slate-700 text-sm">{project.description}</p>
                        {project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-3">
                    Education
                  </h2>
                  <div className="space-y-3">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                            <p className="text-slate-600">{edu.school}</p>
                            <p className="text-slate-600 text-sm">{edu.fieldOfStudy}</p>
                            {edu.gpa && (
                              <p className="text-slate-500 text-sm">GPA: {edu.gpa}</p>
                            )}
                          </div>
                          <p className="text-sm text-slate-500">
                            {edu.startDate} - {edu.endDate}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button onClick={downloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
