// Database service for resume data persistence
// Note: This will be connected to your Prisma Postgres database

interface ResumeData {
  id?: string;
  title: string;
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
    id?: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id?: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills: string[];
}

interface User {
  id: string;
  email: string;
  name?: string;
}

export class DatabaseService {
  private static instance: DatabaseService;

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Save resume to database
  async saveResume(
    userId: string,
    resumeData: ResumeData,
  ): Promise<{ id: string }> {
    try {
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          ...resumeData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save resume");
      }

      return await response.json();
    } catch (error) {
      console.error("Error saving resume:", error);
      throw error;
    }
  }

  // Update existing resume
  async updateResume(
    resumeId: string,
    resumeData: Partial<ResumeData>,
  ): Promise<void> {
    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) {
        throw new Error("Failed to update resume");
      }
    } catch (error) {
      console.error("Error updating resume:", error);
      throw error;
    }
  }

  // Get user's resumes
  async getUserResumes(userId: string): Promise<ResumeData[]> {
    try {
      const response = await fetch(`/api/users/${userId}/resumes`);

      if (!response.ok) {
        throw new Error("Failed to fetch resumes");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching resumes:", error);
      throw error;
    }
  }

  // Get single resume
  async getResume(resumeId: string): Promise<ResumeData> {
    try {
      const response = await fetch(`/api/resumes/${resumeId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch resume");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching resume:", error);
      throw error;
    }
  }

  // Delete resume
  async deleteResume(resumeId: string): Promise<void> {
    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete resume");
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
      throw error;
    }
  }

  // Create user
  async createUser(userData: { email: string; name: string }): Promise<User> {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  // Get templates
  async getTemplates(): Promise<
    Array<{
      id: string;
      name: string;
      category: string;
      description: string;
      thumbnail?: string;
      featured: boolean;
      rating?: number;
      downloads: number;
    }>
  > {
    try {
      const response = await fetch("/api/templates");

      if (!response.ok) {
        throw new Error("Failed to fetch templates");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching templates:", error);
      throw error;
    }
  }
}

export const dbService = DatabaseService.getInstance();
