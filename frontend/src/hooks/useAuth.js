import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'

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
    // Firebase auth listener
    if (!auth) {
      // Fallback to demo/supabase mode
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
      }
      setLoading(false)
      return
    }
    
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          avatar: firebaseUser.photoURL
        })
      } else {
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
        await auth.signOut()
        if (!supabase) {
          localStorage.removeItem('demo_user')
        } else {
          await supabase.auth.signOut()
        }
        setUser(null)
      } catch (error) {
        console.error('Sign out error:', error)
      }
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}