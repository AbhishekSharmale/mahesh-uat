import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { Download, FileText, BookOpen, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Notes = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()

  const notesData = [
    {
      id: 1,
      title: 'Biology One Liner',
      titleMr: 'जीवशास्त्र एक ओळ',
      category: 'Biology',
      filename: 'biology one liner.pdf',
      size: '2.1 MB',
      description: 'Important biology facts and one-liners for police exam'
    },
    {
      id: 2,
      title: 'General Knowledge Notes',
      titleMr: 'सामान्य ज्ञान नोट्स',
      category: 'GK',
      filename: 'Document (1).pdf',
      size: '1.8 MB',
      description: 'Comprehensive GK notes for competitive exams'
    },
    {
      id: 3,
      title: 'Mathematics Formula Sheet',
      titleMr: 'गणित सूत्र पत्रक',
      category: 'Math',
      filename: 'Document (2).pdf',
      size: '1.5 MB',
      description: 'Essential math formulas and shortcuts'
    },
    {
      id: 4,
      title: 'Reasoning Tricks',
      titleMr: 'तर्कशास्त्र युक्त्या',
      category: 'Reasoning',
      filename: 'Document (5).pdf',
      size: '2.3 MB',
      description: 'Quick reasoning tricks and methods'
    },
    {
      id: 5,
      title: 'Current Affairs',
      titleMr: 'चालू घडामोडी',
      category: 'Current Affairs',
      filename: 'Document (7) (1).pdf',
      size: '1.9 MB',
      description: 'Latest current affairs and important events'
    },
    {
      id: 6,
      title: 'Marathi Grammar',
      titleMr: 'मराठी व्याकरण',
      category: 'Marathi',
      filename: 'Document (8).pdf',
      size: '1.7 MB',
      description: 'Marathi grammar rules and examples'
    }
  ]

  const categoryColors = {
    'Biology': 'from-green-500 to-green-600',
    'GK': 'from-blue-500 to-blue-600',
    'Math': 'from-purple-500 to-purple-600',
    'Reasoning': 'from-orange-500 to-orange-600',
    'Current Affairs': 'from-red-500 to-red-600',
    'Marathi': 'from-yellow-500 to-yellow-600'
  }

  const handleDownload = (filename) => {
    const link = document.createElement('a')
    link.href = `/notes/${filename}`
    link.download = filename
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {language === 'mr' ? 'मोफत नोट्स' : 'Free Notes'}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'mr' ? 'परीक्षेसाठी महत्वाची नोट्स' : 'Important study materials for exam preparation'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Free Notes Banner */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-xl mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <BookOpen className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">
                {language === 'mr' ? '100% मोफत नोट्स' : '100% Free Study Notes'}
              </h2>
              <p className="text-blue-100">
                {language === 'mr' ? 'डाउनलोड करा आणि ऑफलाइन अभ्यास करा' : 'Download and study offline'}
              </p>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid gap-4">
          {notesData.map(note => (
            <div key={note.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {language === 'mr' && note.titleMr ? note.titleMr : note.title}
                  </h3>
                  <span className={`bg-gradient-to-r ${categoryColors[note.category]} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                    {note.category}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">FREE</div>
                  <div className="text-xs text-gray-500">{note.size}</div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {note.description}
              </p>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FileText className="h-4 w-4" />
                  <span>PDF Format</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Download className="h-4 w-4" />
                  <span>Offline Access</span>
                </div>
              </div>

              <button
                onClick={() => handleDownload(note.filename)}
                className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>{language === 'mr' ? 'डाउनलोड करा' : 'Download Now'}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
            {language === 'mr' ? 'नोट्स कशा वापराव्यात?' : 'How to use these notes?'}
          </h3>
          <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
            <li>• {language === 'mr' ? 'नोट्स डाउनलोड करा आणि ऑफलाइन वाचा' : 'Download notes and read offline'}</li>
            <li>• {language === 'mr' ? 'परीक्षेपूर्वी रिव्हिजनसाठी वापरा' : 'Use for revision before exams'}</li>
            <li>• {language === 'mr' ? 'महत्वाचे मुद्दे हायलाइट करा' : 'Highlight important points'}</li>
            <li>• {language === 'mr' ? 'टेस्टसोबत एकत्र अभ्यास करा' : 'Study along with practice tests'}</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default Notes