import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse'
import { VehicleData } from '@/types/ev-data'

export async function readCsvFile(fileName: string): Promise<VehicleData[]> {
  const filePath = path.join(process.cwd(), 'data', fileName)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

  return new Promise((resolve, reject) => {
    parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    }, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}