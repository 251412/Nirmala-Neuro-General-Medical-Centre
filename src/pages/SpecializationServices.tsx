import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  Calendar, 
  AlertTriangle, 
  Brain, 
  Activity, 
  Zap, 
  UserCheck, 
  HeartPulse, 
  Sparkles, 
  ShieldAlert, 
  Flame, 
  Crosshair, 
  Cpu, 
  PhoneCall
} from 'lucide-react';
import { specializationServicesData, type SpecializationService } from '../data/specializationServices';
import { handleImageError, DEFAULT_SPECIALIZATION_IMAGE } from '../utils/imageUtils';

export default function SpecializationServices() {
  const [searchQuery, setSearchQuery] = useState('');

  // SEO: Update document title and meta description
  useEffect(() => {
    document.title = 'Specialization & Services | Nirmala Neuro & General Medical Centre';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Explore specialized neurological care for migraine, stroke, epilepsy, paralysis, Parkinson\'s, and brain disorders at Nirmala Neuro & General Medical Centre.');
    }
  }, []);

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) {
      return specializationServicesData;
    }
    const q = searchQuery.toLowerCase().trim();
    return specializationServicesData.filter((service) =>
      service.title.toLowerCase().includes(q) ||
      service.shortDescription.toLowerCase().includes(q) ||
      service.description.toLowerCase().includes(q) ||
      service.symptoms.some((sym) => sym.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const isFullList = !searchQuery.trim();

  return (
    <div className="specialization-page-wrapper">
      <style>{`
        .specialization-page-wrapper {
          background-color: #f8fafc;
          min-height: 100vh;
          position: relative;
          color: #0f172a;
        }

        /* Medical Cross Background Pattern */
        .medical-cross-decor {
          position: absolute;
          pointer-events: none;
          z-index: 0;
          color: #38bdf8;
          opacity: 0.28;
        }

        /* 12-Column Responsive Layout matching reference layout: 4 cards, 4 cards, 3 cards */
        .specialization-layout-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
          position: relative;
          z-index: 2;
        }

        /* Normal search results grid fallback */
        .specialization-search-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          position: relative;
          z-index: 2;
        }

        /* Desktop: Row 1 & 2 have 4 cards (span 3), Row 3 has 3 cards (span 4) */
        @media (min-width: 1024px) {
          .card-col-row1-2 {
            grid-column: span 3;
          }
          .card-col-row3 {
            grid-column: span 4;
          }
        }

        /* Tablet: 2 cards per row (span 6) */
        @media (max-width: 1023px) and (min-width: 640px) {
          .card-col-row1-2,
          .card-col-row3 {
            grid-column: span 6;
          }
        }

        /* Mobile: 1 card per row (span 12) */
        @media (max-width: 639px) {
          .card-col-row1-2,
          .card-col-row3 {
            grid-column: span 12;
          }
        }

        /* Card Container Styling matching the user's reference design */
        .spec-service-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 18px rgba(15, 76, 129, 0.05);
          transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease, border-color 0.28s ease;
          position: relative;
        }

        .spec-service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 36px -8px rgba(15, 76, 129, 0.16);
          border-color: #bae6fd;
        }

        .spec-service-card:hover .spec-card-img {
          transform: scale(1.04);
        }

        /* Top Image Box */
        .spec-img-box {
          position: relative;
          height: 185px;
          overflow: hidden;
          background: #f1f5f9;
        }

        .spec-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Learn More Action Button */
        .spec-learn-more-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(90deg, #075985 0%, #0284c7 100%);
          color: #ffffff !important;
          border-radius: 9999px;
          padding: 10px 18px;
          font-weight: 600;
          font-size: 0.92rem;
          text-decoration: none;
          box-shadow: 0 3px 12px rgba(2, 132, 199, 0.28);
          transition: all 0.22s ease;
          border: none;
          cursor: pointer;
        }

        .spec-learn-more-btn:hover {
          background: linear-gradient(90deg, #0369a1 0%, #0ea5e9 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(2, 132, 199, 0.4);
          color: #ffffff;
        }

        .spec-book-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 14px;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #0369a1;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .spec-book-btn:hover {
          background: #e0f2fe;
          border-color: #bae6fd;
          color: #0284c7;
        }
      `}</style>

      {/* ── Top Header Section (Matching Our Doctors Page Banner) ── */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #0d3c66 100%)',
        color: 'white',
        padding: 'clamp(105px, 12vw, 130px) 0 clamp(45px, 5vw, 60px)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '2.5rem',
            fontFamily: 'var(--font-heading)',
            color: 'white',
            marginBottom: '8px',
            fontWeight: 800
          }}>
            Our Specialization &amp; Services
          </h1>
          <p style={{ color: '#93c5fd', fontSize: '1.05rem', margin: 0 }}>
            Comprehensive neurological care for a healthier tomorrow
          </p>
        </div>
      </section>

      {/* ── Search Bar Section ── */}
      <section style={{
        padding: '24px 0 10px',
        backgroundColor: '#f8fafc',
        position: 'relative',
        zIndex: 2
      }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#ffffff',
            borderRadius: '9999px',
            padding: '7px 14px 7px 20px',
            boxShadow: '0 4px 16px rgba(15, 76, 129, 0.08)',
            border: '1px solid #cbd5e1'
          }}>
            <Search size={18} style={{ color: '#0284c7', marginRight: '10px', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search specialization or symptom (e.g. Migraine, Stroke, Tremor...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.92rem',
                color: '#0f172a',
                background: 'transparent'
              }}
              aria-label="Search Specialization Services"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  border: 'none',
                  background: '#f1f5f9',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  color: '#64748b',
                  marginRight: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Emergency Notice Banner for Urgent Care ── */}
      <section style={{ padding: '12px 0 20px 0', position: 'relative', zIndex: 2 }}>
        <div className="container" style={{ maxWidth: '1240px' }}>
          <div style={{
            background: 'linear-gradient(90deg, #fff1f2 0%, #ffffff 100%)',
            border: '1px solid #fecdd3',
            borderLeft: '5px solid #e11d48',
            borderRadius: '12px',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            boxShadow: '0 2px 10px rgba(225, 29, 72, 0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: '#ffe4e6',
                color: '#e11d48',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <strong style={{ color: '#9f1239', fontSize: '0.92rem', display: 'block' }}>
                  Suspected Stroke or Acute Neurological Emergency?
                </strong>
                <span style={{ color: '#475569', fontSize: '0.86rem' }}>
                  Sudden face drooping, arm weakness, or speech difficulty requires immediate emergency medical care (FAST).
                </span>
              </div>
            </div>
            <Link
              to="/emergency"
              className="btn btn-danger"
              style={{ padding: '7px 16px', fontSize: '0.84rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <PhoneCall size={15} />
              <span>24/7 Emergency Care</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Grid Section ── */}
      <section style={{ paddingBottom: '70px', position: 'relative', zIndex: 2 }}>
        <div className="container" style={{ maxWidth: '1240px' }}>
          {filteredServices.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              maxWidth: '520px',
              margin: '0 auto',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
            }}>
              <Brain size={48} style={{ color: '#94a3b8', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.3rem', color: '#1e293b', marginBottom: '8px' }}>No Specialization Found</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '20px' }}>
                We couldn't find any specialization matching "{searchQuery}".
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="btn btn-secondary"
                style={{ padding: '8px 20px', fontSize: '0.88rem' }}
              >
                View All Specializations
              </button>
            </div>
          ) : (
            <div className={isFullList ? 'specialization-layout-grid' : 'specialization-search-grid'}>
              {filteredServices.map((service, index) => {
                // In full 11-item layout:
                // indices 0..7 (cards 1..8): Row 1 & 2 (span 3 on desktop)
                // indices 8..10 (cards 9..11): Row 3 (span 4 on desktop)
                const colClass = index < 8 ? 'card-col-row1-2' : 'card-col-row3';

                return (
                  <article
                    key={service.id}
                    className={`spec-service-card ${isFullList ? colClass : ''}`}
                  >
                    {/* Top Medical Visual Illustration Frame */}
                    <div className="spec-img-box">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="spec-card-img"
                        loading="lazy"
                        onError={(e) => handleImageError(e, DEFAULT_SPECIALIZATION_IMAGE)}
                      />

                      {/* Urgent Emergency Badge for acute conditions */}
                      {service.isEmergencyAlert && (
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: 'rgba(225, 29, 72, 0.94)',
                          color: '#ffffff',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 6px rgba(225, 29, 72, 0.35)'
                        }}>
                          <AlertTriangle size={12} />
                          <span>URGENT CARE</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content matching reference */}
                    <div style={{
                      padding: '18px 20px 22px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      {/* Specialization Title */}
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: '#0b2545',
                        marginBottom: '10px',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: 1.25
                      }}>
                        {service.title}
                      </h3>

                      {/* Description matching the clean concise card text */}
                      <p style={{
                        color: '#475569',
                        fontSize: '0.89rem',
                        lineHeight: '1.55',
                        marginBottom: '16px',
                        flex: 1
                      }}>
                        {service.description}
                      </p>

                      {/* Pill Badge: Department Neurology */}
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        background: '#e0f2fe',
                        color: '#0369a1',
                        border: '1px solid #bae6fd',
                        borderRadius: '9999px',
                        padding: '5px 13px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        marginBottom: '16px',
                        alignSelf: 'flex-start'
                      }}>
                        <Brain size={15} style={{ color: '#0284c7' }} />
                        <span>Department: {service.department}</span>
                      </div>

                      {/* Card Action Button matching the blue gradient pill */}
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: 'auto' }}>
                        <Link
                          to={`/specialization-services/${service.slug}`}
                          className="spec-learn-more-btn"
                          style={{ flex: 1 }}
                        >
                          <span>Learn More</span>
                          <ArrowRight size={15} />
                        </Link>
                        <Link
                          to={`/appointment?service=${service.slug}&departmentId=neurology`}
                          className="spec-book-btn"
                          title={`Book consultation for ${service.title}`}
                        >
                          <Calendar size={14} />
                          <span>Book</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Consultation Support Banner ── */}
      <section style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '48px 0', position: 'relative', zIndex: 2 }}>
        <div className="container" style={{ maxWidth: '1240px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            borderRadius: '16px',
            border: '1px solid #bae6fd',
            padding: '36px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{ maxWidth: '640px' }}>
              <span style={{ color: '#0284c7', fontWeight: 700, fontSize: '0.84rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                Expert Neurological Consultation
              </span>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>
                Need Guidance on Neurological Symptoms?
              </h2>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Book an outpatient appointment with Chief Neurologist Dr. Vangapandu Nirmala (DM Neurology) or speak directly with our clinic desk.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/appointment" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '0.92rem' }}>
                <Calendar size={16} />
                <span>Book Appointment</span>
              </Link>
              <a href="tel:+918922279179" className="btn btn-outline" style={{ padding: '12px 22px', fontSize: '0.92rem' }}>
                <PhoneCall size={16} />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
