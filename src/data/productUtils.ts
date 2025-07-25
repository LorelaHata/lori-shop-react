import { Product } from "./types";
import { mockProducts } from "./mockProducts";

// Keep the mutable products array for backward compatibility
export const products: Product[] = [...mockProducts];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") {
    return products;
  }
  if (category === "clothing-male") {
    return products.filter(product => product.category === "clothing" && product.subcategory === "male");
  }
  if (category === "clothing-female") {
    return products.filter(product => product.category === "clothing" && product.subcategory === "female");
  }
  return products.filter(product => product.category === category);
};

// Admin product management functions
export const addProduct = (newProduct: Omit<Product, "id">): Product => {
  const id = Math.max(0, ...products.map(p => p.id)) + 1;
  const product = { ...newProduct, id };
  products.push(product);
  return product;
};

export const updateProduct = (updatedProduct: Product): Product => {
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
  }
  return updatedProduct;
};

export const deleteProduct = (id: number): boolean => {
  const initialLength = products.length;
  const index = products.findIndex(p => p.id === id);
  
  if (index !== -1) {
    products.splice(index, 1);
    return products.length < initialLength;
  }
  
  return false;
};
