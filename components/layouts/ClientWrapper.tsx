"use client"

import { useEffect } from 'react'

interface ClientWrapperProps {
  children: React.ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  useEffect(() => {
    // Apply the hide-scrollbar class to the body element on mount
    document.body.classList.add('hide-scrollbar', 'bg-background', 'text-foreground')
    return () => {
      document.body.classList.remove('hide-scrollbar', 'bg-background', 'text-foreground')
    }
  }, [])

  return <>{children}</>
}
