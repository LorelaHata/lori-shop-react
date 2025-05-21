
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

// Imported components
import NavLinks from "./navbar/NavLinks";
import CartButton from "./navbar/CartButton";
import UserDropdown from "./navbar/UserDropdown";
import MobileMenu from "./navbar/MobileMenu";
import SearchDialog from "./navbar/SearchDialog";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-[#f8f6f1] shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-black">
          LoriShop
        </Link>

        {/* Desktop Navigation */}
        <NavLinks />

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            className="p-2 hover:bg-[#f5f2eb] rounded-full" 
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={20} />
          </button>
          
          <CartButton />
          <UserDropdown />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={() => setIsSearchOpen(true)} 
            className="p-2 hover:bg-[#f5f2eb] rounded-full"
          >
            <Search size={20} />
          </button>
          
          <CartButton />
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="p-2 hover:bg-[#f5f2eb] rounded-full"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        handleLogout={handleLogout}
      />
      
      {/* Search Dialog */}
      <SearchDialog 
        isOpen={isSearchOpen} 
        setIsOpen={setIsSearchOpen} 
      />
    </header>
  );
};

export default Navbar;
