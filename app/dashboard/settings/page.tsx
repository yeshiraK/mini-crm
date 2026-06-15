'use client'

import { Card } from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <div className="p-6">
      <Card className="bg-card border-border p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Settings</h2>
        <p className="text-muted-foreground">Manage your account and application settings.</p>
      </Card>
    </div>
  )
}
