'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EVPopulationChart from './charts/ev-population-chart'
import EVMakeDistributionChart from './charts/ev-make-distribution-chart'
import EVModelYearChart from './charts/ev-model-year-chart'
import EVTypeDistributionChart from './charts/ev-type-ditribution-chart'
import EVCountyDistributionChart from './charts/ev-country-distribution-chart'
import { EVData } from '@/types/ev-data'

const fetchEVData = async (): Promise<EVData> => {
  const response = await fetch('/api/ev-data')
  if (!response.ok) {
    throw new Error('Failed to fetch EV data')
  }
  return response.json()
}

export default function EVPopulationDashboard() {
  const [evData, setEVData] = useState<EVData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    fetchEVData()
      .then(setEVData)
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!evData) return <div>No data available</div>

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
        <TabsTrigger value="geography">Geographic Distribution</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total EVs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{evData.totalVehicles.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>EV Population Growth</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <EVPopulationChart data={evData.byYear} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>EV Make Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <EVMakeDistributionChart data={evData.byMake} />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="details" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>EV Model Year Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <EVModelYearChart data={evData.byModelYear} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>EV Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <EVTypeDistributionChart data={evData.byType} />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="geography" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>EV Distribution by County</CardTitle>
          </CardHeader>
          <CardContent>
            <EVCountyDistributionChart data={evData.byCounty} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}