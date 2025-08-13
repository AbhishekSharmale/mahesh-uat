import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { Globe } from 'lucide-react'

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      title={language === 'en' ? 'Switch to Marathi' : 'Switch to English'}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {language === 'en' ? 'मराठी' : 'English'}
      </span>
    </button>
  )
}

export default LanguageToggle