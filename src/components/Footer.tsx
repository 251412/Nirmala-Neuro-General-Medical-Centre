import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, MapPin, Phone, Mail, Clock, ArrowUpRight, Shield, Globe, Share2, Camera } from 'lucide-react';
import footerStyles from '../styles/Footer.module.css';

interface Department {
  id: string;
  name: string;
  slug: string;
}

export default function Footer() {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    fetch('/api/public/departments')
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((e) => console.error("Error fetching footer departments", e));
  }, []);

  return (
    <footer className={footerStyles.footer}>
      <div className="container">
        <div className={footerStyles.footerGrid}>
          {/* Col 1: About Hospital */}
          <div>
            <div className={footerStyles.brand}>
              <img src="/logo.png" alt="Nirmala Neuro & General Medical Centre Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
              <span className={footerStyles.brandText}>NIRMALA MEDICAL</span>
            </div>
            <p className={footerStyles.aboutText}>
              Specialized Neuro & General Medical Centre committed to diagnostic accuracy, patient safety, and compassionate care.
            </p>
            <div className={footerStyles.socialLinks}>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`${footerStyles.socialIcon} ${footerStyles.instagram}`} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`${footerStyles.socialIcon} ${footerStyles.facebook}`} aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`${footerStyles.socialIcon} ${footerStyles.twitter}`} aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={`${footerStyles.socialIcon} ${footerStyles.youtube}`} aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`${footerStyles.socialIcon} ${footerStyles.linkedin}`} aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className={footerStyles.columnTitle}>Quick Links</h4>
            <ul className={footerStyles.linkList}>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/doctors">Find a Doctor</Link></li>
              <li><Link to="/departments">Medical Specialties</Link></li>
              <li><Link to="/appointment">Book Appointment</Link></li>
              <li><Link to="/blog">Health Library & News</Link></li>
              <li><Link to="/gallery">Hospital Gallery</Link></li>
              <li><Link to="/emergency">24/7 Emergency</Link></li>
              <li><Link to="/contact">Contact & Location</Link></li>
            </ul>
          </div>

          {/* Col 3: Clinical Specialties */}
          <div>
            <h4 className={footerStyles.columnTitle}>Our Specialties</h4>
            <ul className={footerStyles.linkList}>
              {departments.slice(0, 6).map((dept) => (
                <li key={dept.id}>
                  <Link to={`/departments/${dept.slug}`}>{dept.name}</Link>
                </li>
              ))}
              {departments.length === 0 && (
                <>
                  <li><Link to="/departments">Neurology & EEG</Link></li>
                  <li><Link to="/departments">General Medicine</Link></li>
                  <li><Link to="/departments">Pathology & Diagnostics</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Col 4: Contact & Emergency */}
          <div>
            <h4 className={footerStyles.columnTitle}>Contact Info</h4>
            <div className={footerStyles.contactItem}>
              <MapPin size={18} className={footerStyles.contactIcon} />
              <a
                href="https://maps.app.goo.gl/GPWyKrjPHeEeNfA1A"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Back of INOX Multiplex, Opposite RTC Complex, Fort Area, Vizianagaram, Andhra Pradesh - 535002
              </a>
            </div>
            <div className={footerStyles.contactItem}>
              <Phone size={18} className={footerStyles.contactIcon} />
              <span>6305471147 / 6302963312</span>
            </div>
            <div className={footerStyles.contactItem}>
              <Mail size={18} className={footerStyles.contactIcon} />
              <span>nirmalaneurocare@gmail.com</span>
            </div>
            <div className={footerStyles.contactItem}>
              <Clock size={18} className={footerStyles.contactIcon} />
              <span>Sunday to Friday: 09:30 AM - 06:30 PM</span>
            </div>

            <div className={footerStyles.emergencyBadge}>
              <strong>24/7 EMERGENCY HOTLINE</strong>
              <a href="tel:6305471147 / 6302963312" className={footerStyles.emergencyNumber}>
                6305471147 / 6302963312
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={footerStyles.bottomBar}>
          <p>© {new Date().getFullYear()} Nirmala Neuro & General Medical Centre. All rights reserved.
            Powered By WIN WIN
          </p>
          <div className={footerStyles.legalLinks}>
            <Link to="/admin/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Shield size={14} />
              <span>Admin Portal Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
