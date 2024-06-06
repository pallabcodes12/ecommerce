"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useProductList } from "@/hooks/useProductList";
import { useAtom, useAtomValue } from "jotai";
import {
  productVariantsColorAtom,
  selectedColorVariantAtom,
} from "@/atoms/productsAtoms";
import Loader from "./loader"; // Import the Loader component

const ProductList = () => {
  const { productList: products, fetchProducts } = useProductList();
  const [selectedColor, setSelectedColor] = useAtom(selectedColorVariantAtom);
  const productColorVariants = useAtomValue(productVariantsColorAtom);
  const [isLoading, setIsLoading] = React.useState(true); // Add isLoading state

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts();
        setIsLoading(false); // Set isLoading to false when data is fetched
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleColorClick = (productId: string | number, color: string) => {
    setSelectedColor({ productId, color });
  };

  if (isLoading) {
    return <Loader />; // Show loader while fetching data
  }

  return (
    <div className="min-w-full min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Link href={`/products/${product.id}`}>
                <div className="cursor-pointer">
                  <Image
                    src={product.images[0] ?? product.thumbnail}
                    alt={product.title}
                    className="w-full h-52 object-cover rounded-t-lg"
                    width={500}
                    height={500}
                  />
                  <div className="mt-4">
                    <h2 className="text-2xl font-semibold mb-2">
                      {product.title}
                    </h2>
                    <p className="text-gray-500 mb-3">
                      {product.category ?? "Black Premium"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="text-sm font-medium text-red-500">
                        {product.discountPercentage.toFixed(0) ?? 20}% off
                      </span>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      {productColorVariants.map((color, index) => (
                        <div
                          onClick={() => handleColorClick(product.id, color)}
                          key={index}
                          // className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                          className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer ${
                            selectedColor.productId === color
                              ? "ring-2 ring-offset-2 ring-blue-500"
                              : ""
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* {products.length && (
          <div className="flex justify-center mt-10">
            <nav className="flex items-center space-x-2">
              <Link
                href="/products?page=1"
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                1
              </Link>
              <Link
                href="/products?page=2"
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                2
              </Link>
              <Link
                href="/products?page=3"
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                3
              </Link>
              <Link
                href="/products?page=4"
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                4
              </Link>
            </nav>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProductList;
