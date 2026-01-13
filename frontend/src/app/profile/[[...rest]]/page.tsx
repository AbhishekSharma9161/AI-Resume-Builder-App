import { UserProfile } from '@clerk/nextjs'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Profile Settings</h1>
            <p className="text-slate-600">
              Manage your account settings and preferences
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm">
            <UserProfile 
              appearance={{
                elements: {
                  card: "shadow-none border-0",
                  navbar: "hidden",
                  navbarMobileMenuButton: "hidden",
                  headerTitle: "text-2xl font-bold",
                  headerSubtitle: "text-slate-600"
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}