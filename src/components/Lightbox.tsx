import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  image: string;
  title: string;
  caption: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function Lightbox({ image, title, caption, onClose, onPrev, onNext }: LightboxProps) {
  
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(8px)',
        zIndex: 3000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      {/* Top controls */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          display: 'flex',
          gap: '16px',
          zIndex: 3100,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; }}
          aria-label="Close Lightbox"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Image View */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '1000px',
          width: '100%',
          flex: 1,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev Arrow */}
        {onPrev && (
          <button
            onClick={onPrev}
            style={{
              position: 'absolute',
              left: '-20px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3200,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; }}
            aria-label="Previous Image"
          >
            <ChevronLeft size={30} />
          </button>
        )}

        {/* Image */}
        <img
          src={image}
          alt={title}
          style={{
            maxHeight: '75vh',
            maxWidth: '100%',
            objectFit: 'contain',
            borderRadius: '8px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          }}
        />

        {/* Next Arrow */}
        {onNext && (
          <button
            onClick={onNext}
            style={{
              position: 'absolute',
              right: '-20px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3200,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; }}
            aria-label="Next Image"
          >
            <ChevronRight size={30} />
          </button>
        )}
      </div>

      {/* Info Overlay */}
      <div
        style={{
          textAlign: 'center',
          color: 'white',
          marginTop: '20px',
          maxWidth: '600px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '6px' }}>
          {title}
        </h4>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          {caption}
        </p>
      </div>
    </div>
  );
}
