export const RETIREMENT_PARAMS = {
  annualReturn: 0.08,
  inflationRate: 0.03,
  retirementAge: 65,
  lifeExpectancy: 90,
  withdrawalRate: 0.04,
  minAge: 18,
  maxAge: 80,
  minContribution: 1000,
  maxContribution: 100000,
  minSavings: 0,
  maxSavings: 10000000
}

export interface RetirementDataPoint {
  age: number
  total: number
  monthlyIncome: number
  yearsSaving: number
}

export interface RetirementInputs {
  age: number
  monthlyContribution: number
  currentSavings: number
  desiredMonthlyIncome?: number
}

export interface RetirementResults {
  totalAtRetirement: number
  monthlyRetirementIncome: number
  yearsOfRetirement: number
  requiredMonthlyContribution?: number
}

export interface Person {
  name: string
  startAge: number
  color: string
  avatar: string
  savings?: RetirementDataPoint[]
}

export interface RetirementData {
  [key: string]: number
  age: number
} 