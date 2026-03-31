import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseInstance: any = null;

console.log('Initializing Supabase with URL:', supabaseUrl);
try {
  if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseUrl !== '') {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client initialized successfully.');
  } else {
    console.warn('Supabase URL or Anon Key is missing or invalid. Using mock client.');
    
    const createMockError = (msg: string) => Promise.resolve({ 
      data: null, 
      error: { 
        message: msg, 
        details: 'Configuração ausente', 
        hint: 'Verifique as chaves no menu Settings', 
        code: 'CONFIG_MISSING' 
      }, 
      count: 0 
    });
    
    const mockQueryBuilder = () => {
      const p = createMockError('Supabase não configurado');
      // @ts-ignore
      p.eq = mockQueryBuilder;
      // @ts-ignore
      p.ilike = mockQueryBuilder;
      // @ts-ignore
      p.single = () => createMockError('Supabase não configurado');
      // @ts-ignore
      p.maybeSingle = () => createMockError('Supabase não configurado');
      // @ts-ignore
      p.order = mockQueryBuilder;
      // @ts-ignore
      p.limit = mockQueryBuilder;
      // @ts-ignore
      p.select = mockQueryBuilder;
      return p;
    };

    supabaseInstance = {
      from: () => ({
        select: mockQueryBuilder,
        insert: () => createMockError('Supabase não configurado'),
        update: () => ({ eq: mockQueryBuilder }),
        delete: () => ({ eq: mockQueryBuilder }),
        upsert: () => createMockError('Supabase não configurado'),
      }),
      auth: {
        signUp: () => createMockError('Supabase não configurado'),
        signInWithPassword: () => createMockError('Supabase não configurado'),
        signOut: () => createMockError('Supabase não configurado'),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      storage: {
        from: () => ({
          upload: () => createMockError('Supabase não configurado'),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
          remove: () => createMockError('Supabase não configurado'),
        })
      }
    };
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
}

export const isSupabaseConfigured = !!import.meta.env.VITE_SUPABASE_URL && 
  !!import.meta.env.VITE_SUPABASE_ANON_KEY && 
  import.meta.env.VITE_SUPABASE_URL !== 'YOUR_SUPABASE_URL' &&
  import.meta.env.VITE_SUPABASE_URL !== '';
export const supabase = supabaseInstance;
