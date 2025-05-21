
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, Search, Package, UserRound } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout, isAdmin } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-[#f8f6f1] shadow-sm sticky top-0 z-50">
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
          <NavLink to="/contact" className="hover:text-gray-600 transition-colors">
            Contact
          </NavLink>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            className="p-2 hover:bg-[#f5f2eb] rounded-full" 
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
          >
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
                  <UserRound size={20} />
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
                <DropdownMenuItem asChild>
                  <Link to="/refund-request">Request Refund</Link>
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
          <button 
            onClick={() => setIsSearchOpen(true)} 
            className="p-2 hover:bg-[#f5f2eb] rounded-full"
          >
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
            <NavLink 
              to="/contact"
              className="block py-2 hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
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
                  <NavLink 
                    to="/refund-request"
                    className="block py-2 hover:text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Request Refund
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
      
      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search Products</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
