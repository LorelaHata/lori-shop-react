
import { supabase, DatabaseProduct } from '../lib/supabase'
import { Product } from '../data/products'

export const productService = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
      throw error
    }

    return data?.map(this.mapDatabaseProductToProduct) || []
  },

  // Get product by ID
  async getProductById(id: number): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching product:', error)
      return null
    }

    return data ? this.mapDatabaseProductToProduct(data) : null
  },

  // Add new product
  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.image,
        category: product.category,
        stock: product.stock
      }])
      .select()
      .single()

    if (error) {
      console.error('Error adding product:', error)
      throw error
    }

    return this.mapDatabaseProductToProduct(data)
  },

  // Update product
  async updateProduct(product: Product): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update({
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.image,
        category: product.category,
        stock: product.stock
      })
      .eq('id', product.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating product:', error)
      throw error
    }

    return this.mapDatabaseProductToProduct(data)
  },

  // Delete product
  async deleteProduct(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting product:', error)
      return false
    }

    return true
  },

  // Upload image file
  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `product-images/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Error uploading image:', uploadError)
      throw uploadError
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath)

    return data.publicUrl
  },

  // Helper function to map database product to frontend product
  mapDatabaseProductToProduct(dbProduct: DatabaseProduct): Product {
    return {
      id: dbProduct.id,
      name: dbProduct.name,
      description: dbProduct.description,
      price: dbProduct.price,
      image: dbProduct.image_url || '',
      category: dbProduct.category,
      stock: dbProduct.stock
    }
  }
}
