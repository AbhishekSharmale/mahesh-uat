import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../hooks/useLanguage'
import { supabase } from '../utils/supabase'
import { Clock, CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { demoTests } from '../utils/demoData'
import { getTranslation } from '../utils/i18n'
import LanguageToggle from '../components/LanguageToggle'

const TestPage = () => {
  const { testId } = useParams()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [test, setTest] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTest()
  }, [testId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (test && !showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [test, showResults]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchTest = async () => {
    try {
      if (!supabase) {
        // Demo mode
        const demoTest = demoTests.find(t => t.id === testId)
        if (demoTest) {
          setTest(demoTest)
        } else {
          toast.error('Test not found')
          navigate('/dashboard')
        }
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .eq('id', testId)
        .single()

      if (error) throw error
      if (data) {
        setTest(data)
      } else {
        toast.error('Test not found')
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error('Failed to load test')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }))
  }

  const handleSubmit = async () => {
    try {
      // Calculate score
      let correctAnswers = 0
      test.questions.forEach((question, index) => {
        if (answers[index] === question.correct) {
          correctAnswers++
        }
      })
      
      const finalScore = (correctAnswers / test.questions.length) * 100

      if (!supabase) {
        // Demo mode - still record completion for tracking
        if (window.handleTestCompletion) {
          await window.handleTestCompletion(testId, correctAnswers, test.questions.length)
        }
        setScore(finalScore)
        setShowResults(true)
        return
      }

      // Record test completion using progress tracking
      if (window.handleTestCompletion) {
        await window.handleTestCompletion(testId, correctAnswers, test.questions.length)
      }

      setScore(finalScore)
      setShowResults(true)
    } catch (error) {
      toast.error('Failed to submit test')
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="card text-center mb-6">
            <div className="mb-6">
              {score >= 70 ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{getTranslation('testCompleted', language)}</h2>
              <p className="text-4xl font-bold text-primary mb-2">{score.toFixed(1)}%</p>
              <p className="text-gray-600">
                {getTranslation('youScored', language)} {Math.round((score/100) * test.questions.length)} {getTranslation('outOf', language)} {test.questions.length} {getTranslation('questionsCorrectly', language)}
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary"
            >
              {getTranslation('backToDashboard', language)}
            </button>
          </div>

          {/* Detailed Results */}
          <div className="space-y-4">
            {test.questions.map((question, index) => (
              <div key={index} className="card">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Q{index + 1}. 
                    {language === 'mr' && question.questionMr ? question.questionMr : question.question}
                  </h4>
                  {answers[index] === question.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  )}
                </div>
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-2 rounded text-sm ${
                        optIndex === question.correct
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : answers[index] === optIndex
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : 'bg-gray-50 text-gray-700'
                      }`}
                    >
                      {language === 'mr' && question.optionsMr ? question.optionsMr[optIndex] : option}
                    </div>
                  ))}
                </div>
                {question.explanation && (
                  <div className="mt-3 p-3 bg-blue-50 rounded text-sm text-blue-800">
                    <strong>{getTranslation('explanation', language)}:</strong> 
                    {language === 'mr' && question.explanationMr ? question.explanationMr : question.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">
              {language === 'mr' && test.titleMr ? test.titleMr : test.title}
            </h1>
            <div className="flex items-center space-x-3">
              <LanguageToggle />
              <div className="flex items-center space-x-2 text-primary">
                <Clock className="h-5 w-5" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / test.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="card mb-6">
          <div className="mb-4">
            <span className="text-sm text-gray-500">
              {getTranslation('question', language)} {currentQuestion + 1} {getTranslation('of', language)} {test.questions.length}
            </span>
            <h2 className="text-lg font-medium text-gray-900 mt-2">
              {language === 'mr' && test.questions[currentQuestion].questionMr 
                ? test.questions[currentQuestion].questionMr 
                : test.questions[currentQuestion].question}
            </h2>
          </div>

          <div className="space-y-3">
            {test.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion, index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  answers[currentQuestion] === index
                    ? 'border-primary bg-blue-50 text-primary'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {language === 'mr' && test.questions[currentQuestion].optionsMr 
                  ? test.questions[currentQuestion].optionsMr[index] 
                  : option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            {Object.keys(answers).length} of {test.questions.length} answered
          </span>

          {currentQuestion === test.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="btn-primary"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(test.questions.length - 1, prev + 1))}
              className="btn-primary"
            >
              Next
            </button>
          )}
        </div>

        {/* Question Navigator */}
        <div className="card mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Question Navigator</h3>
          <div className="grid grid-cols-5 gap-2">
            {test.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded text-sm font-medium ${
                  index === currentQuestion
                    ? 'bg-primary text-white'
                    : answers[index] !== undefined
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default TestPage