'use client'

import { useState } from 'react'
import { Campaign } from '@/lib/types'

interface CampaignCardProps {
  campaign: Campaign
  onClick: () => void
}

const CHANNEL_COLORS = {
  email: { bg: '#FF6B35', icon: '📧' },
  whatsapp: { bg: '#25D366', icon: '💬' },
  sms: { bg: '#4A90E2', icon: '📱' },
  rcs: { bg: '#FF9500', icon: '📲' },
}

const STATUS_COLORS = {
  active: 'bg-green-900/30 text-green-300 border-green-700',
  scheduled: 'bg-blue-900/30 text-blue-300 border-blue-700',
  completed: 'bg-gray-900/30 text-gray-300 border-gray-700',
  draft: 'bg-yellow-900/30 text-yellow-300 border-yellow-700',
  failed: 'bg-red-900/30 text-red-300 border-red-700',
}

export function CampaignCard({ campaign, onClick }: CampaignCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const deliveredPct = campaign.deliveryCount > 0 ? (campaign.deliveryCount / campaign.deliveryCount) * 100 : 0
  const openedPct = campaign.deliveryCount > 0 ? (campaign.openCount / campaign.deliveryCount) * 100 : 0
  const clickedPct = campaign.deliveryCount > 0 ? (campaign.clickCount / campaign.deliveryCount) * 100 : 0

  const channelColor = CHANNEL_COLORS[campaign.channel as keyof typeof CHANNEL_COLORS]

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-card border border-border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
        isHovered ? 'border-accent bg-card/80 shadow-lg' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-sm truncate">{campaign.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">Created {campaign.createdAt}</p>
        </div>
        <div
          style={{ backgroundColor: channelColor.bg }}
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ml-2 text-lg"
        >
          {channelColor.icon}
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-3">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${STATUS_COLORS[campaign.status as keyof typeof STATUS_COLORS]}`}>
          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
        </span>
      </div>

      {/* Stats */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Delivered:</span>
          <span className="text-foreground font-medium">{campaign.deliveryCount.toLocaleString()}</span>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3 text-xs">
        {/* Delivered */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-muted-foreground">Delivered</span>
            <span className="text-foreground font-medium">{deliveredPct.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-primary"
              style={{ width: `${Math.min(deliveredPct, 100)}%` }}
            />
          </div>
        </div>

        {/* Opened */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-muted-foreground">Opened</span>
            <span className="text-foreground font-medium">{openedPct.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
              style={{ width: `${Math.min(openedPct, 100)}%` }}
            />
          </div>
        </div>

        {/* Clicked */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-muted-foreground">Clicked</span>
            <span className="text-foreground font-medium">{clickedPct.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              style={{ width: `${Math.min(clickedPct, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
