import React, { useEffect, useState } from 'react';
import { PhoneCall, AlertTriangle, MapPin, Clock, ShieldAlert, CheckCircle, Navigation, ExternalLink } from 'lucide-react';
import GoogleMapLocation, { type LocationSettings } from '../components/GoogleMapLocation';

interface EmergencyInfo {
  emergencyNumber: string;
  description: string;
  address: string;
  availability: string;
  instructions: string[];
}

export default function Emergency() {
  const [info, setInfo] = useState<EmergencyInfo | null>(null);
  const [settings, setSettings] = useState<LocationSettings | null>(null);

  useEffect(() => {
    fetch('/api/public/emergency')
      .then((r) => r.json())
      .then((data) => setInfo(data))
      .catch(() => {
        setInfo({
          emergencyNumber: '6305471147 / 6302963312',
          description: 'For immediate assistance during a neurological episode or medical emergency, reach our emergency desk.',
          address: 'Back of INOX Multiplex, Opposite RTC Complex, Fort Area, Vizianagaram, Andhra Pradesh - 535003',
          availability: '24 Hours a Day, 7 Days a Week',
          instructions: [
            'Do not panic. Stay calm and assess the situation.',
            'If the patient is unconscious, turn them onto their side (recovery position).',
            'Call our hotline 6305471147 / 6302963312 directly. State the patient condition and exact location.',
            'Do not offer water or food to an unconscious patient.',
            'Keep any medical history or prescription files ready for the arriving paramedics.'
          ]
        });
      });

    fetch('/api/public/settings')
      .then((r) => r.json())
      .then((data) => setSettings(data))
      .catch(() => {});
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Red Emergency Header Banner */}
      <section style={{
        backgroundColor: 'var(--danger)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            <AlertTriangle size={16} />
            <span>Emergency Medical Services</span>
          </div>

          <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '16px' }}>
            24/7 Emergency & Trauma Hotline
          </h1>

          <a
            href={`tel:${info?.emergencyNumber || '6305471147 / 6302963312'}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'white',
              color: 'var(--danger)',
              padding: '16px 36px',
              borderRadius: 'var(--radius-full)',
              fontSize: '1.75rem',
              fontWeight: '800',
              boxShadow: 'var(--shadow-premium)',
              marginTop: '12px',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <PhoneCall size={28} />
            <span>{info?.emergencyNumber || '6305471147 / 6302963312'}</span>
          </a>
        </div>
      </section>

      {/* Main Info */}
      <section className="section" style={{ backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="grid grid-2" style={{ gap: '40px', marginBottom: '60px' }}>
            {/* Availability */}
            <div className="card" style={{ padding: '30px', backgroundColor: 'var(--bg-main)' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '12px' }}>
                <Clock size={28} style={{ color: 'var(--danger)' }} />
                <h3 style={{ fontSize: '1.25rem' }}>Availability</h3>
              </div>
              <p style={{ color: 'var(--text-dark)', fontSize: '1.05rem', fontWeight: '600' }}>
                {info?.availability}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>
                Our casualty officers and emergency ambulance response team operate around the clock without pause.
              </p>
            </div>

            {/* Location */}
            <div className="card" style={{ padding: '30px', backgroundColor: 'var(--bg-main)' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '12px' }}>
                <MapPin size={28} style={{ color: 'var(--danger)' }} />
                <h3 style={{ fontSize: '1.25rem' }}>Hospital Address</h3>
              </div>
              <p style={{ color: 'var(--text-dark)', fontSize: '1rem', fontWeight: '600' }}>
                Nirmala Neuro & General Medical Centre
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
                Back of INOX Multiplex, Opposite RTC Complex, Fort Area, Vizianagaram, Andhra Pradesh - 535003
              </p>
            </div>
          </div>

          {/* Emergency Map Location Section */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span style={{ color: 'var(--danger)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Emergency Location
              </span>
              <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginTop: '4px' }}>
                Reach Us Directly
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Navigate to Nirmala Neuro & General Medical Centre immediately during emergency arrivals.
              </p>
            </div>
            <GoogleMapLocation settings={settings} variant="compact" height="380px" showSidebar={false} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '20px', flexWrap: 'wrap' }}>
              <a
                href={settings?.googleMapsDirectionsUrl || "https://www.google.com/maps/dir/?api=1&destination=18.1068468,83.3980718&destination_place_id=ChIJZQq5zUT1OzoR102LhkzA-uI"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-danger"
                style={{ gap: '8px', padding: '12px 28px' }}
              >
                <Navigation size={18} /> Get Directions Now
              </a>
              <a
                href={settings?.googleMapsUrl || settings?.mapLink || "https://www.google.com/maps/place/Nirmala+Neuro+%26+General+Medical+Centre/@18.1068518,83.3932009,17z/data=!4m14!1m7!3m6!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!2sNirmala+Neuro+%26+General+Medical+Centre!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7!3m5!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7?entry=ttu"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ gap: '8px', padding: '12px 28px' }}
              >
                <ExternalLink size={18} /> Open in Google Maps
              </a>
            </div>
          </div>

          {/* Guidelines */}
          <div style={{ backgroundColor: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--danger)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldAlert size={24} />
              <span>What to Do in a Medical Emergency</span>
            </h3>
            <p style={{ color: 'var(--text-dark)', marginBottom: '24px', fontSize: '1rem' }}>
              {info?.description}
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {info?.instructions.map((inst, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  <CheckCircle size={18} style={{ color: 'var(--danger)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
