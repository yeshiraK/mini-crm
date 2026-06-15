import { Customer, Campaign, Segment, CommunicationEvent } from './types'

// Mock data
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    status: 'vip',
    totalSpend: 45000,
    joinDate: '2023-01-15',
    lastEngagement: '2024-06-10',
  },
  {
    id: '2',
    name: 'Priya Singh',
    email: 'priya.singh@example.com',
    phone: '+91 98765 43211',
    city: 'Delhi',
    status: 'loyal',
    totalSpend: 28000,
    joinDate: '2023-03-20',
    lastEngagement: '2024-06-12',
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit.patel@example.com',
    phone: '+91 98765 43212',
    city: 'Bangalore',
    status: 'regular',
    totalSpend: 15000,
    joinDate: '2023-06-10',
    lastEngagement: '2024-06-08',
  },
  {
    id: '4',
    name: 'Neha Desai',
    email: 'neha.desai@example.com',
    phone: '+91 98765 43213',
    city: 'Pune',
    status: 'new',
    totalSpend: 5000,
    joinDate: '2024-05-01',
    lastEngagement: '2024-06-11',
  },
  {
    id: '5',
    name: 'Vikram Sharma',
    email: 'vikram.sharma@example.com',
    phone: '+91 98765 43214',
    city: 'Hyderabad',
    status: 'at-risk',
    totalSpend: 12000,
    joinDate: '2023-02-14',
    lastEngagement: '2024-05-20',
  },
  {
    id: '6',
    name: 'Anjali Gupta',
    email: 'anjali.gupta@example.com',
    phone: '+91 98765 43215',
    city: 'Chennai',
    status: 'regular',
    totalSpend: 22000,
    joinDate: '2023-04-05',
    lastEngagement: '2024-06-12',
  },
  {
    id: '7',
    name: 'Suresh Nair',
    email: 'suresh.nair@example.com',
    phone: '+91 98765 43216',
    city: 'Kochi',
    status: 'loyal',
    totalSpend: 32000,
    joinDate: '2023-01-25',
    lastEngagement: '2024-06-10',
  },
  {
    id: '8',
    name: 'Divya Mishra',
    email: 'divya.mishra@example.com',
    phone: '+91 98765 43217',
    city: 'Jaipur',
    status: 'new',
    totalSpend: 3000,
    joinDate: '2024-04-20',
    lastEngagement: '2024-06-11',
  },
]

const mockCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Summer Sale 2024',
    description: 'Major summer discount campaign across all channels',
    status: 'active',
    channel: 'email',
    sentAt: '2024-06-10',
    deliveryCount: 8500,
    openCount: 3200,
    clickCount: 1200,
    conversionCount: 450,
    revenue: 225000,
    createdAt: '2024-06-01',
    updatedAt: '2024-06-10',
  },
  {
    id: 'camp-2',
    name: 'New Product Launch - WhatsApp',
    description: 'WhatsApp campaign for new product announcement',
    status: 'active',
    channel: 'whatsapp',
    sentAt: '2024-06-11',
    deliveryCount: 5200,
    openCount: 4100,
    clickCount: 950,
    conversionCount: 320,
    revenue: 160000,
    createdAt: '2024-06-05',
    updatedAt: '2024-06-11',
  },
  {
    id: 'camp-3',
    name: 'Loyalty Rewards Announcement',
    description: 'SMS notification for VIP customers',
    status: 'completed',
    channel: 'sms',
    sentAt: '2024-06-08',
    deliveryCount: 3000,
    openCount: 2800,
    clickCount: 520,
    conversionCount: 180,
    revenue: 90000,
    createdAt: '2024-05-28',
    updatedAt: '2024-06-08',
  },
  {
    id: 'camp-4',
    name: 'Flash Sale - RCS',
    description: 'Rich media flash sale campaign',
    status: 'scheduled',
    channel: 'rcs',
    sentAt: '2024-06-15',
    deliveryCount: 0,
    openCount: 0,
    clickCount: 0,
    conversionCount: 0,
    revenue: 0,
    createdAt: '2024-06-12',
    updatedAt: '2024-06-12',
  },
  {
    id: 'camp-5',
    name: 'Abandoned Cart Recovery',
    description: 'Email campaign for cart recovery',
    status: 'active',
    channel: 'email',
    sentAt: '2024-06-09',
    deliveryCount: 2100,
    openCount: 840,
    clickCount: 420,
    conversionCount: 150,
    revenue: 75000,
    createdAt: '2024-06-02',
    updatedAt: '2024-06-09',
  },
  {
    id: 'camp-6',
    name: 'Birthday Special Offer',
    description: 'Personalized birthday offers',
    status: 'draft',
    channel: 'email',
    sentAt: '',
    deliveryCount: 0,
    openCount: 0,
    clickCount: 0,
    conversionCount: 0,
    revenue: 0,
    createdAt: '2024-06-10',
    updatedAt: '2024-06-10',
  },
]

const mockSegments: Segment[] = [
  {
    id: 'seg-1',
    name: 'VIP Customers',
    description: 'High-value customers with total spend > ₹25,000',
    filters: [{ id: '1', attribute: 'status', operator: 'equals', value: 'vip' }],
    matchType: 'all',
    customerCount: 1250,
    createdAt: '2024-05-01',
  },
  {
    id: 'seg-2',
    name: 'At-Risk Customers',
    description: 'Customers inactive for more than 30 days',
    filters: [{ id: '1', attribute: 'status', operator: 'equals', value: 'at-risk' }],
    matchType: 'all',
    customerCount: 450,
    createdAt: '2024-05-10',
  },
  {
    id: 'seg-3',
    name: 'Mumbai Metro',
    description: 'Customers in Mumbai metropolitan area',
    filters: [{ id: '1', attribute: 'city', operator: 'equals', value: 'Mumbai' }],
    matchType: 'all',
    customerCount: 2800,
    createdAt: '2024-05-15',
  },
  {
    id: 'seg-4',
    name: 'New Customers (30 days)',
    description: 'Customers who joined in last 30 days',
    filters: [{ id: '1', attribute: 'status', operator: 'equals', value: 'new' }],
    matchType: 'all',
    customerCount: 680,
    createdAt: '2024-05-20',
  },
  {
    id: 'seg-5',
    name: 'High Engagement',
    description: 'Customers with 50%+ open rate',
    filters: [{ id: '1', attribute: 'engagement', operator: 'greater_than', value: '50' }],
    matchType: 'all',
    customerCount: 1920,
    createdAt: '2024-06-01',
  },
]

// API functions with mock data
export async function getCustomers(): Promise<Customer[]> {
  return mockCustomers
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  return mockCustomers.find((c) => c.id === id) || null
}

export async function getCampaigns(): Promise<Campaign[]> {
  return mockCampaigns
}

export async function getCampaignById(id: string): Promise<Campaign | null> {
  return mockCampaigns.find((c) => c.id === id) || null
}

export async function createCampaign(campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<Campaign> {
  const newCampaign: Campaign = {
    ...campaign,
    id: `camp-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    deliveryCount: 0,
    openCount: 0,
    clickCount: 0,
    conversionCount: 0,
    revenue: 0,
  }

  return newCampaign
}

export async function getSegments(): Promise<Segment[]> {
  return mockSegments
}

export async function getSegmentById(id: string): Promise<Segment | null> {
  return mockSegments.find((s) => s.id === id) || null
}

export async function createSegment(segment: Omit<Segment, 'id' | 'createdAt'>): Promise<Segment> {
  const newSegment: Segment = {
    ...segment,
    id: `seg-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
  }
  mockSegments.push(newSegment)
  return newSegment
}

export async function getCommunicationEvents(): Promise<CommunicationEvent[]> {
  return []
}

export async function getDashboardStats() {
  return {
    totalCustomers: mockCustomers.length,
    totalCampaigns: mockCampaigns.length,
    activeSegments: mockSegments.length,
    totalRevenue: mockCampaigns.reduce((sum, c) => sum + c.revenue, 0),
    avgOpenRate: 37.6,
    avgClickRate: 14.2,
  }
}
