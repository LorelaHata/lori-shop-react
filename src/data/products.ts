

// Re-export everything for backward compatibility
export type { Product } from "../types/product";
export { products } from "./mockProducts";
export { categories } from "./categories";
export { 
  getProductById, 
  getProductsByCategory, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} from "../utils/productHelpers";

