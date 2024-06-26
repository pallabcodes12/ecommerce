"use client";

import React from "react";
import { useAtom, useAtomValue } from "jotai";
import { Product } from "@/lib/schemas/productSchema";
import {
  initialSelectedVariantsStateWithDefault,
  productAtom,
  productVariantsColorAtom,
} from "@/atoms/productsAtoms";
import { SelectedVariant } from "@/lib/types";

export const useProductDetail = (productId: string) => {
  const [product, setProduct] = useAtom(productAtom);
  const productVariantForColors = useAtomValue(productVariantsColorAtom);

  // this useEffect will run initially & then whenever productId changes through setter or any exposed hooks
  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        const data: Product = await res.json();
        setProduct(data);
      } catch (error) {
        throw error;
      }
    };

    fetchProduct();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${productId}`);

      const data: Product = await res.json();

      const defaultVariants: SelectedVariant = {
        ...initialSelectedVariantsStateWithDefault,
        productId: data.id,
      };

      // prettier-ignore
      const storedCurrentPrice = JSON.parse(sessionStorage.getItem("currentPrice")!) ?? data.price;

      // prettier-ignore
      const storedVariants = JSON.parse(sessionStorage.getItem("currentlySelectedVariant")!) ?? defaultVariants;

      // Additional properties to set
      const productWithVariants = {
        ...data,
        current: { ...storedVariants, productId: data.id },
        variantInfo: [],
        currentPrice: storedCurrentPrice,
      };

      // prettier-ignore
      if (Array.isArray(productVariantForColors) && productVariantForColors.length) {
        // prettier-ignore
        productWithVariants.prices = productVariantForColors.map((_, i: number) => data.price * (i + 1))
      }

      setProduct(productWithVariants);
    } catch (error) {
      throw error;
    }
  };

  // prettier-ignore
  const updateVariantsForAProductById = (productId: string | number, isOnlyColor: boolean = false) => {
    
    const defaultVariants: SelectedVariant = { ...initialSelectedVariantsStateWithDefault, productId };

    const storedVariants: SelectedVariant = JSON.parse(sessionStorage.getItem("currentlySelectedVariant")!) ?? defaultVariants;

    // prettier-ignore
    const storedCurrentPrice = JSON.parse(sessionStorage.getItem("currentPrice")!) ?? product?.price;

    if (!product) return;

    try {
      if (isOnlyColor) {
        // explicity type checking need since current uses union ( multiple types )
        const updatedProduct = {
          ...product,
          currentPrice: storedCurrentPrice,
          current: {
            // prettier-ignore
            ...(product.current && typeof product.current === "object" && !Array.isArray(product.current)
              ? product.current
              : {}),
            color: storedVariants.color,
            size: product.current && typeof product.current === "object" && "size" in product.current
                ? product.current.size : null, 
            productId: productId    
          },
        };

        setProduct(updatedProduct as Product);
        return;
      }

      

      const updatedProduct = {
        ...product,
        currentPrice: storedCurrentPrice,
        current: {
          ...(product.current &&
          typeof product.current === "object" &&
          !Array.isArray(product.current)
            ? product.current
            : {}),
          color: storedVariants.color,
          size: storedVariants.size,
          productId: productId,
        },
      };

      setProduct(updatedProduct as Product);
    } catch (error: unknown) {
      throw error;
    }
  };

  return {
    product,
    fetchProduct,
    updateVariantsForAProductById,
  };
};
