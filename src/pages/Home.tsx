import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, PhoneCall, Stethoscope, Building2, MapPin, Award, ShieldCheck, HeartPulse, Sparkles, Navigation, ExternalLink, Star, CheckCircle, Clock } from 'lucide-react';
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

export default function Home() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [settings, setSettings] = useState<LocationSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Parallel fetches from database
    Promise.all([
      fetch('/api/public/departments').then(r => r.json()),
      fetch('/api/public/doctors').then(r => r.json()),
      fetch('/api/public/blogs').then(r => r.json()),
      fetch('/api/public/settings').then(r => r.json())
    ])
      .then(([deptsData, doctorsData, blogsData, settingsData]) => {
        setDepartments(deptsData.slice(0, 3));
        setDoctors(doctorsData.slice(0, 3));
        setBlogs(blogsData.slice(0, 2));
        if (settingsData && settingsData.address) {
          setSettings(settingsData);
        }
      })
      .catch((err) => console.error("Error loading home page details", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fade-in">
      {/* 1. HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #f0f7ff 0%, #e0f2fe 100%)',
        padding: '100px 0 80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background shapes */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,148,136,0.1) 0%, transparent 70%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '30px' }}>
            <div>
              <div className="float-element" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '16px'
              }}>
                <Sparkles size={14} />
                <span>Specialized Neuro & Medical Care</span>
              </div>
              <h1 style={{
                fontSize: 'clamp(2rem, 5.5vw, 3.5rem)',
                color: 'var(--primary)',
                lineHeight: '1.15',
                marginBottom: '16px',
                fontWeight: '800'
              }}>
                Compassionate Care. <br />
                <span style={{ color: 'var(--secondary)' }}>Advanced Expertise.</span>
              </h1>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                lineHeight: '1.6',
                marginBottom: '28px',
                maxWidth: '520px'
              }}>
                Nirmala Neuro & General Medical Centre offers state-of-the-art neurology testing and comprehensive diagnostic treatments for complete wellness.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/appointment" className="btn btn-primary">
                  <Calendar size={18} />
                  <span>Book Appointment</span>
                </Link>
                <Link to="/emergency" className="btn btn-danger">
                  <PhoneCall size={18} />
                  <span>Emergency Desk</span>
                </Link>
              </div>
            </div>
            
            {/* Hero Image with Floating Glass Trust Badges */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'visible',
                width: '100%',
                maxWidth: '480px'
              }}>
                {/* Top Floating Badge */}
                <div className="hero-glass-pill hero-glass-pill-top float-element">
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Star size={16} fill="#d97706" />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block', lineHeight: 1.1 }}>15+ Years</strong>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Clinical Excellence</span>
                  </div>
                </div>

                <div style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-premium)',
                  border: '4px solid white'
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800"
                    alt="Nirmala Medical Facility"
                    style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
                  />
                </div>

                {/* Bottom Floating Badge */}
                <div className="hero-glass-pill hero-glass-pill-bottom float-element" style={{ animationDelay: '1.5s' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <HeartPulse size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block', lineHeight: 1.1 }}>50,000+</strong>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Happy Patients Treated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACCESS CARDS */}
      <section style={{ marginTop: '-40px', position: 'relative', zIndex: 10, padding: '0 0 40px 0' }}>
        <div className="container">
          <div className="grid grid-3" style={{ gap: '20px' }}>
            {/* Find Doctor */}
            <Link to="/doctors" className="card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stethoscope size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Find a Doctor</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Search and connect with our experienced general physicians and neuro specialists.</p>
              <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem', marginTop: 'auto' }}>Search Doctors →</span>
            </Link>

            {/* View Departments */}
            <Link to="/departments" className="card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--secondary-light)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Our Departments</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Explore our specialized clinics including Neurology, Neurodiagnostics, and General Medicine.</p>
              <span style={{ color: 'var(--secondary)', fontWeight: '600', fontSize: '0.9rem', marginTop: 'auto' }}>View Services →</span>
            </Link>

            {/* Quick Contact */}
            <Link to="/contact" className="card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ffe4e6', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Contact & Location</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Find our hospital coordinates, map directions, outpatient timings, and contact numbers.</p>
              <span style={{ color: 'var(--danger)', fontWeight: '600', fontSize: '0.9rem', marginTop: 'auto' }}>Locate Us →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. ABOUT INTRODUCTION */}
      <section className="section" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '60px' }}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
                alt="Hospital Interior"
                style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', width: '100%' }}
              />
            </div>
            <div>
              <span style={{ color: 'var(--secondary)', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Welcome to Nirmala Hospital</span>
              <h2 style={{ fontSize: '2.25rem', color: 'var(--primary)', marginTop: '8px', marginBottom: '20px' }}>Leading Neuro & General Medical Services</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.7' }}>
                Nirmala Neuro & General Medical Centre is a trusted healthcare facility dedicated to clinical excellence. Located in Vizianagaram, Andhra Pradesh, we provide a broad spectrum of consultation and treatment options.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '30px', lineHeight: '1.7' }}>
                We specialize in all kinds of Neurological Problems, Epilepsy, Stroke, Migraine, Vertigo, Sleep Disorders and General Medical Problems, providing dedicated primary care and health checkups.
              </p>
              <Link to="/about" className="btn btn-outline">Learn More About Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLINICAL DEPARTMENTS */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Our Specialties</h2>
            <p>We provide comprehensive diagnostics and care through our major medical divisions.</p>
          </div>

          {loading ? (
            <div className="spinner-container"><div className="spinner" /></div>
          ) : (
            <div className="grid grid-3">
              {departments.map((dept) => (
                <div key={dept.id} className="card">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{dept.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                      {dept.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Link to={`/departments/${dept.slug}`} style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>Read Details →</Link>
                      <Link to="/appointment" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>Book</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/departments" className="btn btn-secondary">Explore All Departments</Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
        <div className="container">
          <div className="section-title" style={{ color: 'white' }}>
            <h2 style={{ color: 'white' }}>Why Patients Trust Us</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>We are committed to delivering the highest quality patient care and clinical outcomes.</p>
          </div>

          <div className="grid grid-4" style={{ gap: '30px', textAlign: 'center' }}>
            <div style={{ padding: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '10px' }}>Experienced Doctors</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>Consultations led by directors and clinicians with over a decade of specialty training.</p>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <HeartPulse size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '10px' }}>Patient-Centered Care</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>Individualized treatment regimes tailored specifically to patient clinical histories.</p>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '10px' }}>Advanced Diagnostics</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>State-of-the-art brain mapping, EEG, nerve conduction studies and clinical pathology.</p>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <PhoneCall size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '10px' }}>24/7 Trauma Desk</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>Round-the-clock emergency assistance and quick ambulance mobilization during critical alerts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5. PATIENT TESTIMONIALS & RECOVERY STORIES */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)' }}>
        <div className="container">
          <div className="section-title">
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
              <Star size={14} fill="currentColor" style={{ marginRight: '6px' }} /> Patient Experiences
            </span>
            <h2>Words from Our Recovered Patients</h2>
            <p>Real stories of healing and expert medical care at Nirmala Neuro & General Medical Centre.</p>
          </div>

          <div className="grid grid-3" style={{ gap: '24px' }}>
            {/* Testimonial 1 */}
            <div className="testimonial-card">
              <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '8px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" />
                ))}
              </div>
              <p className="testimonial-quote">
                "The neurology doctors at Nirmala Hospital diagnosed my chronic vertigo and migraines accurately after months of struggle elsewhere. The care and attention from the nursing team was exceptional."
              </p>
              <div className="testimonial-user">
                <div className="patient-avatar-circle">SV</div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', margin: 0, fontWeight: 700 }}>Srinivasa Varma</h4>
                  <span style={{ fontSize: '0.8rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <CheckCircle size={13} /> Verified Patient (Neurology Care)
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="testimonial-card">
              <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '8px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" />
                ))}
              </div>
              <p className="testimonial-quote">
                "We rushed my father during late night with high blood pressure complications. The 24/7 emergency team stabilized him within minutes. We are eternally grateful for their prompt response and modern facilities."
              </p>
              <div className="testimonial-user">
                <div className="patient-avatar-circle" style={{ background: 'linear-gradient(135deg, #0d9488 0%, #10b981 100%)' }}>RK</div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', margin: 0, fontWeight: 700 }}>Rama Krishna</h4>
                  <span style={{ fontSize: '0.8rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <CheckCircle size={13} /> Verified Patient (Emergency Care)
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="testimonial-card">
              <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '8px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" />
                ))}
              </div>
              <p className="testimonial-quote">
                "The online appointment booking and instant confirmation slip made the hospital visit completely hassle-free. Doctor explained everything with utmost patience and warmth."
              </p>
              <div className="testimonial-user">
                <div className="patient-avatar-circle" style={{ background: 'linear-gradient(135deg, #e11d48 0%, #f59e0b 100%)' }}>LP</div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', margin: 0, fontWeight: 700 }}>Lakshmi Prasanna</h4>
                  <span style={{ fontSize: '0.8rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <CheckCircle size={13} /> Verified Patient (General Medicine)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED CLINICIANS */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Our Expert Medical Staff</h2>
            <p>Our clinics are managed by board-certified healthcare professionals.</p>
          </div>

          {loading ? (
            <div className="spinner-container"><div className="spinner" /></div>
          ) : (
            <div className="grid grid-3">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="card" style={{ textAlign: 'center', padding: '30px' }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 20px auto',
                    border: '4px solid var(--border-color)',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }}
                    />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{doctor.name}</h3>
                  <span style={{ color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
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

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '6px' }}>{doctor.qualification}</p>
                  <p style={{ color: 'var(--text-dark)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '12px' }}>{doctor.specialization}</p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    <Clock size={14} style={{ color: 'var(--secondary)' }} />
                    <span>Mon – Sat: 10:00 AM – 7:00 PM</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    <Link to={`/doctors/${doctor.id}`} className="btn btn-light" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>View Profile</Link>
                    {doctor.status === 'INACTIVE' ? (
                      <button
                        className="btn btn-danger"
                        style={{ padding: '8px 16px', fontSize: '0.8rem', opacity: 0.7, cursor: 'not-allowed' }}
                        onClick={() => alert(`⚠️ Dr. ${doctor.name} is currently on leave and unavailable for appointments.\n\nPlease contact our reception desk at +91 6305471147 to book with another doctor or reschedule.`)}
                      >
                        Unavailable
                      </button>
                    ) : (
                      <Link to="/appointment" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Book Now</Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. LATEST HEALTH BLOGS */}
      <section className="section" style={{ backgroundColor: 'var(--bg-white)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Health Library & Advice</h2>
            <p>Stay updated with health guidelines written by our senior medical officers.</p>
          </div>

          {loading ? (
            <div className="spinner-container"><div className="spinner" /></div>
          ) : (
            <div className="grid grid-2">
              {blogs.map((blog) => (
                <div key={blog.id} className="card" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '0' }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      style={{ width: '100%', height: '100%', minHeight: '220px', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: '1.2 1 300px', padding: '30px', display: 'flex', flexDirection: 'column' }}>
                    <span className="badge badge-secondary" style={{ alignSelf: 'flex-start', marginBottom: '12px' }}>{blog.category}</span>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', lineHeight: '1.4' }}>
                      <Link to={`/blog/${blog.slug}`} style={{ color: 'var(--text-dark)' }}>{blog.title}</Link>
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                      By {blog.author} | {new Date(blog.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <Link to={`/blog/${blog.slug}`} style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem', marginTop: 'auto' }}>Read Full Post →</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. OUR LOCATION SECTION */}
      <section className="section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color, #e2e8f0)' }}>
        <div className="container">
          <div className="grid grid-2" style={{ gap: '40px', alignItems: 'center' }}>
            {/* Left Location Info */}
            <div>
              <span className="badge badge-secondary" style={{ marginBottom: '12px' }}>
                <MapPin size={14} style={{ marginRight: '6px' }} /> Hospital Location
              </span>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--primary)', marginBottom: '16px' }}>Our Location</h2>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: '700', marginBottom: '8px' }}>
                {settings?.hospitalName || "Nirmala Neuro & General Medical Centre"}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '28px' }}>
                {settings?.address || "Back of INOX Multiplex, Opposite RTC Complex, Fort Area, Vizianagaram, Andhra Pradesh - 535003"}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a
                  href={settings?.googleMapsDirectionsUrl || "https://www.google.com/maps/dir/?api=1&destination=18.1068468,83.3980718&destination_place_id=ChIJZQq5zUT1OzoR102LhkzA-uI"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ gap: '8px' }}
                >
                  <Navigation size={18} />
                  <span>Get Directions</span>
                </a>

                <a
                  href={settings?.googleMapsUrl || settings?.mapLink || "https://www.google.com/maps/place/Nirmala+Neuro+%26+General+Medical+Centre/@18.1068518,83.3932009,17z/data=!4m14!1m7!3m6!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!2sNirmala+Neuro+%26+General+Medical+Centre!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7!3m5!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7?entry=ttu"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ gap: '8px' }}
                >
                  <ExternalLink size={18} />
                  <span>Open in Google Maps</span>
                </a>

                <Link
                  to="/contact"
                  className="btn btn-secondary"
                  style={{ gap: '8px' }}
                >
                  <MapPin size={18} />
                  <span>View Full Map</span>
                </Link>
              </div>
            </div>

            {/* Right Map Preview */}
            <div>
              <GoogleMapLocation settings={settings} variant="compact" height="340px" showSidebar={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
