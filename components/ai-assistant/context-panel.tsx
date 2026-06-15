'use client'

import { BarChart3, TrendingUp, Users, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ContextPanel() {
  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <h3 className="font-semibold text-foreground">Context & Insights</h3>
        <p className="text-xs text-muted-foreground mt-1">Live campaign data</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Live Stats */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            Live Stats
          </h4>

          <div className="space-y-2">
            <div className="bg-secondary rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Active Campaigns</p>
              <p className="text-2xl font-bold text-primary">5</p>
              <p className="text-xs text-green-400 mt-1">↑ 2 this week</p>
            </div>

            <div className="bg-secondary rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Today&apos;s Engagement</p>
              <p className="text-2xl font-bold text-accent">12,480</p>
              <p className="text-xs text-green-400 mt-1">↑ 8% vs yesterday</p>
            </div>

            <div className="bg-secondary rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Conversion Rate</p>
              <p className="text-2xl font-bold text-orange-400">3.2%</p>
              <p className="text-xs text-yellow-400 mt-1">↑ Average trend</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Quick Actions
          </h4>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start text-xs bg-secondary hover:bg-secondary/80">
              📊 View Dashboard
            </Button>
            <Button variant="outline" className="w-full justify-start text-xs bg-secondary hover:bg-secondary/80">
              ✨ Create Segment
            </Button>
            <Button variant="outline" className="w-full justify-start text-xs bg-secondary hover:bg-secondary/80">
              📧 Draft Campaign
            </Button>
            <Button variant="outline" className="w-full justify-start text-xs bg-secondary hover:bg-secondary/80">
              📈 View Analytics
            </Button>
          </div>
        </div>

        {/* Recent Insights */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-accent" />
            Recent Insights
          </h4>

          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3">
            <p className="text-xs font-medium text-blue-300 mb-1">Top Channel</p>
            <p className="text-sm text-foreground">Email drives 45% of conversions</p>
            <p className="text-xs text-muted-foreground mt-1">From 2.4K delivers today</p>
          </div>

          <div className="bg-green-900/20 border border-green-700 rounded-lg p-3">
            <p className="text-xs font-medium text-green-300 mb-1">Best Time</p>
            <p className="text-sm text-foreground">10 AM on Wednesday</p>
            <p className="text-xs text-muted-foreground mt-1">Peak engagement window</p>
          </div>
        </div>
      </div>
    </div>
  )
}
