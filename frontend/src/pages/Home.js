import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../hooks/useLanguage'
import { signInWithGoogle } from '../utils/firebase'
import { BookOpen, Shield, Trophy, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import LanguageToggle from '../components/LanguageToggle'
import ThemeToggle from '../components/ThemeToggle'
import { getTranslation } from '../utils/i18n'

const Home = () => {
  const { user } = useAuth()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [showGiftDetails, setShowGiftDetails] = React.useState(false)

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-7 w-7 text-primary" />
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">{getTranslation('appName', language)}</h1>
              </div>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <LanguageToggle />
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200"
                >
                  {language === 'mr' ? 'डॅशबोर्ड' : 'Dashboard'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome Back Section */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'mr' ? `स्वागत आहे, ${user.displayName || 'मित्रा'}! 🎉` : `Welcome back, ${user.displayName || 'Friend'}! 🎉`}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {language === 'mr' ? 'तुमची मोफत चाचणी तुमची वाट पाहत आहे!' : 'Your FREE test is waiting for you!'}
            </p>
          </div>

          {/* Free Test Highlight for Logged Users */}
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-1 shadow-xl mb-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'mr' ? 'तुमची मोफत चाचणी तयार आहे!' : 'Your FREE Test is Ready!'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {language === 'mr' ? '50 प्रश्न • तपशीलवार स्पष्टीकरण • तत्काळ परिणाम' : '50 Questions • Detailed Explanations • Instant Results'}
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {language === 'mr' ? '🚀 चाचणी सुरू करा!' : '🚀 Start Test Now!'}
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-2">📚</div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">{language === 'mr' ? 'मोफत चाचणी' : 'Free Test'}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{language === 'mr' ? 'आता उपलब्ध' : 'Available Now'}</p>
            </div>
            <div className="card text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">{language === 'mr' ? 'तत्काळ परिणाम' : 'Instant Results'}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{language === 'mr' ? 'तपशीलवार स्पष्टीकरण' : 'Detailed Analysis'}</p>
            </div>
            <div className="card text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-2">🌍</div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">{language === 'mr' ? 'द्विभाषिक' : 'Bilingual'}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{language === 'mr' ? 'मराठी आणि इंग्रजी' : 'Marathi & English'}</p>
            </div>
            <div className="card text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">{language === 'mr' ? 'गुणवत्ता' : 'Quality'}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{language === 'mr' ? 'तज्ञांकडून तयार' : 'Expert Crafted'}</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-7 w-7 text-primary" />
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">{getTranslation('appName', language)}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <LanguageToggle />
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="hidden sm:inline">Login</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
            {getTranslation('heroTitle', language)}
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 px-4 leading-relaxed">
            Prepare for Police Bharti exams with just ₹10 per test — instant results, expert questions.
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="w-full sm:w-auto btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {getTranslation('startPreparing', language)}
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="card text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <BookOpen className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">{getTranslation('questionsCount', language)}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs">{getTranslation('focusedTests', language)}</p>
          </div>
          <div className="card text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Trophy className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">{getTranslation('instantResults', language)}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs">{getTranslation('detailedSolutions', language)}</p>
          </div>
          <div className="card text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Users className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">{getTranslation('expertContent', language)}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs">{getTranslation('examSpecialists', language)}</p>
          </div>
          <div className="card text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">{getTranslation('affordablePrice', language)}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs">{getTranslation('qualityPreparation', language)}</p>
          </div>
        </div>

        {/* Free Test Promotion - Gift Box */}
        <div className="relative mb-8 mx-4 sm:mx-0">
          <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl p-1 shadow-2xl">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 relative overflow-hidden">
              {/* Floating Sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-6 left-6 text-blue-400 text-lg animate-pulse">✨</div>
                <div className="absolute top-12 right-8 text-blue-400 text-sm animate-pulse delay-300">⭐</div>
                <div className="absolute bottom-8 left-12 text-blue-400 text-base animate-pulse delay-700">💫</div>
                <div className="absolute bottom-6 right-6 text-blue-400 text-lg animate-pulse delay-1000">✨</div>
              </div>
              
              {/* Limited Time Badge */}
              <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-xl z-30 border border-white">
                {language === 'mr' ? 'मर्यादित काळ!' : 'LIMITED TIME!'}
              </div>
              
              <div className="relative text-center">
                {/* Gift Box Animation */}
                <div className="mb-6">
                  <div className="relative inline-block cursor-pointer transform transition-all duration-500 hover:scale-110" onClick={() => setShowGiftDetails(!showGiftDetails)}>
                    {!showGiftDetails ? (
                      <div className="relative">
                        {/* Gift Box */}
                        <div className="text-8xl animate-bounce">
                          🎁
                        </div>
                        {/* Tap to Open Text */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
                            {language === 'mr' ? '👆 आपली मोफत चाचणी उघडा!' : '👆 Tap to open your free test!'}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="animate-fadeIn">
                        {/* Opened Gift - Explosion Effect */}
                        <div className="relative">
                          <div className="text-6xl mb-4">🎉</div>
                          <div className="absolute -top-2 -left-2 text-2xl animate-ping">✨</div>
                          <div className="absolute -top-2 -right-2 text-2xl animate-ping delay-200">⭐</div>
                          <div className="absolute -bottom-2 -left-2 text-2xl animate-ping delay-400">💫</div>
                          <div className="absolute -bottom-2 -right-2 text-2xl animate-ping delay-600">✨</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Offer Details - Expandable */}
                <div className={`transition-all duration-700 ease-in-out ${showGiftDetails ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-6 mb-6 border-2 border-blue-200 dark:border-blue-700">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {language === 'mr' ? '🎊 आपले मोफत भेट उघडले!' : '🎊 Your Free Gift Unlocked!'}
                    </h3>
                    
                    {/* Test Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-blue-200">
                        <div className="text-3xl mb-2">📚</div>
                        <div className="font-bold text-blue-600">{language === 'mr' ? '50 प्रश्न' : '50 Questions'}</div>
                        <div className="text-sm text-gray-600">{language === 'mr' ? 'सामान्य ज्ञान' : 'General Knowledge'}</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-blue-200">
                        <div className="text-3xl mb-2">🔢</div>
                        <div className="font-bold text-blue-600">{language === 'mr' ? 'गणित' : 'Mathematics'}</div>
                        <div className="text-sm text-gray-600">{language === 'mr' ? 'मूलभूत गणित' : 'Basic Math'}</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-blue-200">
                        <div className="text-3xl mb-2">🧠</div>
                        <div className="font-bold text-blue-600">{language === 'mr' ? 'तर्कशुद्धता' : 'Reasoning'}</div>
                        <div className="text-sm text-gray-600">{language === 'mr' ? 'लॉजिकल थिंकिंग' : 'Logical Thinking'}</div>
                      </div>
                    </div>
                    
                    {/* Value Highlight */}
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-gray-400 line-through mr-3">₹10</span>
                      <span className="text-4xl font-black text-green-600">₹0</span>
                      <span className="ml-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold animate-pulse">100% FREE</span>
                    </div>
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className={`transition-all duration-500 ${showGiftDetails ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-70'}`}>
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl transform hover:shadow-3xl mb-4 border-2 border-blue-400"
                  >
                    {language === 'mr' ? '🚀 आता मोफत सुरू करा!' : '🚀 Start FREE Test Now!'}
                  </button>
                </div>
                
                {/* Urgency Text */}
                <p className="text-sm text-red-600 dark:text-red-400 font-semibold animate-pulse">
                  {language === 'mr' ? '⏰ फक्त नवीन वापरकर्त्यांसाठी - आजच घ्या!' : '⏰ New Users Only - Claim Today!'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="card mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">{getTranslation('testCategories', language)}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-4 rounded-xl text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
              <div className="text-2xl mb-2">📚</div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{getTranslation('generalKnowledge', language)}</h4>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-4 rounded-xl text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
              <div className="text-2xl mb-2">🔢</div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{getTranslation('mathematics', language)}</h4>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-4 rounded-xl text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
              <div className="text-2xl mb-2">🧠</div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{getTranslation('reasoning', language)}</h4>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 p-4 rounded-xl text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
              <div className="text-2xl mb-2">📝</div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{getTranslation('marathi', language)}</h4>
            </div>
          </div>
        </div>

        {/* Sticky CTA for Mobile */}
        <div className="fixed bottom-20 left-4 right-4 sm:hidden z-40">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-0.5 rounded-full shadow-2xl">
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-white text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 py-3 rounded-full font-bold text-base hover:bg-gray-50 active:scale-95 transition-all duration-200"
            >
              🎁 {language === 'mr' ? 'मोफत चाचणी सुरू करा!' : 'Claim FREE Test!'} 🎁
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home