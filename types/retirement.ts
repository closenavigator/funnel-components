// Types for the step-by-step calculator
export interface RetirementInputs {
  age: number
  monthlyContribution: number
  currentSavings: number
}

export interface RetirementResults {
  totalAtRetirement: number
  monthlyRetirementIncome: number
  yearsOfRetirement: number
}

// Types for the visualization calculator
export interface Person {
  name: string
  startAge: number
  color: string
  avatar: string
}

export interface SavingsData {
  age: number
  [key: string]: number
}

// Shared calculation parameters
export const RETIREMENT_PARAMS = {
  annualReturn: 0.08,        // 8% average market return (conservative)
  inflationRate: 0.03,       // 3% inflation
  salaryGrowthRate: 0.03,    // 3% annual salary increase
  retirementAge: 65,         // Standard retirement age
  lifeExpectancy: 90,        // Conservative life expectancy
  withdrawalRate: 0.04,      // 4% safe withdrawal rate
  minAge: 18,               // Minimum age for calculations
  maxAge: 80,               // Maximum age for starting retirement savings
  minContribution: 1000,    // Minimum monthly contribution
  maxContribution: 100000   // Maximum monthly contribution
} 