'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Plus, User, LogOut, Eye, Edit, Calendar, Clock, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api'
import { useAuth } from '@clerk/nextjs'

interface Resume {
  id: string
  title: string
  personalInfo: {
    fullName?: string
    email?: string
    phone?: string
    location?: string
  }
  summary?: string
  skills: string[]
  createdAt: string
  updatedAt: string
}

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { getToken } = useAuth()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  useEffect(() => {
    if (isSignedIn) {
      fetchResumes()
      
      // Set up real-time refresh every 30 seconds
      const interval = setInterval(() => {
        fetchResumes(true) // Silent refresh
      }, 30000)

      return () => clearInterval(interval)
    }
  }, [isSignedIn])

  const fetchResumes = async (silent = false) => {
    try {
      if (!silent) setLoading(true)
      const token = await getToken()
      if (!token) {
        throw new Error('No authentication token')
      }
      
      const data = await apiClient.authenticatedRequest<Resume[]>('/api/protected/resumes', token)
      setResumes(data)
      setLastRefresh(new Date())
      setError(null)
    } catch (err) {
      console.error('Error fetching resumes:', err)
      setError('Failed to load resumes')
    } finally {
      if (!silent) setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchResumes(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return `${Math.floor(diffInHours / 168)}w ago`
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    redirect('/login')
  }

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
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "shadow-lg",
                  userButtonPopoverActionButton: "hover:bg-slate-50"
                }
              }}
              userProfileMode="navigation"
              userProfileUrl="/profile"
            />
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back, {user?.firstName || 'User'}!
            </h1>
            <p className="text-slate-600">
              Manage your resumes and create new ones with AI assistance.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Resumes</p>
                    <p className="text-2xl font-bold text-slate-900">{resumes.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Last Updated</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {resumes.length > 0 ? getTimeAgo(resumes[0]?.updatedAt) : 'Never'}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-center">
                <Button asChild className="w-full">
                  <Link href="/builder" className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Create New Resume</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Resumes List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>My Resumes</span>
                  </CardTitle>
                  <CardDescription>
                    All your saved resumes with creation dates and preview options
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-xs text-slate-500">
                    Last updated: {lastRefresh.toLocaleTimeString()}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={loading}
                    className="flex items-center space-x-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-slate-600">Loading resumes...</span>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  <p>{error}</p>
                  <Button onClick={handleRefresh} variant="outline" className="mt-4">
                    Try Again
                  </Button>
                </div>
              ) : resumes.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No resumes yet</p>
                  <p className="text-sm mb-4">Create your first resume to get started!</p>
                  <Button asChild>
                    <Link href="/builder">Create Resume</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {resumes.map((resume) => (
                    <div
                      key={resume.id}
                      className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-slate-900">
                              {resume.title || 'Untitled Resume'}
                            </h3>
                            <Badge variant="secondary" className="text-xs">
                              {resume.skills.length} skills
                            </Badge>
                          </div>
                          
                          <div className="text-sm text-slate-600 mb-3">
                            <p className="font-medium">
                              {resume.personalInfo.fullName || 'No name provided'}
                            </p>
                            <p>{resume.personalInfo.email}</p>
                            {resume.personalInfo.location && (
                              <p>{resume.personalInfo.location}</p>
                            )}
                          </div>

                          {resume.summary && (
                            <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                              {resume.summary}
                            </p>
                          )}

                          <div className="flex items-center space-x-4 text-xs text-slate-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>Created: {formatDate(resume.createdAt)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>Updated: {getTimeAgo(resume.updatedAt)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-1"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Preview</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-1"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          {/* Activity Log */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Your recent account and resume activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Signed in successfully</p>
                    <p className="text-xs text-slate-500">{new Date().toLocaleString()}</p>
                  </div>
                </div>
                
                {resumes.length > 0 && (
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Dashboard accessed</p>
                      <p className="text-xs text-slate-500">Viewing {resumes.length} resume{resumes.length !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Profile synced with Clerk</p>
                    <p className="text-xs text-slate-500">User management active</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}