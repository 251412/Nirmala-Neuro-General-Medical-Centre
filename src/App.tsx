import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import EventPopup from './components/EventPopup';
import WhatsAppWidget from './components/WhatsAppWidget';
import MobileActionBar from './components/MobileActionBar';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import DoctorDetail from './pages/DoctorDetail';
import Departments from './pages/Departments';
import DepartmentDetail from './pages/DepartmentDetail';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import Emergency from './pages/Emergency';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function LayoutWrapper({ children, adminUser, onLogout }: { children: React.ReactNode; adminUser: any; onLogout: () => void }) {
  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith('/admin/dashboard');

  // Automatically scroll to the top of the page on every route transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Universal Scroll-Reveal Intersection Observer for attractive page effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(
        'section, .section, .card, .section-title, .reveal, .reveal-left, .reveal-right, .reveal-scale'
      );
      elements.forEach((el) => {
        if (!el.classList.contains('revealed')) {
          el.classList.add('reveal');
          observer.observe(el);
        }
      });
    }, 60);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <>
      {!isAdminDashboard && <Header />}
      {!isAdminDashboard && <EventPopup />}
      {!isAdminDashboard && <WhatsAppWidget />}
      <main key={location.pathname} className="page-transition" style={{ minHeight: '80vh', overflow: 'hidden' }}>
        {children}
      </main>
      {!isAdminDashboard && <MobileActionBar />}
      {!isAdminDashboard && <Footer />}
    </>
  );
}

export default function App() {
  const [adminUser, setAdminUser] = useState<any>(() => {
    const saved = localStorage.getItem('admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoginSuccess = (user: any) => {
    setAdminUser(user);
    localStorage.setItem('jwt_token', user.token);
    localStorage.setItem('admin_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('admin_user');
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  };

  return (
    <Router>
      <LayoutWrapper adminUser={adminUser} onLogout={handleLogout}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:slug" element={<DepartmentDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/emergency" element={<Emergency />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin onLoginSuccess={handleLoginSuccess} />} />
          <Route
            path="/admin/dashboard"
            element={
              adminUser ? (
                <AdminDashboard adminUser={adminUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}
