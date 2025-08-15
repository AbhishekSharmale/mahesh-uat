import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

let app = null
let auth = null

try {
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
  }
} catch (error) {
  console.warn('Firebase initialization failed:', error)
}

export { auth }

let googleProvider = null

try {
  if (auth) {
    googleProvider = new GoogleAuthProvider()
  }
} catch (error) {
  console.warn('GoogleAuthProvider initialization failed:', error)
}

export const signInWithGoogle = async () => {
  if (!auth || !googleProvider) {
    const demoUser = {
      uid: 'demo-user-' + Date.now(),
      email: 'demo@maheshsharmale.in',
      displayName: 'Demo User',
      photoURL: null
    }
    localStorage.setItem('demo_user', JSON.stringify(demoUser))
    return { user: demoUser, error: null }
  }
  try {
    // Try popup first, fallback to redirect
    const result = await signInWithPopup(auth, googleProvider)
    return { user: result.user, error: null }
  } catch (error) {
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
      // Use redirect instead
      await signInWithRedirect(auth, googleProvider)
      return { user: null, error: null }
    }
    const demoUser = {
      uid: 'demo-user-' + Date.now(),
      email: 'demo@maheshsharmale.in',
      displayName: 'Demo User',
      photoURL: null
    }
    localStorage.setItem('demo_user', JSON.stringify(demoUser))
    return { user: demoUser, error: null }
  }
}

export const signOut = () => {
  if (!auth) return Promise.resolve()
  return auth.signOut()
}