import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/NeuralTransition.css';

interface NeuralPageTransitionProps {
  /** Display duration in ms (default: 2000ms / 2 seconds) */
  duration?: number;
}

export default function NeuralPageTransition({ duration = 2000 }: NeuralPageTransitionProps) {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [stage, setStage] = useState<'entering' | 'firing' | 'exiting'>('entering');
  const isFirstMount = useRef(true);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    // Skip animation on initial page landing to avoid blocking first content render
    if (isFirstMount.current) {
      isFirstMount.current = false;
      prevPath.current = location.pathname;
      return;
    }

    // Only fire when pathname actually changes
    if (prevPath.current === location.pathname) {
      return;
    }
    prevPath.current = location.pathname;

    setIsActive(true);
    setStage('entering');

    // Stage 1 -> Firing: Synaptic connections ignite smoothly
    const fireTimer = setTimeout(() => {
      setStage('firing');
    }, 240);

    // Stage 2 -> Exiting: Smooth, gentle fade out (last 500ms of the 2s)
    const exitTimer = setTimeout(() => {
      setStage('exiting');
    }, duration - 500);

    // Stage 3 -> Complete: Remove from DOM at 2000ms
    const hideTimer = setTimeout(() => {
      setIsActive(false);
    }, duration);

    return () => {
      clearTimeout(fireTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, [location.pathname, duration]);

  if (!isActive) return null;

  return (
    <div
      className={`neural-transition-overlay is-${stage}`}
      role="status"
      aria-label="Loading page with neural transition"
    >
      {/* Bioluminescent Ambient Glow */}
      <div className="neural-ambient-glow" />

      <div className="neural-canvas-wrap">
        <svg
          viewBox="0 0 400 300"
          className="neural-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* High-voltage glow filter */}
            <filter id="neuralGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Intense spark filter */}
            <filter id="sparkBurst" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradients */}
            <linearGradient id="axonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          </defs>

          {/* 1. Stylized Brain Hemispheres (Anatomical Cortex Curves) */}
          <path
            d="M 192 68 C 150 64, 85 92, 70 142 C 58 178, 76 218, 120 240 C 152 254, 180 244, 192 236"
            className="brain-outline"
          />
          <path
            d="M 208 68 C 250 64, 315 92, 330 142 C 342 178, 324 218, 280 240 C 248 254, 220 244, 208 236"
            className="brain-outline"
          />

          {/* 2. Axon Fibers / Inter-Cell Pathways (Left Hemisphere) */}
          <path id="pathL1" d="M 105 105 Q 135 115 160 150" className="axon-path active" />
          <path id="pathL2" d="M 80 150 Q 120 145 160 150" className="axon-path active" />
          <path id="pathL3" d="M 105 200 Q 130 180 160 150" className="axon-path active" />
          <path id="pathL4" d="M 145 85 Q 155 115 160 150" className="axon-path" />
          <path id="pathL5" d="M 145 220 Q 155 185 160 150" className="axon-path" />

          {/* 3. Axon Fibers / Inter-Cell Pathways (Right Hemisphere) */}
          <path id="pathR1" d="M 295 105 Q 265 115 240 150" className="axon-path active" />
          <path id="pathR2" d="M 320 150 Q 280 145 240 150" className="axon-path active" />
          <path id="pathR3" d="M 295 200 Q 270 180 240 150" className="axon-path active" />
          <path id="pathR4" d="M 255 85 Q 245 115 240 150" className="axon-path" />
          <path id="pathR5" d="M 255 220 Q 245 185 240 150" className="axon-path" />

          {/* 4. Central Synaptic Cleft Bridge (The Brain Cells Connecting!) */}
          <path
            id="pathBridge"
            d="M 160 150 C 175 146, 188 150, 200 150 C 212 150, 225 154, 240 150"
            className="synapse-bridge"
          />

          {/* 5. Traveling Action Potential Impulses (Electricity shooting along axons) */}
          {/* Left hemisphere impulses rushing inward */}
          <circle r="3.5" className="action-potential">
            <animateMotion dur="1.1s" repeatCount="indefinite" path="M 105 105 Q 135 115 160 150" />
          </circle>
          <circle r="4" className="action-potential">
            <animateMotion dur="0.95s" repeatCount="indefinite" path="M 80 150 Q 120 145 160 150" />
          </circle>
          <circle r="3.5" className="action-potential">
            <animateMotion dur="1.2s" repeatCount="indefinite" path="M 105 200 Q 130 180 160 150" />
          </circle>

          {/* Right hemisphere impulses rushing inward */}
          <circle r="3.5" className="action-potential">
            <animateMotion dur="1.05s" repeatCount="indefinite" path="M 295 105 Q 265 115 240 150" />
          </circle>
          <circle r="4" className="action-potential">
            <animateMotion dur="0.92s" repeatCount="indefinite" path="M 320 150 Q 280 145 240 150" />
          </circle>
          <circle r="3.5" className="action-potential">
            <animateMotion dur="1.15s" repeatCount="indefinite" path="M 295 200 Q 270 180 240 150" />
          </circle>

          {/* Converging Synapse Impulses: Left cell to center */}
          <circle r="4.5" fill="#38bdf8" filter="url(#neuralGlow)">
            <animateMotion dur="0.8s" repeatCount="indefinite" path="M 160 150 C 175 146, 190 150, 200 150" />
          </circle>
          {/* Converging Synapse Impulses: Right cell to center */}
          <circle r="4.5" fill="#38bdf8" filter="url(#neuralGlow)">
            <animateMotion dur="0.8s" repeatCount="indefinite" path="M 240 150 C 225 154, 210 150, 200 150" />
          </circle>

          {/* 6. Synapse Connection Flash & Spark Junction (Center at 200, 150) */}
          <g filter="url(#sparkBurst)">
            {/* Outward Shockwave 1 */}
            <circle cx="200" cy="150" className="synapse-burst" stroke="#38bdf8" fill="none" />
            {/* Outward Shockwave 2 (delayed) */}
            <circle
              cx="200"
              cy="150"
              className="synapse-burst"
              stroke="#00f2fe"
              fill="none"
              style={{ animationDelay: '0.28s' }}
            />
            {/* Electric Spark Diamond / Star */}
            <polygon
              points="200,138 203,148 214,150 203,152 200,162 197,152 186,150 197,148"
              fill="#ffffff"
              className="synapse-core-spark"
            />
            {/* Bright Core Junction Dot */}
            <circle cx="200" cy="150" r="5" fill="#ffffff" />
          </g>

          {/* 7. Neuron Cell Bodies (Somas) with Pulsing Bioluminescent Halos */}
          {/* Left Cluster Somas */}
          <circle cx="105" cy="105" r="5.5" className="neuron-node" />
          <circle cx="105" cy="105" className="neuron-node-halo" />

          <circle cx="80" cy="150" r="6" className="neuron-node" />
          <circle cx="80" cy="150" className="neuron-node-halo" />

          <circle cx="105" cy="200" r="5.5" className="neuron-node" />
          <circle cx="105" cy="200" className="neuron-node-halo" />

          <circle cx="145" cy="85" r="4.5" className="neuron-node" />
          <circle cx="145" cy="220" r="4.5" className="neuron-node" />

          {/* Left Primary Presynaptic Relay Soma */}
          <circle cx="160" cy="150" r="7.5" fill="#38bdf8" filter="url(#neuralGlow)" />
          <circle cx="160" cy="150" r="3" fill="#ffffff" />

          {/* Right Cluster Somas */}
          <circle cx="295" cy="105" r="5.5" className="neuron-node" />
          <circle cx="295" cy="105" className="neuron-node-halo" />

          <circle cx="320" cy="150" r="6" className="neuron-node" />
          <circle cx="320" cy="150" className="neuron-node-halo" />

          <circle cx="295" cy="200" r="5.5" className="neuron-node" />
          <circle cx="295" cy="200" className="neuron-node-halo" />

          <circle cx="255" cy="85" r="4.5" className="neuron-node" />
          <circle cx="255" cy="220" r="4.5" className="neuron-node" />

          {/* Right Primary Postsynaptic Relay Soma */}
          <circle cx="240" cy="150" r="7.5" fill="#38bdf8" filter="url(#neuralGlow)" />
          <circle cx="240" cy="150" r="3" fill="#ffffff" />
        </svg>
      </div>

      {/* Futuristic Neurological Status & Branding */}
      <div className="neural-status-wrap">
        <h3 className="neural-brand-title">Nirmala Neuro</h3>
        <div className="neural-status-badge">
          <span className="neural-pulse-dot" />
          <span>Neural Pathway Connecting</span>
        </div>
        <div className="neural-ecg-line">
          <div className="neural-ecg-runner" />
        </div>
      </div>
    </div>
  );
}
