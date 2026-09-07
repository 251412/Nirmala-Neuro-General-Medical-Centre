export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  category: 'Facilities' | 'Building' | 'Services' | 'Specialists';
  status: 'ACTIVE' | 'INACTIVE';
  displayOrder: number;
}

export const galleryData: GalleryItem[] = [
  {
    id: 'gallery-001',
    image: '/dr_nirmala_consultation.jpg',
    title: 'Dr. Vangapandu Nirmala Consultation Suite',
    caption: 'Chief Neurologist Dr. Vangapandu Nirmala in her consultation chamber providing patient-centered care.',
    category: 'Specialists',
    status: 'ACTIVE',
    displayOrder: 1
  },
  {
    id: 'gallery-002',
    image: '/hospital_waiting_hall.png',
    title: 'Outpatient Reception & Waiting Hall',
    caption: 'Spacious and clean waiting lounge equipped for patient comfort and rapid registration.',
    category: 'Facilities',
    status: 'ACTIVE',
    displayOrder: 2
  },
  {
    id: 'gallery-003',
    image: '/hospital_building_exterior.png',
    title: 'Hospital Building & Entrance',
    caption: 'Nirmala Neuro & General Medical Centre building located behind INOX Multiplex, Opp RTC Complex, Vizianagaram.',
    category: 'Building',
    status: 'ACTIVE',
    displayOrder: 3
  },
  {
    id: 'gallery-004',
    image: '/hospital_services_banner.png',
    title: 'Clinical Services & Treatment Guide',
    caption: 'Comprehensive listing of neurological interventions, brain & nerve diagnostics, and general medicine services.',
    category: 'Services',
    status: 'ACTIVE',
    displayOrder: 4
  },
  {
    id: 'gallery-005',
    image: '/dr_nirmala_banner.png',
    title: 'Neurology Specialty Care Board',
    caption: 'Specialist in Brain, Nerve & Spine Problems & General Medicine.',
    category: 'Specialists',
    status: 'ACTIVE',
    displayOrder: 5
  }
];
