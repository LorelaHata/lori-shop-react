
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, User, Search, Package } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-black">
          LoriShop
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className="hover:text-gray-600 transition-colors">
            Home
          </NavLink>
          <NavLink to="/shop" className="hover:text-gray-600 transition-colors">
            Shop
          </NavLink>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 hover:bg-[#f5f2eb] rounded-full" aria-label="Search">
            <Search size={20} />
          </button>
          
          <Link to="/cart" className="p-2 hover:bg-[#f5f2eb] rounded-full relative">
            <ShoppingCart size={20} />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c4a484] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-2 rounded-full">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2 text-sm font-medium">{user.name}</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin() && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <Link to="/cart" className="p-2 hover:bg-[#f5f2eb] rounded-full relative">
            <ShoppingCart size={20} />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c4a484] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="p-2 hover:bg-[#f5f2eb] rounded-full"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4 px-4 shadow-lg animate-fadeIn">
          <div className="space-y-4">
            <NavLink 
              to="/"
              className="block py-2 hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/shop"
              className="block py-2 hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </NavLink>
            
            <div className="pt-2 border-t">
              {user ? (
                <>
                  <div className="font-medium mb-2">{user.name}</div>
                  <NavLink 
                    to="/profile"
                    className="block py-2 hover:text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </NavLink>
                  <NavLink 
                    to="/profile"
                    className="block py-2 hover:text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </NavLink>
                  {isAdmin() && (
                    <NavLink 
                      to="/admin"
                      className="block py-2 hover:text-gray-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </NavLink>
                  )}
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block py-2 text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink 
                  to="/login"
                  className="block py-2 hover:text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
