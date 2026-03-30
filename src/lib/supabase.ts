import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseInstance: any = null;

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn('Supabase URL or Anon Key is missing. Please check your environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).');
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
}

export const supabase = supabaseInstance;
