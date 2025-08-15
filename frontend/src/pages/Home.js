import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../hooks/useLanguage'
import { signInWithGoogle } from '../utils/firebase'
import { BookOpen, Shield, Trophy, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import LanguageToggle from '../components/LanguageToggle'
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
      toast.error(getTranslation('loginFailed', language))
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold text-gray-900">{getTranslation('appName', language)}</h1>
            </div>
            <div className="flex items-center space-x-3">
              <LanguageToggle />
              <button
                onClick={handleGoogleSignIn}
                className="btn-primary"
              >
                {getTranslation('loginWithGoogle', language)}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {getTranslation('heroTitle', language)}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {getTranslation('heroSubtitle', language)}
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="btn-primary text-xl px-8 py-4"
          >
            {getTranslation('startPreparing', language)}
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">{getTranslation('questionsCount', language)}</h3>
            <p className="text-gray-600 text-sm">{getTranslation('focusedTests', language)}</p>
          </div>
          <div className="card text-center">
            <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">{getTranslation('instantResults', language)}</h3>
            <p className="text-gray-600 text-sm">{getTranslation('detailedSolutions', language)}</p>
          </div>
          <div className="card text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">{getTranslation('expertContent', language)}</h3>
            <p className="text-gray-600 text-sm">{getTranslation('examSpecialists', language)}</p>
          </div>
          <div className="card text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">{getTranslation('affordablePrice', language)}</h3>
            <p className="text-gray-600 text-sm">{getTranslation('qualityPreparation', language)}</p>
          </div>
        </div>

        {/* Categories */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{getTranslation('testCategories', language)}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h4 className="font-medium text-gray-900">{getTranslation('generalKnowledge', language)}</h4>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h4 className="font-medium text-gray-900">{getTranslation('mathematics', language)}</h4>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h4 className="font-medium text-gray-900">{getTranslation('reasoning', language)}</h4>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <h4 className="font-medium text-gray-900">{getTranslation('marathi', language)}</h4>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home