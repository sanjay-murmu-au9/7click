import { useState, useEffect, useRef } from 'react'
// Custom hook to get window width
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}
import Masonry from 'react-masonry-css'
import { images } from '../assets/imageData'
import { type ImageData } from '../assets/imageData'
import BlurImage from './BlurImage'
import ImageModal from './ImageModal'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(-1)
  const [visibleImages, setVisibleImages] = useState<number[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1
      setCurrentImageIndex(newIndex)
      setSelectedImage(images[newIndex])
    }
  }

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      const newIndex = currentImageIndex + 1
      setCurrentImageIndex(newIndex)
      setSelectedImage(images[newIndex])
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'ArrowLeft') handlePrevImage()
        if (e.key === 'ArrowRight') handleNextImage()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, currentImageIndex])

  // Reset scroll state when unmounting
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Lazy loading with Intersection Observer
  useEffect(() => {
    setVisibleImages([])

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleImages(prev => [...new Set([...prev, index])])
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const containers = document.querySelectorAll('.image-container')
    containers.forEach(container => {
      observerRef.current?.observe(container)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 700;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Photo Gallery
        </h2>
        {isMobile ? (
          <div className="grid grid-cols-1 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                data-index={index}
                className={`image-container rounded-lg overflow-hidden transform transition-all duration-700 ${
                  visibleImages.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${(index % 3) * 100}ms`,
                }}
              >
                <div
                  className="relative group cursor-pointer rounded-lg overflow-hidden"
                  onDoubleClick={() => {
                    setSelectedImage(image)
                    setCurrentImageIndex(index)
                  }}
                >
                  <BlurImage
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-auto rounded-lg transform transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent
                               opacity-0 group-hover:opacity-100 transition-all duration-300
                               flex items-end"
                  >
                    <div className="p-6 text-white">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20
                                     backdrop-blur-sm rounded-md mb-2 transform group-hover:translate-y-0
                                     translate-y-4 transition-transform duration-300 delay-100"
                      >
                        {image.category}
                      </span>
                      <h3 className="text-lg font-medium leading-tight transform group-hover:translate-y-0
                                   translate-y-4 transition-transform duration-300 delay-150"
                      >
                        {image.alt}
                      </h3>
                      <p className="text-sm text-gray-300 mt-1 transform group-hover:translate-y-0
                                   translate-y-4 transition-transform duration-300 delay-200"
                      >
                        {new Date(image.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Masonry
            breakpointCols={{
              default: 3,
              1100: 2,
              700: 1
            }}
            className="flex ml-0 sm:-ml-4 w-auto"
            columnClassName="pl-0 sm:pl-4 bg-clip-padding"
          >
            {images.map((image, index) => (
              <div
                key={index}
                data-index={index}
                className={`image-container mb-4 transform transition-all duration-700 ${
                  visibleImages.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${(index % 3) * 100}ms`,
                }}
              >
                <div
                  className="relative group cursor-pointer rounded-lg overflow-hidden"
                  onDoubleClick={() => {
                    setSelectedImage(image)
                    setCurrentImageIndex(index)
                  }}
                >
                  <BlurImage
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-auto rounded-lg transform transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent
                               opacity-0 group-hover:opacity-100 transition-all duration-300
                               flex items-end"
                  >
                    <div className="p-6 text-white">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20
                                     backdrop-blur-sm rounded-md mb-2 transform group-hover:translate-y-0
                                     translate-y-4 transition-transform duration-300 delay-100"
                      >
                        {image.category}
                      </span>
                      <h3 className="text-lg font-medium leading-tight transform group-hover:translate-y-0
                                   translate-y-4 transition-transform duration-300 delay-150"
                      >
                        {image.alt}
                      </h3>
                      <p className="text-sm text-gray-300 mt-1 transform group-hover:translate-y-0
                                   translate-y-4 transition-transform duration-300 delay-200"
                      >
                        {new Date(image.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        )}

        <ImageModal
          image={selectedImage}
          onClose={() => {
            setSelectedImage(null)
            setCurrentImageIndex(-1)
            document.body.style.overflow = ''
          }}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          hasPrev={currentImageIndex > 0}
          hasNext={currentImageIndex < images.length - 1}
        />
      </div>
    </section>
  )
}