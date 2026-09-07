import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, BookOpen, Clock, Phone } from 'lucide-react';
import { getImageUrl, handleImageError, DEFAULT_DOCTOR_IMAGE } from '../utils/imageUtils';
import { doctorsData, departmentsData } from '../data';

export default function Doctors() {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');

  const departments = departmentsData;

  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesDept = !selectedDept || doc.departmentId === selectedDept || doc.departmentName.toLowerCase().includes(selectedDept.toLowerCase());
    const matchesSearch = !search ||
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const doctors = filteredDoctors;

  const handleClearFilters = () => {
    setSearch('');
    setSelectedDept('');
  };

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
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '8px' }}>Our Medical Officers</h1>
          <p style={{ color: '#93c5fd', fontSize: '1.05rem' }}>Search and connect with our expert general clinicians and neurologists.</p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section style={{ padding: '30px 0', backgroundColor: 'white', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}>
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1 1 300px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input
                type="text"
                placeholder="Search by name, specialization, qualification..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.95rem',
                  backgroundColor: 'var(--bg-main)'
                }}
              />
            </div>

            {/* Department Dropdown */}
            <div style={{ flex: '1 1 200px' }}>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.95rem',
                  backgroundColor: 'var(--bg-main)',
                  cursor: 'pointer'
                }}
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            {(search || selectedDept) && (
              <button onClick={handleClearFilters} className="btn btn-light" style={{ padding: '12px 20px' }}>
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Doctor Listings */}
      <section className="section">
        <div className="container">
          {doctors.length === 0 ? (
            <div className="empty-state">
              <User size={48} />
              <h3>No Doctors Found</h3>
              <p style={{ marginTop: '8px' }}>We couldn't find any active doctors matching your search or filters. Try adjusting your query.</p>
              <button onClick={handleClearFilters} className="btn btn-primary" style={{ marginTop: '20px' }}>View All Doctors</button>
            </div>
          ) : (
            <div className="grid grid-3">
              {doctors.map((doctor) => {
                // Find department name matching ID
                const deptName = departments.find((d) => d.id === doctor.departmentId)?.name || 'General Clinic';
                return (
                  <div key={doctor.id} className="card" style={{ display: 'flex', flexDirection: 'column', transition: 'all 0.4s ease' }}>
                    <div style={{
                      position: 'relative',
                      height: '280px',
                      backgroundColor: '#f8fafc',
                      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={getImageUrl(doctor.photo, DEFAULT_DOCTOR_IMAGE)}
                        alt={doctor.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }}
                        onError={(e) => handleImageError(e, DEFAULT_DOCTOR_IMAGE)}
                      />
                      <span className="badge badge-primary" style={{ position: 'absolute', top: '14px', right: '14px', boxShadow: 'var(--shadow-sm)' }}>
                        {deptName}
                      </span>
                      {doctor.experience && (
                        <span style={{
                          position: 'absolute',
                          bottom: '12px',
                          left: '12px',
                          background: 'rgba(15, 23, 42, 0.85)',
                          backdropFilter: 'blur(8px)',
                          color: 'white',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {doctor.experience} Exp
                        </span>
                      )}
                    </div>

                    <div style={{ padding: '24px', flex: '1', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ marginBottom: '8px' }}>
                        {doctor.status === 'INACTIVE' ? (
                          <span className="doctor-inactive-badge">
                            <span className="live-status-dot-red" />
                            On Leave / Not Available
                          </span>
                        ) : (
                          <span className="doctor-opd-badge">
                            <span className="live-status-dot" />
                            Available Today
                          </span>
                        )}
                      </div>

                      <span style={{ color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>
                        {doctor.designation}
                      </span>
                      <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>{doctor.name}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <BookOpen size={14} />
                        <span>{doctor.qualification}</span>
                      </p>
                      <p style={{ color: 'var(--text-dark)', fontSize: '0.9rem', fontWeight: '500', marginBottom: '16px' }}>
                        {doctor.specialization}
                      </p>

                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '10px' }}>
                          <Clock size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
                          <div>
                            <span style={{ fontWeight: '600', color: 'var(--text-dark)', display: 'block', marginBottom: '2px' }}>Consultation Hours:</span>
                            {doctor.consultationTimings.map((t, idx) => (
                              <span key={idx} style={{ display: 'block' }}>{t}</span>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
                          <Phone size={14} />
                          <span>{doctor.phone}</span>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                          <Link to={`/doctors/${doctor.id}`} className="btn btn-light" style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}>
                            View Profile
                          </Link>
                          {doctor.status === 'INACTIVE' ? (
                            <button
                              className="btn btn-danger"
                              style={{ flex: 1, padding: '10px', fontSize: '0.85rem', opacity: 0.7, cursor: 'not-allowed' }}
                              onClick={() => alert(`⚠️ Dr. ${doctor.name} is currently on leave and unavailable for appointments.\n\nPlease contact our reception desk at +91 6305471147 to book with another doctor or reschedule.`)}
                            >
                              Unavailable
                            </button>
                          ) : (
                            <Link to={`/appointment?doctorId=${doctor.id}`} className="btn btn-primary" style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}>
                              <Calendar size={14} />
                              <span>Book Now</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
