
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#e9e2d0]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-black text-lg mb-4">LoriShop</h3>
            <p className="text-muted-foreground">
              Simple yet elegant online shopping experience with the best products at competitive prices.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground">Shop</Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-foreground">My Account</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <address className="text-muted-foreground not-italic">
              <p>Rruga Barrikadave</p>
              <p>Tirana, Albania</p>
              <p className="mt-2">lorishop@gmail.com</p>
              <p>lorishop.al</p>
              <p>+355 69 123 4567</p>
            </address>
          </div>
        </div>

        <div className="border-t border-[#d8d0be] mt-8 pt-8 text-center text-muted-foreground">
          <p>© {year} LoriShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
