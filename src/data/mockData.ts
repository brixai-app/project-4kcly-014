import type { CarouselSlide, FilterState, Instrument, InstrumentCategory, InstrumentCondition, InquiryTopic } from '@/types';

export const instrumentCategories: InstrumentCategory[] = ['string', 'wind', 'percussion', 'keyboard', 'electronic', 'folk'];
export const instrumentConditions: InstrumentCondition[] = ['museum', 'collector', 'restored', 'performance'];
export const inquiryTopics: InquiryTopic[] = ['availability', 'provenance', 'private-viewing', 'restoration', 'shipping'];

export const heroSlides: CarouselSlide[] = [
  {
    id: 'slide-1',
    title: 'A Stradivarian hush, held in crimson light',
    subtitle: 'Rare instruments presented as living artifacts, with provenance, patina, and performance history foregrounded.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
    eyebrow: 'Private Viewing 01',
  },
  {
    id: 'slide-2',
    title: 'Brass, wood, and wire in a museum-grade register',
    subtitle: 'A curated archive of instruments selected for tonal character, historical significance, and visual presence.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85',
    eyebrow: 'Curated Archive 02',
  },
  {
    id: 'slide-3',
    title: 'Craftsmanship that reads like a score',
    subtitle: 'Editorial storytelling for collectors, performers, and institutions seeking exceptional instruments.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
    eyebrow: 'Provenance Notes 03',
  },
];

export const instruments: Instrument[] = [
  {
    id: 'violin-1742',
    name: 'Cremona Violin, 1742',
    category: 'string',
    condition: 'museum',
    origin: 'Italy',
    year: '1742',
    price: '₹4,80,00,000',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
    description: 'A resonant old-master violin with a luminous varnish, balanced response, and documented European recital history.',
    story: 'The instrument carries a restrained, singing upper register and a deep, velvety lower voice. Its restoration was executed with archival discipline, preserving the original arching and the subtle wear patterns that collectors prize.',
    materials: ['spruce top', 'maple back', 'hand-applied varnish', 'ebony fittings'],
    soundSamples: [
      { label: 'Open strings', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: '00:18' },
      { label: 'Concert phrase', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: '00:24' },
    ],
    featured: true,
  },
  {
    id: 'saxophone-1958',
    name: 'Paris Alto Saxophone, 1958',
    category: 'wind',
    condition: 'collector',
    origin: 'France',
    year: '1958',
    price: '₹18,50,000',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85',
    description: 'A lacquered alto saxophone with a supple response and a warm, centered tone favored by studio soloists.',
    story: 'The keywork remains crisp, the engraving intact, and the bell flare retains a soft golden bloom. It is a collector-grade example with a voice that opens elegantly under breath.',
    materials: ['brass body', 'lacquer finish', 'mother-of-pearl touches', 'felt keywork'],
    soundSamples: [
      { label: 'Soft articulation', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', duration: '00:20' },
      { label: 'Full register', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', duration: '00:22' },
    ],
  },
  {
    id: 'tabla-1964',
    name: 'Banaras Tabla Pair, 1964',
    category: 'percussion',
    condition: 'restored',
    origin: 'India',
    year: '1964',
    price: '₹9,40,000',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
    description: 'A restored tabla pair with articulate dayan response and a rounded, resonant bayan ideal for recital settings.',
    story: 'The skins were carefully tensioned to preserve tonal bloom while restoring clarity. The pair offers a refined attack and a long, singing decay that suits both solo and ensemble performance.',
    materials: ['sheesham wood', 'goat skin', 'syahi', 'braided straps'],
    soundSamples: [
      { label: 'Teentaal cycle', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', duration: '00:16' },
      { label: 'Bass resonance', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', duration: '00:19' },
    ],
  },
  {
    id: 'piano-1931',
    name: 'Salon Upright Piano, 1931',
    category: 'keyboard',
    condition: 'collector',
    origin: 'Germany',
    year: '1931',
    price: '₹27,00,000',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
    description: 'A compact upright with a velvet middle register and a polished cabinet suited to intimate salons and studios.',
    story: 'The action has been regulated for a light, responsive touch. Its cabinet retains a restrained Art Deco profile, making it as visually compelling as it is musically articulate.',
    materials: ['spruce soundboard', 'cast iron frame', 'walnut veneer', 'felt hammers'],
    soundSamples: [
      { label: 'Chamber voicing', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', duration: '00:21' },
      { label: 'Pedal bloom', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', duration: '00:23' },
    ],
    featured: true,
  },
  {
    id: 'synth-1984',
    name: 'Analog Synthesizer, 1984',
    category: 'electronic',
    condition: 'performance',
    origin: 'Japan',
    year: '1984',
    price: '₹14,75,000',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    description: 'A performance-ready analog synthesizer with tactile controls, stable oscillators, and a cinematic low end.',
    story: 'Its circuitry has been serviced for stage reliability while preserving the original sonic architecture. The instrument excels in drones, arpeggios, and textural scoring.',
    materials: ['analog circuitry', 'wood side panels', 'metal chassis', 'tactile sliders'],
    soundSamples: [
      { label: 'Oscillator drift', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', duration: '00:17' },
      { label: 'Filter sweep', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', duration: '00:20' },
    ],
  },
  {
    id: 'sarangi-1890',
    name: 'Rajasthani Sarangi, 1890',
    category: 'folk',
    condition: 'museum',
    origin: 'India',
    year: '1890',
    price: '₹22,00,000',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    description: 'A deeply expressive bowed instrument with a vocal quality and a rare, timeworn patina.',
    story: 'The sarangi’s sympathetic strings create a halo around each note, producing a haunting resonance. Its surface bears the marks of generations of use, now stabilized for preservation and study.',
    materials: ['hardwood body', 'gut strings', 'sympathetic strings', 'hide membrane'],
    soundSamples: [
      { label: 'Meend phrase', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', duration: '00:18' },
      { label: 'Drone texture', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', duration: '00:22' },
    ],
  },
];

export const defaultFilterState: FilterState = {
  category: 'all',
  condition: 'all',
  origin: '',
  search: '',
};

export const editorialCopy = {
  brand: 'SurSangeet',
  heroTitle: 'Rare instruments, staged like a private recital.',
  heroSubtitle:
    'An editorial archive of exceptional musical instruments, where provenance, materiality, and sonic character are presented with museum-like restraint.',
  introTitle: 'The collection is curated, not crowded.',
  introBody:
    'SurSangeet brings together instruments of historical weight and contemporary relevance, each selected for tonal identity, craftsmanship, and visual presence.',
  invitationTitle: 'Private viewing by appointment',
  invitationBody:
    'For collectors, performers, and institutions seeking a discreet acquisition or a listening session, our team arranges guided viewings and provenance briefings.',
  footerNote: 'Ivory surfaces, charcoal depth, and crimson accents frame a collection built for connoisseurs.',
};

export const mockData = {
  heroSlides,
  instruments,
  instrumentCategories,
  instrumentConditions,
  inquiryTopics,
  defaultFilterState,
  editorialCopy,
};

export default mockData;