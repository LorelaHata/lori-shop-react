
// Main products file - exports everything for backward compatibility
export type { Product } from "./types";
export { categories, subcategories } from "./categories";
export { 
  products, 
  getProductById, 
  getProductsByCategory, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} from "./productUtils";
