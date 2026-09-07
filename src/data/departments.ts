export interface Department {
  id: string;
  name: string;
  slug: string;
  image: string;
  shortDescription: string;
  description: string;
  services: string[];
  status: 'ACTIVE' | 'INACTIVE';
  displayOrder: number;
}

export const departmentsData: Department[] = [
  {
    id: 'neurology',
    name: 'Neurology & Neurosurgery',
    slug: 'neurology',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    shortDescription: 'Advanced diagnosis and non-surgical / surgical treatment of complex brain, spinal cord, and nerve disorders.',
    description: 'The Department of Neurology & Neurosurgery at Nirmala Medical Centre provides round-the-clock specialized care for acute neurological emergencies, stroke resuscitation, seizure management, movement disorders, and chronic headache treatments. Led by Chief Neurologist Dr. Vangapandu Nirmala, our department offers comprehensive neurological evaluations and personalized treatment plans.',
    services: [
      'Acute Stroke Resuscitation & Management',
      'Epilepsy & Seizure Clinic',
      'Spine Care & Neuropathy Treatment',
      'Migraine & Chronic Headache Management',
      'Electroencephalogram (EEG) & Diagnostics'
    ],
    status: 'ACTIVE',
    displayOrder: 1
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    slug: 'general-medicine',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    shortDescription: 'Comprehensive primary care, chronic illness control, preventative checkups, and inpatient medicine.',
    description: 'Our General Medicine Department offers expert diagnosis and therapeutic management for a wide spectrum of adult health conditions. From hypertension control and diabetes management to acute infectious disease treatment and general health screenings, our physicians deliver patient-centered internal medicine care.',
    services: [
      'Hypertension & Vascular Care',
      'Diabetes & Metabolic Health',
      'Infectious Disease Management',
      'Geriatric & Preventative Healthcare',
      'Comprehensive Health Checkups'
    ],
    status: 'ACTIVE',
    displayOrder: 2
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    slug: 'cardiology',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800',
    shortDescription: 'Diagnostic, therapeutic, and preventive cardiac care for coronary, valvular, and circulatory conditions.',
    description: 'The Cardiology Department is dedicated to preventing, evaluating, and treating heart disease. Our clinical team provides non-invasive diagnostic evaluations including ECG, Echocardiography, and Treadmill Stress Testing alongside preventative cardiac counseling.',
    services: [
      'Echocardiography (ECG / Echo)',
      'Treadmill Test (TMT)',
      'Cardiovascular Risk Screening',
      'Heart Failure Care',
      'Hypertension & Lipid Management'
    ],
    status: 'ACTIVE',
    displayOrder: 3
  }
];
