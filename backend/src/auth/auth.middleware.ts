import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from './supabaseClient';
import { AuthenticatedUser, AuthRequest } from './auth.types';
import { prisma } from '../prisma/client';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ error: 'Access token required' });
      return;
    }

    // Verify token with Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      console.error('Token verification failed:', error);
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    if (!user.email) {
      res.status(401).json({ error: 'User email not found' });
      return;
    }

    // Ensure user exists in our database
    await ensureUserExists(user.id, user.email);

    // Attach user to request
    const authenticatedUser: AuthenticatedUser = {
      id: user.id,
      email: user.email
    };

    (req as any).user = authenticatedUser;
    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Helper function to ensure user exists in our database
async function ensureUserExists(supabaseUserId: string, email: string): Promise<void> {
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: supabaseUserId }
    });

    // If user doesn't exist, create them
    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: supabaseUserId,
          email: email,
          name: email.split('@')[0] // Use email prefix as default name
        }
      });
      console.log(`Created new user: ${email}`);
    }
  } catch (error) {
    console.error('Error ensuring user exists:', error);
    throw error;
  }
}