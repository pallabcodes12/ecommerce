"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useProductList } from "@/hooks/useProductList";
import { useAtom, useAtomValue } from "jotai";
import {
  currentPriceAtom,
  productVariantsColorAtom,
  selectedVariantsAtom,
} from "@/atoms/productsAtoms";
import Loader from "./loader"; // Import the Loader component
import { Color } from "@/lib/types";
import { COLOR_VARIANT, SIZE_VARIANT } from "@/constants";
import { Product } from "@/lib/schemas/productSchema";

const ProductList = () => {
  const {
    productList: products,
    fetchProducts,
    updateVariantsByProductId,
  } = useProductList();
  const [selectedVariants, setSelectedVariants] = useAtom(selectedVariantsAtom);
  const [currentPrice, setCurrentPrice] = useAtom(currentPriceAtom);
  const productColorVariants = useAtomValue(productVariantsColorAtom);
  const [isLoading, setIsLoading] = React.useState(true); // Add isLoading state
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    sessionStorage.clear();

    const fetchData = async () => {
      try {
        await fetchProducts();
        setIsLoading(false); // Set isLoading to false when data is fetched
      } catch (error) {
        setIsError(true);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleColorVariant = (
    event: React.MouseEvent<HTMLElement>,
    productInfo: Product,
    color: Color,
    i: number
  ) => {
    event.stopPropagation();

    const newColorVariant = {
      color,
      size: SIZE_VARIANT[0],
      productId: productInfo.id,
    };

    // store price in this atom and save it in sessionStorage

    setCurrentPrice(productInfo.price * (i + 1));

    // store in this atom and save it in sessionStorage
    setSelectedVariants(newColorVariant);

    // Ensure updateVariantsByProductId is called after selectedVariants is updated
    setTimeout(() => updateVariantsByProductId(productInfo.id, true), 0);
  };

  const handleDefaultVariants = (productId: number | string) => {
    // prettier-ignore
    const stored = JSON.parse(sessionStorage.getItem("currentlySelectedVariant")!) ?? null;

    if (!stored || Object.keys(selectedVariants).length === 0) {
      // haven't clicked on any color for this specific product ( so then store default into )

      const defaultVariants = {
        color: COLOR_VARIANT[0],
        size: SIZE_VARIANT[0],
        productId: Number(productId),
      };

      // store in this atom and save it in sessionStorage
      setSelectedVariants(defaultVariants);
    }

    // Ensure updateVariantsByProductId is called after selectedVariants is updated
    setTimeout(() => updateVariantsByProductId(productId, true), 0);
  };

  if (isLoading) {
    return <Loader />; // Show loader while fetching data
  }

  return (
    <div className="min-w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              {/* when clicked anywhere other than color variant on the cart, it will go "/products/${product.id}" page with default variants */}
              <Link
                href={`/products/${product.id}`}
                // href={`#`}
                onClick={() => handleDefaultVariants(product.id)}
              >
                <div className="cursor-pointer">
                  <Image
                    src={product.images[0] ?? product.thumbnail}
                    alt={product.title}
                    className="w-full h-52 object-cover rounded-t-lg"
                    width={500}
                    height={500}
                  />
                  <div className="mt-4">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {product.title} - {product.currentPrice || product.price}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-300 mb-3">
                      {product.category ?? "Black Premium"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${product.price}
                      </span>
                      <span className="text-sm  font-medium text-red-500">
                        {product.discountPercentage.toFixed(0) ?? 20}% off
                      </span>
                    </div>
                    {/* color variant starts here */}
                    <div className="mt-4 flex space-x-2">
                      {productColorVariants.map(
                        (colorInfo: Color, index: number) => (
                          <div
                            onClick={(e) =>
                              handleColorVariant(e, product, colorInfo, index)
                            }
                            key={colorInfo.id}
                            className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer ${
                              // @ts-expect-error type unknown
                              colorInfo.id === product.current!.color.id
                                ? "ring-2 ring-offset-2 ring-blue-500"
                                : ""
                            }`}
                            style={{ backgroundColor: colorInfo.color }}
                          />
                        )
                      )}
                    </div>
                    {/* color variant ends here */}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
