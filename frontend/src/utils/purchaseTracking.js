// Track purchased tests for users

export const getPurchasedTests = (userId) => {
  if (!userId) return []
  
  const purchased = localStorage.getItem(`purchased_tests_${userId}`)
  return purchased ? JSON.parse(purchased) : []
}

export const purchaseTest = (userId, testId, price) => {
  if (!userId || !testId) return false
  
  const purchased = getPurchasedTests(userId)
  const existingPurchase = purchased.find(p => p.testId === testId)
  
  if (existingPurchase) {
    // Already purchased
    return true
  }
  
  // Add new purchase
  const newPurchase = {
    testId: testId,
    price: price,
    purchasedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
  }
  
  purchased.push(newPurchase)
  localStorage.setItem(`purchased_tests_${userId}`, JSON.stringify(purchased))
  
  return true
}

export const hasAccessToTest = (userId, testId) => {
  if (!userId || !testId) return false
  
  const purchased = getPurchasedTests(userId)
  const purchase = purchased.find(p => p.testId === testId)
  
  if (!purchase) return false
  
  // Check if not expired
  const now = new Date()
  const expiryDate = new Date(purchase.expiresAt)
  
  return now < expiryDate
}

export const getPurchaseHistory = (userId) => {
  if (!userId) return []
  
  const purchased = getPurchasedTests(userId)
  return purchased.map(p => ({
    ...p,
    isExpired: new Date() > new Date(p.expiresAt)
  }))
}