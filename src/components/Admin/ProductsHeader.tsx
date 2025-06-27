
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

interface ProductsHeaderProps {
  onAddProduct: () => void;
}

const ProductsHeader = ({ onAddProduct }: ProductsHeaderProps) => {
  return (
    <>
      <Link to="/admin" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        
        <Button onClick={onAddProduct}>
          <Plus size={16} className="mr-1" /> Add New Product
        </Button>
      </div>
    </>
  );
};

export default ProductsHeader;
