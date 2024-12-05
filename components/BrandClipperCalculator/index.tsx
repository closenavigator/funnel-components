"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { calculateEarnings } from '@/lib/clipperCalculations'
import { ClipperInputs, ClipperResults, CLIPPER_PARAMS, CompensationModel } from '@/types/brandClipper'
import { formatCurrency } from '@/lib/format'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function BrandClipperCalculator() {
  const [inputs, setInputs] = useState<ClipperInputs>({
    baseSalary: 5000,
    videosPerMonth: 20,
    averageViews: 10000,
    viewBonusRate: 1,
    revenueSharePercent: 10,
    averageProductPrice: 100,
    compensationModel: 'complete'
  })

  const results = calculateEarnings(inputs)

  const handleInputChange = (field: keyof ClipperInputs, value: number | CompensationModel) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const chartData = [
    {
      name: 'Base Salary',
      amount: results.monthly.baseSalary,
    },
    {
      name: 'View Bonus',
      amount: results.monthly.viewBonus,
    },
    {
      name: 'Revenue Share',
      amount: results.monthly.revenueShare,
    },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Brand Clipper Salary Calculator
        </CardTitle>
        <CardDescription className="text-center">
          Calculate your potential earnings as a Brand Clipper
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Base Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="baseSalary">Base Monthly Salary</Label>
            <Input
              id="baseSalary"
              type="number"
              value={inputs.baseSalary}
              onChange={(e) => handleInputChange('baseSalary', Number(e.target.value))}
              min={CLIPPER_PARAMS.minBaseSalary}
              max={CLIPPER_PARAMS.maxBaseSalary}
            />
            <Slider
              value={[inputs.baseSalary]}
              min={CLIPPER_PARAMS.minBaseSalary}
              max={CLIPPER_PARAMS.maxBaseSalary}
              step={500}
              onValueChange={(value) => handleInputChange('baseSalary', value[0])}
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="compensationModel">Compensation Model</Label>
            <Select
              value={inputs.compensationModel}
              onValueChange={(value: CompensationModel) => handleInputChange('compensationModel', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baseSalary">Base Salary Only</SelectItem>
                <SelectItem value="baseAndViews">Base + View Bonus</SelectItem>
                <SelectItem value="baseAndRevenue">Base + Revenue Share</SelectItem>
                <SelectItem value="complete">Complete Package</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="videosPerMonth">Videos per Month</Label>
            <Input
              id="videosPerMonth"
              type="number"
              value={inputs.videosPerMonth}
              onChange={(e) => handleInputChange('videosPerMonth', Number(e.target.value))}
              min={CLIPPER_PARAMS.minVideosPerMonth}
              max={CLIPPER_PARAMS.maxVideosPerMonth}
            />
            <Slider
              value={[inputs.videosPerMonth]}
              min={CLIPPER_PARAMS.minVideosPerMonth}
              max={CLIPPER_PARAMS.maxVideosPerMonth}
              step={1}
              onValueChange={(value) => handleInputChange('videosPerMonth', value[0])}
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="averageViews">Average Views per Video</Label>
            <Input
              id="averageViews"
              type="number"
              value={inputs.averageViews}
              onChange={(e) => handleInputChange('averageViews', Number(e.target.value))}
              min={CLIPPER_PARAMS.minViewsPerVideo}
              max={CLIPPER_PARAMS.maxViewsPerVideo}
            />
            <Slider
              value={[inputs.averageViews]}
              min={CLIPPER_PARAMS.minViewsPerVideo}
              max={CLIPPER_PARAMS.maxViewsPerVideo}
              step={100}
              onValueChange={(value) => handleInputChange('averageViews', value[0])}
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Monthly Earnings Breakdown</h3>
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="amount" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-600">Monthly Total</p>
              <p className="text-2xl font-bold text-indigo-600">
                {formatCurrency(results.monthly.total)}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-600">Annual Total</p>
              <p className="text-2xl font-bold text-indigo-600">
                {formatCurrency(results.annual.total)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 