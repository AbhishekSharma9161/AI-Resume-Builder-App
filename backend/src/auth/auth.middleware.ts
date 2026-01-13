import { Request, Response, NextFunction } from 'express';
import { clerkClient, verifyToken } from '@clerk/express';
import { prisma } from '../prisma/client';

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

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

    // Verify token with Clerk
    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!
      });
      
      const userId = payload.sub;

      // Get user details from Clerk
      const clerkUser = await clerkClient.users.getUser(userId);
      
      if (!clerkUser) {
        res.status(401).json({ error: 'User not found' });
        return;
      }

      const email = clerkUser.emailAddresses.find(e => e.id === clerkUser.primaryEmailAddressId)?.emailAddress;
      
      if (!email) {
        res.status(401).json({ error: 'User email not found' });
        return;
      }

      // Ensure user exists in our database
      await ensureUserExists(userId, email, clerkUser.firstName, clerkUser.lastName);

      // Attach user to request
      const authenticatedUser: AuthenticatedUser = {
        id: userId,
        email: email,
        firstName: clerkUser.firstName || undefined,
        lastName: clerkUser.lastName || undefined
      };

      (req as any).user = authenticatedUser;
      next();
    } catch (clerkError) {
      console.error('Clerk token verification failed:', clerkError);
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Helper function to ensure user exists in our database
async function ensureUserExists(
  clerkUserId: string, 
  email: string, 
  firstName?: string | null, 
  lastName?: string | null
): Promise<void> {
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: clerkUserId }
    });

    // If user doesn't exist, create them
    if (!existingUser) {
      const displayName = firstName && lastName 
        ? `${firstName} ${lastName}` 
        : firstName || lastName || email.split('@')[0];

      await prisma.user.create({
        data: {
          id: clerkUserId,
          email: email,
          name: displayName
        }
      });
      console.log(`Created new user: ${email}`);
    }
  } catch (error) {
    console.error('Error ensuring user exists:', error);
    throw error;
  }
}