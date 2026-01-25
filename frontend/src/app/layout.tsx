import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ReactNode } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ResumeAI - AI-Powered Resume Builder",
  description: "Create professional, ATS-optimized resumes in minutes with our AI-powered builder. Get personalized suggestions, smart formatting, and industry-specific content.",
  keywords: "resume builder, AI resume, ATS optimization, professional resume, job application",
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico',
        sizes: '32x32',
      }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
          <Sonner />
        </body>
      </html>
    </ClerkProvider>
  );
}
