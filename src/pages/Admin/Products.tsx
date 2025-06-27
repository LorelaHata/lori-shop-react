
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Product } from "../../data/products";
import { ArrowLeft, Plus } from "lucide-react";
import ProductTable from "../../components/Admin/ProductTable";
import ProductDialogs from "../../components/Admin/ProductDialogs";
import { useProducts } from "../../hooks/useProducts";

const Products = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { products, loading, handleAddProduct, handleEditProduct, handleDeleteProduct } = useProducts();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/");
      return;
    }
  }, [isAdmin, navigate]);

  const onAddProduct = async (newProduct: Omit<Product, "id">) => {
    const success = await handleAddProduct(newProduct);
    if (success) {
      setIsAddDialogOpen(false);
    }
  };

  const onEditProduct = async (updatedProduct: Omit<Product, "id">, productId?: number) => {
    const success = await handleEditProduct(updatedProduct, productId);
    if (success) {
      setIsEditDialogOpen(false);
    }
  };

  const onDeleteProduct = async () => {
    if (!currentProduct) return;
    
    const success = await handleDeleteProduct(currentProduct.id);
    if (success) {
      setIsDeleteDialogOpen(false);
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

  if (!isAdmin()) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 page-transition">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      <Link to="/admin" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus size={16} className="mr-1" /> Add New Product
        </Button>
      </div>
      
      <ProductTable 
        products={products}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />

      <ProductDialogs
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        currentProduct={currentProduct}
        onAddProduct={onAddProduct}
        onEditProduct={onEditProduct}
        onDeleteProduct={onDeleteProduct}
      />
    </div>
  );
};

export default Products;
