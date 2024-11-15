import { RetirementDataPoint, RETIREMENT_PARAMS } from '@/types/retirement'

const {
  annualReturn: ANNUAL_RETURN,
  retirementAge: RETIREMENT_AGE
} = RETIREMENT_PARAMS

export function calculateFuture(startingAge: number, monthly: number): RetirementDataPoint[] {
  const years = RETIREMENT_AGE - startingAge
  let total = 0
  const yearlyContribution = monthly * 12
  const dataPoints: RetirementDataPoint[] = []
  
  for (let year = 0; year <= years; year++) {
    total = (total + yearlyContribution) * (1 + ANNUAL_RETURN)
    
    dataPoints.push({
      age: startingAge + year,
      total,
      monthlyIncome: (total * RETIREMENT_PARAMS.withdrawalRate) / 12,
      yearsSaving: year
    })
  }
  
  return dataPoints
} 