'use client'

import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface Campaign {
  id: string
  name: string
  channel: string
  status: string
  recipients: number
  delivered: number
  opens: number
  clicks: number
  conversions: number
  revenue: number
}

const CAMPAIGNS_DATA: Campaign[] = [
  {
    id: '1',
    name: 'Summer Flash Sale',
    channel: 'Email',
    status: 'Active',
    recipients: 15240,
    delivered: 14982,
    opens: 6245,
    clicks: 1847,
    conversions: 412,
    revenue: 18540,
  },
  {
    id: '2',
    name: 'New Product Launch',
    channel: 'WhatsApp',
    status: 'Active',
    recipients: 8320,
    delivered: 8102,
    opens: 5670,
    clicks: 1134,
    conversions: 284,
    revenue: 12560,
  },
  {
    id: '3',
    name: 'Birthday Month Offer',
    channel: 'WhatsApp',
    status: 'Active',
    recipients: 3450,
    delivered: 3412,
    opens: 2588,
    clicks: 412,
    conversions: 98,
    revenue: 4340,
  },
  {
    id: '4',
    name: 'Weekend Exclusive',
    channel: 'Email',
    status: 'Active',
    recipients: 18500,
    delivered: 17800,
    opens: 7120,
    clicks: 2136,
    conversions: 534,
    revenue: 23650,
  },
  {
    id: '5',
    name: 'Midnight Clearance',
    channel: 'Email',
    status: 'Completed',
    recipients: 22000,
    delivered: 21340,
    opens: 8536,
    clicks: 2135,
    conversions: 642,
    revenue: 28420,
  },
  {
    id: '6',
    name: 'Loyalty Rewards',
    channel: 'Email',
    status: 'Completed',
    recipients: 8900,
    delivered: 8450,
    opens: 3470,
    clicks: 845,
    conversions: 189,
    revenue: 8340,
  },
  {
    id: '7',
    name: 'Member Only',
    channel: 'WhatsApp',
    status: 'Completed',
    recipients: 4200,
    delivered: 4100,
    opens: 2870,
    clicks: 574,
    conversions: 143,
    revenue: 6340,
  },
  {
    id: '8',
    name: 'Back to School',
    channel: 'RCS',
    status: 'Scheduled',
    recipients: 12000,
    delivered: 0,
    opens: 0,
    clicks: 0,
    conversions: 0,
    revenue: 0,
  },
]

type SortKey = keyof Campaign
type SortOrder = 'asc' | 'desc'

export function CampaignComparison() {
  const [sortKey, setSortKey] = useState<SortKey>('revenue')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('desc')
    }
  }

  const sortedCampaigns = [...CAMPAIGNS_DATA].sort((a, b) => {
    const aVal = a[sortKey]
    const bVal = b[sortKey]

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
    }
    return 0
  })

  const CHANNEL_COLORS: Record<string, string> = {
    Email: 'bg-red-900/30 text-red-300 border-red-700',
    WhatsApp: 'bg-green-900/30 text-green-300 border-green-700',
    SMS: 'bg-blue-900/30 text-blue-300 border-blue-700',
    RCS: 'bg-orange-900/30 text-orange-300 border-orange-700',
  }

  const STATUS_COLORS: Record<string, string> = {
    Active: 'bg-green-900/30 text-green-300 border-green-700',
    Scheduled: 'bg-blue-900/30 text-blue-300 border-blue-700',
    Completed: 'bg-gray-900/30 text-gray-300 border-gray-700',
  }

  const SortHeader = ({ label, sortBy }: { label: string; sortBy: SortKey }) => (
    <button
      onClick={() => handleSort(sortBy)}
      className="flex items-center gap-1 hover:text-accent transition-colors"
    >
      {label}
      <ArrowUpDown className="w-3 h-3 opacity-50" />
    </button>
  )

  return (
    <Card className="bg-card border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Campaign Comparison</h3>
        <button className="px-3 py-1.5 bg-secondary text-foreground text-sm rounded hover:bg-secondary/80 transition-colors">
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Campaign</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Channel</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium cursor-pointer hover:text-foreground">
                <SortHeader label="Recipients" sortBy="recipients" />
              </th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium cursor-pointer hover:text-foreground">
                <SortHeader label="Delivered" sortBy="delivered" />
              </th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium cursor-pointer hover:text-foreground">
                <SortHeader label="Opens" sortBy="opens" />
              </th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium cursor-pointer hover:text-foreground">
                <SortHeader label="Clicks" sortBy="clicks" />
              </th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium cursor-pointer hover:text-foreground">
                <SortHeader label="Conversions" sortBy="conversions" />
              </th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium cursor-pointer hover:text-foreground">
                <SortHeader label="Revenue" sortBy="revenue" />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCampaigns.map((campaign) => (
              <tr key={campaign.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                <td className="py-3 px-4 text-foreground font-medium">{campaign.name}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${CHANNEL_COLORS[campaign.channel]}`}>
                    {campaign.channel}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${STATUS_COLORS[campaign.status]}`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right text-foreground">{campaign.recipients.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-foreground">{campaign.delivered.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-foreground">{campaign.opens.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-foreground">{campaign.clicks.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-primary font-semibold">{campaign.conversions.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-accent font-semibold">₹{campaign.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
