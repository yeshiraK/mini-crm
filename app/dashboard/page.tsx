'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { KPICard } from '@/components/dashboard/kpi-card'
import { EngagementChart } from '@/components/dashboard/engagement-chart'
import { TopCampaigns } from '@/components/dashboard/top-campaigns'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { Download, RotateCw, Plus } from 'lucide-react'
import { useStore } from '@/lib/store'

export default function DashboardPage() {
  const { dateRange, setDateRange } = useStore()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <div className="p-6 space-y-6 overflow-auto">
      {/* Action Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Button
            variant={dateRange === 'today' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('today')}
            className={dateRange === 'today' ? 'bg-primary' : ''}
          >
            Today
          </Button>
          <Button
            variant={dateRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('7d')}
            className={dateRange === '7d' ? 'bg-primary' : ''}
          >
            Last 7 Days
          </Button>
          <Button
            variant={dateRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('30d')}
            className={dateRange === '30d' ? 'bg-primary' : ''}
          >
            Last Month
          </Button>
          <Button
            variant={dateRange === '1y' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('1y')}
            className={dateRange === '1y' ? 'bg-primary' : ''}
          >
            Last Year
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RotateCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Customers"
          value="12,847"
          change="+8.2%"
          changeType="positive"
        />
        <KPICard
          title="Total Campaigns"
          value="143"
          change="+3 this week"
          changeType="positive"
        />
        <KPICard
          title="Average Open Rate"
          value="34.7%"
          change="+2.1%"
          changeType="positive"
        />
        <KPICard
          title="Revenue Attributed"
          value="₹24,83,400"
          change="+12.4%"
          changeType="positive"
        />
      </div>

      {/* Engagement Trend */}
      <Card className="bg-card border-border p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Engagement Trend</h3>
            <p className="text-sm text-muted-foreground">Email delivery and open rates over time</p>
          </div>
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="bg-secondary">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="mt-6">
              <EngagementChart period="daily" />
            </TabsContent>
            <TabsContent value="weekly" className="mt-6">
              <EngagementChart period="weekly" />
            </TabsContent>
            <TabsContent value="monthly" className="mt-6">
              <EngagementChart period="monthly" />
            </TabsContent>
            <TabsContent value="yearly" className="mt-6">
              <EngagementChart period="yearly" />
            </TabsContent>
          </Tabs>
        </div>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TopCampaigns />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
