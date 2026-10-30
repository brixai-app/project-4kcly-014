import type { ContactInquiry, Instrument } from '@/types';

const delay = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export const mockData: Instrument[] = [
  {
    id: 'sitar-aurora',
    name: 'Aurora Sitar',
    category: 'Strings',
    price: 28999,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    description: 'A resonant sitar with a luminous maple body, tuned for expansive melodic phrasing and stage-ready projection.',
    featured: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 128,
    tags: ['handcrafted', 'concert'],
    specs: { origin: 'India', material: 'Maple, teak, brass', tuning: 'C#', includedAccessories: ['Hard case', 'Plectrum set'] },
  },
  {
    id: 'tabla-noir',
    name: 'Noir Tabla Set',
    category: 'Percussion',
    price: 17999,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    description: 'Balanced dayan and bayan pair with deep tonal response, crafted for nuanced rhythmic articulation.',
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 94,
    tags: ['stage', 'classical'],
    specs: { origin: 'India', material: 'Sheesham, steel', includedAccessories: ['Cushion rings', 'Tuning hammer'] },
  },
  {
    id: 'sax-ember',
    name: 'Ember Alto Saxophone',
    category: 'Wind',
    price: 45999,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    description: 'A warm brass alto saxophone with a responsive key action and a bold, lyrical voice.',
    inStock: true,
    rating: 4.7,
    reviewCount: 76,
    tags: ['brass', 'performance'],
    specs: { origin: 'Japan', material: 'Brass', finish: 'Lacquer', includedAccessories: ['Mouthpiece', 'Neck strap'] },
  },
  {
    id: 'keys-lumen',
    name: 'Lumen Stage Keys',
    category: 'Keyboard',
    price: 52999,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    description: 'A compact stage keyboard with expressive velocity response and a clean, modern interface.',
    featured: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 141,
    tags: ['stage', 'portable'],
    specs: { origin: 'Germany', material: 'Polycarbonate, metal', power: 'AC adapter', includedAccessories: ['Sustain pedal', 'Power supply'] },
  },
  {
    id: 'modular-pulse',
    name: 'Pulse Modular Synth',
    category: 'Electronic',
    price: 68999,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
    description: 'An expressive analog-digital hybrid with tactile controls and a wide sonic palette for modern composition.',
    inStock: false,
    rating: 4.6,
    reviewCount: 52,
    tags: ['synth', 'studio'],
    specs: { origin: 'USA', material: 'Aluminum, ABS', power: 'DC input', includedAccessories: ['Patch cables', 'Adapter'] },
  },
  {
    id: 'drum-echo',
    name: 'Echo Drum Kit',
    category: 'Percussion',
    price: 74999,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85',
    description: 'A full-bodied acoustic kit with punchy toms and a crisp snare designed for live dynamics.',
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 88,
    tags: ['acoustic', 'live'],
    specs: { origin: 'Taiwan', material: 'Birch, chrome', dimensions: '5-piece', includedAccessories: ['Drum throne', 'Sticks'] },
  },
  {
    id: 'guitar-velvet',
    name: 'Velvet Electric Guitar',
    category: 'Strings',
    price: 39999,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
    description: 'A sleek electric guitar with articulate pickups and a satin neck for fluid lead work.',
    inStock: true,
    rating: 4.7,
    reviewCount: 103,
    tags: ['electric', 'lead'],
    specs: { origin: 'Mexico', material: 'Alder, rosewood', finish: 'Satin', includedAccessories: ['Gig bag', 'Cable'] },
  },
  {
    id: 'mic-orbit',
    name: 'Orbit Studio Microphone',
    category: 'Accessories',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
    description: 'A studio condenser microphone with a detailed top end and a refined low-noise signal path.',
    inStock: true,
    rating: 4.9,
    reviewCount: 67,
    tags: ['studio', 'recording'],
    specs: { origin: 'South Korea', material: 'Metal alloy', includedAccessories: ['Shock mount', 'Pop filter'] },
  },
];

export const loadInstruments = async (ms = 650) => {
  await delay(ms);
  return mockData;
};

export const loadInstrumentById = async (id: string, ms = 450) => {
  await delay(ms);
  return mockData.find((instrument) => instrument.id === id) ?? null;
};

export const submitInquiry = async (inquiry: ContactInquiry, ms = 900) => {
  await delay(ms);
  const sanitized: ContactInquiry = {
    name: inquiry?.name?.trim() ?? '',
    email: inquiry?.email?.trim() ?? '',
    phone: inquiry?.phone?.trim() ?? '',
    instrumentId: inquiry?.instrumentId ?? '',
    subject: inquiry?.subject?.trim() ?? '',
    message: inquiry?.message?.trim() ?? '',
    preferredContact: inquiry?.preferredContact ?? 'email',
  };
  return { ok: true, inquiry: sanitized, referenceId: crypto.randomUUID() };
};

export default mockData;
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
