import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Speaker = {
  id: string;
  name: string;
  title: string;
  organization: string;
  talk_title: string;
  abstract: string;
  track: string;
  bio: string;
  photo_url: string;
  linkedin_url?: string;
  twitter_url?: string;
  github_url?: string;
  talk_length_minutes: number;
  sort_order: number;
};

export type Sponsor = {
  id: string;
  company_name: string;
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
  logo_url: string;
  website_url?: string;
  description: string;
  contact_email?: string;
  benefits: string[];
  sort_order: number;
};

export type TicketTier = {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  quantity_limit?: number;
  sold_count: number;
  includes: string[];
  sort_order: number;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
};

export type Volunteer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  experience_level?: string;
  availability: string[];
  motivation: string;
  photo_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  github_url?: string;
  sort_order: number;
  created_at: string;
};

export type UserProfile = {
  id: string;
  name: string;
  role: string;
  organization?: string;
  email: string;
  avatar_url?: string;
};

export type Badge = {
  id: string;
  user_id: string;
  badge_url: string;
  qr_code_url?: string;
  name: string;
  role: string;
};
