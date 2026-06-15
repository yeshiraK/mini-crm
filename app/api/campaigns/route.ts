import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { campaigns, customers, communicationEvents } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  try {
    const data = await db.select().from(campaigns).orderBy(campaigns.createdAt)
    return NextResponse.json(data)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, description, message, channel, segmentId, status } = body

    // Get customers for this segment (simplified: get all for now)
    const allCustomers = await db.select().from(customers).limit(100)

    // Create campaign
    const [newCampaign] = await db.insert(campaigns).values({
      name,
      description,
      message,
      channel,
      segmentId,
      status: status || 'active',
      totalRecipients: allCustomers.length,
      sentCount: allCustomers.length,
      deliveredCount: 0,
      openedCount: 0,
      clickedCount: 0,
      failedCount: 0,
      launchedAt: new Date(),
    }).returning()

    const CHANNEL_STUB_URL = process.env.CHANNEL_STUB_URL || 'http://localhost:3001'

    // Dispatch to channel stub for each customer
    const sendPromises = allCustomers.map(async (customer) => {
      const messageId = uuidv4()

      // Insert initial sent event
      await db.insert(communicationEvents).values({
        campaignId: newCampaign.id,
        customerId: customer.id,
        messageId,
        channel,
        status: 'sent',
      })

      // Fire and forget to channel stub
      fetch(`${CHANNEL_STUB_URL}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId,
          campaignId: newCampaign.id,
          customerId: customer.id,
          channel,
          message: message.replace('{name}', customer.name).replace('{city}', customer.city || ''),
          recipient: customer.phone || customer.email,
        }),
      }).catch(err => console.error('Channel stub error:', err))
    })

    await Promise.all(sendPromises)

    return NextResponse.json(newCampaign, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 })
  }
}
