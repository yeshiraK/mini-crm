import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { customers, campaigns } from '@/lib/schema'
import { sql } from 'drizzle-orm'

export async function GET() {
  try {
    const [customerCount] = await db.select({ count: sql<number>`count(*)` }).from(customers)
    const [campaignCount] = await db.select({ count: sql<number>`count(*)` }).from(campaigns)
    const allCampaigns = await db.select().from(campaigns)
    
    const avgOpenRate = allCampaigns.reduce((sum, c) => {
      return sum + (c.deliveredCount ? (c.openedCount! / c.deliveredCount!) : 0)
    }, 0) / (allCampaigns.length || 1)

    return NextResponse.json({
      totalCustomers: customerCount.count,
      totalCampaigns: campaignCount.count,
      avgOpenRate: (avgOpenRate * 100).toFixed(1),
      activeCampaigns: allCampaigns.filter(c => c.status === 'active').length,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 })
  }
}
