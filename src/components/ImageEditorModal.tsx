import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn, ZoomOut, RotateCw, RefreshCw, MoveLeft, MoveRight, MoveUp, MoveDown,
  Check, X, Crop, Maximize2, Minimize2, Eye, Hand, Sparkles
} from 'lucide-react';
import styles from '../styles/ImageEditor.module.css';

export interface ImageEditorModalProps {
  imageSrc: string | File;
  isOpen: boolean;
  onClose: () => void;
  onSave: (processedFile: File, previewUrl: string) => void;
  title?: string;
  defaultFitMode?: 'contain' | 'cover' | 'fit';
}

export default function ImageEditorModal({
  imageSrc,
  isOpen,
  onClose,
  onSave,
  title = "Adjust Image & Framing",
  defaultFitMode = 'contain'
}: ImageEditorModalProps) {
  const [zoom, setZoom] = useState<number>(1.0);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [fitMode, setFitMode] = useState<'contain' | 'cover' | 'fit'>(defaultFitMode);

  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load image object from File or URL string
  useEffect(() => {
    if (!isOpen || !imageSrc) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    let objectUrl = '';
    if (typeof imageSrc === 'string') {
      img.src = imageSrc;
    } else {
      objectUrl = URL.createObjectURL(imageSrc);
      img.src = objectUrl;
    }

    img.onload = () => {
      setImgElement(img);
      // Reset controls to sensible defaults
      setZoom(1.0);
      setPanX(0);
      setPanY(0);
      setRotation(0);
      setFitMode(defaultFitMode);
    };

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [imageSrc, isOpen, defaultFitMode]);

  // Redraw canvas whenever controls or image change
  const drawCanvas = () => {
    if (!imgElement || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use crisp high resolution canvas
    const containerWidth = 600;
    const containerHeight = 450;
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Clean background fill (soft medical gradient/backdrop)
    const gradient = ctx.createLinearGradient(0, 0, containerWidth, containerHeight);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, containerWidth, containerHeight);

    ctx.save();

    // Move to center of canvas for transformations
    ctx.translate(containerWidth / 2 + panX, containerHeight / 2 + panY);
    ctx.rotate((rotation * Math.PI) / 180);

    const imgWidth = imgElement.naturalWidth || imgElement.width;
    const imgHeight = imgElement.naturalHeight || imgElement.height;

    // Calculate scaling based on fit mode
    let baseScale = 1.0;
    if (fitMode === 'contain') {
      const scaleX = containerWidth / imgWidth;
      const scaleY = containerHeight / imgHeight;
      baseScale = Math.min(scaleX, scaleY) * 0.92; // leave slight margin
    } else if (fitMode === 'cover') {
      const scaleX = containerWidth / imgWidth;
      const scaleY = containerHeight / imgHeight;
      baseScale = Math.max(scaleX, scaleY);
    } else {
      baseScale = Math.min(containerWidth / imgWidth, containerHeight / imgHeight);
    }

    const finalScale = baseScale * zoom;
    const drawW = imgWidth * finalScale;
    const drawH = imgHeight * finalScale;

    // Draw centered image
    ctx.drawImage(imgElement, -drawW / 2, -drawH / 2, drawW, drawH);

    ctx.restore();

    // Update real-time live preview data URL
    setPreviewDataUrl(canvas.toDataURL('image/png'));
  };

  useEffect(() => {
    drawCanvas();
  }, [imgElement, zoom, panX, panY, rotation, fitMode]);

  // Handle Dragging (Mouse & Touch)
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - panX, y: clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setPanX(clientX - dragStart.x);
    setPanY(clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Button step handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 3.0));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.5));
  const handlePan = (dx: number, dy: number) => {
    setPanX((prev) => prev + dx);
    setPanY((prev) => prev + dy);
  };
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handleReset = () => {
    setZoom(1.0);
    setPanX(0);
    setPanY(0);
    setRotation(0);
    setFitMode(defaultFitMode);
  };

  const handleSave = () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (!blob) return;

      const originalName = typeof imageSrc === 'object' && imageSrc.name
        ? imageSrc.name.replace(/\.[^/.]+$/, "")
        : "adjusted_doctor_photo";
      const fileName = `${originalName}_framed.png`;

      const file = new File([blob], fileName, { type: 'image/png' });
      onSave(file, previewDataUrl);
      onClose();
    }, 'image/png', 0.95);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <Sparkles size={20} style={{ color: '#0284c7' }} />
            <span>{title}</span>
          </div>
          <button type="button" onClick={onClose} className={styles.closeBtn} title="Close Editor">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {/* Main Editor Workspace */}
          <div className={styles.editorWorkspace}>
            <div
              className={styles.canvasWrapper}
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
            >
              <div className={styles.canvasHint}>
                <Hand size={14} /> Drag image to adjust position | Scroll or use controls to zoom
              </div>
              <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>

            {/* Controls Panel */}
            <div className={styles.controlsPanel}>
              {/* Zoom Controls */}
              <div className={styles.controlGroup}>
                <div className={styles.groupLabel}>
                  <span>Zoom Scale ({(zoom * 100).toFixed(0)}%)</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button type="button" className={styles.ctrlBtn} onClick={handleZoomOut} title="Zoom Out">
                      <ZoomOut size={14} /> Zoom -
                    </button>
                    <button type="button" className={styles.ctrlBtn} onClick={handleZoomIn} title="Zoom In">
                      <ZoomIn size={14} /> Zoom +
                    </button>
                  </div>
                </div>
                <div className={styles.sliderRow}>
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className={styles.zoomSlider}
                  />
                </div>
              </div>

              {/* Directional Position D-Pad */}
              <div className={styles.controlGroup}>
                <div className={styles.groupLabel}>
                  <span>Move Image Position</span>
                </div>
                <div className={styles.buttonGrid}>
                  <button type="button" className={styles.ctrlBtn} onClick={() => handlePan(-25, 0)} title="Move Left">
                    <MoveLeft size={16} /> Left
                  </button>
                  <button type="button" className={styles.ctrlBtn} onClick={() => handlePan(25, 0)} title="Move Right">
                    <MoveRight size={16} /> Right
                  </button>
                  <button type="button" className={styles.ctrlBtn} onClick={() => handlePan(0, -25)} title="Move Up">
                    <MoveUp size={16} /> Up
                  </button>
                  <button type="button" className={styles.ctrlBtn} onClick={() => handlePan(0, 25)} title="Move Down">
                    <MoveDown size={16} /> Down
                  </button>
                </div>
              </div>

              {/* Fit Mode & Utilities */}
              <div className={styles.controlGroup}>
                <div className={styles.groupLabel}>
                  <span>Display Fit & Rotation</span>
                </div>
                <div className={styles.buttonGrid}>
                  <button
                    type="button"
                    className={`${styles.ctrlBtn} ${fitMode === 'contain' ? styles.activeFitBtn : ''}`}
                    onClick={() => setFitMode('contain')}
                    title="Preserve Full Photo (Contain)"
                  >
                    Contain (Full)
                  </button>
                  <button
                    type="button"
                    className={`${styles.ctrlBtn} ${fitMode === 'cover' ? styles.activeFitBtn : ''}`}
                    onClick={() => setFitMode('cover')}
                    title="Fill Container (Cover)"
                  >
                    Cover (Fill)
                  </button>
                  <button type="button" className={styles.ctrlBtn} onClick={handleRotate} title="Rotate 90°">
                    <RotateCw size={14} /> Rotate
                  </button>
                  <button type="button" className={styles.ctrlBtn} onClick={handleReset} title="Reset Position & Zoom">
                    <RefreshCw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Live Website Preview Sidebar */}
          <div className={styles.previewSidebar}>
            <div className={styles.previewBox}>
              <div className={styles.groupLabel} style={{ marginBottom: '8px', width: '100%' }}>
                <Eye size={14} style={{ color: '#0284c7' }} />
                <span>Doctor Card Live Preview</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '12px' }}>
                Exact framing as shown on Doctor Profile & Cards across desktop and mobile.
              </p>

              {/* Doctor Card Mockup */}
              <div className={styles.previewCardDoc}>
                <div className={styles.previewDocImgWrapper}>
                  {previewDataUrl && (
                    <img
                      src={previewDataUrl}
                      alt="Doctor Live Preview"
                      className={styles.previewDocImg}
                    />
                  )}
                </div>
                <div style={{ padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>Dr Vangapandu Nirmala</div>
                  <div style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 600 }}>Neurologist</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={styles.modalFooter}>
          <button type="button" onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </button>
          <button type="button" onClick={handleSave} className={styles.saveBtn}>
            <Check size={16} /> Save Image
          </button>
        </div>
      </div>
    </div>
  );
}
