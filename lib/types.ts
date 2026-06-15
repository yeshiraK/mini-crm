export type Customer = {
  id: string
  name: string
  email: string
  phone: string
  city: string
  status: 'vip' | 'regular' | 'at-risk' | 'new' | 'loyal'
  totalSpend: number
  joinDate: string
  lastEngagement: string
}

export type Segment = {
  id: string
  name: string
  description: string
  filters: SegmentFilter[]
  matchType: 'all' | 'any'
  customerCount: number
  createdAt: string
}

export type SegmentFilter = {
  id: string
  attribute: string
  operator: string
  value: string | string[]
}

export type Campaign = {
  id: string
  name: string
  description: string
  status: 'draft' | 'active' | 'scheduled' | 'completed' | 'failed'
  channel: 'email' | 'whatsapp' | 'sms' | 'rcs'
  sentAt: string
  deliveryCount: number
  openCount: number
  clickCount: number
  conversionCount: number
  revenue: number
  segmentId?: string
  createdAt: string
  updatedAt: string
}

export type CommunicationEvent = {
  id: string
  customerId: string
  campaignId: string
  type: 'sent' | 'delivered' | 'opened' | 'clicked' | 'converted'
  timestamp: string
  metadata?: Record<string, any>
}

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

export type Toast = {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}
