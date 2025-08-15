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
    return null
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
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-primary text-white py-3 rounded-full font-bold text-base shadow-lg border border-blue-700 hover:bg-blue-700 active:bg-blue-800 active:scale-95 transition-all duration-200"
          >
            Start Now – ₹10 Only!
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home