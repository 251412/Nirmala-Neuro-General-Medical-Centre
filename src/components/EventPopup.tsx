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
          // Slight delay so page loads first, then popup gracefully appears
          setTimeout(() => setVisible(true), 800);
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

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Upcoming Event">
      <div className={styles.popup}>

        {/* ── Header ── */}
        <div className={styles.header}>
          {/* Decorative circles */}
          <div className={styles.headerShape1} />
          <div className={styles.headerShape2} />
          <div className={styles.headerShape3} />

          {/* Close button */}
          <button
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close popup"
          >
            ✕
          </button>

          {/* Medical badge */}
          <div className={styles.crossBadge}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="4" y="0" width="4" height="12" rx="1.5" fill="white"/>
              <rect x="0" y="4" width="12" height="4" rx="1.5" fill="white"/>
            </svg>
            <span className={styles.crossBadgeText}>Upcoming Event</span>
          </div>

          {/* Event title */}
          <h2 className={styles.eventTitle}>{event.title}</h2>

          {/* Heartbeat SVG */}
          <svg className={styles.heartbeatLine} viewBox="0 0 520 30" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <polyline
              points="0,15 60,15 80,4 95,26 110,4 125,26 140,15 200,15 220,15 240,4 255,26 270,4 285,26 300,15 360,15 380,4 395,26 410,4 425,26 440,15 520,15"
              stroke="white" strokeWidth="2" fill="none" strokeLinejoin="round"
            />
          </svg>

          {/* Wave divider */}
          <div className={styles.waveDivider}>
            <svg viewBox="0 0 520 28" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0,28 L0,14 Q130,0 260,14 Q390,28 520,14 L520,28 Z" fill="#ffffff"/>
            </svg>
          </div>
        </div>

        {/* ── Body ── */}
        <div className={styles.body}>
          {/* Event type chip */}
          <div className={styles.eventTypeChip}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="4.5" y="0.5" width="4" height="12" rx="1" fill="#0e6dbf"/>
              <rect x="0.5" y="4.5" width="12" height="4" rx="1" fill="#0e6dbf"/>
            </svg>
            {event.eventType || 'Medical Event'}
          </div>

          {/* Date & Time info */}
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>📅</span>
              <span className={styles.infoLabel}>Date</span>
              <span className={styles.infoValue}>{formatDisplayDate(event.eventDate)}</span>
            </div>
            {event.eventTime && (
              <div className={styles.infoRow}>
                <span className={styles.infoIcon}>🕐</span>
                <span className={styles.infoLabel}>Time</span>
                <span className={styles.infoValue}>{event.eventTime}</span>
              </div>
            )}
            {event.eventType && (
              <div className={styles.infoRow}>
                <span className={styles.infoIcon}>🏥</span>
                <span className={styles.infoLabel}>Type</span>
                <span className={styles.infoValue}>{event.eventType}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <div className={styles.description}>
              "{event.description}"
            </div>
          )}

          {/* CTA */}
          <button
            id="event-popup-book-btn"
            className={styles.bookBtn}
            onClick={handleBookAppointment}
          >
            🗓️ &nbsp; Book Appointment
          </button>

          <p className={styles.footerNote}>
            Click outside or press × to close
          </p>
        </div>
      </div>
    </div>
  );
}
