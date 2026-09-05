import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Building2, CheckCircle } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  services: string[];
}

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/departments')
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((e) => console.error("Error loading departments", e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #0d3c66 100%)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '8px' }}>Clinical Departments</h1>
          <p style={{ color: '#93c5fd', fontSize: '1.05rem' }}>Explore our specialized hospital departments and outpatient diagnostics services.</p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="spinner-container"><div className="spinner" /></div>
          ) : departments.length === 0 ? (
            <div className="empty-state">
              <Building2 size={48} />
              <h3>No Departments Found</h3>
              <p style={{ marginTop: '8px' }}>Please contact support or visit back later as we configure clinic services.</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {departments.map((dept) => (
                <div key={dept.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <img
                    src={dept.image}
                    alt={dept.name}
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                  />
                  
                  <div style={{ padding: '28px', flex: '1', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '12px' }}>{dept.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '24px', lineHeight: '1.6' }}>
                      {dept.description}
                    </p>

                    {/* Services Sublist */}
                    <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '12px', letterSpacing: '0.5px' }}>
                        Key Services Offered:
                      </span>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-dark)', marginBottom: '28px' }}>
                        {dept.services.slice(0, 3).map((service, index) => (
                          <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle size={14} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                            <span>{service}</span>
                          </li>
                        ))}
                        {dept.services.length > 3 && (
                          <li style={{ color: 'var(--text-muted)', paddingLeft: '22px', fontSize: '0.8rem', fontStyle: 'italic' }}>
                            + {dept.services.length - 3} more service options
                          </li>
                        )}
                      </ul>

                      <div style={{ display: 'flex', gap: '12px' }}>
                        <Link to={`/departments/${dept.slug}`} className="btn btn-light" style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}>
                          View Details
                        </Link>
                        <Link to={`/appointment?departmentId=${dept.id}`} className="btn btn-primary" style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}>
                          Book Clinic
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
