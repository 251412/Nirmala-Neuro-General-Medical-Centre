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
  { label: 'Specialization & Services', path: '/specialization-services' },
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
  { label: 'Specialization & Services', path: '/specialization-services' },
  { label: 'Hospital Gallery', path: '/gallery' },
  { label: 'Health Articles & Blog', path: '/blog' },
  { label: 'Contact Us', path: '/contact' },
  { label: '24/7 Emergency Care', path: '/emergency' }
];

export const footerSpecializations = [
  { name: 'Migraine Headache', path: '/specialization-services/migraine-headache' },
  { name: 'Stroke Treatment', path: '/specialization-services/stroke-treatment' },
  { name: 'Epilepsy & Seizures', path: '/specialization-services/epilepsy' },
  { name: "Parkinson's Disease", path: '/specialization-services/parkinsons-disease' },
  { name: 'Paralysis Care', path: '/specialization-services/paralysis' },
  { name: 'Brain Disorders', path: '/specialization-services/brain-disorders' }
];

export const footerDepartments = footerSpecializations;
