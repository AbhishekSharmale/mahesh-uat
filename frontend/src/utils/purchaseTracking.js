// Track purchased tests for users
import { validateLocalStorageData, rateLimiter } from './security'
import { analytics } from './analytics'

export const getPurchasedTests = (userId) => {
  if (!userId) return []
  
  const key = `purchased_tests_${userId}`
  const data = localStorage.getItem(key)
  return validateLocalStorageData(key, data) || []
}

export const purchaseTest = (userId, testId, price) => {
  if (!userId || !testId) return false
  
  // Rate limiting
  if (!rateLimiter.canAttempt(`purchase_${userId}`, 3, 60000)) {
    console.warn('Purchase rate limit exceeded')
    return false
  }
  
  // Validate inputs
  if (typeof price !== 'number' || price < 0) {
    console.error('Invalid price for purchase')
    return false
  }
  
  try {
    const purchased = getPurchasedTests(userId)
    const existingPurchase = purchased.find(p => p.testId === testId)
    
    if (existingPurchase) {
      analytics.trackPurchase(testId, price)
      return true
    }
    
    // Add new purchase with validation
    const newPurchase = {
      testId: String(testId),
      price: Number(price),
      purchasedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      userId: userId
    }
    
    purchased.push(newPurchase)
    localStorage.setItem(`purchased_tests_${userId}`, JSON.stringify(purchased))
    
    analytics.trackPurchase(testId, price)
    return true
  } catch (error) {
    console.error('Error purchasing test:', error)
    analytics.trackError(error, 'purchaseTest')
    return false
  }
}

export const hasAccessToTest = (userId, testId) => {
  if (!userId || !testId) return false
  
  try {
    const purchased = getPurchasedTests(userId)
    const purchase = purchased.find(p => p.testId === String(testId))
    
    if (!purchase) return false
    
    // Verify userId matches (prevent access with wrong user)
    if (purchase.userId && purchase.userId !== userId) {
      console.warn('User ID mismatch in purchase verification')
      return false
    }
    
    // Check if not expired
    const now = new Date()
    const expiryDate = new Date(purchase.expiresAt)
    
    return now < expiryDate
  } catch (error) {
    console.error('Error checking test access:', error)
    return false
  }
}

export const getPurchaseHistory = (userId) => {
  if (!userId) return []
  
  const purchased = getPurchasedTests(userId)
  return purchased.map(p => ({
    ...p,
    isExpired: new Date() > new Date(p.expiresAt)
  }))
}