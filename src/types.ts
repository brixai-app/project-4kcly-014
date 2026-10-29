export type InstrumentCategory = 'string' | 'percussion' | 'wind' | 'keyboard' | 'electronic' | 'folk';

export interface InstrumentSpecifications {
  origin?: string;
  material?: string;
  tuning?: string;
  dimensions?: string;
  weight?: string;
  finish?: string;
  includedAccessories?: string[];
  care?: string[];
}

export interface Instrument {
  id: string;
  name: string;
  category: InstrumentCategory;
  price: number;
  description: string;
  image: string;
  accentColor?: string;
  featured?: boolean;
  inStock?: boolean;
  specifications?: InstrumentSpecifications;
  tags?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationError {
  field: keyof ContactFormData | 'general';
  message: string;
}

export interface ValidationErrors {
  errors: ValidationError[];
}

export default Instrument;