
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  products as initialProducts, 
  Product, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} from "../../data/products";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import ProductForm from "../../components/Admin/ProductForm";

const Products = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Check if user is admin, otherwise redirect
    if (!isAdmin()) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    // Use the addProduct utility from data/products.ts to ensure global update
    const productToAdd = addProduct(newProduct);
    setProducts([...products, productToAdd]);
    setIsAddDialogOpen(false);
    toast.success("Product added successfully");
  };

  const handleEditProduct = (updatedProduct: Product) => {
    // Use the updateProduct utility from data/products.ts to ensure global update
    updateProduct(updatedProduct);
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    setIsEditDialogOpen(false);
    toast.success("Product updated successfully");
  };

  const handleDeleteProduct = () => {
    if (currentProduct) {
      // Use the deleteProduct utility from data/products.ts to ensure global update
      const deleted = deleteProduct(currentProduct.id);
      if (deleted) {
        setProducts(products.filter(p => p.id !== currentProduct.id));
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
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
    return null; // Will redirect in useEffect
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
      
      <div className="bg-[#f8f4e5] rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#ece6d3] border-b">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                      <div className="font-medium">{product.name}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 capitalize">{product.category}</td>
                  <td className="py-3 px-4">€{product.price.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    {product.stock < 5 ? (
                      <span className="text-red-600 font-medium">{product.stock}</span>
                    ) : (
                      product.stock
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => openEditDialog(product)}
                      >
                        <Pencil size={14} className="mr-1" /> Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => openDeleteDialog(product)}
                      >
                        <Trash2 size={14} className="mr-1" /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl bg-[#f8f4e5]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm onSubmit={handleAddProduct} />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl bg-[#f8f4e5]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {currentProduct && (
            <ProductForm 
              product={currentProduct} 
              onSubmit={handleEditProduct} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#f8f4e5]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to delete "{currentProduct?.name}"? This action cannot be undone.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={handleDeleteProduct}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
