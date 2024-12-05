export const CLIPPER_PARAMS = {
  // Default conversion rates
  reelToProfile: 0.03,
  profileToLink: 0.02,
  linkToLanding: 0.85,
  landingToSale: {
    lowTicket: 0.03,
    midTicket: 0.015,
    highTicket: 0.0075
  },
  
  // Input constraints
  minBaseSalary: 1000,
  maxBaseSalary: 50000,
  minVideosPerMonth: 1,
  maxVideosPerMonth: 100,
  minViewsPerVideo: 100,
  maxViewsPerVideo: 1000000,
  minBonusRate: 0.1,
  maxBonusRate: 10,
  minRevenueShare: 0,
  maxRevenueShare: 0.5,
  minProductPrice: 10,
  maxProductPrice: 10000
}

export type CompensationModel = 
  | 'baseSalary'
  | 'baseAndViews'
  | 'baseAndRevenue'
  | 'complete'

export interface ClipperInputs {
  baseSalary: number
  videosPerMonth: number
  averageViews: number
  viewBonusRate: number
  revenueSharePercent: number
  averageProductPrice: number
  compensationModel: CompensationModel
}

export interface FunnelMetrics {
  reelToProfile: number
  profileToLink: number
  linkToLanding: number
  landingToSale: number
}

export interface EarningsBreakdown {
  baseSalary: number
  viewBonus: number
  revenueShare: number
  total: number
}

export interface FunnelResults {
  totalViews: number
  profileVisits: number
  linkClicks: number
  landingViews: number
  sales: number
  revenue: number
}

export interface ClipperResults {
  monthly: EarningsBreakdown
  annual: EarningsBreakdown
  funnel: FunnelResults
} 