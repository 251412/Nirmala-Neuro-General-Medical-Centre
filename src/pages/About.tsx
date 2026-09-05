import React from 'react';
import { Target, Eye, ShieldCheck, Heart, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="animate-fade-in">
      {/* Page Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #0d3c66 100%)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '8px' }}>About Us</h1>
          <p style={{ color: '#93c5fd', fontSize: '1.05rem' }}>Learn about our values, philosophy, and dedication to medical excellence.</p>
        </div>
      </section>

      {/* Intro Block */}
      <section className="section" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '60px' }}>
            <div>
              <span style={{ color: 'var(--secondary)', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Our History</span>
              <h2 style={{ fontSize: '2.25rem', color: 'var(--primary)', marginTop: '8px', marginBottom: '20px' }}>Serving Patients With Honor & Skill</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.7' }}>
                Dr. Vangapandu Nirmala has more than 9 years of experience in this medical field and is currently practicing at her own medical center, Nirmala Neuro & General Medical Centre, Opposite RTC Complex, INOX Back Side, Vizianagaram, Andhra Pradesh.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.7' }}>
                She completed her MBBS, MD General Medicine and DM Neurology at JIPMER. She has a special interest in Stroke, Epilepsy, Migraine, Vertigo, Dementia, Paralysis and other neurological problems.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Our medical team operates under the direct guidance of senior specialists, ensuring that every diagnostics review and pharmacological plan is robust, sound, and accurate.
              </p>
            </div>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-color)',
              backgroundColor: '#f8fafc',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxHeight: '450px'
            }}>
              <img
                src="/dr_nirmala_vangapandu.png"
                alt="Dr. Vangapandu Nirmala - DM Neurology"
                style={{ width: '100%', maxHeight: '450px', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="section" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div className="grid grid-3" style={{ gap: '30px' }}>
            {/* Mission */}
            <div className="card" style={{ padding: '40px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Target size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.6' }}>
                To provide high-quality, comprehensive healthcare utilizing advanced diagnostics and treatment methods, while maintaining clinical empathy and high ethical standards.
              </p>
            </div>

            {/* Vision */}
            <div className="card" style={{ padding: '40px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--secondary-light)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Eye size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Our Vision</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.6' }}>
                To be recognized as a leading center of excellence in neurology and outpatient medical care, trusted by patients for our diagnostic accuracy and clinical outcomes.
              </p>
            </div>

            {/* Values */}
            <div className="card" style={{ padding: '40px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#d1fae5', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Core Values</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.6' }}>
                We believe in medical honesty, transparency of care, safety in clinical procedures, constant skill upgrades, and respecting the trust patients place in our hands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Trust */}
      <section className="section" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="section-title">
            <h2>Patient Care Philosophy</h2>
            <p>We treat patients as family, placing clinical care above everything else.</p>
          </div>

          <div className="grid grid-3" style={{ gap: '40px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flexShrink: 0, color: 'var(--secondary)' }}><Heart size={24} /></div>
              <div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Empathy in Consultation</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  We spend time listening to patient complaints, mapping symptoms carefully rather than rushing clinical consults.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flexShrink: 0, color: 'var(--secondary)' }}><Award size={24} /></div>
              <div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Specialist Supervision</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  All tests (EEG, ECG, pathology) are supervised and cross-reviewed by senior specialists for zero margin of error.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flexShrink: 0, color: 'var(--secondary)' }}><Users size={24} /></div>
              <div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Transparent Communication</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  We share clinical findings openly, explaining diagnoses, medication courses, and prognosis to patients in clear terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Infrastructure */}
      <section className="section" style={{ backgroundColor: 'var(--bg-main)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '60px' }}>
            <div>
              <span style={{ color: 'var(--secondary)', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Facilities</span>
              <h2 style={{ fontSize: '2.25rem', color: 'var(--primary)', marginTop: '8px', marginBottom: '20px' }}>Modern Infrastructure Built for Care</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.7' }}>
                We believe in supporting clinical expertise with standard medical machines. Our medical centre incorporates the latest diagnostic facilities:
              </p>
              <ul style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '20px', fontSize: '0.95rem' }}>
                <li><strong>Electroencephalography (EEG):</strong> Advanced digital brainwave recording for epilepsy and seizure evaluation.</li>
                <li><strong>Electromyography (EMG) & NCV:</strong> Evaluation of nerve and muscle disorders like neuropathies and myopathies.</li>
                <li><strong>Clinical Pathology Lab:</strong> Fully automated biochemistry, hematology, and serology setups for rapid diagnosis.</li>
                <li><strong>Specialized Consulting Rooms:</strong> Comfortable spaces built to provide a calm patient atmosphere.</li>
              </ul>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                alt="EEG Laboratory"
                style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', width: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
