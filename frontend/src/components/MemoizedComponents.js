import React from 'react'
import { Trophy, BookOpen, Clock } from 'lucide-react'

// Memoized test card component
export const TestCard = React.memo(({ test, onBuyTest, onBookmarkToggle, isBookmarked, hasAccess, language }) => {
  const categoryColors = {
    'gk': 'from-blue-500 to-blue-600',
    'math': 'from-green-500 to-green-600', 
    'reasoning': 'from-purple-500 to-purple-600',
    'marathi': 'from-orange-500 to-orange-600'
  }
  
  const isFreeTest = test.price === 0 || test.isFree

  return (
    <div className={`card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-primary relative ${
      isFreeTest 
        ? 'bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20 border-green-300 dark:border-green-600' 
        : ''
    }`}>
      {isFreeTest && (
        <div className="absolute -top-2 -left-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10 flex items-center space-x-1">
          <span>🎁</span>
          <span>FREE</span>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
            {language === 'mr' && test.titleMr ? test.titleMr : test.title}
          </h4>
          <span className={`bg-gradient-to-r ${categoryColors[test.category] || 'from-gray-500 to-gray-600'} text-white text-xs px-3 py-1 rounded-full font-medium`}>
            {test.category.toUpperCase()}
          </span>
        </div>
        <div className="text-right">
          {isFreeTest ? (
            <div>
              <div className="text-lg font-bold text-gray-400 line-through">₹20</div>
              <div className="text-2xl font-bold text-green-600">₹0</div>
              <div className="text-xs text-green-600 font-medium">100% FREE</div>
            </div>
          ) : (
            <div>
              <div className="text-2xl font-bold text-primary dark:text-blue-400">₹{test.price}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">per test</div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4 text-blue-500" />
          <span className="font-medium">50 Questions</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-green-500" />
          <span className="font-medium">60 Minutes</span>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">Instant Results</span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => onBookmarkToggle(test.id, test.title)}
          className={`p-3 rounded-xl transition-all duration-200 focus-visible ${
            isBookmarked 
              ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400' 
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
          }`}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <BookOpen className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
        <button
          onClick={() => onBuyTest(test.id, test.price)}
          className={`flex-1 py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus-visible ${
            isFreeTest
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
              : hasAccess
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
              : 'bg-gradient-to-r from-primary to-blue-600 text-white'
          }`}
        >
          {isFreeTest
            ? '🚀 Start FREE Test →'
            : hasAccess 
            ? 'Take Test →' 
            : 'Buy & Take Test →'
          }
        </button>
      </div>
    </div>
  )
})

// Memoized stats card
export const StatsCard = React.memo(({ icon: Icon, value, label, color, bgColor }) => (
  <div className={`card min-w-[140px] text-center ${bgColor}`}>
    <Icon className={`h-6 w-6 ${color} mx-auto mb-2`} />
    <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-xs text-gray-600 dark:text-gray-400">{label}</p>
  </div>
))

TestCard.displayName = 'TestCard'
StatsCard.displayName = 'StatsCard'