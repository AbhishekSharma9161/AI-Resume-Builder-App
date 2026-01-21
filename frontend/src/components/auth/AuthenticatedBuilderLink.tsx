'use client'

import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface AuthenticatedBuilderLinkProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'lg' | 'default'
  asChild?: boolean
}

export default function AuthenticatedBuilderLink({ 
  children, 
  className,
  variant = 'default',
  size = 'default',
  asChild = true
}: AuthenticatedBuilderLinkProps) {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        className={className} 
        disabled
      >
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Loading...
      </Button>
    )
  }

  const href = isSignedIn ? '/builder' : '/login'

  if (asChild) {
    return (
      <Button asChild variant={variant} size={size} className={className}>
        <Link href={href}>
          {children}
        </Link>
      </Button>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}