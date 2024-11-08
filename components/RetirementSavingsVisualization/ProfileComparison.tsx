import { motion } from 'framer-motion'
import { Person } from '@/types/retirement'

interface ProfileComparisonProps {
  people: Person[]
  selectedPerson: Person | null
  setSelectedPerson: (person: Person | null) => void
}

const AnimatedAvatar = ({ 
  person, 
  isSelected, 
  onClick 
}: { 
  person: Person
  isSelected: boolean
  onClick: () => void 
}) => (
  <motion.div
    className={`rounded-full w-16 h-16 flex items-center justify-center text-3xl cursor-pointer ${
      isSelected ? 'ring-2 ring-primary' : ''
    }`}
    style={{ background: person.color }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {person.avatar}
  </motion.div>
)

export function ProfileComparison({
  people,
  selectedPerson,
  setSelectedPerson
}: ProfileComparisonProps) {
  return (
    <div className="flex justify-around mb-8">
      {people.map((person) => (
        <div key={person.name} className="flex flex-col items-center">
          <AnimatedAvatar 
            person={person} 
            isSelected={selectedPerson === person}
            onClick={() => setSelectedPerson(selectedPerson === person ? null : person)}
          />
          <p className="mt-2 font-medium text-foreground">{person.name}</p>
          <p className="text-sm text-muted-foreground">
            {person.name === "Tú" ? "Tu edad actual" : "Inicio"}: {person.startAge} años
          </p>
        </div>
      ))}
    </div>
  )
} 