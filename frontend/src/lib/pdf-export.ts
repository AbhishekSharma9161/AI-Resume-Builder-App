import jsPDF from "jspdf";

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
  skills: string[];
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

    if (resumeData.education.length > 0) {
      this.addEducation(resumeData.education);
      this.addSection();
    }

    if (resumeData.skills.length > 0) {
      this.addSkills(resumeData.skills);
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

    const webInfo = [personalInfo.website, personalInfo.linkedin]
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
