export interface EVData {
    totalVehicles: number;
    byYear: YearData[];
    byMake: MakeData[];
    byType: TypeData[];
    byModelYear: ModelYearData[];
    byCounty: CountyData[];
  }
  
  export interface YearData {
    year: number;
    count: number;
  }
  
  export interface MakeData {
    make: string;
    count: number;
  }
  
  export interface TypeData {
    type: string;
    count: number;
  }
  
  export interface ModelYearData {
    modelYear: string;
    count: number;
  }
  
  export interface CountyData {
    county: string;
    count: number;
  }
  
  export interface VehicleData {
    'VIN (1-10)': string;
    County: string;
    City: string;
    State: string;
    'Postal Code': string;
    'Model Year': string;
    Make: string;
    Model: string;
    'Electric Vehicle Type': string;
    'Clean Alternative Fuel Vehicle (CAFV) Eligibility': string;
    'Electric Range': string;
    'Base MSRP': string;
    'Legislative District': string;
    'DOL Vehicle ID': string;
    'Vehicle Location': string;
    'Electric Utility': string;
    '2020 Census Tract': string;
  }