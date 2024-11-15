import { RetirementDataPoint, RetirementInputs, RetirementResults, RETIREMENT_PARAMS } from '@/types/retirement'

const {
  annualReturn: ANNUAL_RETURN,
  retirementAge: RETIREMENT_AGE,
  lifeExpectancy: LIFE_EXPECTANCY,
  withdrawalRate: SAFE_WITHDRAWAL_RATE
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
      monthlyIncome: (total * SAFE_WITHDRAWAL_RATE) / 12,
      yearsSaving: year
    })
  }
  
  return dataPoints
}

export function calculateRetirement(inputs: RetirementInputs): RetirementResults {
  const { age, monthlyContribution, currentSavings, desiredMonthlyIncome } = inputs
  const yearsUntilRetirement = RETIREMENT_AGE - age
  const yearsOfRetirement = LIFE_EXPECTANCY - RETIREMENT_AGE

  let totalAtRetirement = currentSavings
  for (let year = 0; year < yearsUntilRetirement; year++) {
    totalAtRetirement = (totalAtRetirement + (monthlyContribution * 12)) * (1 + ANNUAL_RETURN)
  }

  return {
    totalAtRetirement,
    monthlyRetirementIncome: (totalAtRetirement * SAFE_WITHDRAWAL_RATE) / 12,
    yearsOfRetirement
  }
} 