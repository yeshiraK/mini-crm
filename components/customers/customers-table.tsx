'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react'
import { Customer } from '@/lib/types'

const defaultCustomers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    city: 'Mumbai',
    tag: 'VIP',
    spend: '₹4,85,920',
    orders: 12,
    lastPurchase: '2 days ago',
  },
  {
    id: 2,
    name: 'Priya Singh',
    email: 'priya.s@example.com',
    city: 'Delhi',
    tag: 'Loyal',
    spend: '₹3,24,560',
    orders: 8,
    lastPurchase: '5 days ago',
  },
  {
    id: 3,
    name: 'Amit Patel',
    email: 'amit.p@example.com',
    city: 'Bengaluru',
    tag: 'Regular',
    spend: '₹1,82,340',
    orders: 4,
    lastPurchase: '3 weeks ago',
  },
  {
    id: 4,
    name: 'Neha Sharma',
    email: 'neha.s@example.com',
    city: 'Chennai',
    tag: 'At-Risk',
    spend: '₹89,200',
    orders: 2,
    lastPurchase: '8 weeks ago',
  },
  {
    id: 5,
    name: 'Vikram Desai',
    email: 'vikram.d@example.com',
    city: 'Hyderabad',
    tag: 'New',
    spend: '₹24,500',
    orders: 1,
    lastPurchase: '1 week ago',
  },
  {
    id: 6,
    name: 'Anjali Gupta',
    email: 'anjali.g@example.com',
    city: 'Pune',
    tag: 'VIP',
    spend: '₹5,12,800',
    orders: 15,
    lastPurchase: '1 day ago',
  },
  {
    id: 7,
    name: 'Rohan Joshi',
    email: 'rohan.j@example.com',
    city: 'Kolkata',
    tag: 'Loyal',
    spend: '₹2,98,450',
    orders: 7,
    lastPurchase: '4 days ago',
  },
  {
    id: 8,
    name: 'Divya Menon',
    email: 'divya.m@example.com',
    city: 'Kochi',
    tag: 'Regular',
    spend: '₹1,56,780',
    orders: 3,
    lastPurchase: '2 weeks ago',
  },
  {
    id: 9,
    name: 'Sanjay Singh',
    email: 'sanjay.s@example.com',
    city: 'Ahmedabad',
    tag: 'Regular',
    spend: '₹2,10,920',
    orders: 5,
    lastPurchase: '1 week ago',
  },
  {
    id: 10,
    name: 'Meera Iyer',
    email: 'meera.i@example.com',
    city: 'Bangalore',
    tag: 'Loyal',
    spend: '₹3,45,670',
    orders: 9,
    lastPurchase: '3 days ago',
  },
]

const tagColor: Record<string, string> = {
  VIP: 'bg-purple-500/20 text-purple-300',
  Loyal: 'bg-green-500/20 text-green-300',
  Regular: 'bg-blue-500/20 text-blue-300',
  'At-Risk': 'bg-red-500/20 text-red-300',
  New: 'bg-yellow-500/20 text-yellow-300',
}

interface CustomersTableProps {
  customers?: Customer[]
  onSelectCustomer: (customer: any) => void
}

export function CustomersTable({ customers, onSelectCustomer }: CustomersTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const displayCustomers = customers || defaultCustomers
  const totalPages = Math.ceil(displayCustomers.length / itemsPerPage)

  const formatStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      vip: 'VIP',
      loyal: 'Loyal',
      regular: 'Regular',
      'at-risk': 'At-Risk',
      new: 'New',
    }
    return statusMap[status] || status
  }

  return (
    <Card className="bg-card border-border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-medium text-muted-foreground">Customer Name</th>
              <th className="text-left py-4 px-4 font-medium text-muted-foreground">City</th>
              <th className="text-left py-4 px-4 font-medium text-muted-foreground">Tag</th>
              <th className="text-left py-4 px-4 font-medium text-muted-foreground">Total Spend</th>
              <th className="text-left py-4 px-4 font-medium text-muted-foreground">Orders</th>
              <th className="text-left py-4 px-4 font-medium text-muted-foreground">Last Purchase</th>
              <th className="text-left py-4 px-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayCustomers.map((customer: any) => {
              const statusLabel = formatStatus(customer.status || 'regular')
              return (
              <tr
                key={customer.id}
                className="border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer"
                onClick={() => onSelectCustomer(customer)}
              >
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-foreground">{customer.name}</p>
                    <p className="text-xs text-muted-foreground">{customer.email}</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-muted-foreground">{customer.city}</td>
                <td className="py-4 px-4">
                  <Badge className={`${tagColor[statusLabel]} border-0`}>{statusLabel}</Badge>
                </td>
                <td className="py-4 px-4 font-medium text-foreground">₹{customer.totalSpend?.toLocaleString()}</td>
                <td className="py-4 px-4 text-muted-foreground">{Math.floor(Math.random() * 20)}</td>
                <td className="py-4 px-4 text-muted-foreground text-xs">{customer.lastEngagement}</td>
                <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            )
            })}

          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
