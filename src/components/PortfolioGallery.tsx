import { useState, useMemo, useRef, useEffect } from 'react'
import { images } from '../assets/imageData'
import { type ImageData } from '../assets/imageData'
import BlurImage from './BlurImage'
import ImageModal from './ImageModal'

type SortOption = 'newest' | 'oldest'
type FilterOption = string

export default function PortfolioGallery() {
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>('all')
  const [sortOrder, setSortOrder] = useState<SortOption>('newest')
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(-1)

  // Get unique categories
  const categories = useMemo(() => 
    ['all', ...Array.from(new Set(images.map(img => img.category)))],
    []
  )

  // Filter and sort images
  const filteredImages = useMemo(() => {
    let filtered = [...images]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory)
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    return filtered
  }, [selectedCategory, sortOrder])

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < filteredImages.length - 1) {
      const newIndex = currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'ArrowLeft') handlePrevImage();
        if (e.key === 'ArrowRight') handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex]);

  // Reset scroll state when unmounting or changing categories
  useEffect(() => {
    document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCategory]);

  // Add cleanup when unmounting
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Add stagger effect to images
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Reset visible images when filters change
    setVisibleImages([]);

    // Create new intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleImages(prev => [...new Set([...prev, index])]);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all image containers
    const containers = document.querySelectorAll('.image-container');
    containers.forEach(container => {
      observerRef.current?.observe(container);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [filteredImages]);

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white shadow-sm border border-gray-100 rounded-lg p-4">
        {/* Category Filter */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium transition-all duration-300
                ${selectedCategory === category
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md scale-105'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105'
                }
              `}
            >
              {category === 'all' ? 'All Photos' : category}
            </button>
          ))}
        </div>

        {/* Sort Control */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOption)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100"
          >
            <option value="newest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image, index) => (
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
              className="relative group aspect-[4/3] cursor-pointer"
              onDoubleClick={() => {
                setSelectedImage(image);
                setCurrentImageIndex(index);
              }}
            >
              <BlurImage
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent 
                           opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg 
                           flex items-end transform group-hover:scale-[1.02]"
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

      {/* No Results Message */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No images found</h3>
          <p className="mt-1 text-gray-500">Try selecting a different category</p>
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        onClose={() => {
          setSelectedImage(null);
          setCurrentImageIndex(-1);
          document.body.style.overflow = '';
        }}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
        hasPrev={currentImageIndex > 0}
        hasNext={currentImageIndex < filteredImages.length - 1}
      />
    </div>
  )
}