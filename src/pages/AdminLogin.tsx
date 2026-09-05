import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, Mail, AlertCircle } from 'lucide-react';
import formStyles from '../styles/Forms.module.css';

interface AdminLoginProps {
  onLoginSuccess: (user: { name: string; email: string; role: string; token: string }) => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        onLoginSuccess(data);
        navigate('/admin/dashboard');
      } else {
        const data = await res.json();
        setErrorMsg(data.message || 'Invalid administrator email or password.');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to authentication server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-main)',
      padding: '40px 20px'
    }}>
      <div className={formStyles.formCard} style={{ width: '100%', maxWidth: '440px', padding: '40px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <img src="/logo.png" alt="Nirmala Hospital Logo" style={{ height: '64px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)' }}>Admin Portal</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Nirmala Hospital Management Control Panel
          </p>
        </div>

        {errorMsg && (
          <div className={`${formStyles.alert} ${formStyles.alertError}`}>
            <AlertCircle size={18} className={formStyles.alertIcon} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={formStyles.fieldGroup}>
            <label className={formStyles.label}>Admin Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={formStyles.input}
                style={{ paddingLeft: '40px' }}
                placeholder="Enter administrator email"
                required
              />
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>
          </div>

          <div className={formStyles.fieldGroup}>
            <label className={formStyles.label}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={formStyles.input}
                style={{ paddingLeft: '40px' }}
                placeholder="Enter password"
                required
              />
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: '8px' }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
