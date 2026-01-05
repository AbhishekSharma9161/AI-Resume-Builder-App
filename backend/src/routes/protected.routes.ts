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

export default router;