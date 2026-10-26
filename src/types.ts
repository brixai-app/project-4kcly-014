export type Category = 'String' | 'Percussion' | 'Wind' | 'Keyboard' | 'Electronic' | 'Accessories';

export type Availability = 'In Stock' | 'Limited' | 'Preorder' | 'Out of Stock';

export interface Instrument {
  id: string;
  slug: string;
  name: string;
  category: Category;
  family: string;
  price: number;
  availability: Availability;
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  accent: 'red' | 'green' | 'blue';
  featured?: boolean;
  newArrival?: boolean;
  tags?: string[];
  materials?: string[];
  dimensions?: string;
  origin?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CatalogFilters {
  query: string;
  categories: Category[];
  availability: Availability[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}

export default {};