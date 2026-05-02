'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Plus, Eye, Edit, Calendar, Clock, RefreshCw, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useRouter } from 'next/navigation'

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
  lastModified?: string
  createdAt?: string
}

function DashboardContent() {
  const { isLoaded, user } = useUser()
  const router = useRouter()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  useEffect(() => {
    loadResumes()
  }, [])

  const loadResumes = () => {
    setLoading(true)
    try {
      const saved = localStorage.getItem('savedResumes')
      const parsed: Resume[] = saved ? JSON.parse(saved) : []
      // Sort by most recently modified
      parsed.sort((a, b) => {
        const dateA = new Date(a.lastModified || a.createdAt || 0).getTime()
        const dateB = new Date(b.lastModified || b.createdAt || 0).getTime()
        return dateB - dateA
      })
      setResumes(parsed)
      setLastRefresh(new Date())
    } catch (err) {
      console.error('Failed to load resumes:', err)
      setResumes([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id: string) => {
    const updated = resumes.filter(r => r.id !== id)
    setResumes(updated)
    localStorage.setItem('savedResumes', JSON.stringify(updated))
    // Clear current if it's the deleted one
    const current = localStorage.getItem('currentResume')
    if (current) {
      const parsed = JSON.parse(current)
      if (parsed.id === id) localStorage.removeItem('currentResume')
    }
  }

  const handleEdit = (resume: Resume) => {
    localStorage.setItem('currentResume', JSON.stringify(resume))
    router.push('/builder')
  }

  const getTimeAgo = (dateString?: string) => {
    if (!dateString) return 'Unknown'
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-900">ResumeAI</Link>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">Home</Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                }
              }}
              userProfileMode="navigation"
              userProfileUrl="/profile"
            />
          </div>
        </div>
      </nav>

      <div className="px-6 py-10">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">
              Welcome back, {user?.firstName || 'User'}!
            </h1>
            <p className="text-slate-500">Manage your resumes and create new ones with AI assistance.</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Resumes</p>
                  <p className="text-3xl font-bold text-slate-900">{resumes.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500 opacity-70" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Last Updated</p>
                  <p className="text-xl font-bold text-slate-900">
                    {resumes.length > 0 ? getTimeAgo(resumes[0]?.lastModified) : 'Never'}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-green-500 opacity-70" />
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
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    My Resumes
                  </CardTitle>
                  <CardDescription>All your saved resume drafts</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    Updated: {lastRefresh.toLocaleTimeString()}
                  </span>
                  <Button variant="outline" size="sm" onClick={loadResumes} disabled={loading}>
                    <RefreshCw className={`w-3 h-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-slate-500">Loading resumes...</span>
                </div>
              ) : resumes.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <FileText className="w-14 h-14 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium mb-1">No resumes saved yet</p>
                  <p className="text-sm mb-5">Build your first resume and save it as a draft</p>
                  <Button asChild>
                    <Link href="/builder">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Resume
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {resumes.map((resume) => (
                    <div
                      key={resume.id}
                      className="border rounded-xl p-5 bg-white hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-base font-semibold text-slate-900">
                              {resume.title || 'Untitled Resume'}
                            </h3>
                            {resume.skills?.length > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {resume.skills.length} skills
                              </Badge>
                            )}
                          </div>

                          <div className="text-sm text-slate-600 mb-2">
                            <p className="font-medium">{resume.personalInfo?.fullName || 'No name added'}</p>
                            {resume.personalInfo?.email && <p className="text-slate-400">{resume.personalInfo.email}</p>}
                            {resume.personalInfo?.location && <p className="text-slate-400">{resume.personalInfo.location}</p>}
                          </div>

                          {resume.summary && (
                            <p className="text-sm text-slate-500 line-clamp-2 mb-3">{resume.summary}</p>
                          )}

                          <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {getTimeAgo(resume.lastModified)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(resume.lastModified)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(resume)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(resume.id)}
                            className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:border-red-300"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="w-4 h-4" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">Signed in successfully</p>
                    <p className="text-xs text-slate-400">{new Date().toLocaleString()}</p>
                  </div>
                </div>
                {resumes.length > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium">{resumes.length} resume draft{resumes.length !== 1 ? 's' : ''} saved locally</p>
                      <p className="text-xs text-slate-400">Last saved: {getTimeAgo(resumes[0]?.lastModified)}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">Profile synced with Clerk</p>
                    <p className="text-xs text-slate-400">User management active</p>
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

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
