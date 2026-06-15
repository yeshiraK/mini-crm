import { Card } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
}

export function KPICard({ title, value, change, changeType }: KPICardProps) {
  const changeColor =
    changeType === 'positive'
      ? 'text-success'
      : changeType === 'negative'
        ? 'text-destructive'
        : 'text-muted-foreground'

  return (
    <Card className="bg-card border-border p-6">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-foreground">{value}</p>
          <div className={`flex items-center gap-1 ${changeColor} text-sm font-medium`}>
            {changeType === 'positive' && <TrendingUp className="h-4 w-4" />}
            {change}
          </div>
        </div>
      </div>
    </Card>
  )
}
