import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if we have valid-looking credentials
const isReady = supabaseUrl && 
                supabaseKey && 
                !supabaseUrl.includes('placeholder') && 
                !supabaseKey.includes('placeholder');

if (!isReady && process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
  console.warn('⚠️ Supabase environment variables are missing or are placeholders. Database features will be unavailable.');
}

// Export the client. If not ready, we export a proxy or a dummy client to prevent crashes during build
export const supabase = isReady 
  ? createClient<Database>(supabaseUrl, supabaseKey)
  : createClient<Database>('https://placeholder.supabase.co', 'placeholder-key'); // Dummy client for build-time safety

