
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";
import LazyImage from "./LazyImage";
import QuickView from "./QuickView";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const isClothing = product.category === "clothing";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isClothing) {
      toast.info("Please select a size first", {
        description: "Visit product page to select a size"
      });
      return;
    }
    
    addToCart(product);
  };

  return (
    <div className="card group bg-[#f8f4e5] border-[#e9e2d0] relative">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <LazyImage
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all"></div>
          
          {/* Quick View Button */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <QuickView 
              product={product} 
              trigger={
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                  <Eye className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-muted-foreground text-sm mt-1 capitalize">{product.category}</p>
            </div>
            <div className="font-semibold">€{product.price.toFixed(2)}</div>
          </div>
          
          <div className="mt-4">
            {isClothing ? (
              <Button 
                asChild
                variant="outline"
                className="w-full border-yellow-400 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800"
              >
                <Link to={`/product/${product.id}`}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Select Size
                </Link>
              </Button>
            ) : (
              <Button 
                onClick={handleAddToCart} 
                variant="outline"
                className="w-full border-yellow-400 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800"
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.stock > 0 ? "Add to cart" : "Out of stock"}
              </Button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
