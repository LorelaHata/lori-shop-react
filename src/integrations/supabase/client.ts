
// Database client configuration
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const DATABASE_URL = "https://pphqpwrkckpzdgwabzeo.supabase.co";
const DATABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwaHFwd3JrY2twemRnd2FiemVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNDU5OTEsImV4cCI6MjA2NjYyMTk5MX0.Q3zHZMmbQ2kq2dmtcrh4TkDS-hX1eML2RycutPxnOOQ";

// Initialize database client
export const supabase = createClient<Database>(DATABASE_URL, DATABASE_KEY);
