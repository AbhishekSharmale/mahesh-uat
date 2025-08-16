import { supabase } from './supabase'

// Get user progress for all categories
export const getUserProgress = async (userId) => {
  if (!supabase) {
    // Demo data
    return {
      gk: { completed: 8, total: 15, percentage: 53 },
      math: { completed: 5, total: 12, percentage: 42 },
      reasoning: { completed: 6, total: 10, percentage: 60 },
      marathi: { completed: 3, total: 8, percentage: 38 }
    }
  }

  try {
    // Get total tests per category
    const { data: allTests } = await supabase
      .from('tests')
      .select('category')
      .eq('published', true)

    // Get user's completed tests
    const { data: userResults } = await supabase
      .from('test_results')
      .select('test_id, tests(category)')
      .eq('user_id', userId)

    // Calculate progress per category
    const categories = ['gk', 'math', 'reasoning', 'marathi']
    const progress = {}

    categories.forEach(category => {
      const totalTests = allTests?.filter(test => test.category === category).length || 0
      const completedTests = userResults?.filter(result => result.tests?.category === category).length || 0
      const percentage = totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0

      progress[category] = {
        completed: completedTests,
        total: totalTests,
        percentage
      }
    })

    return progress
  } catch (error) {
    console.error('Error fetching user progress:', error)
    return {}
  }
}

// Get user's recent test results
export const getRecentTests = async (userId, limit = 5) => {
  if (!supabase) {
    return [
      { id: 1, title: 'GK Test 1', score: 8, total: 10, date: '2 days ago', category: 'gk' },
      { id: 2, title: 'Math Basic', score: 7, total: 10, date: '5 days ago', category: 'math' },
      { id: 3, title: 'Reasoning', score: 9, total: 10, date: '1 week ago', category: 'reasoning' }
    ]
  }

  try {
    const { data, error } = await supabase
      .from('test_results')
      .select(`
        id,
        score,
        total_questions,
        completed_at,
        tests (
          title,
          category
        )
      `)
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    return data?.map(result => ({
      id: result.id,
      title: result.tests?.title || 'Unknown Test',
      score: result.score,
      total: result.total_questions,
      date: formatDate(result.completed_at),
      category: result.tests?.category || 'unknown'
    })) || []
  } catch (error) {
    console.error('Error fetching recent tests:', error)
    return []
  }
}

// Get user statistics
export const getUserStats = async (userId) => {
  if (!supabase) {
    return {
      testsCompleted: 22,
      averageScore: 7.8,
      totalPoints: 1250,
      currentStreak: 7,
      bestStreak: 12,
      rank: 15
    }
  }

  try {
    // Get test results
    const { data: results } = await supabase
      .from('test_results')
      .select('score, total_questions, completed_at')
      .eq('user_id', userId)
      .order('completed_at', { ascending: true })

    if (!results || results.length === 0) {
      return {
        testsCompleted: 0,
        averageScore: 0,
        totalPoints: 0,
        currentStreak: 0,
        bestStreak: 0,
        rank: null
      }
    }

    const testsCompleted = results.length
    const totalScore = results.reduce((sum, result) => sum + result.score, 0)
    const totalPossible = results.reduce((sum, result) => sum + result.total_questions, 0)
    const averageScore = totalPossible > 0 ? (totalScore / totalPossible * 10) : 0

    // Calculate streaks (simplified - consecutive days with tests)
    const { currentStreak, bestStreak } = calculateStreaks(results)

    // Calculate total points (score * 10 per test)
    const totalPoints = totalScore * 10

    return {
      testsCompleted,
      averageScore: Math.round(averageScore * 10) / 10,
      totalPoints,
      currentStreak,
      bestStreak,
      rank: null // Would need leaderboard calculation
    }
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return {
      testsCompleted: 0,
      averageScore: 0,
      totalPoints: 0,
      currentStreak: 0,
      bestStreak: 0,
      rank: null
    }
  }
}

// Record test completion
export const recordTestCompletion = async (userId, testId, score, totalQuestions) => {
  if (!supabase) {
    console.log('Demo mode: Test completion recorded locally')
    return { success: true }
  }

  try {
    const { data, error } = await supabase
      .from('test_results')
      .insert([
        {
          user_id: userId,
          test_id: testId,
          score: score,
          total_questions: totalQuestions,
          completed_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) throw error

    // Update user profile stats
    await updateUserProfile(userId)

    return { success: true, data }
  } catch (error) {
    console.error('Error recording test completion:', error)
    return { success: false, error: error.message }
  }
}

// Update user profile with latest stats
const updateUserProfile = async (userId) => {
  try {
    const stats = await getUserStats(userId)
    
    const { error } = await supabase
      .from('profiles')
      .update({
        tests_taken: stats.testsCompleted,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (error) throw error
  } catch (error) {
    console.error('Error updating user profile:', error)
  }
}

// Helper functions
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
  return `${Math.ceil(diffDays / 30)} months ago`
}

const calculateStreaks = (results) => {
  if (!results || results.length === 0) return { currentStreak: 0, bestStreak: 0 }

  // Group results by date
  const dateGroups = {}
  results.forEach(result => {
    const date = new Date(result.completed_at).toDateString()
    if (!dateGroups[date]) dateGroups[date] = []
    dateGroups[date].push(result)
  })

  const dates = Object.keys(dateGroups).sort((a, b) => new Date(b) - new Date(a))
  
  let currentStreak = 0
  let bestStreak = 0
  let tempStreak = 0

  // Calculate current streak from today backwards
  let checkDate = new Date()
  
  for (let i = 0; i < 30; i++) { // Check last 30 days
    const dateStr = checkDate.toDateString()
    if (dateGroups[dateStr]) {
      if (i === 0 || currentStreak > 0) currentStreak++
      tempStreak++
    } else {
      if (i === 0) break // No test today, streak is 0
      if (currentStreak === 0) break // Gap found
    }
    checkDate.setDate(checkDate.getDate() - 1)
  }

  // Calculate best streak
  tempStreak = 0
  for (let i = 0; i < dates.length; i++) {
    const currentDate = new Date(dates[i])
    const nextDate = i < dates.length - 1 ? new Date(dates[i + 1]) : null
    
    tempStreak++
    
    if (!nextDate || (currentDate - nextDate) > 24 * 60 * 60 * 1000) {
      bestStreak = Math.max(bestStreak, tempStreak)
      tempStreak = 0
    }
  }
  bestStreak = Math.max(bestStreak, tempStreak)

  return { currentStreak, bestStreak }
}