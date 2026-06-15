import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { customers } from '@/lib/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const data = await db.select().from(customers).orderBy(desc(customers.totalSpend)).limit(100)
    const mapped = data.map(c => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      city: c.city,
      status: c.tag, // map db tag column to status for frontend
      totalSpend: c.totalSpend,
      orderCount: c.orderCount,
      lastPurchaseAt: c.lastPurchaseAt?.toISOString(),
      createdAt: c.createdAt?.toISOString(),
    }))
    return NextResponse.json(mapped)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
  }
}
