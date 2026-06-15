'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const HOURS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)

// Mock heatmap data (0-100 scale)
const generateHeatmapData = () => {
  const data: Record<string, Record<string, number>> = {}
  DAYS.forEach((day) => {
    data[day] = {}
    HOURS.forEach((hour) => {
      data[day][hour] = Math.floor(Math.random() * 100)
    })
  })
  return data
}

const HEATMAP_DATA = generateHeatmapData()

const getColor = (value: number): string => {
  const opacity = Math.max(0.1, value / 100)
  const baseColor = '#8B5CF6'
  // Convert to rgba using opacity for intensity effect
  return `rgba(139, 92, 246, ${opacity})`
}

export function SendTimeHeatmap() {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  return (
    <Card className="bg-card border border-[#2A2D3E] p-6 rounded-lg" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
      <h3 className="text-lg font-semibold text-foreground mb-6">Send Time Heatmap</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xs text-muted-foreground font-medium text-left pb-3 pr-3">Day</th>
              {HOURS.map((hour) => (
                <th
                  key={hour}
                  className="text-xs text-muted-foreground font-medium text-center pb-3"
                  style={{ minWidth: '40px' }}
                >
                  {hour}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day) => (
              <tr key={day}>
                <td className="text-xs font-medium text-foreground py-2 pr-3 whitespace-nowrap">{day.slice(0, 3)}</td>
                {HOURS.map((hour) => {
                  const value = HEATMAP_DATA[day][hour]
                  const cellId = `${day}-${hour}`
                  const isHovered = hoveredCell === cellId

                  return (
                    <td
                      key={hour}
                      onMouseEnter={() => setHoveredCell(cellId)}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`py-2 px-1 transition-all cursor-pointer ${
                        isHovered ? 'ring-2 ring-accent rounded' : ''
                      }`}
                      style={{
                        backgroundColor: getColor(value),
                        minWidth: '40px',
                        height: '40px',
                      }}
                      title={`${day} ${hour}: ${Math.round(value * 100)} messages sent`}
                    />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }} />
          <span className="text-muted-foreground">Low</span>
        </div>
        <span className="text-muted-foreground">—</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#8B5CF6' }} />
          <span className="text-muted-foreground">High</span>
        </div>
      </div>
    </Card>
  )
}
