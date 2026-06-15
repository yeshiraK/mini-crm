'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CampaignDetailDrawerProps {
  campaignId: string
  onClose: () => void
}

const CAMPAIGN_DETAILS: Record<string, any> = {
  '1': {
    name: 'Summer Flash Sale',
    channel: 'Email',
    status: 'Active',
    recipients: 15240,
    delivered: 14982,
    opened: 6245,
    clicked: 1847,
    conversions: 412,
    revenue: 18540,
    created: '2024-06-10',
    updated: '2024-06-15 14:32',
    timeline: [
      { time: '2024-06-10 09:00', event: 'Campaign Created' },
      { time: '2024-06-10 10:30', event: 'Campaign Scheduled' },
      { time: '2024-06-10 15:00', event: 'Campaign Started' },
      { time: '2024-06-11 06:00', event: '5000 Emails Sent' },
      { time: '2024-06-11 12:00', event: 'Campaign Completed' },
    ],
  },
  '2': {
    name: 'New Product Launch',
    channel: 'WhatsApp',
    status: 'Active',
    recipients: 8320,
    delivered: 8102,
    opened: 5670,
    clicked: 1134,
    conversions: 284,
    revenue: 12560,
    created: '2024-06-15',
    updated: '2024-06-17 10:15',
    timeline: [
      { time: '2024-06-15 08:00', event: 'Campaign Created' },
      { time: '2024-06-15 09:00', event: 'Campaign Started' },
      { time: '2024-06-16 12:00', event: '4050 Messages Sent' },
      { time: '2024-06-17 10:15', event: 'Ongoing' },
    ],
  },
}

export function CampaignDetailDrawer({ campaignId, onClose }: CampaignDetailDrawerProps) {
  const campaign = CAMPAIGN_DETAILS[campaignId] || {
    name: 'Unknown Campaign',
    channel: 'Email',
    status: 'Draft',
    recipients: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    conversions: 0,
    revenue: 0,
    created: '2024-06-01',
    updated: '2024-06-01',
    timeline: [],
  }

  const deliveredPct = campaign.recipients > 0 ? (campaign.delivered / campaign.recipients) * 100 : 0
  const openedPct = campaign.delivered > 0 ? (campaign.opened / campaign.delivered) * 100 : 0
  const clickedPct = campaign.delivered > 0 ? (campaign.clicked / campaign.delivered) * 100 : 0

  return (
    <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in">
      <div className="animate-in slide-in-from-right fixed right-0 top-0 h-full w-full md:w-2/5 bg-card border-l border-border flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">{campaign.name}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Status & Channel */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <p className="text-sm font-semibold text-foreground">{campaign.status}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Channel</p>
              <p className="text-sm font-semibold text-foreground">{campaign.channel}</p>
            </div>
          </div>

          {/* KPIs */}
          <div className="bg-secondary rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-foreground text-sm">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Recipients</p>
                <p className="text-lg font-bold text-primary">{campaign.recipients.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Delivered</p>
                <p className="text-lg font-bold text-accent">{campaign.delivered.toLocaleString()} ({deliveredPct.toFixed(0)}%)</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Opened</p>
                <p className="text-lg font-bold text-orange-400">{campaign.opened.toLocaleString()} ({openedPct.toFixed(0)}%)</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Clicked</p>
                <p className="text-lg font-bold text-pink-400">{campaign.clicked.toLocaleString()} ({clickedPct.toFixed(0)}%)</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Conversions</p>
                <p className="text-lg font-bold text-green-400">{campaign.conversions.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                <p className="text-lg font-bold text-yellow-400">₹{campaign.revenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm">Activity Timeline</h3>
            <div className="space-y-2">
              {campaign.timeline.map((event: any, idx: number) => (
                <div key={idx} className="flex gap-3 text-xs">
                  <div className="w-20 text-muted-foreground flex-shrink-0">{event.time}</div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                    <span className="text-foreground">{event.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-border p-6 flex gap-3">
          <Button variant="outline" className="flex-1">
            Edit
          </Button>
          <Button variant="outline" className="flex-1">
            Duplicate
          </Button>
          <Button variant="outline" className="flex-1 hover:bg-red-900/20 hover:text-red-400">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
