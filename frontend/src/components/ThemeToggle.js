import React from 'react'
import { useTheme } from '../hooks/useTheme'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <svg 
        className="w-5 h-5 transition-all duration-500 ease-in-out" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sun rays */}
        <g className={`transition-all duration-500 ${isDark ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
          <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </g>
        
        {/* Sun/Moon circle */}
        <circle 
          cx="12" 
          cy="12" 
          r="5" 
          fill="currentColor" 
          className={`transition-all duration-500 ${isDark ? 'transform translate-x-1 translate-y-1 scale-75' : 'transform translate-x-0 translate-y-0 scale-100'}`}
        />
        
        {/* Moon crescent */}
        <circle 
          cx="12" 
          cy="12" 
          r="5" 
          fill="transparent" 
          className={`transition-all duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}
        />
        <circle 
          cx="15" 
          cy="9" 
          r="4" 
          fill="white" 
          className={`transition-all duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}
        />
      </svg>
    </button>
  )
}

export default ThemeToggle