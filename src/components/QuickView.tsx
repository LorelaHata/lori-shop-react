
import { useState } from "react";
import { Product } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";

interface QuickViewProps {
  product: Product;
  trigger?: React.ReactNode;
}

const QuickView = ({ product, trigger }: QuickViewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const isClothing = product.category === "clothing";

  const handleAddToCart = () => {
    if (isClothing) {
      toast.info("Please visit product page to select a size");
      return;
    }
    
    addToCart(product, quantity);
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {trigger || (
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Quick View
          </Button>
        )}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div>
              <div className="relative bg-white rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <Badge variant="secondary" className="mb-2 capitalize">
                  {product.category}
                </Badge>
                <div className="text-2xl font-bold">€{product.price.toFixed(2)}</div>
              </div>
              
              <p className="text-gray-700">{product.description}</p>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Availability:</span>
                {product.stock > 0 ? (
                  <Badge className="bg-green-500">{product.stock} in stock</Badge>
                ) : (
                  <Badge variant="destructive">Out of stock</Badge>
                )}
              </div>
              
              {product.stock > 0 && (
                <div className="space-y-4">
                  {!isClothing && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Quantity:</span>
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x">{quantity}</span>
                        <button
                          onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                          disabled={quantity >= product.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <Button onClick={handleAddToCart} className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {isClothing ? "Select Options" : "Add to Cart"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickView;
