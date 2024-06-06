"use client";

import { useAtom } from "jotai";
import { Product } from "@/lib/schemas/productSchema";
import { productAtom } from "@/atoms/productsAtoms";
import { COLOR_VARIANT, SIZE_VARIANT } from "@/constants";

export const useProductDetail = (productId: string) => {
  const [product, setProduct] = useAtom(productAtom);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      const data: Product = await res.json();

      data.variant = {
        color: COLOR_VARIANT,
        size: SIZE_VARIANT,
      };

      data.prices = data.variant.color?.map((_, i) => data.price * (i + 1));

      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  return {
    product,
    fetchProduct,
  };
};
