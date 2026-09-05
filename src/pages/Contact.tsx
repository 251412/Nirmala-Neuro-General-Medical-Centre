import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import formStyles from '../styles/Forms.module.css';
import GoogleMapLocation, { type LocationSettings } from '../components/GoogleMapLocation';

interface SiteSettings extends LocationSettings {
  phone: string;
  email: string;
  workingHours?: string;
  emergencyNumber: string;
}

export default function Contact() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const DEFAULT_SETTINGS: SiteSettings = {
    hospitalName: 'Nirmala Neuro & General Medical Centre',
    address: 'Back of INOX Multiplex, Opposite RTC Complex, Fort Area, Vizianagaram, Andhra Pradesh - 535003',
    city: 'Vizianagaram',
    state: 'Andhra Pradesh',
    country: 'India',
    pincode: '535003',
    latitude: 18.1068468,
    longitude: 83.3980718,
    phone: '6305471147 / 6302963312',
    email: 'nirmalaneurocare@gmail.com',
    workingHours: 'Sunday to Friday: 09:30 AM to 6:30 PM | Saturday: Closed',
    googleMapsUrl: 'https://www.google.com/maps/place/Nirmala+Neuro+%26+General+Medical+Centre/@18.1068518,83.3932009,17z/data=!4m14!1m7!3m6!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!2sNirmala+Neuro+%26+General+Medical+Centre!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7!3m5!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7?entry=ttu',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=18.1068468,83.3980718&destination_place_id=ChIJZQq5zUT1OzoR102LhkzA-uI',
    mapInformation: 'https://maps.google.com/maps?q=18.1068468,83.3980718+(Nirmala+Neuro+%26+General+Medical+Centre)&t=m&z=17&ie=UTF8&iwloc=B&output=embed',
    mapLink: 'https://www.google.com/maps/place/Nirmala+Neuro+%26+General+Medical+Centre/@18.1068518,83.3932009,17z/data=!4m14!1m7!3m6!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!2sNirmala+Neuro+%26+General+Medical+Centre!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7!3m5!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7?entry=ttu',
    emergencyNumber: '6305471147 / 6302963312'
  };

  useEffect(() => {
    fetch('/api/public/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.address) {
          setSettings({ ...DEFAULT_SETTINGS, ...data });
        } else {
          setSettings(DEFAULT_SETTINGS);
        }
      })
      .catch(() => {
        setSettings(DEFAULT_SETTINGS);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'phone') {
      // Remove any non-digit character
      const rawValue = e.target.value.replace(/\D/g, '');
      // If starts with 91, it might be the prefix, but since we are locking it, we can just take the last 10 digits if they paste it, or limit it.
      // But simpler: just allow up to 10 digits.
      const numberPart = rawValue.slice(0, 10);
      setFormData({ ...formData, phone: numberPart });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.name || !formData.phone || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccessMsg('Thank you for reaching out! Your message has been submitted to our hospital desk. We will respond shortly.');
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        setErrorMsg(data.message || 'Failed to submit contact message. Please try again.');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred. Please try calling our hospital desk directly.');
    } finally {
      setSubmitting(false);
    }
  };

  // Structured Data (JSON-LD) for LocalBusiness/MedicalOrganization
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": settings?.hospitalName || DEFAULT_SETTINGS.hospitalName,
    "image": "https://nirmalaneuro.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Back of INOX Multiplex, Opposite RTC Complex, Fort Area",
      "addressLocality": "Vizianagaram",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "535003",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.1068468,
      "longitude": 83.3980718
    },
    "url": "https://nirmalaneuro.com",
    "telephone": settings?.phone || DEFAULT_SETTINGS.phone,
    "email": settings?.email || DEFAULT_SETTINGS.email,
    "hasMap": settings?.googleMapsUrl || DEFAULT_SETTINGS.googleMapsUrl
  };

  return (
    <div className="animate-fade-in">
      {/* Local Business Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #0d3c66 100%)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '8px' }}>Contact Us</h1>
          <p style={{ color: '#93c5fd', fontSize: '1.05rem' }}>Get in touch with our administrative desk or visit our medical center.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container contact-container">
          <div className="grid grid-2 contact-grid" style={{ gap: '40px', alignItems: 'flex-start' }}>
            {/* Col 1: Contact Details */}
            <div>
              <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '16px' }}>Get In Touch</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
                Have questions about our consultation hours, neurology tests, or general medical facilities? Reach out through any of our channels below.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Hospital Address</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.5' }}>
                      {settings?.address || DEFAULT_SETTINGS.address}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--secondary-light)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Phone / Desk</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>{settings?.phone || DEFAULT_SETTINGS.phone}</p>
                    <p style={{ color: 'var(--danger)', fontSize: '0.875rem', fontWeight: '700', marginTop: '2px' }}>
                      Emergency 24/7: {settings?.emergencyNumber || DEFAULT_SETTINGS.emergencyNumber}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Email Address</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>{settings?.email || DEFAULT_SETTINGS.email}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Working Hours</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>{settings?.workingHours || DEFAULT_SETTINGS.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2: Contact Form */}
            <div className={formStyles.formCard} style={{ margin: 0, width: '100%', maxWidth: '100%' }}>
              <h3 className={formStyles.title}>Send Us a Message</h3>
              <p className={formStyles.subtitle}>Fill out the form below for general enquiries or feedback.</p>

              {successMsg && (
                <div className={`${formStyles.alert} ${formStyles.alertSuccess}`}>
                  <CheckCircle2 size={20} className={formStyles.alertIcon} />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className={`${formStyles.alert} ${formStyles.alertError}`}>
                  <AlertCircle size={20} className={formStyles.alertIcon} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={formStyles.fieldGroup}>
                  <label className={formStyles.label}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={formStyles.input}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className={formStyles.fieldRow}>
                  <div>
                    <label className={formStyles.label}>Phone Number *</label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '10px', background: '#ffffff', overflow: 'hidden' }}>
                      <span style={{ padding: '10px 14px', background: '#f8fafc', color: '#475569', fontWeight: '600', borderRight: '1px solid #cbd5e1', flexShrink: 0 }}>+91</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={formStyles.input}
                        style={{ border: 'none', borderRadius: '0', flex: 1, outline: 'none' }}
                        placeholder="9876543210"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className={formStyles.label}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={formStyles.input}
                      placeholder="patient@example.com"
                      required
                    />
                  </div>
                </div>

                <div className={formStyles.fieldGroup}>
                  <label className={formStyles.label}>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={formStyles.input}
                    placeholder="e.g. Enquiry regarding EEG test pricing"
                    required
                  />
                </div>

                <div className={formStyles.fieldGroup}>
                  <label className={formStyles.label}>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={formStyles.textarea}
                    placeholder="Write your message here..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', marginTop: '10px' }}
                >
                  {submitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Google Map Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-main, #f8fafc)', borderTop: '1px solid var(--border-color, #e2e8f0)', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ color: 'var(--secondary, #0284c7)', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Hospital Location
            </span>
            <h2 style={{ fontSize: '2.25rem', color: 'var(--primary, #0f2b48)', marginTop: '6px' }}>
              Find Us on Google Maps
            </h2>
            <p style={{ color: 'var(--text-muted, #64748b)', maxWidth: '600px', margin: '8px auto 0 auto' }}>
              Visit Nirmala Neuro & General Medical Centre located right opposite RTC Complex, behind INOX Multiplex in Vizianagaram.
            </p>
          </div>

          <GoogleMapLocation settings={settings} variant="full" height="480px" showSidebar={true} />
        </div>
      </section>
    </div>
  );
}
