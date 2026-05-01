import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  createProductSchema,
  type CreateProductFormValues,
} from "./createProduct.schema";
import { sellerProductApi } from "../api/sellerProductApi";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0400-\u04ff\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function useProductForm(images: File[]) {
  const navigate = useNavigate();

  const methods = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: { attributes: [], images: [] },
  });

  const { setValue, control } = methods;
  const nameValue = useWatch({ control, name: "name" });
  const categoryId = useWatch({ control, name: "categoryId" });

  useEffect(() => {
    if (nameValue) setValue("slug", slugify(nameValue));
  }, [nameValue, setValue]);

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (data: CreateProductFormValues) => {
      const product = await sellerProductApi.create({
        name: data.name,
        categoryId: data.categoryId,
        description: data.description,
        vendorCode: data.vendorCode,
        barcode: data.barcode,
        slug: data.slug,
        attributes: data.attributes.filter(
          (a) =>
            a.textValue !== undefined ||
            a.numberValue !== undefined ||
            a.boolValue !== undefined ||
            a.optionId !== undefined ||
            (a.optionIds && a.optionIds.length > 0),
        ),
      });
      if (images.length > 0) {
        await sellerProductApi.uploadImages(product.productId, images);
      }
      return product;
    },
    onSuccess: () => navigate("/account/profile"),
  });

  return { methods, categoryId, mutateAsync, isPending, error };
}
