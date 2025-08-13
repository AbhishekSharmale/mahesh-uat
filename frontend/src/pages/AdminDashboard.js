import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { Plus, Edit, Trash2, Users, DollarSign, BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tests')
  const [tests, setTests] = useState([])
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({ totalUsers: 0, totalRevenue: 0, totalTests: 0 })
  const [showTestForm, setShowTestForm] = useState(false)
  const [editingTest, setEditingTest] = useState(null)

  useEffect(() => {
    fetchTests()
    fetchUsers()
    fetchStats()
  }, [])

  const fetchTests = async () => {
    const { data, error } = await supabase
      .from('tests')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) setTests(data || [])
  }

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) setUsers(data || [])
  }

  const fetchStats = async () => {
    const { data: usersCount } = await supabase
      .from('profiles')
      .select('id', { count: 'exact' })
    
    const { data: testsCount } = await supabase
      .from('tests')
      .select('id', { count: 'exact' })
    
    const { data: payments } = await supabase
      .from('payments')
      .select('amount')
      .eq('status', 'completed')
    
    const totalRevenue = payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0
    
    setStats({
      totalUsers: usersCount?.length || 0,
      totalTests: testsCount?.length || 0,
      totalRevenue
    })
  }

  const TestForm = ({ test, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      title: test?.title || '',
      category: test?.category || 'gk',
      price: test?.price || 10,
      published: test?.published || false,
      questions: test?.questions || Array(10).fill({
        question: '',
        options: ['', '', '', ''],
        correct: 0,
        explanation: ''
      })
    })

    const handleQuestionChange = (index, field, value) => {
      const newQuestions = [...formData.questions]
      if (field === 'options') {
        newQuestions[index] = { ...newQuestions[index], options: value }
      } else {
        newQuestions[index] = { ...newQuestions[index], [field]: value }
      }
      setFormData({ ...formData, questions: newQuestions })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        if (test) {
          const { error } = await supabase
            .from('tests')
            .update(formData)
            .eq('id', test.id)
          if (error) throw error
        } else {
          const { error } = await supabase
            .from('tests')
            .insert([formData])
          if (error) throw error
        }
        
        toast.success(test ? 'Test updated!' : 'Test created!')
        onSave()
        onClose()
      } catch (error) {
        toast.error('Failed to save test')
      }
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              {test ? 'Edit Test' : 'Create New Test'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="gk">General Knowledge</option>
                    <option value="math">Mathematics</option>
                    <option value="reasoning">Reasoning</option>
                    <option value="marathi">Marathi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    className="input-field"
                    min="1"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="mr-2"
                    />
                    Published
                  </label>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium">Questions</h4>
                {formData.questions.map((question, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h5 className="font-medium mb-3">Question {index + 1}</h5>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question Text
                      </label>
                      <textarea
                        value={question.question}
                        onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                        className="input-field"
                        rows="2"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Option {String.fromCharCode(65 + optIndex)}
                          </label>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...question.options]
                              newOptions[optIndex] = e.target.value
                              handleQuestionChange(index, 'options', newOptions)
                            }}
                            className="input-field"
                            required
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Correct Answer
                        </label>
                        <select
                          value={question.correct}
                          onChange={(e) => handleQuestionChange(index, 'correct', parseInt(e.target.value))}
                          className="input-field"
                        >
                          {question.options.map((_, optIndex) => (
                            <option key={optIndex} value={optIndex}>
                              Option {String.fromCharCode(65 + optIndex)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Explanation (Optional)
                        </label>
                        <input
                          type="text"
                          value={question.explanation}
                          onChange={(e) => handleQuestionChange(index, 'explanation', e.target.value)}
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {test ? 'Update Test' : 'Create Test'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const deleteTest = async (testId) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      const { error } = await supabase
        .from('tests')
        .delete()
        .eq('id', testId)
      
      if (!error) {
        toast.success('Test deleted!')
        fetchTests()
      } else {
        toast.error('Failed to delete test')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            <p className="text-gray-600">Total Users</p>
          </div>
          <div className="card text-center">
            <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900">{stats.totalTests}</p>
            <p className="text-gray-600">Total Tests</p>
          </div>
          <div className="card text-center">
            <DollarSign className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900">₹{stats.totalRevenue}</p>
            <p className="text-gray-600">Total Revenue</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="card mb-6">
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setActiveTab('tests')}
              className={`pb-2 px-1 font-medium ${
                activeTab === 'tests'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600'
              }`}
            >
              Tests Management
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-2 px-1 font-medium ${
                activeTab === 'users'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600'
              }`}
            >
              Users
            </button>
          </div>
        </div>

        {/* Tests Tab */}
        {activeTab === 'tests' && (
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Tests</h3>
              <button
                onClick={() => setShowTestForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Test</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map(test => (
                    <tr key={test.id} className="border-b">
                      <td className="py-3 px-4 font-medium">{test.title}</td>
                      <td className="py-3 px-4">{test.category}</td>
                      <td className="py-3 px-4">₹{test.price}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          test.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {test.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingTest(test)
                              setShowTestForm(true)
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteTest(test.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-6">Users</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Tests Taken</th>
                    <th className="text-left py-3 px-4">Wallet Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.tests_taken}</td>
                      <td className="py-3 px-4">₹{user.wallet_balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Test Form Modal */}
      {showTestForm && (
        <TestForm
          test={editingTest}
          onClose={() => {
            setShowTestForm(false)
            setEditingTest(null)
          }}
          onSave={() => {
            fetchTests()
            fetchStats()
          }}
        />
      )}
    </div>
  )
}

export default AdminDashboard