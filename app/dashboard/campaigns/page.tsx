'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CampaignsGrid } from '@/components/campaigns/campaigns-grid'
import { CampaignDetailDrawer } from '@/components/campaigns/campaign-detail-drawer'
import { NewCampaignDrawer } from '@/components/campaigns/new-campaign-drawer'
import { getCampaigns } from '@/lib/api'
import { Campaign } from '@/lib/types'

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)
  const [showNewCampaign, setShowNewCampaign] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCampaigns = async () => {
      const data = await getCampaigns()
      setCampaigns(data)
      setLoading(false)
    }
    loadCampaigns()
  }, [])

  const handleCampaignCreated = (newCampaign: Campaign) => {
    setCampaigns((prev) => [...prev, newCampaign])
  }

  // Calculate filter counts
  const filterCounts = {
    all: campaigns.length,
    active: campaigns.filter(c => c.status === 'active').length,
    scheduled: campaigns.filter(c => c.status === 'scheduled').length,
    completed: campaigns.filter(c => c.status === 'completed').length,
    failed: campaigns.filter(c => c.status === 'failed').length,
    draft: campaigns.filter(c => c.status === 'draft').length,
  }

  const FILTER_TABS = [
    { id: 'all', label: 'All', count: filterCounts.all },
    { id: 'active', label: 'Active', count: filterCounts.active },
    { id: 'scheduled', label: 'Scheduled', count: filterCounts.scheduled },
    { id: 'completed', label: 'Completed', count: filterCounts.completed },
    { id: 'failed', label: 'Failed', count: filterCounts.failed },
    { id: 'draft', label: 'Draft', count: filterCounts.draft },
  ]

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and create your marketing campaigns</p>
        </div>
        <Button 
          onClick={() => setShowNewCampaign(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          New Campaign
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="space-y-4">
        <Input
          placeholder="Search campaigns..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-card border-border"
        />

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                activeFilter === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-secondary'
              }`}
            >
              {tab.label} <span className="ml-1 text-xs opacity-70">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Grid */}
      <CampaignsGrid 
        campaigns={campaigns}
        filter={activeFilter}
        searchQuery={searchQuery}
        onSelectCampaign={setSelectedCampaign}
      />

      {/* Campaign Detail Drawer */}
      {selectedCampaign && (
        <CampaignDetailDrawer
          campaignId={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}

      {/* New Campaign Drawer */}
      {showNewCampaign && (
        <NewCampaignDrawer
          onClose={() => {
            setShowNewCampaign(false)
          }}
          onCampaignCreated={handleCampaignCreated}
        />
      )}
    </div>
  )
}
