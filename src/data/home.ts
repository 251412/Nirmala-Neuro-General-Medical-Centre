export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  link: string;
  linkText: string;
}

export interface StatItem {
  number: string;
  label: string;
  iconName: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
}

export interface HomePageContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    image: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  features: FeatureCard[];
  stats: StatItem[];
  aboutPreview: {
    badge: string;
    heading: string;
    paragraphs: string[];
    features: string[];
    image: string;
  };
  whyChooseUs: {
    badge: string;
    heading: string;
    items: WhyChooseUsItem[];
  };
  appointmentCta: {
    title: string;
    subtitle: string;
    phoneText: string;
    buttonText: string;
  };
}

export const homeContent: HomePageContent = {
  hero: {
    badge: 'Nirmala Neuro & General Medical Centre',
    title: 'Expert Neurological Care & Advanced General Medicine',
    subtitle: 'Combining 12+ years of specialized neurological expertise with compassionate primary healthcare and 24/7 emergency response in Vizianagaram.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    primaryCtaText: 'Book Appointment',
    primaryCtaLink: '/appointment',
    secondaryCtaText: 'Call Emergency',
    secondaryCtaLink: 'tel:6305471147'
  },
  features: [
    {
      id: 'neuro-specialists',
      title: 'Find a Doctor',
      description: 'Search and connect with our experienced specialists.',
      iconName: 'Stethoscope',
      link: '/doctors',
      linkText: 'Search →'
    },
    {
      id: 'departments',
      title: 'Our Departments',
      description: 'Explore our specialized medical departments.',
      iconName: 'Building2',
      link: '/departments',
      linkText: 'View →'
    },
    {
      id: 'emergency-care',
      title: 'Emergency Care',
      description: '24/7 emergency assistance & rapid trauma response.',
      iconName: 'Activity',
      link: '/emergency',
      linkText: 'Call Now →'
    }
  ],
  stats: [
    { number: '12+', label: 'Years Neurological Experience', iconName: 'Award' },
    { number: '15,000+', label: 'Patients Treated Successfully', iconName: 'Users' },
    { number: '24/7', label: 'Emergency & Ambulance Desk', iconName: 'Activity' },
    { number: '100%', label: 'Dedicated Medical Care', iconName: 'ShieldCheck' }
  ],
  aboutPreview: {
    badge: 'About Our Hospital',
    heading: 'Dedicated to Advanced Neurological Rehabilitation & Internal Medicine',
    paragraphs: [
      'Nirmala Neuro & General Medical Centre is a specialized healthcare institute in Vizianagaram delivering dedicated clinical care for acute stroke, epilepsy, neuromuscular disorders, and chronic medical illnesses.',
      'Under the visionary leadership of Dr. Vangapandu Nirmala, our center combines cutting-edge diagnostic technology with ethical, transparent, and empathetic medical treatments.'
    ],
    features: [
      'Specialized Stroke & Epilepsy Care',
      'Hypertension & Diabetic Care Clinics',
      'Comprehensive Inpatient & Outpatient Units',
      'State-of-the-Art EEG & Diagnostic Diagnostics'
    ],
    image: '/hospital_building_exterior.png'
  },
  whyChooseUs: {
    badge: 'Why Choose Nirmala Medical',
    heading: 'Clinical Excellence & Patient-Centered Care',
    items: [
      {
        title: 'Experienced Specialist Leadership',
        description: 'Guided by senior DM Neurologist Dr. Vangapandu Nirmala with over 12 years of clinical practice.'
      },
      {
        title: 'Immediate Stroke & Emergency Response',
        description: 'Dedicated emergency protocol for rapid assessment during critical neurological episodes.'
      },
      {
        title: 'Holistic & Affordable Care',
        description: 'Ethical medical treatment plans structured to deliver high-quality care at accessible costs.'
      },
      {
        title: 'Modern Diagnostic Facilities',
        description: 'Comprehensive internal medicine, cardiology diagnostics, and neuro-testing facilities.'
      }
    ]
  },
  appointmentCta: {
    title: 'Need Expert Medical Consultation?',
    subtitle: 'Book an outpatient appointment with our neurology and general medicine experts today.',
    phoneText: 'Or call directly: 6305471147 / 6302963312',
    buttonText: 'Schedule Your Appointment'
  }
};
