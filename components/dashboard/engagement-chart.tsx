'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = {
  daily: [
    { date: 'Mon', delivered: 4200, opened: 1440 },
    { date: 'Tue', delivered: 4800, opened: 1624 },
    { date: 'Wed', delivered: 5200, opened: 1800 },
    { date: 'Thu', delivered: 4600, opened: 1540 },
    { date: 'Fri', delivered: 5800, opened: 2020 },
    { date: 'Sat', delivered: 4900, opened: 1710 },
    { date: 'Sun', delivered: 3200, opened: 1100 },
  ],
  weekly: [
    { date: 'Week 1', delivered: 28400, opened: 9800 },
    { date: 'Week 2', delivered: 32800, opened: 11200 },
    { date: 'Week 3', delivered: 35200, opened: 12100 },
    { date: 'Week 4', delivered: 31600, opened: 10900 },
  ],
  monthly: [
    { date: 'Jan', delivered: 120000, opened: 41400 },
    { date: 'Feb', delivered: 145000, opened: 49800 },
    { date: 'Mar', delivered: 165000, opened: 56800 },
    { date: 'Apr', delivered: 142000, opened: 48900 },
    { date: 'May', delivered: 178000, opened: 61200 },
    { date: 'Jun', delivered: 165000, opened: 56700 },
  ],
  yearly: [
    { date: '2022', delivered: 1200000, opened: 414000 },
    { date: '2023', delivered: 1650000, opened: 569000 },
    { date: '2024', delivered: 1980000, opened: 682000 },
  ],
}

interface EngagementChartProps {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly'
}

export function EngagementChart({ period }: EngagementChartProps) {
  const chartData = data[period]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="date" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--card)',
            border: `1px solid var(--border)`,
            borderRadius: '0.5rem',
            color: 'var(--foreground)',
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="delivered"
          stroke="var(--chart-1)"
          name="Delivered"
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
        />
        <Line
          type="monotone"
          dataKey="opened"
          stroke="var(--chart-2)"
          name="Opened"
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
