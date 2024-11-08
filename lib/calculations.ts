interface SavingsParams {
  monthlyContribution: number
  startAge: number
  years: number
  annualReturn: number
  inflationRate: number
  salaryGrowthRate: number
  retirementAge: number
}

const DEFAULT_PARAMS = {
  annualReturn: 0.08,
  inflationRate: 0.03,
  salaryGrowthRate: 0.03,
  retirementAge: 65
}

export const calculateSavingsOverTime = (
  monthlyContribution: number,
  startAge: number,
  years: number,
  customParams?: Partial<SavingsParams>
): { age: number; total: number; realTotal: number }[] => {
  const params = { ...DEFAULT_PARAMS, ...customParams }
  const {
    annualReturn,
    inflationRate,
    salaryGrowthRate,
    retirementAge
  } = params

  const realReturn = (1 + annualReturn) / (1 + inflationRate) - 1
  const realSalaryGrowth = (1 + salaryGrowthRate) / (1 + inflationRate) - 1

  let total = 0
  let realTotal = 0
  let annualContribution = monthlyContribution * 12
  const data = []

  for (let i = 0; i <= years; i++) {
    const currentAge = startAge + i
    
    data.push({
      age: currentAge,
      total: Math.round(total),
      realTotal: Math.round(realTotal)
    })

    if (currentAge < retirementAge) {
      total = (total + annualContribution) * (1 + annualReturn)
      realTotal = (realTotal + annualContribution) * (1 + realReturn)
      
      annualContribution *= (1 + salaryGrowthRate)
    } else {
      total *= (1 + annualReturn * 0.7)
      realTotal *= (1 + realReturn * 0.7)
    }
  }

  return data
}

export const calculateRetirementNeeds = (
  currentAge: number,
  monthlyExpenses: number,
  desiredRetirementAge: number = 65,
  lifeExpectancy: number = 90
): number => {
  const yearsInRetirement = lifeExpectancy - desiredRetirementAge
  const annualExpenses = monthlyExpenses * 12
  const inflationAdjustedExpenses = annualExpenses * Math.pow(1 + DEFAULT_PARAMS.inflationRate, desiredRetirementAge - currentAge)
  
  return inflationAdjustedExpenses * 25
} 