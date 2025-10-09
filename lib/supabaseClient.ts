import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseClient, demoSupabase } from './demo-supabase-mock';

// Check if in demo mode
function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  return document.cookie.split(';').some(c => c.trim().startsWith('demo=1'));
}

// Environment variables (optional for mock mode)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

// Global singleton key to prevent multiple instances
const GLOBAL_KEY = '__seedor_supabase_client__';

// Declare global type for TypeScript
declare global {
  var __seedor_supabase_client__: SupabaseClient | undefined;
}

// Create real client only if env vars are present
let realSupabase: any;

if (supabaseUrl && supabaseAnonKey) {
  // Use global singleton (works across module re-evaluations)
  if (typeof globalThis !== 'undefined' && globalThis[GLOBAL_KEY]) {
    realSupabase = globalThis[GLOBAL_KEY];
  } else {
    realSupabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storageKey: 'seedor-auth', // Use a unique storage key
      }
    });
    
    // Store in globalThis to prevent multiple instances (works in both browser and Node.js)
    if (typeof globalThis !== 'undefined') {
      globalThis[GLOBAL_KEY] = realSupabase;
    }
  }
} else {
  if (typeof console !== 'undefined') {
    console.warn('[Supabase] NEXT_PUBLIC_SUPABASE_URL/ANON_KEY not set. Using mock client.');
  }
  const error = new Error('Supabase no configurado');
  const rejectPromise = () => new Promise((_, reject) => reject(error));
  const filterBuilder = {
    eq() { return rejectPromise(); },
  } as any;
  const tableBuilder = {
    select() { return filterBuilder; },
    insert() { return rejectPromise(); },
    update() { return rejectPromise(); },
    delete() { return rejectPromise(); },
  } as any;
  realSupabase = {
    from() { return tableBuilder; },
    auth: {
      getSession: rejectPromise,
      getUser: rejectPromise,
      signUp: rejectPromise,
      signInWithPassword: rejectPromise,
      signOut: rejectPromise,
    }
  };
}

// Export a proxy that checks demo mode
export const supabase = new Proxy(realSupabase, {
  get(target, prop) {
    // In demo mode, use demo client
    if (isDemoMode() && prop === 'from') {
      return demoSupabase.from.bind(demoSupabase);
    }
    if (isDemoMode() && prop === 'auth') {
      return demoSupabase.auth;
    }

    // Otherwise use real client
    return target[prop];
  }
});

export default supabase;
