'use client'

import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface KPICardsProps {
  dateRange: '7d' | '30d' | '1y' | 'today' | 'custom'
}

export function KPICards({ dateRange }: KPICardsProps) {
  // Dynamically set values based on selected date range
  const getKPIValues = () => {
    switch (dateRange) {
      case 'today':
        return [
          { label: 'Total Delivered', value: '1,250', change: '+3.4%', isPositive: true },
          { label: 'Open Rate', value: '45.2%', change: '+5.1%', isPositive: true },
          { label: 'Click Rate', value: '21.4%', change: '+2.8%', isPositive: true },
          { label: 'Conversions', value: '48', change: '+8.3%', isPositive: true },
        ]
      case '7d':
        return [
          { label: 'Total Delivered', value: '18,450', change: '+10.2%', isPositive: true },
          { label: 'Open Rate', value: '43.8%', change: '+6.4%', isPositive: true },
          { label: 'Click Rate', value: '19.1%', change: '-1.5%', isPositive: false },
          { label: 'Conversions', value: '520', change: '+14.2%', isPositive: true },
        ]
      case '30d':
        return [
          { label: 'Total Delivered', value: '78,200', change: '+11.8%', isPositive: true },
          { label: 'Open Rate', value: '42.5%', change: '+7.1%', isPositive: true },
          { label: 'Click Rate', value: '18.6%', change: '-2.0%', isPositive: false },
          { label: 'Conversions', value: '2,150', change: '+21.5%', isPositive: true },
        ]
      case '1y':
      default:
        return [
          { label: 'Total Delivered', value: '2,48,540', change: '+12.5%', isPositive: true },
          { label: 'Open Rate', value: '42.8%', change: '+8.2%', isPositive: true },
          { label: 'Click Rate', value: '18.3%', change: '-2.1%', isPositive: false },
          { label: 'Conversions', value: '3,456', change: '+24.7%', isPositive: true },
        ]
    }
  }

  const baseKpis = getKPIValues()
  const colors = [
    { bgColor: 'bg-blue-900/20', textColor: 'text-blue-300' },
    { bgColor: 'bg-green-900/20', textColor: 'text-green-300' },
    { bgColor: 'bg-orange-900/20', textColor: 'text-orange-300' },
    { bgColor: 'bg-purple-900/20', textColor: 'text-purple-300' },
  ]

  const kpis = baseKpis.map((kpi, idx) => ({
    ...kpi,
    ...colors[idx],
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => (
        <div key={idx} className={`${kpi.bgColor} border border-border rounded-lg p-4`}>
          <p className="text-sm text-muted-foreground mb-2">{kpi.label}</p>
          <div className="flex items-end justify-between">
            <h3 className={`text-2xl font-bold ${kpi.textColor}`}>{kpi.value}</h3>
            <div className={`flex items-center gap-1 text-xs font-medium ${kpi.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {kpi.isPositive ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              {kpi.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
