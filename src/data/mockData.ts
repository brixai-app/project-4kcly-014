import type { ContactSubject, Instrument, InstrumentCategory } from '@/types';

export const categories: InstrumentCategory[] = ['Strings', 'Percussion', 'Wind', 'Keyboard', 'Electronic', 'Fusion'];

export const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
  { label: 'X', href: 'https://x.com' },
];

export const contactDetails = {
  studioName: 'SurSangeet',
  email: 'hello@sursangeet.com',
  phone: '+91 98765 43210',
  address: 'Mumbai, India',
  hours: 'Mon–Sat · 10:00–19:00',
};

export const contactSubjects: ContactSubject[] = ['General Inquiry', 'Book a Session', 'Collaboration', 'Press'];

export const instruments: Instrument[] = [
  {
    id: 'sitar-noir',
    name: 'Noir Sitar',
    category: 'Strings',
    price: '₹48,000',
    description: 'A stage-ready sitar with a deep lacquer finish, resonant gourd body, and a luminous, articulate upper register.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    accent: 'red',
    featured: true,
    specifications: { origin: 'India', material: 'Teak, gourd, brass', tuning: 'C# / D', range: '3 octaves', finish: 'Hand-polished gloss' },
    tags: ['featured', 'classical', 'stage'],
  },
  {
    id: 'tabla-ember',
    name: 'Ember Tabla',
    category: 'Percussion',
    price: '₹22,500',
    description: 'A paired tabla set tuned for crisp attack, warm bass bloom, and a balanced concert-stage response.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85',
    accent: 'green',
    specifications: { origin: 'North India', material: 'Sheesham, skin, steel', tuning: 'D / A', weight: '4.2 kg', finish: 'Natural matte' },
    tags: ['rhythm', 'handcrafted'],
  },
  {
    id: 'bansuri-aurora',
    name: 'Aurora Bansuri',
    category: 'Wind',
    price: '₹9,800',
    description: 'A bamboo bansuri with breathy warmth, precise intonation, and a soft, singing top end.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    accent: 'blue',
    specifications: { origin: 'India', material: 'Bamboo', tuning: 'G', range: '2 octaves', dimensions: '19 in' },
    tags: ['melodic', 'folk'],
  },
  {
    id: 'harmonium-lattice',
    name: 'Lattice Harmonium',
    category: 'Keyboard',
    price: '₹36,000',
    description: 'A compact reed harmonium with a responsive bellows action and a richly voiced, devotional tone.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
    accent: 'red',
    featured: true,
    specifications: { origin: 'India', material: 'Wood, brass reeds', tuning: 'A=440', dimensions: '24 x 14 in', finish: 'Satin walnut' },
    tags: ['studio', 'devotional'],
  },
  {
    id: 'synth-volt',
    name: 'Volt Synth',
    category: 'Electronic',
    price: '₹64,000',
    description: 'A performance synth with tactile controls, wide modulation depth, and a cinematic low-end presence.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
    accent: 'blue',
    specifications: { origin: 'Global', material: 'Aluminum, polymer', range: '5 octaves', dimensions: '37 keys', finish: 'Powder-coated black' },
    tags: ['modular', 'live'],
  },
  {
    id: 'fusion-raga-kit',
    name: 'Raga Fusion Kit',
    category: 'Fusion',
    price: '₹52,000',
    description: 'An experimental hybrid instrument pairing acoustic resonance with electronic texture for contemporary ensembles.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    accent: 'green',
    featured: true,
    specifications: { origin: 'India', material: 'Mixed media', weight: '6.8 kg', finish: 'Textured lacquer' },
    tags: ['hybrid', 'experimental'],
  },
  {
    id: 'mridangam-echo',
    name: 'Echo Mridangam',
    category: 'Percussion',
    price: '₹28,500',
    description: 'A balanced mridangam with a focused center tone and a resonant bass head for intricate rhythmic phrasing.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    accent: 'red',
    specifications: { origin: 'South India', material: 'Jackfruit wood, skin', tuning: 'Pitch-matched', weight: '5.1 kg' },
    tags: ['classical', 'ensemble'],
  },
  {
    id: 'veena-arc',
    name: 'Arc Veena',
    category: 'Strings',
    price: '₹71,000',
    description: 'A sculptural veena with a long sustain, rounded bass, and a ceremonial presence on stage.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    accent: 'green',
    specifications: { origin: 'India', material: 'Rosewood, brass', tuning: 'D / G', dimensions: '52 in', finish: 'Deep oil polish' },
    tags: ['heritage', 'concert'],
  },
  {
    id: 'tanpura-halo',
    name: 'Halo Tanpura',
    category: 'Strings',
    price: '₹39,500',
    description: 'A drone instrument with a velvet sustain and a refined overtone shimmer that anchors the ensemble.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    accent: 'blue',
    specifications: { origin: 'India', material: 'Teak, gourd, steel', tuning: 'Sa / Pa', range: 'Drone', finish: 'Gloss amber' },
    tags: ['drone', 'meditative'],
  },
];

export default instruments;
export const mockData = instruments;

export const sizeGuide: any = [
  { size: 'XS', chest: '34-36', waist: '28-30' },
  { size: 'S', chest: '36-38', waist: '30-32' },
  { size: 'M', chest: '38-40', waist: '32-34' },
  { size: 'L', chest: '40-42', waist: '34-36' },
  { size: 'XL', chest: '42-44', waist: '36-38' },
];

export const editorialContent: any = {
  title: 'Crafted with Purpose',
  subtitle: 'Modern Aesthetics & Timeless Form',
  description: 'Every collection is meticulously designed to merge functional utility with striking visual hierarchy.',
  sections: [],
};
