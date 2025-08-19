import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { ArrowLeft, Play, Youtube } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Videos = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()

  const batchVideos = [
    {
      id: 1,
      title: '85+ Batch - Session 1',
      videoId: 'c50PoXyitiE'
    },
    {
      id: 2,
      title: '85+ Batch - Session 2',
      videoId: 'cyTEYYgNqvI'
    },
    {
      id: 3,
      title: '85+ Batch - Session 3',
      videoId: 'Qj9UdmceCFc'
    },
    {
      id: 4,
      title: '85+ Batch - Session 4',
      videoId: 'Lz8KKUMmwSg'
    },
    {
      id: 5,
      title: '85+ Batch - Session 5',
      videoId: 'QFNlp_Ug7JM'
    },
    {
      id: 6,
      title: '85+ Batch - Session 6',
      videoId: 'Ru2bPSS8NNU'
    },
    {
      id: 7,
      title: '85+ Batch - Session 7',
      videoId: 'XNNHCh3-AoU'
    }
  ]

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
                {language === 'mr' ? 'व्हिडिओ लेक्चर्स' : 'Video Lectures'}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'mr' ? 'Mahesh Sharmale यांचे विशेष व्हिडिओ' : 'Expert videos by Mahesh Sharmale'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* 85+ Batch Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {language === 'mr' ? '85+ बॅच व्हिडिओ' : '85+ Batch Videos'}
          </h2>
          <div className="grid gap-6">
            {batchVideos.map(video => (
              <div key={video.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-center">
                    {video.title}
                  </h3>
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      className="w-full h-full rounded-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* YouTube Channel Link */}
        <div className="text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {language === 'mr' ? 'आणखी व्हिडिओसाठी' : 'For More Videos'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'mr' ? 'आमच्या YouTube चॅनेलवर भेट द्या' : 'Visit our YouTube channel'}
            </p>
            <a 
              href="https://www.youtube.com/@MaheshSharmale" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Youtube className="h-5 w-5" />
              <span className="font-medium">{language === 'mr' ? 'YouTube चॅनेल' : 'YouTube Channel'}</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Videos