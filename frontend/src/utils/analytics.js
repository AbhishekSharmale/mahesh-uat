// Analytics and tracking utilities
class Analytics {
  constructor() {
    this.events = []
    this.sessionStart = Date.now()
  }

  track(event, properties = {}) {
    const eventData = {
      event,
      properties: {
        ...properties,
        timestamp: Date.now(),
        sessionId: this.getSessionId(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    }
    
    this.events.push(eventData)
    console.log('Analytics:', eventData)
    
    // Store in localStorage for later sync
    this.storeEvent(eventData)
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('analytics_session', sessionId)
    }
    return sessionId
  }

  storeEvent(event) {
    const stored = JSON.parse(localStorage.getItem('analytics_events') || '[]')
    stored.push(event)
    
    // Keep only last 100 events
    if (stored.length > 100) {
      stored.splice(0, stored.length - 100)
    }
    
    localStorage.setItem('analytics_events', JSON.stringify(stored))
  }

  // Track specific events
  trackTestStart(testId, testTitle) {
    this.track('test_started', { testId, testTitle })
  }

  trackTestComplete(testId, score, totalQuestions, timeSpent) {
    this.track('test_completed', { testId, score, totalQuestions, timeSpent })
  }

  trackPurchase(testId, price) {
    this.track('test_purchased', { testId, price })
  }

  trackPageView(page) {
    this.track('page_view', { page })
  }

  trackError(error, context) {
    this.track('error', { error: error.message, stack: error.stack, context })
  }
}

export const analytics = new Analytics()

// Performance monitoring
export const performanceMonitor = {
  measurePageLoad() {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0]
      if (navigation) {
        analytics.track('page_performance', {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0
        })
      }
    }
  },

  measureComponentRender(componentName, renderTime) {
    analytics.track('component_performance', { componentName, renderTime })
  }
}