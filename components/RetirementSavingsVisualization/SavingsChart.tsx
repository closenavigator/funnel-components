import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Person } from '@/types/retirement'
import { formatCurrency } from '@/lib/format'

interface SavingsChartProps {
  data: Person[]
  selectedPerson: Person | null
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-4 rounded-lg shadow-lg border">
        <p className="font-semibold mb-2">Edad: {label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center mb-1">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <p className="text-sm">
              <span className="font-medium">{entry.name}:</span>{' '}
              <span>{formatCurrency(entry.value)}</span>
            </p>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function SavingsChart({ data, selectedPerson }: SavingsChartProps) {
  if (!data.length) return null;

  const chartData = data[0].savings?.map((dataPoint, index) => {
    const point: any = { age: dataPoint.age }
    data.forEach(person => {
      if (person.savings) {
        point[person.name] = person.savings[index]?.total || 0
      }
    })
    return point
  }) || [];

  return (
    <div className="h-[400px] bg-gradient-to-br from-background to-muted rounded-lg p-4 border shadow-inner">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="age" 
            label={{ value: 'Edad', position: 'bottom' }}
            className="text-muted-foreground"
          />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value)}
            className="text-muted-foreground"
          />
          <Tooltip content={<CustomTooltip />} />
          {data.map((person) => (
            <Area
              key={person.name}
              type="monotone"
              dataKey={person.name}
              stroke={person.color}
              fill={person.color}
              fillOpacity={0.1}
              strokeWidth={selectedPerson === person ? 3 : 1}
              opacity={selectedPerson ? (selectedPerson === person ? 1 : 0.3) : 1}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
} 