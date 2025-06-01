import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { Euro, Truck, Award } from "lucide-react";
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
        <div className="absolute inset-0 bg-[#e9e2d0]/20"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex items-center h-full">
            {/* Text content directly on background */}
            <div className="text-left md:w-1/2 p-8 text-black">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md">
                Elegant Shopping Experience
              </h1>
              <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
                Discover our curated collection of high-quality products.
                Elegant shopping made easy — quality and value in every click.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
                  <Link to="/shop">Shop Now</Link>
                </Button>
                {!isAuthenticated() && (
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-[#f0ece0]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Makes Us Special</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-[#e9e2d0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Euro size={24} className="text-[#c4a484]" />
              </div>
              <h3 className="font-bold text-xl mb-2">Best Prices</h3>
              <p className="text-muted-foreground">Unbeatable prices on all our products. We guarantee the best value for your money.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-[#e9e2d0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={24} className="text-[#c4a484]" />
              </div>
              <h3 className="font-bold text-xl mb-2">Fastest Delivery Worldwide</h3>
              <p className="text-muted-foreground">Lightning-fast shipping to any corner of the world. Your order reaches you in record time.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-[#e9e2d0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} className="text-[#c4a484]" />
              </div>
              <h3 className="font-bold text-xl mb-2">Premium Quality Guarantee</h3>
              <p className="text-muted-foreground">Every product meets our highest standards. Quality guaranteed or your money back.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-[#f7f3ea] py-16 px-4">
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
