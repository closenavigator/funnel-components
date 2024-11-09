import { RetirementInputs, RetirementResults } from '@/types/retirement'

const ANNUAL_RETURN = 0.08 // 8% annual return
const INFLATION_RATE = 0.04 // 4% annual inflation
const RETIREMENT_AGE = 65
const LIFE_EXPECTANCY = 85

export function calculateRetirement(inputs: RetirementInputs): RetirementResults {
  const { age, monthlyContribution, currentSavings, desiredMonthlyIncome } = inputs
  const yearsUntilRetirement = RETIREMENT_AGE - age
  const yearsOfRetirement = LIFE_EXPECTANCY - RETIREMENT_AGE

  if (desiredMonthlyIncome !== undefined) {
    // Reverse calculation mode
    // Calculate total needed considering inflation
    const inflatedMonthlyIncome = desiredMonthlyIncome * 
      Math.pow(1 + INFLATION_RATE, yearsUntilRetirement)
    const annualIncomeNeeded = inflatedMonthlyIncome * 12
    
    // Calculate total nest egg needed at retirement
    const totalNeeded = annualIncomeNeeded * 
      ((1 - Math.pow(1 + ANNUAL_RETURN - INFLATION_RATE, -yearsOfRetirement)) / 
      (ANNUAL_RETURN - INFLATION_RATE))

    // Calculate future value of current savings
    const currentSavingsFV = currentSavings * 
      Math.pow(1 + ANNUAL_RETURN, yearsUntilRetirement)

    // Calculate required monthly contribution
    const additionalNeeded = totalNeeded - currentSavingsFV
    const monthlyPaymentNeeded = (additionalNeeded * (ANNUAL_RETURN / 12)) / 
      (Math.pow(1 + ANNUAL_RETURN / 12, yearsUntilRetirement * 12) - 1)

    return {
      totalAtRetirement: Math.round(totalNeeded),
      monthlyRetirementIncome: Math.round(inflatedMonthlyIncome),
      yearsOfRetirement,
      requiredMonthlyContribution: Math.round(Math.max(1000, monthlyPaymentNeeded))
    }
  }

  // Forward calculation mode
  let futureValue = currentSavings
  let monthlyPayment = monthlyContribution
  
  // Calculate accumulation phase with increasing contributions
  for (let i = 0; i < yearsUntilRetirement * 12; i++) {
    futureValue = (futureValue + monthlyPayment) * (1 + ANNUAL_RETURN / 12)
    monthlyPayment *= (1 + INFLATION_RATE / 12) // Increase contributions with inflation
  }

  // Calculate sustainable monthly withdrawal
  const sustainableMonthlyIncome = (futureValue * (ANNUAL_RETURN - INFLATION_RATE) / 12) / 
    (1 - Math.pow(1 + ANNUAL_RETURN - INFLATION_RATE, -yearsOfRetirement))

  return {
    totalAtRetirement: Math.round(futureValue),
    monthlyRetirementIncome: Math.round(sustainableMonthlyIncome),
    yearsOfRetirement,
    requiredMonthlyContribution: undefined
  }
} 