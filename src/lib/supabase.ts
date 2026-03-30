import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uojwhcfytzmuiytcwddk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_QUeG3lUzrI6bWNwUVpxeXw_sDr9SLVJ';

let supabaseInstance: any = null;

console.log('Initializing Supabase with URL:', supabaseUrl);
try {
  if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL') {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client initialized successfully.');
  } else {
    console.warn('Supabase URL or Anon Key is missing or invalid. Using mock client.');
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

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL';
export const supabase = supabaseInstance;
