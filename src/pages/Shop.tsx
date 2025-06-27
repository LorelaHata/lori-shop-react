
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Product, categories } from "../data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../services/productService";
import { toast } from "sonner";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await fetchProducts();
      setProducts(productsData);
    } catch (error) {
      toast.error("Failed to load products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    if (sortOption === "price-low") {
      result = result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      result = result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name") {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, sortOption, searchQuery, products]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search param
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
    setIsSearching(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 page-transition">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      <h1 className="text-3xl font-bold mb-8">Shop Our Products</h1>

      {/* Search bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              onFocus={() => setIsSearching(true)}
              onBlur={() => setTimeout(() => setIsSearching(false), 200)}
            />
            {isSearching && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button 
                  type="submit" 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 px-2"
                >
                  Search
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Filters sidebar */}
        <div className="md:w-1/4 mb-6 md:mb-0 md:pr-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-medium text-lg mb-3">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  className="justify-start w-full text-left capitalize"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:w-3/4">
          {/* Sort controls */}
          <div className="mb-6 flex flex-wrap justify-between items-center">
            <p className="text-sm text-muted-foreground mb-2 md:mb-0">
              Showing {filteredProducts.length} products
            </p>
            
            <div className="flex items-center">
              <span className="text-sm mr-2">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border rounded-md p-2 text-sm bg-white"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {/* Products grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
