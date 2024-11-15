import { RetirementInputs, RetirementResults, SavingsDataPoint, RETIREMENT_PARAMS } from '@/types/retirement'

const {
  annualReturn: ANNUAL_RETURN,
  inflationRate: INFLATION_RATE,
  retirementAge: RETIREMENT_AGE,
  withdrawalRate: SAFE_WITHDRAWAL_RATE,
  lifeExpectancy: LIFE_EXPECTANCY
} = RETIREMENT_PARAMS

export function calculateSavingsOverTime(
  monthlyContribution: number, 
  startAge: number, 
  years: number
): SavingsDataPoint[] {
  let total = 0
  const dataPoints: SavingsDataPoint[] = []
  
  for (let year = 0; year <= years; year++) {
    total = (total + (monthlyContribution * 12)) * (1 + ANNUAL_RETURN)
    
    dataPoints.push({
      age: startAge + year,
      total: Math.round(total),
      monthlyIncome: Math.round((total * SAFE_WITHDRAWAL_RATE) / 12),
      yearsSaving: year,
      [startAge.toString()]: total // Add dynamic key for chart compatibility
    })
  }
  
  return dataPoints
}

export function calculateRetirement(inputs: RetirementInputs): RetirementResults {
  const { age, monthlyContribution, currentSavings, desiredMonthlyIncome } = inputs
  const yearsUntilRetirement = RETIREMENT_AGE - age
  const yearsOfRetirement = LIFE_EXPECTANCY - RETIREMENT_AGE

  if (desiredMonthlyIncome !== undefined) {
    // Reverse calculation mode - "¿Cuánto necesito ahorrar?"
    const requiredTotal = (desiredMonthlyIncome * 12) / SAFE_WITHDRAWAL_RATE
    const futureValue = requiredTotal
    const presentValue = currentSavings
    const monthlyRate = ANNUAL_RETURN / 12
    const numberOfMonths = yearsUntilRetirement * 12

    // Using PMT formula to calculate required monthly contribution
    const requiredMonthlyContribution = (
      (futureValue - presentValue * Math.pow(1 + monthlyRate, numberOfMonths)) *
      monthlyRate /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1)
    )

    return {
      totalAtRetirement: requiredTotal,
      monthlyRetirementIncome: desiredMonthlyIncome,
      yearsOfRetirement,
      requiredMonthlyContribution: Math.max(0, requiredMonthlyContribution)
    }
  } else {
    // Forward calculation mode - "¿Cuánto tendré?"
    let total = currentSavings
    for (let year = 0; year < yearsUntilRetirement; year++) {
      total = (total + (monthlyContribution * 12)) * (1 + ANNUAL_RETURN)
    }

    const monthlyIncome = (total * SAFE_WITHDRAWAL_RATE) / 12

    return {
      totalAtRetirement: total,
      monthlyRetirementIncome: monthlyIncome,
      yearsOfRetirement
    }
  }
} 