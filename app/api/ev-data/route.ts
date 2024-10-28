import { NextResponse } from 'next/server'
import { readCsvFile } from '@/lib/readCsvFile'
import { EVData, VehicleData, YearData, MakeData, TypeData, ModelYearData, CountyData } from '@/types/ev-data'

export async function GET(): Promise<NextResponse<EVData | { error: string }>> {
    try {
      const data: VehicleData[] = await readCsvFile('vehicles.csv')
  
      const totalVehicles = data.length
      const byYear = processDataByYear(data)
      const byMake = processDataByMake(data)
      const byType = processDataByType(data)
      const byModelYear = processDataByModelYear(data)
      const byCounty = processDataByCounty(data)
  
      return NextResponse.json({
        totalVehicles,
        byYear,
        byMake,
        byType,
        byModelYear,
        byCounty,
      })
    } catch (error) {
      console.error('Error reading CSV file:', error)
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  }

function processDataByYear(data: VehicleData[]): YearData[] {
  const yearCounts: { [key: number]: number } = {}
  data.forEach(vehicle => {
    const year = parseInt(vehicle['Model Year'])
    if (!isNaN(year)) {
      yearCounts[year] = (yearCounts[year] || 0) + 1
    }
  })
  return Object.entries(yearCounts)
    .map(([year, count]) => ({ year: parseInt(year), count }))
    .sort((a, b) => a.year - b.year)
}

function processDataByMake(data: VehicleData[]):MakeData[] {
  const makeCounts: { [key: string]: number } = {}
  data.forEach(vehicle => {
    makeCounts[vehicle.Make] = (makeCounts[vehicle.Make] || 0) + 1
  })
  return Object.entries(makeCounts)
    .map(([make, count]) => ({ make, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5) // Top 5 makes
}

function processDataByType(data: VehicleData[]): TypeData[] {
  const typeCounts: { [key: string]: number } = {}
  data.forEach(vehicle => {
    typeCounts[vehicle['Electric Vehicle Type']] = (typeCounts[vehicle['Electric Vehicle Type']] || 0) + 1
  })
  return Object.entries(typeCounts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
}

function processDataByModelYear(data: VehicleData[]): ModelYearData[] {
  const modelYearCounts: { [key: string]: number } = {}
  data.forEach(vehicle => {
    modelYearCounts[vehicle['Model Year']] = (modelYearCounts[vehicle['Model Year']] || 0) + 1
  })
  return Object.entries(modelYearCounts)
    .map(([modelYear, count]) => ({ modelYear, count }))
    .sort((a, b) => parseInt(b.modelYear) - parseInt(a.modelYear))
}

function processDataByCounty(data: VehicleData[]): CountyData[] {
  const countyCounts: { [key: string]: number } = {}
  data.forEach(vehicle => {
    countyCounts[vehicle.County] = (countyCounts[vehicle.County] || 0) + 1
  })
  return Object.entries(countyCounts)
    .map(([county, count]) => ({ county, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 counties
}