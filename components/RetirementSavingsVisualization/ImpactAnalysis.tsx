import { motion } from 'framer-motion'
import { Person } from '@/types/retirement'
import { formatCurrency } from '@/lib/format'

interface ImpactAnalysisProps {
  person: Person
  monthlyContribution: number
  retirementData: Array<{
    savings: Array<{ age: number; total: number }>
  }>
}

export function ImpactAnalysis({
  person,
  monthlyContribution,
  retirementData
}: ImpactAnalysisProps) {
  const personData = retirementData.find(data => data.name === person.name)
  const finalSavings = personData?.savings[personData.savings.length - 1]?.total || 0

  return (
    <motion.div 
      className="bg-muted rounded-lg p-6 border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="font-bold text-xl mb-4">
        Impacto del Tiempo:
      </h3>
      <p className="text-muted-foreground">
        {person.name === "Tú" ? "Si empiezas" : `Si ${person.name} empieza`} a 
        ahorrar a los {person.startAge} años con una aportación mensual 
        de {formatCurrency(monthlyContribution)}, a los 65 años 
        {person.name === "Tú" ? " podrías" : " podría"} acumular{' '}
        <span className="font-semibold text-foreground">
          {formatCurrency(finalSavings)}
        </span>.
      </p>
      <p className="mt-4 text-muted-foreground">
        {person.startAge > 25 ? (
          <>
            Observa cómo empezar antes puede hacer una gran diferencia. 
            <span className="font-semibold text-foreground"> Cuanto antes empieces 
            y más consistente seas, más fácil será alcanzar tus metas financieras</span>.
          </>
        ) : (
          <>
            Empezar temprano te da una ventaja significativa. 
            <span className="font-semibold text-foreground"> El tiempo es tu mejor 
            aliado para hacer crecer tus inversiones</span>.
          </>
        )}
      </p>
    </motion.div>
  )
} 