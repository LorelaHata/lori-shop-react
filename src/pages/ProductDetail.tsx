
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Available sizes for clothing items
const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(parseInt(id || "0"));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  
  const isClothing = product?.category === "clothing";

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="mb-6">The product you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (isClothing && !selectedSize) {
      toast.error("Please select a size before adding to cart");
      return;
    }
    
    addToCart(product, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft size={18} className="mr-2" /> Back
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-muted-foreground mb-4 capitalize">{product.category}</p>
          
          <div className="text-2xl font-semibold mb-4">
            €{product.price.toFixed(2)}
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="text-gray-700 mr-2">Availability:</span>
              {product.stock > 0 ? (
                <span className="text-green-600">{product.stock} in stock</span>
              ) : (
                <span className="text-red-600">Out of stock</span>
              )}
            </div>
          </div>
          
          {product.stock > 0 && (
            <div className="space-y-4">
              {isClothing && (
                <div className="mb-4">
                  <span className="text-gray-700 block mb-2">Size:</span>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {clothingSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-2 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 hover:bg-gray-100"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <Button onClick={handleAddToCart} className="w-full md:w-auto">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
