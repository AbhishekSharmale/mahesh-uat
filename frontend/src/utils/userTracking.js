import { supabase } from './supabase'

// Track user login
export const trackUserLogin = async (userId, email, loginMethod = 'google') => {
  const loginData = {
    user_id: userId,
    email: email,
    login_method: loginMethod,
    login_time: new Date().toISOString(),
    ip_address: null, // Will be set by server
    user_agent: navigator.userAgent
  }

  if (!supabase) {
    // Demo mode - store in localStorage
    const logins = JSON.parse(localStorage.getItem('demo_logins') || '[]')
    logins.push(loginData)
    localStorage.setItem('demo_logins', JSON.stringify(logins))
    console.log('Demo: Login tracked', loginData)
    return { success: true }
  }

  try {
    const { error } = await supabase
      .from('user_logins')
      .insert([loginData])
    
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error tracking login:', error)
    return { success: false, error }
  }
}

// Track test attempts
export const trackTestAttempt = async (userId, testId, testTitle, score, totalQuestions, timeSpent) => {
  const testData = {
    user_id: userId,
    test_id: testId,
    test_title: testTitle,
    score: score,
    total_questions: totalQuestions,
    time_spent_seconds: timeSpent,
    completed_at: new Date().toISOString(),
    percentage: Math.round((score / totalQuestions) * 100)
  }

  if (!supabase) {
    // Demo mode
    const tests = JSON.parse(localStorage.getItem('demo_test_attempts') || '[]')
    tests.push(testData)
    localStorage.setItem('demo_test_attempts', JSON.stringify(tests))
    console.log('Demo: Test attempt tracked', testData)
    return { success: true }
  }

  try {
    const { error } = await supabase
      .from('test_attempts')
      .insert([testData])
    
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error tracking test attempt:', error)
    return { success: false, error }
  }
}

// Track payments
export const trackPayment = async (userId, testId, amount, paymentMethod, status = 'completed') => {
  const paymentData = {
    user_id: userId,
    test_id: testId,
    amount: amount,
    payment_method: paymentMethod,
    status: status,
    payment_time: new Date().toISOString(),
    currency: 'INR'
  }

  if (!supabase) {
    // Demo mode
    const payments = JSON.parse(localStorage.getItem('demo_payments') || '[]')
    payments.push(paymentData)
    localStorage.setItem('demo_payments', JSON.stringify(payments))
    console.log('Demo: Payment tracked', paymentData)
    return { success: true }
  }

  try {
    const { error } = await supabase
      .from('payments')
      .insert([paymentData])
    
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error tracking payment:', error)
    return { success: false, error }
  }
}

// Get user analytics
export const getUserAnalytics = async (userId) => {
  if (!supabase) {
    // Demo mode - get from localStorage
    const logins = JSON.parse(localStorage.getItem('demo_logins') || '[]')
    const tests = JSON.parse(localStorage.getItem('demo_test_attempts') || '[]')
    const payments = JSON.parse(localStorage.getItem('demo_payments') || '[]')
    
    return {
      totalLogins: logins.filter(l => l.user_id === userId).length,
      totalTests: tests.filter(t => t.user_id === userId).length,
      totalPayments: payments.filter(p => p.user_id === userId).length,
      averageScore: tests.length > 0 ? Math.round(tests.reduce((sum, t) => sum + t.percentage, 0) / tests.length) : 0
    }
  }

  try {
    // Get login count
    const { count: loginCount } = await supabase
      .from('user_logins')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    // Get test attempts
    const { data: testAttempts } = await supabase
      .from('test_attempts')
      .select('score, total_questions')
      .eq('user_id', userId)

    // Get payment count
    const { count: paymentCount } = await supabase
      .from('payments')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'completed')

    const averageScore = testAttempts?.length > 0 
      ? Math.round(testAttempts.reduce((sum, t) => sum + (t.score / t.total_questions * 100), 0) / testAttempts.length)
      : 0

    return {
      totalLogins: loginCount || 0,
      totalTests: testAttempts?.length || 0,
      totalPayments: paymentCount || 0,
      averageScore
    }
  } catch (error) {
    console.error('Error getting user analytics:', error)
    return { totalLogins: 0, totalTests: 0, totalPayments: 0, averageScore: 0 }
  }
}