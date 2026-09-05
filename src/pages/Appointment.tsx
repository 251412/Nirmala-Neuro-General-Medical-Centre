import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, CheckCircle2, AlertCircle, Building2, Stethoscope, ArrowRight, ArrowLeft, Search, RefreshCw, XCircle, ShieldCheck } from 'lucide-react';
import formStyles from '../styles/Forms.module.css';

interface Department {
  id: string;
  name: string;
}

interface Doctor {
  id: string;
  name: string;
  departmentId: string;
  specialization: string;
  consultationTimings: string[];
}

export default function Appointment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDoctorId = searchParams.get('doctorId') || '';
  const initialDepartmentId = searchParams.get('departmentId') || '';
  const refId = searchParams.get('ref') || '';
  const eventFromPopup = searchParams.get('event') || ''; // Pre-fill from event popup

  // Mode: 'book' or 'lookup'
  const [mode, setMode] = useState<'book' | 'lookup'>(refId ? 'lookup' : 'book');

  // Data State
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  
  // Wizard Step State (1: Doctor/Dept, 2: Date & Time, 3: Patient Details, 4: Success)
  const [step, setStep] = useState(1);

  // Form State
  const [departmentId, setDepartmentId] = useState(initialDepartmentId);
  const [doctorId, setDoctorId] = useState(initialDoctorId);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reasonForVisit, setReasonForVisit] = useState(
    eventFromPopup ? `Booking for event: ${eventFromPopup}` : ''
  );

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookedAppointment, setBookedAppointment] = useState<any>(null);

  // Lookup state
  const [searchQuery, setSearchQuery] = useState(refId);
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');

  // Fetch departments & doctors
  useEffect(() => {
    fetch('/api/public/departments')
      .then((r) => r.json())
      .then((data) => setDepartments(data))
      .catch(() => {});

    fetch('/api/public/doctors')
      .then((r) => r.json())
      .then((data) => {
        setDoctors(data);
        if (initialDoctorId) {
          const doc = data.find((d: Doctor) => d.id === initialDoctorId);
          if (doc) {
            setDepartmentId(doc.departmentId);
            setDoctorId(doc.id);
          }
        }
      })
      .catch(() => {});
  }, [initialDoctorId]);

  // Initial lookup if ref query param present
  useEffect(() => {
    if (refId) {
      setMode('lookup');
      setSearchQuery(refId);
      handleLookup(refId);
    }
  }, [refId]);

  // Reliable Live Polling for Appointment Status Updates
  const activeApptRef = bookedAppointment?.appointmentId || bookedAppointment?.id || lookupResult?.appointmentId || lookupResult?.id;

  useEffect(() => {
    if (!activeApptRef) return;

    const fetchLatestStatus = async () => {
      try {
        const res = await fetch(`/api/public/appointments/${activeApptRef}`);
        if (res.ok) {
          const data = await res.json();
          if (bookedAppointment) {
            setBookedAppointment(data);
          }
          if (lookupResult) {
            setLookupResult(data);
          }
        }
      } catch (e) {
        // Silently ignore network flicker
      }
    };

    // Poll every 2 seconds
    const interval = setInterval(fetchLatestStatus, 2000);
    return () => clearInterval(interval);
  }, [activeApptRef, bookedAppointment !== null, lookupResult !== null]);

  // Handle department change: filter doctors
  const handleDepartmentChange = (deptId: string) => {
    setDepartmentId(deptId);
    const doc = doctors.find((d) => d.id === doctorId);
    if (doc && doc.departmentId !== deptId) {
      setDoctorId('');
    }
  };

  const filteredDoctors = departmentId
    ? doctors.filter((d) => d.departmentId === departmentId)
    : doctors;

  // Available Time Slots
  const availableTimeSlots = [
    '09:30 AM', '10:30 AM', '11:30 AM', '12:30 PM',
    '03:30 PM', '04:30 PM', '05:30 PM', '06:30 PM'
  ];

  // Min date for date picker (Today)
  const today = new Date().toISOString().split('T')[0];

  // Navigation handlers
  const handleNextStep = () => {
    setErrorMsg('');
    if (step === 1) {
      if (!departmentId || !doctorId) {
        setErrorMsg('Please select both a department and a doctor.');
        return;
      }
    } else if (step === 2) {
      if (!preferredDate || !preferredTime) {
        setErrorMsg('Please choose both a date and a time slot.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!patientName || !phone || !email || !age) {
      setErrorMsg('Please complete all required patient details.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        patientName,
        age: parseInt(age, 10),
        gender,
        phone,
        email,
        departmentId,
        doctorId,
        preferredDate,
        preferredTime,
        reasonForVisit
      };

      const res = await fetch('/api/public/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.status === 201) {
        const data = await res.json();
        const refNumber = data.appointmentId || data.id;
        // Fetch detailed payload with names
        const fullRes = await fetch(`/api/public/appointments/${refNumber}`);
        if (fullRes.ok) {
          const fullData = await fullRes.json();
          setBookedAppointment(fullData);
        } else {
          setBookedAppointment(data);
        }
        setStep(4); // Success step
        setSearchParams({ ref: refNumber });
      } else {
        const data = await res.json();
        setErrorMsg(data.message || 'Failed to submit appointment. Please verify details.');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred. Please check network connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLookup = async (idToSearch?: string) => {
    const q = idToSearch || searchQuery;
    if (!q || !q.trim()) {
      setLookupError('Please enter a valid Appointment ID, Phone Number, or Email.');
      return;
    }

    setLookupLoading(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const res = await fetch(`/api/public/appointments/${encodeURIComponent(q.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setLookupResult(data);
      } else {
        setLookupError('No appointment record found for the provided details.');
      }
    } catch (err) {
      setLookupError('Failed to fetch appointment status. Please check your network connection.');
    } finally {
      setLookupLoading(false);
    }
  };

  const selectedDoctorObj = doctors.find((d) => d.id === doctorId);
  const selectedDeptObj = departments.find((d) => d.id === departmentId);

  // Status Badge Component
  const renderStatusBadge = (status: string) => {
    if (status === 'CONFIRMED') {
      return (
        <span className="badge badge-success" style={{ fontSize: '0.95rem', padding: '8px 16px', background: '#10b981', color: '#ffffff', fontWeight: 700 }}>
          <ShieldCheck size={18} style={{ marginRight: '6px' }} />
          Appointment Confirmed
        </span>
      );
    } else if (status === 'CANCELLED') {
      return (
        <span className="badge badge-danger" style={{ fontSize: '0.95rem', padding: '8px 16px', background: '#ef4444', color: '#ffffff', fontWeight: 700 }}>
          <XCircle size={18} style={{ marginRight: '6px' }} />
          Appointment Cancelled
        </span>
      );
    } else {
      return (
        <span className="badge badge-warning" style={{ fontSize: '0.95rem', padding: '8px 16px', background: '#f59e0b', color: '#ffffff', fontWeight: 700 }}>
          <RefreshCw size={16} className="spin-slow" style={{ marginRight: '6px' }} />
          Appointment Pending
        </span>
      );
    }
  };

  // Full Confirmation Card Rendering
  const renderConfirmationCard = (appt: any) => {
    const isConfirmed = appt.status === 'CONFIRMED';
    const isCancelled = appt.status === 'CANCELLED';
    const displayId = appt.appointmentId || appt.id;

    return (
      <div style={{
        padding: '32px',
        background: '#ffffff',
        borderRadius: '16px',
        border: `2px solid ${isConfirmed ? '#10b981' : isCancelled ? '#ef4444' : '#f59e0b'}`,
        boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
        marginTop: '24px',
        textAlign: 'left'
      }}>
        {/* Banner Header */}
        {isConfirmed && (
          <div style={{
            background: '#ecfdf5',
            border: '2px solid #10b981',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle2 size={32} />
            </div>
            <div>
              <h3 style={{ color: '#065f46', fontSize: '1.25rem', marginBottom: '4px' }}>
                Your appointment has been successfully confirmed by Nirmala Neuro & General Medical Centre.
              </h3>
              <p style={{ color: '#047857', fontSize: '0.95rem', margin: 0 }}>
                Your appointment at Nirmala Neuro & General Medical Centre has been successfully confirmed. Please arrive on time for your appointment.
              </p>
            </div>
          </div>
        )}

        {isCancelled && (
          <div style={{
            background: '#fef2f2',
            border: '2px solid #ef4444',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ef4444', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <XCircle size={32} />
            </div>
            <div>
              <h3 style={{ color: '#991b1b', fontSize: '1.2rem', marginBottom: '4px' }}>
                Your appointment request was cancelled.
              </h3>
              <p style={{ color: '#b91c1c', fontSize: '0.9rem', margin: 0 }}>
                Please contact our reception desk at <strong>+91 6305471147</strong> or <strong>+91 6302963312</strong> for assistance or rescheduling.
              </p>
            </div>
          </div>
        )}

        {!isConfirmed && !isCancelled && (
          <div style={{
            background: '#fffbebf',
            border: '2px solid #f59e0b',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f59e0b', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock size={28} />
            </div>
            <div>
              <h3 style={{ color: '#92400e', fontSize: '1.15rem', marginBottom: '4px' }}>
                Appointment Request Received – Pending Confirmation
              </h3>
              <p style={{ color: '#b45309', fontSize: '0.9rem', margin: 0 }}>
                Your appointment request has been successfully received. Our hospital team will review your request and confirm your appointment shortly.
              </p>
            </div>
          </div>
        )}

        {/* Card Header & Status Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700 }}>
              APPOINTMENT CONFIRMATION CARD
            </span>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--primary)', margin: '4px 0 0 0' }}>
              {appt.patientName}
            </h2>
          </div>
          <div>
            {renderStatusBadge(appt.status)}
          </div>
        </div>

        {/* Detailed Information Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Appointment ID</label>
            <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary)', fontSize: '1.1rem', marginTop: '4px' }}>
              {displayId}
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Patient Name</label>
            <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '1.05rem', marginTop: '4px' }}>
              {appt.patientName}
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Doctor</label>
            <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '1.05rem', marginTop: '4px' }}>
              {appt.doctorName || selectedDoctorObj?.name || 'Assigned Specialist'}
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Department</label>
            <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '1.05rem', marginTop: '4px' }}>
              {appt.departmentName || selectedDeptObj?.name || 'General Medical'}
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Date</label>
            <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '1.05rem', marginTop: '4px' }}>
              {appt.preferredDate}
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Time</label>
            <div style={{ fontWeight: 700, color: 'var(--secondary-dark)', fontSize: '1.05rem', marginTop: '4px' }}>
              {appt.preferredTime}
            </div>
          </div>
        </div>

        {appt.adminNotes && (
          <div style={{ marginTop: '24px', padding: '16px 20px', background: '#eff6ff', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
            <strong style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>Hospital Admin Notes:</strong>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.95rem', color: 'var(--text-dark)' }}>{appt.adminNotes}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="animate-fade-in" style={{ padding: '60px 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '8px' }}>Nirmala Hospital Appointments</h1>
          <p style={{ color: 'var(--text-muted)' }}>Book a doctor consultation or check live confirmation status.</p>
          
          {/* Mode Switcher */}
          <div style={{ display: 'inline-flex', background: '#e2e8f0', borderRadius: '30px', padding: '4px', marginTop: '16px' }}>
            <button
              onClick={() => { setMode('book'); setErrorMsg(''); }}
              className={`btn ${mode === 'book' ? 'btn-primary' : 'btn-light'}`}
              style={{ borderRadius: '24px', padding: '8px 24px', fontSize: '0.9rem', border: 'none' }}
            >
              <Calendar size={16} style={{ marginRight: '6px' }} />
              Book New Appointment
            </button>
            <button
              onClick={() => { setMode('lookup'); setLookupError(''); }}
              className={`btn ${mode === 'lookup' ? 'btn-primary' : 'btn-light'}`}
              style={{ borderRadius: '24px', padding: '8px 24px', fontSize: '0.9rem', border: 'none' }}
            >
              <Search size={16} style={{ marginRight: '6px' }} />
              Track / Check Appointment Status
            </button>
          </div>
        </div>

        {/* MODE 1: BOOKING WIZARD */}
        {mode === 'book' && (
          <div className={formStyles.formCard}>
            {/* Step Bar */}
            {step < 4 && (
              <div className={formStyles.stepProgress}>
                <div
                  className={formStyles.progressBar}
                  style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                />
                <div className={`${formStyles.stepNode} ${step >= 1 ? formStyles.stepActive : ''} ${step > 1 ? formStyles.stepCompleted : ''}`}>1</div>
                <div className={`${formStyles.stepNode} ${step >= 2 ? formStyles.stepActive : ''} ${step > 2 ? formStyles.stepCompleted : ''}`}>2</div>
                <div className={`${formStyles.stepNode} ${step >= 3 ? formStyles.stepActive : ''}`}>3</div>
              </div>
            )}

            {errorMsg && (
              <div className={`${formStyles.alert} ${formStyles.alertError}`}>
                <AlertCircle size={20} className={formStyles.alertIcon} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP 1: Department & Doctor Selection */}
            {step === 1 && (
              <div>
                <h3 className={formStyles.title}>Step 1: Select Department & Doctor</h3>
                <p className={formStyles.subtitle}>Choose your desired clinical specialty and medical specialist.</p>

                {eventFromPopup && (
                  <div style={{
                    background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                    border: '1.5px solid #93c5fd',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{ fontSize: '1.4rem' }}>&#128467;&#65039;</span>
                    <div>
                      <strong style={{ color: '#1d4ed8', fontSize: '0.9rem', display: 'block' }}>Booking from Event</strong>
                      <span style={{ color: '#3b82f6', fontSize: '0.85rem' }}>{eventFromPopup}</span>
                    </div>
                  </div>
                )}

                <div className={formStyles.fieldGroup}>
                  <label className={formStyles.label}>Clinical Department *</label>
                  <select
                    value={departmentId}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    className={formStyles.select}
                    required
                  >
                    <option value="">-- Select Department --</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>

                <div className={formStyles.fieldGroup}>
                  <label className={formStyles.label}>Doctor / Specialist *</label>
                  <select
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className={formStyles.select}
                    disabled={!departmentId}
                    required
                  >
                    <option value="">-- Select Doctor --</option>
                    {filteredDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialization})</option>
                    ))}
                  </select>
                </div>

                <div className={formStyles.actions}>
                  <div />
                  <button onClick={handleNextStep} className="btn btn-primary">
                    <span>Continue to Date & Time</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Date & Time Slot Selection */}
            {step === 2 && (
              <div>
                <h3 className={formStyles.title}>Step 2: Choose Date & Time</h3>
                <p className={formStyles.subtitle}>Select an available date and consultation time slot.</p>

                <div className={formStyles.fieldGroup}>
                  <label className={formStyles.label}>Preferred Date *</label>
                  <input
                    type="date"
                    min={today}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className={formStyles.input}
                    required
                  />
                </div>

                <div className={formStyles.fieldGroup}>
                  <label className={formStyles.label}>Preferred Time Slot *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px', marginTop: '10px' }}>
                    {availableTimeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setPreferredTime(slot)}
                        className={`btn ${preferredTime === slot ? 'btn-secondary' : 'btn-light'}`}
                        style={{ padding: '10px', fontSize: '0.9rem' }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={formStyles.actions}>
                  <button onClick={handlePrevStep} className="btn btn-light">
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  <button onClick={handleNextStep} className="btn btn-primary">
                    <span>Patient Information</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Patient Information & Final Review */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <h3 className={formStyles.title}>Step 3: Patient Details</h3>
                <p className={formStyles.subtitle}>Enter patient contact details to register your appointment.</p>

                <div className={formStyles.fieldGroup}>
                  <label className={formStyles.label}>Patient Full Name *</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className={formStyles.input}
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div className={formStyles.fieldRow}>
                  <div>
                    <label className={formStyles.label}>Age *</label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className={formStyles.input}
                      placeholder="e.g. 35"
                      required
                    />
                  </div>
                  <div>
                    <label className={formStyles.label}>Gender *</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className={formStyles.select}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className={formStyles.fieldRow}>
                  <div>
                    <label className={formStyles.label}>Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={formStyles.input}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <div>
                    <label className={formStyles.label}>Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={formStyles.input}
                      placeholder="patient@example.com"
                      required
                    />
                  </div>
                </div>

                <div className={formStyles.fieldGroup}>
                  <label className={formStyles.label}>Reason for Visit / Symptoms (Optional)</label>
                  <textarea
                    value={reasonForVisit}
                    onChange={(e) => setReasonForVisit(e.target.value)}
                    className={formStyles.textarea}
                    placeholder="Describe your health symptoms or reason for consulting the doctor..."
                    style={{ minHeight: '80px' }}
                  />
                </div>

                {/* Booking Summary Box */}
                <div style={{ padding: '20px', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '8px' }}>Booking Summary</h4>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-dark)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div><strong>Doctor:</strong> {selectedDoctorObj?.name}</div>
                    <div><strong>Department:</strong> {selectedDeptObj?.name}</div>
                    <div><strong>Date:</strong> {preferredDate}</div>
                    <div><strong>Time:</strong> {preferredTime}</div>
                  </div>
                </div>

                <div className={formStyles.actions}>
                  <button type="button" onClick={handlePrevStep} className="btn btn-light">
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  <button type="submit" disabled={submitting} className="btn btn-primary">
                    {submitting ? 'Registering Booking...' : 'Confirm Appointment'}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: Success & Live Polling Status Confirmation */}
            {step === 4 && bookedAppointment && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <h2 style={{
                  fontSize: '2.1rem',
                  color: bookedAppointment.status === 'CONFIRMED' ? '#065f46' : 'var(--primary)',
                  marginBottom: '8px'
                }}>
                  {bookedAppointment.status === 'CONFIRMED' ? '✓ Appointment Confirmed Successfully' : 'Appointment Request Submitted Successfully'}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '16px' }}>
                  {bookedAppointment.status === 'CONFIRMED'
                    ? 'Your appointment has been successfully confirmed by Nirmala Neuro & General Medical Centre.'
                    : 'A pending confirmation email has been sent to your email address.'}
                </p>

                {renderConfirmationCard(bookedAppointment)}

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
                  <button onClick={() => { setStep(1); setBookedAppointment(null); setSearchParams({}); }} className="btn btn-primary">Book Another Appointment</button>
                  <Link to="/" className="btn btn-outline">Return to Home</Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: TRACK / LOOKUP APPOINTMENT */}
        {mode === 'lookup' && (
          <div className={formStyles.formCard}>
            <h3 className={formStyles.title}>Check Appointment Status</h3>
            <p className={formStyles.subtitle}>Enter your Appointment Reference ID (e.g. NM-2026-1001), Phone Number, or Email to check status.</p>

            <form onSubmit={(e) => { e.preventDefault(); handleLookup(); }} style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={formStyles.input}
                  placeholder="Enter Appointment ID (NM-2026-1001), Phone, or Email"
                  required
                />
                <button type="submit" disabled={lookupLoading} className="btn btn-primary" style={{ padding: '0 24px', flexShrink: 0 }}>
                  {lookupLoading ? 'Searching...' : 'Check Status'}
                </button>
              </div>
            </form>

            {lookupError && (
              <div className={`${formStyles.alert} ${formStyles.alertError}`}>
                <AlertCircle size={20} className={formStyles.alertIcon} />
                <span>{lookupError}</span>
              </div>
            )}

            {lookupResult && renderConfirmationCard(lookupResult)}
          </div>
        )}
      </div>
    </div>
  );
}
