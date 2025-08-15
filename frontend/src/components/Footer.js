import React from 'react'
import { Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 mt-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
          <a href="mailto:support@maheshsharmale.in" className="hover:text-primary transition-colors duration-200">
            Contact Support
          </a>
          <span>•</span>
          <button className="hover:text-primary transition-colors duration-200">
            Privacy Policy
          </button>
        </div>
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-500">
          <span>Built by</span>
          <span className="font-medium text-primary dark:text-blue-400">
            Abhishek Sharmale
          </span>
          <span>with</span>
          <Heart 
            className="w-3 h-3 text-red-500 animate-pulse hover:scale-125 transition-transform duration-200" 
            fill="currentColor"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer