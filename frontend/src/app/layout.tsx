import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ResumeAI - AI-Powered Resume Builder",
  description: "Create professional, ATS-optimized resumes in minutes with our AI-powered builder. Get personalized suggestions, smart formatting, and industry-specific content.",
  keywords: "resume builder, AI resume, ATS optimization, professional resume, job application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          {children}
          <Toaster />
          <Sonner />
        </ClerkProvider>
      </body>
    </html>
  );
}
