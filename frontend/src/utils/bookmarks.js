import { validateLocalStorageData } from './security'
import { analytics } from './analytics'

export const getBookmarkedTests = (userId) => {
  if (!userId) return []
  
  const key = `bookmarked_tests_${userId}`
  const data = localStorage.getItem(key)
  return validateLocalStorageData(key, data) || []
}

export const toggleBookmark = (userId, testId, testTitle) => {
  if (!userId || !testId) return false
  
  try {
    const bookmarked = getBookmarkedTests(userId)
    const existingIndex = bookmarked.findIndex(b => b.testId === testId)
    
    if (existingIndex >= 0) {
      // Remove bookmark
      bookmarked.splice(existingIndex, 1)
      analytics.track('test_unbookmarked', { testId, testTitle })
    } else {
      // Add bookmark
      bookmarked.push({
        testId: String(testId),
        testTitle: testTitle || 'Unknown Test',
        bookmarkedAt: new Date().toISOString(),
        userId: userId
      })
      analytics.track('test_bookmarked', { testId, testTitle })
    }
    
    localStorage.setItem(`bookmarked_tests_${userId}`, JSON.stringify(bookmarked))
    return existingIndex < 0 // Return true if bookmarked, false if unbookmarked
  } catch (error) {
    console.error('Error toggling bookmark:', error)
    analytics.trackError(error, 'toggleBookmark')
    return false
  }
}

export const isBookmarked = (userId, testId) => {
  if (!userId || !testId) return false
  
  const bookmarked = getBookmarkedTests(userId)
  return bookmarked.some(b => b.testId === String(testId))
}