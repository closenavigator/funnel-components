import { RetirementInputs, RetirementResults, RETIREMENT_PARAMS } from '@/types/retirement'

export function calculateRetirement(inputs: RetirementInputs): RetirementResults {
  const { age, monthlyContribution, currentSavings } = inputs
  const {
    annualReturn,
    inflationRate,
    retirementAge,
    lifeExpectancy,
    withdrawalRate
  } = RETIREMENT_PARAMS

  // Calculate real return (adjusted for inflation)
  const realReturn = (1 + annualReturn) / (1 + inflationRate) - 1

  // Calculate accumulation phase
  let total = currentSavings
  let annualContribution = monthlyContribution * 12
  const yearsToRetirement = retirementAge - age

  for (let year = 1; year <= yearsToRetirement; year++) {
    // Add annual contribution and calculate returns
    total = (total + annualContribution) * (1 + realReturn)
  }

  const totalAtRetirement = total

  // Calculate sustainable monthly income using the 4% rule
  // Adjusted for inflation and conservative withdrawal
  const monthlyRetirementIncome = (totalAtRetirement * withdrawalRate) / 12

  // Calculate how many years this income could last
  let retirementSavings = totalAtRetirement
  let yearsOfRetirement = 0
  const targetYears = lifeExpectancy - retirementAge

  while (retirementSavings > 0 && yearsOfRetirement < targetYears) {
    retirementSavings = (retirementSavings - (monthlyRetirementIncome * 12)) * (1 + realReturn)
    yearsOfRetirement++
  }

  return {
    totalAtRetirement,
    monthlyRetirementIncome,
    yearsOfRetirement: Math.min(yearsOfRetirement, targetYears)
  }
}

// Helper function to calculate required savings for desired retirement income
export function calculateRequiredSavings(
  desiredMonthlyIncome: number,
  yearsToRetirement: number,
  currentSavings: number = 0
): number {
  const { annualReturn, inflationRate, withdrawalRate } = RETIREMENT_PARAMS
  
  // Adjust desired income for inflation
  const inflationAdjustedIncome = desiredMonthlyIncome * 
    Math.pow(1 + inflationRate, yearsToRetirement)
  
  // Calculate required total using 4% rule
  const requiredTotal = (inflationAdjustedIncome * 12) / withdrawalRate
  
  // Calculate required monthly savings
  const realReturn = (1 + annualReturn) / (1 + inflationRate) - 1
  const monthlyRate = realReturn / 12
  
  const futureValueOfCurrent = currentSavings * 
    Math.pow(1 + realReturn, yearsToRetirement)
  
  const additionalNeeded = requiredTotal - futureValueOfCurrent
  
  // Using PMT formula
  const monthlyContribution = (additionalNeeded * monthlyRate) / 
    (Math.pow(1 + monthlyRate, yearsToRetirement * 12) - 1)
  
  return Math.max(RETIREMENT_PARAMS.minContribution, Math.ceil(monthlyContribution))
} 