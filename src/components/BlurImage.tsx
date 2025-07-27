import { useState, useEffect } from 'react';

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function BlurImage({ src, alt, className = '' }: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [smallImageUrl, setSmallImageUrl] = useState('');

  useEffect(() => {
    // Generate tiny placeholder URL
    const url = new URL(src);
    url.searchParams.set('w', '50'); // Tiny version for placeholder
    url.searchParams.set('blur', '50');
    setSmallImageUrl(url.toString());
  }, [src]);

  return (
    <div className="relative overflow-hidden w-full h-full group">
      {/* Blurred small image placeholder */}
      {isLoading && smallImageUrl && (
        <img
          src={smallImageUrl}
          alt={alt}
          className={`${className} absolute inset-0 w-full h-full object-contain md:object-cover blur-xl scale-105 transform`}
        />
      )}

      {/* Loading shimmer effect */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
             style={{ backgroundSize: '200% 100%' }}
        />
      )}

      {/* Main image */}
      <img
        src={src}
        alt={alt}
        className={`${className} w-full h-full object-contain md:object-cover ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-500 ease-in-out`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
