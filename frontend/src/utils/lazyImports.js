import { lazy } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'

// Lazy load components for code splitting
export const LazyDashboard = lazy(() => import('../pages/Dashboard'))
export const LazyTestPage = lazy(() => import('../pages/TestPage'))
export const LazyNotes = lazy(() => import('../pages/Notes'))
export const LazyVideos = lazy(() => import('../pages/Videos'))
export const LazyAdminDashboard = lazy(() => import('../pages/AdminDashboard'))

// Lazy load heavy components
export const LazyWalletModal = lazy(() => import('../components/WalletModal'))
export const LazySocialShare = lazy(() => import('../components/SocialShare'))

// Loading wrapper component
export const withSuspense = (Component, fallback = <LoadingSpinner />) => {
  return (props) => (
    <React.Suspense fallback={fallback}>
      <Component {...props} />
    </React.Suspense>
  )
}

// Preload components on user interaction
export const preloadComponent = (importFunc) => {
  const componentImport = importFunc()
  return componentImport
}

// Preload critical components
export const preloadCriticalComponents = () => {
  // Preload dashboard when user is on home page
  if (window.location.pathname === '/') {
    setTimeout(() => {
      preloadComponent(() => import('../pages/Dashboard'))
    }, 2000)
  }
}