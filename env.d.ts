declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APIFY_TOKEN: string
      NODE_ENV: 'development' | 'production'
      // Add other env variables here
    }
  }
}

export {} 