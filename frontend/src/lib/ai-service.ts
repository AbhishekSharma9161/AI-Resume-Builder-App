// AI Service for Resume Content Suggestions - Hugging Face Only
import { HfInference } from '@huggingface/inference';

interface AIJobSuggestion {
  content: string;
  reason: string;
  confidence: number;
}

interface AISkillSuggestion {
  skill: string;
  relevance: number;
  category: string;
}

export class AIService {
  private static instance: AIService;
  private hf: HfInference | null = null;
  private readonly models = {
    textGeneration: 'google/flan-t5-large',
    textClassification: 'microsoft/DialoGPT-medium',
    summarization: 'facebook/bart-large-cnn'
  };

  constructor() {
    // Initialize Hugging Face client
    const apiToken = process.env.NEXT_PUBLIC_HUGGINGFACE_API_TOKEN;

    if (apiToken && apiToken !== 'your_huggingface_api_token_here') {
      try {
        this.hf = new HfInference(apiToken);
        console.log('✅ Hugging Face AI service initialized');
      } catch (error) {
        console.warn('❌ Failed to initialize Hugging Face client:', error);
        this.hf = null;
      }
    }
    // No token configured — AI features will use built-in templates as fallback
  }

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  // Helper function to calculate years of experience
  private calculateExperienceYears(experienceData: any[]): number {
    if (!experienceData || experienceData.length === 0) {
      return 1; // Default to 1 year minimum
    }

    let totalYears = 0;
    const currentYear = new Date().getFullYear();

    experienceData.forEach((exp) => {
      if (exp.startDate) {
        const startYear = new Date(exp.startDate).getFullYear();
        const endYear = exp.current ? currentYear : (exp.endDate ? new Date(exp.endDate).getFullYear() : currentYear);
        const yearsAtJob = Math.max(endYear - startYear, 0.5);
        totalYears += yearsAtJob;
      } else {
        totalYears += 1;
      }
    });

    return Math.min(Math.max(Math.round(totalYears), 1), 20);
  }

  // Helper function to ensure minimum experience
  private ensureMinimumExperience(text: string): string {
    return text.replace(/\b0\+/g, '1+');
  }

  // Generate professional summary using Hugging Face
  async generateSummary(
    jobTitle: string,
    experience: string[],
    skills: string[],
    experienceData?: any[]
  ): Promise<AIJobSuggestion[]> {
    // Calculate experience years
    let experienceYears: number;
    if (experienceData && experienceData.length > 0) {
      experienceYears = this.calculateExperienceYears(experienceData);
    } else {
      experienceYears = Math.max(experience.length, 1);
    }

    const topSkills = skills.slice(0, 5).join(", ");

    // If Hugging Face is available, use it
    if (this.hf) {
      try {
        const prompts = [
          `Write a professional resume summary for a ${jobTitle} with ${experienceYears}+ years of experience. Skills: ${topSkills}. Focus on achievements and leadership.`,
          `Create a results-driven resume summary for a ${jobTitle} with ${experienceYears}+ years of experience. Skills: ${topSkills}. Emphasize quantifiable results.`,
          `Generate an innovative resume summary for a ${jobTitle} with ${experienceYears}+ years of experience. Skills: ${topSkills}. Highlight technical expertise and problem-solving.`
        ];

        const suggestions: AIJobSuggestion[] = [];

        for (let i = 0; i < prompts.length; i++) {
          try {
            const response = await this.hf.textGeneration({
              model: this.models.textGeneration,
              inputs: prompts[i],
              parameters: {
                max_new_tokens: 150,
                temperature: 0.7,
                do_sample: true,
                top_p: 0.9,
                repetition_penalty: 1.1
              }
            });

            let generatedText = response.generated_text || '';
            generatedText = generatedText.replace(prompts[i], '').trim();
            generatedText = this.ensureMinimumExperience(generatedText);

            if (generatedText.length > 20) {
              suggestions.push({
                content: generatedText,
                reason: `🤖 AI-generated summary ${i === 0 ? 'focusing on leadership' : i === 1 ? 'emphasizing results' : 'highlighting innovation'}`,
                confidence: 0.85 + (i * 0.05)
              });
            }
          } catch (error) {
            console.warn(`Failed to generate AI summary ${i + 1}:`, error);
          }
        }

        if (suggestions.length > 0) {
          return suggestions;
        }
      } catch (error) {
        console.warn('Hugging Face AI generation failed:', error);
      }
    }

    // Fallback: High-quality templates
    return [
      {
        content: this.ensureMinimumExperience(`Experienced ${jobTitle} with ${experienceYears}+ years of proven success in delivering high-quality solutions. Expertise in ${topSkills}, with a track record of improving team productivity and driving project success.`),
        reason: "Professional template emphasizing experience and key skills",
        confidence: 0.9,
      },
      {
        content: this.ensureMinimumExperience(`Results-driven ${jobTitle} with ${experienceYears}+ years specializing in ${topSkills}. Demonstrated ability to lead cross-functional teams and deliver complex projects on time and within budget.`),
        reason: "Template focusing on leadership and results",
        confidence: 0.85,
      },
      {
        content: this.ensureMinimumExperience(`Innovative ${jobTitle} with ${experienceYears}+ years of strong background in ${topSkills}. Passionate about creating efficient solutions and mentoring junior team members.`),
        reason: "Template highlighting innovation and mentorship",
        confidence: 0.8,
      },
    ];
  }

  // Optimize job descriptions using Hugging Face
  async optimizeJobDescription(
    description: string,
    jobTitle: string,
  ): Promise<AIJobSuggestion[]> {
    // If Hugging Face is available, use it
    if (this.hf) {
      try {
        const prompts = [
          `Rewrite this job description to be more professional and ATS-friendly. Add quantifiable achievements: "${description}"`,
          `Transform this job description into bullet points with action verbs and metrics: "${description}"`,
          `Optimize this job description for a ${jobTitle} role with specific accomplishments: "${description}"`
        ];

        const suggestions: AIJobSuggestion[] = [];

        for (let i = 0; i < prompts.length; i++) {
          try {
            const response = await this.hf.textGeneration({
              model: this.models.textGeneration,
              inputs: prompts[i],
              parameters: {
                max_new_tokens: 200,
                temperature: 0.6,
                do_sample: true,
                top_p: 0.8
              }
            });

            let optimizedText = response.generated_text || '';
            optimizedText = optimizedText.replace(prompts[i], '').trim();

            if (optimizedText.length > 20) {
              suggestions.push({
                content: optimizedText,
                reason: `🤖 AI-optimized ${i === 0 ? 'for ATS compatibility' : i === 1 ? 'with bullet points' : 'with accomplishments'}`,
                confidence: 0.8 + (i * 0.05)
              });
            }
          } catch (error) {
            console.warn(`Failed to optimize description ${i + 1}:`, error);
          }
        }

        if (suggestions.length > 0) {
          return suggestions;
        }
      } catch (error) {
        console.warn('Hugging Face optimization failed:', error);
      }
    }

    // Fallback: Template optimization
    let optimizedContent = description;

    if (!description.includes("•") && !description.includes("-")) {
      optimizedContent = description
        .split(".")
        .filter((sentence) => sentence.trim().length > 0)
        .map((sentence) => `• ${sentence.trim().replace(/^(I |My |The )/, "")}`)
        .join("\n");
    }

    const achievementTemplates = {
      "Software Engineer": [
        "• Improved application performance by 40% through code optimization",
        "• Reduced bug reports by 60% by implementing comprehensive testing",
        "• Collaborated with 5+ team members to deliver features 2 weeks ahead of schedule",
      ],
      "Product Manager": [
        "• Increased user engagement by 35% through data-driven feature prioritization",
        "• Led cross-functional teams of 8+ members across design, engineering, and marketing",
        "• Reduced time-to-market by 25% by streamlining product development processes",
      ],
      Designer: [
        "• Improved user satisfaction by 45% through user-centered design improvements",
        "• Reduced design-to-development handoff time by 30% with detailed design systems",
        "• Increased conversion rates by 20% through A/B testing and iterative design",
      ],
    };

    const relevantAchievements = achievementTemplates[
      jobTitle as keyof typeof achievementTemplates
    ] || [
        "• Exceeded performance targets by 25% through strategic planning and execution",
        "• Collaborated with cross-functional teams to deliver projects ahead of schedule",
        "• Implemented process improvements that increased efficiency by 30%",
      ];

    return [
      {
        content: optimizedContent + "\n" + relevantAchievements[0],
        reason: "Template optimization with quantifiable achievements",
        confidence: 0.92,
      },
      {
        content: optimizedContent + "\n" + relevantAchievements[1],
        reason: "Template enhancement with team collaboration metrics",
        confidence: 0.88,
      },
      {
        content: optimizedContent + "\n" + relevantAchievements[2],
        reason: "Template improvement with efficiency metrics",
        confidence: 0.85,
      },
    ];
  }

  // Generate skill suggestions using Hugging Face
  async suggestSkills(
    jobTitle: string,
    currentSkills: string[],
  ): Promise<AISkillSuggestion[]> {
    // If Hugging Face is available, use it
    if (this.hf) {
      try {
        const prompt = `List 8 relevant professional skills for a ${jobTitle} position. Current skills: ${currentSkills.join(", ")}. Suggest new complementary skills.`;

        const response = await this.hf.textGeneration({
          model: this.models.textGeneration,
          inputs: prompt,
          parameters: {
            max_new_tokens: 100,
            temperature: 0.5,
            do_sample: true
          }
        });

        let skillsText = response.generated_text || '';
        skillsText = skillsText.replace(prompt, '').trim();

        const suggestedSkills = this.parseSkillsFromText(skillsText, currentSkills);

        if (suggestedSkills.length > 0) {
          return suggestedSkills;
        }
      } catch (error) {
        console.warn('Hugging Face skill suggestion failed:', error);
      }
    }

    // Fallback: Template skills
    const skillDatabase = {
      "Software Engineer": [
        { skill: "JavaScript", relevance: 0.95, category: "Programming" },
        { skill: "React", relevance: 0.9, category: "Frontend" },
        { skill: "Node.js", relevance: 0.85, category: "Backend" },
        { skill: "Git", relevance: 0.9, category: "Tools" },
        { skill: "Docker", relevance: 0.8, category: "DevOps" },
        { skill: "TypeScript", relevance: 0.85, category: "Programming" },
        { skill: "AWS", relevance: 0.75, category: "Cloud" },
        { skill: "REST APIs", relevance: 0.8, category: "Backend" },
      ],
      "Product Manager": [
        { skill: "Agile/Scrum", relevance: 0.95, category: "Methodology" },
        { skill: "Product Strategy", relevance: 0.9, category: "Strategy" },
        { skill: "Data Analysis", relevance: 0.85, category: "Analytics" },
        { skill: "User Research", relevance: 0.8, category: "Research" },
        { skill: "Roadmap Planning", relevance: 0.85, category: "Planning" },
        { skill: "SQL", relevance: 0.7, category: "Technical" },
        { skill: "A/B Testing", relevance: 0.75, category: "Analytics" },
      ],
      Designer: [
        { skill: "Figma", relevance: 0.95, category: "Design Tools" },
        { skill: "Adobe Creative Suite", relevance: 0.9, category: "Design Tools" },
        { skill: "User Experience (UX)", relevance: 0.9, category: "Design" },
        { skill: "User Interface (UI)", relevance: 0.85, category: "Design" },
        { skill: "Prototyping", relevance: 0.8, category: "Design" },
        { skill: "Design Systems", relevance: 0.75, category: "Design" },
        { skill: "HTML/CSS", relevance: 0.7, category: "Technical" },
      ],
    };

    const relevantSkills = skillDatabase[jobTitle as keyof typeof skillDatabase] || [
      { skill: "Communication", relevance: 0.9, category: "Soft Skills" },
      { skill: "Problem Solving", relevance: 0.85, category: "Soft Skills" },
      { skill: "Project Management", relevance: 0.8, category: "Management" },
      { skill: "Team Leadership", relevance: 0.75, category: "Leadership" },
      { skill: "Time Management", relevance: 0.7, category: "Soft Skills" },
    ];

    return relevantSkills.filter(
      (skill) =>
        !currentSkills.some(
          (existing) =>
            existing.toLowerCase().includes(skill.skill.toLowerCase()) ||
            skill.skill.toLowerCase().includes(existing.toLowerCase()),
        ),
    ).slice(0, 8);
  }

  // Helper method to parse skills from AI-generated text
  private parseSkillsFromText(text: string, currentSkills: string[]): AISkillSuggestion[] {
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const skills: AISkillSuggestion[] = [];

    lines.forEach((line, index) => {
      const skillMatch = line.match(/(?:\d+\.?\s*)?([A-Za-z\s\/\-\+]+)/);
      if (skillMatch) {
        const skillName = skillMatch[1].trim();

        if (skillName.length > 2 && skillName.length < 30 &&
          !currentSkills.some(existing =>
            existing.toLowerCase().includes(skillName.toLowerCase()) ||
            skillName.toLowerCase().includes(existing.toLowerCase())
          )) {

          skills.push({
            skill: skillName,
            relevance: Math.max(0.9 - (index * 0.1), 0.5),
            category: this.categorizeSkill(skillName)
          });
        }
      }
    });

    return skills.slice(0, 8);
  }

  private categorizeSkill(skill: string): string {
    const skillLower = skill.toLowerCase();

    if (skillLower.includes('javascript') || skillLower.includes('python') ||
      skillLower.includes('java') || skillLower.includes('programming')) {
      return 'Programming';
    } else if (skillLower.includes('react') || skillLower.includes('vue') ||
      skillLower.includes('angular') || skillLower.includes('frontend')) {
      return 'Frontend';
    } else if (skillLower.includes('node') || skillLower.includes('backend') ||
      skillLower.includes('api') || skillLower.includes('database')) {
      return 'Backend';
    } else if (skillLower.includes('aws') || skillLower.includes('cloud') ||
      skillLower.includes('docker') || skillLower.includes('devops')) {
      return 'Cloud/DevOps';
    } else if (skillLower.includes('management') || skillLower.includes('leadership')) {
      return 'Management';
    } else {
      return 'General';
    }
  }

  // ATS Score calculation
  async getATSScore(
    resumeData: any,
  ): Promise<{ score: number; suggestions: string[]; feedback: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const suggestions: string[] = [];
    let score = 95;

    // Check required fields
    if (!resumeData.personalInfo.fullName) {
      suggestions.push("Add your full name");
      score -= 15;
    }

    if (!resumeData.personalInfo.email) {
      suggestions.push("Add your email address");
      score -= 10;
    }

    if (!resumeData.personalInfo.phone) {
      suggestions.push("Add your phone number");
      score -= 5;
    }

    if (!resumeData.summary) {
      suggestions.push("Add a professional summary");
      score -= 15;
    }

    if (resumeData.experience.length === 0) {
      suggestions.push("Add work experience");
      score -= 25;
    }

    if (resumeData.skills.length < 5) {
      suggestions.push("Add more relevant skills (aim for 8-12)");
      score -= 10;
    }

    if (resumeData.skills.length > 15) {
      suggestions.push("Consider reducing skills to most relevant ones");
      score -= 5;
    }

    // Check for quantifiable achievements
    const hasMetrics = resumeData.experience.some(
      (exp: any) =>
        exp.description && /\d+(%|%|\$|x|times)/.test(exp.description),
    );

    if (!hasMetrics) {
      suggestions.push(
        "Add quantifiable achievements (numbers, percentages, dollar amounts)",
      );
      score -= 10;
    }

    // Check experience descriptions
    if (resumeData.experience.some((exp: any) => !exp.description)) {
      suggestions.push("Add descriptions to all work experiences");
      score -= 15;
    }

    // Check for projects (bonus points)
    if (resumeData.projects && resumeData.projects.length > 0) {
      score += 5; // Bonus for having projects
    }

    // Check education
    if (resumeData.education.length === 0) {
      suggestions.push("Consider adding education information");
      score -= 5;
    }

    // Generate feedback based on score
    let feedback = "";
    if (score >= 90) {
      feedback = "Excellent! Your resume is well-optimized for ATS systems.";
    } else if (score >= 80) {
      feedback = "Good! A few improvements will make your resume ATS-ready.";
    } else if (score >= 70) {
      feedback = "Your resume needs some optimization for ATS systems.";
    } else {
      feedback = "Important improvements needed for ATS compatibility.";
    }

    return {
      score: Math.max(score, 0),
      suggestions,
      feedback,
    };
  }
}

export const aiService = AIService.getInstance();