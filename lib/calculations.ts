import { RetirementInputs, RetirementResults } from '@/types/retirement'

const ANNUAL_RETURN = 0.08 // 8% annual return
const INFLATION_RATE = 0.04 // 4% annual inflation
const SAFE_WITHDRAWAL_RATE = 0.04 // 4% safe withdrawal rate
const RETIREMENT_AGE = 65
const LIFE_EXPECTANCY = 85

export function calculateSavingsOverTime(
  monthlyContribution: number, 
  startAge: number, 
  years: number
) {
  let total = 0
  let annualContribution = monthlyContribution * 12
  const data = []

  for (let i = 0; i <= years; i++) {
    const age = startAge + i
    data.push({
      age,
      [age < RETIREMENT_AGE ? 'savings' : 'retirement']: Math.round(total)
    })

    if (age < RETIREMENT_AGE) {
      // Accumulation phase
      total = (total + annualContribution) * (1 + ANNUAL_RETURN)
      annualContribution *= (1 + INFLATION_RATE) // Increase contributions with inflation
    } else {
      // Retirement phase
      total *= (1 + ANNUAL_RETURN - INFLATION_RATE) // Real return during retirement
    }
  }

  return data
}

export function calculateRetirement(inputs: RetirementInputs): RetirementResults {
  const { age, monthlyContribution, currentSavings, desiredMonthlyIncome } = inputs
  const yearsUntilRetirement = RETIREMENT_AGE - age
  const yearsOfRetirement = LIFE_EXPECTANCY - RETIREMENT_AGE

  if (desiredMonthlyIncome !== undefined) {
    // Reverse calculation mode - "¿Cuánto necesito ahorrar?"
    
    // 1. Calculate how much total savings needed at retirement
    const annualIncomeNeeded = desiredMonthlyIncome * 12
    const totalNeededAtRetirement = annualIncomeNeeded / SAFE_WITHDRAWAL_RATE
    
    // 2. Account for inflation
    const inflationAdjustedTarget = totalNeededAtRetirement * 
      Math.pow(1 + INFLATION_RATE, yearsUntilRetirement)
    
    // 3. Calculate future value of current savings
    const futureValueOfCurrentSavings = currentSavings * 
      Math.pow(1 + ANNUAL_RETURN, yearsUntilRetirement)
    
    // 4. Calculate additional savings needed
    const additionalSavingsNeeded = inflationAdjustedTarget - futureValueOfCurrentSavings
    
    // 5. Calculate required monthly contribution using PMT formula
    const monthlyRate = ANNUAL_RETURN / 12
    const numberOfPayments = yearsUntilRetirement * 12
    
    const requiredMonthlyContribution = (additionalSavingsNeeded * monthlyRate) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    return {
      totalAtRetirement: Math.round(inflationAdjustedTarget),
      monthlyRetirementIncome: Math.round(desiredMonthlyIncome),
      yearsOfRetirement,
      requiredMonthlyContribution: Math.max(1000, Math.round(requiredMonthlyContribution))
    }
  }

  // Forward calculation mode - "¿Cuánto tendré?"
  let futureValue = currentSavings
  let monthlyPayment = monthlyContribution
  
  // Calculate accumulation phase
  for (let i = 0; i < yearsUntilRetirement * 12; i++) {
    futureValue = (futureValue + monthlyPayment) * (1 + ANNUAL_RETURN / 12)
    monthlyPayment *= (1 + INFLATION_RATE / 12) // Increase contributions with inflation
  }

  // Calculate sustainable monthly withdrawal using the 4% rule
  const sustainableMonthlyIncome = (futureValue * SAFE_WITHDRAWAL_RATE) / 12

  return {
    totalAtRetirement: Math.round(futureValue),
    monthlyRetirementIncome: Math.round(sustainableMonthlyIncome),
    yearsOfRetirement,
    requiredMonthlyContribution: undefined
  }
} 