import { clerkClient } from '@clerk/express';

if (!process.env.CLERK_SECRET_KEY) {
  throw new Error('Missing CLERK_SECRET_KEY environment variable');
}

// Clerk client for backend operations
export { clerkClient };

// Helper function to initialize Clerk client
export const initializeClerk = () => {
  if (!process.env.CLERK_SECRET_KEY) {
    throw new Error('CLERK_SECRET_KEY is required');
  }
  return clerkClient;
};