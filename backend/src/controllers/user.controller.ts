import { Response, Request } from 'express';
import { prisma } from '../prisma/client';

export class UserController {
  static async getCurrentUser(req: Request, res: Response) {
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
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  static async updateUser(req: Request, res: Response) {
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
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
}