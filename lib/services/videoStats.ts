import { ApifyClient } from 'apify-client'

const apifyClient = new ApifyClient({
  token: process.env.NEXT_PUBLIC_APIFY_TOKEN,
})

interface VideoStats {
  views: number
  likes: number
  shares: number
  comments: number
}

export async function getTikTokVideoStats(videoUrl: string): Promise<VideoStats> {
  try {
    const run = await apifyClient.actor("clockworks/tiktok-scraper").call({
      urls: [videoUrl],
      shouldDownloadVideos: false,
      shouldDownloadCovers: false,
    })

    const dataset = await apifyClient.dataset(run.defaultDatasetId).listItems()
    const videoData = dataset[0]

    return {
      views: videoData.stats.playCount || 0,
      likes: videoData.stats.diggCount || 0,
      shares: videoData.stats.shareCount || 0,
      comments: videoData.stats.commentCount || 0
    }
  } catch (error) {
    console.error('Error fetching TikTok stats:', error)
    throw error
  }
}

export async function getInstagramVideoStats(videoUrl: string): Promise<VideoStats> {
  try {
    const run = await apifyClient.actor("apify/instagram-post-scraper").call({
      urls: [videoUrl],
      resultsLimit: 1
    })

    const dataset = await apifyClient.dataset(run.defaultDatasetId).listItems()
    const videoData = dataset[0]

    return {
      views: videoData.videoViewCount || 0,
      likes: videoData.likesCount || 0,
      shares: 0, // Instagram doesn't provide share count
      comments: videoData.commentsCount || 0
    }
  } catch (error) {
    console.error('Error fetching Instagram stats:', error)
    throw error
  }
} 