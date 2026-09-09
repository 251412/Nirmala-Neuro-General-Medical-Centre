import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  Calendar, 
  PhoneCall, 
  ArrowRight,
  Brain,
  ShieldAlert,
  Clock,
  MapPin
} from 'lucide-react';
import { specializationServicesData } from '../data/specializationServices';
import { hospitalInfo } from '../data/hospital';
import { handleImageError, DEFAULT_SPECIALIZATION_IMAGE } from '../utils/imageUtils';

export default function SpecializationDetail() {
  const { slug } = useParams<{ slug: string }>();

  // Find specialization by slug or id
  const service = useMemo(() => {
    return specializationServicesData.find(
      (s) => s.slug === slug || s.id === slug
    );
  }, [slug]);

  // Dynamic SEO metadata
  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Nirmala Neuro & General Medical Centre`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `Learn about ${service.title.toLowerCase()} and neurological evaluation at Nirmala Neuro & General Medical Centre in Vizianagaram.`
        );
      }
    }
  }, [service]);

  // Related services (exclude current service, pick up to 3)
  const relatedServices = useMemo(() => {
    if (!service) return [];
    return specializationServicesData
      .filter((s) => s.id !== service.id)
      .slice(0, 3);
  }, [service]);

  if (!service) {
    return (
      <div style={{ backgroundColor: '#f8fafc', minHeight: '80vh', padding: '120px 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '560px' }}>
          <ShieldAlert size={56} style={{ color: '#e11d48', margin: '0 auto 16px auto' }} />
          <h2 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '12px' }}>Specialization Not Found</h2>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6, marginBottom: '28px' }}>
            The specialization service you are looking for might have been updated or moved.
          </p>
          <Link to="/specialization-services" className="btn btn-primary">
            View All Specialization &amp; Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <style>{`
        .spec-mobile-visual-card {
          display: none;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 18px rgba(15, 23, 42, 0.06);
          margin-bottom: 28px;
          background: #ffffff;
        }

        .spec-desktop-visual-card {
          display: block;
        }

        @media (max-width: 991px) {
          .spec-mobile-visual-card {
            display: block;
          }
          .spec-desktop-visual-card {
            display: none;
          }
        }
      `}</style>

      {/* ── Hero Section ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0b2545 0%, #0f4c81 60%, #175d97 100%)',
        color: '#ffffff',
        padding: 'clamp(105px, 12vw, 130px) 0 60px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div style={{ maxWidth: '820px' }}>
            {/* Back link */}
            <Link
              to="/specialization-services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#93c5fd',
                fontSize: '0.88rem',
                fontWeight: 600,
                textDecoration: 'none',
                marginBottom: '20px',
                transition: 'color 0.2s ease'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to All Specializations</span>
            </Link>

            {/* Department Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.14)',
              border: '1px solid rgba(255, 255, 255, 0.28)',
              padding: '5px 16px',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.75px',
              textTransform: 'uppercase',
              color: '#7dd3fc',
              marginBottom: '16px'
            }}>
              <Brain size={15} />
              <span>Department: {service.department}</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.1rem, 5vw, 3.2rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#ffffff',
              marginBottom: '18px',
              letterSpacing: '-0.5px'
            }}>
              {service.title}
            </h1>

            <p style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
              lineHeight: 1.6,
              color: '#bae6fd',
              marginBottom: '28px',
              maxWidth: '720px'
            }}>
              {service.shortDescription}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                to={`/appointment?service=${service.slug}&departmentId=neurology`}
                className="btn btn-primary"
                style={{
                  padding: '12px 24px',
                  fontSize: '0.92rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Calendar size={18} />
                <span>Book an Appointment</span>
              </Link>

              <Link
                to="/contact"
                className="btn btn-outline"
                style={{
                  padding: '12px 22px',
                  fontSize: '0.92rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#ffffff',
                  borderColor: 'rgba(255, 255, 255, 0.5)'
                }}
              >
                <PhoneCall size={16} />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Emergency Notice Callout (if condition warrants urgent action) ── */}
      {service.isEmergencyAlert && (
        <div style={{ background: '#fff1f2', borderBottom: '1px solid #fecdd3', padding: '18px 0' }}>
          <div className="container">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: '#e11d48',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                flexShrink: 0
              }}>
                <AlertTriangle size={18} />
                <span>URGENT MEDICAL GUIDANCE</span>
              </div>
              <p style={{ margin: 0, color: '#9f1239', fontSize: '0.92rem', fontWeight: 600, flex: 1, minWidth: '280px' }}>
                {service.emergencyNotice}
              </p>
              <a
                href={`tel:${hospitalInfo.emergencyNumberRaw}`}
                className="btn btn-danger"
                style={{ padding: '8px 18px', fontSize: '0.84rem' }}
              >
                Emergency Hotline: {hospitalInfo.phoneRaw}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Educational Content Section ── */}
      <section className="section" style={{ padding: '50px 0 70px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'flex-start'
          }}>
            {/* Left Content Column */}
            <div style={{ minWidth: 0 }}>
              {/* Mobile Visual Card (Shown directly above "What is [Service]?" on mobile devices) */}
              <div className="spec-mobile-visual-card">
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => handleImageError(e, DEFAULT_SPECIALIZATION_IMAGE)}
                />
                <div style={{ padding: '18px 20px', background: '#ffffff' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: '4px' }}>
                    Specialization
                  </span>
                  <h4 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 6px 0', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                    {service.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748b' }}>
                    <Brain size={15} style={{ color: 'var(--primary)' }} />
                    <span>Department: <strong>{service.department}</strong></span>
                  </div>
                </div>
              </div>

              {/* 1. What is [Service]? */}
              <article style={{ marginBottom: '42px' }}>
                <h2 style={{
                  fontSize: '1.75rem',
                  color: 'var(--primary)',
                  fontWeight: 700,
                  marginBottom: '16px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  What is {service.title}?
                </h2>
                <div style={{
                  background: '#f8fafc',
                  borderLeft: '4px solid var(--primary)',
                  padding: '20px 24px',
                  borderRadius: '0 12px 12px 0',
                  marginBottom: '20px'
                }}>
                  <p style={{
                    fontSize: '1.05rem',
                    lineHeight: '1.8',
                    color: '#334155',
                    margin: 0
                  }}>
                    {service.description}
                  </p>
                </div>
                <p style={{ fontSize: '0.97rem', lineHeight: '1.75', color: '#475569' }}>
                  At Nirmala Neuro &amp; General Medical Centre, patients receive comprehensive clinical evaluations under the direct care of experienced neurologists. Our approach emphasizes precise diagnostic assessments to identify underlying neurological triggers and formulate evidence-based care plans.
                </p>
              </article>

              {/* 2. Symptoms / Common Features */}
              <article style={{ marginBottom: '42px' }}>
                <h3 style={{
                  fontSize: '1.45rem',
                  color: '#0f172a',
                  fontWeight: 700,
                  marginBottom: '14px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  Symptoms &amp; Common Features
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '18px' }}>
                  The symptoms listed below represent common clinical features associated with this condition. An in-person neurological evaluation is essential for accurate identification:
                </p>

                <div style={{
                  display: 'grid',
                  gap: '12px'
                }}>
                  {service.symptoms.map((symptom, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '14px 16px',
                        boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)'
                      }}
                    >
                      <CheckCircle size={18} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.5 }}>
                        {symptom}
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              {/* 3. When to Seek Medical Care */}
              <article style={{ marginBottom: '42px' }}>
                <h3 style={{
                  fontSize: '1.45rem',
                  color: '#0f172a',
                  fontWeight: 700,
                  marginBottom: '14px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  When to Seek Medical Care
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '18px' }}>
                  If you or a family member experience any of the following warning signs, consult a medical specialist promptly:
                </p>

                <div style={{
                  background: '#fefce8',
                  border: '1px solid #fef08a',
                  borderRadius: '12px',
                  padding: '20px 22px'
                }}>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {service.whenToSeekCare.map((guide, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#713f12', fontSize: '0.93rem', lineHeight: 1.55 }}>
                        <span style={{
                          color: '#ca8a04',
                          fontWeight: 700,
                          fontSize: '1rem',
                          lineHeight: 1
                        }}>•</span>
                        <span>{guide}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* 4. "WHICH DEPARTMENT?" DISPLAY (MANDATORY REQUIREMENT) */}
              <article style={{
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                border: '1px solid #bae6fd',
                borderRadius: '16px',
                padding: '28px',
                marginBottom: '40px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <Brain size={26} style={{ color: 'var(--primary)' }} />
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block' }}>
                      Associated Clinical Division
                    </span>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                      Department: {service.department}
                    </h3>
                  </div>
                </div>

                <p style={{ color: '#334155', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  <strong>{service.title}</strong> is an area of expertise treated under the <strong>Department of Neurology</strong> at Nirmala Medical Centre. All diagnostic tests, treatment plans, and ongoing neurological follow-ups are coordinated through our specialized neurology team.
                </p>

                <div style={{
                  background: '#ffffff',
                  borderRadius: '10px',
                  padding: '16px',
                  border: '1px solid #e0f2fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}>
                  <div>
                    <strong style={{ display: 'block', color: '#0f172a', fontSize: '0.92rem' }}>
                      Lead Specialist: Dr. Vangapandu Nirmala
                    </strong>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      M.D., D.M. (Neurology) • Senior Consultant Neurologist
                    </span>
                  </div>
                  <Link
                    to="/doctors/doctor-001"
                    className="btn btn-outline"
                    style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                  >
                    View Doctor Profile
                  </Link>
                </div>
              </article>
            </div>

            {/* Right Sidebar Column */}
            <div style={{ maxWidth: '400px', width: '100%' }}>
              {/* Visual Card (Desktop Only) */}
              <div className="spec-desktop-visual-card" style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
                marginBottom: '32px'
              }}>
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => handleImageError(e, DEFAULT_SPECIALIZATION_IMAGE)}
                />
                <div style={{ padding: '20px', background: '#ffffff' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: '4px' }}>
                    Specialization
                  </span>
                  <h4 style={{ fontSize: '1.2rem', color: '#0f172a', margin: '0 0 8px 0' }}>
                    {service.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748b' }}>
                    <Brain size={15} style={{ color: 'var(--primary)' }} />
                    <span>Department: <strong>{service.department}</strong></span>
                  </div>
                </div>
              </div>

              {/* Appointment Booking Card */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
                marginBottom: '32px'
              }}>
                <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} style={{ color: 'var(--primary)' }} />
                  <span>Book a Consultation</span>
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px' }}>
                  Schedule an in-person consultation with our neurology specialists in Vizianagaram.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', fontSize: '0.85rem', color: '#475569' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span>{hospitalInfo.workingHours}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span>{hospitalInfo.city}, {hospitalInfo.state}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PhoneCall size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span>{hospitalInfo.phone}</span>
                  </div>
                </div>

                <Link
                  to={`/appointment?service=${service.slug}&departmentId=neurology`}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem' }}
                >
                  <Calendar size={16} />
                  <span>Book Appointment Now</span>
                </Link>
              </div>

              {/* Emergency Assistance Notice */}
              <div style={{
                background: '#fff1f2',
                border: '1px solid #fecdd3',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <AlertTriangle size={24} style={{ color: '#e11d48', margin: '0 auto 8px auto' }} />
                <h5 style={{ fontSize: '1rem', color: '#9f1239', margin: '0 0 6px 0' }}>24/7 Emergency Support</h5>
                <p style={{ color: '#475569', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '14px' }}>
                  For acute neurological symptoms, contact our round-the-clock medical line immediately.
                </p>
                <a
                  href={`tel:${hospitalInfo.emergencyNumberRaw}`}
                  className="btn btn-danger"
                  style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.86rem' }}
                >
                  <PhoneCall size={15} />
                  <span>Call {hospitalInfo.phoneRaw}</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Related Specialization Services ── */}
          <div style={{ marginTop: '70px', borderTop: '1px solid #e2e8f0', paddingTop: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.75px', display: 'block', marginBottom: '6px' }}>
                  Explore More
                </span>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  Related Specialization Services
                </h3>
              </div>
              <Link
                to="/specialization-services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none'
                }}
              >
                <span>View All 11 Services</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {relatedServices.map((rel) => (
                <div
                  key={rel.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(15, 76, 129, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.03)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{
                      background: '#f0f9ff',
                      color: 'var(--primary)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 700
                    }}>
                      Neurology
                    </span>
                    {rel.isEmergencyAlert && (
                      <span style={{
                        background: '#fee2e2',
                        color: '#dc2626',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}>
                        Urgent
                      </span>
                    )}
                  </div>

                  <h4 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                    {rel.title}
                  </h4>

                  <p style={{
                    color: '#64748b',
                    fontSize: '0.86rem',
                    lineHeight: 1.55,
                    marginBottom: '18px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {rel.shortDescription}
                  </p>

                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link
                      to={`/specialization-services/${rel.slug}`}
                      style={{
                        color: 'var(--primary)',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        textDecoration: 'none'
                      }}
                    >
                      <span>Learn More</span>
                      <ArrowRight size={13} />
                    </Link>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      Dept: Neurology
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
