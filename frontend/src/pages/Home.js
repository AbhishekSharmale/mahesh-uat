import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../hooks/useLanguage'
import { signInWithGoogle } from '../utils/firebase'
import { Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import LanguageToggle from '../components/LanguageToggle'
import ThemeToggle from '../components/ThemeToggle'
import { getTranslation } from '../utils/i18n'

const Home = () => {
  const { user } = useAuth()
  const { language } = useLanguage()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      const { user, error } = await signInWithGoogle()
      if (error) throw error
      if (user) {
        toast.success(getTranslation('loginSuccess', language) || 'Login successful!')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error(`Login failed: ${error.message}`)
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-md mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">{getTranslation('appName', language)}</h1>
              </div>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <LanguageToggle />
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  {language === 'mr' ? 'डॅशबोर्ड' : 'Dashboard'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome Back Section */}
        <main className="max-w-md mx-auto px-6 py-8 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {language === 'mr' ? `स्वागत आहे, ${user.displayName || 'मित्रा'}! 🎉` : `Welcome back, ${user.displayName || 'Friend'}! 🎉`}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'mr' ? 'तुमची मोफत चाचणी तुमची वाट पाहत आहे!' : 'Your FREE test is waiting for you!'}
            </p>
          </div>

          {/* Free Test Highlight */}
          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 rounded-2xl p-6 border border-blue-100 dark:border-blue-800 shadow-lg">
            <div className="text-center space-y-4">
              <div className="text-5xl">🎁</div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'mr' ? 'तुमची मोफत चाचणी तयार आहे!' : 'Your FREE Test is Ready!'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'mr' ? '50 प्रश्न • तपशीलवार स्पष्टीकरण • तत्काळ परिणाम' : '50 Questions • Detailed Explanations • Instant Results'}
                </p>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                {language === 'mr' ? '🚀 चाचणी सुरू करा!' : '🚀 Start Test Now!'}
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center space-y-2">
              <div className="text-2xl">📚</div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{language === 'mr' ? 'मोफत चाचणी' : 'Free Test'}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{language === 'mr' ? 'आता उपलब्ध' : 'Available Now'}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center space-y-2">
              <div className="text-2xl">⚡</div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{language === 'mr' ? 'तत्काळ परिणाम' : 'Instant Results'}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{language === 'mr' ? 'तपशीलवार स्पष्टीकरण' : 'Detailed Analysis'}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center space-y-2">
              <div className="text-2xl">🌍</div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{language === 'mr' ? 'द्विभाषिक' : 'Bilingual'}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{language === 'mr' ? 'मराठी आणि इंग्रजी' : 'Marathi & English'}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center space-y-2">
              <div className="text-2xl">🏆</div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{language === 'mr' ? 'गुणवत्ता' : 'Quality'}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{language === 'mr' ? 'तज्ञांकडून तयार' : 'Expert Crafted'}</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">{getTranslation('appName', language)}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-4 space-y-4 pb-20 mobile-optimized">
        {/* Hero Section */}
        <div className="text-center space-y-3 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
            {language === 'mr' ? 'पोलीस भरती परीक्षा + मोफत नोट्स' : 'Police Bharti Tests + Free Notes'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed animate-fade-in">
            {language === 'mr' ? '₹10 मध्ये टेस्ट + मोफत अभ्यास सामग्री - संपूर्ण तयारी एकाच ठिकाणी' : '₹10 tests + Free study materials — Complete preparation in one place'}
          </p>
        </div>

        {/* Value Proposition */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 animate-gradient p-4 rounded-xl text-white text-center shadow-lg animate-slide-in-left hover:scale-105 transition-transform duration-300">
            <div className="text-2xl mb-2 animate-bounce-gentle">📝</div>
            <h3 className="font-bold text-sm">{language === 'mr' ? 'टेस्ट सीरीज' : 'Test Series'}</h3>
            <p className="text-xs text-blue-100 mt-1">{language === 'mr' ? 'फक्त ₹10' : 'Only ₹10'}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 animate-gradient p-4 rounded-xl text-white text-center shadow-lg animate-slide-in-right hover:scale-105 transition-transform duration-300">
            <div className="text-2xl mb-2 animate-bounce-gentle">📚</div>
            <h3 className="font-bold text-sm">{language === 'mr' ? 'मोफत नोट्स' : 'Free Notes'}</h3>
            <p className="text-xs text-green-100 mt-1">{language === 'mr' ? '100% मोफत' : '100% Free'}</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <h3 className="px-4 text-sm font-bold text-gray-900 dark:text-white">
              {language === 'mr' ? 'वैशिष्ट्ये' : 'What You Get'}
            </h3>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="text-lg mb-1">📝</div>
              <h4 className="font-medium text-gray-900 dark:text-white text-xs">{language === 'mr' ? 'प्रैक्टिस टेस्ट' : 'Practice Tests'}</h4>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="text-lg mb-1">📖</div>
              <h4 className="font-medium text-gray-900 dark:text-white text-xs">{language === 'mr' ? 'अभ्यास नोट्स' : 'Study Notes'}</h4>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="text-lg mb-1">⚡</div>
              <h4 className="font-medium text-gray-900 dark:text-white text-xs">{language === 'mr' ? 'त्वरित परिणाम' : 'Instant Results'}</h4>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="text-lg mb-1">📱</div>
              <h4 className="font-medium text-gray-900 dark:text-white text-xs">{language === 'mr' ? 'मोबाइल फ्रेंडली' : 'Mobile Friendly'}</h4>
            </div>
          </div>
        </div>

        {/* Free Test Offer Card - Mobile Optimized */}
        <div className="relative animate-pulse-glow">
          <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 animate-gradient rounded-2xl p-5 shadow-lg border border-blue-300/50">
            <div className="text-center space-y-3">
              <div className="text-4xl animate-float">🎁</div>
              <div className="space-y-1 animate-fade-in">
                <h3 className="text-xl font-bold text-white">
                  {language === 'mr' ? 'मोफत चाचणी!' : 'FREE Test!'}
                </h3>
                <p className="text-blue-100 text-xs">
                  {language === 'mr' ? 'नवीन वापरकर्त्यांसाठी विशेष ऑफर' : 'Special offer for new users'}
                </p>
              </div>
              <button
                onClick={handleGoogleSignIn}
                className="w-full bg-white text-blue-600 py-3 px-4 rounded-xl font-bold text-base shadow-lg mobile-optimized prevent-zoom active:bg-blue-50 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {language === 'mr' ? '🚀 टेस्ट + नोट्स मिळवा' : '🚀 Get Tests + Notes'}
              </button>
            </div>
          </div>
        </div>

        {/* Categories Section - Mobile Optimized */}
        <div className="space-y-3">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <h3 className="px-3 text-sm font-bold text-gray-900 dark:text-white">
              {language === 'mr' ? 'चाचणी विभाग' : 'Test Categories'}
            </h3>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 animate-gradient p-4 rounded-xl text-white text-center shadow-md mobile-optimized hover:scale-105 transition-transform duration-300 animate-slide-in-left">
              <div className="text-2xl mb-2 animate-bounce-gentle">📚</div>
              <h4 className="font-bold text-xs">{language === 'mr' ? 'सामान्य ज्ञान' : 'General Knowledge'}</h4>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 animate-gradient p-4 rounded-xl text-white text-center shadow-md mobile-optimized hover:scale-105 transition-transform duration-300 animate-slide-in-right">
              <div className="text-2xl mb-2 animate-bounce-gentle">🔢</div>
              <h4 className="font-bold text-xs">{language === 'mr' ? 'गणित' : 'Mathematics'}</h4>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 animate-gradient p-4 rounded-xl text-white text-center shadow-md mobile-optimized hover:scale-105 transition-transform duration-300 animate-slide-in-left">
              <div className="text-2xl mb-2 animate-bounce-gentle">🧠</div>
              <h4 className="font-bold text-xs">{language === 'mr' ? 'तर्कशुद्धता' : 'Reasoning'}</h4>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 animate-gradient p-4 rounded-xl text-white text-center shadow-md mobile-optimized hover:scale-105 transition-transform duration-300 animate-slide-in-right">
              <div className="text-2xl mb-2 animate-bounce-gentle">📝</div>
              <h4 className="font-bold text-xs">{language === 'mr' ? 'मराठी' : 'Marathi'}</h4>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="text-center py-4 px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          By Mahesh Sharmale
        </p>
      </footer>
    </div>
  )
}

export default Home