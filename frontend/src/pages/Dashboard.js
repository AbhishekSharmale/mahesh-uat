import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../hooks/useLanguage'
import { supabase } from '../utils/supabase'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Trophy, User, LogOut, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'
import { demoTests, demoProfile } from '../utils/demoData'
import { getTranslation } from '../utils/i18n'

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [tests, setTests] = useState([])
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Tests' },
    { id: 'gk', name: 'General Knowledge' },
    { id: 'math', name: 'Mathematics' },
    { id: 'reasoning', name: 'Reasoning' },
    { id: 'marathi', name: 'Marathi' }
  ]

  useEffect(() => {
    fetchUserProfile()
    fetchTests()
  }, [])

  const fetchUserProfile = async () => {
    try {
      if (!supabase) {
        // Demo mode
        setUserProfile(demoProfile)
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              email: user.email,
              name: user.user_metadata.full_name || user.email,
              wallet_balance: 0,
              tests_taken: 0
            }
          ])
          .select()
          .single()

        if (createError) throw createError
        setUserProfile(newProfile)
      } else if (error) {
        throw error
      } else {
        setUserProfile(data)
      }
    } catch (error) {
      toast.error('Failed to load profile')
    }
  }

  const fetchTests = async () => {
    try {
      if (!supabase) {
        // Demo mode
        setTests(demoTests)
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTests(data || [])
    } catch (error) {
      toast.error('Failed to load tests')
    } finally {
      setLoading(false)
    }
  }

  const handleBuyTest = async (testId, price) => {
    try {
      if (!supabase) {
        // Demo mode - simulate purchase
        if (userProfile.wallet_balance < price) {
          toast.error('Insufficient balance. Please add money to wallet.')
          return
        }
        navigate(`/test/${testId}`)
        toast.success('Test purchased successfully!')
        return
      }

      // Check if user has enough balance or implement Razorpay
      if (userProfile.wallet_balance < price) {
        toast.error('Insufficient balance. Please add money to wallet.')
        return
      }

      // Deduct balance and unlock test
      const { error } = await supabase
        .from('profiles')
        .update({ wallet_balance: userProfile.wallet_balance - price })
        .eq('id', user.id)

      if (error) throw error

      // Navigate to test
      navigate(`/test/${testId}`)
      toast.success('Test purchased successfully!')
    } catch (error) {
      toast.error('Purchase failed. Please try again.')
    }
  }

  const filteredTests = selectedCategory === 'all' 
    ? tests 
    : tests.filter(test => test.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">{getTranslation('dashboard', language)}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-gray-600" />
                <span className="font-medium">₹{userProfile?.wallet_balance || 0}</span>
              </div>
              <button
                onClick={signOut}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* User Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="card text-center">
            <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{userProfile?.tests_taken || 0}</p>
            <p className="text-sm text-gray-600">Tests Taken</p>
          </div>
          <div className="card text-center">
            <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">₹{userProfile?.wallet_balance || 0}</p>
            <p className="text-sm text-gray-600">Wallet Balance</p>
          </div>
          <div className="card text-center md:col-span-1 col-span-2">
            <User className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-medium text-gray-900">{userProfile?.name}</p>
            <p className="text-sm text-gray-600">Welcome back!</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse Tests</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredTests.map(test => (
            <div key={test.id} className="card">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-900">
                  {language === 'mr' && test.titleMr ? test.titleMr : test.title}
                </h4>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {test.category}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>10 Questions</span>
                  <span>10 Minutes</span>
                </div>
                <span className="text-lg font-bold text-primary">₹{test.price}</span>
              </div>
              <button
                onClick={() => handleBuyTest(test.id, test.price)}
                className="btn-primary w-full"
              >
                Buy & Take Test
              </button>
            </div>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No tests available in this category.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard