import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { images } from '../assets/imageData'
import HeroBlurImage from './HeroBlurImage'

// Optimize image URLs and add blur hash placeholders
const heroImages = images.slice(0, 5).map(img => ({
  url: optimizeImageUrl(img.url, 1600), // High-quality for main display
  thumbnailUrl: optimizeImageUrl(img.url, 100), // Tiny version for blur-up effect
  alt: img.alt
}))

// Function to optimize Unsplash image URLs
function optimizeImageUrl(url: string, width: number): string {
  // Parse the existing URL
  const baseUrl = url.split('?')[0]
  // Add optimization parameters
  return `${baseUrl}?auto=format,compress&w=${width}&q=${width === 100 ? 50 : 75}`
}

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextImage = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
      setIsTransitioning(false)
    }, 500) // Match this with CSS transition duration
  }, [])

  useEffect(() => {
    const timer = setInterval(nextImage, 5000) // Change image every 5 seconds
    return () => clearInterval(timer)
  }, [nextImage])
  return (
    <div className="relative bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              <span className="block mb-2">Professional</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Photography
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
              Capturing life's precious moments with creativity and passion. 
              Specializing in portrait, landscape, and event photography.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View Portfolio
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full text-base font-medium text-indigo-600 bg-white border-2 border-indigo-600 hover:bg-indigo-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Contact Me
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>
          </div>
          {/* Image Carousel */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* Current Image with Blur Effect */}
              <HeroBlurImage
                key={currentImageIndex}
                src={heroImages[currentImageIndex].url}
                thumbnailSrc={heroImages[currentImageIndex].thumbnailUrl}
                alt={heroImages[currentImageIndex].alt}
                isTransitioning={isTransitioning}
              />
              
              {/* Preload next image */}
              {heroImages.map((img, index) => (
                index !== currentImageIndex && (
                  <link
                    key={img.url}
                    rel="preload"
                    as="image"
                    href={img.url}
                    />
                )
              ))}

              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>
              
              {/* Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-white scale-110 ring-2 ring-white/50 ring-offset-2 ring-offset-black/10'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    onClick={() => {
                      setIsTransitioning(true)
                      setTimeout(() => {
                        setCurrentImageIndex(index)
                        setIsTransitioning(false)
                      }, 500)
                    }}
                  />
                ))}
              </div>

              {/* Arrow Navigation */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => {
                    setIsTransitioning(true)
                    setTimeout(() => {
                      setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
                      setIsTransitioning(false)
                    }, 500)
                  }}
                  className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setIsTransitioning(true)
                    setTimeout(() => {
                      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
                      setIsTransitioning(false)
                    }, 500)
                  }}
                  className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}