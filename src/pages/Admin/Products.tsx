
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Product } from "../../data/products";
import { productService } from "../../services/productService";
import { toast } from "sonner";
import ProductsHeader from "../../components/Admin/ProductsHeader";
import ProductsTable from "../../components/Admin/ProductsTable";
import ProductDialogs from "../../components/Admin/ProductDialogs";

const Products = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!loading && !isAdmin()) {
      navigate("/");
      return;
    }
    
    if (!loading) {
      loadProducts();
    }
  }, [isAdmin, navigate, loading]);

  const loadProducts = async () => {
    try {
      setProductsLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error("Failed to load products");
    } finally {
      setProductsLoading(false);
    }
  };

  const handleAddProduct = async (newProduct: Omit<Product, "id">) => {
    try {
      const addedProduct = await productService.addProduct(newProduct);
      setProducts([addedProduct, ...products]);
      setIsAddDialogOpen(false);
      toast.success("Product added successfully");
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error("Failed to add product");
    }
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    try {
      const result = await productService.updateProduct(updatedProduct);
      setProducts(products.map(p => 
        p.id === updatedProduct.id ? result : p
      ));
      setIsEditDialogOpen(false);
      toast.success("Product updated successfully");
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async () => {
    if (!currentProduct) return;
    
    try {
      const success = await productService.deleteProduct(currentProduct.id);
      if (success) {
        setProducts(products.filter(p => p.id !== currentProduct.id));
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error("Failed to delete product");
    }
  };

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  if (loading || (!loading && !isAdmin())) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      <ProductsHeader onAddProduct={() => setIsAddDialogOpen(true)} />
      
      <ProductsTable 
        products={products}
        loading={productsLoading}
        onEditProduct={openEditDialog}
        onDeleteProduct={openDeleteDialog}
      />

      <ProductDialogs
        isAddDialogOpen={isAddDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        currentProduct={currentProduct}
        onAddDialogChange={setIsAddDialogOpen}
        onEditDialogChange={setIsEditDialogOpen}
        onDeleteDialogChange={setIsDeleteDialogOpen}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default Products;
