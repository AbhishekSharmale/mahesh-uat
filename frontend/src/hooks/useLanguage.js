import React, { createContext, useContext, useState, useEffect } from 'react'
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
    return localStorage.getItem('app_language') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('app_language', language)
    document.documentElement.lang = language
  }, [language])

  const t = (key) => getTranslation(key, language)

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