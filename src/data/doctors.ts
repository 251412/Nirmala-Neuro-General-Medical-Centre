export interface Doctor {
  id: string;
  name: string;
  photo: string;
  qualification: string;
  specialization: string;
  departmentId: string;
  departmentName: string;
  experience: string;
  designation: string;
  bio: string;
  consultationTimings: string[];
  phone: string;
  status: 'ACTIVE' | 'INACTIVE';
  displayOrder: number;
}

export const doctorsData: Doctor[] = [
  {
    id: 'doctor-001',
    name: 'Dr Vangapandu Nirmala',
    photo: '/dr_nirmala_consultation.jpg',
    qualification: 'MD, DM (Neurology)',
    specialization: 'Stroke Care, Brain Tumors, Epilepsy Treatment & Neurological Disorders',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    experience: '9+ Years',
    designation: 'Director & Chief Neurologist',
    bio: 'Dr Vangapandu Nirmala is a highly distinguished neurologist with nearly two decades of clinical experience treating complex brain, spinal cord, and neuromuscular conditions. She specializes in acute stroke management, epilepsy management, headache therapy, and comprehensive neuro-rehabilitation.',
    consultationTimings: [
      'Mon-Wed: 10:00 AM - 01:00 PM',
      'Fri: 10:00 AM - 01:00 PM'
    ],
    phone: '6305471147',
    status: 'ACTIVE',
    displayOrder: 1
  },
  {
    id: 'doctor-002',
    name: 'Dr. Rajesh Kumar',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    qualification: 'MD (General Medicine)',
    specialization: 'Diabetology, Hypertension & Chronic Infectious Disease Care',
    departmentId: 'general-medicine',
    departmentName: 'General Medicine',
    experience: '14+ Years',
    designation: 'Senior Consultant Physician',
    bio: 'Dr. Rajesh Kumar specializes in internal medicine and metabolic disorders. He works with patients to optimize long-term health through individualized pharmacotherapy, preventive screenings, and evidence-based lifestyle modifications.',
    consultationTimings: [
      'Mon-Sat: 09:00 AM - 12:00 PM',
      'Mon-Fri: 04:00 PM - 06:00 PM'
    ],
    phone: '6302963312',
    status: 'ACTIVE',
    displayOrder: 2
  },
  {
    id: 'doctor-003',
    name: 'Dr. Anjali Sharma',
    photo: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=600',
    qualification: 'MD, DM (Cardiology)',
    specialization: 'Preventive Cardiology, Echocardiography & Heart Failure Management',
    departmentId: 'cardiology',
    departmentName: 'Cardiology',
    experience: '10+ Years',
    designation: 'Consultant Cardiologist',
    bio: 'Dr. Anjali Sharma has extensive expertise in non-invasive cardiology diagnostic techniques, cardiovascular risk management, hypertension control, and preventative cardiac care programs.',
    consultationTimings: [
      'Tue-Thu: 11:00 AM - 02:00 PM',
      'Sat: 09:00 AM - 01:00 PM'
    ],
    phone: '6305471147',
    status: 'ACTIVE',
    displayOrder: 3
  }
];
