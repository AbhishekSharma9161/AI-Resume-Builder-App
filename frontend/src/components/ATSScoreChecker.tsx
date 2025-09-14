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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Target, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Loader2,
  TrendingUp,
  Award,
  FileCheck
} from "lucide-react";

interface ATSScoreResult {
  score: number;
  maxScore: number;
  percentage: number;
  grade: string;
  feedback: string[];
  suggestions: string[];
}

interface ATSScoreCheckerProps {
  resumeData: {
    personalInfo: any;
    summary: string;
    experience: any[];
    education: any[];
    projects: any[];
    skills: string[];
  };
}

export function ATSScoreChecker({ resumeData }: ATSScoreCheckerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [atsResult, setATSResult] = useState<ATSScoreResult | null>(null);

  const calculateATSScore = async () => {
    setIsCalculating(true);
    try {
      const response = await fetch('/api/ai/calculate-ats-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });

      if (response.ok) {
        const result = await response.json();
        setATSResult(result);
      } else {
        throw new Error('Failed to calculate ATS score');
      }
    } catch (error) {
      console.error('ATS score calculation failed:', error);
      alert('Failed to calculate ATS score. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !atsResult) {
      calculateATSScore();
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getGradeColor = (grade: string) => {
    const colors = {
      'A': 'bg-green-100 text-green-800 border-green-300',
      'B': 'bg-blue-100 text-blue-800 border-blue-300',
      'C': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'D': 'bg-orange-100 text-orange-800 border-orange-300',
      'F': 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[grade as keyof typeof colors] || colors['F'];
  };

  const getFeedbackIcon = (feedback: string) => {
    if (feedback.startsWith('✅')) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (feedback.startsWith('⚠️')) return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    if (feedback.startsWith('❌')) return <XCircle className="w-4 h-4 text-red-600" />;
    return <FileCheck className="w-4 h-4 text-slate-600" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-dashed border-blue-300 hover:border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-slate-900">Check ATS Score</h3>
                <p className="text-sm text-slate-600">Analyze resume compatibility</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>ATS Score Analysis</span>
          </DialogTitle>
          <DialogDescription>
            Applicant Tracking System (ATS) compatibility analysis for your resume
          </DialogDescription>
        </DialogHeader>

        {isCalculating ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
              <p className="text-slate-600">Analyzing your resume...</p>
            </div>
          </div>
        ) : atsResult ? (
          <div className="space-y-6">
            {/* Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(atsResult.percentage)}`}>
                      {atsResult.percentage}%
                    </div>
                    <p className="text-sm text-slate-600">ATS Score</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Badge className={`text-2xl font-bold px-4 py-2 ${getGradeColor(atsResult.grade)}`}>
                      {atsResult.grade}
                    </Badge>
                    <p className="text-sm text-slate-600 mt-2">Grade</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">
                      {atsResult.score}/{atsResult.maxScore}
                    </div>
                    <p className="text-sm text-slate-600">Points</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Overall ATS Compatibility</span>
                    <span className={getScoreColor(atsResult.percentage)}>
                      {atsResult.percentage}%
                    </span>
                  </div>
                  <Progress value={atsResult.percentage} className="h-3" />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Current Status</span>
                  </CardTitle>
                  <CardDescription>
                    What's working well in your resume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {atsResult.feedback.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        {getFeedbackIcon(item)}
                        <span className="text-sm text-slate-700">
                          {item.replace(/^[✅⚠️❌]\s*/, '')}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span>Improvement Suggestions</span>
                  </CardTitle>
                  <CardDescription>
                    How to boost your ATS score
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {atsResult.suggestions.length > 0 ? (
                      atsResult.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-slate-700">{suggestion}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">
                          Excellent! Your resume is well-optimized for ATS systems.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ATS Tips */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">💡 ATS Pro Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                  <div>
                    <strong>Format:</strong> Use standard headings, bullet points, and avoid complex layouts
                  </div>
                  <div>
                    <strong>Keywords:</strong> Include relevant skills and industry terms
                  </div>
                  <div>
                    <strong>Sections:</strong> Include all standard sections (contact, summary, experience, education)
                  </div>
                  <div>
                    <strong>Metrics:</strong> Quantify achievements with numbers and percentages
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Button */}
            <div className="flex justify-center pt-4">
              <Button 
                onClick={calculateATSScore}
                disabled={isCalculating}
                size="lg"
              >
                {isCalculating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Target className="w-4 h-4 mr-2" />
                )}
                Recalculate Score
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Click "Check ATS Score" to analyze your resume</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
