import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../hooks/useLanguage'
import { signInWithGoogle } from '../utils/firebase'
import { Shield, BookOpen, Calculator, Brain, MessageCircle, Youtube, Instagram, Send, Gift, Rocket } from 'lucide-react'
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
    <div className="mobile-container min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-animated prevent-scroll">
      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="triangle"></div>
        <div className="triangle"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'mr' ? 'मिशन पोलिस' : 'Mission Police'}
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {language === 'mr' ? 'तुमच्या तयारीसाठी सर्वोत्तम साथी' : 'Your best companion for preparation'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-8 animate-slide-up">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              {language === 'mr' ? 'पोलीस भरती परीक्षा + मोफत नोट्स' : 'Police Bharti Exam + Free Notes'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === 'mr' ? 'संपूर्ण तयारी एकाच ठिकाणी - टेस्ट सीरीज आणि अभ्यास सामग्री' : 'Complete preparation in one place - Test series and study materials'}
            </p>
          </div>
          
          {/* Hero Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-white shadow-xl hover:scale-105 transition-transform duration-300 animate-slide-in-left">
              <div className="text-4xl mb-4 animate-bounce-gentle">📝</div>
              <h3 className="text-2xl font-bold mb-2">{language === 'mr' ? 'टेस्ट सीरीज' : 'Test Series'}</h3>
              <p className="text-blue-100 mb-4">{language === 'mr' ? '50 प्रश्न प्रति टेस्ट' : '50 questions per test'}</p>
              <div className="text-3xl font-bold">{language === 'mr' ? 'फक्त ₹10' : 'Only ₹10'}</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl text-white shadow-xl hover:scale-105 transition-transform duration-300 animate-slide-in-right">
              <div className="text-4xl mb-4 animate-bounce-gentle">📚</div>
              <h3 className="text-2xl font-bold mb-2">{language === 'mr' ? 'मोफत नोट्स' : 'Free Notes'}</h3>
              <p className="text-green-100 mb-4">{language === 'mr' ? 'सर्व विषयांची PDF' : 'PDF for all subjects'}</p>
              <div className="text-3xl font-bold">{language === 'mr' ? '100% मोफत' : '100% Free'}</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            {language === 'mr' ? 'वैशिष्ट्ये' : 'Features'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center hover:scale-105 transform transition-transform">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{language === 'mr' ? 'प्रॅक्टिस टेस्ट' : 'Practice Tests'}</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center hover:scale-105 transform transition-transform">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{language === 'mr' ? 'अध्ययन नोट्स' : 'Study Notes'}</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center hover:scale-105 transform transition-transform">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">⚡</div>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{language === 'mr' ? 'त्वरित परिणाम' : 'Instant Results'}</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center hover:scale-105 transform transition-transform">
              <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">📱</div>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{language === 'mr' ? 'मोबाईल फ्रेंडली' : 'Mobile Friendly'}</h3>
            </div>
          </div>
        </section>

        {/* Special Offer Banner */}
        <section className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl p-6 text-white text-center shadow-xl animate-pulse-glow">
          <div className="flex items-center justify-center space-x-4">
            <Gift className="h-8 w-8 animate-bounce-gentle" />
            <div>
              <h3 className="text-xl font-bold">
                {language === 'mr' ? 'मोफत चाचणी – नवीन वापरकर्त्यांसाठी विशेष ऑफर' : 'Free Test – Special offer for new users'}
              </h3>
              <p className="text-orange-100">
                {language === 'mr' ? 'Test + Notes मिळवा' : 'Get Test + Notes'}
              </p>
            </div>
            <Rocket className="h-8 w-8 animate-float" />
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="mt-4 bg-white text-orange-500 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            {language === 'mr' ? '🚀 आता सुरुवात करा' : '🚀 Start Now'}
          </button>
        </section>

        {/* Subjects Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            {language === 'mr' ? 'चाचणी विभाग' : 'Test Categories'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white text-center shadow-lg hover:scale-105 transition-transform duration-300">
              <BookOpen className="h-12 w-12 mx-auto mb-4" />
              <h3 className="font-bold">{language === 'mr' ? 'सामान्य ज्ञान' : 'General Knowledge'}</h3>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white text-center shadow-lg hover:scale-105 transition-transform duration-300">
              <Calculator className="h-12 w-12 mx-auto mb-4" />
              <h3 className="font-bold">{language === 'mr' ? 'गणित' : 'Mathematics'}</h3>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white text-center shadow-lg hover:scale-105 transition-transform duration-300">
              <Brain className="h-12 w-12 mx-auto mb-4" />
              <h3 className="font-bold">{language === 'mr' ? 'तर्कशक्ती' : 'Reasoning'}</h3>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-2xl text-white text-center shadow-lg hover:scale-105 transition-transform duration-300">
              <MessageCircle className="h-12 w-12 mx-auto mb-4" />
              <h3 className="font-bold">{language === 'mr' ? 'मराठी' : 'Marathi'}</h3>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
          <div className="space-y-2">
            <p className="text-lg font-semibold">Mahesh Sharmale</p>
            <p className="text-gray-400">© 2025 मिशन पोलिस. All rights reserved.</p>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="https://www.youtube.com/@MaheshSharmale" target="_blank" rel="noopener noreferrer" className="bg-red-600 p-3 rounded-full hover:bg-red-700 transition-colors hover:scale-110 transform">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/mahesh_sharmale_sir_gk?igsh=MXF3amlmY2tiNjBqMQ==" target="_blank" rel="noopener noreferrer" className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition-colors hover:scale-110 transform">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://t.me/CA_Maheshsharmale" target="_blank" rel="noopener noreferrer" className="bg-blue-500 p-3 rounded-full hover:bg-blue-600 transition-colors hover:scale-110 transform">
              <Send className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home