import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, MessageSquare, Mail, LogOut,
  CheckCircle2, Clock, XCircle, RefreshCw, AlertCircle, FileCheck, Search
} from 'lucide-react';
import dashboardStyles from '../styles/Dashboard.module.css';
import { hospitalInfo } from '../data';

interface AdminDashboardProps {
  adminUser: { name: string; email: string; role: string; token: string } | null;
  onLogout: () => void;
}

export default function AdminDashboard({ adminUser, onLogout }: AdminDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const token = adminUser?.token || localStorage.getItem('jwt_token') || '';

  // Data lists
  const [stats, setStats] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
    }
  };

  const updateAppointmentStatus = async (id: string, newStatus: string) => {
    await authFetch(`/api/admin/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus }),
    });
    loadData();
  };

  const updateEnquiryStatus = async (id: string, newStatus: string) => {
    await authFetch(`/api/admin/enquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus }),
    });
    loadData();
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((app) => {
    const matchesStatus = appointmentStatusFilter === 'ALL' || app.status === appointmentStatusFilter;
    const matchesSearch = !searchQuery ||
      app.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.referenceNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone?.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className={dashboardStyles.dashboardLayout}>
      {/* Sidebar */}
      <aside className={dashboardStyles.sidebar}>
        <div className={dashboardStyles.sidebarHeader}>
          <img src={hospitalInfo.logo} alt="Logo" style={{ height: '36px', width: 'auto', marginRight: '8px' }} />
          <div>
            <h3 style={{ fontSize: '1rem', margin: 0, color: 'white' }}>Nirmala Ops</h3>
            <span style={{ fontSize: '0.75rem', color: '#93c5fd' }}>Operational Desk</span>
          </div>
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
            <span>Patient Appointments</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`${dashboardStyles.menuItem} ${activeTab === 'enquiries' ? dashboardStyles.activeMenu : ''}`}
          >
            <MessageSquare size={18} />
            <span>Patient Enquiries</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`${dashboardStyles.menuItem} ${activeTab === 'messages' ? dashboardStyles.activeMenu : ''}`}
          >
            <Mail size={18} />
            <span>Contact Form Messages</span>
          </button>
        </nav>

        <div className={dashboardStyles.sidebarFooter}>
          <button onClick={onLogout} className={dashboardStyles.logoutBtn}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={dashboardStyles.mainContent}>
        {/* Top Header */}
        <header className={dashboardStyles.topNav}>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary)', textTransform: 'capitalize' }}>
              {activeTab === 'dashboard' ? 'Operational Overview' : activeTab}
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Logged in as Administrator ({adminUser?.email})
            </span>
          </div>
          <button onClick={loadData} className="btn btn-light" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <RefreshCw size={14} style={{ marginRight: '6px' }} /> Refresh Data
          </button>
        </header>

        <div className={dashboardStyles.contentBody}>
          {loading ? (
            <div className="spinner-container"><div className="spinner" /></div>
          ) : (
            <>
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {activeTab === 'dashboard' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  <div className="grid grid-3" style={{ gap: '20px' }}>
                    <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--primary)' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Appointments</span>
                      <h2 style={{ fontSize: '2.2rem', color: 'var(--primary)', marginTop: '8px', marginBottom: 0 }}>
                        {stats?.totalAppointments || appointments.length || 0}
                      </h2>
                    </div>

                    <div className="card" style={{ padding: '24px', borderLeft: '4px solid #f59e0b' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pending Confirmation</span>
                      <h2 style={{ fontSize: '2.2rem', color: '#f59e0b', marginTop: '8px', marginBottom: 0 }}>
                        {stats?.pendingAppointments || appointments.filter(a => a.status === 'PENDING').length || 0}
                      </h2>
                    </div>

                    <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--secondary)' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Patient Enquiries</span>
                      <h2 style={{ fontSize: '2.2rem', color: 'var(--secondary)', marginTop: '8px', marginBottom: 0 }}>
                        {stats?.totalEnquiries || enquiries.length || 0}
                      </h2>
                    </div>
                  </div>

                  {/* Note on Code-Based Content Management */}
                  <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
                    <h4 style={{ color: '#1e40af', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileCheck size={18} /> Code-Based Website Content Active
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#1e3a8a', margin: 0, lineHeight: 1.6 }}>
                      Website content (Doctor profiles, Department descriptions, Blogs, Gallery photos, Emergency guides, and Hospital contact settings) is now safely managed through code files under <code>src/data/</code>. This Admin Desk is dedicated exclusively to managing live patient appointment bookings and patient enquiries.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: APPOINTMENTS MANAGEMENT */}
              {activeTab === 'appointments' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <select
                        value={appointmentStatusFilter}
                        onChange={(e) => setAppointmentStatusFilter(e.target.value)}
                        style={{ padding: '8px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                      >
                        <option value="ALL">All Statuses</option>
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>

                      <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                          type="text"
                          placeholder="Search patient, ref #..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          style={{ padding: '8px 12px 8px 32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                      <thead style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
                        <tr>
                          <th style={{ padding: '14px 18px' }}>Ref #</th>
                          <th style={{ padding: '14px 18px' }}>Patient Name</th>
                          <th style={{ padding: '14px 18px' }}>Contact</th>
                          <th style={{ padding: '14px 18px' }}>Date & Time</th>
                          <th style={{ padding: '14px 18px' }}>Doctor</th>
                          <th style={{ padding: '14px 18px' }}>Status</th>
                          <th style={{ padding: '14px 18px' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAppointments.length === 0 ? (
                          <tr>
                            <td colSpan={7} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                              No appointment records found matching filter.
                            </td>
                          </tr>
                        ) : (
                          filteredAppointments.map((app) => (
                            <tr key={app.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                              <td style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--primary)' }}>{app.referenceNumber}</td>
                              <td style={{ padding: '14px 18px' }}>{app.patientName} ({app.age} {app.gender?.charAt(0)})</td>
                              <td style={{ padding: '14px 18px' }}>{app.phone}<br/><span style={{ fontSize: '0.78rem', color: '#64748b' }}>{app.email}</span></td>
                              <td style={{ padding: '14px 18px' }}>{app.preferredDate}<br/><span style={{ fontSize: '0.78rem', color: '#64748b' }}>{app.preferredTime}</span></td>
                              <td style={{ padding: '14px 18px' }}>{app.doctorName || 'General Clinic'}</td>
                              <td style={{ padding: '14px 18px' }}>
                                <span className={`badge ${app.status === 'CONFIRMED' ? 'badge-secondary' : app.status === 'CANCELLED' ? 'badge-danger' : 'badge-primary'}`}>
                                  {app.status}
                                </span>
                              </td>
                              <td style={{ padding: '14px 18px' }}>
                                <select
                                  value={app.status}
                                  onChange={(e) => updateAppointmentStatus(app.id, e.target.value)}
                                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}
                                >
                                  <option value="PENDING">PENDING</option>
                                  <option value="CONFIRMED">CONFIRMED</option>
                                  <option value="COMPLETED">COMPLETED</option>
                                  <option value="CANCELLED">CANCELLED</option>
                                </select>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: PATIENT ENQUIRIES */}
              {activeTab === 'enquiries' && (
                <div>
                  <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Patient Enquiries & Submissions</h3>
                  <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                      <thead style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
                        <tr>
                          <th style={{ padding: '14px 18px' }}>Date</th>
                          <th style={{ padding: '14px 18px' }}>Name</th>
                          <th style={{ padding: '14px 18px' }}>Contact Phone</th>
                          <th style={{ padding: '14px 18px' }}>Message / Requirement</th>
                          <th style={{ padding: '14px 18px' }}>Status</th>
                          <th style={{ padding: '14px 18px' }}>Update</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enquiries.length === 0 ? (
                          <tr>
                            <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                              No patient enquiries logged yet.
                            </td>
                          </tr>
                        ) : (
                          enquiries.map((enq) => (
                            <tr key={enq.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                              <td style={{ padding: '14px 18px', fontSize: '0.8rem', color: '#64748b' }}>
                                {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : 'N/A'}
                              </td>
                              <td style={{ padding: '14px 18px', fontWeight: 600 }}>{enq.name}</td>
                              <td style={{ padding: '14px 18px' }}>{enq.phone}</td>
                              <td style={{ padding: '14px 18px', maxWidth: '300px' }}>{enq.message}</td>
                              <td style={{ padding: '14px 18px' }}>
                                <span className={`badge ${enq.status === 'RESOLVED' || enq.status === 'READ' ? 'badge-secondary' : 'badge-primary'}`}>
                                  {enq.status || 'NEW'}
                                </span>
                              </td>
                              <td style={{ padding: '14px 18px' }}>
                                <button
                                  onClick={() => updateEnquiryStatus(enq.id, enq.status === 'READ' ? 'NEW' : 'READ')}
                                  className="btn btn-light"
                                  style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                                >
                                  Mark {enq.status === 'READ' ? 'Unread' : 'Read'}
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: CONTACT MESSAGES */}
              {activeTab === 'messages' && (
                <div>
                  <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Contact Form Submissions</h3>
                  <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                      <thead style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
                        <tr>
                          <th style={{ padding: '14px 18px' }}>Date</th>
                          <th style={{ padding: '14px 18px' }}>Sender</th>
                          <th style={{ padding: '14px 18px' }}>Contact Info</th>
                          <th style={{ padding: '14px 18px' }}>Subject</th>
                          <th style={{ padding: '14px 18px' }}>Message Body</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.length === 0 ? (
                          <tr>
                            <td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                              No contact messages received yet.
                            </td>
                          </tr>
                        ) : (
                          messages.map((msg) => (
                            <tr key={msg.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                              <td style={{ padding: '14px 18px', fontSize: '0.8rem', color: '#64748b' }}>
                                {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'N/A'}
                              </td>
                              <td style={{ padding: '14px 18px', fontWeight: 600 }}>{msg.name}</td>
                              <td style={{ padding: '14px 18px' }}>{msg.phone}<br/><span style={{ fontSize: '0.78rem', color: '#64748b' }}>{msg.email}</span></td>
                              <td style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--primary)' }}>{msg.subject || 'General Enquiry'}</td>
                              <td style={{ padding: '14px 18px', maxWidth: '320px' }}>{msg.message}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
