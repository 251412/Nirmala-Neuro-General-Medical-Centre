import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Phone, Award, ShieldAlert, Heart } from 'lucide-react';
import { getImageUrl, handleImageError, DEFAULT_DOCTOR_IMAGE } from '../utils/imageUtils';
import { doctorsData, departmentsData } from '../data';

export default function DoctorDetail() {
  const { id } = useParams<{ id: string }>();

  const doctor = doctorsData.find((d) => 
    d.id === id || 
    d.name.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(id?.toLowerCase() || '') ||
    (id?.toLowerCase().includes('nirmala') && d.id === 'doctor-001') ||
    (id?.toLowerCase().includes('rajesh') && d.id === 'doctor-002') ||
    (id?.toLowerCase().includes('anjali') && d.id === 'doctor-003')
  );
  const deptName = departmentsData.find((dept) => dept.id === doctor?.departmentId)?.name || doctor?.departmentName || 'Specialized Clinic';

  if (!doctor) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <ShieldAlert size={48} style={{ color: 'var(--danger)', marginBottom: '16px' }} />
        <h2>Doctor Profile Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px', marginBottom: '24px' }}>The doctor you are looking for might have been deactivated or does not exist.</p>
        <Link to="/doctors" className="btn btn-primary">Back to Doctors Directory</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'white', padding: 'clamp(105px, 11vw, 130px) 0 60px 0' }}>
      <style>{`
        .doctor-detail-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          grid-template-areas:
            "photo details"
            "booking details"
            ". details";
          gap: 28px 50px;
          align-items: start;
        }

        .doctor-photo-col {
          grid-area: photo;
        }

        .doctor-booking-col {
          grid-area: booking;
        }

        .doctor-details-col {
          grid-area: details;
        }

        /* Mobile & Tablet (< 992px): Stack in exact requested order:
           1. Doctor Image
           2. Doctor Details
           3. Book Appointment Now (Consultation Card)
        */
        @media (max-width: 991px) {
          .doctor-detail-grid {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .doctor-photo-col {
            order: 1;
            width: 100%;
          }
          .doctor-details-col {
            order: 2;
            width: 100%;
          }
          .doctor-booking-col {
            order: 3;
            width: 100%;
          }
        }

        .doctor-photo-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .doctor-detail-img {
          width: 100%;
          height: auto;
          max-height: 480px;
          object-fit: cover;
          display: block;
        }
      `}</style>

      <div className="container">
        {/* Back Link */}
        <Link to="/doctors" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '28px' }}>
          <ArrowLeft size={16} />
          <span>Back to Doctors Directory</span>
        </Link>

        <div className="doctor-detail-grid">
          {/* 1. Doctor Photo */}
          <div className="doctor-photo-col">
            <div className="doctor-photo-card">
              <img
                src={getImageUrl(doctor.photo, DEFAULT_DOCTOR_IMAGE)}
                alt={doctor.name}
                className="doctor-detail-img"
                onError={(e) => handleImageError(e, DEFAULT_DOCTOR_IMAGE)}
              />
            </div>
          </div>

          {/* 2. Doctor Details */}
          <div className="doctor-details-col">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
                {deptName || 'Medical Officer'}
              </div>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--primary)', marginBottom: '6px', lineHeight: 1.2 }}>{doctor.name}</h1>
            <span style={{ fontSize: '1.12rem', color: 'var(--secondary)', fontWeight: '600', display: 'block', marginBottom: '20px' }}>
              {doctor.designation}
            </span>

            {/* Quick stats banner */}
            <div style={{
              display: 'flex',
              gap: '24px',
              padding: '16px 20px',
              background: 'var(--bg-main)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              marginBottom: '28px',
              flexWrap: 'wrap'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Experience</span>
                <strong style={{ color: 'var(--text-dark)', fontSize: '1.05rem' }}>{doctor.experience}</strong>
              </div>
              <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '20px' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Qualification</span>
                <strong style={{ color: 'var(--text-dark)', fontSize: '1.05rem' }}>{doctor.qualification}</strong>
              </div>
            </div>

            {/* Full Biography */}
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '10px', paddingBottom: '8px', borderBottom: '2px solid var(--bg-main)' }}>
                Biography
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.75', fontSize: '0.98rem', whiteSpace: 'pre-line' }}>
                {doctor.bio}
              </p>
            </div>

            {/* Area of specialization */}
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '10px', paddingBottom: '8px', borderBottom: '2px solid var(--bg-main)' }}>
                Specializations &amp; Interests
              </h3>
              <p style={{ color: 'var(--text-dark)', lineHeight: '1.75', fontSize: '0.98rem', fontWeight: '500' }}>
                {doctor.specialization}
              </p>
            </div>

            {/* Credentials / trust checklist */}
            <div className="card" style={{ padding: '20px', borderStyle: 'dashed' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} style={{ color: 'var(--secondary)' }} />
                <span>Professional Care Standards</span>
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <Heart size={14} style={{ color: 'var(--danger)', flexShrink: 0, marginTop: '3px' }} />
                  <span>Licensed medical practitioner registered with State Medical Councils.</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <Heart size={14} style={{ color: 'var(--danger)', flexShrink: 0, marginTop: '3px' }} />
                  <span>Follows modern Evidence-Based Medicine courses and neuro-trauma protocols.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Consultation Card & Book Appointment Now */}
          <div className="doctor-booking-col">
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--bg-main)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                <Phone size={16} style={{ color: 'var(--secondary)' }} />
                <span>Enquiries: <strong style={{ color: 'var(--text-dark)' }}>{doctor.phone}</strong></span>
              </div>

              {doctor.status === 'INACTIVE' ? (
                <div style={{
                  background: '#fef2f2', border: '1.5px solid #fca5a5',
                  borderRadius: '10px', padding: '14px 16px',
                  display: 'flex', alignItems: 'flex-start', gap: '10px'
                }}>
                  <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>🔴</span>
                  <div>
                    <strong style={{ color: '#b91c1c', display: 'block', marginBottom: '2px' }}>Doctor is currently unavailable</strong>
                    <span style={{ fontSize: '0.82rem', color: '#7f1d1d' }}>This doctor is on leave. Please contact the reception desk at <strong>+91 6305471147</strong> to reschedule or book with another doctor.</span>
                  </div>
                </div>
              ) : (
                <Link
                  to={`/appointment?doctorId=${doctor.id}`}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 20px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(15, 76, 129, 0.25)'
                  }}
                >
                  Book Appointment Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
