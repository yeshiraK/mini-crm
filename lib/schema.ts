import { pgTable, text, integer, real, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core'

export const customers = pgTable('customers', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  city: text('city'),
  age: integer('age'),
  tag: text('tag').default('regular'), // vip, regular, at-risk, new, loyal
  totalSpend: real('total_spend').default(0),
  orderCount: integer('order_count').default(0),
  lastPurchaseAt: timestamp('last_purchase_at'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').references(() => customers.id),
  productName: text('product_name').notNull(),
  category: text('category'),
  amount: real('amount').notNull(),
  orderedAt: timestamp('ordered_at').defaultNow(),
})

export const segments = pgTable('segments', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  filters: jsonb('filters').notNull(),
  customerCount: integer('customer_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
})

export const campaigns = pgTable('campaigns', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  segmentId: uuid('segment_id').references(() => segments.id),
  message: text('message').notNull(),
  channel: text('channel').notNull(), // email, whatsapp, sms, rcs
  status: text('status').default('draft'), // draft, active, scheduled, completed, failed
  totalRecipients: integer('total_recipients').default(0),
  sentCount: integer('sent_count').default(0),
  deliveredCount: integer('delivered_count').default(0),
  openedCount: integer('opened_count').default(0),
  clickedCount: integer('clicked_count').default(0),
  failedCount: integer('failed_count').default(0),
  scheduledAt: timestamp('scheduled_at'),
  launchedAt: timestamp('launched_at'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const communicationEvents = pgTable('communication_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  campaignId: uuid('campaign_id').references(() => campaigns.id),
  customerId: uuid('customer_id').references(() => customers.id),
  messageId: uuid('message_id').notNull().unique(), // idempotency key
  channel: text('channel').notNull(),
  status: text('status').notNull(), // sent, delivered, opened, clicked, failed
  eventAt: timestamp('event_at').defaultNow(),
})
