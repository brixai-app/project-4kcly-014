export type ProductCategory =
  | 'String'
  | 'Percussion'
  | 'Wind'
  | 'Keyboard'
  | 'Electronic'
  | 'Accessories';

export type Product = {
  id: string;
  name: string;
  category: ProductCategory | string;
  price: number;
  image: string;
  description?: string;
  origin?: string;
  featured?: boolean;
  slug?: string;
  accent?: 'red' | 'green' | 'blue';
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type CatalogFilter = {
  query: string;
  category: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
};

export type SharedSectionProps = {
  className?: string;
  title?: string;
  subtitle?: string;
};

export type ProductCardProps = {
  product?: Product | null;
  onSelect?: (product: Product) => void;
  onQuickAction?: (product: Product) => void;
  className?: string;
};

export type ModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

export type CatalogControlsProps = {
  filters?: CatalogFilter;
  categories?: string[];
  onChange?: (filters: CatalogFilter) => void;
  className?: string;
};

export default {} as const;