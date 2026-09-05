import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Stethoscope, Building2, MessageSquare,
  Mail, BookOpen, Image as ImageIcon, Settings, LogOut, Plus, Edit, Trash2, X, Check, AlertCircle, CalendarDays, ToggleLeft, ToggleRight,
  Clock, CheckCircle2, FileCheck, RefreshCw, XCircle
} from 'lucide-react';
import dashboardStyles from '../styles/Dashboard.module.css';
import ImageUpload from '../components/ImageUpload';

interface AdminDashboardProps {
  adminUser: { name: string; email: string; role: string; token: string } | null;
  onLogout: () => void;
}

export default function AdminDashboard({ adminUser, onLogout }: AdminDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const token = adminUser?.token || localStorage.getItem('jwt_token') || '';

  // Stats
  const [stats, setStats] = useState<any>(null);
  
  // Data lists
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [events, setEvents] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState<string>('ALL');
  const [appointmentSortKey, setAppointmentSortKey] = useState<string>('createdAt_desc');
  const [startDateFilter, setStartDateFilter] = useState<string>('');
  const [endDateFilter, setEndDateFilter] = useState<string>('');

  // Modal State
  const [modalType, setModalType] = useState<string | null>(null); // 'doctor', 'department', 'blog', 'gallery'
  const [editItem, setEditItem] = useState<any>(null);

  // Helper fetch with JWT
  const authFetch = (url: string, options: RequestInit = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };
    return fetch(url, { ...options, headers });
  };

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetch('/api/public/settings')
      .then(r => r.json())
      .then(data => setSettings(data))
      .catch(() => {});
    loadData();
  }, [activeTab, token]);

  const loadData = () => {
    setLoading(true);
    if (activeTab === 'dashboard') {
      authFetch('/api/admin/dashboard')
        .then((r) => r.json())
        .then((data) => setStats(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else if (activeTab === 'appointments') {
      authFetch('/api/admin/appointments')
        .then((r) => r.json())
        .then((data) => setAppointments(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else if (activeTab === 'doctors') {
      authFetch('/api/admin/doctors')
        .then((r) => r.json())
        .then((data) => setDoctors(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else if (activeTab === 'departments') {
      authFetch('/api/admin/departments')
        .then((r) => r.json())
        .then((data) => setDepartments(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else if (activeTab === 'enquiries') {
      authFetch('/api/admin/enquiries')
        .then((r) => r.json())
        .then((data) => setEnquiries(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else if (activeTab === 'messages') {
      authFetch('/api/admin/contact')
        .then((r) => r.json())
        .then((data) => setMessages(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else if (activeTab === 'blogs') {
      authFetch('/api/admin/blogs')
        .then((r) => r.json())
        .then((data) => setBlogs(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else if (activeTab === 'gallery') {
      authFetch('/api/admin/gallery')
        .then((r) => r.json())
        .then((data) => setGallery(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else if (activeTab === 'settings') {
      fetch('/api/public/settings')
        .then((r) => r.json())
        .then((data) => setSettings(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else if (activeTab === 'events') {
      authFetch('/api/admin/events')
        .then((r) => r.json())
        .then((data) => setEvents(Array.isArray(data) ? data : []))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  };

  // Status updates for appointments
  const updateAppointmentStatus = async (id: string, newStatus: string) => {
    await authFetch(`/api/admin/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus }),
    });
    loadData();
  };

  // Status updates for enquiries
  const updateEnquiryStatus = async (id: string, newStatus: string) => {
    await authFetch(`/api/admin/enquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus }),
    });
    loadData();
  };

  // Delete handlers
  const handleDeleteDoctor = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      await authFetch(`/api/admin/doctors/${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  const handleDeleteDepartment = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      await authFetch(`/api/admin/departments/${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog article?')) {
      await authFetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this gallery photo?')) {
      await authFetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  // Delete event handler
  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await authFetch(`/api/admin/events/${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  // Modal save handler
  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'doctor') {
      const url = editItem.id ? `/api/admin/doctors/${editItem.id}` : '/api/admin/doctors';
      const method = editItem.id ? 'PUT' : 'POST';
      // Ensure consultation timings is array
      const payload = {
        ...editItem,
        consultationTimings: typeof editItem.consultationTimings === 'string'
          ? editItem.consultationTimings.split('\n').filter(Boolean)
          : editItem.consultationTimings
      };
      await authFetch(url, { method, body: JSON.stringify(payload) });
    } else if (modalType === 'department') {
      const url = editItem.id ? `/api/admin/departments/${editItem.id}` : '/api/admin/departments';
      const method = editItem.id ? 'PUT' : 'POST';
      const payload = {
        ...editItem,
        services: typeof editItem.services === 'string'
          ? editItem.services.split('\n').filter(Boolean)
          : editItem.services
      };
      await authFetch(url, { method, body: JSON.stringify(payload) });
    } else if (modalType === 'blog') {
      const url = editItem.id ? `/api/admin/blogs/${editItem.id}` : '/api/admin/blogs';
      const method = editItem.id ? 'PUT' : 'POST';
      await authFetch(url, { method, body: JSON.stringify(editItem) });
    } else if (modalType === 'gallery') {
      const url = editItem.id ? `/api/admin/gallery/${editItem.id}` : '/api/admin/gallery';
      const method = editItem.id ? 'PUT' : 'POST';
      await authFetch(url, { method, body: JSON.stringify(editItem) });
    } else if (modalType === 'settings') {
      await authFetch('/api/admin/settings', { method: 'PUT', body: JSON.stringify(editItem) });
    } else if (modalType === 'event') {
      const url = editItem.id ? `/api/admin/events/${editItem.id}` : '/api/admin/events';
      const method = editItem.id ? 'PUT' : 'POST';
      await authFetch(url, { method, body: JSON.stringify(editItem) });
    }

    setModalType(null);
    setEditItem(null);
    loadData();
  };

  return (
    <div className={dashboardStyles.adminLayout}>
      {/* Sidebar */}
      <aside className={dashboardStyles.sidebar}>
        <div className={dashboardStyles.sidebarHeader}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>N</div>
          <span>NIRMALA ADMIN</span>
        </div>

        <nav className={dashboardStyles.sidebarMenu}>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`${dashboardStyles.menuItem} ${activeTab === 'dashboard' ? dashboardStyles.activeMenu : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`${dashboardStyles.menuItem} ${activeTab === 'appointments' ? dashboardStyles.activeMenu : ''}`}
          >
            <Calendar size={18} />
            <span>Appointments</span>
          </button>

          <button
            onClick={() => setActiveTab('doctors')}
            className={`${dashboardStyles.menuItem} ${activeTab === 'doctors' ? dashboardStyles.activeMenu : ''}`}
          >
            <Stethoscope size={18} />
            <span>Doctors</span>
          </button>

          <button
            onClick={() => setActiveTab('departments')}
            className={`${dashboardStyles.menuItem} ${activeTab === 'departments' ? dashboardStyles.activeMenu : ''}`}
          >
            <Building2 size={18} />
            <span>Departments</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`${dashboardStyles.menuItem} ${activeTab === 'enquiries' ? dashboardStyles.activeMenu : ''}`}
          >
            <MessageSquare size={18} />
            <span>Enquiries</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`${dashboardStyles.menuItem} ${activeTab === 'messages' ? dashboardStyles.activeMenu : ''}`}
          >
            <Mail size={18} />
            <span>Messages</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`${dashboardStyles.menuItem} ${activeTab === 'blogs' ? dashboardStyles.activeMenu : ''}`}
          >
            <BookOpen size={18} />
            <span>Blogs</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`${dashboardStyles.menuItem} ${activeTab === 'gallery' ? dashboardStyles.activeMenu : ''}`}
          >
            <ImageIcon size={18} />
            <span>Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`${dashboardStyles.menuItem} ${activeTab === 'settings' ? dashboardStyles.activeMenu : ''}`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`${dashboardStyles.menuItem} ${activeTab === 'events' ? dashboardStyles.activeMenu : ''}`}
          >
            <CalendarDays size={18} />
            <span>Events</span>
          </button>
        </nav>

        <button onClick={onLogout} className={dashboardStyles.logoutBtn}>
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className={dashboardStyles.mainContent}>
        <header className={dashboardStyles.topbar}>
          <h1 className={dashboardStyles.pageTitle}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Control
          </h1>
          <div className={dashboardStyles.adminProfile}>
            <div className={dashboardStyles.adminAvatar}>
              {adminUser?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <strong style={{ fontSize: '0.9rem', display: 'block' }}>{adminUser?.name || 'Administrator'}</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{settings?.email || adminUser?.email || 'nirmalaneurocare@gmail.com'}</span>
            </div>
          </div>
        </header>

        <div className={dashboardStyles.contentBody}>
          {loading ? (
            <div className="spinner-container"><div className="spinner" /></div>
          ) : (
            <>
              {/* TAB 1: DASHBOARD */}
              {activeTab === 'dashboard' && stats && (
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '16px', fontWeight: 700 }}>Appointment Status Overview (Click card to view details)</h3>
                  <div className={dashboardStyles.statsGrid} style={{ marginBottom: '32px' }}>
                    {/* 1. Pending */}
                    <div
                      className={dashboardStyles.statCard}
                      style={{ borderLeft: '4px solid #f59e0b', cursor: 'pointer' }}
                      onClick={() => { setAppointmentStatusFilter('PENDING'); setActiveTab('appointments'); }}
                    >
                      <div className={dashboardStyles.statInfo}>
                        <h3>{stats.pendingAppointments || 0}</h3>
                        <p>Pending Appointments</p>
                      </div>
                      <div className={`${dashboardStyles.statIcon} ${dashboardStyles.iconAmber}`}>
                        <Clock size={24} />
                      </div>
                    </div>

                    {/* 2. Confirmed */}
                    <div
                      className={dashboardStyles.statCard}
                      style={{ borderLeft: '4px solid #10b981', cursor: 'pointer' }}
                      onClick={() => { setAppointmentStatusFilter('CONFIRMED'); setActiveTab('appointments'); }}
                    >
                      <div className={dashboardStyles.statInfo}>
                        <h3>{stats.confirmedAppointments || 0}</h3>
                        <p>Confirmed Appointments</p>
                      </div>
                      <div className={`${dashboardStyles.statIcon} ${dashboardStyles.iconEmerald}`}>
                        <CheckCircle2 size={24} />
                      </div>
                    </div>

                    {/* 3. Completed */}
                    <div
                      className={dashboardStyles.statCard}
                      style={{ borderLeft: '4px solid #0f4c81', cursor: 'pointer' }}
                      onClick={() => { setAppointmentStatusFilter('COMPLETED'); setActiveTab('appointments'); }}
                    >
                      <div className={dashboardStyles.statInfo}>
                        <h3>{stats.completedAppointments || 0}</h3>
                        <p>Completed Appointments</p>
                      </div>
                      <div className={`${dashboardStyles.statIcon} ${dashboardStyles.iconBlue}`}>
                        <FileCheck size={24} />
                      </div>
                    </div>

                    {/* 4. Rescheduled */}
                    <div
                      className={dashboardStyles.statCard}
                      style={{ borderLeft: '4px solid #3b82f6', cursor: 'pointer' }}
                      onClick={() => { setAppointmentStatusFilter('RESCHEDULED'); setActiveTab('appointments'); }}
                    >
                      <div className={dashboardStyles.statInfo}>
                        <h3>{stats.rescheduledAppointments || 0}</h3>
                        <p>Rescheduled Appointments</p>
                      </div>
                      <div className={`${dashboardStyles.statIcon} ${dashboardStyles.iconBlue}`}>
                        <RefreshCw size={24} />
                      </div>
                    </div>

                    {/* 5. Cancelled */}
                    <div
                      className={dashboardStyles.statCard}
                      style={{ borderLeft: '4px solid #ef4444', cursor: 'pointer' }}
                      onClick={() => { setAppointmentStatusFilter('CANCELLED'); setActiveTab('appointments'); }}
                    >
                      <div className={dashboardStyles.statInfo}>
                        <h3>{stats.cancelledAppointments || 0}</h3>
                        <p>Cancelled Appointments</p>
                      </div>
                      <div className={`${dashboardStyles.statIcon} ${dashboardStyles.iconRose}`}>
                        <XCircle size={24} />
                      </div>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '16px', fontWeight: 700 }}>Hospital Directory Stats</h3>
                  <div className={dashboardStyles.statsGrid}>
                    <div className={dashboardStyles.statCard}>
                      <div className={dashboardStyles.statInfo}>
                        <h3>{stats.activeDoctors}</h3>
                        <p>Active Doctors</p>
                      </div>
                      <div className={`${dashboardStyles.statIcon} ${dashboardStyles.iconBlue}`}>
                        <Stethoscope size={24} />
                      </div>
                    </div>

                    <div className={dashboardStyles.statCard}>
                      <div className={dashboardStyles.statInfo}>
                        <h3>{stats.activeDepartments}</h3>
                        <p>Active Departments</p>
                      </div>
                      <div className={`${dashboardStyles.statIcon} ${dashboardStyles.iconTeal}`}>
                        <Building2 size={24} />
                      </div>
                    </div>

                    <div className={dashboardStyles.statCard}>
                      <div className={dashboardStyles.statInfo}>
                        <h3>{stats.newEnquiries}</h3>
                        <p>New Enquiries</p>
                      </div>
                      <div className={`${dashboardStyles.statIcon} ${dashboardStyles.iconEmerald}`}>
                        <MessageSquare size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: APPOINTMENTS */}
              {activeTab === 'appointments' && (
                <div>
                  <div className={dashboardStyles.actionBar} style={{ marginBottom: '16px', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'RESCHEDULED', 'CANCELLED'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setAppointmentStatusFilter(st)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            border: appointmentStatusFilter === st ? '2px solid var(--primary)' : '1px solid #cbd5e1',
                            background: appointmentStatusFilter === st ? 'var(--primary)' : '#ffffff',
                            color: appointmentStatusFilter === st ? '#ffffff' : '#334155',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {st === 'ALL' ? 'All Appointments' : st}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      {/* Date Range Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <label style={{ fontWeight: 600, fontSize: '0.8rem', color: '#64748b' }}>From:</label>
                        <input
                          type="date"
                          value={startDateFilter}
                          onChange={(e) => setStartDateFilter(e.target.value)}
                          style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                        />
                        <label style={{ fontWeight: 600, fontSize: '0.8rem', color: '#64748b', marginLeft: '4px' }}>To:</label>
                        <input
                          type="date"
                          value={endDateFilter}
                          onChange={(e) => setEndDateFilter(e.target.value)}
                          style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                        />
                        {(startDateFilter || endDateFilter) && (
                          <button
                            type="button"
                            onClick={() => { setStartDateFilter(''); setEndDateFilter(''); }}
                            style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', marginLeft: '4px' }}
                          >
                            Clear
                          </button>
                        )}
                      </div>

                      {/* Sort By Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', color: '#475569' }}>Sort By:</label>
                        <select
                          value={appointmentSortKey}
                          onChange={(e) => setAppointmentSortKey(e.target.value)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: '#0f172a',
                            background: '#ffffff',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="preferredDate_asc">Appointment Date: Oldest to Newest 📅⬆️</option>
                          <option value="preferredDate_desc">Appointment Date: Newest to Oldest 📅⬇️</option>
                          <option value="createdAt_desc">Booking Date: Newest First 🕒⬇️</option>
                          <option value="createdAt_asc">Booking Date: Oldest First 🕒⬆️</option>
                          <option value="patientName_asc">Patient Name (A-Z)</option>
                          <option value="status_asc">Status (Alphabetical)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className={dashboardStyles.tableContainer}>
                    <table className={dashboardStyles.table}>
                      <thead>
                        <tr>
                          <th>Appointment ID</th>
                          <th>Patient Name</th>
                          <th>Date &amp; Time</th>
                          <th>Contact</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments
                          .filter((a) => appointmentStatusFilter === 'ALL' || a.status === appointmentStatusFilter)
                          .filter((a) => {
                            if (!startDateFilter && !endDateFilter) return true;
                            const apptDate = a.preferredDate || (a.createdAt ? a.createdAt.split('T')[0] : '');
                            if (!apptDate) return true;
                            if (startDateFilter && apptDate < startDateFilter) return false;
                            if (endDateFilter && apptDate > endDateFilter) return false;
                            return true;
                          })
                          .sort((a, b) => {
                            if (appointmentSortKey === 'createdAt_desc') {
                              return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
                            } else if (appointmentSortKey === 'createdAt_asc') {
                              return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
                            } else if (appointmentSortKey === 'preferredDate_asc') {
                              return (a.preferredDate || '').localeCompare(b.preferredDate || '');
                            } else if (appointmentSortKey === 'preferredDate_desc') {
                              return (b.preferredDate || '').localeCompare(a.preferredDate || '');
                            } else if (appointmentSortKey === 'patientName_asc') {
                              return (a.patientName || '').localeCompare(b.patientName || '');
                            } else if (appointmentSortKey === 'status_asc') {
                              return (a.status || '').localeCompare(b.status || '');
                            }
                            return 0;
                          })
                          .map((a) => (
                          <tr key={a.id}>
                            <td>
                              <strong style={{ fontFamily: 'monospace', color: 'var(--primary)' }}>{a.appointmentId || a.id}</strong><br />
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Created: {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : 'N/A'}</span>
                            </td>
                            <td>
                              <strong>{a.patientName}</strong><br />
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Age: {a.age} | {a.gender}</span>
                            </td>
                            <td>
                              <span>{a.preferredDate}</span><br />
                              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--secondary-dark)' }}>{a.preferredTime}</span>
                            </td>
                            <td>
                              <span>{a.phone}</span><br />
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{a.email}</span>
                            </td>
                            <td>
                              <select
                                value={a.status || 'PENDING'}
                                onChange={(e) => updateAppointmentStatus(a.id, e.target.value)}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: '20px',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  border: 'none',
                                  cursor: 'pointer',
                                  background: a.status === 'CONFIRMED' ? '#10b981' : a.status === 'CANCELLED' ? '#ef4444' : a.status === 'RESCHEDULED' ? '#3b82f6' : '#f59e0b',
                                  color: '#ffffff'
                                }}
                              >
                                <option value="PENDING" style={{ background: '#fff', color: '#000' }}>PENDING</option>
                                <option value="CONFIRMED" style={{ background: '#fff', color: '#000' }}>CONFIRMED</option>
                                <option value="RESCHEDULED" style={{ background: '#fff', color: '#000' }}>RESCHEDULED</option>
                                <option value="CANCELLED" style={{ background: '#fff', color: '#000' }}>CANCELLED</option>
                                <option value="COMPLETED" style={{ background: '#fff', color: '#000' }}>COMPLETED</option>
                              </select>
                            </td>
                            <td>
                              <div className={dashboardStyles.actionCell} style={{ flexWrap: 'wrap', gap: '6px' }}>
                                {a.status !== 'CONFIRMED' && (
                                  <button onClick={() => updateAppointmentStatus(a.id, 'CONFIRMED')} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                                    Confirm
                                  </button>
                                )}
                                {a.status === 'CONFIRMED' && (
                                  <button
                                    onClick={async () => {
                                      const res = await authFetch(`/api/admin/appointments/${a.id}/resend-email`, { method: 'POST' });
                                      const data = await res.json();
                                      alert(data.message || 'Email action completed');
                                      loadData();
                                    }}
                                    className="btn btn-primary"
                                    style={{ padding: '4px 10px', fontSize: '0.75rem', background: '#0f4c81' }}
                                  >
                                    Resend Email
                                  </button>
                                )}
                                {a.status === 'CONFIRMED' && (
                                  <a
                                    href={`/api/admin/appointments/${a.id}/pdf`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-light"
                                    style={{ padding: '4px 10px', fontSize: '0.75rem', textDecoration: 'none' }}
                                  >
                                    PDF Document
                                  </a>
                                )}
                                {a.status !== 'CANCELLED' && (
                                  <button onClick={() => updateAppointmentStatus(a.id, 'CANCELLED')} className="btn btn-danger" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: DOCTORS */}
              {activeTab === 'doctors' && (
                <div>
                  <div className={dashboardStyles.actionBar}>
                    <h3>Doctors Directory</h3>
                    <button
                      onClick={() => {
                        setEditItem({ name: '', qualification: '', specialization: '', departmentId: '', designation: '', experience: '', bio: '', consultationTimings: ['Mon-Fri: 10:00 AM - 01:00 PM'], phone: '', status: 'ACTIVE', photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600' });
                        setModalType('doctor');
                      }}
                      className="btn btn-primary"
                    >
                      <Plus size={16} />
                      <span>Add New Doctor</span>
                    </button>
                  </div>

                  <div className={dashboardStyles.tableContainer}>
                    <table className={dashboardStyles.table}>
                      <thead>
                        <tr>
                          <th>Doctor</th>
                          <th>Designation</th>
                          <th>Specialization</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctors.map((d) => (
                          <tr key={d.id}>
                            <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img src={d.photo} alt={d.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                              <div>
                                <strong>{d.name}</strong><br />
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{d.qualification}</span>
                              </div>
                            </td>
                            <td>{d.designation}</td>
                            <td>{d.specialization}</td>
                            <td>
                              <span className={`badge ${d.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>{d.status}</span>
                            </td>
                            <td>
                              <div className={dashboardStyles.actionCell}>
                                <button onClick={() => { setEditItem(d); setModalType('doctor'); }} className="btn btn-light" style={{ padding: '6px' }}>
                                  <Edit size={14} />
                                </button>
                                <button onClick={() => handleDeleteDoctor(d.id)} className="btn btn-danger" style={{ padding: '6px' }}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: DEPARTMENTS */}
              {activeTab === 'departments' && (
                <div>
                  <div className={dashboardStyles.actionBar}>
                    <h3>Hospital Departments</h3>
                    <button
                      onClick={() => {
                        setEditItem({ name: '', slug: '', description: '', services: ['Outpatient Consultation'], status: 'ACTIVE', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800' });
                        setModalType('department');
                      }}
                      className="btn btn-primary"
                    >
                      <Plus size={16} />
                      <span>Add Department</span>
                    </button>
                  </div>

                  <div className={dashboardStyles.tableContainer}>
                    <table className={dashboardStyles.table}>
                      <thead>
                        <tr>
                          <th>Department Name</th>
                          <th>Slug</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {departments.map((dept) => (
                          <tr key={dept.id}>
                            <td><strong>{dept.name}</strong></td>
                            <td><code>{dept.slug}</code></td>
                            <td><span className={`badge ${dept.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>{dept.status}</span></td>
                            <td>
                              <div className={dashboardStyles.actionCell}>
                                <button onClick={() => { setEditItem(dept); setModalType('department'); }} className="btn btn-light" style={{ padding: '6px' }}>
                                  <Edit size={14} />
                                </button>
                                <button onClick={() => handleDeleteDepartment(dept.id)} className="btn btn-danger" style={{ padding: '6px' }}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: ENQUIRIES */}
              {activeTab === 'enquiries' && (
                <div>
                  <div className={dashboardStyles.tableContainer}>
                    <table className={dashboardStyles.table}>
                      <thead>
                        <tr>
                          <th>Patient</th>
                          <th>Subject / Message</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enquiries.map((e) => (
                          <tr key={e.id}>
                            <td>
                              <strong>{e.patientName}</strong><br />
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{e.phone} | {e.email}</span>
                            </td>
                            <td>
                              <strong>{e.subject}</strong><br />
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{e.message}</span>
                            </td>
                            <td><span className={`badge ${e.status === 'NEW' ? 'badge-warning' : 'badge-success'}`}>{e.status}</span></td>
                            <td>
                              {e.status === 'NEW' && (
                                <button onClick={() => updateEnquiryStatus(e.id, 'RESOLVED')} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                                  Mark Resolved
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 6: MESSAGES */}
              {activeTab === 'messages' && (
                <div>
                  <div className={dashboardStyles.tableContainer}>
                    <table className={dashboardStyles.table}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Subject / Message</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.map((m) => (
                          <tr key={m.id}>
                            <td>
                              <strong>{m.name}</strong><br />
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{m.phone} | {m.email}</span>
                            </td>
                            <td>
                              <strong>{m.subject}</strong><br />
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{m.message}</span>
                            </td>
                            <td><span className="badge badge-primary">{m.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 7: BLOGS */}
              {activeTab === 'blogs' && (
                <div>
                  <div className={dashboardStyles.actionBar}>
                    <h3>Blog Articles</h3>
                    <button
                      onClick={() => {
                        setEditItem({ title: '', slug: '', author: 'Dr Vangapandu Nirmala', category: 'Neurology', status: 'PUBLISHED', content: '<h2>Article Title</h2><p>Content goes here...</p>', featuredImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800' });
                        setModalType('blog');
                      }}
                      className="btn btn-primary"
                    >
                      <Plus size={16} />
                      <span>Create Blog Article</span>
                    </button>
                  </div>

                  <div className={dashboardStyles.tableContainer}>
                    <table className={dashboardStyles.table}>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs.map((b) => (
                          <tr key={b.id}>
                            <td><strong>{b.title}</strong></td>
                            <td>{b.author}</td>
                            <td><span className="badge badge-secondary">{b.category}</span></td>
                            <td><span className={`badge ${b.status === 'PUBLISHED' ? 'badge-success' : 'badge-warning'}`}>{b.status}</span></td>
                            <td>
                              <div className={dashboardStyles.actionCell}>
                                <button onClick={() => { setEditItem(b); setModalType('blog'); }} className="btn btn-light" style={{ padding: '6px' }}>
                                  <Edit size={14} />
                                </button>
                                <button onClick={() => handleDeleteBlog(b.id)} className="btn btn-danger" style={{ padding: '6px' }}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 8: GALLERY */}
              {activeTab === 'gallery' && (
                <div>
                  <div className={dashboardStyles.actionBar}>
                    <h3>Gallery Photos</h3>
                    <button
                      onClick={() => {
                        setEditItem({ title: '', caption: '', category: 'Facilities', status: 'ACTIVE', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800' });
                        setModalType('gallery');
                      }}
                      className="btn btn-primary"
                    >
                      <Plus size={16} />
                      <span>Add Photo</span>
                    </button>
                  </div>

                  <div className={dashboardStyles.tableContainer}>
                    <table className={dashboardStyles.table}>
                      <thead>
                        <tr>
                          <th>Preview</th>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gallery.map((g) => (
                          <tr key={g.id}>
                            <td><img src={g.image} alt={g.title} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                            <td><strong>{g.title}</strong></td>
                            <td><span className="badge badge-secondary">{g.category}</span></td>
                            <td><span className={`badge ${g.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>{g.status}</span></td>
                            <td>
                              <div className={dashboardStyles.actionCell}>
                                <button onClick={() => { setEditItem(g); setModalType('gallery'); }} className="btn btn-light" style={{ padding: '6px' }}>
                                  <Edit size={14} />
                                </button>
                                <button onClick={() => handleDeleteGallery(g.id)} className="btn btn-danger" style={{ padding: '6px' }}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 9: EVENTS */}
              {activeTab === 'events' && (
                <div>
                  <div className={dashboardStyles.actionBar}>
                    <h3>Upcoming Events</h3>
                    <button
                      onClick={() => {
                        setEditItem({ title: '', eventDate: '', eventTime: '10:00 AM – 2:00 PM', eventType: 'Health Check-up Camp', description: '', active: true, popupEnabled: true, displayOrder: 0 });
                        setModalType('event');
                      }}
                      className="btn btn-primary"
                    >
                      <Plus size={16} />
                      <span>Add New Event</span>
                    </button>
                  </div>

                  <div className={dashboardStyles.tableContainer}>
                    <table className={dashboardStyles.table}>
                      <thead>
                        <tr>
                          <th>Event Name</th>
                          <th>Date &amp; Time</th>
                          <th>Type</th>
                          <th>Popup</th>
                          <th>Active</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((ev) => (
                          <tr key={ev.id}>
                            <td><strong>{ev.title}</strong></td>
                            <td>
                              <span>{ev.eventDate}</span><br />
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ev.eventTime}</span>
                            </td>
                            <td><span className="badge badge-secondary">{ev.eventType}</span></td>
                            <td>
                              <span className={`badge ${ev.popupEnabled ? 'badge-success' : 'badge-danger'}`}>
                                {ev.popupEnabled ? 'ON' : 'OFF'}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${ev.active ? 'badge-success' : 'badge-danger'}`}>
                                {ev.active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td>
                              <div className={dashboardStyles.actionCell}>
                                <button onClick={() => { setEditItem(ev); setModalType('event'); }} className="btn btn-light" style={{ padding: '6px' }}>
                                  <Edit size={14} />
                                </button>
                                <button onClick={() => handleDeleteEvent(ev.id)} className="btn btn-danger" style={{ padding: '6px' }}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {events.length === 0 && (
                          <tr><td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>No events found. Click "Add New Event" to create one.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 10: SETTINGS */}
              {activeTab === 'settings' && (
                <div>
                  <div className={dashboardStyles.actionBar}>
                    <h3>Hospital Settings & Contact Info</h3>
                    <button
                      onClick={() => {
                        setEditItem({
                          hospitalName: settings?.hospitalName || 'Nirmala Neuro & General Medical Centre',
                          address: settings?.address || 'Back of INOX Multiplex, Opposite RTC Complex, Fort Area, Vizianagaram, Andhra Pradesh - 535003',
                          phone: settings?.phone || '6305471147 / 6302963312',
                          emergencyNumber: settings?.emergencyNumber || '6305471147 / 6302963312',
                          email: settings?.email || 'nirmalaneurocare@gmail.com',
                          workingHours: settings?.workingHours || 'Sunday to Friday: 09:30 AM to 6:30 PM | Saturday: Closed',
                          city: settings?.city || 'Vizianagaram',
                          state: settings?.state || 'Andhra Pradesh',
                          country: settings?.country || 'India',
                          pincode: settings?.pincode || '535003',
                          latitude: settings?.latitude || 18.1068468,
                          longitude: settings?.longitude || 83.3980718,
                          googleMapsUrl: settings?.googleMapsUrl || 'https://www.google.com/maps/place/Nirmala+Neuro+%26+General+Medical+Centre/@18.1068518,83.3932009,17z/data=!4m14!1m7!3m6!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!2sNirmala+Neuro+%26+General+Medical+Centre!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7!3m5!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7?entry=ttu',
                          googleMapsDirectionsUrl: settings?.googleMapsDirectionsUrl || 'https://www.google.com/maps/dir/?api=1&destination=18.1068468,83.3980718&destination_place_id=ChIJZQq5zUT1OzoR102LhkzA-uI',
                          googlePlaceId: settings?.googlePlaceId || 'ChIJZQq5zUT1OzoR102LhkzA-uI',
                          googleMapsApiKey: settings?.googleMapsApiKey || '',
                          mapInformation: settings?.mapInformation || 'https://maps.google.com/maps?q=18.1068468,83.3980718+(Nirmala+Neuro+%26+General+Medical+Centre)&t=m&z=17&ie=UTF8&iwloc=B&output=embed',
                          mapLink: settings?.mapLink || 'https://www.google.com/maps/place/Nirmala+Neuro+%26+General+Medical+Centre/@18.1068518,83.3932009,17z/data=!4m14!1m7!3m6!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!2sNirmala+Neuro+%26+General+Medical+Centre!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7!3m5!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7?entry=ttu'
                        });
                        setModalType('settings');
                      }}
                      className="btn btn-primary"
                    >
                      <Edit size={16} />
                      <span>Edit Settings</span>
                    </button>
                  </div>

                  <div className={dashboardStyles.tableContainer} style={{ padding: '28px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h4 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px' }}>Hospital Name</h4>
                        <p style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>{settings?.hospitalName || 'Nirmala Neuro & General Medical Centre'}</p>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h4 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px' }}>Phone / Emergency Number</h4>
                        <p style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>{settings?.phone || '6305471147 / 6302963312'}</p>
                        <span style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 600 }}>Emergency: {settings?.emergencyNumber || '6305471147 / 6302963312'}</span>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h4 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px' }}>Email Address</h4>
                        <p style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>{settings?.email || 'nirmalaneurocare@gmail.com'}</p>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', gridColumn: '1 / -1' }}>
                        <h4 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px' }}>Hospital Address</h4>
                        <p style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', lineHeight: '1.5' }}>
                          {settings?.address || 'Back of INOX Multiplex, Opposite RTC Complex, Fort Area, Vizianagaram, Andhra Pradesh - 535003'}
                        </p>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h4 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px' }}>City / State / Country / PIN</h4>
                        <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0f172a' }}>
                          {settings?.city || 'Vizianagaram'}, {settings?.state || 'Andhra Pradesh'} - {settings?.pincode || '535003'} ({settings?.country || 'India'})
                        </p>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h4 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px' }}>Geo Coordinates (Lat, Lng)</h4>
                        <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0284c7' }}>
                          {settings?.latitude || 18.1068468}, {settings?.longitude || 83.3980718}
                        </p>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Place ID: {settings?.googlePlaceId || 'ChIJZQq5zUT1OzoR102LhkzA-uI'}</span>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', gridColumn: '1 / -1' }}>
                        <h4 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px' }}>Google Maps Listing URL</h4>
                        <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0284c7', wordBreak: 'break-all' }}>
                          {settings?.googleMapsUrl || settings?.mapLink || 'https://www.google.com/maps/place/Nirmala+Neuro+%26+General+Medical+Centre/@18.1068518,83.3932009,17z/data=!4m14!1m7!3m6!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!2sNirmala+Neuro+%26+General+Medical+Centre!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7!3m5!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7?entry=ttu'}
                        </p>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', gridColumn: '1 / -1' }}>
                        <h4 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px' }}>Google Maps Directions URL</h4>
                        <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0284c7', wordBreak: 'break-all' }}>
                          {settings?.googleMapsDirectionsUrl || 'https://www.google.com/maps/dir/?api=1&destination=18.1068468,83.3980718&destination_place_id=ChIJZQq5zUT1OzoR102LhkzA-uI'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* EDIT/CREATE MODALS */}
      {modalType && editItem && (
        <div className={dashboardStyles.modalOverlay}>
          <div className={dashboardStyles.modal}>
            <div className={dashboardStyles.modalHeader}>
              <h3>{editItem.id ? 'Edit' : 'Create'} {modalType.toUpperCase()}</h3>
              <button onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveModal}>
              <div className={dashboardStyles.modalBody}>
                {modalType === 'doctor' && (
                  <>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Name</label>
                      <input type="text" value={editItem.name || ''} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} style={{ width: '100%', padding: '8px' }} required />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <ImageUpload
                        label="Doctor Photo"
                        value={editItem.photo || ''}
                        onChange={(url) => setEditItem({ ...editItem, photo: Array.isArray(url) ? url[0] : url })}
                        token={token}
                      />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Qualification</label>
                      <input type="text" value={editItem.qualification || ''} onChange={(e) => setEditItem({ ...editItem, qualification: e.target.value })} style={{ width: '100%', padding: '8px' }} required />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Specialization</label>
                      <input type="text" value={editItem.specialization || ''} onChange={(e) => setEditItem({ ...editItem, specialization: e.target.value })} style={{ width: '100%', padding: '8px' }} required />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Department ID</label>
                      <input type="text" value={editItem.departmentId || ''} onChange={(e) => setEditItem({ ...editItem, departmentId: e.target.value })} style={{ width: '100%', padding: '8px' }} required />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Designation</label>
                      <input type="text" value={editItem.designation || ''} onChange={(e) => setEditItem({ ...editItem, designation: e.target.value })} style={{ width: '100%', padding: '8px' }} required />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Bio</label>
                      <textarea value={editItem.bio || ''} onChange={(e) => setEditItem({ ...editItem, bio: e.target.value })} style={{ width: '100%', padding: '8px', minHeight: '80px' }} />
                    </div>
                  </>
                )}

                {modalType === 'department' && (
                  <>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Name</label>
                      <input type="text" value={editItem.name || ''} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} style={{ width: '100%', padding: '8px' }} required />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Slug</label>
                      <input type="text" value={editItem.slug || ''} onChange={(e) => setEditItem({ ...editItem, slug: e.target.value })} style={{ width: '100%', padding: '8px' }} required />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <ImageUpload
                        label="Department Image"
                        value={editItem.image || ''}
                        onChange={(url) => setEditItem({ ...editItem, image: Array.isArray(url) ? url[0] : url })}
                        token={token}
                      />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Description</label>
                      <textarea value={editItem.description || ''} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} style={{ width: '100%', padding: '8px', minHeight: '80px' }} required />
                    </div>
                  </>
                )}

                {modalType === 'blog' && (
                  <>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Title</label>
                      <input type="text" value={editItem.title || ''} onChange={(e) => setEditItem({ ...editItem, title: e.target.value })} style={{ width: '100%', padding: '8px' }} required />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Slug</label>
                      <input type="text" value={editItem.slug || ''} onChange={(e) => setEditItem({ ...editItem, slug: e.target.value })} style={{ width: '100%', padding: '8px' }} required />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <ImageUpload
                        label="Featured Image"
                        value={editItem.featuredImage || ''}
                        onChange={(url) => setEditItem({ ...editItem, featuredImage: Array.isArray(url) ? url[0] : url })}
                        token={token}
                      />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Content (HTML)</label>
                      <textarea value={editItem.content || ''} onChange={(e) => setEditItem({ ...editItem, content: e.target.value })} style={{ width: '100%', padding: '8px', minHeight: '120px' }} required />
                    </div>
                  </>
                )}

                {modalType === 'gallery' && (
                  <>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Title</label>
                      <input type="text" value={editItem.title || ''} onChange={(e) => setEditItem({ ...editItem, title: e.target.value })} style={{ width: '100%', padding: '8px' }} required />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <ImageUpload
                        label="Gallery Image(s)"
                        value={editItem.image || ''}
                        onChange={(url) => setEditItem({ ...editItem, image: Array.isArray(url) ? url[0] : url })}
                        multiple={true}
                        token={token}
                      />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Caption</label>
                      <input type="text" value={editItem.caption || ''} onChange={(e) => setEditItem({ ...editItem, caption: e.target.value })} style={{ width: '100%', padding: '8px' }} />
                    </div>
                  </>
                )}

                {modalType === 'event' && (
                  <>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Event Title *</label>
                      <input type="text" value={editItem.title || ''} onChange={(e) => setEditItem({ ...editItem, title: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Event Date *</label>
                        <input type="date" value={editItem.eventDate || ''} onChange={(e) => setEditItem({ ...editItem, eventDate: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Event Time</label>
                        <input type="text" placeholder="e.g. 10:00 AM – 2:00 PM" value={editItem.eventTime || ''} onChange={(e) => setEditItem({ ...editItem, eventTime: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                      </div>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Event Type</label>
                      <input type="text" placeholder="e.g. Health Check-up Camp" value={editItem.eventType || ''} onChange={(e) => setEditItem({ ...editItem, eventType: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Description</label>
                      <textarea value={editItem.description || ''} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} style={{ width: '100%', padding: '8px', minHeight: '80px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="Short description shown in popup..." />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <input type="checkbox" checked={!!editItem.active} onChange={(e) => setEditItem({ ...editItem, active: e.target.checked })} style={{ width: '16px', height: '16px' }} />
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Event Active</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <input type="checkbox" checked={!!editItem.popupEnabled} onChange={(e) => setEditItem({ ...editItem, popupEnabled: e.target.checked })} style={{ width: '16px', height: '16px' }} />
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Show Popup</span>
                      </label>
                    </div>
                  </>
                )}

                {modalType === 'settings' && (
                  <>
                    <div style={{ marginBottom: '16px' }}>
                      <ImageUpload
                        label="Hospital Logo / Image"
                        value={editItem.logo || ''}
                        onChange={(url) => setEditItem({ ...editItem, logo: Array.isArray(url) ? url[0] : url })}
                        token={token}
                      />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Hospital Name</label>
                      <input type="text" value={editItem.hospitalName || ''} onChange={(e) => setEditItem({ ...editItem, hospitalName: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Phone Number</label>
                        <input type="text" value={editItem.phone || ''} onChange={(e) => setEditItem({ ...editItem, phone: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Emergency Number</label>
                        <input type="text" value={editItem.emergencyNumber || ''} onChange={(e) => setEditItem({ ...editItem, emergencyNumber: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
                      </div>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Email Address</label>
                      <input type="email" value={editItem.email || ''} onChange={(e) => setEditItem({ ...editItem, email: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Hospital Address</label>
                      <textarea value={editItem.address || ''} onChange={(e) => setEditItem({ ...editItem, address: e.target.value })} style={{ width: '100%', padding: '8px', minHeight: '70px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Working Hours</label>
                      <input type="text" value={editItem.workingHours || ''} onChange={(e) => setEditItem({ ...editItem, workingHours: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>City</label>
                        <input type="text" value={editItem.city || ''} onChange={(e) => setEditItem({ ...editItem, city: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>State</label>
                        <input type="text" value={editItem.state || ''} onChange={(e) => setEditItem({ ...editItem, state: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Country</label>
                        <input type="text" value={editItem.country || ''} onChange={(e) => setEditItem({ ...editItem, country: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>PIN Code</label>
                        <input type="text" value={editItem.pincode || ''} onChange={(e) => setEditItem({ ...editItem, pincode: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Latitude</label>
                        <input type="number" step="any" value={editItem.latitude ?? 18.1068468} onChange={(e) => setEditItem({ ...editItem, latitude: parseFloat(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Longitude</label>
                        <input type="number" step="any" value={editItem.longitude ?? 83.3980718} onChange={(e) => setEditItem({ ...editItem, longitude: parseFloat(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                      </div>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Google Maps Listing URL</label>
                      <input type="text" value={editItem.googleMapsUrl || editItem.mapLink || ''} onChange={(e) => setEditItem({ ...editItem, googleMapsUrl: e.target.value, mapLink: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Google Maps Directions URL</label>
                      <input type="text" value={editItem.googleMapsDirectionsUrl || ''} onChange={(e) => setEditItem({ ...editItem, googleMapsDirectionsUrl: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Google Place ID</label>
                        <input type="text" value={editItem.googlePlaceId || ''} onChange={(e) => setEditItem({ ...editItem, googlePlaceId: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Google Maps API Key (Optional)</label>
                        <input type="text" value={editItem.googleMapsApiKey || ''} onChange={(e) => setEditItem({ ...editItem, googleMapsApiKey: e.target.value })} placeholder="AIzaSy..." style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                      </div>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Google Maps Embed URL</label>
                      <input type="text" value={editItem.mapInformation || ''} onChange={(e) => setEditItem({ ...editItem, mapInformation: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
                    </div>
                  </>
                )}
              </div>
              <div className={dashboardStyles.modalFooter}>
                <button type="button" onClick={() => setModalType(null)} className="btn btn-light">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
