'use client'

import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}