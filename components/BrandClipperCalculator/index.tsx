"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Steps } from "@/components/ui/steps"
import { calculateEarnings } from '@/lib/clipperCalculations'
import { ClipperInputs, ClipperResults, CLIPPER_PARAMS, ClipperTier } from '@/types/brandClipper'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/format'

// Import the components
import { TierSelection } from './TierSelection'
import { ContentMetrics } from './ContentMetrics'
import { FunnelMetrics } from './FunnelMetrics'
import { CompensationSettings } from './CompensationSettings'
import { ResultsView } from './ResultsView'

export function BrandClipperCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [inputs, setInputs] = useState<ClipperInputs>({
    tier: 'brandClipper',
    videosPerDay: 2,
    averageViews: 10000,
    viewBonusRate: 1,
    revenueSharePercent: 10,
    averageProductPrice: 100,
    funnelMetrics: {
      reelToProfile: CLIPPER_PARAMS.reelToProfile,
      profileToLink: CLIPPER_PARAMS.profileToLink,
      linkToLanding: CLIPPER_PARAMS.linkToLanding,
      landingToSale: CLIPPER_PARAMS.landingToSale.midTicket,
      monthlyImpressions: 100000
    }
  })

  // Calculate results for the ResultsView component
  const results = calculateEarnings(inputs)

  const steps = [
    {
      title: "Choose Your Tier",
      description: "Select your clipper level",
      component: <TierSelection inputs={inputs} onChange={handleInputChange} />
    },
    {
      title: "Content Production",
      description: "Set your content creation pace",
      component: <ContentMetrics inputs={inputs} onChange={handleInputChange} />
    },
    {
      title: "Funnel Metrics",
      description: "Configure your conversion rates",
      component: <FunnelMetrics inputs={inputs} onFunnelChange={handleFunnelChange} />
    },
    {
      title: "Compensation",
      description: "Set your earning parameters",
      component: <CompensationSettings inputs={inputs} onChange={handleInputChange} />
    },
    {
      title: "Results",
      description: "View your potential earnings",
      component: <ResultsView inputs={inputs} results={results} />
    }
  ]

  function handleInputChange(field: keyof ClipperInputs, value: number | ClipperTier) {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  function handleFunnelChange(field: keyof FunnelMetrics, value: number) {
    setInputs(prev => ({
      ...prev,
      funnelMetrics: { ...prev.funnelMetrics, [field]: value }
    }))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Brand Clipper Calculator
        </CardTitle>
        <CardDescription className="text-center">
          Calculate your potential earnings as a professional content clipper
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Steps
          steps={steps.map(s => ({ title: s.title, description: s.description }))}
          currentStep={currentStep}
        />
        
        <div className="mt-8">
          {steps[currentStep].component}
        </div>

        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStep === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 