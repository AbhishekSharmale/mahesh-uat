import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { auth } from '../utils/firebase'
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth'

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
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          avatar: firebaseUser.photoURL
        })
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
    signOut: async () => {
      try {
        // Set logout flag immediately
        sessionStorage.setItem('user_logged_out', 'true')
        
        // Clear user state immediately
        setUser(null)
        
        // Firebase signout
        if (auth) {
          await auth.signOut()
        }
        
        // Supabase signout
        if (supabase) {
          await supabase.auth.signOut()
        }
        
        // Clear all user data
        localStorage.removeItem('demo_user')
        localStorage.removeItem('user_purchases')
        localStorage.removeItem('user_progress')
        
        // Clear any user-specific data
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('purchased_tests_') || key.startsWith('user_')) {
            localStorage.removeItem(key)
          }
        })
        
        // Redirect to home and prevent back navigation
        window.location.replace('/')
      } catch (error) {
        console.error('Sign out error:', error)
        // Force logout even if there's an error
        sessionStorage.setItem('user_logged_out', 'true')
        setUser(null)
        localStorage.clear()
        window.location.replace('/')
      }
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}