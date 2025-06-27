
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "../../data/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@/components/ui/dialog";
import { categories } from "../../data/products";
import ImageUpload from "./ImageUpload";
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
  onSubmit: (data: Omit<Product, "id"> | (Omit<Product, "id"> & { id: number })) => void;
};

const ProductForm = ({ product, onSubmit }: ProductFormProps) => {
  const [imageUrl, setImageUrl] = useState(product?.image || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Omit<Product, "id">>({
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
    } : {
      name: "",
      description: "",
      price: 0,
      image: "",
      category: categories[1],
      stock: 0,
    },
  });

  const handleSubmit = async (data: Omit<Product, "id">) => {
    setIsSubmitting(true);
    try {
      const formattedData = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        image: imageUrl,
      };

      if (product) {
        onSubmit({ ...formattedData, id: product.id } as Omit<Product, "id"> & { id: number });
      } else {
        onSubmit(formattedData);
      }
    } finally {
      setIsSubmitting(false);
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
                  {categories.filter(cat => cat !== "all").map((category) => (
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

        <ImageUpload
          currentImageUrl={imageUrl}
          onImageChange={setImageUrl}
          disabled={isSubmitting}
        />

        <div className="flex justify-end gap-2 pt-4">
          <DialogClose asChild>
            <Button variant="outline" type="button" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : product ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
