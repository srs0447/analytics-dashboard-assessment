import { Metadata } from 'next'
import EVPopulationDashboard from '@/components/ev-population-dashboard'

export const metadata: Metadata = {
  title: 'EV Population Dashboard',
  description: 'Analytics dashboard for Electric Vehicle Population Data',
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Electric Vehicle Population Dashboard</h1>
      <EVPopulationDashboard />
    </div>
  )
}