export interface NavItem {
  label: string;
  path: string;
  isButton?: boolean;
  buttonClass?: string;
  isEmergency?: boolean;
}

export const mainNavItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Doctors', path: '/doctors' },
  { label: 'Departments', path: '/departments' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Health Blog', path: '/blog' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Emergency 24/7', path: '/emergency', isEmergency: true },
  { label: 'Book Appointment', path: '/appointment', isButton: true, buttonClass: 'btn btn-primary' }
];

export const footerQuickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Doctors', path: '/doctors' },
  { label: 'Medical Departments', path: '/departments' },
  { label: 'Hospital Gallery', path: '/gallery' },
  { label: 'Health Articles & Blog', path: '/blog' },
  { label: 'Contact Us', path: '/contact' },
  { label: '24/7 Emergency Care', path: '/emergency' }
];

export const footerDepartments = [
  { name: 'Neurology & Neurosurgery', path: '/departments/neurology' },
  { name: 'General Medicine', path: '/departments/general-medicine' },
  { name: 'Cardiology', path: '/departments/cardiology' }
];
