import { useState, useEffect } from 'react';

interface HeroBlurImageProps {
  src: string;
  thumbnailSrc: string;
  alt: string;
  isTransitioning: boolean;
  className?: string;
}

export default function HeroBlurImage({ src, thumbnailSrc, alt, isTransitioning, className = '' }: HeroBlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setShowThumbnail(true);

    // Preload main image
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
      // Keep thumbnail visible briefly for smooth transition
      setTimeout(() => setShowThumbnail(false), 100);
    };
  }, [src]);

  return (
    <div className="absolute inset-0">
      {/* Thumbnail image (blurred) */}
      {showThumbnail && (
        <img
          src={thumbnailSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-105"
          style={{ opacity: isLoaded ? 0 : 1 }}
        />
      )}

      {/* Main image */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${className} ${
          !isLoaded ? 'opacity-0' : isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
        }`}
      />
    </div>
  );
}
