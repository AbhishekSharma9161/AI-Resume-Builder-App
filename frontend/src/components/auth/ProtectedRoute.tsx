'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Redirect to login with return URL
      const returnUrl = encodeURIComponent(pathname)
      router.push(`/login?return_url=${returnUrl}`)
    }
  }, [isLoaded, isSignedIn, router, pathname])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    return null
  }

  return <>{children}</>
}