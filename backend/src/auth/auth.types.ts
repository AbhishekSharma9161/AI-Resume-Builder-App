export interface AuthenticatedUser {
  id: string;
  email: string;
}

export interface AuthRequest extends Express.Request {
  user?: AuthenticatedUser;
}

export interface SupabaseUser {
  id: string;
  email?: string;
  aud: string;
  role?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_change_sent_at?: string;
  new_email?: string;
  invited_at?: string;
  action_link?: string;
  created_at: string;
  updated_at: string;
  is_anonymous?: boolean;
}