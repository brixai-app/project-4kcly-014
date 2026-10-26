import type { Types, Instrument, Category, CatalogFilter, ContactMessage, FormError } from '@/types';

const instruments: Instrument[] = [
  {
    id: 'inst-001',
    slug: 'sitar-heritage',
    name: 'Sitar Heritage',
    category: 'String',
    price: 24999,
    availability: 'available',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
    accent: 'red',
    description: 'A resonant sitar with a luminous upper register and a hand-finished gourd body.',
    origin: 'Jaipur, India',
    materials: ['Tuned teak neck', 'Pumpkin gourd', 'Brass frets'],
    featured: true,
  },
  {
    id: 'inst-002',
    slug: 'bansuri-dawn',
    name: 'Bansuri Dawn',
    category: 'Wind',
    price: 8999,
    availability: 'limited',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85',
    accent: 'blue',
    description: 'A concert bansuri with a breathy, meditative tone and balanced finger spacing.',
    origin: 'Varanasi, India',
    materials: ['Seasoned bamboo', 'Natural oil finish', 'Thread binding'],
  },
  {
    id: 'inst-003',
    slug: 'tabla-echo',
    name: 'Tabla Echo',
    category: 'Percussion',
    price: 15999,
    availability: 'available',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
    accent: 'green',
    description: 'A paired tabla set tuned for crisp dayan articulation and deep bayan bloom.',
    origin: 'Delhi, India',
    materials: ['Sheesham wood', 'Goat skin heads', 'Cotton rings'],
    featured: true,
  },
  {
    id: 'inst-004',
    slug: 'harmonium-atelier',
    name: 'Harmonium Atelier',
    category: 'Keyboard',
    price: 32999,
    availability: 'limited',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    accent: 'red',
    description: 'A compact reed instrument with a warm drone and a refined bellows response.',
    origin: 'Kolkata, India',
    materials: ['Solid wood case', 'Brass reeds', 'Leather bellows'],
  },
  {
    id: 'inst-005',
    slug: 'tanpura-studio',
    name: 'Tanpura Studio',
    category: 'String',
    price: 18999,
    availability: 'sold-out',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    accent: 'green',
    description: 'A drone instrument with a velvet sustain and a sculptural, gallery-grade silhouette.',
    origin: 'Mysuru, India',
    materials: ['Seasoned wood', 'Polished bridge', 'Hand-tied strings'],
  },
  {
    id: 'inst-006',
    slug: 'ghatam-ritual',
    name: 'Ghatam Ritual',
    category: 'Percussion',
    price: 11999,
    availability: 'available',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    accent: 'blue',
    description: 'A clay percussion vessel with a dry, articulate attack and rich tonal overtones.',
    origin: 'Chennai, India',
    materials: ['Fired clay', 'Mineral polish', 'Natural pigments'],
  },
];

const categories: Category[] = ['String', 'Wind', 'Percussion', 'Keyboard', 'Accessories'];

const filters: CatalogFilter = {
  category: 'All',
  availability: 'All',
  search: '',
};

const contactMessage: ContactMessage = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const formErrors: FormError[] = [];

const featuredContent = {
  headline: 'A curated instrument wardrobe for modern listeners and serious players.',
  subheadline:
    'SurSangeet pairs heritage craftsmanship with a restrained editorial lens, presenting each instrument as an object of sound, form, and lineage.',
  ctaLabel: 'Explore Collection',
  ctaHref: '/catalog',
};

const storeStory = {
  title: 'The SurSangeet Edit',
  body:
    'We source instruments for tonal character, material honesty, and visual presence. Every piece is selected to feel at home in a performance room, a studio, or a quiet interior.',
};

const timeline = [
  { id: 'timeline-1', year: '2018', title: 'First curation', description: 'A small private archive of hand-selected instruments begins.' },
  { id: 'timeline-2', year: '2020', title: 'Studio expansion', description: 'The collection grows to include wind, percussion, and keyboard voices.' },
  { id: 'timeline-3', year: '2024', title: 'Editorial launch', description: 'SurSangeet opens as a digital showcase with a refined, gallery-like presentation.' },
];

const locations = [
  { id: 'loc-1', city: 'Jaipur', country: 'India', label: 'Workshop and restoration' },
  { id: 'loc-2', city: 'Kolkata', country: 'India', label: 'Reed instrument atelier' },
  { id: 'loc-3', city: 'Chennai', country: 'India', label: 'Percussion curation desk' },
];

const mockData: Types & {
  featuredContent: typeof featuredContent;
  storeStory: typeof storeStory;
  timeline: typeof timeline;
  locations: typeof locations;
} = {
  instruments,
  categories,
  filters,
  contactMessage,
  formErrors,
  featuredContent,
  storeStory,
  timeline,
  locations,
};

export { instruments, categories, filters, contactMessage, formErrors, featuredContent, storeStory, timeline, locations, mockData };
export default mockData;