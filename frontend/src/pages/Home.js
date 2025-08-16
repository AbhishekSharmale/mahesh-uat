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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
            {getTranslation('heroTitle', language)}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {language === 'mr' ? 'पोलीस भरती परीक्षेची तयारी फक्त ₹10 मध्ये - तत्काळ परिणाम, तज्ञ प्रश्न' : 'Prepare for Police Bharti exams with just ₹10 per test — instant results, expert questions'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center space-y-2">
            <div className="text-2xl">📚</div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{language === 'mr' ? '50 प्रश्न' : '50 Questions'}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs">{language === 'mr' ? 'केंद्रित चाचण्या' : 'Focused Tests'}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center space-y-2">
            <div className="text-2xl">⚡</div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{language === 'mr' ? 'त्वरित परिणाम' : 'Instant Results'}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs">{language === 'mr' ? 'तपशीलवार उत्तरे' : 'Detailed Solutions'}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center space-y-2">
            <div className="text-2xl">👨🏫</div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{language === 'mr' ? 'तज्ञ सामग्री' : 'Expert Content'}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs">{language === 'mr' ? 'परीक्षा तज्ञ' : 'Exam Specialists'}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center space-y-2">
            <div className="text-2xl">💰</div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{language === 'mr' ? 'फक्त ₹10' : 'Only ₹10'}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs">{language === 'mr' ? 'परवळणारी किंमत' : 'Affordable Price'}</p>
          </div>
        </div>

        {/* Free Test Offer Card */}
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 rounded-2xl p-6 border border-blue-100 dark:border-blue-800 shadow-lg">
          <div className="text-center space-y-4">
            <div className="text-5xl">🎁</div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {language === 'mr' ? 'मोफत चाचणी!' : 'FREE Test!'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'mr' ? 'नवीन वापरकर्त्यांसाठी विशेष ऑफर' : 'Special offer for new users'}
              </p>
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              {language === 'mr' ? '🚀 मोफत सुरुवात करा' : '🚀 Start Free Test'}
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
            {language === 'mr' ? 'चाचणी विभाग' : 'Test Categories'}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white text-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="text-2xl mb-2">📚</div>
              <h4 className="font-semibold text-sm">{language === 'mr' ? 'सामान्य ज्ञान' : 'General Knowledge'}</h4>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl text-white text-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="text-2xl mb-2">🔢</div>
              <h4 className="font-semibold text-sm">{language === 'mr' ? 'गणित' : 'Mathematics'}</h4>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl text-white text-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="text-2xl mb-2">🧠</div>
              <h4 className="font-semibold text-sm">{language === 'mr' ? 'तर्कशुद्धता' : 'Reasoning'}</h4>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl text-white text-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="text-2xl mb-2">📝</div>
              <h4 className="font-semibold text-sm">{language === 'mr' ? 'मराठी' : 'Marathi'}</h4>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Contact Support</span>
              <span>•</span>
              <span>Privacy Policy</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Built by Abhishek Sharmale 🚀 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home