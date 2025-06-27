
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Product, categories, subcategories } from "../../../data/products";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type CategoryFieldsProps = {
  form: UseFormReturn<Omit<Product, "id">>;
};

const CategoryFields = ({ form }: CategoryFieldsProps) => {
  const selectedCategory = form.watch("category");
  const isClothingCategory = selectedCategory === "clothing";

  return (
    <>
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
    </>
  );
};

export default CategoryFields;
