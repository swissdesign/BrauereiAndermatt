
export interface Beer {
  id: string;
  name: string;
  tagline: string;
  description: string;
  specs: {
    style: string;
    abv: string;
    ibu: string;
    ebc: string;
    character: string;
  };
  colorClass: string;
  image?: string;
  comingSoon?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Partner {
  name: string;
  type: string;
  description: string;
  url?: string;
}

export interface DiaryEntry {
  id: string;
  title: string;
  date: string;
  summary: string;
  fullText?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface PhilosophySection {
  title: string;
  subtitle: string;
  icon: 'beer' | 'leaf' | 'backpack';
  points: {
    title: string;
    desc: string;
  }[];
}

export interface ScalePoint {
  label: string;
  value: number; // percentage 0-100
  color?: string; // hex for EBC
}

export interface StatDefinition {
  code: string;
  name: string;
  description: string;
  scale?: ScalePoint[];
}

export interface BeerStatGuide {
  intro: string;
  stats: StatDefinition[];
}

export interface CartItem {
  beerId: string;
  quantity: number;
}

export interface OrderFormData {
  name: string;
  email: string;
  address: string;
  phone: string;
  cart: CartItem[];
  pickupDate: string;
  confirmed: boolean;
}
