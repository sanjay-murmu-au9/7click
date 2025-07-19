import { useEffect, useState } from 'react';
import { type ImageData } from '../assets/imageData';

interface ImageModalProps {
  image: ImageData | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function ImageModal({ image, onClose, onPrev, onNext, hasPrev, hasNext }: ImageModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add keyboard event listener for escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (image) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [image]);

  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={() => onClose()}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white transition-colors"
        onClick={onClose}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation arrows */}
      {hasPrev && (
        <button
          className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors transform hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            onPrev?.();
          }}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {hasNext && (
        <button
          className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors transform hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            onNext?.();
          }}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image container */}
      <div 
        className="relative max-w-7xl w-full mx-4 cursor-zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white/100 rounded-full animate-spin"></div>
          </div>
        )}

        <img
          src={image.url}
          alt={image.alt}
          className={`
            w-full h-auto max-h-[90vh] object-contain rounded-lg 
            transition-all duration-300 
            ${loading ? 'opacity-0' : 'opacity-100'}
            ${isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'}
          `}
          onClick={() => setIsZoomed(!isZoomed)}
          onLoad={() => setLoading(false)}
        />

        {/* Image details */}
        <div className="absolute left-0 right-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-md mb-2">
            {image.category}
          </span>
          <h3 className="text-xl font-medium leading-tight mt-2">{image.alt}</h3>
          <p className="text-sm text-gray-300 mt-1">
            {new Date(image.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
