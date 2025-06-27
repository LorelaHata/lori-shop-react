import React from "react";
import { useForm } from "react-hook-form";
import { Product, subcategories } from "../../data/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@/components/ui/dialog";
import { categories } from "../../data/products";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type ProductFormProps = {
  product?: Product;
  onSubmit: (data: Omit<Product, "id">, productId?: number) => void;
};

const ProductForm = ({ product, onSubmit }: ProductFormProps) => {
  const form = useForm<Omit<Product, "id">>({
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      subcategory: product.subcategory || "",
      stock: product.stock,
    } : {
      name: "",
      description: "",
      price: 0,
      image: "",
      category: categories.filter(cat => !cat.includes("all") && !cat.includes("-"))[0],
      subcategory: "",
      stock: 0,
    },
  });

  const selectedCategory = form.watch("category");
  const isClothingCategory = selectedCategory === "clothing";

  const handleSubmit = (data: Omit<Product, "id">) => {
    const formattedData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      subcategory: isClothingCategory ? data.subcategory : undefined,
    };

    if (product) {
      onSubmit(formattedData, product.id);
    } else {
      onSubmit(formattedData);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (€)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  {...field}
                >
                  {categories.filter(cat => cat !== "all" && !cat.includes("-")).map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isClothingCategory && (
          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <select
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                    {...field}
                    required
                  >
                    <option value="">Select gender</option>
                    {subcategories.clothing.map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} />
              </FormControl>
              <FormMessage />
              
              {field.value && (
                <div className="mt-2">
                  <p className="text-sm mb-2">Preview:</p>
                  <img
                    src={field.value}
                    alt="Product preview"
                    className="w-32 h-32 object-cover rounded border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Preview";
                    }}
                  />
                </div>
              )}
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">
            {product ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
