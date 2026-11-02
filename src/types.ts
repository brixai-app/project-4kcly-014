export type InstrumentCategory = 'String' | 'Percussion' | 'Wind' | 'Keyboard' | 'Electronic' | 'Folk';

export interface Instrument {
  id: string;
  slug: string;
  name: string;
  category: InstrumentCategory | string;
  origin?: string;
  price?: number;
  description: string;
  story?: string;
  image: string;
  gallery?: string[];
  featured?: boolean;
  audioUrl?: string;
  tuning?: string;
  materials?: string[];
  dimensions?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  preferredInstrument?: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactMessage, string>>;
}

export interface ApiPayload<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface BaseComponentProps {
  className?: string;
}

export interface SectionProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
}

export interface DrawerProps extends BaseComponentProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface InstrumentCardProps extends BaseComponentProps {
  instrument?: Instrument;
  onSelect?: (instrument: Instrument) => void;
  onQuickListen?: (instrument: Instrument) => void;
}

export interface ContactFormProps extends BaseComponentProps {
  initialValues?: Partial<ContactMessage>;
  onSubmit?: (message: ContactMessage) => Promise<void> | void;
}

export interface HeaderProps extends BaseComponentProps {
  onOpenContact?: () => void;
  onOpenAudio?: () => void;
}

export interface FooterProps extends BaseComponentProps {
  year?: number;
}

export default Instrument;