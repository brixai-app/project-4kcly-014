export type InstrumentCategory = 'string' | 'wind' | 'percussion' | 'keyboard' | 'electronic' | 'folk';
export type InstrumentCondition = 'museum' | 'collector' | 'restored' | 'performance';
export type InquiryTopic = 'availability' | 'provenance' | 'private-viewing' | 'restoration' | 'shipping';
export type FilterState = {
  category: InstrumentCategory | 'all';
  condition: InstrumentCondition | 'all';
  origin: string;
  search: string;
};
export type SoundSample = {
  label: string;
  url: string;
  duration: string;
};
export type CarouselSlide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  eyebrow: string;
};
export type Instrument = {
  id: string;
  name: string;
  category: InstrumentCategory;
  condition: InstrumentCondition;
  origin: string;
  year: string;
  price: string;
  image: string;
  description: string;
  story: string;
  materials: string[];
  soundSamples: SoundSample[];
  featured?: boolean;
};
export type Inquiry = {
  name: string;
  email: string;
  topic: InquiryTopic;
  instrumentId?: string;
  message: string;
};
export const instrumentCategories: InstrumentCategory[] = ['string', 'wind', 'percussion', 'keyboard', 'electronic', 'folk'];
export const instrumentConditions: InstrumentCondition[] = ['museum', 'collector', 'restored', 'performance'];
export const inquiryTopics: InquiryTopic[] = ['availability', 'provenance', 'private-viewing', 'restoration', 'shipping'];
export default Instrument;