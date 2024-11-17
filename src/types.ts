export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  category: LegalCategory;
  status: 'active' | 'archived';
}

export type LegalCategory = 
  | 'civil'
  | 'criminal'
  | 'labor'
  | 'business'
  | 'tax'
  | 'administrative'
  | 'constitutional'
  | 'consumer'
  | 'vademecum';

export interface GeneratedProcess {
  id: string;
  title: string;
  chatId: string;
  createdAt: Date;
  fileName: string;
  status: 'pending' | 'completed';
  type: LegalCategory;
  pages: number;
  downloadUrl?: string;
}

export interface Lawyer {
  id: string;
  fullName: string;
  email: string;
  cpf: string;
  oabNumber: string;
  oabState: string;
  subscriptionTier: 'basic' | 'pro' | 'premium';
  createdAt: Date;
  avatarUrl?: string;
  credits: number;
}

export interface SubscriptionTier {
  id: 'basic' | 'pro' | 'premium';
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}