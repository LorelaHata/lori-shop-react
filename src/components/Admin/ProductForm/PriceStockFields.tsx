
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

type PriceStockFieldsProps = {
  form: UseFormReturn<Omit<Product, "id">>;
};

const PriceStockFields = ({ form }: PriceStockFieldsProps) => {
  return (
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
  );
};

export default PriceStockFields;
