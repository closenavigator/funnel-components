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
  minVideosPerDay: 1,
  maxVideosPerDay: 5,
  minViewsPerVideo: 100,
  maxViewsPerVideo: 1000000,
  minBonusRate: 0.1,
  maxBonusRate: 10,
  minRevenueShare: 0,
  maxRevenueShare: 0.5,
  minProductPrice: 10,
  maxProductPrice: 10000,
  minWeeklyRecurring: 100,
  maxWeeklyRecurring: 10000,
  
  // Profile metrics
  minMonthlyImpressions: 1000,
  maxMonthlyImpressions: 10000000,
}

export type ClipperTier = 
  | 'brandClipper'
  | 'clipperExpert'

export interface FunnelMetrics {
  reelToProfile: number
  profileToLink: number
  linkToLanding: number
  landingToSale: number
  monthlyImpressions: number
}

export interface VideoEntry {
  date: string
  views: number
  likes?: number
  shares?: number
  comments?: number
  platform: 'tiktok' | 'instagram' | 'youtube'
  url: string
  postId?: string
  thumbnailUrl?: string
}

export interface ClipperInputs {
  tier: ClipperTier
  videosPerDay: number
  videoHistory: VideoEntry[]
  viewBonusRate: number
  revenueSharePercent: number
  averageProductPrice: number
  weeklyRecurring?: number
  baseSalary?: number
  funnelMetrics: FunnelMetrics
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