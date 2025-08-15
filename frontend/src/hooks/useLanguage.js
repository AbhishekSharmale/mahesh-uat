import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getTranslation } from '../utils/i18n'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('app_language') || 'en'
    } catch (error) {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('app_language', language)
    } catch (error) {
      console.warn('Failed to save language preference:', error)
    }
    document.documentElement.lang = language
  }, [language])

  const t = useCallback((key) => getTranslation(key, language), [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'mr' : 'en')
  }

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}