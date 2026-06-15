import { db } from './db'
import { customers, orders, segments, campaigns, communicationEvents } from './schema'
import { faker } from '@faker-js/faker'

const INDIAN_CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat']
const TAGS = ['vip', 'regular', 'at-risk', 'new', 'loyal']
const CATEGORIES = ['Shoes', 'Clothing', 'Accessories', 'Electronics', 'Beauty', 'Home', 'Sports']
const CHANNELS = ['email', 'whatsapp', 'sms', 'rcs']

async function seed() {
  console.log('Seeding customers...')

  // Clear existing data
  await db.delete(communicationEvents)
  await db.delete(campaigns)
  await db.delete(orders)
  await db.delete(segments)
  await db.delete(customers)

  // Seed 500 customers
  const customerData = Array.from({ length: 500 }, () => {
    const orderCount = faker.number.int({ min: 1, max: 20 })
    const totalSpend = faker.number.float({ min: 500, max: 150000, fractionDigits: 2 })
    const tag = totalSpend > 50000 ? 'vip' : totalSpend > 20000 ? 'loyal' : orderCount < 2 ? 'new' : faker.helpers.arrayElement(['regular', 'at-risk'])

    return {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      phone: `+91${faker.string.numeric(10)}`,
      city: faker.helpers.arrayElement(INDIAN_CITIES),
      age: faker.number.int({ min: 18, max: 65 }),
      tag,
      totalSpend,
      orderCount,
      lastPurchaseAt: faker.date.past({ years: 1 }),
    }
  })

  const insertedCustomers = await db.insert(customers).values(customerData).returning()
  console.log(`Inserted ${insertedCustomers.length} customers`)

  // Seed 2000 orders
  console.log('Seeding orders...')
  const orderData = Array.from({ length: 2000 }, () => ({
    customerId: faker.helpers.arrayElement(insertedCustomers).id,
    productName: faker.commerce.productName(),
    category: faker.helpers.arrayElement(CATEGORIES),
    amount: faker.number.float({ min: 299, max: 25000, fractionDigits: 2 }),
    orderedAt: faker.date.past({ years: 1 }),
  }))

  await db.insert(orders).values(orderData)
  console.log('Inserted 2000 orders')

  // Seed segments
  console.log('Seeding segments...')
  const segmentData = [
    { name: 'VIP High Spenders', description: 'Customers with total spend over ₹50,000', filters: { tag: 'vip' }, customerCount: insertedCustomers.filter(c => c.tag === 'vip').length },
    { name: 'Lapsed Customers', description: 'Customers who haven\'t purchased in 60+ days', filters: { daysSinceLastOrder: 60 }, customerCount: 180 },
    { name: 'New Joiners', description: 'Customers who joined in the last 30 days', filters: { tag: 'new' }, customerCount: insertedCustomers.filter(c => c.tag === 'new').length },
    { name: 'Mumbai Loyalists', description: 'Loyal customers from Mumbai', filters: { city: 'Mumbai', tag: 'loyal' }, customerCount: 94 },
    { name: 'At-Risk Shoppers', description: 'Customers showing churn signals', filters: { tag: 'at-risk' }, customerCount: insertedCustomers.filter(c => c.tag === 'at-risk').length },
  ]

  const insertedSegments = await db.insert(segments).values(segmentData).returning()
  console.log('Inserted segments')

  // Seed campaigns
  console.log('Seeding campaigns...')
  const campaignData = [
    { name: 'Diwali Flash Sale', description: 'Special Diwali offers for all customers', segmentId: insertedSegments[0].id, message: 'Hi {name}! Celebrate Diwali with 20% off on all orders. Use code DIWALI20. Valid today only!', channel: 'whatsapp', status: 'completed', totalRecipients: 1240, sentCount: 1240, deliveredCount: 1143, openedCount: 486, clickedCount: 97, failedCount: 97, launchedAt: faker.date.past({ years: 0.1 }), completedAt: faker.date.past({ years: 0.05 }) },
    { name: 'VIP Early Access', description: 'Early access to new collection for VIP members', segmentId: insertedSegments[0].id, message: 'Dear {name}, as a VIP member you get exclusive early access to our new collection!', channel: 'email', status: 'completed', totalRecipients: 450, sentCount: 450, deliveredCount: 428, openedCount: 210, clickedCount: 89, failedCount: 22, launchedAt: faker.date.past({ years: 0.1 }), completedAt: faker.date.past({ years: 0.05 }) },
    { name: 'Re-engagement Campaign', description: 'Win back lapsed customers', segmentId: insertedSegments[1].id, message: 'We miss you {name}! Here\'s 15% off your next purchase. Code: COMEBACK15', channel: 'sms', status: 'active', totalRecipients: 800, sentCount: 800, deliveredCount: 680, openedCount: 204, clickedCount: 41, failedCount: 120, launchedAt: new Date() },
    { name: 'New User Welcome', description: 'Welcome series for new customers', segmentId: insertedSegments[2].id, message: 'Welcome to XenoBrand {name}! Enjoy free shipping on your first order.', channel: 'email', status: 'active', totalRecipients: 320, sentCount: 320, deliveredCount: 310, openedCount: 155, clickedCount: 62, failedCount: 10, launchedAt: new Date() },
    { name: 'Mumbai Exclusive', description: 'City-specific offer for Mumbai customers', segmentId: insertedSegments[3].id, message: 'Hey {name}! Special offer for Mumbai: Free delivery + 10% off this weekend only.', channel: 'whatsapp', status: 'scheduled', totalRecipients: 94, sentCount: 0, deliveredCount: 0, openedCount: 0, clickedCount: 0, failedCount: 0, scheduledAt: faker.date.soon({ days: 2 }) },
    { name: 'At-Risk Win Back', description: 'Special discount for at-risk customers', segmentId: insertedSegments[4].id, message: 'Hi {name}, we noticed you haven\'t shopped in a while. Here\'s 25% off just for you!', channel: 'rcs', status: 'draft', totalRecipients: 0, sentCount: 0, deliveredCount: 0, openedCount: 0, clickedCount: 0, failedCount: 0 },
  ]

  const insertedCampaigns = await db.insert(campaigns).values(campaignData).returning()
  console.log('Inserted campaigns')

  // Seed communication events for completed campaigns
  console.log('Seeding communication events...')
  const eventData = []
  for (const campaign of insertedCampaigns.filter(c => c.status === 'completed' || c.status === 'active')) {
    const recipients = faker.helpers.arrayElements(insertedCustomers, Math.min(50, insertedCustomers.length))
    for (const customer of recipients) {
      const rand = Math.random()
      const status = rand > 0.9 ? 'failed' : rand > 0.6 ? 'clicked' : rand > 0.3 ? 'opened' : 'delivered'
      eventData.push({
        campaignId: campaign.id,
        customerId: customer.id,
        messageId: faker.string.uuid(),
        channel: campaign.channel,
        status,
        eventAt: faker.date.recent({ days: 30 }),
      })
    }
  }

  await db.insert(communicationEvents).values(eventData)
  console.log(`Inserted ${eventData.length} communication events`)
  console.log('Seed complete!')
}

seed().catch(console.error).finally(() => process.exit(0))
