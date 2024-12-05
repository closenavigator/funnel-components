import { useState } from 'react'
import { VideoStats, retryVideoStats, batchProcessVideos } from '@/lib/services/apifyService'

export function useApifyStats() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchVideoStats = async (
    platform: 'tiktok' | 'instagram' | 'youtube',
    url: string
  ): Promise<VideoStats | null> => {
    setLoading(true)
    setError(null)

    try {
      const stats = await retryVideoStats(platform, url)
      return stats
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const processBatch = async (
    videos: { url: string; platform: 'tiktok' | 'instagram' | 'youtube' }[]
  ): Promise<VideoStats[]> => {
    setLoading(true)
    setError(null)

    try {
      const results = await batchProcessVideos(videos)
      return results
    } catch (err) {
      setError(err.message)
      return []
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    fetchVideoStats,
    processBatch
  }
} 