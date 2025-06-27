
import { Product } from "../../data/products";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";

interface ProductDialogsProps {
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  currentProduct: Product | null;
  onAddDialogChange: (open: boolean) => void;
  onEditDialogChange: (open: boolean) => void;
  onDeleteDialogChange: (open: boolean) => void;
  onAddProduct: (product: Omit<Product, "id">) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: () => void;
}

const ProductDialogs = ({
  isAddDialogOpen,
  isEditDialogOpen,
  isDeleteDialogOpen,
  currentProduct,
  onAddDialogChange,
  onEditDialogChange,
  onDeleteDialogChange,
  onAddProduct,
  onEditProduct,
  onDeleteProduct
}: ProductDialogsProps) => {
  return (
    <>
      <Dialog open={isAddDialogOpen} onOpenChange={onAddDialogChange}>
        <DialogContent className="max-w-2xl bg-[#f8f4e5]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm onSubmit={onAddProduct} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={onEditDialogChange}>
        <DialogContent className="max-w-2xl bg-[#f8f4e5]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {currentProduct && (
            <ProductForm 
              product={currentProduct} 
              onSubmit={onEditProduct} 
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={onDeleteDialogChange}>
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
              onClick={onDeleteProduct}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDialogs;
