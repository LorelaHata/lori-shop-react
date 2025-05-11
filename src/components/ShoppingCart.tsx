
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";

const ShoppingCart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground">Add some products to your cart to continue shopping</p>
      </div>
    );
  }

  return (
    <div>
      <div className="divide-y">
        {items.map((item) => (
          <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded"
              />
            </div>
            
            <div className="flex-grow">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.category}</p>
              <div className="mt-1">€{item.price.toFixed(2)}</div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="h-8 px-3 flex items-center justify-center border-y">
                  {item.quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between items-center text-lg font-medium">
          <span>Total</span>
          <span>€{getCartTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
