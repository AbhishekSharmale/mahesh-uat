import React from 'react'
import { Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 mt-8 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
          <a href="mailto:support@maheshsharmale.in" className="hover:text-primary transition-colors duration-200">
            Contact Support
          </a>
          <span>•</span>
          <button className="hover:text-primary transition-colors duration-200">
            Privacy Policy
          </button>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          <span>Built by </span>
          <span className="font-medium text-primary dark:text-blue-400">
            Abhishek Sharmale
          </span>
          <span> | 🚀 2025</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer