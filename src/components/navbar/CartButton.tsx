
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

const CartButton = () => {
  const { getCartCount } = useCart();

  return (
    <Link to="/cart" className="p-2 hover:bg-[#f5f2eb] rounded-full relative">
      <ShoppingCart size={20} />
      {getCartCount() > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#c4a484] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {getCartCount()}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
