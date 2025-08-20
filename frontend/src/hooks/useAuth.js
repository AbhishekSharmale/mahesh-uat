import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { auth } from '../utils/firebase'
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth'
import { trackUserLogin } from '../utils/userTracking'
import { migrateExistingUser } from '../utils/migrateExistingUsers'
import { setFirebaseToken } from '../utils/supabase'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  console.log('AuthProvider rendering')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for redirect result first
    if (auth) {
      getRedirectResult(auth).then((result) => {
        if (result?.user) {
          setUser({
            id: result.user.uid,
            email: result.user.email,
            name: result.user.displayName,
            avatar: result.user.photoURL
          })
        }
      }).catch(console.error)
    }
    
    if (!auth) {
      setLoading(false)
      return
    }
    
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Clear logout flag when user logs in
        sessionStorage.removeItem('user_logged_out')
        const userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          avatar: firebaseUser.photoURL
        }
        setUser(userData)
        
        // Set Firebase token for Supabase
        setFirebaseToken(firebaseUser)
        
        // Migrate existing user if needed
        migrateExistingUser(userData)
        
        // Track login
        trackUserLogin(firebaseUser.uid, firebaseUser.email, 'google')
      } else {
        // Check if user was logged out
        const isLoggedOut = sessionStorage.getItem('user_logged_out')
        if (isLoggedOut) {
          setUser(null)
          return
        }
        
        // Fallback to demo mode or Supabase
        if (!supabase) {
          const demoUser = localStorage.getItem('demo_user')
          if (demoUser) {
            try {
              setUser(JSON.parse(demoUser))
            } catch (error) {
              localStorage.removeItem('demo_user')
              setUser(null)
            }
          } else {
            setUser(null)
          }
        } else {
          supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
          }).catch((error) => {
            console.error('Auth session error:', error)
            setUser(null)
          })
        }
      }
      setLoading(false)
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const value = {
    user,
    loading,
    signOut: () => {
      // Set logout flag immediately
      sessionStorage.setItem('user_logged_out', 'true')
      
      // Clear user state immediately
      setUser(null)
      
      // Clear all user data immediately
      localStorage.removeItem('demo_user')
      localStorage.removeItem('user_purchases')
      localStorage.removeItem('user_progress')
      
      // Clear any user-specific data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('purchased_tests_') || key.startsWith('user_')) {
          localStorage.removeItem(key)
        }
      })
      
      // Redirect immediately
      window.location.replace('/')
      
      // Do async cleanup in background (non-blocking)
      setTimeout(async () => {
        try {
          if (auth) {
            await auth.signOut()
          }
          if (supabase) {
            await supabase.auth.signOut()
          }
        } catch (error) {
          console.error('Background signout error:', error)
        }
      }, 0)
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}