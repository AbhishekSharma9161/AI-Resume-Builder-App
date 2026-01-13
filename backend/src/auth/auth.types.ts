export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthRequest extends Express.Request {
  user?: AuthenticatedUser;
}

export interface ClerkUser {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  createdAt: number;
  updatedAt: number;
}