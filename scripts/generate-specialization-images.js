import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const specs = [
  {
    name: 'migraine-headache',
    title: 'Migraine Headache',
    subtitle: 'Neurological Evaluation & Care',
    gradStart: '#1e3a8a',
    gradEnd: '#0284c7',
    accent: '#38bdf8',
    iconPath: `<path d="M12 2a9 9 0 0 0-9 9c0 3.5 2 6.5 5 7.8V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.2c3-1.3 5-4.3 5-7.8a9 9 0 0 0-9-9z" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
               <path d="M9 10a3 3 0 0 1 6 0c0 2-3 3-3 5" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
               <circle cx="12" cy="18" r="1" fill="#38bdf8"/>
               <path d="M5 6L3 4M19 6l2-2M2 11h2M20 11h2" stroke="#fcd34d" stroke-width="2" stroke-linecap="round"/>`
  },
  {
    name: 'bells-palsy',
    title: "Bell's Palsy",
    subtitle: 'Facial Nerve Clinical Therapy',
    gradStart: '#0f4c81',
    gradEnd: '#0d9488',
    accent: '#2dd4bf',
    iconPath: `<circle cx="12" cy="12" r="9" fill="none" stroke="#2dd4bf" stroke-width="2.5"/>
               <path d="M9 10h.01M15 10h.01" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
               <path d="M9 15c1 1.5 2.5 2 4.5 1.5 1.5-.4 2.5-1.5 2.5-1.5" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
               <path d="M12 6v6" stroke="#99f6e4" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 3"/>`
  },
  {
    name: 'stroke',
    title: 'Stroke Treatment',
    subtitle: 'Urgent Resuscitation & Care',
    gradStart: '#881337',
    gradEnd: '#0f4c81',
    accent: '#fb7185',
    iconPath: `<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" stroke="#fb7185" stroke-width="2.5" stroke-linecap="round"/>
               <circle cx="12" cy="12" r="6" fill="none" stroke="#ffffff" stroke-width="2.5"/>
               <path d="M12 9v3l2 2" stroke="#fcd34d" stroke-width="2" stroke-linecap="round"/>`
  },
  {
    name: 'epilepsy',
    title: 'Epilepsy & Seizures',
    subtitle: 'EEG & Diagnostic Clinic',
    gradStart: '#31104b',
    gradEnd: '#0f4c81',
    accent: '#c084fc',
    iconPath: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="none" stroke="#c084fc" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
               <path d="M2 12h4l2-4 3 8 3-6 2 3 4-1" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  {
    name: 'paralysis',
    title: 'Paralysis Care',
    subtitle: 'Motor Function & Rehabilitation',
    gradStart: '#1e293b',
    gradEnd: '#0284c7',
    accent: '#60a5fa',
    iconPath: `<circle cx="12" cy="5" r="3" fill="none" stroke="#60a5fa" stroke-width="2.5"/>
               <path d="M12 8v8M8 12h8M9 21l3-5 3 5" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
               <circle cx="12" cy="12" r="7" fill="none" stroke="#93c5fd" stroke-width="1.5" stroke-dasharray="3 3"/>`
  },
  {
    name: 'parkinsons',
    title: "Parkinson's Disease",
    subtitle: 'Movement & Tremor Evaluation',
    gradStart: '#111827',
    gradEnd: '#1e40af',
    accent: '#38bdf8',
    iconPath: `<path d="M22 12h-4l-3 9L9 3l-3 9H2" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
               <circle cx="12" cy="12" r="3" fill="none" stroke="#fcd34d" stroke-width="2"/>`
  },
  {
    name: 'womens-neurology',
    title: "Women's Neurological Care",
    subtitle: 'Specialized Neurological Health',
    gradStart: '#4c1d95',
    gradEnd: '#0284c7',
    accent: '#f472b6',
    iconPath: `<circle cx="12" cy="8" r="5" fill="none" stroke="#f472b6" stroke-width="2.5"/>
               <path d="M12 13v8M9 17h6" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
               <path d="M16 4l2-2M20 7l2-1" stroke="#fcd34d" stroke-width="2" stroke-linecap="round"/>`
  },
  {
    name: 'brain-abscess',
    title: 'Brain Abscess',
    subtitle: 'Urgent Medical Assessment',
    gradStart: '#7f1d1d',
    gradEnd: '#1e293b',
    accent: '#f87171',
    iconPath: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="#f87171" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
               <line x1="12" y1="8" x2="12" y2="12" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
               <circle cx="12" cy="16" r="1.2" fill="#ffffff"/>`
  },
  {
    name: 'neuropathic-pain',
    title: 'Neuropathic Pain',
    subtitle: 'Nerve Health & Relief Guidance',
    gradStart: '#3b0764',
    gradEnd: '#c2410c',
    accent: '#fb923c',
    iconPath: `<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" fill="none" stroke="#fb923c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
               <path d="M12 17v-3" stroke="#fef08a" stroke-width="2" stroke-linecap="round"/>`
  },
  {
    name: 'brain-tumor',
    title: 'Brain Tumor',
    subtitle: 'Neuro-Oncological Assessment',
    gradStart: '#1e1b4b',
    gradEnd: '#0f4c81',
    accent: '#a78bfa',
    iconPath: `<circle cx="12" cy="12" r="9" fill="none" stroke="#a78bfa" stroke-width="2.5"/>
               <circle cx="12" cy="12" r="4" fill="#a78bfa" fill-opacity="0.3" stroke="#ffffff" stroke-width="2"/>
               <line x1="12" y1="2" x2="12" y2="6" stroke="#fcd34d" stroke-width="2"/>
               <line x1="12" y1="18" x2="12" y2="22" stroke="#fcd34d" stroke-width="2"/>
               <line x1="2" y1="12" x2="6" y2="12" stroke="#fcd34d" stroke-width="2"/>
               <line x1="18" y1="12" x2="22" y2="12" stroke="#fcd34d" stroke-width="2"/>`
  },
  {
    name: 'brain-disorder',
    title: 'Brain Disorders',
    subtitle: 'Cognitive & Neurological Care',
    gradStart: '#042f2e',
    gradEnd: '#0f4c81',
    accent: '#2dd4bf',
    iconPath: `<rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="#2dd4bf" stroke-width="2.5"/>
               <circle cx="9" cy="9" r="2" fill="#ffffff"/>
               <circle cx="15" cy="9" r="2" fill="#ffffff"/>
               <circle cx="12" cy="15" r="2" fill="#ffffff"/>
               <line x1="9" y1="9" x2="12" y2="15" stroke="#99f6e4" stroke-width="2"/>
               <line x1="15" y1="9" x2="12" y2="15" stroke="#99f6e4" stroke-width="2"/>
               <line x1="9" y1="9" x2="15" y2="9" stroke="#99f6e4" stroke-width="2"/>`
  }
];

function generateSVG(item) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-${item.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.gradStart}"/>
      <stop offset="100%" stop-color="${item.gradEnd}"/>
    </linearGradient>
    <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(15,23,42,0.1)"/>
      <stop offset="100%" stop-color="rgba(15,23,42,0.85)"/>
    </linearGradient>
    <pattern id="grid-${item.name}" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="800" height="500" fill="url(#bg-${item.name})"/>
  <rect width="800" height="500" fill="url(#grid-${item.name})"/>

  <!-- Abstract decorative neural nodes and waves -->
  <g opacity="0.35">
    <circle cx="680" cy="120" r="140" fill="none" stroke="${item.accent}" stroke-width="1.5" stroke-dasharray="6 6"/>
    <circle cx="680" cy="120" r="80" fill="none" stroke="${item.accent}" stroke-width="2"/>
    <circle cx="680" cy="120" r="25" fill="${item.accent}" fill-opacity="0.3"/>
    
    <circle cx="120" cy="380" r="180" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="4 8"/>
    <path d="M 0 250 Q 200 180 400 250 T 800 250" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    <path d="M 0 280 Q 250 350 500 280 T 800 280" fill="none" stroke="${item.accent}" stroke-width="1.5" opacity="0.5"/>
  </g>

  <!-- Central Glowing Medical Badge -->
  <g transform="translate(400, 190)">
    <circle cx="0" cy="0" r="85" fill="rgba(15, 23, 42, 0.6)" stroke="${item.accent}" stroke-width="3"/>
    <circle cx="0" cy="0" r="70" fill="rgba(255, 255, 255, 0.05)"/>
    <g transform="translate(-40, -40) scale(3.33)">
      ${item.iconPath}
    </g>
  </g>

  <!-- Department & Title Label -->
  <g transform="translate(400, 350)">
    <!-- Department Badge -->
    <rect x="-105" y="0" width="210" height="28" rx="14" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="0" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="1">DEPARTMENT: NEUROLOGY</text>
    
    <!-- Title -->
    <text x="0" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">${item.title}</text>
    <text x="0" y="88" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="500" fill="#93c5fd" text-anchor="middle">${item.subtitle}</text>
  </g>
</svg>`;
}

const outDirs = [
  path.join(__dirname, '..', 'public', 'images', 'specializations'),
  path.join(__dirname, '..', 'src', 'assets', 'images', 'specializations')
];

outDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

specs.forEach(item => {
  const svgContent = generateSVG(item);
  outDirs.forEach(dir => {
    fs.writeFileSync(path.join(dir, `${item.name}.svg`), svgContent, 'utf8');
  });
});

console.log('Successfully generated all 11 specialization SVG assets.');
