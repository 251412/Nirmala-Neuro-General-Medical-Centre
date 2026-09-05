import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, RefreshCw, AlertCircle, Loader2, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import styles from '../styles/ImageUpload.module.css';
import ImageEditorModal from './ImageEditorModal';

export interface ImageUploadProps {
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  label?: string;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  token?: string;
}

export default function ImageUpload({
  value,
  onChange,
  multiple = false,
  label = "Upload Image",
  maxSizeMB = 5,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
  token
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Image Editor State
  const [editorFile, setEditorFile] = useState<File | string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert incoming value prop to list of image URLs
  const getExistingUrls = (): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean);
    return [value].filter(Boolean);
  };

  const currentUrls = getExistingUrls();

  const getAuthToken = () => {
    return token || localStorage.getItem('jwt_token') || '';
  };

  const validateFile = (file: File): string | null => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `Image size must be less than ${maxSizeMB} MB.`;
    }
    if (!acceptedFormats.includes(file.type.toLowerCase())) {
      return `Please upload a JPG, PNG or WEBP image.`;
    }
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
      return `Invalid file extension .${ext}. Only JPG, PNG, and WEBP allowed.`;
    }
    return null;
  };

  const uploadFileToBackend = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const authToken = getAuthToken();

    const response = await fetch('/api/uploads/images', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      body: formData
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || 'Image upload failed. Please try again.');
    }

    const data = await response.json();
    return data.imageUrl;
  };

  const handleFiles = async (files: FileList | File[]) => {
    setErrorMsg(null);
    const fileList = Array.from(files);

    if (fileList.length === 0) return;

    if (!multiple && fileList.length > 1) {
      setErrorMsg('Single file upload only. Please select one image.');
      return;
    }

    // Validate files
    for (const file of fileList) {
      const err = validateFile(file);
      if (err) {
        setErrorMsg(err);
        return;
      }
    }

    // Open Image Editor Modal for the first file selected
    setEditorFile(fileList[0]);
    setIsEditorOpen(true);
  };

  const handleSaveFromEditor = async (processedFile: File) => {
    setIsUploading(true);
    setUploadProgress(40);

    try {
      setUploadProgress(70);
      const uploadedUrl = await uploadFileToBackend(processedFile);
      setUploadProgress(100);

      if (!multiple) {
        onChange(uploadedUrl);
      } else {
        onChange([...currentUrls, uploadedUrl]);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(null), 800);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = async (urlToRemove: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      const authToken = getAuthToken();
      await fetch(`/api/uploads/images?url=${encodeURIComponent(urlToRemove)}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      }).catch(() => {});
    } catch (e) {
      // Non-critical cleanup
    }

    if (!multiple) {
      onChange('');
    } else {
      const updated = currentUrls.filter((u) => u !== urlToRemove);
      onChange(updated);
    }
  };

  const handleAdjustExisting = (url: string) => {
    setEditorFile(url);
    setIsEditorOpen(true);
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      {/* Show Upload Dropzone if not maxed out in single mode */}
      {(!multiple && currentUrls.length === 0) || multiple ? (
        <div
          className={`${styles.dropzone} ${isDragging ? styles.dropzoneDragging : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className={styles.hiddenInput}
            accept={acceptedFormats.join(',')}
            multiple={multiple}
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />

          <div className={styles.iconWrapper}>
            <UploadCloud size={26} />
          </div>

          <p className={styles.dropzoneText}>
            📷 Drag & Drop Image {multiple ? 's' : ''} or
          </p>

          <button
            type="button"
            className={styles.chooseBtn}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            Choose File {multiple ? 's' : ''}
          </button>

          <p className={styles.subText}>
            JPG, PNG, WEBP — Max {maxSizeMB} MB
          </p>
        </div>
      ) : null}

      {/* Uploading Progress */}
      {isUploading && (
        <div className={styles.progressContainer}>
          <div className={styles.progressText}>
            <span><Loader2 size={14} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} /> Uploading image...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className={styles.progressBarBg}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${uploadProgress || 10}%` }}
            />
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className={styles.errorAlert}>
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Image Preview List / Grid */}
      {currentUrls.length > 0 && (
        <div className={multiple ? styles.previewGrid : styles.previewList}>
          {currentUrls.map((url, index) => {
            const filename = url.split('/').pop() || 'uploaded_image.jpg';
            return (
              <div key={`${url}-${index}`} className={styles.previewCard}>
                <div className={styles.imageWrapper}>
                  <img
                    src={url}
                    alt={filename}
                    className={styles.previewImg}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400';
                    }}
                  />
                </div>

                <div className={styles.fileMeta}>
                  <span className={styles.fileName} title={filename}>{filename}</span>
                  <span className={styles.fileSize}>Uploaded Image</span>
                </div>

                <div className={styles.actionButtons}>
                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.replaceBtn}`}
                    onClick={() => handleAdjustExisting(url)}
                    title="Adjust Zoom / Position"
                  >
                    <SlidersHorizontal size={14} />
                    <span>Adjust</span>
                  </button>

                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.replaceBtn}`}
                    onClick={() => fileInputRef.current?.click()}
                    title="Replace Image"
                  >
                    <RefreshCw size={14} />
                    <span>Replace</span>
                  </button>

                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.removeBtn}`}
                    onClick={() => handleRemove(url)}
                    title="Remove Image"
                  >
                    <Trash2 size={14} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Image Editor Modal */}
      {editorFile && (
        <ImageEditorModal
          isOpen={isEditorOpen}
          imageSrc={editorFile}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSaveFromEditor}
          title="Adjust Image Framing & Position"
          defaultFitMode="contain"
        />
      )}
    </div>
  );
}
