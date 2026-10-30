export type InstrumentCategory =
  | 'Strings'
  | 'Percussion'
  | 'Wind'
  | 'Keyboard'
  | 'Electronic'
  | 'Accessories';

export interface InstrumentSpecs {
  origin?: string;
  material?: string;
  dimensions?: string;
  weight?: string;
  finish?: string;
  includedAccessories?: string[];
  tuning?: string;
  power?: string;
}

export interface Instrument {
  id: string;
  name: string;
  category: InstrumentCategory;
  price: number;
  image: string;
  description: string;
  featured?: boolean;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  specs?: InstrumentSpecs;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone?: string;
  instrumentId?: string;
  subject: string;
  message: string;
  preferredContact?: 'email' | 'phone' | 'whatsapp';
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FilterState {
  search: string;
  category: InstrumentCategory | 'All';
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  inStockOnly?: boolean;
}

export interface NavigationState {
  isDrawerOpen: boolean;
  activeInstrumentId?: string | null;
  lastVisitedPath?: string;
}

export default Instrument;