import React, { useState } from 'react';
import { Image as ImageIcon, ZoomIn } from 'lucide-react';
import Lightbox from '../components/Lightbox';
import { galleryData } from '../data';

export default function Gallery() {
  const items = galleryData;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((i) => i.category.toLowerCase() === selectedCategory.toLowerCase());

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  return (
    <div className="animate-fade-in">
      {/* Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #0d3c66 100%)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '8px' }}>Hospital Gallery</h1>
          <p style={{ color: '#93c5fd', fontSize: '1.05rem' }}>Take a visual tour of our medical facilities, laboratories, and patient wards.</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section">
        <div className="container">
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-light'}`}
                style={{ padding: '8px 20px', borderRadius: 'var(--radius-full)', fontSize: '0.9rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <ImageIcon size={48} />
              <h3>No Images Found</h3>
              <p style={{ marginTop: '8px' }}>There are currently no gallery photographs in this category.</p>
            </div>
          ) : (
            <div className="grid grid-2" style={{ gap: '30px' }}>
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(index)}
                  style={{
                    cursor: 'pointer',
                    overflow: 'hidden',
                    position: 'relative',
                    borderRadius: '20px',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden', height: '300px' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.6s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 50%, transparent 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      padding: '24px',
                      color: 'white'
                    }}>
                      <div style={{ flex: 1, paddingRight: '16px' }}>
                        <span style={{
                          display: 'inline-block',
                          backgroundColor: '#99f6e4',
                          color: '#0f766e',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          padding: '6px 16px',
                          borderRadius: '9999px',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                          marginBottom: '10px'
                        }}>
                          {item.category}
                        </span>
                        <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
                          {item.title}
                        </h3>
                      </div>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(6px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        flexShrink: 0
                      }}>
                        <ZoomIn size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <Lightbox
          image={filteredItems[lightboxIndex].image}
          title={filteredItems[lightboxIndex].title}
          caption={filteredItems[lightboxIndex].caption}
          onClose={() => setLightboxIndex(null)}
          onPrev={filteredItems.length > 1 ? handlePrev : undefined}
          onNext={filteredItems.length > 1 ? handleNext : undefined}
        />
      )}
    </div>
  );
}
