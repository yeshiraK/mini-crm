const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(cors())
app.use(express.json())

const CRM_RECEIPT_URL = process.env.CRM_RECEIPT_URL || 'http://localhost:3000/api/receipt'

// Delivery probability by channel
const CHANNEL_CONFIG = {
  whatsapp: { deliveryRate: 0.94, openRate: 0.45, clickRate: 0.25 },
  email:    { deliveryRate: 0.82, openRate: 0.34, clickRate: 0.12 },
  sms:      { deliveryRate: 0.88, openRate: 0.28, clickRate: 0.08 },
  rcs:      { deliveryRate: 0.76, openRate: 0.38, clickRate: 0.15 },
}

// Track processed messageIds for idempotency
const processedMessages = new Set()

async function sendCallback(payload) {
  try {
    const res = await fetch(CRM_RECEIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    console.log(`Callback sent: ${payload.status} for ${payload.messageId} → ${res.status}`)
  } catch (err) {
    console.error(`Callback failed for ${payload.messageId}:`, err.message)
    // Retry once after 5 seconds
    setTimeout(() => sendCallback(payload), 5000)
  }
}

function simulateDelivery(messageId, campaignId, customerId, channel) {
  const config = CHANNEL_CONFIG[channel] || CHANNEL_CONFIG.email
  const rand = Math.random()

  // Simulate delivery after 1-3 seconds
  setTimeout(async () => {
    if (rand > config.deliveryRate) {
      // Failed
      await sendCallback({ messageId, campaignId, customerId, channel, status: 'failed', timestamp: new Date().toISOString() })
      return
    }

    // Delivered
    await sendCallback({ messageId, campaignId, customerId, channel, status: 'delivered', timestamp: new Date().toISOString() })

    // Simulate open after 5-30 seconds
    if (Math.random() < config.openRate) {
      setTimeout(async () => {
        await sendCallback({ messageId, campaignId, customerId, channel, status: 'opened', timestamp: new Date().toISOString() })

        // Simulate click after 10-60 seconds
        if (Math.random() < config.clickRate) {
          setTimeout(async () => {
            await sendCallback({ messageId, campaignId, customerId, channel, status: 'clicked', timestamp: new Date().toISOString() })
          }, faker_delay(10000, 60000))
        }
      }, faker_delay(5000, 30000))
    }
  }, faker_delay(1000, 3000))
}

function faker_delay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// POST /send — CRM calls this to dispatch a message
app.post('/send', (req, res) => {
  const { messageId, campaignId, customerId, channel, message, recipient } = req.body

  if (!messageId || !campaignId || !channel) {
    return res.status(400).json({ error: 'messageId, campaignId, channel are required' })
  }

  // Idempotency check
  if (processedMessages.has(messageId)) {
    console.log(`Duplicate send ignored: ${messageId}`)
    return res.status(200).json({ status: 'already_processing', messageId })
  }

  processedMessages.add(messageId)

  // Acknowledge immediately — async simulation happens in background
  res.status(202).json({ status: 'accepted', messageId })

  // Start simulation
  simulateDelivery(messageId, campaignId, customerId, channel)
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', processedCount: processedMessages.size })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Channel stub running on port ${PORT}`)
  console.log(`Callbacks → ${CRM_RECEIPT_URL}`)
})
