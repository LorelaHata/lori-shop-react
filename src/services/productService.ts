
import { supabase } from '../lib/supabase';
import { Product } from '../data/products';

export const fetchProducts = async (): Promise<Product[]> => {
  console.log('Fetching products from Supabase...');
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  console.log('Products fetched successfully:', data);
  return data || [];
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  console.log('Creating product:', product);
  
  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      subcategory: product.subcategory || null,
      stock: product.stock
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    throw error;
  }

  console.log('Product created successfully:', data);
  return data;
};

export const updateProduct = async (id: number, product: Omit<Product, 'id'>): Promise<Product> => {
  console.log('Updating product:', id, product);
  
  const { data, error } = await supabase
    .from('products')
    .update({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      subcategory: product.subcategory || null,
      stock: product.stock
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    throw error;
  }

  console.log('Product updated successfully:', data);
  return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  console.log('Deleting product:', id);
  
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    throw error;
  }

  console.log('Product deleted successfully');
};
