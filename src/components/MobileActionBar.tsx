import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PhoneCall, Calendar, AlertCircle } from 'lucide-react';

export default function MobileActionBar() {
  const location = useLocation();

  // Hide on admin portal
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="mobile-action-bar-container">
      <div className="mobile-action-bar">
        <a
          href="tel:6305471147"
          className="mobile-action-btn mobile-action-call"
          aria-label="Call Hospital Desk"
        >
          <PhoneCall size={18} />
          <span>Call Desk</span>
        </a>

        <Link
          to="/appointment"
          className="mobile-action-btn mobile-action-book"
          aria-label="Book Appointment"
        >
          <Calendar size={18} />
          <span>Book Appt</span>
        </Link>

        <Link
          to="/emergency"
          className="mobile-action-btn mobile-action-emergency"
          aria-label="24/7 Emergency"
        >
          <AlertCircle size={18} />
          <span>24/7 ER</span>
        </Link>
      </div>
    </div>
  );
}
