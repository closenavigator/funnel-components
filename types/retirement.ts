// Types for the step-by-step calculator
export interface RetirementInputs {
  age: number
  monthlyContribution: number
  currentSavings: number
  desiredMonthlyIncome?: number  // Optional for reverse calculation
}

export interface RetirementResults {
  totalAtRetirement: number
  monthlyRetirementIncome: number
  yearsOfRetirement: number
  requiredMonthlyContribution?: number  // For reverse calculation
}

// Types for the visualization calculator
export interface SavingsDataPoint {
  age: number
  total: number
  monthlyIncome: number
  yearsSaving: number
  [key: string]: number
}

export interface Person {
  name: string
  startAge: number
  color: string
  avatar: string
  savings: SavingsDataPoint[]
}

export interface RetirementData extends SavingsDataPoint {
  [key: string]: number
}

// Shared calculation parameters
export const RETIREMENT_PARAMS = {
  annualReturn: 0.08,        // 8% average market return (conservative)
  inflationRate: 0.03,       // 3% inflation
  retirementAge: 65,         // Standard retirement age
  lifeExpectancy: 90,        // Conservative life expectancy
  withdrawalRate: 0.04,      // 4% safe withdrawal rate (Trinity study)
  minAge: 18,               // Minimum age for calculations
  maxAge: 80,               // Maximum age for starting retirement savings
  minContribution: 1000,    // Minimum monthly contribution
  maxContribution: 100000,  // Maximum monthly contribution
  minSavings: 0,           // Minimum current savings
  maxSavings: 10000000     // Maximum current savings
} 