import { useEffect } from 'react'

export const useAccessibility = () => {
  useEffect(() => {
    // Add keyboard navigation support
    const handleKeyDown = (e) => {
      // Skip to main content with Alt+M
      if (e.altKey && e.key === 'm') {
        const main = document.querySelector('main')
        if (main) {
          main.focus()
          main.scrollIntoView()
        }
      }
      
      // Focus management for modals
      if (e.key === 'Escape') {
        const modal = document.querySelector('[role="dialog"]')
        if (modal) {
          const closeButton = modal.querySelector('[aria-label="Close"]')
          if (closeButton) {
            closeButton.click()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Announce to screen readers
  const announce = (message) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  return { announce }
}