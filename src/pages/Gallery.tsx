import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, ZoomIn } from 'lucide-react';
import Lightbox from '../components/Lightbox';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  category: string;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/public/gallery')
      .then((r) => r.json())
      .then((data) => setItems(data))
      .catch((e) => console.error("Error loading gallery", e))
      .finally(() => setLoading(false));
  }, []);

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

          {loading ? (
            <div className="spinner-container"><div className="spinner" /></div>
          ) : filteredItems.length === 0 ? (
            <div className="empty-state">
              <ImageIcon size={48} />
              <h3>No Images Found</h3>
              <p style={{ marginTop: '8px' }}>There are currently no gallery photographs in this category.</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="card"
                  onClick={() => setLightboxIndex(index)}
                  style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden', height: '260px' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15,23,42,0.8) 0%, transparent 60%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '20px',
                      color: 'white'
                    }}>
                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>{item.category}</span>
                          <ZoomIn size={18} style={{ opacity: 0.8 }} />
                        </div>
                        <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '600' }}>{item.title}</h4>
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
