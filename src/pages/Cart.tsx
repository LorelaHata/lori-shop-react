
import { Link } from "react-router-dom";
import ShoppingCart from "../components/ShoppingCart";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Cart = () => {
  const { items, clearCart } = useCart();

  const handleCheckout = () => {
    clearCart();
    toast.success("Order placed successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ShoppingCart />
        </div>
        
        {items.length > 0 && (
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>€{useCart().getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>€0.00</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-medium">
                  <span>Total</span>
                  <span>€{useCart().getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button onClick={handleCheckout} className="w-full">
                  Checkout
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
