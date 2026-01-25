'use client'

import { SignIn } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('return_url') || '/builder'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <SignIn 
          forceRedirectUrl={returnUrl}
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
              card: "shadow-xl",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-slate-600"
            }
          }}
        />
      </div>
    </div>
  )
}