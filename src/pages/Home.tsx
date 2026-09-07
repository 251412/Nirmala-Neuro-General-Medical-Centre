import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, PhoneCall, Stethoscope, Building2, MapPin, Award,
  ShieldCheck, HeartPulse, Sparkles, Navigation, ExternalLink,
  Star, CheckCircle, Clock, ChevronLeft, ChevronRight, Users,
  Activity
} from 'lucide-react';
import GoogleMapLocation, { type LocationSettings } from '../components/GoogleMapLocation';

interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

interface Doctor {
  id: string;
  name: string;
  photo: string;
  qualification: string;
  specialization: string;
  designation: string;
  status: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  author: string;
  publishedAt: string;
  category: string;
}

/* ─── Skeleton Components ─────────────────────────────── */
function DeptSkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton skeleton-line skeleton-line-lg" style={{ width: '65%', marginBottom: '12px' }} />
        <div className="skeleton skeleton-line" style={{ width: '90%' }} />
        <div className="skeleton skeleton-line" style={{ width: '75%', marginBottom: '20px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="skeleton skeleton-line" style={{ width: '30%', height: '12px' }} />
          <div className="skeleton skeleton-btn" />
        </div>
      </div>
    </div>
  );
}

function DoctorSkeletonCard() {
  return (
    <div className="skeleton-card" style={{ padding: '30px', textAlign: 'center' }}>
      <div className="skeleton skeleton-avatar" />
      <div className="skeleton-body-center">
        <div className="skeleton skeleton-line skeleton-line-lg" style={{ width: '60%', marginBottom: '8px' }} />
        <div className="skeleton skeleton-line skeleton-line-sm" style={{ width: '45%', marginBottom: '12px' }} />
        <div className="skeleton skeleton-line skeleton-line-sm" style={{ width: '80%', marginBottom: '8px' }} />
        <div className="skeleton skeleton-line skeleton-line-sm" style={{ width: '70%', marginBottom: '24px' }} />
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <div className="skeleton skeleton-btn" />
          <div className="skeleton skeleton-btn" />
        </div>
      </div>
    </div>
  );
}

function BlogSkeletonCard() {
  return (
    <div className="skeleton-card" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <div className="skeleton" style={{ flex: '1 1 260px', minHeight: '220px' }} />
      <div className="skeleton-body" style={{ flex: '1.2 1 260px', padding: '30px' }}>
        <div className="skeleton skeleton-line skeleton-line-sm" style={{ width: '35%', marginBottom: '14px' }} />
        <div className="skeleton skeleton-line skeleton-line-lg" style={{ width: '90%', marginBottom: '8px' }} />
        <div className="skeleton skeleton-line skeleton-line-lg" style={{ width: '70%', marginBottom: '14px' }} />
        <div className="skeleton skeleton-line skeleton-line-sm" style={{ width: '50%', marginBottom: '24px' }} />
        <div className="skeleton skeleton-line skeleton-line-sm" style={{ width: '30%' }} />
      </div>
    </div>
  );
}

/* ─── Testimonial Carousel ────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    quote: '"The neurology doctors at Nirmala Hospital diagnosed my chronic vertigo and migraines accurately after months of struggle elsewhere. The care and attention from the nursing team was exceptional."',
    initials: 'SV',
    name: 'Srinivasa Varma',
    tag: 'Verified Patient (Neurology Care)',
    avatarStyle: {},
  },
  {
    id: 2,
    quote: '"We rushed my father during late night with high blood pressure complications. The 24/7 emergency team stabilized him within minutes. We are eternally grateful for their prompt response and modern facilities."',
    initials: 'RK',
    name: 'Rama Krishna',
    tag: 'Verified Patient (Emergency Care)',
    avatarStyle: { background: 'linear-gradient(135deg, #0d9488 0%, #10b981 100%)' },
  },
  {
    id: 3,
    quote: '"The online appointment booking and instant confirmation slip made the hospital visit completely hassle-free. Doctor explained everything with utmost patience and warmth."',
    initials: 'LP',
    name: 'Lakshmi Prasanna',
    tag: 'Verified Patient (General Medicine)',
    avatarStyle: { background: 'linear-gradient(135deg, #e11d48 0%, #f59e0b 100%)' },
  },
];

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = TESTIMONIALS.length;

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + total) % total);
  }, [total]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(goNext, 5000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovered, goNext]);

  const t = TESTIMONIALS[current];

  return (
    <div
      className="testimonial-carousel-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Single visible slide */}
      <div className="testimonial-card" key={t.id}>
        <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '8px' }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill="#f59e0b" />
          ))}
        </div>
        <p className="testimonial-quote">{t.quote}</p>
        <div className="testimonial-user">
          <div className="patient-avatar-circle" style={t.avatarStyle}>{t.initials}</div>
          <div>
            <h4 style={{ fontSize: '1rem', color: '#0f172a', margin: 0, fontWeight: 700 }}>{t.name}</h4>
            <span style={{ fontSize: '0.8rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <CheckCircle size={13} /> {t.tag}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="testimonial-controls">
        <button className="testimonial-arrow" onClick={goPrev} aria-label="Previous testimonial">
          <ChevronLeft size={18} />
        </button>
        <div className="testimonial-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot${i === current ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button className="testimonial-arrow" onClick={goNext} aria-label="Next testimonial">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* ─── Main Home Component ─────────────────────────────── */
export default function Home() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [settings, setSettings] = useState<LocationSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/public/departments').then(r => r.json()),
      fetch('/api/public/doctors').then(r => r.json()),
      fetch('/api/public/blogs').then(r => r.json()),
      fetch('/api/public/settings').then(r => r.json()),
    ])
      .then(([deptsData, doctorsData, blogsData, settingsData]) => {
        setDepartments(deptsData.slice(0, 3));
        setDoctors(doctorsData.slice(0, 3));
        setBlogs(blogsData.slice(0, 2));
        if (settingsData && settingsData.address) {
          setSettings(settingsData);
        }
      })
      .catch((err) => console.error('Error loading home page details', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* ===================================================
          1. HERO SECTION
          =================================================== */}
      <section style={{
        background: 'linear-gradient(140deg, #eef6ff 0%, #e0f2fe 55%, #ccfbf1 100%)',
        padding: 'clamp(80px, 12vw, 120px) 0 clamp(60px, 8vw, 90px)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'clamp(520px, 75vh, 780px)',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Background blobs */}
        <div className="hero-blob" style={{
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(13,148,136,0.09) 0%, transparent 70%)',
          top: '-20%', right: '-12%',
        }} />
        <div className="hero-blob" style={{
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(15,76,129,0.07) 0%, transparent 70%)',
          bottom: '-10%', left: '-8%',
        }} />
        {/* Subtle medical cross pattern – top right */}
        <svg
          style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.05, zIndex: 0, pointerEvents: 'none' }}
          width="160" height="160" viewBox="0 0 160 160" fill="none"
          aria-hidden="true"
        >
          <rect x="60" y="0" width="40" height="160" rx="10" fill="#0f4c81" />
          <rect x="0" y="60" width="160" height="40" rx="10" fill="#0f4c81" />
        </svg>

        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div className="grid grid-2" style={{ alignItems: 'center', gap: 'clamp(24px, 5vw, 56px)' }}>
            {/* Left: text */}
            <div>
              {/* Badge */}
              <div className="hero-animate-badge" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'clamp(0.72rem, 2vw, 0.82rem)',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '18px',
                border: '1px solid rgba(15,76,129,0.12)',
              }}>
                <Sparkles size={14} />
                <span>Specialized Neuro &amp; Medical Care</span>
              </div>

              {/* Heading */}
              <h1 className="hero-animate-h1" style={{
                fontSize: 'clamp(2rem, 5vw, 3.4rem)',
                color: 'var(--primary)',
                lineHeight: '1.13',
                marginBottom: '18px',
                fontWeight: '800',
                letterSpacing: '-0.5px',
              }}>
                Expert Care.{' '}
                <span style={{ color: 'var(--secondary)' }}>Advanced Treatment.</span>
                <br />
                Compassionate Healing.
              </h1>

              {/* Description */}
              <p className="hero-animate-p" style={{
                color: 'var(--text-muted)',
                fontSize: 'clamp(0.98rem, 2.2vw, 1.15rem)',
                lineHeight: '1.65',
                marginBottom: '32px',
                maxWidth: '500px',
              }}>
                Comprehensive neurological and general medical care focused on your health, comfort and recovery.
                Trusted by thousands of patients across Vizianagaram.
              </p>

              {/* CTAs */}
              <div className="hero-animate-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/doctors" className="btn btn-outline" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                  <Stethoscope size={18} />
                  <span>Our Doctors</span>
                </Link>
                <Link to="/emergency" className="btn btn-danger" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                  <PhoneCall size={18} />
                  <span>Emergency</span>
                </Link>
              </div>
            </div>

            {/* Right: hero image + floating badges */}
            <div className="hero-animate-img" style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'visible',
                width: '100%',
                maxWidth: '480px',
              }}>
                {/* Top floating badge */}
                <div className="hero-glass-pill hero-glass-pill-top float-element">
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Star size={16} fill="#d97706" />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.87rem', color: '#0f172a', display: 'block', lineHeight: 1.1 }}>15+ Years</strong>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Clinical Excellence</span>
                  </div>
                </div>

                {/* Main image */}
                <div style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-premium)',
                  border: '4px solid white',
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800"
                    alt="Nirmala Neuro & General Medical Centre facility"
                    style={{ width: '100%', maxHeight: '440px', objectFit: 'cover', display: 'block' }}
                    loading="eager"
                  />
                </div>

                {/* Bottom floating badge */}
                <div className="hero-glass-pill hero-glass-pill-bottom float-element" style={{ animationDelay: '1.5s' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <HeartPulse size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.87rem', color: '#0f172a', display: 'block', lineHeight: 1.1 }}>50,000+</strong>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Happy Patients Treated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          2. QUICK ACTION CARDS
          =================================================== */}
      <section style={{ marginTop: '-44px', position: 'relative', zIndex: 10, padding: '0 0 48px 0' }}>
        <div className="container">
          {/* 5-card grid: auto-fit for responsiveness */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
            gap: '16px',
          }}
            className="reveal reveal-stagger"
          >
            {/* Book Appointment */}
            <Link to="/appointment" className="quick-action-card">
              <div className="quick-action-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                <Calendar size={24} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Book Appointment</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                Schedule a visit with our specialist doctors online.
              </p>
              <span className="quick-action-arrow" style={{ color: 'var(--primary)' }}>Book Now →</span>
            </Link>

            {/* Find a Doctor */}
            <Link to="/doctors" className="quick-action-card">
              <div className="quick-action-icon" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}>
                <Stethoscope size={24} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Find a Doctor</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                Search and connect with our experienced specialists.
              </p>
              <span className="quick-action-arrow" style={{ color: 'var(--secondary)' }}>Search →</span>
            </Link>

            {/* Departments */}
            <Link to="/departments" className="quick-action-card">
              <div className="quick-action-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                <Building2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Our Departments</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                Explore our specialized medical departments.
              </p>
              <span className="quick-action-arrow" style={{ color: '#7c3aed' }}>View →</span>
            </Link>

            {/* Emergency Care */}
            <Link to="/emergency" className="quick-action-card">
              <div className="quick-action-icon" style={{ background: '#ffe4e6', color: 'var(--danger)' }}>
                <Activity size={24} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Emergency Care</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                24/7 emergency assistance &amp; rapid trauma response.
              </p>
              <span className="quick-action-arrow" style={{ color: 'var(--danger)' }}>Call Now →</span>
            </Link>

            {/* Contact & Location */}
            <Link to="/contact" className="quick-action-card">
              <div className="quick-action-icon" style={{ background: '#fef9c3', color: '#a16207' }}>
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Contact &amp; Location</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                Find our hospital address, map directions &amp; timings.
              </p>
              <span className="quick-action-arrow" style={{ color: '#a16207' }}>Locate Us →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================
          3. ABOUT / INTRODUCTION SECTION
          =================================================== */}
      <section className="section" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: 'clamp(32px, 6vw, 72px)' }}>
            {/* Image – slide from left */}
            <div className="reveal-left about-img-frame">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
                alt="Nirmala Hospital Interior – modern medical facility"
                loading="lazy"
              />
            </div>
            {/* Text – slide from right */}
            <div className="reveal-right">
              <span style={{
                color: 'var(--secondary)', fontWeight: '700', fontSize: '0.88rem',
                textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: '10px',
              }}>
                Welcome to Nirmala Hospital
              </span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.35rem)', color: 'var(--primary)', marginBottom: '20px' }}>
                Leading Neuro &amp; General Medical Services
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.75', fontSize: '0.97rem' }}>
                Nirmala Neuro &amp; General Medical Centre is a trusted healthcare facility dedicated to clinical excellence.
                Located in Vizianagaram, Andhra Pradesh, we provide a broad spectrum of consultation and treatment options.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.75', fontSize: '0.97rem' }}>
                We specialize in all kinds of Neurological Problems, Epilepsy, Stroke, Migraine, Vertigo, Sleep Disorders
                and General Medical Problems, providing dedicated primary care and health checkups.
              </p>
              <Link to="/about" className="btn btn-outline">Learn More About Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          4. DEPARTMENTS SECTION
          =================================================== */}
      <section className="section reveal">
        <div className="container">
          <div className="section-title">
            <h2>Our Specialties</h2>
            <p>Comprehensive diagnostics and care through our major medical divisions.</p>
          </div>

          {loading ? (
            <div className="grid grid-3">
              <DeptSkeletonCard />
              <DeptSkeletonCard />
              <DeptSkeletonCard />
            </div>
          ) : departments.length > 0 ? (
            <div className="grid grid-3 reveal-stagger">
              {departments.map((dept) => (
                <div key={dept.id} className="card reveal">
                  <div style={{ overflow: 'hidden' }}>
                    <img
                      src={dept.image}
                      alt={dept.name}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{dept.name}</h3>
                    <p style={{
                      color: 'var(--text-muted)', fontSize: '0.85rem',
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      overflow: 'hidden', lineHeight: '1.6', marginBottom: '20px',
                    }}>
                      {dept.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Link to={`/departments/${dept.slug}`} style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.88rem' }}>
                        View Department →
                      </Link>
                      <Link to="/appointment" className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>Book</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Building2 size={40} />
              <p>Departments information coming soon.</p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/departments" className="btn btn-secondary">Explore All Departments</Link>
          </div>
        </div>
      </section>

      {/* ===================================================
          5. WHY CHOOSE US
          =================================================== */}
      <section className="section reveal" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
        <div className="container">
          <div className="section-title" style={{ color: 'white' }}>
            <h2 style={{ color: 'white' }}>Why Patients Trust Us</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>Committed to delivering the highest quality patient care and clinical outcomes.</p>
          </div>

          <div className="grid grid-4" style={{ gap: '24px' }}>
            <div className="why-choose-item">
              <div className="why-choose-icon">
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'white', marginBottom: '10px' }}>Experienced Doctors</h3>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.78)' }}>
                Consultations led by clinicians with over a decade of specialty training.
              </p>
            </div>

            <div className="why-choose-item">
              <div className="why-choose-icon">
                <HeartPulse size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'white', marginBottom: '10px' }}>Patient-Centered Care</h3>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.78)' }}>
                Individualized treatment regimes tailored to each patient's clinical history.
              </p>
            </div>

            <div className="why-choose-item">
              <div className="why-choose-icon">
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'white', marginBottom: '10px' }}>Advanced Diagnostics</h3>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.78)' }}>
                State-of-the-art EEG, nerve conduction studies and clinical pathology services.
              </p>
            </div>

            <div className="why-choose-item">
              <div className="why-choose-icon">
                <PhoneCall size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'white', marginBottom: '10px' }}>24/7 Emergency Desk</h3>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.78)' }}>
                Round-the-clock emergency assistance and rapid response during critical alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          5.5. TESTIMONIALS CAROUSEL
          =================================================== */}
      <section className="section reveal" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)' }}>
        <div className="container">
          <div className="section-title">
            <span className="badge badge-primary" style={{ marginBottom: '12px', display: 'inline-flex' }}>
              <Star size={14} fill="currentColor" style={{ marginRight: '6px' }} /> Patient Experiences
            </span>
            <h2>Words from Our Recovered Patients</h2>
            <p>Real stories of healing and expert medical care at Nirmala Neuro &amp; General Medical Centre.</p>
          </div>

          {/* Carousel: max width for readability */}
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* ===================================================
          6. DOCTORS SECTION
          =================================================== */}
      <section className="section reveal">
        <div className="container">
          <div className="section-title">
            <h2>Our Expert Medical Staff</h2>
            <p>Our clinics are managed by board-certified healthcare professionals.</p>
          </div>

          {loading ? (
            <div className="grid grid-3">
              <DoctorSkeletonCard />
              <DoctorSkeletonCard />
              <DoctorSkeletonCard />
            </div>
          ) : doctors.length > 0 ? (
            <div className="grid grid-3 reveal-stagger">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="card reveal" style={{ textAlign: 'center', padding: '30px' }}>
                  {/* Doctor photo – preserve aspect ratio, no crop */}
                  <div style={{
                    width: '140px', height: '140px',
                    borderRadius: '50%', overflow: 'hidden',
                    margin: '0 auto 20px auto',
                    border: '4px solid var(--border-color)',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}>
                    <img
                      src={doctor.photo}
                      alt={`Dr. ${doctor.name}`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }}
                      loading="lazy"
                    />
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{doctor.name}</h3>
                  <span style={{
                    color: 'var(--secondary)', fontSize: '0.82rem', fontWeight: '700',
                    textTransform: 'uppercase', display: 'block', marginBottom: '10px', letterSpacing: '0.5px',
                  }}>
                    {doctor.designation}
                  </span>

                  <div style={{ marginBottom: '14px' }}>
                    {doctor.status === 'INACTIVE' ? (
                      <span className="doctor-inactive-badge">
                        <span className="live-status-dot-red" />
                        On Leave / Not Available
                      </span>
                    ) : (
                      <span className="doctor-opd-badge">
                        <span className="live-status-dot" />
                        Available for Consultation
                      </span>
                    )}
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '6px' }}>{doctor.qualification}</p>
                  <p style={{ color: 'var(--text-dark)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '14px' }}>{doctor.specialization}</p>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '22px',
                  }}>
                    <Clock size={13} style={{ color: 'var(--secondary)' }} />
                    <span>Mon – Sat: 10:00 AM – 7:00 PM</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <Link to={`/doctors/${doctor.id}`} className="btn btn-light" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                      View Profile
                    </Link>
                    {doctor.status === 'INACTIVE' ? (
                      <button
                        className="btn btn-danger"
                        style={{ padding: '8px 16px', fontSize: '0.8rem', opacity: 0.7, cursor: 'not-allowed' }}
                        onClick={() => alert(`⚠️ Dr. ${doctor.name} is currently on leave.\n\nPlease contact our reception at +91 6305471147 to book with another doctor.`)}
                      >
                        Unavailable
                      </button>
                    ) : (
                      <Link to="/appointment" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                        Book Now
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Users size={40} />
              <p>Doctor profiles coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================
          7. APPOINTMENT CTA SECTION (new)
          =================================================== */}
      <section className="cta-section reveal-scale">
        <div className="cta-section-bg-animated" />
        {/* Floating abstract shapes */}
        <div className="cta-shape cta-shape-1" />
        <div className="cta-shape cta-shape-2" />
        <div className="cta-shape cta-shape-3" />

        <div className="container cta-section-content">
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.25)',
            padding: '5px 16px', borderRadius: 'var(--radius-full)',
            fontSize: '0.78rem', fontWeight: '700', letterSpacing: '1px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)',
            marginBottom: '20px',
          }}>
            <HeartPulse size={14} /> Patient Care
          </span>

          <h2>Your Health Deserves<br />the Right Care</h2>
          <p>
            Book an appointment with our experienced medical team today.
            We are here to guide you on your journey to recovery and wellness.
          </p>

          <div className="cta-btn-group">
            <Link to="/appointment" className="btn btn-white">
              <Calendar size={18} />
              Book an Appointment
            </Link>
            <Link to="/doctors" className="btn btn-outline-white">
              <Stethoscope size={18} />
              Meet Our Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================
          8. BLOG / HEALTH ARTICLES
          =================================================== */}
      <section className="section reveal" style={{
        backgroundColor: 'var(--bg-white)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <div className="container">
          <div className="section-title">
            <h2>Health Library &amp; Advice</h2>
            <p>Stay updated with health guidelines written by our senior medical officers.</p>
          </div>

          {loading ? (
            <div className="grid grid-2">
              <BlogSkeletonCard />
              <BlogSkeletonCard />
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-2 reveal-stagger">
              {blogs.map((blog) => (
                <div key={blog.id} className="card reveal" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '0' }}>
                  <div style={{ flex: '1 1 260px', overflow: 'hidden' }}>
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      style={{ width: '100%', height: '100%', minHeight: '220px', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                  <div style={{ flex: '1.2 1 260px', padding: '28px', display: 'flex', flexDirection: 'column' }}>
                    <span className="badge badge-secondary" style={{ alignSelf: 'flex-start', marginBottom: '12px' }}>{blog.category}</span>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '12px', lineHeight: '1.45' }}>
                      <Link to={`/blog/${blog.slug}`} style={{ color: 'var(--text-dark)' }}>{blog.title}</Link>
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                      By {blog.author} | {new Date(blog.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <Link to={`/blog/${blog.slug}`} style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.88rem', marginTop: 'auto' }}>
                      Read Full Post →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* ===================================================
          9. LOCATION SECTION
          =================================================== */}
      <section className="section reveal" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color, #e2e8f0)' }}>
        <div className="container">
          <div className="grid grid-2" style={{ gap: '40px', alignItems: 'center' }}>
            {/* Left: address info */}
            <div className="reveal-left">
              <span className="badge badge-secondary" style={{ marginBottom: '14px' }}>
                <MapPin size={14} style={{ marginRight: '6px' }} /> Hospital Location
              </span>
              <h2 style={{ fontSize: '2.1rem', color: 'var(--primary)', marginBottom: '16px' }}>Our Location</h2>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: '700', marginBottom: '10px' }}>
                {settings?.hospitalName || 'Nirmala Neuro & General Medical Centre'}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '28px' }}>
                {settings?.address || 'Back of INOX Multiplex, Opposite RTC Complex, Fort Area, Vizianagaram, Andhra Pradesh - 535003'}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a
                  href={settings?.googleMapsDirectionsUrl || 'https://www.google.com/maps/dir/?api=1&destination=18.1068468,83.3980718&destination_place_id=ChIJZQq5zUT1OzoR102LhkzA-uI'}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary" style={{ gap: '8px' }}
                >
                  <Navigation size={18} />
                  <span>Get Directions</span>
                </a>
                <a
                  href={settings?.googleMapsUrl || settings?.mapLink || 'https://www.google.com/maps/place/Nirmala+Neuro+%26+General+Medical+Centre/@18.1068518,83.3932009,17z/data=!4m14!1m7!3m6!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!2sNirmala+Neuro+%26+General+Medical+Centre!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7!3m5!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7?entry=ttu'}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-outline" style={{ gap: '8px' }}
                >
                  <ExternalLink size={18} />
                  <span>Open in Google Maps</span>
                </a>
                <Link to="/contact" className="btn btn-secondary" style={{ gap: '8px' }}>
                  <MapPin size={18} />
                  <span>View Full Map</span>
                </Link>
              </div>
            </div>

            {/* Right: map */}
            <div className="reveal-right">
              <GoogleMapLocation settings={settings} variant="compact" height="340px" showSidebar={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
