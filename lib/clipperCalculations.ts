import { 
  ClipperInputs, 
  ClipperResults, 
  FunnelMetrics,
  FunnelResults,
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
  // Calculate average views from history
  const calculatedAverageViews = inputs.videoHistory.length > 0
    ? inputs.videoHistory.reduce((sum, entry) => sum + entry.views, 0) / inputs.videoHistory.length
    : 0

  // Calculate monthly videos
  const videosPerMonth = inputs.videosPerDay * 30

  // Validate and clamp inputs
  const validatedInputs = {
    ...inputs,
    videosPerDay: Math.max(CLIPPER_PARAMS.minVideosPerDay, Math.min(CLIPPER_PARAMS.maxVideosPerDay, inputs.videosPerDay)),
    viewBonusRate: Math.max(CLIPPER_PARAMS.minBonusRate, Math.min(CLIPPER_PARAMS.maxBonusRate, inputs.viewBonusRate)),
    revenueSharePercent: Math.max(CLIPPER_PARAMS.minRevenueShare * 100, Math.min(CLIPPER_PARAMS.maxRevenueShare * 100, inputs.revenueSharePercent)),
    averageProductPrice: Math.max(CLIPPER_PARAMS.minProductPrice, Math.min(CLIPPER_PARAMS.maxProductPrice, inputs.averageProductPrice))
  }

  const { 
    tier,
    viewBonusRate,
    revenueSharePercent,
    averageProductPrice,
    weeklyRecurring
  } = validatedInputs

  // Calculate funnel metrics
  const totalViews = videosPerMonth * calculatedAverageViews
  const funnelResults = calculateFunnelMetrics(totalViews, inputs.funnelMetrics)
  funnelResults.revenue = funnelResults.sales * averageProductPrice

  // Calculate different income streams
  const viewBonus = (totalViews / 1000) * viewBonusRate
  const revenueShare = funnelResults.revenue * (revenueSharePercent / 100)

  // Set base salary based on tier and input
  const baseSalary = inputs.baseSalary ?? (tier === 'clipperExpert' ? 
    CLIPPER_PARAMS.maxBaseSalary : 
    CLIPPER_PARAMS.minBaseSalary)

  // Calculate monthly breakdown
  const monthlyBreakdown = {
    baseSalary,
    viewBonus,
    revenueShare,
    total: baseSalary + viewBonus + revenueShare
  }

  // Add weekly recurring bonus for clipperExpert
  if (tier === 'clipperExpert' && weeklyRecurring) {
    const weeklyBonus = weeklyRecurring * 4
    monthlyBreakdown.total += weeklyBonus
  }

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