'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Plus, User, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="px-6 py-6 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">ResumeAI</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-slate-600">
              <User className="w-4 h-4" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => signOut()}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back!
            </h1>
            <p className="text-slate-600">
              Manage your resumes and create new ones with AI assistance.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Create New Resume</CardTitle>
                <CardDescription>
                  Start building a new resume with AI assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/builder">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle>My Resumes</CardTitle>
                <CardDescription>
                  View and edit your existing resumes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  View All
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your account and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest resume building activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No recent activity yet.</p>
                <p className="text-sm">Create your first resume to get started!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}