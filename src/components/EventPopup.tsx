import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/EventPopup.module.css';

interface EventData {
  id: string;
  title: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  description: string;
  isActive: boolean;
  popupEnabled: boolean;
}

function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function EventPopup() {
  const [event, setEvent] = useState<EventData | null>(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    fetch('/api/public/events/upcoming')
      .then((res) => {
        if (res.status === 204 || !res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (!cancelled && data) {
          setEvent(data);
          setTimeout(() => setVisible(true), 900);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  if (!visible || !event) return null;

  const handleClose = () => setVisible(false);

  const handleBookAppointment = () => {
    setVisible(false);
    const params = new URLSearchParams();
    params.set('event', event.title);
    if (event.eventType) params.set('dept', event.eventType);
    navigate(`/appointment?${params.toString()}`);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  // Generate dot grid cells
  const dots = Array.from({ length: 25 });

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Upcoming Event">
      <div className={styles.popup}>

        {/* ── Header ── */}
        <div className={styles.header}>

          {/* Ambient glow blobs */}
          <div className={styles.blob1} />
          <div className={styles.blob2} />
          <div className={styles.blob3} />

          {/* Shimmer sweep */}
          <div className={styles.headerShimmer} />

          {/* Dot grid decorative */}
          <div className={styles.dotGrid}>
            {dots.map((_, i) => <span key={i} />)}
          </div>

          {/* Close button */}
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close popup">✕</button>

          {/* Live badge */}
          <div className={styles.headerBadge}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>Upcoming Event</span>
          </div>

          {/* Title */}
          <h2 className={styles.eventTitle}>{event.title}</h2>

          {/* EKG heartbeat animation */}
          <svg className={styles.ekg} viewBox="0 0 520 30" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <polyline
              points="0,15 60,15 80,4 95,26 110,4 125,26 140,15 200,15 220,15 240,4 255,26 270,4 285,26 300,15 360,15 380,4 395,26 410,4 425,26 440,15 520,15"
              stroke="white" strokeWidth="2.5" fill="none" strokeLinejoin="round"
            />
          </svg>

          {/* Wave */}
          <div className={styles.waveDivider}>
            <svg viewBox="0 0 520 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0,32 L0,16 Q130,0 260,16 Q390,32 520,16 L520,32 Z" fill="#ffffff" />
            </svg>
          </div>
        </div>

        {/* ── Body ── */}
        <div className={styles.body}>

          {/* Event type chip */}
          {event.eventType && (
            <div className={styles.eventTypeChip}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="4.5" y="0" width="3" height="12" rx="1" fill="#1d4ed8"/>
                <rect x="0" y="4.5" width="12" height="3" rx="1" fill="#1d4ed8"/>
              </svg>
              {event.eventType}
            </div>
          )}

          {/* Info cards grid */}
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIconBox}>📅</div>
              <div className={styles.infoCardContent}>
                <span className={styles.infoLabel}>Date</span>
                <span className={styles.infoValue}>{formatDisplayDate(event.eventDate)}</span>
              </div>
            </div>
            {event.eventTime && (
              <div className={styles.infoCard}>
                <div className={styles.infoIconBox}>🕐</div>
                <div className={styles.infoCardContent}>
                  <span className={styles.infoLabel}>Time</span>
                  <span className={styles.infoValue}>{event.eventTime}</span>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Description */}
          {event.description && (
            <div className={styles.description}>
              {event.description}
            </div>
          )}

          {/* CTA Button */}
          <button
            id="event-popup-book-btn"
            className={styles.bookBtn}
            onClick={handleBookAppointment}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Book Appointment Now
          </button>

          <p className={styles.footerNote}>Tap outside or press × to dismiss</p>
        </div>
      </div>
    </div>
  );
}
