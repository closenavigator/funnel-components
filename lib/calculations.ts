import { RetirementInputs, RetirementResults, SavingsDataPoint } from '@/types/retirement'

const ANNUAL_RETURN = 0.08 // 8% annual return
const INFLATION_RATE = 0.04 // 4% annual inflation
const SAFE_WITHDRAWAL_RATE = 0.04 // 4% safe withdrawal rate
const RETIREMENT_AGE = 65

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