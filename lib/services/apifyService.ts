import { ApifyClient } from 'apify-client'
import { toast } from '@/components/ui/use-toast'

const apifyClient = new ApifyClient({
  token: process.env.NEXT_PUBLIC_APIFY_TOKEN,
})

export interface VideoStats {
  views: number
  likes: number
  shares: number
  comments: number
  platform: 'tiktok' | 'instagram' | 'youtube'
  url: string
  postId?: string
  thumbnailUrl?: string
  createdAt?: string
  error?: string
}

const RATE_LIMIT_DELAY = 1000 // 1 second between requests

async function waitForRateLimit() {
  await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY))
}

export async function getTikTokStats(videoUrl: string): Promise<VideoStats> {
  try {
    await waitForRateLimit()

    // Validate TikTok URL
    if (!videoUrl.includes('tiktok.com')) {
      throw new Error('Invalid TikTok URL')
    }

    const run = await apifyClient.actor("clockworks/tiktok-scraper").call({
      urls: [videoUrl],
      shouldDownloadVideos: false,
      shouldDownloadCovers: false,
      proxyConfiguration: {
        useApifyProxy: true,
      },
    })

    const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems()
    const videoData = items[0]

    if (!videoData) {
      throw new Error('No data returned from Apify')
    }

    return {
      views: videoData.stats?.playCount || 0,
      likes: videoData.stats?.diggCount || 0,
      shares: videoData.stats?.shareCount || 0,
      comments: videoData.stats?.commentCount || 0,
      platform: 'tiktok',
      url: videoUrl,
      postId: videoData.id,
      thumbnailUrl: videoData.covers?.[0],
      createdAt: videoData.createTime
    }
  } catch (error) {
    console.error('Error fetching TikTok stats:', error)
    toast({
      title: "Error fetching video stats",
      description: error.message || "Please try again later",
      variant: "destructive"
    })
    return {
      views: 0,
      likes: 0,
      shares: 0,
      comments: 0,
      platform: 'tiktok',
      url: videoUrl,
      error: error.message
    }
  }
}

// Add retry mechanism for failed requests
export async function retryVideoStats(
  platform: 'tiktok' | 'instagram' | 'youtube',
  videoUrl: string,
  maxRetries = 3
): Promise<VideoStats> {
  let lastError: Error
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      switch (platform) {
        case 'tiktok':
          return await getTikTokStats(videoUrl)
        case 'instagram':
          // Add Instagram implementation when needed
          throw new Error('Instagram scraping not implemented yet')
        case 'youtube':
          // Add YouTube implementation when needed
          throw new Error('YouTube scraping not implemented yet')
        default:
          throw new Error('Unsupported platform')
      }
    } catch (error) {
      lastError = error
      await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1))) // Exponential backoff
    }
  }

  throw lastError
}

// Add batch processing capability
export async function batchProcessVideos(
  videos: { url: string; platform: 'tiktok' | 'instagram' | 'youtube' }[]
): Promise<VideoStats[]> {
  const results: VideoStats[] = []
  
  for (const video of videos) {
    try {
      const stats = await retryVideoStats(video.platform, video.url)
      results.push(stats)
    } catch (error) {
      results.push({
        views: 0,
        likes: 0,
        shares: 0,
        comments: 0,
        platform: video.platform,
        url: video.url,
        error: error.message
      })
    }
  }

  return results
}

export interface InstagramPostStats {
  id: string
  shortCode: string
  caption: string
  commentsCount: number
  dimensionsHeight: number
  dimensionsWidth: number
  displayUrl: string
  likesCount: number
  timestamp: string
  videoViewCount?: number
  videoUrl?: string
  hashtags: string[]
  mentions: string[]
  url: string
  ownerFullName: string
  ownerUsername: string
  location?: string
}

export async function getInstagramStats(url: string, type: 'posts' | 'comments' | 'details' = 'posts'): Promise<InstagramPostStats[]> {
  try {
    const run = await apifyClient.actor("apify/instagram-scraper").call({
      directUrls: [url],
      resultsType: type,
      resultsLimit: 200,
      addParentData: true,
      proxy: {
        useApifyProxy: true,
      },
    })

    const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems()
    return items as InstagramPostStats[]
  } catch (error) {
    console.error('Error fetching Instagram stats:', error)
    throw error
  }
}

export async function getInstagramUserStats(username: string): Promise<{
  followersCount: number
  followsCount: number
  postsCount: number
  profilePicUrl: string
  bio: string
  website: string
  fullName: string
  isVerified: boolean
}> {
  try {
    const run = await apifyClient.actor("apify/instagram-scraper").call({
      directUrls: [`https://www.instagram.com/${username}/`],
      resultsType: 'details',
      proxy: {
        useApifyProxy: true,
      },
    })

    const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems()
    const userData = items[0]

    return {
      followersCount: userData.followersCount || 0,
      followsCount: userData.followsCount || 0,
      postsCount: userData.postsCount || 0,
      profilePicUrl: userData.profilePicUrl || '',
      bio: userData.bio || '',
      website: userData.website || '',
      fullName: userData.fullName || '',
      isVerified: userData.isVerified || false,
    }
  } catch (error) {
    console.error('Error fetching Instagram user stats:', error)
    throw error
  }
}

// Helper function to extract stats from multiple posts
export async function getInstagramPostsStats(url: string): Promise<{
  totalViews: number
  totalLikes: number
  totalComments: number
  posts: InstagramPostStats[]
}> {
  try {
    const posts = await getInstagramStats(url, 'posts')
    
    return posts.reduce((acc, post) => ({
      totalViews: acc.totalViews + (post.videoViewCount || 0),
      totalLikes: acc.totalLikes + (post.likesCount || 0),
      totalComments: acc.totalComments + (post.commentsCount || 0),
      posts: [...acc.posts, post]
    }), {
      totalViews: 0,
      totalLikes: 0,
      totalComments: 0,
      posts: [] as InstagramPostStats[]
    })
  } catch (error) {
    console.error('Error processing Instagram posts:', error)
    throw error
  }
}

// We'll add more platform integrations as you provide them 