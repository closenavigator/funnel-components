interface SavingsParams {
  monthlyContribution: number
  startAge: number
  years: number
  annualReturn: number
  inflationRate: number
  salaryGrowthRate: number
  retirementAge: number
  retirementReturn: number
}

const DEFAULT_PARAMS: Partial<SavingsParams> = {
  annualReturn: 0.12, // 12% annual return
  inflationRate: 0.04, // 4% inflation
  salaryGrowthRate: 0.04, // 4% salary growth
  retirementAge: 65,
  retirementReturn: 0.05, // 5% return during retirement
}

export const calculateSavingsOverTime = (
  monthlyContribution: number,
  startAge: number,
  years: number,
  params: Partial<SavingsParams> = {}
): { age: number; total: number }[] => {
  const {
    annualReturn,
    inflationRate,
    salaryGrowthRate,
    retirementAge,
    retirementReturn
  } = { ...DEFAULT_PARAMS, ...params }

  let total = 0
  let annualContribution = monthlyContribution * 12
  const data: { age: number; total: number }[] = []
  const realReturn = (1 + annualReturn!) / (1 + inflationRate!) - 1
  const realRetirementReturn = (1 + retirementReturn!) / (1 + inflationRate!) - 1
  const realSalaryGrowth = (1 + salaryGrowthRate!) / (1 + inflationRate!) - 1

  for (let i = 0; i <= years; i++) {
    const currentAge = startAge + i
    data.push({
      age: currentAge,
      total: Math.round(total)
    })

    if (currentAge < retirementAge!) {
      // During accumulation phase
      total = (total + annualContribution) * (1 + realReturn)
      annualContribution *= (1 + realSalaryGrowth)
    } else {
      // During retirement phase
      total *= (1 + realRetirementReturn)
    }
  }

  return data
} 