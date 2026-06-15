'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Download } from 'lucide-react'
import { CustomersTable } from '@/components/customers/customers-table'
import { CustomerDrawer } from '@/components/customers/customer-drawer'
import { getCustomers } from '@/lib/api'
import { Customer } from '@/lib/types'

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filterTab, setFilterTab] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCustomers = async () => {
      const res = await fetch('/api/customers')
      const data = await res.json()
      setCustomers(Array.isArray(data) ? data : [])
      setLoading(false)
    }
    loadCustomers()
  }, [])

  const filteredCustomers = filterTab === 'all'
    ? customers
    : customers.filter(c => c.status === filterTab)

  // Calculate dynamic counts
  const filterCounts = {
    all: customers.length,
    vip: customers.filter(c => c.status === 'vip').length,
    regular: customers.filter(c => c.status === 'regular').length,
    'at-risk': customers.filter(c => c.status === 'at-risk').length,
    new: customers.filter(c => c.status === 'new').length,
    loyal: customers.filter(c => c.status === 'loyal').length,
  }

  const filterTabs = [
    { id: 'all', label: 'All', count: filterCounts.all },
    { id: 'vip', label: 'VIP', count: filterCounts.vip },
    { id: 'regular', label: 'Regular', count: filterCounts.regular },
    { id: 'at-risk', label: 'At-Risk', count: filterCounts['at-risk'] },
    { id: 'new', label: 'New', count: filterCounts.new },
    { id: 'loyal', label: 'Loyal', count: filterCounts.loyal },
  ]

  return (
    <div className="p-6 space-y-6 overflow-auto">
      {/* Top Action Bar */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <Input
            placeholder="Search customers by name, email, city..."
            className="flex-1 bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors ${
                filterTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {tab.label}
              <Badge
                variant="secondary"
                className={`ml-2 ${
                  filterTab === tab.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-border text-muted-foreground'
                }`}
              >
                {tab.count.toLocaleString()}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border p-4">
          <p className="text-sm text-muted-foreground">Total Customers</p>
          <p className="text-2xl font-bold text-foreground mt-2">12,847</p>
        </Card>
        <Card className="bg-card border-border p-4">
          <p className="text-sm text-muted-foreground">Total Spend</p>
          <p className="text-2xl font-bold text-foreground mt-2">₹4.2Cr</p>
        </Card>
        <Card className="bg-card border-border p-4">
          <p className="text-sm text-muted-foreground">Average Order Value</p>
          <p className="text-2xl font-bold text-foreground mt-2">₹3,240</p>
        </Card>
        <Card className="bg-card border-border p-4">
          <p className="text-sm text-muted-foreground">New This Month</p>
          <p className="text-2xl font-bold text-foreground mt-2">384</p>
        </Card>
      </div>

      {/* Customers Table */}
      <CustomersTable 
        customers={filteredCustomers}
        onSelectCustomer={setSelectedCustomer}
      />

      {/* Customer Drawer */}
      {selectedCustomer && (
        <CustomerDrawer customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
      )}
    </div>
  )
}
