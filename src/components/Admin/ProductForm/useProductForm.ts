
import { useForm } from "react-hook-form";
import { Product, categories } from "../../../data/products";

type UseProductFormProps = {
  product?: Product;
};

export const useProductForm = ({ product }: UseProductFormProps) => {
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

  const formatFormData = (data: Omit<Product, "id">) => {
    return {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      subcategory: isClothingCategory ? data.subcategory : undefined,
    };
  };

  return {
    form,
    formatFormData,
  };
};
