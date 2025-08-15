import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import toast from 'react-hot-toast'

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('admin_logged_in', 'true')
      toast.success('Admin login successful!')
      navigate('/admin/dashboard')
    } else {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="text-center mb-6">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-gray-600">Enter admin credentials to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="input-field"
                placeholder="admin"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="input-field"
                placeholder="admin123"
                required
              />
            </div>
            
            <button type="submit" className="btn-primary w-full">
              Login to Admin Panel
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin