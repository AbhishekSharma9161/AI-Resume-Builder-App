import { RequestHandler } from "express";

interface EnhanceSummaryRequest {
  summary: string;
  experience: any[];
  skills: string[];
}

interface EnhanceSummaryResponse {
  enhancedSummary: string;
}

export const enhanceSummary: RequestHandler = async (req, res) => {
  try {
    const { summary, experience, skills }: EnhanceSummaryRequest = req.body;

    // For demo purposes, we'll use a simple enhancement algorithm
    // In production, this would integrate with OpenAI or similar service
    
    let enhancedSummary = summary;
    
    if (!summary || summary.trim().length === 0) {
      // Generate a basic summary if none exists
      const skillsText = skills.length > 0 ? skills.slice(0, 5).join(", ") : "various technologies";
      const yearsOfExp = experience.length > 0 ? experience.length : 1;
      
      enhancedSummary = `Experienced professional with ${yearsOfExp}+ years of expertise in ${skillsText}. Proven track record of delivering high-quality solutions and driving results. Passionate about leveraging technology to solve complex business challenges and contribute to team success.`;
    } else {
      // Enhance existing summary
      const improvements = [
        // Add action words if missing
        summary.includes("Experienced") ? "" : "Experienced ",
        // Add metrics/numbers if missing
        !summary.match(/\d+/) && experience.length > 0 ? `with ${experience.length}+ years of experience ` : "",
        // Add skills reference if missing
        !skills.some(skill => summary.toLowerCase().includes(skill.toLowerCase())) && skills.length > 0 
          ? `. Skilled in ${skills.slice(0, 3).join(", ")}` : "",
        // Add results-oriented language
        !summary.toLowerCase().includes("result") && !summary.toLowerCase().includes("deliver") 
          ? ". Proven ability to deliver results and drive business impact" : ""
      ];
      
      enhancedSummary = improvements[0] + summary + improvements.slice(1).join("");
    }
    
    // Clean up and format
    enhancedSummary = enhancedSummary
      .replace(/\s+/g, " ")
      .replace(/\.\s*\./g, ".")
      .trim();
    
    // Ensure it ends with a period
    if (!enhancedSummary.endsWith(".")) {
      enhancedSummary += ".";
    }

    const response: EnhanceSummaryResponse = {
      enhancedSummary
    };

    res.json(response);
  } catch (error) {
    console.error("AI enhancement error:", error);
    res.status(500).json({ 
      error: "Failed to enhance summary",
      message: "An error occurred while processing your request"
    });
  }
};

export const enhanceExperience: RequestHandler = async (req, res) => {
  try {
    const { description, position, company, skills } = req.body;

    let enhancedDescription = description;

    if (!description || description.trim().length === 0) {
      // Generate a basic experience description
      const skillsText = skills && skills.length > 0 ? skills.slice(0, 3).join(", ") : "various technologies";
      enhancedDescription = `• Developed and maintained applications using ${skillsText}, resulting in improved system performance and user experience
• Collaborated with cross-functional teams to deliver high-quality solutions on time and within budget
• Implemented best practices for code quality, testing, and deployment processes
• Contributed to technical documentation and knowledge sharing initiatives`;
    } else {
      // Enhance existing description
      const lines = description.split('\n').filter(line => line.trim());
      const enhancedLines = lines.map(line => {
        let enhanced = line.trim();

        // Add bullet points if missing
        if (!enhanced.startsWith('•') && !enhanced.startsWith('-') && !enhanced.startsWith('*')) {
          enhanced = '• ' + enhanced;
        }

        // Add metrics if missing numbers
        if (!enhanced.match(/\d+/) && Math.random() > 0.7) {
          const metrics = ['30%', '25%', '40%', '50%', '20%'];
          const metric = metrics[Math.floor(Math.random() * metrics.length)];
          enhanced = enhanced.replace(/improved|increased|enhanced|optimized/i, `$& by ${metric}`);
        }

        // Add action words if missing
        if (!enhanced.match(/^•\s*(Developed|Created|Implemented|Led|Managed|Designed|Built|Optimized)/i)) {
          const actionWords = ['Developed', 'Created', 'Implemented', 'Led', 'Designed', 'Built', 'Optimized'];
          const randomAction = actionWords[Math.floor(Math.random() * actionWords.length)];
          enhanced = enhanced.replace(/^•\s*/, `• ${randomAction} `);
        }

        return enhanced;
      });

      enhancedDescription = enhancedLines.join('\n');
    }

    res.json({ enhancedDescription });
  } catch (error) {
    console.error("Experience enhancement error:", error);
    res.status(500).json({
      error: "Failed to enhance experience",
      message: "An error occurred while processing your request"
    });
  }
};

export const enhanceProject: RequestHandler = async (req, res) => {
  try {
    const { description, name, technologies } = req.body;

    let enhancedDescription = description;

    if (!description || description.trim().length === 0) {
      const techText = technologies && technologies.length > 0 ? technologies.slice(0, 3).join(", ") : "modern technologies";
      enhancedDescription = `A comprehensive application built using ${techText}. This project demonstrates proficiency in full-stack development, featuring responsive design, efficient data management, and optimized performance. The solution addresses real-world challenges and showcases best practices in software development.`;
    } else {
      // Enhance existing description
      let enhanced = description;

      // Add technical details if missing
      if (technologies && technologies.length > 0 && !enhanced.toLowerCase().includes(technologies[0].toLowerCase())) {
        enhanced = `${enhanced} Built using ${technologies.slice(0, 2).join(" and ")}.`;
      }

      // Add impact/results if missing
      if (!enhanced.match(/improved|increased|reduced|enhanced|optimized/i)) {
        const impacts = [
          "improving user experience by 40%",
          "reducing load times by 50%",
          "increasing efficiency by 30%",
          "enhancing system reliability"
        ];
        const randomImpact = impacts[Math.floor(Math.random() * impacts.length)];
        enhanced = `${enhanced} This resulted in ${randomImpact}.`;
      }

      enhancedDescription = enhanced.trim();
    }

    res.json({ enhancedDescription });
  } catch (error) {
    console.error("Project enhancement error:", error);
    res.status(500).json({
      error: "Failed to enhance project",
      message: "An error occurred while processing your request"
    });
  }
};

export const suggestSkills: RequestHandler = async (req, res) => {
  try {
    const { currentSkills, experience, projects } = req.body;

    // Skills database categorized by field
    const skillSuggestions = {
      frontend: ["React", "Vue.js", "Angular", "JavaScript", "TypeScript", "HTML5", "CSS3", "Sass", "Tailwind CSS", "Bootstrap"],
      backend: ["Node.js", "Python", "Java", "C#", "PHP", "Ruby", "Go", "Express.js", "Django", "Spring Boot"],
      database: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "SQLite", "Firebase"],
      cloud: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Jenkins", "Git"],
      mobile: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic", "Xamarin"],
      design: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "UI/UX Design", "Wireframing"],
      soft: ["Leadership", "Project Management", "Agile", "Scrum", "Communication", "Problem Solving", "Team Collaboration"]
    };

    const allSuggestions = Object.values(skillSuggestions).flat();
    const currentSkillsLower = (currentSkills || []).map(skill => skill.toLowerCase());

    // Filter out already added skills
    const newSuggestions = allSuggestions.filter(skill =>
      !currentSkillsLower.includes(skill.toLowerCase())
    );

    // Randomly select 5-8 suggestions
    const suggestedSkills = newSuggestions
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 4) + 5);

    res.json({ suggestedSkills });
  } catch (error) {
    console.error("Skills suggestion error:", error);
    res.status(500).json({
      error: "Failed to suggest skills",
      message: "An error occurred while processing your request"
    });
  }
};

export const calculateATSScore: RequestHandler = async (req, res) => {
  try {
    const { personalInfo, summary, experience, education, projects, skills } = req.body;

    let score = 0;
    let maxScore = 100;
    let feedback = [];
    let suggestions = [];

    // Personal Info scoring (20 points)
    if (personalInfo?.fullName) score += 5;
    if (personalInfo?.email) score += 5;
    if (personalInfo?.phone) score += 5;
    if (personalInfo?.location) score += 5;

    if (!personalInfo?.fullName || !personalInfo?.email || !personalInfo?.phone || !personalInfo?.location) {
      feedback.push("❌ Missing essential contact information");
      suggestions.push("Complete all personal information fields (name, email, phone, location)");
    } else {
      feedback.push("✅ Complete contact information");
    }

    // Summary scoring (15 points)
    if (summary && summary.length > 50) {
      score += 15;
      feedback.push("✅ Professional summary present");
    } else if (summary && summary.length > 0) {
      score += 8;
      feedback.push("⚠️ Professional summary could be more detailed");
      suggestions.push("Expand your professional summary to 2-3 sentences (aim for 50+ characters)");
    } else {
      feedback.push("❌ Missing professional summary");
      suggestions.push("Add a professional summary highlighting your experience and key skills");
    }

    // Experience scoring (25 points)
    if (experience && experience.length > 0) {
      score += 15;
      feedback.push("✅ Work experience included");

      // Check for detailed descriptions
      const detailedExperience = experience.filter(exp => exp.description && exp.description.length > 50);
      if (detailedExperience.length === experience.length) {
        score += 10;
        feedback.push("✅ Detailed job descriptions");
      } else {
        score += 5;
        feedback.push("⚠️ Some job descriptions could be more detailed");
        suggestions.push("Add detailed descriptions for all work experiences (aim for 50+ characters each)");
      }
    } else {
      feedback.push("❌ No work experience listed");
      suggestions.push("Add your work experience with detailed job descriptions");
    }

    // Education scoring (10 points)
    if (education && education.length > 0) {
      score += 10;
      feedback.push("✅ Education information included");
    } else {
      feedback.push("❌ Missing education information");
      suggestions.push("Add your educational background");
    }

    // Skills scoring (15 points)
    if (skills && skills.length >= 5) {
      score += 15;
      feedback.push("✅ Comprehensive skills list");
    } else if (skills && skills.length > 0) {
      score += 8;
      feedback.push("⚠️ Could use more skills");
      suggestions.push("Add more relevant skills (aim for at least 5 skills)");
    } else {
      feedback.push("❌ No skills listed");
      suggestions.push("Add relevant technical and soft skills");
    }

    // Projects scoring (10 points)
    if (projects && projects.length > 0) {
      score += 10;
      feedback.push("✅ Projects showcase included");
    } else {
      feedback.push("⚠️ No projects listed");
      suggestions.push("Consider adding relevant projects to showcase your work");
    }

    // Additional ATS-friendly checks (5 points)
    let atsCompatibility = 0;

    // Check for bullet points in experience
    const hasBulletPoints = experience?.some(exp =>
      exp.description && (exp.description.includes('•') || exp.description.includes('-') || exp.description.includes('*'))
    );
    if (hasBulletPoints) {
      atsCompatibility += 2;
      feedback.push("✅ Uses bullet points for readability");
    } else if (experience?.length > 0) {
      suggestions.push("Use bullet points in job descriptions for better ATS parsing");
    }

    // Check for action verbs
    const actionVerbs = ["developed", "created", "implemented", "led", "managed", "designed", "built", "optimized"];
    const hasActionVerbs = experience?.some(exp =>
      exp.description && actionVerbs.some(verb => exp.description.toLowerCase().includes(verb))
    );
    if (hasActionVerbs) {
      atsCompatibility += 2;
      feedback.push("✅ Uses action verbs");
    } else if (experience?.length > 0) {
      suggestions.push("Start job descriptions with strong action verbs (developed, created, led, etc.)");
    }

    // Check for quantifiable achievements
    const hasMetrics = experience?.some(exp =>
      exp.description && /\d+%|\d+\+|\$\d+|increased|improved|reduced/i.test(exp.description)
    );
    if (hasMetrics) {
      atsCompatibility += 1;
      feedback.push("✅ Includes quantifiable achievements");
    } else if (experience?.length > 0) {
      suggestions.push("Include quantifiable achievements and metrics in your job descriptions");
    }

    score += atsCompatibility;

    // Calculate letter grade
    let grade = 'F';
    if (score >= 90) grade = 'A';
    else if (score >= 80) grade = 'B';
    else if (score >= 70) grade = 'C';
    else if (score >= 60) grade = 'D';

    res.json({
      score,
      maxScore,
      percentage: Math.round((score / maxScore) * 100),
      grade,
      feedback,
      suggestions
    });
  } catch (error) {
    console.error("ATS scoring error:", error);
    res.status(500).json({
      error: "Failed to calculate ATS score",
      message: "An error occurred while processing your request"
    });
  }
};

export const generateJobDescription: RequestHandler = async (req, res) => {
  try {
    const { position, company, keywords } = req.body;

    // Simple job description generator for demo
    const descriptions = [
      `Developed and maintained ${keywords.length > 0 ? keywords[0] : 'software'} applications, improving system performance by 30%.`,
      `Collaborated with cross-functional teams to deliver high-quality solutions on time and within budget.`,
      `Implemented best practices for code quality, testing, and deployment processes.`,
      `Mentored junior developers and contributed to technical documentation and knowledge sharing.`,
      `Participated in agile development processes and contributed to project planning and estimation.`
    ];

    const randomDescriptions = descriptions
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .join(" ");

    res.json({
      generatedDescription: randomDescriptions
    });
  } catch (error) {
    console.error("Job description generation error:", error);
    res.status(500).json({
      error: "Failed to generate job description",
      message: "An error occurred while processing your request"
    });
  }
};
