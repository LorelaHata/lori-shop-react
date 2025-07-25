
import { useState, useEffect, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import { Product, categories } from "../data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
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
  const [showClothingSubcategories, setShowClothingSubcategories] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Starting to load products...');
      const productsData = await fetchProducts();
      console.log('Products loaded:', productsData);
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error("Failed to load products");
      // Fallback to local data if Supabase fails
      try {
        const { products: localProducts } = await import("../data/products");
        setProducts(localProducts);
        toast.info("Loaded products from local cache");
      } catch (fallbackError) {
        console.error('Failed to load fallback products:', fallbackError);
        toast.error("Failed to load products. Please refresh the page.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory !== "all") {
      if (selectedCategory === "clothing-male") {
        result = result.filter(product => product.category === "clothing" && product.subcategory === "male");
      } else if (selectedCategory === "clothing-female") {
        result = result.filter(product => product.category === "clothing" && product.subcategory === "female");
      } else {
        result = result.filter(product => product.category === selectedCategory);
      }
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

  const handleCategoryClick = (category: string) => {
    if (category === "clothing") {
      setShowClothingSubcategories(!showClothingSubcategories);
      // If clicking clothing and it's already selected, keep it selected
      if (selectedCategory !== "clothing") {
        setSelectedCategory("clothing");
      }
    } else {
      setSelectedCategory(category);
      setShowClothingSubcategories(false);
    }
  };

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case "clothing-male":
        return "Men's Clothing";
      case "clothing-female":
        return "Women's Clothing";
      case "all":
        return "All Products";
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 page-transition">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading products...</p>
        </div>
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
            <div className="space-y-1">
              {categories.filter(cat => !cat.includes("-")).map((category) => (
                <div key={category}>
                  <Button
                    variant={selectedCategory === category || (category === "clothing" && (selectedCategory === "clothing-male" || selectedCategory === "clothing-female")) ? "default" : "ghost"}
                    className="justify-between w-full text-left"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <span>{getCategoryDisplayName(category)}</span>
                    {category === "clothing" && (
                      showClothingSubcategories ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  
                  {/* Clothing subcategories */}
                  {category === "clothing" && showClothingSubcategories && (
                    <div className="ml-4 mt-2 space-y-1">
                      <Button
                        variant={selectedCategory === "clothing-male" ? "default" : "ghost"}
                        className="justify-start w-full text-left text-sm"
                        onClick={() => setSelectedCategory("clothing-male")}
                      >
                        Male
                      </Button>
                      <Button
                        variant={selectedCategory === "clothing-female" ? "default" : "ghost"}
                        className="justify-start w-full text-left text-sm"
                        onClick={() => setSelectedCategory("clothing-female")}
                      >
                        Female
                      </Button>
                    </div>
                  )}
                </div>
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
              {searchQuery && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSearchParams({});
                  }}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              )}
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
