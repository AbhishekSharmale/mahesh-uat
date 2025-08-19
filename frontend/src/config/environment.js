const config = {
  development: {
    API_URL: 'http://localhost:3001',
    ANALYTICS_ENABLED: false,
    DEBUG_MODE: true,
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
    FIREBASE_ENABLED: true,
  },
  production: {
    API_URL: 'https://api.missionpolice.com',
    ANALYTICS_ENABLED: true,
    DEBUG_MODE: false,
    CACHE_DURATION: 60 * 60 * 1000, // 1 hour
    FIREBASE_ENABLED: true,
  },
  test: {
    API_URL: 'http://localhost:3001',
    ANALYTICS_ENABLED: false,
    DEBUG_MODE: true,
    CACHE_DURATION: 1000, // 1 second
  }
}

const environment = process.env.NODE_ENV || 'development'

export const ENV = config[environment]

export const isDevelopment = environment === 'development'
export const isProduction = environment === 'production'
export const isTest = environment === 'test'

// Feature flags
export const FEATURES = {
  SOCIAL_SHARING: true,
  PWA_INSTALL: true,
  ANALYTICS: ENV.ANALYTICS_ENABLED,
  OFFLINE_MODE: true,
  BOOKMARKS: true,
  LEADERBOARD: true
}