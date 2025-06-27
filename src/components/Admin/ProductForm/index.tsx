
import React from "react";
import { Product } from "../../../data/products";
import { Form } from "@/components/ui/form";
import { useProductForm } from "./useProductForm";
import BasicInfoFields from "./BasicInfoFields";
import PriceStockFields from "./PriceStockFields";
import CategoryFields from "./CategoryFields";
import ImageField from "./ImageField";
import FormActions from "./FormActions";

type ProductFormProps = {
  product?: Product;
  onSubmit: (data: Omit<Product, "id">, productId?: number) => void;
};

const ProductForm = ({ product, onSubmit }: ProductFormProps) => {
  const { form, formatFormData } = useProductForm({ product });

  const handleSubmit = (data: Omit<Product, "id">) => {
    const formattedData = formatFormData(data);

    if (product) {
      onSubmit(formattedData, product.id);
    } else {
      onSubmit(formattedData);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col h-full">
          <div className="flex-1 space-y-4 pr-2">
            <BasicInfoFields form={form} />
            <PriceStockFields form={form} />
            <CategoryFields form={form} />
            <ImageField form={form} />
          </div>
          <FormActions product={product} />
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
