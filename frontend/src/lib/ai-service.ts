// AI Service for Resume Content Suggestions
// Note: This is a mock implementation. In production, you would integrate with actual AI APIs

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

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  // Mock professional summary suggestions
  async generateSummary(
    jobTitle: string,
    experience: string[],
    skills: string[],
  ): Promise<AIJobSuggestion[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const suggestions: AIJobSuggestion[] = [
      {
        content: `Experienced ${jobTitle} with ${experience.length}+ years of proven success in delivering high-quality solutions. Expertise in ${skills.slice(0, 3).join(", ")}, with a track record of improving team productivity and driving project success.`,
        reason: "Emphasizes experience and key skills",
        confidence: 0.9,
      },
      {
        content: `Results-driven ${jobTitle} specializing in ${skills.slice(0, 2).join(" and ")}. Demonstrated ability to lead cross-functional teams and deliver complex projects on time and within budget.`,
        reason: "Focuses on leadership and results",
        confidence: 0.85,
      },
      {
        content: `Innovative ${jobTitle} with strong background in ${skills.slice(0, 3).join(", ")}. Passionate about creating efficient solutions and mentoring junior team members.`,
        reason: "Highlights innovation and mentorship",
        confidence: 0.8,
      },
    ];

    return suggestions;
  }

  // Mock job description optimization
  async optimizeJobDescription(
    description: string,
    jobTitle: string,
  ): Promise<AIJobSuggestion[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Convert to bullet points and add metrics
    let optimizedContent = description;

    // Add bullet points if not present
    if (!description.includes("•") && !description.includes("-")) {
      optimizedContent = description
        .split(".")
        .filter((sentence) => sentence.trim().length > 0)
        .map((sentence) => `• ${sentence.trim().replace(/^(I |My |The )/, "")}`)
        .join("\n");
    }

    // Add quantifiable achievements based on job title
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

    const suggestions: AIJobSuggestion[] = [
      {
        content: optimizedContent + "\n" + relevantAchievements[0],
        reason:
          "Added quantifiable achievements and improved formatting with bullet points",
        confidence: 0.92,
      },
      {
        content: optimizedContent + "\n" + relevantAchievements[1],
        reason: "Enhanced with team collaboration and leadership metrics",
        confidence: 0.88,
      },
      {
        content: optimizedContent + "\n" + relevantAchievements[2],
        reason: "Added process improvement and efficiency metrics",
        confidence: 0.85,
      },
    ];

    return suggestions;
  }

  // Mock skill suggestions based on job title
  async suggestSkills(
    jobTitle: string,
    currentSkills: string[],
  ): Promise<AISkillSuggestion[]> {
    await new Promise((resolve) => setTimeout(resolve, 600));

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
        {
          skill: "Adobe Creative Suite",
          relevance: 0.9,
          category: "Design Tools",
        },
        { skill: "User Experience (UX)", relevance: 0.9, category: "Design" },
        { skill: "User Interface (UI)", relevance: 0.85, category: "Design" },
        { skill: "Prototyping", relevance: 0.8, category: "Design" },
        { skill: "Design Systems", relevance: 0.75, category: "Design" },
        { skill: "HTML/CSS", relevance: 0.7, category: "Technical" },
      ],
    };

    const relevantSkills =
      skillDatabase[jobTitle as keyof typeof skillDatabase] || [];

    // Filter out skills the user already has
    const newSkills = relevantSkills.filter(
      (skill) =>
        !currentSkills.some(
          (existing) =>
            existing.toLowerCase().includes(skill.skill.toLowerCase()) ||
            skill.skill.toLowerCase().includes(existing.toLowerCase()),
        ),
    );

    return newSkills.slice(0, 5); // Return top 5 suggestions
  }

  // Mock ATS optimization score
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
