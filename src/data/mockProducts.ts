
import { Product } from "./types";

export const mockProducts: Product[] = [
  // Accessories (10 products)
  {
    id: 1,
    name: "Minimalist Watch",
    description: "Elegant minimalist watch with leather strap",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1399&q=80",
    category: "accessories",
    stock: 15
  },
  {
    id: 3,
    name: "Leather Backpack",
    description: "Handcrafted leather backpack with multiple compartments",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1028&q=80",
    category: "accessories",
    stock: 12
  },
  {
    id: 12,
    name: "Leather Wallet",
    description: "Slim leather wallet with RFID protection",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    category: "accessories",
    stock: 18
  },
  {
    id: 14,
    name: "Bamboo Water Bottle",
    description: "Eco-friendly insulated bamboo water bottle",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    category: "accessories",
    stock: 20
  },
  {
    id: 17,
    name: "Designer Sunglasses",
    description: "UV protection designer sunglasses with metal frame",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "accessories",
    stock: 25
  },
  {
    id: 18,
    name: "Canvas Tote Bag",
    description: "Durable canvas tote bag perfect for shopping",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    category: "accessories",
    stock: 30
  },
  {
    id: 19,
    name: "Silk Scarf",
    description: "Luxurious silk scarf with floral pattern",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "accessories",
    stock: 14
  },
  {
    id: 20,
    name: "Baseball Cap",
    description: "Classic baseball cap with adjustable strap",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "accessories",
    stock: 40
  },
  {
    id: 21,
    name: "Leather Belt",
    description: "Genuine leather belt with classic buckle",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "accessories",
    stock: 22
  },
  {
    id: 22,
    name: "Silver Jewelry Set",
    description: "Elegant silver necklace and earrings set",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "accessories",
    stock: 16
  },

  // Clothing - Male (10 products)
  {
    id: 2,
    name: "Wool Sweater",
    description: "Premium wool sweater, perfect for colder days",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80",
    category: "clothing",
    subcategory: "male",
    stock: 20
  },
  {
    id: 5,
    name: "Cotton T-Shirt",
    description: "Soft cotton t-shirt with minimalist design",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    category: "clothing",
    subcategory: "male",
    stock: 30
  },
  {
    id: 23,
    name: "Formal Dress Shirt",
    description: "Classic white dress shirt for formal occasions",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "male",
    stock: 25
  },
  {
    id: 24,
    name: "Casual Jeans",
    description: "Comfortable straight-fit jeans in dark wash",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "male",
    stock: 18
  },
  {
    id: 25,
    name: "Polo Shirt",
    description: "Classic polo shirt in navy blue",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "male",
    stock: 35
  },
  {
    id: 26,
    name: "Leather Jacket",
    description: "Stylish black leather jacket with zipper details",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "male",
    stock: 12
  },
  {
    id: 27,
    name: "Chino Pants",
    description: "Comfortable chino pants in khaki color",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "male",
    stock: 28
  },
  {
    id: 28,
    name: "Hoodie Sweatshirt",
    description: "Cozy hoodie sweatshirt in charcoal gray",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "male",
    stock: 22
  },
  {
    id: 29,
    name: "Formal Blazer",
    description: "Tailored blazer perfect for business meetings",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "male",
    stock: 15
  },
  {
    id: 30,
    name: "Cargo Shorts",
    description: "Practical cargo shorts with multiple pockets",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "male",
    stock: 26
  },

  // Clothing - Female (10 products)
  {
    id: 7,
    name: "Linen Shirt",
    description: "Lightweight linen shirt, perfect for summer",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
    category: "clothing",
    subcategory: "female",
    stock: 22
  },
  {
    id: 16,
    name: "Denim Jacket",
    description: "Classic denim jacket with modern fit",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    category: "clothing",
    subcategory: "female",
    stock: 15
  },
  {
    id: 31,
    name: "Maxi Dress",
    description: "Flowing maxi dress in floral print",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "female",
    stock: 18
  },
  {
    id: 32,
    name: "Silk Blouse",
    description: "Elegant silk blouse perfect for office wear",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "female",
    stock: 20
  },
  {
    id: 33,
    name: "Skinny Jeans",
    description: "High-waisted skinny jeans in dark blue",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "female",
    stock: 24
  },
  {
    id: 34,
    name: "Cardigan Sweater",
    description: "Cozy knit cardigan in cream color",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "female",
    stock: 19
  },
  {
    id: 35,
    name: "A-Line Skirt",
    description: "Classic A-line skirt in navy blue",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "female",
    stock: 27
  },
  {
    id: 36,
    name: "Wrap Top",
    description: "Stylish wrap top in burgundy color",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "female",
    stock: 21
  },
  {
    id: 37,
    name: "Little Black Dress",
    description: "Timeless little black dress for any occasion",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1566479179817-b7c2bb7cf0f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "female",
    stock: 16
  },
  {
    id: 38,
    name: "Yoga Leggings",
    description: "High-performance yoga leggings with compression",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1506629905607-d46b7a3c0a13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "clothing",
    subcategory: "female",
    stock: 30
  },

  // Electronics (10 products)
  {
    id: 4,
    name: "Wireless Headphones",
    description: "Premium wireless headphones with noise cancellation",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "electronics",
    stock: 10
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    description: "Portable bluetooth speaker with premium sound",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80",
    category: "electronics",
    stock: 14
  },
  {
    id: 15,
    name: "Smart Watch",
    description: "Feature-rich smart watch with health tracking",
    price: 229.99,
    image: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    category: "electronics",
    stock: 10
  },
  {
    id: 39,
    name: "USB-C Hub",
    description: "Multi-port USB-C hub with HDMI and USB 3.0",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "electronics",
    stock: 25
  },
  {
    id: 40,
    name: "Wireless Charger",
    description: "Fast wireless charging pad for smartphones",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586953297436-68ec4aecaeff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "electronics",
    stock: 35
  },
  {
    id: 41,
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for better ergonomics",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "electronics",
    stock: 20
  },
  {
    id: 42,
    name: "Power Bank",
    description: "High-capacity portable power bank 20000mAh",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1609592282017-8d9c31d86e70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "electronics",
    stock: 28
  },
  {
    id: 43,
    name: "Gaming Mouse",
    description: "Precision gaming mouse with RGB lighting",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "electronics",
    stock: 18
  },
  {
    id: 44,
    name: "Web Camera",
    description: "4K web camera for video calls and streaming",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "electronics",
    stock: 15
  },
  {
    id: 45,
    name: "Phone Case",
    description: "Protective phone case with wireless charging support",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "electronics",
    stock: 45
  },

  // Home (10 products)
  {
    id: 6,
    name: "Ceramic Mug Set",
    description: "Set of 4 minimalist ceramic mugs",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "home",
    stock: 18
  },
  {
    id: 9,
    name: "Handmade Soap Set",
    description: "Organic handmade soap set with natural ingredients",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1607006483224-75ee0df7c8a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
    category: "home",
    stock: 25
  },
  {
    id: 10,
    name: "Wooden Cutting Board",
    description: "Premium handcrafted acacia wood cutting board",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1592923537899-714f8600c111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "home",
    stock: 15
  },
  {
    id: 11,
    name: "Scented Candle",
    description: "Long-lasting scented soy candle in a glass jar",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1603006905393-cdc32372b217?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    category: "home",
    stock: 30
  },
  {
    id: 13,
    name: "Cotton Throw Pillow",
    description: "Soft decorative throw pillow with removable cover",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1565878259814-f4f39c83e25e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    category: "home",
    stock: 22
  },
  {
    id: 46,
    name: "Essential Oil Diffuser",
    description: "Ultrasonic essential oil diffuser with LED lights",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "home",
    stock: 19
  },
  {
    id: 47,
    name: "Table Lamp",
    description: "Modern minimalist table lamp with warm lighting",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "home",
    stock: 12
  },
  {
    id: 48,
    name: "Plant Pot Set",
    description: "Set of 3 ceramic plant pots with drainage holes",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "home",
    stock: 26
  },
  {
    id: 49,
    name: "Woven Basket",
    description: "Natural woven storage basket for home organization",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "home",
    stock: 21
  },
  {
    id: 50,
    name: "Kitchen Scale",
    description: "Digital kitchen scale with precise measurements",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "home",
    stock: 17
  }
];
