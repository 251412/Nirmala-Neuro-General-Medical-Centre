import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import styles from '../styles/Contact.module.css';
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />

      {/* Hero Banner */}
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSubtitle}>We're here to assist you. Get in touch with our administrative desk or visit our medical center for world-class neurology care.</p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className={styles.contactContainer}>
        <div className="container">
          <div className={styles.contactGrid}>
            
            {/* Left Column: Contact Cards */}
            <div className={styles.infoColumn}>
              <div className={styles.infoCard}>
                <div className={`${styles.iconBox} ${styles.iconPrimary}`}>
                  <MapPin size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h4>Hospital Address</h4>
                  <p>{settings?.address || DEFAULT_SETTINGS.address}</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={`${styles.iconBox} ${styles.iconRose}`}>
                  <Phone size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h4>Phone & Emergency</h4>
                  <p>Desk: {settings?.phone || DEFAULT_SETTINGS.phone}</p>
                  <span className={styles.highlight}>Emergency 24/7: {settings?.emergencyNumber || DEFAULT_SETTINGS.emergencyNumber}</span>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={`${styles.iconBox} ${styles.iconSecondary}`}>
                  <Mail size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h4>Email Address</h4>
                  <p>{settings?.email || DEFAULT_SETTINGS.email}</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={`${styles.iconBox} ${styles.iconAmber}`}>
                  <Clock size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h4>Working Hours</h4>
                  <p>{settings?.workingHours || DEFAULT_SETTINGS.workingHours}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className={styles.formWrapper}>
              <div className={styles.formHeader}>
                <h3>Send Us a Message</h3>
                <p>Fill out the form below for general enquiries or feedback. Our team will get back to you shortly.</p>
              </div>

              {successMsg && (
                <div className={`${styles.alert} ${styles.alertSuccess}`}>
                  <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className={`${styles.alert} ${styles.alertError}`}>
                  <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={styles.inputField}>
                  <label className={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className={styles.inputRow}>
                  <div>
                    <label className={styles.label}>Phone Number *</label>
                    <div className={styles.phoneInputWrapper}>
                      <span className={styles.phonePrefix}>+91</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className={styles.label}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="patient@example.com"
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputField}>
                  <label className={styles.label}>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="e.g. Enquiry regarding EEG test pricing"
                    required
                  />
                </div>

                <div className={styles.inputField}>
                  <label className={styles.label}>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Write your message here..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={styles.submitBtn}
                >
                  <Send size={20} />
                  {submitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Google Map Section */}
      <section className={styles.mapSection}>
        <div className="container">
          <div className={styles.mapHeader}>
            <span>Hospital Location</span>
            <h2>Find Us on Google Maps</h2>
            <p>Visit Nirmala Neuro & General Medical Centre located right opposite RTC Complex, behind INOX Multiplex in Vizianagaram.</p>
          </div>
          <div className={styles.mapWrapper}>
            <GoogleMapLocation settings={settings} variant="full" height="480px" showSidebar={true} />
          </div>
        </div>
      </section>
    </div>
  );
}
