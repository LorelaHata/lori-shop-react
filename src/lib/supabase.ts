
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface DatabaseProduct {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock: number
  created_at: string
  updated_at: string
}

export interface DatabaseUser {
  id: string
  name: string
  email: string
  role: 'consumer' | 'admin'
  phone?: string
  created_at: string
  updated_at: string
}
