import { Card } from "@/components/ui/card"
import { ClipperInputs, ClipperResults } from "@/types/brandClipper"
import { formatCurrency, formatNumber } from "@/lib/format"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DollarSign, TrendingUp, Users, Video } from "lucide-react"

interface ResultsViewProps {
  inputs: ClipperInputs
  results: ClipperResults
}

export function ResultsView({ inputs, results }: ResultsViewProps) {
  const metrics = [
    {
      label: "Ingresos Mensuales",
      value: formatCurrency(results.monthly.total),
      icon: DollarSign,
      description: "Total estimado mensual"
    },
    {
      label: "Videos Mensuales",
      value: formatNumber(inputs.videosPerDay * 30),
      icon: Video,
      description: "Cantidad de contenido"
    },
    {
      label: "Vistas Totales",
      value: formatNumber(results.funnel.totalViews),
      icon: Users,
      description: "Alcance mensual"
    },
    {
      label: "Ventas Generadas",
      value: formatNumber(results.funnel.sales),
      icon: TrendingUp,
      description: "Conversiones mensuales"
    }
  ]

  const chartData = [
    {
      name: "Base",
      amount: results.monthly.baseSalary
    },
    {
      name: "Bonus Vistas",
      amount: results.monthly.viewBonus
    },
    {
      name: "Revenue Share",
      amount: results.monthly.revenueShare
    }
  ]

  if (inputs.tier === 'clipperExpert' && inputs.weeklyRecurring) {
    chartData.push({
      name: "Bonus Semanal",
      amount: inputs.weeklyRecurring * 4
    })
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </p>
                <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {metric.description}
                </p>
              </div>
              <metric.icon className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Desglose de Ingresos</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelStyle={{ color: 'black' }}
              />
              <Bar dataKey="amount" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
} 