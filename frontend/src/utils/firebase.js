import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

// Debug logging
console.log('Firebase Config Debug:', {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ? 'Set' : 'Missing',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Missing',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ? 'Set' : 'Missing'
})

let app = null
let auth = null

try {
  console.log('Attempting Firebase initialization...')
  if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    console.log('✅ Firebase initialized successfully')
  } else {
    console.warn('❌ Missing Firebase config values:', firebaseConfig)
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error)
}

export { auth }

let googleProvider = null

try {
  if (auth) {
    googleProvider = new GoogleAuthProvider()
    console.log('GoogleAuthProvider initialized')
  }
} catch (error) {
  console.error('GoogleAuthProvider initialization failed:', error)
}

export const signInWithGoogle = async () => {
  if (!auth || !googleProvider) {
    throw new Error('Firebase not initialized')
  }
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return { user: result.user, error: null }
  } catch (error) {
    if (error.code === 'auth/popup-blocked') {
      await signInWithRedirect(auth, googleProvider)
      return { user: null, error: null }
    }
    throw error
  }
}

export const signOut = () => {
  if (!auth) return Promise.resolve()
  return auth.signOut()
}