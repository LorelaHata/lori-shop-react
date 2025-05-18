
import { Link } from "react-router-dom";
import ShoppingCart from "../components/ShoppingCart";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

const Cart = () => {
  const { items, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated()) {
      toast.error("Please sign in to proceed to checkout");
      return;
    }
    // Navigation to checkout is done via the Link component
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
                {isAuthenticated() ? (
                  <Button asChild className="w-full">
                    <Link to="/checkout" onClick={handleCheckout}>
                      Proceed to Checkout
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <Link to="/login" state={{ from: "/checkout" }}>
                      Sign In to Checkout
                    </Link>
                  </Button>
                )}
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
