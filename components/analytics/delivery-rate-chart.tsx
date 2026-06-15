'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'

const DELIVERY_DATA = [
  { channel: 'Email', rate: 94.2, color: '#6366F1' },
  { channel: 'WhatsApp', rate: 97.8, color: '#10B981' },
  { channel: 'SMS', rate: 91.5, color: '#F59E0B' },
  { channel: 'RCS', rate: 88.3, color: '#8B5CF6' },
]

export function DeliveryRateChart() {
  return (
    <Card className="bg-card border border-[#2A2D3E] p-6 rounded-lg" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
      <h3 className="text-lg font-semibold text-foreground mb-6">Delivery Rate by Channel</h3>
      
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={DELIVERY_DATA}
          layout="vertical"
          margin={{ top: 5, right: 60, left: 100, bottom: 5 }}
        >
          <CartesianGrid
            stroke="#1E2130"
            vertical={false}
            strokeDasharray="0"
          />
          <XAxis
            type="number"
            stroke="#a3a3a3"
            domain={[0, 100]}
            style={{ fontSize: '12px' }}
          />
          <YAxis
            type="category"
            dataKey="channel"
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
            formatter={(value) => `${(value as number).toFixed(1)}%`}
            labelFormatter={(label) => `${label}`}
          />
          <Bar
            dataKey="rate"
            radius={[0, 8, 8, 0]}
            isAnimationActive={true}
            animationDuration={800}
          >
            {DELIVERY_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Percentage Labels */}
      <div className="mt-4 space-y-2 text-sm">
        {DELIVERY_DATA.map((item) => (
          <div key={item.channel} className="flex items-center justify-between">
            <span className="text-muted-foreground">{item.channel}</span>
            <span className="text-foreground font-semibold">{item.rate}%</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
