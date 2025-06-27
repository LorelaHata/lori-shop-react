
import { useState, useEffect } from "react";
import { Product } from "../data/products";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../services/productService";
import { toast } from "sonner";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await fetchProducts();
      setProducts(productsData);
    } catch (error) {
      toast.error("Failed to load products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (newProduct: Omit<Product, "id">) => {
    try {
      const createdProduct = await createProduct(newProduct);
      setProducts([createdProduct, ...products]);
      toast.success("Product added successfully");
      return true;
    } catch (error) {
      toast.error("Failed to add product");
      console.error(error);
      return false;
    }
  };

  const handleEditProduct = async (updatedProduct: Omit<Product, "id">, productId?: number) => {
    if (!productId) return false;
    
    try {
      const updated = await updateProduct(productId, updatedProduct);
      setProducts(products.map(p => p.id === productId ? updated : p));
      toast.success("Product updated successfully");
      return true;
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
      return false;
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(p => p.id !== productId));
      toast.success("Product deleted successfully");
      return true;
    } catch (error) {
      toast.error("Failed to delete product");
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    loadProducts
  };
};
