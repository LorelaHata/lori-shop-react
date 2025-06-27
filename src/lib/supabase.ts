
// Use the working Supabase client from integrations
export { supabase } from '../integrations/supabase/client'

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
