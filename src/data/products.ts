
// Re-export everything for backward compatibility
export { Product } from "../types/product";
export { products } from "./mockProducts";
export { categories } from "./categories";
export { 
  getProductById, 
  getProductsByCategory, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} from "../utils/productHelpers";
