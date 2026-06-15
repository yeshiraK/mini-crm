import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MoreVertical } from 'lucide-react'

const campaigns = [
  {
    id: 1,
    name: 'Diwali Sale',
    channel: 'Email',
    recipients: 8420,
    openRate: 42,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Summer Collection',
    channel: 'SMS',
    recipients: 5230,
    openRate: 38,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Flash Sale',
    channel: 'Push',
    recipients: 3910,
    openRate: 51,
    status: 'Completed',
  },
  {
    id: 4,
    name: 'New Year Offer',
    channel: 'Email',
    recipients: 7680,
    openRate: 35,
    status: 'Scheduled',
  },
  {
    id: 5,
    name: 'Loyalty Program',
    channel: 'In-App',
    recipients: 4520,
    openRate: 28,
    status: 'Active',
  },
]

const channelBadgeColor: Record<string, string> = {
  Email: 'bg-blue-500/20 text-blue-300',
  SMS: 'bg-green-500/20 text-green-300',
  Push: 'bg-purple-500/20 text-purple-300',
  'In-App': 'bg-orange-500/20 text-orange-300',
}

const statusBadgeColor: Record<string, string> = {
  Active: 'bg-green-500/20 text-green-300',
  Completed: 'bg-gray-500/20 text-gray-300',
  Scheduled: 'bg-yellow-500/20 text-yellow-300',
}

export function TopCampaigns() {
  return (
    <Card className="bg-card border-border p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Top Campaigns by Open Rate</h3>
          <p className="text-sm text-muted-foreground">Your best performing campaigns</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Campaign Name</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Channel</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Recipients</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Open Rate</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{campaign.name}</td>
                  <td className="py-3 px-4">
                    <Badge className={`${channelBadgeColor[campaign.channel]} border-0`}>
                      {campaign.channel}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{campaign.recipients.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <Progress value={campaign.openRate} className="h-2" />
                      <span className="text-xs text-muted-foreground">{campaign.openRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={`${statusBadgeColor[campaign.status]} border-0`}>
                      {campaign.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}
