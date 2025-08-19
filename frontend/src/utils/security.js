// Security utilities
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
}

export const validateLocalStorageData = (key, data) => {
  try {
    if (!data) return null
    const parsed = JSON.parse(data)
    
    // Validate structure based on key
    if (key.includes('purchased_tests_')) {
      return Array.isArray(parsed) ? parsed : []
    }
    if (key === 'demo_user') {
      return parsed && typeof parsed === 'object' ? parsed : null
    }
    return parsed
  } catch (error) {
    console.warn(`Invalid data in localStorage for key: ${key}`)
    localStorage.removeItem(key)
    return null
  }
}

export const rateLimiter = {
  attempts: new Map(),
  
  canAttempt(key, maxAttempts = 5, windowMs = 60000) {
    const now = Date.now()
    const attempts = this.attempts.get(key) || []
    
    // Clean old attempts
    const validAttempts = attempts.filter(time => now - time < windowMs)
    
    if (validAttempts.length >= maxAttempts) {
      return false
    }
    
    validAttempts.push(now)
    this.attempts.set(key, validAttempts)
    return true
  }
}