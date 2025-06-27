
import { Product } from "../../data/products";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  return (
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
                      onClick={() => onEdit(product)}
                    >
                      <Pencil size={14} className="mr-1" /> Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onDelete(product)}
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
  );
};

export default ProductTable;
