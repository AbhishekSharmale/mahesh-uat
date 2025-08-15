import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC5M-eH7K9UPUMND4CFXDBw8BFuTHZAQiw",
  authDomain: "mahesh-9af88.firebaseapp.com",
  projectId: "mahesh-9af88",
  storageBucket: "mahesh-9af88.firebasestorage.app",
  messagingSenderId: "818742362654",
  appId: "1:818742362654:web:a8a68038c27d2d8930240f",
  measurementId: "G-1VW4WJ8XXF"
}

let app = null
let auth = null

try {
  if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    console.log('Firebase initialized successfully')
  } else {
    console.warn('Missing Firebase config values')
  }
} catch (error) {
  console.error('Firebase initialization failed:', error)
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