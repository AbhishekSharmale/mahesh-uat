import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../utils/supabase'
import { Users, BookOpen, DollarSign, TrendingUp, Plus, Settings, Eye, Calendar, Clock, Activity, UserCheck, Upload, Edit3, BarChart3, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

// Admin email whitelist
const ADMIN_EMAILS = ['admin1@example.com', 'admin2@example.com'] // Replace with your admin emails

const AdminDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTests: 0,
    totalRevenue: 0,
    activeUsers: 0,
    todayLogins: 0,
    liveUsers: 0,
    testsToday: 0,
    avgScore: 0
  })
  const [recentUsers, setRecentUsers] = useState([])
  const [recentTests, setRecentTests] = useState([])
  const [topPerformers, setTopPerformers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [refreshInterval, setRefreshInterval] = useState(null)

  // Check admin access
  const isAdmin = ADMIN_EMAILS.includes(user?.email)

  useEffect(() => {
    if (!isAdmin) return

    fetchAllData()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAllData, 30000)
    setRefreshInterval(interval)
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAdmin])

  const fetchAllData = async () => {
    await Promise.all([
      fetchStats(),
      fetchRecentUsers(),
      fetchRecentTests(),
      fetchTopPerformers()
    ])
    setLoading(false)
  }

  const fetchStats = async () => {
    try {
      if (!supabase) {
        // Demo data with realistic numbers
        setStats({
          totalUsers: 1247,
          totalTests: 45,
          totalRevenue: 124750,
          activeUsers: 189,
          todayLogins: 67,
          liveUsers: 23,
          testsToday: 156,
          avgScore: 6.8
        })
        return
      }

      // Real Supabase queries would go here
      const [usersResult, testsResult] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact' }),
        supabase.from('tests').select('*', { count: 'exact' })
      ])

      setStats({
        totalUsers: usersResult.count || 0,
        totalTests: testsResult.count || 0,
        totalRevenue: 0,
        activeUsers: 0,
        todayLogins: 0,
        liveUsers: 0,
        testsToday: 0,
        avgScore: 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchRecentUsers = async () => {
    if (!supabase) {
      setRecentUsers([
        { id: 1, name: 'Rahul Sharma', email: 'rahul@gmail.com', tests_taken: 8, wallet_balance: 120, last_login: '5 min ago', status: 'online' },
        { id: 2, name: 'Priya Patel', email: 'priya@gmail.com', tests_taken: 12, wallet_balance: 80, last_login: '15 min ago', status: 'online' },
        { id: 3, name: 'Amit Kumar', email: 'amit@gmail.com', tests_taken: 6, wallet_balance: 200, last_login: '1 hour ago', status: 'away' },
        { id: 4, name: 'Sneha Joshi', email: 'sneha@gmail.com', tests_taken: 15, wallet_balance: 50, last_login: '2 hours ago', status: 'offline' },
        { id: 5, name: 'Vikram Singh', email: 'vikram@gmail.com', tests_taken: 4, wallet_balance: 150, last_login: '3 hours ago', status: 'offline' }
      ])
    }
  }

  const fetchRecentTests = async () => {
    if (!supabase) {
      setRecentTests([
        { id: 1, title: 'General Knowledge - Set 1', category: 'GK', attempts: 234, avg_score: 7.2, revenue: 2340 },
        { id: 2, title: 'Mathematics Basic', category: 'Math', attempts: 189, avg_score: 6.8, revenue: 1890 },
        { id: 3, title: 'Reasoning & Logic', category: 'Reasoning', attempts: 156, avg_score: 6.5, revenue: 1560 },
        { id: 4, title: 'Marathi Grammar', category: 'Marathi', attempts: 98, avg_score: 7.8, revenue: 980 },
        { id: 5, title: 'Current Affairs 2024', category: 'GK', attempts: 267, avg_score: 6.9, revenue: 2670 }
      ])
    }
  }

  const fetchTopPerformers = async () => {
    if (!supabase) {
      setTopPerformers([
        { id: 1, name: 'Arjun Mehta', avg_score: 9.2, tests_completed: 25, total_spent: 250 },
        { id: 2, name: 'Kavya Reddy', avg_score: 8.9, tests_completed: 22, total_spent: 220 },
        { id: 3, name: 'Rohit Gupta', avg_score: 8.7, tests_completed: 28, total_spent: 280 },
        { id: 4, name: 'Anita Sharma', avg_score: 8.5, tests_completed: 20, total_spent: 200 },
        { id: 5, name: 'Deepak Yadav', avg_score: 8.3, tests_completed: 18, total_spent: 180 }
      ])
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    )
  }

  const renderOverview = () => (
    <>
      {/* Live Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Users</p>
              <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-xs opacity-75">+12% from last month</p>
            </div>
            <Users className="h-12 w-12 opacity-80" />
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Live Users</p>
              <p className="text-3xl font-bold">{stats.liveUsers}</p>
              <p className="text-xs opacity-75">Currently online</p>
            </div>
            <Activity className="h-12 w-12 opacity-80" />
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Today's Logins</p>
              <p className="text-3xl font-bold">{stats.todayLogins}</p>
              <p className="text-xs opacity-75">New sessions today</p>
            </div>
            <Calendar className="h-12 w-12 opacity-80" />
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Tests Today</p>
              <p className="text-3xl font-bold">{stats.testsToday}</p>
              <p className="text-xs opacity-75">Attempts today</p>
            </div>
            <Zap className="h-12 w-12 opacity-80" />
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <BookOpen className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{stats.totalTests}</p>
          <p className="text-sm text-gray-600">Total Tests</p>
        </div>
        
        <div className="card text-center">
          <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total Revenue</p>
        </div>
        
        <div className="card text-center">
          <UserCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
          <p className="text-sm text-gray-600">Active Users</p>
        </div>
        
        <div className="card text-center">
          <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{stats.avgScore}</p>
          <p className="text-sm text-gray-600">Avg Score</p>
        </div>
      </div>

      {/* Live Activity Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Users */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Live Users
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    user.status === 'online' ? 'bg-green-500' : 
                    user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.tests_taken} tests • ₹{user.wallet_balance}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{user.last_login}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Popular Tests */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Popular Tests
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentTests.map(test => (
              <div key={test.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-gray-900 text-sm">{test.title}</p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{test.category}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{test.attempts} attempts</span>
                  <span>Avg: {test.avg_score}/10</span>
                  <span className="text-green-600 font-medium">₹{test.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Performers */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Top Performers
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {topPerformers.map((performer, index) => (
              <div key={performer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{performer.name}</p>
                    <p className="text-sm text-gray-600">{performer.tests_completed} tests</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{performer.avg_score}/10</p>
                  <p className="text-xs text-gray-500">₹{performer.total_spent}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Control Panel</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="mt-4 border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Live Overview', icon: Activity },
                { id: 'tests', label: 'Test Management', icon: BookOpen },
                { id: 'users', label: 'User Analytics', icon: Users },
                { id: 'revenue', label: 'Revenue Reports', icon: DollarSign },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'tests' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Test Management</h2>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add New Test</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                <Upload className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Bulk Upload</h3>
                <p className="text-gray-600 mb-4">Upload questions via CSV/Excel file</p>
                <button className="btn-secondary w-full">Upload Questions</button>
              </div>
              
              <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                <Edit3 className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Create Test</h3>
                <p className="text-gray-600 mb-4">Create custom test with questions</p>
                <button className="btn-secondary w-full">Create New Test</button>
              </div>
              
              <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                <Settings className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Pricing Setup</h3>
                <p className="text-gray-600 mb-4">Configure test pricing and categories</p>
                <button className="btn-secondary w-full">Manage Pricing</button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'users' && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">User Analytics</h2>
            <p className="text-gray-600">Detailed user analytics and management features coming soon...</p>
          </div>
        )}
        {activeTab === 'revenue' && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Revenue Reports</h2>
            <p className="text-gray-600">Revenue analytics and financial reports coming soon...</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">System Settings</h2>
            <p className="text-gray-600">System configuration and settings coming soon...</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard