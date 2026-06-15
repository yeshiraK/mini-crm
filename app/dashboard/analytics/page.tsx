'use client'

import { useStore } from '@/lib/store'
import { KPICards } from '@/components/analytics/kpi-cards'
import { EngagementTrend } from '@/components/analytics/engagement-trend'
import { ChannelDistribution } from '@/components/analytics/channel-distribution'
import { DeliveryRateChart } from '@/components/analytics/delivery-rate-chart'
import { SendTimeHeatmap } from '@/components/analytics/send-time-heatmap'
import { CampaignComparison } from '@/components/analytics/campaign-comparison'

export default function AnalyticsPage() {
  const { dateRange, setDateRange } = useStore()

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Campaign performance and engagement metrics</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as '7d' | '30d' | '1y' | 'today' | 'custom')}
          className="bg-card border border-border text-foreground px-4 py-2 rounded-lg text-sm"
        >
          <option value="today" className="bg-card text-foreground">Today</option>
          <option value="7d" className="bg-card text-foreground">Last 7 Days</option>
          <option value="30d" className="bg-card text-foreground">Last 30 Days</option>
          <option value="1y" className="bg-card text-foreground">Last Year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <KPICards dateRange={dateRange} />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EngagementTrend dateRange={dateRange} />
        </div>
        <div>
          <ChannelDistribution />
        </div>
      </div>

      {/* Delivery Rate Chart */}
      <DeliveryRateChart />

      {/* Send Time Heatmap */}
      <SendTimeHeatmap />

      {/* Campaign Comparison */}
      <CampaignComparison />
    </div>
  )
}
