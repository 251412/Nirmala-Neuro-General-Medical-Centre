import { hospitalInfo } from './hospital';

export interface EmergencyContent {
  title: string;
  subtitle: string;
  emergencyNumber: string;
  secondaryNumber: string;
  description: string;
  availability: string;
  address: string;
  instructions: string[];
  features: {
    title: string;
    description: string;
  }[];
}

export const emergencyContent: EmergencyContent = {
  title: '24/7 Emergency & Acute Care',
  subtitle: 'Immediate medical assistance for neurological episodes, acute stroke, trauma, and medical emergencies.',
  emergencyNumber: hospitalInfo.phoneRaw,
  secondaryNumber: hospitalInfo.secondaryPhoneRaw,
  description: 'During a stroke or acute medical crisis, every minute matters. Our emergency response desk provides instant guidance, immediate medical intake, and direct access to senior specialists.',
  availability: '24 Hours a Day, 7 Days a Week',
  address: hospitalInfo.address,
  instructions: [
    'Remain calm and immediately dial 6305471147 or 6302963312.',
    'Inform the emergency desk of the patient condition (e.g., loss of consciousness, stroke symptoms, high fever, chest pain).',
    'If the patient is experiencing a neurological episode or stroke, place them on their side in the recovery position.',
    'Do not administer oral food, water, or unprescribed medications to an unconscious or dysphagic patient.',
    'Keep any available prior prescriptions or medical history files accessible for the incoming emergency medical team.'
  ],
  features: [
    {
      title: 'Stroke Intervention Unit',
      description: 'Rapid diagnostic evaluation and acute medical resuscitation protocol for stroke patients.'
    },
    {
      title: '24/7 On-Call Medical Officer',
      description: 'Senior medical officers and nursing staff present around the clock for immediate admission.'
    },
    {
      title: 'Equipped Patient Ambulance',
      description: 'Equipped transport support to transfer critical patients safely to our facility.'
    }
  ]
};
