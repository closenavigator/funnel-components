import { RetirementInputs, RetirementResults } from '@/types/retirement'

const PARAMS = {
  annualReturn: 0.08,        // 8% average market return (conservative)
  inflationRate: 0.03,       // 3% inflation
  salaryGrowthRate: 0.03,    // 3% annual salary increase
  retirementAge: 65,         // Standard retirement age
  lifeExpectancy: 90,        // Conservative life expectancy
  withdrawalRate: 0.04       // 4% safe withdrawal rate
}

export function calculateRetirement(inputs: RetirementInputs): RetirementResults {
  const { age, monthlyContribution, currentSavings } = inputs
  const yearsToRetirement = PARAMS.retirementAge - age
  const yearsInRetirement = PARAMS.lifeExpectancy - PARAMS.retirementAge

  // Calculate real return rates (adjusted for inflation)
  const realReturn = (1 + PARAMS.annualReturn) / (1 + PARAMS.inflationRate) - 1
  const realSalaryGrowth = (1 + PARAMS.salaryGrowthRate) / (1 + PARAMS.inflationRate) - 1

  // Calculate accumulation phase
  let total = currentSavings
  let annualContribution = monthlyContribution * 12

  for (let year = 1; year <= yearsToRetirement; year++) {
    total = (total + annualContribution) * (1 + realReturn)
    annualContribution *= (1 + realSalaryGrowth)
  }

  const totalAtRetirement = total

  // Calculate sustainable monthly income in retirement
  const monthlyRetirementIncome = (totalAtRetirement * PARAMS.withdrawalRate) / 12

  // Calculate how many years this income could last
  let retirementSavings = totalAtRetirement
  let yearsOfRetirement = 0

  while (retirementSavings > 0 && yearsOfRetirement < 50) {
    retirementSavings = (retirementSavings - (monthlyRetirementIncome * 12)) * (1 + realReturn)
    yearsOfRetirement++
  }

  return {
    totalAtRetirement,
    monthlyRetirementIncome,
    yearsOfRetirement: Math.min(yearsOfRetirement, yearsInRetirement)
  }
} 