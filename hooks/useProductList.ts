"use client";

import { useAtom } from "jotai";
import { productListAtom } from "@/atoms/productsAtoms";
import { Product } from "@/lib/schemas/productSchema";

export const useProductList = () => {
  const [productList, setProductList] = useAtom(productListAtom);

  const fetchProducts = async (skip = 0, limit = 12) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
        { cache: "no-store" }
      );
      const data: { products: Product[] } = await res.json();
      setProductList(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return {
    productList,
    fetchProducts,
  };
};
