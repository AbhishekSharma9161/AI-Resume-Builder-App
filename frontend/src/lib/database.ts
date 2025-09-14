// Database utility functions for client-side operations

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Resume {
  id: string;
  title: string;
  userId: string;
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  summary?: string;
  skills?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  resumeId: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Education {
  id: string;
  resumeId: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

// Local storage utilities for offline functionality
export const localDB = {
  // User data
  saveUser: (user: User) => {
    localStorage.setItem('resumeai_user', JSON.stringify(user));
  },
  
  getUser: (): User | null => {
    const userData = localStorage.getItem('resumeai_user');
    return userData ? JSON.parse(userData) : null;
  },
  
  removeUser: () => {
    localStorage.removeItem('resumeai_user');
  },
  
  // Resume data
  saveResume: (resume: Resume) => {
    const resumes = localDB.getResumes();
    const existingIndex = resumes.findIndex(r => r.id === resume.id);
    
    if (existingIndex >= 0) {
      resumes[existingIndex] = resume;
    } else {
      resumes.push(resume);
    }
    
    localStorage.setItem('resumeai_resumes', JSON.stringify(resumes));
  },
  
  getResumes: (): Resume[] => {
    const resumesData = localStorage.getItem('resumeai_resumes');
    return resumesData ? JSON.parse(resumesData) : [];
  },
  
  getResume: (id: string): Resume | null => {
    const resumes = localDB.getResumes();
    return resumes.find(r => r.id === id) || null;
  },
  
  deleteResume: (id: string) => {
    const resumes = localDB.getResumes().filter(r => r.id !== id);
    localStorage.setItem('resumeai_resumes', JSON.stringify(resumes));
  },
  
  // Clear all data
  clearAll: () => {
    localStorage.removeItem('resumeai_user');
    localStorage.removeItem('resumeai_resumes');
  }
};