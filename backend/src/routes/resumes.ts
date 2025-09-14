import { RequestHandler } from "express";
import { prisma } from "../lib/prisma";
import { z } from "zod";

// Validation schemas
const CreateResumeSchema = z.object({
  userId: z.string(),
  title: z.string(),
  personalInfo: z.object({
    fullName: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional(),
    linkedin: z.string().optional(),
  }),
  summary: z.string().optional(),
  experience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      current: z.boolean(),
      description: z.string().optional(),
    }),
  ),
  education: z.array(
    z.object({
      school: z.string(),
      degree: z.string(),
      fieldOfStudy: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      gpa: z.string().optional(),
    }),
  ),
  skills: z.array(z.string()),
});

// Create a new resume
export const createResume: RequestHandler = async (req, res) => {
  try {
    const data = CreateResumeSchema.parse(req.body);

    const resume = await prisma.resume.create({
      data: {
        title: data.title,
        userId: data.userId,
        fullName: data.personalInfo.fullName,
        email: data.personalInfo.email,
        phone: data.personalInfo.phone,
        location: data.personalInfo.location,
        website: data.personalInfo.website,
        linkedin: data.personalInfo.linkedin,
        summary: data.summary,
        skills: data.skills,
        experiences: {
          create: data.experience.map((exp) => ({
            company: exp.company,
            position: exp.position,
            startDate: exp.startDate,
            endDate: exp.endDate,
            current: exp.current,
            description: exp.description,
          })),
        },
        education: {
          create: data.education.map((edu) => ({
            school: edu.school,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy,
            startDate: edu.startDate,
            endDate: edu.endDate,
            gpa: edu.gpa,
          })),
        },
      },
      include: {
        experiences: true,
        education: true,
      },
    });

    res.status(201).json({ id: resume.id });
  } catch (error) {
    console.error("Error creating resume:", error);
    res.status(500).json({ error: "Failed to create resume" });
  }
};

// Get user's resumes
export const getUserResumes: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const resumes = await prisma.resume.findMany({
      where: { userId },
      include: {
        experiences: true,
        education: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    const formattedResumes = resumes.map((resume) => ({
      id: resume.id,
      title: resume.title,
      personalInfo: {
        fullName: resume.fullName,
        email: resume.email,
        phone: resume.phone,
        location: resume.location,
        website: resume.website,
        linkedin: resume.linkedin,
      },
      summary: resume.summary,
      experience: resume.experiences.map((exp) => ({
        id: exp.id,
        company: exp.company,
        position: exp.position,
        startDate: exp.startDate,
        endDate: exp.endDate,
        current: exp.current,
        description: exp.description,
      })),
      education: resume.education.map((edu) => ({
        id: edu.id,
        school: edu.school,
        degree: edu.degree,
        fieldOfStudy: edu.fieldOfStudy,
        startDate: edu.startDate,
        endDate: edu.endDate,
        gpa: edu.gpa,
      })),
      skills: resume.skills,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    }));

    res.json(formattedResumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
};

// Get single resume
export const getResume: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await prisma.resume.findUnique({
      where: { id },
      include: {
        experiences: true,
        education: true,
      },
    });

    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    const formattedResume = {
      id: resume.id,
      title: resume.title,
      personalInfo: {
        fullName: resume.fullName,
        email: resume.email,
        phone: resume.phone,
        location: resume.location,
        website: resume.website,
        linkedin: resume.linkedin,
      },
      summary: resume.summary,
      experience: resume.experiences.map((exp) => ({
        id: exp.id,
        company: exp.company,
        position: exp.position,
        startDate: exp.startDate,
        endDate: exp.endDate,
        current: exp.current,
        description: exp.description,
      })),
      education: resume.education.map((edu) => ({
        id: edu.id,
        school: edu.school,
        degree: edu.degree,
        fieldOfStudy: edu.fieldOfStudy,
        startDate: edu.startDate,
        endDate: edu.endDate,
        gpa: edu.gpa,
      })),
      skills: resume.skills,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };

    res.json(formattedResume);
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ error: "Failed to fetch resume" });
  }
};

// Update resume
export const updateResume: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Update resume
    const resume = await prisma.resume.update({
      where: { id },
      data: {
        title: data.title,
        fullName: data.personalInfo?.fullName,
        email: data.personalInfo?.email,
        phone: data.personalInfo?.phone,
        location: data.personalInfo?.location,
        website: data.personalInfo?.website,
        linkedin: data.personalInfo?.linkedin,
        summary: data.summary,
        skills: data.skills,
      },
    });

    // Update experiences
    if (data.experience) {
      // Delete existing experiences
      await prisma.experience.deleteMany({
        where: { resumeId: id },
      });

      // Create new experiences
      await prisma.experience.createMany({
        data: data.experience.map((exp: any) => ({
          resumeId: id,
          company: exp.company,
          position: exp.position,
          startDate: exp.startDate,
          endDate: exp.endDate,
          current: exp.current,
          description: exp.description,
        })),
      });
    }

    // Update education
    if (data.education) {
      // Delete existing education
      await prisma.education.deleteMany({
        where: { resumeId: id },
      });

      // Create new education
      await prisma.education.createMany({
        data: data.education.map((edu: any) => ({
          resumeId: id,
          school: edu.school,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          startDate: edu.startDate,
          endDate: edu.endDate,
          gpa: edu.gpa,
        })),
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ error: "Failed to update resume" });
  }
};

// Delete resume
export const deleteResume: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.resume.delete({
      where: { id },
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ error: "Failed to delete resume" });
  }
};
