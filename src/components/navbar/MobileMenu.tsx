
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  handleLogout: () => void;
}

const MobileMenu = ({ isOpen, onClose, handleLogout }: MobileMenuProps) => {
  const { user, isAdmin } = useAuth();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="md:hidden bg-white border-t py-4 px-4 shadow-lg animate-fadeIn">
      <div className="space-y-4">
        <NavLink 
          to="/"
          className="block py-2 hover:text-gray-600"
          onClick={onClose}
        >
          Home
        </NavLink>
        <NavLink 
          to="/shop"
          className="block py-2 hover:text-gray-600"
          onClick={onClose}
        >
          Shop
        </NavLink>
        <NavLink 
          to="/contact"
          className="block py-2 hover:text-gray-600"
          onClick={onClose}
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
                onClick={onClose}
              >
                My Profile
              </NavLink>
              <NavLink 
                to="/profile"
                className="block py-2 hover:text-gray-600"
                onClick={onClose}
              >
                My Orders
              </NavLink>
              <NavLink 
                to="/refund-request"
                className="block py-2 hover:text-gray-600"
                onClick={onClose}
              >
                Request Refund
              </NavLink>
              {isAdmin() && (
                <NavLink 
                  to="/admin"
                  className="block py-2 hover:text-gray-600"
                  onClick={onClose}
                >
                  Admin Dashboard
                </NavLink>
              )}
              <button 
                onClick={() => {
                  handleLogout();
                  onClose();
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
              onClick={onClose}
            >
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
