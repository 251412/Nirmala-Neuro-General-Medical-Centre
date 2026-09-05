import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Phone, Award, ShieldAlert, Heart } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  photo: string;
  qualification: string;
  specialization: string;
  departmentId: string;
  experience: string;
  designation: string;
  bio: string;
  consultationTimings: string[];
  phone: string;
}

export default function DoctorDetail() {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [deptName, setDeptName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`/api/public/doctors/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: Doctor) => {
        setDoctor(data);
        // Fetch department name
        fetch(`/api/public/departments`)
          .then((r) => r.json())
          .then((depts: any[]) => {
            const match = depts.find((d) => d.id === data.departmentId);
            if (match) setDeptName(match.name);
          })
          .catch(() => {});
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="spinner-container"><div className="spinner" /></div>;
  }

  if (error || !doctor) {
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
    <div className="animate-fade-in" style={{ backgroundColor: 'white', padding: '60px 0' }}>
      <div className="container">
        {/* Back Link */}
        <Link to="/doctors" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '32px' }}>
          <ArrowLeft size={16} />
          <span>Back to Doctors Directory</span>
        </Link>

        <div className="grid grid-2" style={{ gap: '60px', alignItems: 'flex-start' }}>
          {/* Col 1: Photo and Quick info */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-color)',
              marginBottom: '30px',
              backgroundColor: '#f8fafc',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '380px'
            }}>
              <img
                src={doctor.photo}
                alt={doctor.name}
                style={{ width: '100%', maxHeight: '480px', objectFit: 'contain', display: 'block' }}
              />
            </div>
            
            {/* Consultation Card */}
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--bg-main)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
                <Clock size={18} />
                <span>Consultation Timings</span>
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.925rem', color: 'var(--text-dark)', marginBottom: '20px' }}>
                {doctor.consultationTimings.map((t, idx) => (
                  <li key={idx} style={{ paddingBottom: '8px', borderBottom: '1px solid rgba(15,23,42,0.05)' }}>{t}</li>
                ))}
              </ul>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                <Phone size={16} />
                <span>Enquiries: <strong>{doctor.phone}</strong></span>
              </div>

              <Link to={`/appointment?doctorId=${doctor.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                Book Appointment Now
              </Link>
            </div>
          </div>

          {/* Col 2: Profile biography */}
          <div>
            <div style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px' }}>
              {deptName || 'Medical Officer'}
            </div>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '6px' }}>{doctor.name}</h1>
            <span style={{ fontSize: '1.15rem', color: 'var(--secondary)', fontWeight: '600', display: 'block', marginBottom: '20px' }}>
              {doctor.designation}
            </span>

            {/* Quick stats banner */}
            <div style={{
              display: 'flex',
              gap: '24px',
              padding: '16px 24px',
              background: 'var(--bg-main)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              marginBottom: '32px'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Experience</span>
                <strong style={{ color: 'var(--text-dark)', fontSize: '1.1rem' }}>{doctor.experience}</strong>
              </div>
              <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '24px' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Qualification</span>
                <strong style={{ color: 'var(--text-dark)', fontSize: '1.1rem' }}>{doctor.qualification}</strong>
              </div>
            </div>

            {/* Full Biography */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid var(--bg-main)' }}>
                Biography
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1rem', whiteSpace: 'pre-line' }}>
                {doctor.bio}
              </p>
            </div>

            {/* Area of specialization */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid var(--bg-main)' }}>
                Specializations & Interests
              </h3>
              <p style={{ color: 'var(--text-dark)', lineHeight: '1.8', fontSize: '1rem', fontWeight: '500' }}>
                {doctor.specialization}
              </p>
            </div>

            {/* Credentials / trust checklist */}
            <div className="card" style={{ padding: '24px', borderStyle: 'dashed' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
        </div>
      </div>
    </div>
  );
}
