export type AvailabilityStatus = 'available' | 'limited' | 'sold-out';

export type Category = 'String' | 'Wind' | 'Percussion' | 'Keyboard' | 'Accessories';

export type CatalogFilter = {
  category: Category | 'All';
  availability: AvailabilityStatus | 'All';
  search: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type FormError = {
  field: keyof ContactMessage;
  message: string;
};

export type Instrument = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  availability: AvailabilityStatus;
  image: string;
  accent: 'red' | 'green' | 'blue';
  description: string;
  origin: string;
  materials: string[];
  featured?: boolean;
};

export type Types = {
  instruments: Instrument[];
  categories: Category[];
  filters: CatalogFilter;
  contactMessage: ContactMessage;
  formErrors: FormError[];
};

export default Types;