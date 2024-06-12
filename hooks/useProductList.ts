"use client";

import { useAtom } from "jotai";
import {
  initialSelectedVariantsStateWithDefault,
  productListAtom,
} from "@/atoms/productsAtoms";
import { Product, ProductSchema } from "@/lib/schemas/productSchema";

export const useProductList = () => {
  const [productList, setProductList] = useAtom(productListAtom);

  const fetchProducts = async (skip = 0, limit = 12) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
        { cache: "no-store" }
      );

      const data: { products: Product[] } = await res.json();

      const productsWithVariants = data.products.map((product) => {
        let variantInfoArray: any[] = [];
        if (
          typeof product.variantInfo === "object" &&
          product.variantInfo !== null
        ) {
          // Convert variantInfo to an array if it's an object
          variantInfoArray = [product.variantInfo];
        } else if (Array.isArray(product.variantInfo)) {
          variantInfoArray = product.variantInfo;
        }
        return {
          ...product,
          current: {
            ...initialSelectedVariantsStateWithDefault,
            productId: product.id,
          },
          currentPrice: product.price,

          // variantInfo: variantInfoArray.map((info) => ({
          //   ...info,
          //   productId: product.id,
          // })),
          variantInfo: [],
        };
      });

      // Validate productsWithVariants with ProductSchema
      const validatedProducts = productsWithVariants.map((product) => {
        return ProductSchema.parse(product);
      });

      setProductList(validatedProducts);
    } catch (error: unknown) {
      console.error("Failed to fetch products:", (error as any).message);
    }
  };

  // prettier-ignore
  const updateVariantsByProductId = (productId: string | number, isOnlyColor: boolean = false) => {
    // prettier-ignore
    const storedVariants = JSON.parse(sessionStorage.getItem("currentlySelectedVariant")!) ?? null;

    try {
      // Find the specific product with the given productId
      const productToUpdate = productList.find((product) => product.id === productId);

      // prettier-ignore
      if (!productToUpdate) throw new Error(`Product with productId ${productId} not found.`);

      // check if the specific product's color same as before by comparing from storedVariants

      // @ts-ignore
      // if(productToUpdate.current.color.id === storedVariants.color.id) {
      //   setProductList(productList);
      //   return;
      // }


      // If isOnlyColor is true, update only the color variant
      if (isOnlyColor) {
        // console.info("storedVariants: ", storedVariants);

        const updatedProduct = {
          ...productToUpdate,
          current: {
            // these are current variant for the currently clicked product
            color: storedVariants?.color,
            size: storedVariants?.size,
            // productId: <number>productId
            productId: productId
          },
        };

        // prettier-ignore
        const updatedProductList = productList.map((product) => product.id === productId ? updatedProduct : product);
        
        setProductList(updatedProductList);

        return;
      }



      console.info("code should come here if [isOnlyColor = false]");

      // If isOnlyColor is false, update both color and size variants
      const updatedProduct = {
        ...productToUpdate,
        current: {
          color: storedVariants.color,
          size: storedVariants.size,
          productId: productId
        },
      };
      const updatedProductList = productList.map((product) =>
        product.id === productId ? updatedProduct : product
      );

      setProductList(updatedProductList);
    } catch (error: unknown) {
      console.error((error as any).message);
      throw error;
    }
  };

  return {
    productList,
    fetchProducts,
    updateVariantsByProductId, // Ensure this function is returned
  };
};
