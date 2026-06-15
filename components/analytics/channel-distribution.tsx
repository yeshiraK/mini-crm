'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Card } from '@/components/ui/card'

const CHANNEL_DATA = [
  { name: 'Email', value: 45, color: '#6366F1' },
  { name: 'WhatsApp', value: 28, color: '#10B981' },
  { name: 'SMS', value: 18, color: '#F59E0B' },
  { name: 'RCS', value: 9, color: '#8B5CF6' },
]

const TOTAL_MESSAGES = 125430

export function ChannelDistribution() {
  return (
    <Card className="bg-card border border-[#2A2D3E] p-6 rounded-lg shadow-lg overflow-visible animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
      <h3 className="text-base font-semibold text-foreground mb-6">Channel Distribution</h3>
      
      <div className="flex flex-col items-center justify-center gap-6 overflow-visible">
        {/* Pie Chart */}
        <div className="relative w-[240px] h-[240px] flex items-center justify-center overflow-visible">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CHANNEL_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={false}
              >
                {CHANNEL_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A1D27',
                  border: '1px solid #2D3141',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
                itemStyle={{
                  color: '#ffffff'
                }}
                labelStyle={{
                  color: '#ffffff'
                }}
                formatter={(value) => `${value}%`}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Label */}
          <div className="absolute flex flex-col items-center justify-center pointer-events-none">
            <div className="text-2xl font-bold text-foreground">{(TOTAL_MESSAGES / 1000).toFixed(1)}K</div>
            <div className="text-xs text-muted-foreground">messages</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2">
          {CHANNEL_DATA.map((channel) => (
            <div key={channel.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: channel.color }}
              />
              <div className="text-xs font-medium text-foreground">{channel.name}</div>
              <div className="text-xs text-muted-foreground">{channel.value}%</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
