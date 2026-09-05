import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall, Calendar } from 'lucide-react';
import styles from '../styles/Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/doctors', label: 'Our Doctors' },
    { path: '/departments', label: 'Our Departments' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact Us' },
  ];

  // Sliding pill position state
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  // Function to calculate and update active indicator position
  const updatePillPosition = () => {
    const currentPath = location.pathname;
    // Find active element or fallback to exact path match
    const activeItem = navItems.find((item) =>
      item.path === '/' ? currentPath === '/' : currentPath.startsWith(item.path)
    );

    if (activeItem && itemRefs.current[activeItem.path] && navRef.current) {
      const activeEl = itemRefs.current[activeItem.path]!;
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeEl.getBoundingClientRect();

      setPillStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update pill whenever route changes or window resizes
  useEffect(() => {
    updatePillPosition();
    window.addEventListener('resize', updatePillPosition);
    return () => window.removeEventListener('resize', updatePillPosition);
  }, [location.pathname]);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className="container">
          <div className={styles.navContainer}>
            {/* Logo */}
            <Link to="/" className={styles.logo}>
              <img src="/logo.png" alt="Nirmala Medical Logo" className={styles.logoImg} />
              <span className={styles.logoText}>NIRMALA MEDICAL</span>
            </Link>

            {/* Desktop Navigation with Animated Sliding Pill */}
            <nav className={styles.desktopNav} ref={navRef}>
              <div
                className={styles.slidingPill}
                style={{
                  transform: `translateX(${pillStyle.left}px)`,
                  width: `${pillStyle.width}px`,
                  opacity: pillStyle.opacity,
                }}
              />
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  ref={(el) => { itemRefs.current[item.path] = el; }}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className={styles.ctas}>
              <Link to="/emergency" className={`btn btn-danger ${styles.ctaEmergency}`} style={{ padding: '9px 18px', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
                <PhoneCall size={16} />
                <span>Emergency</span>
              </Link>
              <Link to="/appointment" className={`btn btn-primary ${styles.ctaAppointment}`} style={{ padding: '9px 18px', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
                <Calendar size={16} />
                <span>Book Appointment</span>
              </Link>
            </div>

            {/* Hamburger Button */}
            <button className={styles.mobileMenuBtn} onClick={() => setIsOpen(true)} aria-label="Open Menu">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerLogo}>
            <img src="/logo.png" alt="Nirmala Hospital" style={{ height: '36px', width: 'auto', marginRight: '8px', verticalAlign: 'middle' }} />
            NIRMALA HOSPITAL
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close Menu">
            <X size={28} />
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.mobileCtas}>
          <Link to="/emergency" className="btn btn-danger" onClick={() => setIsOpen(false)}>
            <PhoneCall size={18} />
            <span>Emergency (24/7)</span>
          </Link>
          <Link to="/appointment" className="btn btn-primary" onClick={() => setIsOpen(false)}>
            <Calendar size={18} />
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>
    </>
  );
}
