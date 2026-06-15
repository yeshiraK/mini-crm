'use client'

import { Campaign } from '@/lib/types'
import { CampaignCard } from './campaign-card'

interface CampaignsGridProps {
  campaigns: Campaign[]
  filter: string
  searchQuery: string
  onSelectCampaign: (id: string) => void
}

export function CampaignsGrid({ campaigns, filter, searchQuery, onSelectCampaign }: CampaignsGridProps) {
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesFilter = filter === 'all' || campaign.status === filter
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCampaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          onClick={() => onSelectCampaign(campaign.id)}
        />
      ))}
    </div>
  )
}
