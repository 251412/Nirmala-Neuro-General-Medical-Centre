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
    photo: '/dr_nirmala_vangapandu_desk.png',
    qualification: 'MD, DM (Neurology)',
    specialization: 'Stroke Care, Brain Tumors, Epilepsy Treatment & Neurological Disorders',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    experience: '12+ Years',
    designation: 'Director & Chief Neurologist',
    bio: 'Dr Vangapandu Nirmala is a highly distinguished neurologist with nearly two decades of clinical experience treating complex brain, spinal cord, and neuromuscular conditions. She specializes in acute stroke management, epilepsy management, headache therapy, and comprehensive neuro-rehabilitation.',
    consultationTimings: [
      'Mon-Wed: 10:00 AM - 01:00 PM',
      'Fri: 10:00 AM - 01:00 PM'
    ],
    phone: '6305471147',
    status: 'ACTIVE',
    displayOrder: 1
  }
];
