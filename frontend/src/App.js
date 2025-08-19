import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { LanguageProvider } from './hooks/useLanguage'
import { ThemeProvider } from './hooks/useTheme'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import TestPage from './pages/TestPage'
import Notes from './pages/Notes'
import Videos from './pages/Videos'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import Footer from './components/Footer'

function App() {
  console.log('App component rendering')
  
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

function AppContent() {
  const { loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test/:testId" element={
            <ProtectedRoute>
              <TestPage />
            </ProtectedRoute>
          } />
          <Route path="/notes" element={<Notes />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </Router>
  )
}

export default App