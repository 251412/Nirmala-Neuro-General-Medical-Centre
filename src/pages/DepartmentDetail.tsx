import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ShieldAlert, Calendar, Stethoscope, User } from 'lucide-react';
import { getImageUrl, handleImageError, DEFAULT_DOCTOR_IMAGE, DEFAULT_DEPARTMENT_IMAGE } from '../utils/imageUtils';
import { departmentsData, doctorsData } from '../data';

export default function DepartmentDetail() {
  const { slug } = useParams<{ slug: string }>();

  const department = departmentsData.find((d) => d.slug === slug || d.id === slug);
  const doctors = doctorsData.filter((doc) => doc.departmentId === department?.id || doc.departmentName.toLowerCase().includes(department?.slug.toLowerCase() || ''));

  if (!department) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <ShieldAlert size={48} style={{ color: 'var(--danger)', marginBottom: '16px' }} />
        <h2>Department Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px', marginBottom: '24px' }}>The medical division you are looking for might have been renamed or removed.</p>
        <Link to="/departments" className="btn btn-primary">Back to Departments</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'white', padding: '60px 0' }}>
      <div className="container">
        {/* Back Link */}
        <Link to="/departments" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '32px' }}>
          <ArrowLeft size={16} />
          <span>Back to Departments</span>
        </Link>

        {/* Hero section inside page */}
        <div className="grid grid-2" style={{ gap: '60px', alignItems: 'flex-start', marginBottom: '60px' }}>
          <div>
            <span style={{ color: 'var(--secondary)', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Clinical Division</span>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginTop: '8px', marginBottom: '20px' }}>{department.name}</h1>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '30px' }}>
              {department.description}
            </p>

            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '16px' }}>Services & Treatments Offered</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {department.services.map((service, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-dark)', fontSize: '0.95rem' }}>
                  <CheckCircle size={18} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-color)'
            }}>
              <img
                src={getImageUrl(department.image, DEFAULT_DEPARTMENT_IMAGE)}
                alt={department.name}
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                onError={(e) => handleImageError(e, DEFAULT_DEPARTMENT_IMAGE)}
              />
            </div>
          </div>
        </div>

        {/* Affiliate Doctors list */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '60px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '8px' }}>Doctors In This Department</h2>
            <p style={{ color: 'var(--text-muted)' }}>Consult with our specialized clinical experts in {department.name}.</p>
          </div>

          {doctors.length === 0 ? (
            <div className="empty-state">
              <Stethoscope size={48} />
              <h3>No Doctors Assigned</h3>
              <p style={{ marginTop: '8px' }}>Currently, there are no active specialists assigned to this department. Please book a general consultation.</p>
              <Link to="/appointment" className="btn btn-primary" style={{ marginTop: '20px' }}>Book General Consultation</Link>
            </div>
          ) : (
            <div className="grid grid-3">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="card" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 16px auto',
                    border: '3px solid var(--border-color)',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={getImageUrl(doctor.photo, DEFAULT_DOCTOR_IMAGE)}
                      alt={doctor.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                      onError={(e) => handleImageError(e, DEFAULT_DOCTOR_IMAGE)}
                    />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{doctor.name}</h3>
                  <span style={{ color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    {doctor.designation}
                  </span>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '6px' }}>{doctor.qualification}</p>
                  <p style={{ color: 'var(--text-dark)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {doctor.specialization}
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/doctors/${doctor.id}`} className="btn btn-light" style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}>
                      Profile
                    </Link>
                    <Link to={`/appointment?doctorId=${doctor.id}`} className="btn btn-primary" style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}>
                      <Calendar size={12} />
                      <span>Book</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
