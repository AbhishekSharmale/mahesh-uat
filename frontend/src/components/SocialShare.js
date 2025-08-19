import React from 'react'
import { Share2, Facebook, Twitter, MessageCircle } from 'lucide-react'
import { analytics } from '../utils/analytics'

const SocialShare = ({ score, totalQuestions, testTitle }) => {
  const shareText = `I scored ${score}/${totalQuestions} on ${testTitle} in Mission Police app! 🎯`
  const shareUrl = window.location.origin

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'bg-sky-500 hover:bg-sky-600'
    }
  ]

  const handleShare = (platform, url) => {
    analytics.track('result_shared', { platform, score, totalQuestions, testTitle })
    window.open(url, '_blank', 'width=600,height=400')
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mission Police Test Result',
          text: shareText,
          url: shareUrl
        })
        analytics.track('result_shared', { platform: 'native', score, totalQuestions, testTitle })
      } catch (error) {
        console.log('Native share cancelled')
      }
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Share2 className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Share Your Result</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        {shareOptions.map((option) => (
          <button
            key={option.name}
            onClick={() => handleShare(option.name, option.url)}
            className={`${option.color} text-white p-3 rounded-lg flex flex-col items-center space-y-1 transition-colors`}
          >
            <option.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{option.name}</span>
          </button>
        ))}
      </div>

      {navigator.share && (
        <button
          onClick={handleNativeShare}
          className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Share2 className="h-4 w-4" />
          <span>More Options</span>
        </button>
      )}
    </div>
  )
}

export default SocialShare