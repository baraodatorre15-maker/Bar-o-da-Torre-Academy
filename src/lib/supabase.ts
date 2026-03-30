import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseInstance: any = null;

try {
  if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL') {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn('Supabase URL or Anon Key is missing or invalid. Please check your environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).');
    // Create a proxy that logs errors instead of crashing
    supabaseInstance = {
      from: () => ({
        select: () => ({ 
          eq: () => ({ 
            single: () => Promise.resolve({ data: null, error: { message: 'Supabase not initialized' } }), 
            limit: () => ({}),
            order: () => ({})
          }), 
          order: () => ({}) 
        }),
        insert: () => Promise.resolve({ error: { message: 'Supabase not initialized' } }),
        update: () => ({ eq: () => Promise.resolve({ error: { message: 'Supabase not initialized' } }) }),
        delete: () => ({ eq: () => Promise.resolve({ error: { message: 'Supabase not initialized' } }) }),
      }),
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ error: { message: 'Supabase not initialized' } }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        })
      },
      auth: {
        signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not initialized' } }),
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not initialized' } }),
        signOut: () => Promise.resolve({ error: { message: 'Supabase not initialized' } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      }
    };
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
}

export const supabase = supabaseInstance;
