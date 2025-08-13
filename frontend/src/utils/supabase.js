import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Demo mode for testing
const isDemoMode = !supabaseUrl || supabaseUrl.includes('demo')

export const supabase = isDemoMode ? null : createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signInWithGoogle = async () => {
  if (!supabase) {
    // Demo mode - simulate login
    localStorage.setItem('demo_user', JSON.stringify({
      id: 'demo-user-123',
      email: 'demo@test.com',
      user_metadata: { full_name: 'Demo User' }
    }))
    window.location.href = '/dashboard'
    return { data: {}, error: null }
  }
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  })
  return { data, error }
}

export const signOut = async () => {
  if (!supabase) {
    localStorage.removeItem('demo_user')
    return { error: null }
  }
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  if (!supabase) {
    const demoUser = localStorage.getItem('demo_user')
    return demoUser ? JSON.parse(demoUser) : null
  }
  const { data: { user } } = await supabase.auth.getUser()
  return user
}