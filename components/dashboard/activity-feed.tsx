import { Card } from '@/components/ui/card'
import { Rocket, Users, Mail, Upload, CheckCircle } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'campaign_launched',
    message: 'Campaign "Diwali Sale" launched',
    time: '2 min ago',
    icon: Rocket,
  },
  {
    id: 2,
    type: 'segment_updated',
    message: 'Segment "VIP Customers" updated',
    time: '15 min ago',
    icon: Users,
  },
  {
    id: 3,
    type: 'messages_delivered',
    message: '1,240 messages delivered',
    time: '1 hr ago',
    icon: Mail,
  },
  {
    id: 4,
    type: 'batch_imported',
    message: 'New customer batch imported',
    time: '3 hrs ago',
    icon: Upload,
  },
  {
    id: 5,
    type: 'campaign_completed',
    message: 'Campaign "Flash Sale" completed',
    time: '5 hrs ago',
    icon: CheckCircle,
  },
]

export function ActivityFeed() {
  return (
    <Card className="bg-card border-border p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest events and updates</p>
        </div>

        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
              >
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
