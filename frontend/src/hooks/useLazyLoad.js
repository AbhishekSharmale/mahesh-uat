import { useState, useEffect, useRef } from 'react'

export const useLazyLoad = (options = {}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [options])

  return { imgRef, isLoaded, isInView, setIsLoaded }
}

export const LazyImage = ({ src, alt, className, placeholder }) => {
  const { imgRef, isLoaded, isInView, setIsLoaded } = useLazyLoad()

  return (
    <div ref={imgRef} className={className}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
      {!isLoaded && placeholder && (
        <div className="bg-gray-200 dark:bg-gray-700 animate-pulse w-full h-full flex items-center justify-center">
          {placeholder}
        </div>
      )}
    </div>
  )
}