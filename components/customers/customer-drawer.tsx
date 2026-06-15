'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CustomerDrawerProps {
  customer: any
  onClose: () => void
}

export function CustomerDrawer({ customer, onClose }: CustomerDrawerProps) {
  const tagColor: Record<string, string> = {
    VIP: 'bg-purple-500/20 text-purple-300',
    Loyal: 'bg-green-500/20 text-green-300',
    Regular: 'bg-blue-500/20 text-blue-300',
    'At-Risk': 'bg-red-500/20 text-red-300',
    New: 'bg-yellow-500/20 text-yellow-300',
  }

  const recentOrders = [
    { id: 1, date: 'Jan 15, 2024', amount: '₹45,000', status: 'Delivered' },
    { id: 2, date: 'Jan 10, 2024', amount: '₹32,500', status: 'Delivered' },
    { id: 3, date: 'Jan 5, 2024', amount: '₹28,900', status: 'Delivered' },
    { id: 4, date: 'Dec 28, 2023', amount: '₹38,200', status: 'Delivered' },
    { id: 5, date: 'Dec 20, 2023', amount: '₹42,100', status: 'Delivered' },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-card w-full max-w-md h-screen border-l border-border flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-6 flex items-start justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mb-3">
              {customer.name
                .split(' ')
                .map((n: string) => n[0])
                .join('')}
            </div>
            <h2 className="text-lg font-semibold text-foreground">{customer.name}</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Info Cards */}
          <div className="space-y-3">
            <div className="bg-secondary/50 rounded-md p-3">
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <p className="text-sm font-medium text-foreground break-all">{customer.email}</p>
            </div>
            <div className="bg-secondary/50 rounded-md p-3">
              <p className="text-xs text-muted-foreground mb-1">Phone</p>
              <p className="text-sm font-medium text-foreground">+91 98765 43210</p>
            </div>
            <div className="bg-secondary/50 rounded-md p-3">
              <p className="text-xs text-muted-foreground mb-1">City</p>
              <p className="text-sm font-medium text-foreground">{customer.city}</p>
            </div>
            <div className="bg-secondary/50 rounded-md p-3">
              <p className="text-xs text-muted-foreground mb-1">Join Date</p>
              <p className="text-sm font-medium text-foreground">Jan 5, 2023</p>
            </div>
          </div>

          {/* Tags */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">Tags</p>
            <div className="flex flex-wrap gap-2">
              <Badge className={`${tagColor[customer.tag]} border-0`}>{customer.tag}</Badge>
              <Badge className="bg-secondary text-foreground border-0">High Value</Badge>
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Last 5 Orders</p>
            <div className="space-y-2">
              {recentOrders.map((order) => (
                <div key={order.id} className="bg-secondary/30 rounded-md p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.amount}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-0 text-xs">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 space-y-2">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Create Campaign for this Customer
          </Button>
          <Button variant="outline" className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
