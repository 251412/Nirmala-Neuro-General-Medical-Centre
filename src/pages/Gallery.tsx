import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, ZoomIn } from 'lucide-react';
import Lightbox from '../components/Lightbox';
import { galleryData, type GalleryItem } from '../data';

interface CurvedScrollProps {
  items: GalleryItem[];
  onOpenLightbox: (index: number) => void;
}

function Gallery3DCurvedScroll({ items, onOpenLightbox }: CurvedScrollProps) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const count = items.length;
  const CYLINDER_SIZE = 10;
  const virtualCards = Array.from({ length: CYLINDER_SIZE }, (_, i) => i);

  // DOM Refs for direct GPU transform manipulation without React re-render overhead
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);
  const featuredRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Continuous physics / scroll state
  const scrollPos = useRef(0);
  const momentum = useRef(0);
  const targetNudge = useRef(0);
  const baseSpeed = useRef(0.0028); // Continuous smooth auto-glide speed

  // Dragging state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const dragDistance = useRef(0);
  const dragVelocity = useRef(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Video element ref for guaranteed mobile & desktop autoplay
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Safe catch for autoplay restrictions
      });
    }
  }, []);

  // 60FPS/120FPS Continuous Smooth Motion Animation Loop
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      if (!isDragging.current) {
        // Apply spring target nudge (from card click)
        if (Math.abs(targetNudge.current) > 0.001) {
          const step = targetNudge.current * 0.085;
          scrollPos.current += step;
          targetNudge.current -= step;
        }

        // Apply momentum inertia (from wheel or fling)
        if (Math.abs(momentum.current) > 0.0001) {
          scrollPos.current += momentum.current;
          momentum.current *= 0.93; // smooth exponential decay
        }

        // Continuous silky smooth motion (does not stop on hover)
        scrollPos.current += baseSpeed.current;
      }

      // Keep scrollPos wrapped smoothly within [0, CYLINDER_SIZE)
      while (scrollPos.current < 0) scrollPos.current += CYLINDER_SIZE;
      scrollPos.current = scrollPos.current % CYLINDER_SIZE;

      // Render cards along the 3D edge-to-edge cylindrical curve
      const spanWidth = windowWidth * 0.44;

      for (let i = 0; i < CYLINDER_SIZE; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        let diff = (i - scrollPos.current) % CYLINDER_SIZE;
        if (diff > CYLINDER_SIZE / 2) diff -= CYLINDER_SIZE;
        if (diff < -CYLINDER_SIZE / 2) diff += CYLINDER_SIZE;

        const norm = diff / 3;
        const absNorm = Math.abs(norm);
        const isEdgeVisible = absNorm <= 1.25;

        if (!isEdgeVisible) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          continue;
        }

        const isCenter = Math.abs(diff) < 0.26;
        const x = norm * spanWidth;
        const translateZ = (isCenter ? 32 : 0) - Math.pow(Math.min(1.2, absNorm), 1.7) * 320;
        const rotateY = -norm * 44;
        const translateY = Math.pow(absNorm, 2) * 16;
        const scale = Math.max(0.72, 1.05 - absNorm * 0.24);
        const opacity = Math.max(0.18, 1 - Math.pow(absNorm, 2.2) * 0.78);
        const zIndex = Math.round(50 - absNorm * 35);
        const brightness = isCenter ? 1.05 : Math.abs(diff) <= 1 ? 0.94 : 0.82;

        el.style.transform = `translateX(${x}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
        el.style.filter = `brightness(${brightness})`;
        el.style.pointerEvents = 'auto';

        // Outer ring glow styling
        const ringEl = ringRefs.current[i];
        if (ringEl) {
          if (isCenter) {
            ringEl.style.boxShadow = '0 26px 54px -8px rgba(2, 132, 199, 0.52), 0 0 38px rgba(56, 189, 248, 0.75), 0 0 0 2.5px #38bdf8';
            ringEl.style.background = 'linear-gradient(135deg, #38bdf8 0%, #0d9488 50%, #6366f1 100%)';
          } else {
            ringEl.style.boxShadow = '0 12px 28px -6px rgba(15, 23, 42, 0.22), 0 0 16px rgba(56, 189, 248, 0.25)';
            ringEl.style.background = 'linear-gradient(135deg, rgba(56, 189, 248, 0.7) 0%, rgba(13, 148, 136, 0.5) 100%)';
          }
        }

        // Featured badge display
        const featEl = featuredRefs.current[i];
        if (featEl) {
          featEl.style.display = isCenter ? 'inline-flex' : 'none';
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [windowWidth, count]);

  // Smooth wheel scrolling with inertia
  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    momentum.current += delta * 0.00045;
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    lastTime.current = performance.now();
    dragDistance.current = 0;
    dragVelocity.current = 0;
    momentum.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastTime.current);
    const dx = e.clientX - lastX.current;

    dragDistance.current += Math.abs(dx);
    dragVelocity.current = dx / dt;

    // Direct 1:1 smooth dragging response
    const scrollDelta = (dx / (windowWidth * 0.44)) * 1.5;
    scrollPos.current -= scrollDelta;

    lastX.current = e.clientX;
    lastTime.current = now;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    // Fling momentum on release
    if (Math.abs(dragVelocity.current) > 0.3) {
      momentum.current = -dragVelocity.current * 0.022;
    }
  };

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    const clientX = e.touches[0].clientX;
    startX.current = clientX;
    lastX.current = clientX;
    lastTime.current = performance.now();
    dragDistance.current = 0;
    dragVelocity.current = 0;
    momentum.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = e.touches[0].clientX;
    const now = performance.now();
    const dt = Math.max(1, now - lastTime.current);
    const dx = clientX - lastX.current;

    dragDistance.current += Math.abs(dx);
    dragVelocity.current = dx / dt;

    const scrollDelta = (dx / (windowWidth * 0.44)) * 1.6;
    scrollPos.current -= scrollDelta;

    lastX.current = clientX;
    lastTime.current = now;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (Math.abs(dragVelocity.current) > 0.3) {
      momentum.current = -dragVelocity.current * 0.022;
    }
  };

  // Card click handler
  const handleCardClick = (v: number, itemIndex: number) => {
    if (dragDistance.current > 8) return;

    let diff = (v - scrollPos.current) % CYLINDER_SIZE;
    if (diff > CYLINDER_SIZE / 2) diff -= CYLINDER_SIZE;
    if (diff < -CYLINDER_SIZE / 2) diff += CYLINDER_SIZE;

    if (Math.abs(diff) < 0.35) {
      onOpenLightbox(itemIndex);
    } else {
      targetNudge.current += diff;
    }
  };

  // Responsiveness
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1200;

  const cardWidth = isMobile
    ? Math.min(270, windowWidth * 0.72)
    : isTablet
    ? Math.min(310, windowWidth * 0.32)
    : Math.min(340, Math.max(260, windowWidth * 0.22));

  const cardHeight = cardWidth * 1.28;
  const stageHeight = cardHeight + 80;

  return (
    <div
      style={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        overflow: 'hidden',
        padding: isMobile ? '24px 0 30px 0' : '36px 0 42px 0',
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
        userSelect: 'none',
        cursor: 'grab',
        background: '#070f1e',
        marginBottom: '40px',
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 4K Neural Plexus Background Video - Windows desktop & mobile supported */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          // @ts-ignore
          webkit-playsinline="true"
          preload="auto"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            transform: 'translate(-50%, -50%)',
            opacity: 0.85,
            filter: 'saturate(1.2) brightness(0.92)',
          }}
        >
          <source src="/gallrey.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Gradient Vignette & Edge Blend Overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 95% 75% at 50% 50%, rgba(7, 15, 30, 0.15) 0%, rgba(7, 15, 30, 0.65) 75%, #070f1e 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50px',
            background: 'linear-gradient(to bottom, #070f1e, transparent)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50px',
            background: 'linear-gradient(to top, #070f1e, transparent)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* 3D Edge-to-Edge Cylindrical Arc Stage */}
      <div
        style={{
          width: '100%',
          height: `${stageHeight}px`,
          position: 'relative',
          zIndex: 1,
          transformStyle: 'preserve-3d',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Subtle 3D Curved Horizon Guide Light on the floor */}
        <div
          style={{
            position: 'absolute',
            bottom: '18px',
            width: '92vw',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.35) 20%, rgba(13, 148, 136, 0.6) 50%, rgba(56, 189, 248, 0.35) 80%, transparent 100%)',
            borderRadius: '50%',
            filter: 'blur(1px)',
            pointerEvents: 'none',
            transform: 'rotateX(80deg) translateZ(-40px)',
          }}
        />

        {/* Persistent 3D Cards rendered in 60fps/120fps smooth scrolling motion */}
        {virtualCards.map((v) => {
          const itemIndex = ((v % count) + count) % count;
          const item = items[itemIndex];
          if (!item) return null;

          return (
            <div
              key={`cyl-card-${v}`}
              ref={(el) => { cardRefs.current[v] = el; }}
              onClick={() => handleCardClick(v, itemIndex)}
              style={{
                position: 'absolute',
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                transformStyle: 'preserve-3d',
                cursor: 'pointer',
                willChange: 'transform, opacity, filter',
              }}
            >
              {/* 3D Illuminated Outer Ring Frame */}
              <div
                ref={(el) => { ringRefs.current[v] = el; }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '22px',
                  padding: '3px',
                  background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.7) 0%, rgba(13, 148, 136, 0.5) 100%)',
                  boxShadow: '0 12px 28px -6px rgba(15, 23, 42, 0.22), 0 0 16px rgba(56, 189, 248, 0.25)',
                  transition: 'box-shadow 0.25s ease, background 0.25s ease',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '19px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#0f172a',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Outer gradient overlay & caption */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.94) 0%, rgba(15, 23, 42, 0.4) 45%, transparent 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: isMobile ? '16px' : '22px',
                      color: 'white',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span
                        style={{
                          backgroundColor: '#38bdf8',
                          color: '#0f172a',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.category}
                      </span>
                      <span
                        ref={(el) => { featuredRefs.current[v] = el; }}
                        style={{
                          fontSize: '0.72rem',
                          color: '#38bdf8',
                          fontWeight: 600,
                          display: 'none',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8', display: 'inline-block', boxShadow: '0 0 6px #38bdf8' }} />
                        Featured
                      </span>
                    </div>
                    <h4
                      style={{
                        color: '#ffffff',
                        fontSize: isMobile ? '0.95rem' : '1.08rem',
                        fontWeight: 700,
                        margin: 0,
                        lineHeight: 1.3,
                        textShadow: '0 2px 6px rgba(0,0,0,0.6)',
                      }}
                    >
                      {item.title}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.76rem', color: '#93c5fd', marginTop: '6px' }}>
                      <ZoomIn size={14} /> Click to expand
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Gallery Component ────────────────────────────── */
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
        padding: 'clamp(105px, 12vw, 130px) 0 clamp(45px, 5vw, 60px)',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '8px' }}>Hospital Gallery</h1>
          <p style={{ color: '#93c5fd', fontSize: '1.05rem' }}>Experience our medical facility tour with an interactive edge-to-edge 3D curved scroll.</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section" style={{ background: '#070f1e', color: '#f8fafc', padding: '48px 0 20px 0' }}>
        <div className="container">
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '10px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 22px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: selectedCategory === cat ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.16)',
                  background: selectedCategory === cat
                    ? 'linear-gradient(135deg, var(--primary) 0%, #0284c7 100%)'
                    : 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  boxShadow: selectedCategory === cat
                    ? '0 4px 18px rgba(2, 132, 199, 0.45), 0 0 10px rgba(56, 189, 248, 0.3)'
                    : 'none',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredItems.length === 0 ? (
            <div className="empty-state" style={{ color: '#cbd5e1', padding: '60px 20px' }}>
              <ImageIcon size={48} color="#38bdf8" />
              <h3 style={{ color: '#ffffff', marginTop: '16px' }}>No Images Found</h3>
              <p style={{ marginTop: '8px', color: '#94a3b8' }}>There are currently no gallery photographs in this category.</p>
            </div>
          ) : (
            /* Full Edge-to-Edge 3D Curved Scroll Carousel */
            <Gallery3DCurvedScroll
              items={filteredItems}
              onOpenLightbox={(idx) => setLightboxIndex(idx)}
            />
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
