
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="card group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all"></div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{product.category}</p>
            </div>
            <div className="font-semibold">€{product.price.toFixed(2)}</div>
          </div>
          
          <div className="mt-4">
            <Button 
              onClick={handleAddToCart} 
              variant="outline"
              className="w-full border-[#c4a484] text-[#c4a484] hover:bg-[#f5f2eb] hover:text-[#b39273]"
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock > 0 ? "Add to cart" : "Out of stock"}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
