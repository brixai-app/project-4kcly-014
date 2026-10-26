export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  rating?: number;
}

export const products: Product[] = [
  { id: '1', name: 'Curated Item Alpha', description: 'Handcrafted premium quality selection.', price: 49.99, category: 'Featured', rating: 4.8 },
  { id: '2', name: 'Curated Item Beta', description: 'Streamlined modern industrial design.', price: 79.99, category: 'Featured', rating: 4.9 },
  { id: '3', name: 'Curated Item Gamma', description: 'Everyday durable minimal companion.', price: 119.99, category: 'Accessories', rating: 4.7 }
];

export const categories: string[] = ['All', 'Featured', 'Accessories', 'New'];

export const mockData = {
  products,
  categories,
  items: products
};

export default mockData;

export const items = (mockData as any)?.items ?? (mockData as any)?.products ?? [];
