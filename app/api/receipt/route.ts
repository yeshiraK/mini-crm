import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { communicationEvents, campaigns } from '@/lib/schema'
import { eq, sql } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  try {
    const { messageId, campaignId, customerId, channel, status, timestamp } = await req.json()

    if (!messageId || !campaignId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Idempotency check — if this messageId + status combo exists, skip
    const existing = await db
      .select()
      .from(communicationEvents)
      .where(eq(communicationEvents.messageId, messageId))
      .limit(1)

    if (existing.length > 0 && existing[0].status === status) {
      console.log(`Duplicate receipt ignored: ${messageId} ${status}`)
      return NextResponse.json({ status: 'duplicate_ignored' })
    }

    // Upsert the event
    await db.insert(communicationEvents).values({
      campaignId,
      customerId,
      messageId,
      channel,
      status,
      eventAt: timestamp ? new Date(timestamp) : new Date(),
    }).onConflictDoUpdate({
      target: communicationEvents.messageId,
      set: { status, eventAt: new Date() }
    })

    // Update campaign counters
    if (status === 'delivered') {
      await db.update(campaigns)
        .set({ deliveredCount: sql`${campaigns.deliveredCount} + 1` })
        .where(eq(campaigns.id, campaignId))
    } else if (status === 'opened') {
      await db.update(campaigns)
        .set({ openedCount: sql`${campaigns.openedCount} + 1` })
        .where(eq(campaigns.id, campaignId))
    } else if (status === 'clicked') {
      await db.update(campaigns)
        .set({ clickedCount: sql`${campaigns.clickedCount} + 1` })
        .where(eq(campaigns.id, campaignId))
    } else if (status === 'failed') {
      await db.update(campaigns)
        .set({ failedCount: sql`${campaigns.failedCount} + 1` })
        .where(eq(campaigns.id, campaignId))
    }

    return NextResponse.json({ status: 'ok' })
  } catch (err) {
    console.error('Receipt API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
