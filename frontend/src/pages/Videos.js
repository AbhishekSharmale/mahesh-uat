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
      url: 'https://www.youtube.com/live/c50PoXyitiE?si=QF_aoOGW-IILi1TV',
      thumbnail: 'https://img.youtube.com/vi/c50PoXyitiE/maxresdefault.jpg'
    },
    {
      id: 2,
      title: '85+ Batch - Session 2',
      url: 'https://www.youtube.com/live/cyTEYYgNqvI?si=lmX7aNdnLsDDGmjN',
      thumbnail: 'https://img.youtube.com/vi/cyTEYYgNqvI/maxresdefault.jpg'
    },
    {
      id: 3,
      title: '85+ Batch - Session 3',
      url: 'https://www.youtube.com/live/Qj9UdmceCFc?si=Edg5GoD0yjkCd1iJ',
      thumbnail: 'https://img.youtube.com/vi/Qj9UdmceCFc/maxresdefault.jpg'
    },
    {
      id: 4,
      title: '85+ Batch - Session 4',
      url: 'https://www.youtube.com/live/Lz8KKUMmwSg?si=DOKv9d766IrQOYYl',
      thumbnail: 'https://img.youtube.com/vi/Lz8KKUMmwSg/maxresdefault.jpg'
    },
    {
      id: 5,
      title: '85+ Batch - Session 5',
      url: 'https://www.youtube.com/live/QFNlp_Ug7JM?si=dfVN9bKAOzlOkgrr',
      thumbnail: 'https://img.youtube.com/vi/QFNlp_Ug7JM/maxresdefault.jpg'
    },
    {
      id: 6,
      title: '85+ Batch - Session 6',
      url: 'https://www.youtube.com/live/Ru2bPSS8NNU?si=v8MZ-cyKnsD8IGO1',
      thumbnail: 'https://img.youtube.com/vi/Ru2bPSS8NNU/maxresdefault.jpg'
    },
    {
      id: 7,
      title: '85+ Batch - Session 7',
      url: 'https://www.youtube.com/live/XNNHCh3-AoU?si=LbesVHavyeSfFgaE',
      thumbnail: 'https://img.youtube.com/vi/XNNHCh3-AoU/maxresdefault.jpg'
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {batchVideos.map(video => (
              <div key={video.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 items-center justify-center text-6xl text-gray-400 hidden">
                    🎥
                  </div>
                  <a 
                    href={video.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-colors"
                  >
                    <Play className="h-12 w-12 text-white" />
                  </a>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {video.title}
                  </h3>
                  <a 
                    href={video.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>{language === 'mr' ? 'पहा' : 'Watch'}</span>
                  </a>
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