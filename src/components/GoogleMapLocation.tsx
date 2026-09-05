import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, AlertCircle } from 'lucide-react';
import styles from '../styles/GoogleMapLocation.module.css';

export interface LocationSettings {
  hospitalName?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
  googleMapsDirectionsUrl?: string;
  googlePlaceId?: string;
  mapInformation?: string;
  mapLink?: string;
}

interface GoogleMapLocationProps {
  settings?: LocationSettings | null;
  variant?: 'full' | 'compact' | 'emergency';
  height?: string;
  showSidebar?: boolean;
}

export default function GoogleMapLocation({
  settings,
  variant = 'full',
  height = '420px',
  showSidebar = true
}: GoogleMapLocationProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Constants verified from hospital Google Maps listing
  const DEFAULT_LAT = 18.1068468;
  const DEFAULT_LNG = 83.3980718;
  const DEFAULT_NAME = "Nirmala Neuro & General Medical Centre";
  const DEFAULT_ADDRESS = "Back of INOX Multiplex, Opposite RTC Complex, Fort Area, Vizianagaram, Andhra Pradesh - 535003";
  const DEFAULT_MAPS_URL = "https://www.google.com/maps/place/Nirmala+Neuro+%26+General+Medical+Centre/@18.1068518,83.3932009,17z/data=!4m14!1m7!3m6!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!2sNirmala+Neuro+%26+General+Medical+Centre!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7!3m5!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7?entry=ttu";
  const DEFAULT_DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=18.1068468,83.3980718&destination_place_id=ChIJZQq5zUT1OzoR102LhkzA-uI";

  const hospitalName = settings?.hospitalName || DEFAULT_NAME;
  const address = settings?.address || DEFAULT_ADDRESS;
  const lat = settings?.latitude || DEFAULT_LAT;
  const lng = settings?.longitude || DEFAULT_LNG;
  const googleMapsUrl = settings?.googleMapsUrl || settings?.mapLink || DEFAULT_MAPS_URL;
  const googleMapsDirectionsUrl = settings?.googleMapsDirectionsUrl || DEFAULT_DIRECTIONS_URL;

  // Exact Google Maps embed URL centered on exact coordinates 18.1068468, 83.3980718
  const embedUrl = settings?.mapInformation || `https://maps.google.com/maps?q=${lat},${lng}+(${encodeURIComponent(hospitalName)})&t=m&z=17&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div className={styles.mapSectionContainer}>
      <div className={variant === 'full' && showSidebar ? styles.twoColumnLayout : styles.mapWrapper}>
        
        {/* Sidebar Info Card for Full Variant */}
        {variant === 'full' && showSidebar && (
          <div className={styles.infoSidebar}>
            <span className={styles.hospitalBadge}>
              <MapPin size={16} /> Find Us
            </span>
            <h3 className={styles.hospitalTitle}>{hospitalName}</h3>
            <p className={styles.addressText}>{address}</p>
            
            <div className={styles.actionButtonGroup}>
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
                aria-label="Get Directions to Nirmala Neuro & General Medical Centre on Google Maps"
              >
                <Navigation size={18} />
                Get Directions
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecondary}
                aria-label="Open Nirmala Neuro & General Medical Centre listing in Google Maps"
              >
                <ExternalLink size={18} />
                Open in Google Maps
              </a>
            </div>
          </div>
        )}

        {/* Interactive Map Iframe Container */}
        <div className={styles.iframeContainer} style={{ height: variant === 'full' && showSidebar ? '100%' : height, minHeight: '300px' }}>
          
          {/* Loading Indicator */}
          {isLoading && !hasError && (
            <div className={styles.stateContainer}>
              <div className={styles.loadingSpinner}></div>
              <span style={{ color: '#475569', fontWeight: 600 }}>Loading map...</span>
            </div>
          )}

          {/* Error Fallback */}
          {hasError && (
            <div className={styles.stateContainer}>
              <AlertCircle size={36} color="#ef4444" style={{ marginBottom: '12px' }} />
              <div className={styles.errorText}>Unable to load the interactive map.</div>
              <div className={styles.errorSubtext}>
                You can still view our location and get navigation directions using the buttons below:
              </div>
              <div className={styles.actionButtonGroup} style={{ justifyContent: 'center' }}>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnPrimary}
                >
                  <Navigation size={16} /> Get Directions
                </a>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnSecondary}
                >
                  <ExternalLink size={16} /> Open in Google Maps
                </a>
              </div>
            </div>
          )}

          {/* Google Map Iframe */}
          <iframe
            title={`Google Map showing location of ${hospitalName}`}
            src={embedUrl}
            className={styles.iframeElement}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
