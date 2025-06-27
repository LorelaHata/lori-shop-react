
import React from "react";
import { Product } from "../../../data/products";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

type FormActionsProps = {
  product?: Product;
};

const FormActions = ({ product }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-2 pt-6 mt-6 border-t border-gray-200 bg-[#f8f4e5] sticky bottom-0">
      <DialogClose asChild>
        <Button variant="outline" type="button">
          Cancel
        </Button>
      </DialogClose>
      <Button type="submit" className="bg-primary hover:bg-primary/90">
        {product ? "Update Product" : "Add Product"}
      </Button>
    </div>
  );
};

export default FormActions;
