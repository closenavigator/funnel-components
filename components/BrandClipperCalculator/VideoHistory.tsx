import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ClipperInputs, VideoEntry } from "@/types/brandClipper"
import { formatNumber } from "@/lib/format"
import { CalendarIcon, Trash2Icon } from "lucide-react"

interface VideoHistoryProps {
  inputs: ClipperInputs
  onChange: (field: keyof ClipperInputs, value: VideoEntry[]) => void
}

export function VideoHistory({ inputs, onChange }: VideoHistoryProps) {
  const [newEntry, setNewEntry] = useState<Partial<VideoEntry>>({
    date: new Date().toISOString().split('T')[0],
    views: 0
  })

  const addEntry = () => {
    if (newEntry.date && newEntry.views) {
      const updatedHistory = [...inputs.videoHistory, newEntry as VideoEntry]
      onChange('videoHistory', updatedHistory)
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        views: 0
      })
    }
  }

  const removeEntry = (index: number) => {
    const updatedHistory = inputs.videoHistory.filter((_, i) => i !== index)
    onChange('videoHistory', updatedHistory)
  }

  const calculateAverageViews = () => {
    if (inputs.videoHistory.length === 0) return 0
    const totalViews = inputs.videoHistory.reduce((sum, entry) => sum + entry.views, 0)
    return totalViews / inputs.videoHistory.length
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Historial de Videos</Label>
        <p className="text-sm text-muted-foreground">
          Agrega tus videos con sus vistas para calcular tu potencial
        </p>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              type="date"
              value={newEntry.date}
              onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Vistas"
              value={newEntry.views || ''}
              onChange={(e) => setNewEntry({ ...newEntry, views: Number(e.target.value) })}
            />
          </div>
          <Button onClick={addEntry}>Agregar</Button>
        </div>
      </div>

      <div className="space-y-4">
        {inputs.videoHistory.map((entry, index) => (
          <Card key={index} className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(entry.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{formatNumber(entry.views)} vistas</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeEntry(index)}
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {inputs.videoHistory.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Promedio de vistas: {formatNumber(calculateAverageViews())}
          </p>
        </div>
      )}
    </div>
  )
} 