import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ClipperInputs, VideoEntry } from "@/types/brandClipper"
import { formatNumber } from "@/lib/format"
import { CalendarIcon, Trash2Icon, Loader2 } from "lucide-react"
import { getTikTokVideoStats, getInstagramVideoStats } from '@/lib/services/videoStats'
import { getInstagramPostsStats, getInstagramUserStats } from '@/lib/services/apifyService'
import { toast } from '@/components/ui/use-toast'

interface VideoHistoryProps {
  inputs: ClipperInputs
  onChange: (field: keyof ClipperInputs, value: VideoEntry[]) => void
}

export function VideoHistory({ inputs, onChange }: VideoHistoryProps) {
  const [newEntry, setNewEntry] = useState<Partial<VideoEntry & { url: string }>>({
    date: new Date().toISOString().split('T')[0],
    views: 0,
    url: ''
  })
  const [platform, setPlatform] = useState<'tiktok' | 'instagram'>('tiktok')
  const [loading, setLoading] = useState(false)
  const [profileStats, setProfileStats] = useState<any>(null)

  const fetchVideoStats = async () => {
    if (!newEntry.url) return

    setLoading(true)
    try {
      const stats = platform === 'tiktok' 
        ? await getTikTokVideoStats(newEntry.url)
        : await getInstagramVideoStats(newEntry.url)
      
      setNewEntry(prev => ({
        ...prev,
        views: stats.views
      }))
    } catch (error) {
      console.error('Error fetching video stats:', error)
      // You might want to show an error toast here
    } finally {
      setLoading(false)
    }
  }

  const fetchInstagramStats = async (url: string) => {
    setLoading(true)
    try {
      // Get post stats
      const stats = await getInstagramPostsStats(url)
      
      // Extract username from URL
      const username = url.split('/')[3]
      if (username) {
        // Get user profile stats
        const userStats = await getInstagramUserStats(username)
        setProfileStats(userStats)
      }

      setNewEntry(prev => ({
        ...prev,
        views: stats.totalViews,
        likes: stats.totalLikes,
        comments: stats.totalComments,
        platform: 'instagram',
        url,
        thumbnailUrl: stats.posts[0]?.displayUrl,
        postId: stats.posts[0]?.id
      }))

      toast({
        title: "Stats fetched successfully",
        description: `Found ${stats.posts.length} posts with ${stats.totalViews} total views`,
      })
    } catch (error) {
      toast({
        title: "Error fetching stats",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const addEntry = () => {
    if (newEntry.date && newEntry.views) {
      const { url, ...entryData } = newEntry
      const updatedHistory = [...inputs.videoHistory, entryData as VideoEntry]
      onChange('videoHistory', updatedHistory)
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        views: 0,
        url: ''
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
        
        <div className="space-y-4">
          <Select value={platform} onValueChange={(value: 'tiktok' | 'instagram') => setPlatform(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona plataforma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="url"
            placeholder="URL del video"
            value={newEntry.url}
            onChange={(e) => setNewEntry({ ...newEntry, url: e.target.value })}
          />

          <Button 
            onClick={fetchVideoStats} 
            disabled={loading || !newEntry.url}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando estadísticas...
              </>
            ) : (
              'Obtener estadísticas'
            )}
          </Button>

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