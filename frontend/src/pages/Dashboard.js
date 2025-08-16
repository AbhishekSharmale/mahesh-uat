import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../hooks/useLanguage'
import { supabase } from '../utils/supabase'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Trophy, User, LogOut, CreditCard, Clock, Award, Heart, Flame, Bell, X, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { demoTests } from '../utils/demoData'
import { getTranslation } from '../utils/i18n'
import { getUserProgress, getRecentTests, getUserStats, recordTestCompletion } from '../utils/progressTracking'
import WalletModal from '../components/WalletModal'

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [tests, setTests] = useState([])
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [favoriteTests, setFavoriteTests] = useState(new Set())
  const [showNotification, setShowNotification] = useState(true)

  const categories = [
    { id: 'all', name: 'All Tests' },
    { id: 'gk', name: 'General Knowledge' },
    { id: 'math', name: 'Mathematics' },
    { id: 'reasoning', name: 'Reasoning' },
    { id: 'marathi', name: 'Marathi' }
  ]

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' }
  ]



  const leaderboard = [
    { rank: 1, name: 'Rahul S.', score: 95, tests: 25 },
    { rank: 2, name: 'Priya P.', score: 92, tests: 22 },
    { rank: 3, name: 'Amit K.', score: 89, tests: 28 }
  ]

  const [categoryProgress, setCategoryProgress] = useState({})
  const [userStats, setUserStats] = useState({
    testsCompleted: 0,
    averageScore: 0,
    totalPoints: 0,
    currentStreak: 0
  })
  const [recentTestsData, setRecentTestsData] = useState([])
  const [showWalletModal, setShowWalletModal] = useState(false)

  useEffect(() => {
    fetchUserProfile()
    fetchTests()
    if (user) {
      fetchUserProgress()
      fetchUserStats()
      fetchRecentTestsData()
    }
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUserProgress = async () => {
    if (!user) return
    try {
      const progress = await getUserProgress(user.id)
      setCategoryProgress(progress)
    } catch (error) {
      console.error('Error fetching user progress:', error)
    }
  }

  const fetchUserStats = async () => {
    if (!user) return
    try {
      const stats = await getUserStats(user.id)
      setUserStats(stats)
    } catch (error) {
      console.error('Error fetching user stats:', error)
    }
  }

  const fetchRecentTestsData = async () => {
    if (!user) return
    try {
      const tests = await getRecentTests(user.id, 3)
      setRecentTestsData(tests)
    } catch (error) {
      console.error('Error fetching recent tests:', error)
    }
  }

  const fetchUserProfile = async () => {
    try {
      if (!supabase) {
        // Demo mode - start with zero balance
        // Get demo profile from localStorage or create new
        const demoProfile = JSON.parse(localStorage.getItem('demo_user') || '{}')
        setUserProfile({
          id: demoProfile.id || 'demo-user',
          name: demoProfile.name || 'Demo User',
          email: demoProfile.email || 'demo@test.com',
          wallet_balance: demoProfile.wallet_balance || 0,
          tests_taken: demoProfile.tests_taken || 0
        })
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
              tests_taken: 0,
              created_at: new Date().toISOString()
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
      // Check if user has enough balance
      if ((userProfile?.wallet_balance || 0) < price) {
        toast.error('Insufficient balance. Please add money to wallet.')
        setShowWalletModal(true)
        return
      }

      if (!supabase) {
        // Demo mode - simulate purchase
        navigate(`/test/${testId}`)
        toast.success('Test purchased successfully!')
        return
      }

      // Deduct balance and unlock test
      const { error } = await supabase
        .from('profiles')
        .update({ 
          wallet_balance: userProfile.wallet_balance - price,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error

      // Update local state
      setUserProfile(prev => ({
        ...prev,
        wallet_balance: prev.wallet_balance - price
      }))

      // Navigate to test
      navigate(`/test/${testId}`)
      toast.success('Test purchased successfully!')
    } catch (error) {
      toast.error('Purchase failed. Please try again.')
    }
  }

  const handleBalanceUpdate = (amount) => {
    setUserProfile(prev => {
      const updated = {
        ...prev,
        wallet_balance: (prev?.wallet_balance || 0) + amount
      }
      // Update localStorage for demo mode
      if (!supabase) {
        localStorage.setItem('demo_user', JSON.stringify(updated))
      }
      return updated
    })
  }

  // Expose handleTestCompletion globally for TestPage to use
  React.useEffect(() => {
    window.handleTestCompletion = async (testId, score, totalQuestions) => {
      try {
        const result = await recordTestCompletion(user.id, testId, score, totalQuestions)
        if (result.success) {
          // Refresh progress data
          await fetchUserProgress()
          await fetchUserStats()
          await fetchRecentTestsData()
          await fetchUserProfile()
          toast.success('Test completed! Progress updated.')
        }
      } catch (error) {
        console.error('Error recording test completion:', error)
      }
    }
    
    return () => {
      delete window.handleTestCompletion
    }
  }) // Remove dependencies to avoid re-creation



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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{getTranslation('dashboard', language)}</h1>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowWalletModal(true)}
                className="flex items-center space-x-2 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 px-3 py-2 rounded-lg transition-colors"
              >
                <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="font-medium text-gray-900 dark:text-white">₹{userProfile?.wallet_balance || 0}</span>
                <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
              </button>
              <button
                onClick={signOut}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Notification Banner */}
        {showNotification && (
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5" />
              <span className="font-medium">New tests added! Check out the latest GK and Reasoning tests.</span>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        {/* User Stats - Horizontal Scroll */}
        <div className="mb-6">
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            <div className="card min-w-[140px] text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-blue-200 dark:border-blue-700">
              <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">{userStats.testsCompleted}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Tests Taken</p>
            </div>
            <div className="card min-w-[140px] text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-green-200 dark:border-green-700">
              <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">₹{userProfile?.wallet_balance || 0}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Wallet Balance</p>
            </div>
            <div className="card min-w-[140px] text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border-purple-200 dark:border-purple-700">
              <User className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-900 dark:text-white">{user?.name?.split(' ')[0] || 'User'}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Welcome back!</p>
            </div>
            <div className="card min-w-[140px] text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 border-orange-200 dark:border-orange-700">
              <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">{userStats.currentStreak}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Day Streak</p>
            </div>
            <div className="card min-w-[140px] text-center bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900 dark:to-pink-800 border-pink-200 dark:border-pink-700">
              <Award className="h-6 w-6 text-pink-600 dark:text-pink-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">{userStats.totalPoints}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Reward Points</p>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 px-1">Your Progress</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(categoryProgress).map(([key, progress]) => (
              <div key={key} className="card bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize">{key}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{progress.completed}/{progress.total}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{width: `${progress.percentage}%`}}></div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">{progress.percentage}% Complete</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category & Difficulty Filters */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 px-1">Browse Tests</h3>
          <div className="space-y-3">
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-200 min-w-fit ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-lg scale-105 dark:bg-blue-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 hover:scale-102'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {difficulties.map(difficulty => (
                <button
                  key={difficulty.id}
                  onClick={() => setSelectedDifficulty(difficulty.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-xs whitespace-nowrap transition-all duration-200 min-w-fit ${
                    selectedDifficulty === difficulty.id
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  {difficulty.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid gap-4">
          {filteredTests.map(test => {
            const categoryColors = {
              'gk': 'from-blue-500 to-blue-600',
              'math': 'from-green-500 to-green-600', 
              'reasoning': 'from-purple-500 to-purple-600',
              'marathi': 'from-orange-500 to-orange-600'
            }
            return (
              <div key={test.id} className="card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-primary">
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
                    <div className="text-2xl font-bold text-primary dark:text-blue-400">₹{test.price}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">per test</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">10 Questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">10 Minutes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">Instant Results</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFavoriteTests(prev => {
                      const newFavorites = new Set(prev)
                      if (newFavorites.has(test.id)) {
                        newFavorites.delete(test.id)
                      } else {
                        newFavorites.add(test.id)
                      }
                      return newFavorites
                    })}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      favoriteTests.has(test.id) 
                        ? 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-400' 
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${favoriteTests.has(test.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleBuyTest(test.id, test.price)}
                    className="flex-1 bg-gradient-to-r from-primary to-blue-600 text-white py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    Buy & Take Test →
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Tests Available</h3>
            <p className="text-gray-600 dark:text-gray-400">No tests found in this category. Try selecting a different category.</p>
          </div>
        )}

        {/* Recent Tests & Leaderboard */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Recent Tests */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              Recent Tests
            </h3>
            <div className="space-y-3">
              {recentTestsData.length > 0 ? recentTestsData.map(test => (
                <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{test.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{test.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{test.score}/{test.total}</div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  <p className="text-sm">No tests completed yet</p>
                  <p className="text-xs">Start taking tests to see your progress!</p>
                </div>
              )}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
              Top Scorers
            </h3>
            <div className="space-y-3">
              {leaderboard.map(user => (
                <div key={user.rank} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      user.rank === 1 ? 'bg-yellow-500' : user.rank === 2 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {user.rank}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.tests} tests</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{user.score}%</div>
                    <div className="text-xs text-gray-500">Avg Score</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Wallet Modal */}
      <WalletModal 
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        user={user}
        onBalanceUpdate={handleBalanceUpdate}
      />
    </div>
  )
}

export default Dashboard