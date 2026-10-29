export type InstrumentCategory = 'Strings' | 'Percussion' | 'Wind' | 'Keyboard' | 'Electronic' | 'Fusion';

export type ContactSubject = 'General Inquiry' | 'Book a Session' | 'Collaboration' | 'Press';

export interface InstrumentSpecifications {
  origin?: string;
  material?: string;
  tuning?: string;
  range?: string;
  dimensions?: string;
  weight?: string;
  finish?: string;
}

export interface Instrument {
  id: string;
  name: string;
  category: InstrumentCategory;
  price?: string;
  description: string;
  image: string;
  accent: 'red' | 'green' | 'blue';
  featured?: boolean;
  specifications?: InstrumentSpecifications;
  tags?: string[];
}

export interface ContactFormSubmission {
  name: string;
  email: string;
  subject: ContactSubject;
  message: string;
}

export interface DrawerState {
  open: boolean;
  instrumentId?: string | null;
}

export type ShowcaseDrawerState = DrawerState;

export default Instrument;