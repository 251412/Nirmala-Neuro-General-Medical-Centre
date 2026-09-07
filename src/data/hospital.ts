export interface HospitalSocialLinks {
  facebook: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  instagram: string;
}

export interface HospitalInfo {
  name: string;
  shortName: string;
  tagline: string;
  heroTagline: string;
  description: string;
  aboutUs: string;
  mission: string;
  vision: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  phone: string;
  phoneRaw: string;
  secondaryPhone: string;
  secondaryPhoneRaw: string;
  email: string;
  emergencyNumber: string;
  emergencyNumberRaw: string;
  workingHours: string;
  socialLinks: HospitalSocialLinks;
  googleMapsUrl: string;
  googleMapsDirectionsUrl: string;
  googlePlaceId: string;
  mapEmbedUrl: string;
  latitude: number;
  longitude: number;
  logo: string;
  favicon: string;
}

export const hospitalInfo: HospitalInfo = {
  name: 'Nirmala Neuro & General Medical Centre',
  shortName: 'Nirmala Medical',
  tagline: 'Advanced Neurological & Comprehensive General Healthcare',
  heroTagline: 'Expert Neurological Care & Advanced General Medicine Under One Roof',
  description: 'Leading multispecialty healthcare center in Vizianagaram providing expert neurological interventions, stroke management, general medicine, and 24/7 emergency medical care.',
  aboutUs: 'Nirmala Neuro & General Medical Centre was established with a mission to deliver compassionate, high-quality, and affordable healthcare to the people of Vizianagaram and surrounding regions. Founded by Dr. Vangapandu Nirmala, a distinguished neurologist with nearly two decades of clinical expertise, our center brings world-class diagnostic, therapeutic, and emergency medical services under one roof.',
  mission: 'To provide patient-centered, state-of-the-art neurological and medical care with ethical standards, clinical excellence, and deep compassion.',
  vision: 'To be the premier center of excellence for neurological health, stroke rehabilitation, and comprehensive internal medicine in North Coastal Andhra Pradesh.',
  address: 'Back of INOX Multiplex, Opposite RTC Complex, Fort Area, Vizianagaram, Andhra Pradesh - 535003',
  city: 'Vizianagaram',
  state: 'Andhra Pradesh',
  country: 'India',
  pincode: '535003',
  phone: '6305471147 / 6302963312',
  phoneRaw: '6305471147',
  secondaryPhone: '6302963312',
  secondaryPhoneRaw: '6302963312',
  email: 'nirmalaneurocare@gmail.com',
  emergencyNumber: '6305471147 / 6302963312',
  emergencyNumberRaw: '6305471147',
  workingHours: 'Sunday to Friday: 09:30 AM to 6:30 PM | Saturday: Closed',
  socialLinks: {
    facebook: 'https://facebook.com/nirmalahospital',
    twitter: 'https://twitter.com/nirmalahospital',
    linkedin: 'https://linkedin.com/company/nirmala-neuro-general',
    youtube: 'https://youtube.com/nirmalahospital',
    instagram: 'https://instagram.com/nirmalaneurocare'
  },
  googleMapsUrl: 'https://www.google.com/maps/place/Nirmala+Neuro+%26+General+Medical+Centre/@18.1068518,83.3932009,17z/data=!4m14!1m7!3m6!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!2sNirmala+Neuro+%26+General+Medical+Centre!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7!3m5!1s0x3a3be504cd790a65:0xe2fae04c868b4d7!8m2!3d18.1068468!4d83.3980718!16s%2Fg%2F11shr_nqs7?entry=ttu',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=18.1068468,83.3980718&destination_place_id=ChIJZQq5zUT1OzoR102LhkzA-uI',
  googlePlaceId: 'ChIJZQq5zUT1OzoR102LhkzA-uI',
  mapEmbedUrl: 'https://maps.google.com/maps?q=18.1068468,83.3980718+(Nirmala+Neuro+%26+General+Medical+Centre)&t=m&z=17&ie=UTF8&iwloc=B&output=embed',
  latitude: 18.1068468,
  longitude: 83.3980718,
  logo: '/logo.png',
  favicon: '/favicon.svg'
};
