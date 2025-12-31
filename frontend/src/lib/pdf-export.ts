import jsPDF from "jspdf";

interface ResumeData {
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
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    startDate: string;
    endDate?: string;
    current: boolean;
    url?: string;
    github?: string;
  }>;
  skills: string[];
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
    credentialId?: string;
    url?: string;
  }>;
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  achievements: string[];
}

export class PDFExporter {
  private pdf: jsPDF;
  private yPosition: number;
  private pageWidth: number;
  private margin: number;

  constructor() {
    this.pdf = new jsPDF();
    this.yPosition = 20;
    this.pageWidth = this.pdf.internal.pageSize.getWidth();
    this.margin = 20;
  }

  exportResume(resumeData: ResumeData): void {
    this.addHeader(resumeData.personalInfo);
    this.addSection();

    if (resumeData.summary) {
      this.addSummary(resumeData.summary);
      this.addSection();
    }

    if (resumeData.experience.length > 0) {
      this.addExperience(resumeData.experience);
      this.addSection();
    }

    if (resumeData.projects.length > 0) {
      this.addProjects(resumeData.projects);
      this.addSection();
    }

    if (resumeData.education.length > 0) {
      this.addEducation(resumeData.education);
      this.addSection();
    }

    if (resumeData.certifications.length > 0) {
      this.addCertifications(resumeData.certifications);
      this.addSection();
    }

    if (resumeData.skills.length > 0) {
      this.addSkills(resumeData.skills);
      this.addSection();
    }

    if (resumeData.languages.length > 0) {
      this.addLanguages(resumeData.languages);
      this.addSection();
    }

    if (resumeData.achievements.length > 0) {
      this.addAchievements(resumeData.achievements);
    }

    // Download the PDF
    const fileName = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
    this.pdf.save(fileName);
  }

  private addHeader(personalInfo: ResumeData["personalInfo"]): void {
    // Name
    this.pdf.setFontSize(20);
    this.pdf.setFont("helvetica", "bold");
    this.pdf.text(
      personalInfo.fullName || "Your Name",
      this.pageWidth / 2,
      this.yPosition,
      { align: "center" },
    );
    this.yPosition += 10;

    // Contact information
    this.pdf.setFontSize(10);
    this.pdf.setFont("helvetica", "normal");

    const contactInfo = [
      personalInfo.email,
      personalInfo.phone,
      personalInfo.location,
    ]
      .filter(Boolean)
      .join(" | ");

    if (contactInfo) {
      this.pdf.text(contactInfo, this.pageWidth / 2, this.yPosition, {
        align: "center",
      });
      this.yPosition += 6;
    }

    const webInfo = [
      personalInfo.website, 
      personalInfo.linkedin,
      personalInfo.github,
      personalInfo.portfolio
    ]
      .filter(Boolean)
      .join(" | ");

    if (webInfo) {
      this.pdf.text(webInfo, this.pageWidth / 2, this.yPosition, {
        align: "center",
      });
      this.yPosition += 6;
    }

    // Add a line separator
    this.pdf.setLineWidth(0.5);
    this.pdf.line(
      this.margin,
      this.yPosition + 2,
      this.pageWidth - this.margin,
      this.yPosition + 2,
    );
    this.yPosition += 8;
  }

  private addSummary(summary: string): void {
    this.addSectionTitle("PROFESSIONAL SUMMARY");
    this.addText(summary);
  }

  private addExperience(experience: ResumeData["experience"]): void {
    this.addSectionTitle("WORK EXPERIENCE");

    experience.forEach((exp, index) => {
      if (index > 0) this.yPosition += 6;

      // Job title and company
      this.pdf.setFontSize(11);
      this.pdf.setFont("helvetica", "bold");
      this.pdf.text(exp.position || "Position", this.margin, this.yPosition);

      // Date range
      const dateRange = `${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`;
      this.pdf.text(dateRange, this.pageWidth - this.margin, this.yPosition, {
        align: "right",
      });
      this.yPosition += 6;

      // Company name
      this.pdf.setFontSize(10);
      this.pdf.setFont("helvetica", "bold");
      this.pdf.text(exp.company || "Company Name", this.margin, this.yPosition);
      this.yPosition += 6;

      // Description
      if (exp.description) {
        this.pdf.setFont("helvetica", "normal");
        this.addText(exp.description);
      }
    });
  }

  private addEducation(education: ResumeData["education"]): void {
    this.addSectionTitle("EDUCATION");

    education.forEach((edu, index) => {
      if (index > 0) this.yPosition += 4;

      // Degree and field
      this.pdf.setFontSize(11);
      this.pdf.setFont("helvetica", "bold");
      const degreeText = `${edu.degree || "Degree"} in ${edu.fieldOfStudy || "Field"}`;
      this.pdf.text(degreeText, this.margin, this.yPosition);

      // Date range
      const dateRange = `${edu.startDate} - ${edu.endDate}`;
      this.pdf.text(dateRange, this.pageWidth - this.margin, this.yPosition, {
        align: "right",
      });
      this.yPosition += 6;

      // School name
      this.pdf.setFontSize(10);
      this.pdf.setFont("helvetica", "normal");
      let schoolText = edu.school || "School Name";
      if (edu.gpa) {
        schoolText += ` • GPA: ${edu.gpa}`;
      }
      this.pdf.text(schoolText, this.margin, this.yPosition);
      this.yPosition += 6;
    });
  }

  private addSkills(skills: string[]): void {
    this.addSectionTitle("SKILLS");

    this.pdf.setFontSize(10);
    this.pdf.setFont("helvetica", "normal");

    const skillsText = skills.join(" • ");
    this.addText(skillsText);
  }

  private addProjects(projects: ResumeData["projects"]): void {
    this.addSectionTitle("PROJECTS");

    projects.forEach((project, index) => {
      if (index > 0) this.yPosition += 6;

      // Project name
      this.pdf.setFontSize(11);
      this.pdf.setFont("helvetica", "bold");
      this.pdf.text(project.name || "Project", this.margin, this.yPosition);
      this.yPosition += 6;

      // Description
      if (project.description) {
        this.pdf.setFontSize(10);
        this.pdf.setFont("helvetica", "normal");
        this.addText(project.description);
      }

      // URLs
      if (project.url || project.github) {
        this.pdf.setFontSize(9);
        this.pdf.setFont("helvetica", "normal");
        const urls = [project.url, project.github].filter(Boolean).join(" | ");
        this.pdf.text(urls, this.margin, this.yPosition);
        this.yPosition += 6;
      }
    });
  }

  private addCertifications(certifications: ResumeData["certifications"]): void {
    this.addSectionTitle("CERTIFICATIONS");

    certifications.forEach((cert, index) => {
      if (index > 0) this.yPosition += 4;

      // Certification name and date
      this.pdf.setFontSize(11);
      this.pdf.setFont("helvetica", "bold");
      this.pdf.text(cert.name || "Certification", this.margin, this.yPosition);

      // Date range
      const dateRange = cert.expiryDate ? `${cert.date} - ${cert.expiryDate}` : cert.date;
      this.pdf.text(dateRange, this.pageWidth - this.margin, this.yPosition, {
        align: "right",
      });
      this.yPosition += 6;

      // Issuer
      this.pdf.setFontSize(10);
      this.pdf.setFont("helvetica", "normal");
      let issuerText = cert.issuer || "Issuer";
      if (cert.credentialId) {
        issuerText += ` • ID: ${cert.credentialId}`;
      }
      this.pdf.text(issuerText, this.margin, this.yPosition);
      this.yPosition += 6;
    });
  }

  private addLanguages(languages: ResumeData["languages"]): void {
    this.addSectionTitle("LANGUAGES");

    this.pdf.setFontSize(10);
    this.pdf.setFont("helvetica", "normal");

    const languagesText = languages.map(lang => `${lang.name} (${lang.proficiency})`).join(" • ");
    this.addText(languagesText);
  }

  private addAchievements(achievements: string[]): void {
    this.addSectionTitle("ACHIEVEMENTS");

    this.pdf.setFontSize(10);
    this.pdf.setFont("helvetica", "normal");

    achievements.forEach((achievement) => {
      this.checkPageBreak(6);
      this.pdf.text(`• ${achievement}`, this.margin, this.yPosition);
      this.yPosition += 6;
    });
  }

  private addSectionTitle(title: string): void {
    this.checkPageBreak(15);

    this.pdf.setFontSize(12);
    this.pdf.setFont("helvetica", "bold");
    this.pdf.text(title, this.margin, this.yPosition);
    this.yPosition += 8;
  }

  private addText(text: string): void {
    this.pdf.setFontSize(10);
    this.pdf.setFont("helvetica", "normal");

    const lines = this.pdf.splitTextToSize(
      text,
      this.pageWidth - 2 * this.margin,
    );

    lines.forEach((line: string) => {
      this.checkPageBreak(6);
      this.pdf.text(line, this.margin, this.yPosition);
      this.yPosition += 6;
    });
  }

  private addSection(): void {
    this.yPosition += 8;
  }

  private checkPageBreak(requiredSpace: number): void {
    const pageHeight = this.pdf.internal.pageSize.getHeight();

    if (this.yPosition + requiredSpace > pageHeight - this.margin) {
      this.pdf.addPage();
      this.yPosition = this.margin;
    }
  }
}

export const exportToPDF = (resumeData: ResumeData): void => {
  const exporter = new PDFExporter();
  exporter.exportResume(resumeData);
};
