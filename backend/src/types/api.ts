// API types for backend

export interface DemoResponse {
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Resume types
export interface Resume {
  id: string;
  userId: string;
  title: string;
  content: any;
  createdAt: string;
  updatedAt: string;
}

// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}