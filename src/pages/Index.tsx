
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { Euro } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Index = () => {
  // Display only 4 featured products on the homepage
  const featuredProducts = products.slice(0, 4);
  const { isAuthenticated } = useAuth();

  return (
    <div className="page-transition">
      {/* Hero Section with Background Image */}
      <section 
        className="py-20 px-4 bg-cover bg-center relative" 
        style={{ 
          backgroundImage: "url('/lovable-uploads/96c93a2c-5d28-4d24-adeb-f23388f33594.png')",
          minHeight: "600px"
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex items-center h-full">
            {/* Text content directly on background */}
            <div className="text-left md:w-1/2 p-8 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md">
                Elegant Shopping Experience
              </h1>
              <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
                Discover our curated collection of high-quality products.
                Simple, elegant, extraordinary.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-[#c4a484] hover:bg-[#b39273]" asChild>
                  <Link to="/shop">Shop Now</Link>
                </Button>
                {!isAuthenticated() && (
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Shop With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-[#f5f2eb] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Euro size={24} className="text-[#c4a484]" />
              </div>
              <h3 className="font-bold text-xl mb-2">Best Euro Prices</h3>
              <p className="text-muted-foreground">Competitive prices on all our products, guaranteed.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-[#f5f2eb] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#c4a484]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick delivery across Albania and Europe within 3-5 business days.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-[#f5f2eb] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#c4a484]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Quality Guarantee</h3>
              <p className="text-muted-foreground">We stand by the quality of every product we sell.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-[#f8f6f1] py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/shop" className="text-[#c4a484] hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
