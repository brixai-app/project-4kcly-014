export type InstrumentCategory = "Strings" | "Percussion" | "Wind" | "Keyboard";

export interface Specification {
  label: string;
  value: string;
}

export interface Instrument {
  id: string;
  name: string;
  category: InstrumentCategory;
  price: number;
  description: string;
  image: string;
  shortDescription?: string;
  detailedDescription?: string;
  specificationsJson?: string;
  relatedIdsJson?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ContactSubmissionState {
  values: ContactFormValues;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

export type AppRoute = "/" | "/catalog" | "/about" | "/contact" | "/product/:id";

export default Instrument;