
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
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
  );
};

export default NavLinks;
