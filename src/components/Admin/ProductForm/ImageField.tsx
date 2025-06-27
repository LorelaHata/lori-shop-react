
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Product } from "../../../data/products";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type ImageFieldProps = {
  form: UseFormReturn<Omit<Product, "id">>;
};

const ImageField = ({ form }: ImageFieldProps) => {
  return (
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
  );
};

export default ImageField;
