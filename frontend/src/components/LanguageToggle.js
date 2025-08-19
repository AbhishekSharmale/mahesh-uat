import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { Globe } from 'lucide-react'

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center px-2 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      title={language === 'en' ? 'Switch to Marathi' : 'Switch to English'}
    >
      <span className="text-sm font-medium">
        {language === 'en' ? 'म' : 'E'}
      </span>
    </button>
  )
}

export default LanguageToggle