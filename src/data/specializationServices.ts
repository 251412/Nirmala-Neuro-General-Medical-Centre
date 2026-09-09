export interface SpecializationService {
  id: string;
  slug: string;
  title: string;
  internalSourceTitle?: string;
  shortDescription: string;
  description: string;
  department: string;
  image: string;
  iconName: string;
  symptoms: string[];
  whenToSeekCare: string[];
  isEmergencyAlert?: boolean;
  emergencyNotice?: string;
  status: 'active' | 'inactive';
  displayOrder: number;
}

export const specializationServicesData: SpecializationService[] = [
  {
    id: 'migraine-headache',
    slug: 'migraine-headache',
    title: 'Migraine Headache',
    internalSourceTitle: 'Migraine Headache',
    shortDescription: 'Understanding and managing migraine headaches, recurrent throbbing pain, sensory sensitivity, and visual aura disturbances.',
    description: 'Migraine is a neurological condition that can cause repeated headaches, often with symptoms such as nausea or sensitivity to light and sound. Neurological evaluation can help identify the cause and guide appropriate management.',
    department: 'Neurology',
    image: '/images/specializations/migraine-headache.webp',
    iconName: 'Brain',
    symptoms: [
      'Intense, throbbing headache typically affecting one or both sides',
      'Increased sensitivity to bright light, sounds, or certain odors',
      'Nausea, upset stomach, or occasional vomiting',
      'Visual disturbances (auras) such as flashing lights, blind spots, or zig-zag patterns',
      'Lightheadedness or fatigue before and after headache episodes'
    ],
    whenToSeekCare: [
      'Headaches that occur frequently or worsen over time',
      'Headaches accompanied by sudden stiff neck, high fever, or confusion',
      'Sudden onset "thunderclap" headache reaching maximum intensity within seconds',
      'Headache following a head injury or physical trauma',
      'New headaches beginning after age 50 or differing significantly from previous headaches'
    ],
    status: 'active',
    displayOrder: 1
  },
  {
    id: 'bells-palsy-treatment',
    slug: 'bells-palsy-treatment',
    title: "Bell's Palsy Treatment",
    internalSourceTitle: 'Bells Palsy Treatment',
    shortDescription: 'Specialized clinical evaluation and therapy for acute facial nerve weakness and asymmetric facial muscle movement.',
    description: "Bell's palsy is a condition that can cause sudden weakness or paralysis on one side of the face. Early medical evaluation helps identify the cause and guide appropriate care.",
    department: 'Neurology',
    image: '/images/specializations/bells-palsy.webp',
    iconName: 'Activity',
    symptoms: [
      'Rapid onset of mild weakness to complete paralysis on one side of the face',
      'Facial drooping and difficulty making facial expressions, such as smiling or closing an eye',
      'Drooling from the affected corner of the mouth',
      'Pain around the jaw or in/behind the ear on the affected side',
      'Increased sensitivity to sound in the ear on the affected side and altered taste perception'
    ],
    whenToSeekCare: [
      'Any sudden facial weakness or drooping requires immediate medical evaluation to rule out stroke',
      'Difficulty closing an eye completely, which can risk corneal dryness and injury',
      'Facial weakness accompanied by weakness or numbness in an arm or leg',
      'Symptoms that do not begin to improve after several weeks'
    ],
    status: 'active',
    displayOrder: 2
  },
  {
    id: 'stroke-treatment',
    slug: 'stroke-treatment',
    title: 'Stroke Treatment',
    internalSourceTitle: 'Stroke Treatment',
    shortDescription: 'Urgent evaluation and comprehensive neurological management for acute ischemic and hemorrhagic cerebrovascular events.',
    description: 'A stroke occurs when blood flow to part of the brain is interrupted or when bleeding occurs in the brain. Stroke symptoms require urgent medical evaluation and treatment.',
    department: 'Neurology',
    image: '/images/specializations/stroke.webp',
    iconName: 'AlertTriangle',
    isEmergencyAlert: true,
    emergencyNotice: 'Suspected stroke is a medical emergency. If you or someone around you shows signs of face drooping, arm weakness, or speech difficulty (FAST), seek emergency medical attention immediately.',
    symptoms: [
      'Sudden numbness or weakness in the face, arm, or leg, especially on one side of the body',
      'Sudden confusion, trouble speaking, or difficulty understanding speech',
      'Sudden trouble seeing in one or both eyes or double vision',
      'Sudden trouble walking, dizziness, loss of balance, or lack of coordination',
      'Sudden severe headache with no known cause'
    ],
    whenToSeekCare: [
      'IMMEDIATELY CALL EMERGENCY SERVICES (FAST: Face drooping, Arm weakness, Speech difficulty, Time to call)',
      'Never wait to see if symptoms disappear on their own; early neurological intervention preserves brain function',
      'Do not give aspirin or food/drinks until medical evaluation determines whether the stroke is ischemic or hemorrhagic'
    ],
    status: 'active',
    displayOrder: 3
  },
  {
    id: 'epilepsy',
    slug: 'epilepsy',
    title: 'Epilepsy',
    internalSourceTitle: 'Epilepsy',
    shortDescription: 'Comprehensive diagnostic evaluation, EEG monitoring, and evidence-based therapeutic management for recurrent seizure disorders.',
    description: 'Epilepsy is a neurological condition characterized by recurrent seizures. Proper evaluation can help determine the type and cause of seizures and guide appropriate treatment.',
    department: 'Neurology',
    image: '/images/specializations/epilepsy.webp',
    iconName: 'Zap',
    symptoms: [
      'Temporary confusion, staring spells, or brief loss of responsiveness',
      'Uncontrollable jerking movements of the arms and legs',
      'Loss of consciousness or awareness during seizure episodes',
      'Psychological symptoms such as fear, anxiety, or déjà vu sensations',
      'Unusual sensory perceptions including tingling, visual flashes, or olfactory sensations'
    ],
    whenToSeekCare: [
      'A first-time seizure always requires prompt neurological and medical evaluation',
      'A seizure lasting longer than 5 minutes requires emergency medical assistance',
      'A second seizure follows immediately after the first without recovery of consciousness',
      'Seizures occurring in pregnant women, individuals with diabetes, or accompanied by high fever',
      'Injury sustained during a seizure'
    ],
    status: 'active',
    displayOrder: 4
  },
  {
    id: 'paralysis',
    slug: 'paralysis',
    title: 'Paralysis',
    internalSourceTitle: 'Paralysis Doctors',
    shortDescription: 'Diagnostic investigation, motor function assessment, and neuro-rehabilitation guidance for loss of muscle movement.',
    description: 'Paralysis refers to loss or reduction of muscle movement in part of the body. It can have several possible causes and requires medical evaluation to identify the underlying condition.',
    department: 'Neurology',
    image: '/images/specializations/paralysis.webp',
    iconName: 'UserCheck',
    symptoms: [
      'Partial or total inability to move a limb, one side of the body, or facial muscles',
      'Loss of sensation, numbness, or tingling in the affected area',
      'Muscle stiffness (spasticity) or involuntary muscle floppiness (flaccidity)',
      'Difficulty speaking, swallowing, or controlling facial movements',
      'Impaired balance and inability to support body weight'
    ],
    whenToSeekCare: [
      'Sudden onset of paralysis or weakness is a medical emergency requiring urgent hospital evaluation',
      'Gradual weakness spreading across muscles or limbs over days or weeks',
      'Loss of bladder or bowel control accompanied by lower limb weakness or back pain',
      'Muscle weakness following traumatic injury or severe infection'
    ],
    status: 'active',
    displayOrder: 5
  },
  {
    id: 'parkinsons-disease',
    slug: 'parkinsons-disease',
    title: "Parkinson's Disease",
    internalSourceTitle: 'Parkinson Disease',
    shortDescription: 'Movement disorder evaluation, tremor analysis, gait assessment, and tailored long-term neuro-management.',
    description: "Parkinson's disease is a neurological condition that can affect movement, balance and coordination. Neurological assessment helps in evaluating symptoms and planning appropriate care.",
    department: 'Neurology',
    image: '/images/specializations/parkinsons.webp',
    iconName: 'HeartPulse',
    symptoms: [
      'Resting tremor, often beginning in a hand, finger, or foot',
      'Slowed movement (bradykinesia), making simple tasks time-consuming and difficult',
      'Muscle stiffness and rigidity throughout the body with restricted range of motion',
      'Impaired posture, diminished balance, and unstable gait',
      'Changes in speech (soft or monotone voice) and micrographic changes in handwriting'
    ],
    whenToSeekCare: [
      'Noticeable tremors in hands, arms, or legs while resting',
      'Progressive slowness in walking, buttoning clothes, or getting up from chairs',
      'Frequent unexplained stumbling, balance loss, or falls',
      'Stiffness or reduced arm swing when walking'
    ],
    status: 'active',
    displayOrder: 6
  },
  {
    id: 'womens-neurological-care',
    slug: 'womens-neurological-care',
    title: "Women's Neurological Care",
    internalSourceTitle: 'Women Neurologist Doctors',
    shortDescription: 'Dedicated neurological care for women addressing headaches, neuromuscular health, and lifecycle-related neurological symptoms.',
    description: "Neurological care for women with symptoms or conditions affecting the brain, nerves and nervous system, with evaluation tailored to the individual's needs.",
    department: 'Neurology',
    image: '/images/specializations/womens-neurology.webp',
    iconName: 'Sparkles',
    symptoms: [
      'Recurrent migraines or tension headaches linked with hormonal or lifecycle phases',
      'Neurological concerns during pregnancy or the postpartum period',
      'Peripheral nerve compressions, carpal tunnel symptoms, or neuropathies',
      'Sleep disturbances, chronic fatigue, and memory or concentration changes',
      'Tremors, dizziness, or sensory changes requiring compassionate specialist assessment'
    ],
    whenToSeekCare: [
      'Severe or new headaches developing during pregnancy or postpartum',
      'Pre-existing neurological conditions (such as epilepsy or migraine) requiring medication review during family planning',
      'Numbness, tingling, or weakness in limbs interfering with daily tasks',
      'Persistent memory lapse, vertigo, or balance difficulties'
    ],
    status: 'active',
    displayOrder: 7
  },
  {
    id: 'brain-abscess',
    slug: 'brain-abscess',
    title: 'Brain Abscess',
    internalSourceTitle: 'Brain Abscess Treatment',
    shortDescription: 'Urgent diagnostic imaging and specialist neurological care for serious infection-related intracranial collections.',
    description: 'A brain abscess is a serious infection-related collection that can develop in the brain. It requires urgent medical assessment and appropriate specialist care.',
    department: 'Neurology',
    image: '/images/specializations/brain-abscess.webp',
    iconName: 'ShieldAlert',
    isEmergencyAlert: true,
    emergencyNotice: 'Brain abscess is a serious condition that requires urgent medical assessment, hospital admission, and specialized neuro-clinical care. Do not delay medical evaluation.',
    symptoms: [
      'Persistent, severe headache not relieved by common pain medication',
      'Fever, chills, and sweats (although fever may be absent in some cases)',
      'Neurological deficits such as weakness on one side of the body or speech changes',
      'Nausea, vomiting, and extreme drowsiness or lethargy',
      'Seizures or sudden changes in mental alertness, confusion, or irritability'
    ],
    whenToSeekCare: [
      'URGENT: Severe headache accompanied by fever, confusion, or sudden weakness',
      'Headache or neurological symptoms following an ear infection, sinus infection, or dental infection',
      'Sudden onset of seizures in an adult with fever or prior head surgery',
      'Deteriorating alertness or responsiveness requires immediate emergency room evaluation'
    ],
    status: 'active',
    displayOrder: 8
  },
  {
    id: 'neuropathic-pain',
    slug: 'neuropathic-pain',
    title: 'Neuropathic Pain',
    internalSourceTitle: 'Neuropathic Pain',
    shortDescription: 'Careful diagnostic assessment and symptom management for nerve injury, peripheral neuropathy, and chronic nerve pain.',
    description: 'Neuropathic pain can occur when nerves are damaged or affected. It may cause burning, tingling, numbness or shooting pain and may require neurological evaluation.',
    department: 'Neurology',
    image: '/images/specializations/neuropathic-pain.webp',
    iconName: 'Flame',
    symptoms: [
      'Burning, shooting, or electric shock-like sensations along nerve pathways',
      'Persistent numbness, "pins and needles", or tingling sensations in hands and feet',
      'Heightened sensitivity where light touch or clothing triggers discomfort (allodynia)',
      'Gradual loss of sensation leading to difficulty feeling balance or temperature changes',
      'Nighttime pain flare-ups that disrupt restorative sleep'
    ],
    whenToSeekCare: [
      'Burning pain or numbness that spreads up the legs or arms',
      'Pain that does not respond to standard pain relievers or worsens over time',
      'Loss of sensation that increases the risk of undetected cuts, sores, or foot ulcers',
      'Pain accompanied by muscle weakness or loss of coordination'
    ],
    status: 'active',
    displayOrder: 9
  },
  {
    id: 'brain-tumor',
    slug: 'brain-tumor',
    title: 'Brain Tumor',
    internalSourceTitle: 'Brain Tumor',
    shortDescription: 'Comprehensive neurological assessment, advanced neuro-imaging review, and clinical guidance for abnormal intracranial cell growths.',
    description: 'A brain tumor is an abnormal growth of cells in or around the brain. Symptoms and treatment depend on the type, size and location, so specialist evaluation is important.',
    department: 'Neurology',
    image: '/images/specializations/brain-tumor.webp',
    iconName: 'Crosshair',
    symptoms: [
      'New or unusual headaches that are often worse in the morning or upon coughing/straining',
      'Unexplained nausea, vomiting, and persistent morning sickness sensations',
      'Vision changes such as blurred vision, double vision, or loss of peripheral vision',
      'Gradual loss of movement or sensation in an arm or a leg',
      'Difficulty with balance, speech difficulties, or personality and cognitive changes'
    ],
    whenToSeekCare: [
      'New onset of seizures in someone with no prior history of epilepsy',
      'Progressive headaches that steadily increase in frequency and intensity',
      'Unexplained changes in vision, speech, hearing, or emotional personality',
      'Progressive weakness or numbness on one side of the body'
    ],
    status: 'active',
    displayOrder: 10
  },
  {
    id: 'brain-disorders',
    slug: 'brain-disorders',
    title: 'Brain Disorders',
    internalSourceTitle: 'Brain Disorder',
    shortDescription: 'Holistic clinical evaluation and treatment planning for conditions affecting brain functions, cognition, memory, and motor control.',
    description: 'Brain disorders can affect functions such as movement, memory, sensation, speech or coordination. Neurological evaluation helps identify the underlying cause and guide appropriate care.',
    department: 'Neurology',
    image: '/images/specializations/brain-disorder.webp',
    iconName: 'Cpu',
    symptoms: [
      'Changes in memory, recall, orientation, or problem-solving capability',
      'Difficulty coordinating movements, unsteadiness, or frequent loss of balance',
      'Speech difficulties, slurring, or struggling to find familiar words',
      'Sensory alterations including numbness, tingling, or unexplained dizziness and vertigo',
      'Changes in sleep architecture, mood, alertness, or motor agility'
    ],
    whenToSeekCare: [
      'Noticeable memory decline or cognitive confusion that affects daily routines',
      'Sudden or progressive coordination difficulties and unsteadiness while walking',
      'Persistent vertigo or dizziness not resolving with rest',
      'Any unexplained neurological symptom impacting quality of life and independence'
    ],
    status: 'active',
    displayOrder: 11
  }
];
