"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  User,
  Settings,
  CreditCard,
  Download,
  FileText,
  Calendar,
  Edit,
  LogOut,
  Crown,
  Star,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { signOutGoogle } from "@/lib/google-auth";

// Mock data for demo purposes
const mockBillingHistory = [
  {
    id: "inv_001",
    date: "2024-11-15",
    amount: 9.99,
    status: "paid",
    plan: "Professional",
    period: "Monthly"
  },
  {
    id: "inv_002",
    date: "2024-10-15",
    amount: 9.99,
    status: "paid",
    plan: "Professional",
    period: "Monthly"
  },
  {
    id: "inv_003",
    date: "2024-09-15",
    amount: 9.99,
    status: "paid",
    plan: "Professional",
    period: "Monthly"
  }
];

const mockResumeHistory = [
  {
    id: "resume_001",
    title: "Software Engineer Resume",
    template: "Modern Professional",
    lastModified: "2024-11-20",
    downloads: 3
  },
  {
    id: "resume_002",
    title: "Senior Developer Resume",
    template: "Tech Minimalist",
    lastModified: "2024-11-18",
    downloads: 2
  },
  {
    id: "resume_003",
    title: "Full Stack Resume",
    template: "Creative Designer",
    lastModified: "2024-11-15",
    downloads: 1
  }
];

export default function AccountPage() {
  const { user, signOut, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    plan: "Professional",
    planExpiry: "2024-12-15",
    joinDate: "2024-01-15",
    resumesCreated: 12,
    downloadsUsed: 45,
    downloadsLimit: -1, // -1 means unlimited
  });

  // Update userInfo when user from auth context changes
  useEffect(() => {
    if (user) {
      setUserInfo(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    try {
      await signOutGoogle();
      signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
      signOut();
      window.location.href = "/";
    }
  };

  // Redirect if not signed in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Please Sign In</h1>
          <p className="text-slate-600 mb-6">You need to sign in to access your account.</p>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.picture} />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.given_name || user.name.split(' ')[0]}!</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Crown className="w-3 h-3 mr-1" />
                    {userInfo.plan}
                  </Badge>
                  <span className="text-slate-500 text-sm">Member since {new Date(userInfo.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{userInfo.resumesCreated}</div>
                <p className="text-slate-600 text-sm">Resumes Created</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Download className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{userInfo.downloadsUsed}</div>
                <p className="text-slate-600 text-sm">Downloads Used</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">4.9</div>
                <p className="text-slate-600 text-sm">Avg. Rating</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">
                  {Math.ceil((new Date(userInfo.planExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <p className="text-slate-600 text-sm">Days Left</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="billing" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Billing
                </TabsTrigger>
                <TabsTrigger value="resumes" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  My Resumes
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={userInfo.location}
                          onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex gap-3">
                        <Button onClick={handleSaveProfile}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing Tab */}
              <TabsContent value="billing">
                <div className="space-y-6">
                  {/* Current Plan */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <Crown className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{userInfo.plan} Plan</h3>
                            <p className="text-slate-600">Renews on {new Date(userInfo.planExpiry).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">$9.99</div>
                          <p className="text-slate-600 text-sm">per month</p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-6">
                        <Button variant="outline" asChild>
                          <Link href="/pricing">Change Plan</Link>
                        </Button>
                        <Button variant="outline">Cancel Subscription</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Billing History */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockBillingHistory.map((invoice) => (
                          <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium">{invoice.plan} - {invoice.period}</p>
                                <p className="text-slate-600 text-sm">{new Date(invoice.date).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">${invoice.amount}</div>
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                {invoice.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* My Resumes Tab */}
              <TabsContent value="resumes">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>My Resumes</CardTitle>
                    <Button asChild>
                      <Link href="/builder">
                        Create New Resume
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockResumeHistory.map((resume) => (
                        <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">{resume.title}</h3>
                              <p className="text-slate-600 text-sm">
                                {resume.template} • Last modified {new Date(resume.lastModified).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right text-sm text-slate-600">
                              <div>{resume.downloads} downloads</div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/builder?resume=${resume.id}`}>
                                Edit
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-slate-600 text-sm">Receive updates about your account and new features</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Privacy Settings</h3>
                          <p className="text-slate-600 text-sm">Manage your data and privacy preferences</p>
                        </div>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-slate-600 text-sm">Add an extra layer of security to your account</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Shield className="w-4 h-4 mr-2" />
                          Enable
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-red-600">Delete Account</h3>
                          <p className="text-slate-600 text-sm">Permanently delete your account and all data</p>
                        </div>
                        <Button variant="destructive" size="sm">Delete Account</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}