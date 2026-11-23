import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Whether a real Supabase backend is configured. When false (e.g. a static
// GitHub Pages build with no env vars), the app skips database calls and
// still renders fully.
export const isSupabaseConfigured = Boolean(url && anonKey);

// Provide inert placeholder values so createClient never throws; calls are
// only ever issued when isSupabaseConfigured is true.
export const supabase: SupabaseClient = createClient(
  url || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-anon-key',
);
