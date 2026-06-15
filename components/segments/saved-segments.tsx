'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Edit2, Zap } from 'lucide-react'

const segments = [
  {
    id: 1,
    name: 'VIP High Spenders',
    description: 'Customers with >₹5 lakh total spend',
    count: 2145,
    updated: '2 days ago',
  },
  {
    id: 2,
    name: 'Lapsed Customers',
    description: 'No purchase in last 90 days',
    count: 1523,
    updated: '5 days ago',
  },
  {
    id: 3,
    name: 'New Joiners',
    description: 'Customers joined in last 30 days',
    count: 849,
    updated: '1 day ago',
  },
  {
    id: 4,
    name: 'Mumbai Loyalists',
    description: 'High-frequency buyers from Mumbai',
    count: 523,
    updated: '1 week ago',
  },
  {
    id: 5,
    name: 'At-Risk Shoppers',
    description: 'Declining purchase frequency',
    count: 432,
    updated: '3 days ago',
  },
]

export function SavedSegments() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Saved Segments</h2>

      <div className="space-y-3">
        {segments.map((segment) => (
          <Card key={segment.id} className="bg-card border-border p-4 hover:border-primary transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground">{segment.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{segment.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span>{segment.count.toLocaleString()} customers</span>
                  <span>Updated {segment.updated}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs"
              >
                <Zap className="h-3 w-3 mr-1" />
                Use in Campaign
              </Button>
              <Button variant="ghost" size="sm">
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-3 w-3 text-destructive" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
