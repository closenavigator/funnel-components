import { 
  ClipperInputs, 
  ClipperResults, 
  FunnelMetrics, 
  CLIPPER_PARAMS 
} from '@/types/brandClipper'

export function calculateFunnelMetrics(
  totalViews: number,
  metrics: Partial<FunnelMetrics> = {}
): FunnelResults {
  const {
    reelToProfile = CLIPPER_PARAMS.reelToProfile,
    profileToLink = CLIPPER_PARAMS.profileToLink,
    linkToLanding = CLIPPER_PARAMS.linkToLanding,
    landingToSale = CLIPPER_PARAMS.landingToSale.midTicket
  } = metrics

  const profileVisits = totalViews * reelToProfile
  const linkClicks = profileVisits * profileToLink
  const landingViews = linkClicks * linkToLanding
  const sales = landingViews * landingToSale

  return {
    totalViews,
    profileVisits,
    linkClicks,
    landingViews,
    sales,
    revenue: 0 // Will be calculated in main function
  }
}

export function calculateEarnings(
  inputs: ClipperInputs,
  customMetrics?: Partial<FunnelMetrics>
): ClipperResults {
  const { 
    baseSalary,
    videosPerMonth,
    averageViews,
    viewBonusRate,
    revenueSharePercent,
    averageProductPrice,
    compensationModel
  } = inputs

  // Calculate funnel metrics
  const totalViews = videosPerMonth * averageViews
  const funnelResults = calculateFunnelMetrics(totalViews, customMetrics)
  funnelResults.revenue = funnelResults.sales * averageProductPrice

  // Calculate different income streams
  const viewBonus = (totalViews / 1000) * viewBonusRate
  const revenueShare = funnelResults.revenue * (revenueSharePercent / 100)

  // Determine which components to include based on compensation model
  const monthlyBreakdown = {
    baseSalary,
    viewBonus: compensationModel === 'baseAndViews' || compensationModel === 'complete' ? viewBonus : 0,
    revenueShare: compensationModel === 'baseAndRevenue' || compensationModel === 'complete' ? revenueShare : 0,
    total: baseSalary
  }

  // Add applicable bonuses to total
  monthlyBreakdown.total += monthlyBreakdown.viewBonus + monthlyBreakdown.revenueShare

  // Calculate annual figures
  const annualBreakdown = {
    baseSalary: monthlyBreakdown.baseSalary * 12,
    viewBonus: monthlyBreakdown.viewBonus * 12,
    revenueShare: monthlyBreakdown.revenueShare * 12,
    total: monthlyBreakdown.total * 12
  }

  return {
    monthly: monthlyBreakdown,
    annual: annualBreakdown,
    funnel: funnelResults
  }
} 