'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  defs,
  linearGradient,
  stop,
} from 'recharts'
import { Card } from '@/components/ui/card'

const DAILY_DATA = [
  { date: 'Mon', delivered: 4200, opened: 2400, clicked: 890 },
  { date: 'Tue', delivered: 5100, opened: 2800, clicked: 1020 },
  { date: 'Wed', delivered: 4800, opened: 2600, clicked: 950 },
  { date: 'Thu', delivered: 6200, opened: 3100, clicked: 1240 },
  { date: 'Fri', delivered: 7100, opened: 3400, clicked: 1380 },
  { date: 'Sat', delivered: 5900, opened: 2900, clicked: 1100 },
  { date: 'Sun', delivered: 4500, opened: 2200, clicked: 820 },
]

const WEEKLY_DATA = [
  { week: 'W1', delivered: 45200, opened: 24000, clicked: 8900 },
  { week: 'W2', delivered: 52100, opened: 28000, clicked: 10200 },
  { week: 'W3', delivered: 48800, opened: 26000, clicked: 9500 },
  { week: 'W4', delivered: 61200, opened: 31000, clicked: 12400 },
]

interface EngagementTrendProps {
  dateRange: string
}

export function EngagementTrend({ dateRange }: EngagementTrendProps) {
  const [timeframe, setTimeframe] = useState('daily')

  const data = timeframe === 'daily' ? DAILY_DATA : WEEKLY_DATA
  const xKey = timeframe === 'daily' ? 'date' : 'week'

  return (
    <Card className="bg-card border border-[#2A2D3E] p-6 rounded-lg" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Engagement Trend</h3>
        <div className="flex gap-2">
          {['daily', 'weekly', 'monthly', 'yearly'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                timeframe === tf
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
            >
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="grad-delivered" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad-opened" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad-clicked" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="#1E2130"
            vertical={false}
            strokeDasharray="0"
          />
          <XAxis
            dataKey={xKey}
            stroke="#a3a3a3"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#a3a3a3"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1D27',
              border: '1px solid #2D3141',
              borderRadius: '8px',
              color: '#f5f5f5',
            }}
            wrapperStyle={{ outline: 'none' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
            formatter={(value) => <span className="text-muted-foreground text-xs">{value}</span>}
          />
          <Line
            type="monotone"
            dataKey="delivered"
            stroke="#6366F1"
            strokeWidth={2.5}
            dot={false}
            name="Delivered"
            isAnimationActive={true}
            fill="url(#grad-delivered)"
          />
          <Line
            type="monotone"
            dataKey="opened"
            stroke="#10B981"
            strokeWidth={2.5}
            dot={false}
            name="Opened"
            isAnimationActive={true}
            fill="url(#grad-opened)"
          />
          <Line
            type="monotone"
            dataKey="clicked"
            stroke="#F59E0B"
            strokeWidth={2.5}
            dot={false}
            name="Clicked"
            isAnimationActive={true}
            fill="url(#grad-clicked)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
