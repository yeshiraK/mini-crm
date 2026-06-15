import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { customers, campaigns, segments, communicationEvents } from '@/lib/schema'
import { eq, gte, lte, sql, desc } from 'drizzle-orm'

const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

// Tool definitions for Gemini
const tools = [
  {
    name: 'query_segment',
    description: 'Query customers from the database based on filters like tag, city, minimum spend, days since last purchase',
    parameters: {
      type: 'object',
      properties: {
        tag: { type: 'string', enum: ['vip', 'regular', 'at-risk', 'new', 'loyal'], description: 'Customer tag' },
        city: { type: 'string', description: 'City name e.g. Mumbai, Delhi' },
        minSpend: { type: 'number', description: 'Minimum total spend in rupees' },
        maxSpend: { type: 'number', description: 'Maximum total spend in rupees' },
        daysSinceLastPurchase: { type: 'number', description: 'Customers who have not purchased in this many days' },
      },
    },
  },
  {
    name: 'get_campaign_insights',
    description: 'Get performance statistics for campaigns',
    parameters: {
      type: 'object',
      properties: {
        campaignId: { type: 'string', description: 'Specific campaign ID, or omit for all campaigns' },
      },
    },
  },
  {
    name: 'create_campaign',
    description: 'Create and launch a campaign after user approval',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Campaign name' },
        message: { type: 'string', description: 'Message text with {name} and {city} as personalization tokens' },
        channel: { type: 'string', enum: ['whatsapp', 'email', 'sms', 'rcs'] },
        description: { type: 'string', description: 'Campaign description' },
        segmentFilters: { type: 'object', description: 'Filters used to build the segment' },
      },
      required: ['name', 'message', 'channel'],
    },
  },
  {
    name: 'get_dashboard_stats',
    description: 'Get overall CRM statistics — total customers, campaigns, average open rate, revenue',
    parameters: { type: 'object', properties: {} },
  },
]

// Execute tool calls
async function executeTool(name: string, args: any): Promise<string> {
  try {
    if (name === 'query_segment') {
      let query = db.select({
        id: customers.id,
        name: customers.name,
        email: customers.email,
        city: customers.city,
        tag: customers.tag,
        totalSpend: customers.totalSpend,
        orderCount: customers.orderCount,
        lastPurchaseAt: customers.lastPurchaseAt,
      }).from(customers)

      const conditions = []
      if (args.tag) conditions.push(eq(customers.tag, args.tag))
      if (args.city) conditions.push(eq(customers.city, args.city))
      if (args.minSpend) conditions.push(gte(customers.totalSpend, args.minSpend))
      if (args.maxSpend) conditions.push(lte(customers.totalSpend, args.maxSpend))
      if (args.daysSinceLastPurchase) {
        const cutoff = new Date()
        cutoff.setDate(cutoff.getDate() - args.daysSinceLastPurchase)
        conditions.push(lte(customers.lastPurchaseAt, cutoff))
      }

      const result = conditions.length > 0
        ? await query.where(sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}`)
        : await query.limit(500)

      const sample = result.slice(0, 3).map(c => ({
        name: c.name, city: c.city, tag: c.tag,
        spend: `₹${c.totalSpend?.toFixed(0)}`, orders: c.orderCount
      }))

      return JSON.stringify({
        totalCount: result.length,
        sampleCustomers: sample,
        filters: args,
      })
    }

    if (name === 'get_campaign_insights') {
      if (args.campaignId) {
        const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, args.campaignId))
        if (!campaign) return JSON.stringify({ error: 'Campaign not found' })
        return JSON.stringify({
          name: campaign.name,
          channel: campaign.channel,
          status: campaign.status,
          sent: campaign.sentCount,
          delivered: campaign.deliveredCount,
          opened: campaign.openedCount,
          clicked: campaign.clickedCount,
          failed: campaign.failedCount,
          openRate: campaign.deliveredCount ? `${((campaign.openedCount! / campaign.deliveredCount!) * 100).toFixed(1)}%` : '0%',
          clickRate: campaign.openedCount ? `${((campaign.clickedCount! / campaign.openedCount!) * 100).toFixed(1)}%` : '0%',
        })
      }

      const allCampaigns = await db.select().from(campaigns).orderBy(desc(campaigns.createdAt)).limit(10)
      return JSON.stringify(allCampaigns.map(c => ({
        id: c.id, name: c.name, channel: c.channel, status: c.status,
        sent: c.sentCount, delivered: c.deliveredCount, opened: c.openedCount,
        openRate: c.deliveredCount ? `${((c.openedCount! / c.deliveredCount!) * 100).toFixed(1)}%` : '0%',
      })))
    }

    if (name === 'create_campaign') {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: args.name,
          description: args.description,
          message: args.message,
          channel: args.channel,
          status: 'active',
        }),
      })
      const campaign = await res.json()
      return JSON.stringify({
        success: true,
        campaignId: campaign.id,
        name: campaign.name,
        totalRecipients: campaign.totalRecipients,
        message: `Campaign "${args.name}" launched successfully to ${campaign.totalRecipients} customers via ${args.channel}!`,
      })
    }

    if (name === 'get_dashboard_stats') {
      const [customerCount] = await db.select({ count: sql<number>`count(*)` }).from(customers)
      const [campaignCount] = await db.select({ count: sql<number>`count(*)` }).from(campaigns)
      const allCampaigns = await db.select().from(campaigns)
      const avgOpenRate = allCampaigns.reduce((sum, c) => {
        return sum + (c.deliveredCount ? (c.openedCount! / c.deliveredCount!) : 0)
      }, 0) / (allCampaigns.length || 1)

      return JSON.stringify({
        totalCustomers: customerCount.count,
        totalCampaigns: campaignCount.count,
        avgOpenRate: `${(avgOpenRate * 100).toFixed(1)}%`,
        activeCampaigns: allCampaigns.filter(c => c.status === 'active').length,
      })
    }

    return JSON.stringify({ error: 'Unknown tool' })
  } catch (err: any) {
    return JSON.stringify({ error: err.message })
  }
}

const SYSTEM_PROMPT = `You are an AI marketing assistant for XenoCRM, helping marketers reach their customers intelligently.

You have access to real customer data, campaign history, and can create and launch campaigns.

Your workflow when a marketer gives you a goal:
1. Use query_segment to find matching customers and show the count
2. Generate 2-3 message variants tailored to the segment  
3. Recommend the best channel with a reason based on the segment
4. Show a clear preview: segment size, recommended message, channel
5. Ask for approval before calling create_campaign
6. After launch, confirm with stats

Always be specific — mention actual numbers from the data. Never make up statistics.
Format your responses clearly with sections. Use ₹ for currency. Keep messages warm and personalized.`

async function callGeminiWithRetry(body: any, retries = 3): Promise<{ response: Response; data: any }> {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    
    if (
      response.status === 429 ||
      data.error?.code === 429 ||
      (data.error?.message &&
        (data.error.message.includes('experiencing high demand') ||
          data.error.message.includes('overloaded') ||
          data.error.message.includes('quota')))
    ) {
      console.log(`Gemini rate limited, retry ${i + 1}/${retries}`, data.error)
      await new Promise(r => setTimeout(r, 2000 * (i + 1)))
      continue
    }
    return { response, data }
  }
  throw new Error('Gemini is currently overloaded. Please try again in a moment.')
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Build Gemini message history
    const geminiMessages = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    // Agentic loop — keep calling Gemini until no more tool calls
    let loopMessages = [...geminiMessages]
    let finalText = ''
    let iterations = 0
    const MAX_ITERATIONS = 5

    while (iterations < MAX_ITERATIONS) {
      iterations++

      let result
      try {
        result = await callGeminiWithRetry({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: loopMessages,
          tools: [{ function_declarations: tools }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
        })
      } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 503 })
      }

      const { response, data } = result

      if (!response.ok) {
        console.error('Gemini error:', data)
        return NextResponse.json({ error: data.error?.message || 'Gemini API error' }, { status: 500 })
      }

      const candidate = data.candidates?.[0]
      const parts = candidate?.content?.parts || []

      // Check for tool calls
      const toolCalls = parts.filter((p: any) => p.functionCall)
      const textParts = parts.filter((p: any) => p.text)

      if (toolCalls.length === 0) {
        // No more tool calls — we have our final response
        finalText = textParts.map((p: any) => p.text).join('\n')
        break
      }

      // Execute all tool calls
      const toolResults = []
      for (const part of toolCalls) {
        const { name, args } = part.functionCall
        console.log(`Executing tool: ${name}`, args)
        const result = await executeTool(name, args)
        toolResults.push({
          functionResponse: { name, response: { result } }
        })
      }

      // Add model response and tool results to history
      loopMessages.push({ role: 'model', parts })
      loopMessages.push({ role: 'user', parts: toolResults })
    }

    return NextResponse.json({ content: finalText || 'I could not generate a response. Please try again.' })
  } catch (err: any) {
    console.error('Agent error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
