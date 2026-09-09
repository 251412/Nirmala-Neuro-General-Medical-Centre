export const DEFAULT_DOCTOR_IMAGE = '/default_doctor_avatar.svg';
export const DEFAULT_DEPARTMENT_IMAGE = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800';
export const DEFAULT_SPECIALIZATION_IMAGE = 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800';
export const DEFAULT_BLOG_IMAGE = 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800';

/**
 * Normalizes image URLs so localhost backend paths work correctly on production deployments.
 */
export function getImageUrl(url?: string | null, fallback: string = DEFAULT_DOCTOR_IMAGE): string {
  if (!url || url.trim() === '') {
    return fallback;
  }
  
  // Handle legacy absolute localhost URLs saved in DB
  if (url.includes('localhost:8080')) {
    return url.replace(/^https?:\/\/localhost:8080/, '');
  }
  
  return url;
}

/**
 * Image error handler callback for <img> tags to safely fallback to a default image on 404/network errors.
 */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, fallback: string = DEFAULT_DOCTOR_IMAGE) {
  const target = e.currentTarget;
  if (target.src !== fallback && !target.src.endsWith(fallback)) {
    target.src = fallback;
  }
}
