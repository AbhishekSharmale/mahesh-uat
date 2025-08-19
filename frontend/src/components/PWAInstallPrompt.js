import React, { useState, useEffect } from 'react'
import { Download, X, Smartphone } from 'lucide-react'
import { analytics } from '../utils/analytics'

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Show prompt after 30 seconds if not dismissed
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa_install_dismissed')
        if (!dismissed) {
          setShowPrompt(true)
        }
      }, 30000)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    analytics.track('pwa_install_prompt', { outcome })
    
    if (outcome === 'accepted') {
      analytics.track('pwa_installed')
    }
    
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa_install_dismissed', 'true')
    analytics.track('pwa_install_dismissed')
  }

  if (!showPrompt || !deferredPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-xl shadow-lg z-50 animate-slide-up">
      <div className="flex items-start space-x-3">
        <div className="bg-blue-500 p-2 rounded-lg">
          <Smartphone className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-sm mb-1">Install Mission Police App</h4>
          <p className="text-xs text-blue-100 mb-3">
            Get quick access to tests and study materials. Works offline!
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleInstall}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center space-x-1"
            >
              <Download className="h-4 w-4" />
              <span>Install</span>
            </button>
            <button
              onClick={handleDismiss}
              className="text-blue-100 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PWAInstallPrompt