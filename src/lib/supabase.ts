
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug logging to check if environment variables are loaded
console.log('Supabase URL:', supabaseUrl ? 'Present' : 'Missing')
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing!')
  console.error('VITE_SUPABASE_URL:', supabaseUrl)
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey)
}

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          description: string
          price: number
          image: string
          category: string
          stock: number
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description: string
          price: number
          image: string
          category: string
          stock: number
        }
        Update: {
          name?: string
          description?: string
          price?: number
          image?: string
          category?: string
          stock?: number
        }
      }
    }
  }
}
