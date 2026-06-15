'use client'

import { usePathname } from 'next/navigation'
import { Search, Bell } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface TopBarProps {
  onToggleSidebar: () => void
}

const pageLabels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/customers': 'Customers',
  '/dashboard/segments': 'Segments',
  '/dashboard/campaigns': 'Campaigns',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/ai-assistant': 'AI Assistant',
  '/dashboard/settings': 'Settings',
}

export function TopBar({ onToggleSidebar }: TopBarProps) {
  const pathname = usePathname()
  const pageTitle = pageLabels[pathname] || 'Dashboard'

  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between gap-6">
      <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-9 bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-foreground hover:bg-background relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full"></span>
        </Button>

        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold cursor-pointer">
          JD
        </div>
      </div>
    </header>
  )
}
