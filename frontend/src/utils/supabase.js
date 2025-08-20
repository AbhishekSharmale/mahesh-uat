import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Check if Supabase credentials are available
const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const isDemoMode = !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_') || !isValidUrl(supabaseUrl)

// Create Supabase client with custom auth
let supabaseClient = null
if (!isDemoMode) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    }
  })
}

export const supabase = supabaseClient

// Function to set Firebase token for Supabase requests
export const setFirebaseToken = async (firebaseUser) => {
  if (!supabase || !firebaseUser) return
  
  try {
    const token = await firebaseUser.getIdToken()
    supabase.rest.headers['Authorization'] = `Bearer ${token}`
    console.log('Firebase token set for Supabase requests')
  } catch (error) {
    console.error('Error setting Firebase token:', error)
  }
}

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
  
  // Use Firebase auth instead of Supabase auth
  console.log('Use Firebase signInWithGoogle from firebase.js instead')
  return { data: {}, error: null }
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