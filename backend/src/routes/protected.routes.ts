import { Router, Request, Response } from 'express';
import { authenticateToken } from '../auth/auth.middleware';
import { prisma } from '../prisma/client';

const router = Router();

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Get current user profile
router.get('/profile', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req as any).user.id },
      include: {
        resumes: {
          orderBy: { updatedAt: 'desc' },
          take: 5
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      resumeCount: user.resumes.length
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Get user's resumes
router.get('/resumes', async (req: Request, res: Response) => {
  try {
    const resumes = await prisma.resume.findMany({
      where: { userId: (req as any).user.id },
      include: {
        experiences: true,
        education: true,
      },
      orderBy: { updatedAt: 'desc' },
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
    console.error('Error fetching resumes:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

// Update user profile
router.put('/profile', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: (req as any).user.id },
      data: { name }
    });

    res.json({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      updatedAt: updatedUser.updatedAt
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// Create a new resume
router.post('/resumes', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const {
      title,
      personalInfo,
      summary,
      skills,
      experiences,
      education
    } = req.body;

    // Create the resume
    const resume = await prisma.resume.create({
      data: {
        title: title || 'Untitled Resume',
        userId,
        fullName: personalInfo?.fullName,
        email: personalInfo?.email,
        phone: personalInfo?.phone,
        location: personalInfo?.location,
        website: personalInfo?.website,
        linkedin: personalInfo?.linkedin,
        summary,
        skills: skills || [],
        experiences: {
          create: experiences?.map((exp: any) => ({
            company: exp.company,
            position: exp.position,
            startDate: exp.startDate,
            endDate: exp.endDate,
            current: exp.current || false,
            description: exp.description
          })) || []
        },
        education: {
          create: education?.map((edu: any) => ({
            school: edu.school,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy,
            startDate: edu.startDate,
            endDate: edu.endDate,
            gpa: edu.gpa
          })) || []
        }
      },
      include: {
        experiences: true,
        education: true
      }
    });

    res.status(201).json({
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
      skills: resume.skills,
      experiences: resume.experiences,
      education: resume.education,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt
    });
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ error: 'Failed to create resume' });
  }
});

// Update an existing resume
router.put('/resumes/:id', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const {
      title,
      personalInfo,
      summary,
      skills,
      experiences,
      education
    } = req.body;

    // Check if resume belongs to user
    const existingResume = await prisma.resume.findFirst({
      where: { id, userId }
    });

    if (!existingResume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Update the resume
    const resume = await prisma.resume.update({
      where: { id },
      data: {
        title: title || 'Untitled Resume',
        fullName: personalInfo?.fullName,
        email: personalInfo?.email,
        phone: personalInfo?.phone,
        location: personalInfo?.location,
        website: personalInfo?.website,
        linkedin: personalInfo?.linkedin,
        summary,
        skills: skills || [],
      },
      include: {
        experiences: true,
        education: true
      }
    });

    // Update experiences
    if (experiences) {
      // Delete existing experiences
      await prisma.experience.deleteMany({
        where: { resumeId: id }
      });

      // Create new experiences
      if (experiences.length > 0) {
        await prisma.experience.createMany({
          data: experiences.map((exp: any) => ({
            resumeId: id,
            company: exp.company,
            position: exp.position,
            startDate: exp.startDate,
            endDate: exp.endDate,
            current: exp.current || false,
            description: exp.description
          }))
        });
      }
    }

    // Update education
    if (education) {
      // Delete existing education
      await prisma.education.deleteMany({
        where: { resumeId: id }
      });

      // Create new education
      if (education.length > 0) {
        await prisma.education.createMany({
          data: education.map((edu: any) => ({
            resumeId: id,
            school: edu.school,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy,
            startDate: edu.startDate,
            endDate: edu.endDate,
            gpa: edu.gpa
          }))
        });
      }
    }

    // Fetch updated resume
    const updatedResume = await prisma.resume.findUnique({
      where: { id },
      include: {
        experiences: true,
        education: true
      }
    });

    res.json({
      id: updatedResume!.id,
      title: updatedResume!.title,
      personalInfo: {
        fullName: updatedResume!.fullName,
        email: updatedResume!.email,
        phone: updatedResume!.phone,
        location: updatedResume!.location,
        website: updatedResume!.website,
        linkedin: updatedResume!.linkedin,
      },
      summary: updatedResume!.summary,
      skills: updatedResume!.skills,
      experiences: updatedResume!.experiences,
      education: updatedResume!.education,
      createdAt: updatedResume!.createdAt,
      updatedAt: updatedResume!.updatedAt
    });
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({ error: 'Failed to update resume' });
  }
});

// Delete a resume
router.delete('/resumes/:id', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    // Check if resume belongs to user
    const existingResume = await prisma.resume.findFirst({
      where: { id, userId }
    });

    if (!existingResume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Delete the resume (cascading will handle experiences and education)
    await prisma.resume.delete({
      where: { id }
    });

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

export default router;