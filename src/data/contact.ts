import { hospitalInfo } from './hospital';

export interface ContactPageContent {
  title: string;
  subtitle: string;
  formTitle: string;
  formSubtitle: string;
  contactCards: {
    icon: string;
    title: string;
    value: string;
    subText?: string;
    link?: string;
  }[];
}

export const contactContent: ContactPageContent = {
  title: 'Contact Nirmala Medical Centre',
  subtitle: 'We are here to assist you. Get in touch with our team for consultations, enquiries, or location guidance.',
  formTitle: 'Send Us a Message',
  formSubtitle: 'Fill out the form below and our front desk officer will respond to your enquiry promptly.',
  contactCards: [
    {
      icon: 'MapPin',
      title: 'Hospital Address',
      value: hospitalInfo.address,
      link: hospitalInfo.googleMapsUrl
    },
    {
      icon: 'Phone',
      title: 'Phone Consultation & Appointments',
      value: hospitalInfo.phone,
      link: `tel:${hospitalInfo.phoneRaw}`
    },
    {
      icon: 'Mail',
      title: 'Email Address',
      value: hospitalInfo.email,
      link: `mailto:${hospitalInfo.email}`
    },
    {
      icon: 'Clock',
      title: 'OPD Working Hours',
      value: hospitalInfo.workingHours
    }
  ]
};
