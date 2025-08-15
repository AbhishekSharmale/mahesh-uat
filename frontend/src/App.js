import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { LanguageProvider } from './hooks/useLanguage'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import TestPage from './pages/TestPage'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  console.log('App component rendering')
  
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
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
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/test/:testId" element={
            <ProtectedRoute>
              <TestPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </Router>
  )
}

export default App