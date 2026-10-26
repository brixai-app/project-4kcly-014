import React from 'react';
export type Availability = 'available' | 'limited' | 'sold-out';

export type Category = 'String' | 'Percussion' | 'Wind' | 'Keyboard' | 'Electronic' | 'Accessories';

export interface Instrument {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  availability: Availability;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  materials: string[];
  origin: string;
  featured: boolean;
  accent: 'red' | 'green' | 'blue';
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  instrumentId?: string;
}

export interface FilterState {
  query: string;
  category: Category | 'All';
  availability: Availability | 'All';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name';
}

export interface ComponentContract {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionContract extends ComponentContract {
  title?: string;
  eyebrow?: string;
}

export default {};