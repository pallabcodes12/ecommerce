"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useAtomValue, useAtom } from "jotai";
import {
  productVariantsColorAtom,
  productVariantsSizeAtom,
  selectedColorVariantAtom,
} from "@/atoms/productsAtoms";
import { useProductDetail } from "@/hooks/useProductDetail";
import CartModal from "./cart-modal";
import Loader from "./loader"; // Import the Loader component

const ProductDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { product, fetchProduct } = useProductDetail(params.id);
  const productColorVariants = useAtomValue(productVariantsColorAtom);
  const productSizeVariants = useAtomValue(productVariantsSizeAtom);
  const [selectedColor, setSelectedColor] = useAtom(selectedColorVariantAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  // const handleModalOpen = () => setIsModalOpen(true);
  // const handleModalClose = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        await fetchProduct();
        setIsLoading(false); // Set isLoading to false when data is fetched
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleColorClick = (color: string) => {
    setSelectedColor({ productId: product?.id, color });
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  if (isLoading) {
    return <Loader />; // Show loader while fetching data
  }

  const selectedColorForProduct = selectedColor.color || null;

  // Get the index of the selected size
  const sizeIndex = selectedSize
    ? productSizeVariants.findIndex((size) => size === selectedSize)
    : -1;

  // Get the default price based on whether there are multiple prices
  const defaultPrice = product?.prices
    ? product.prices.length > 1
      ? product.prices[0]
      : product.prices[0] || null
    : product?.price || null;

  // Get the price based on the selected size index
  const price =
    sizeIndex !== -1 && product?.prices
      ? product.prices[sizeIndex]
      : defaultPrice;

  return (
    <div>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative max-w-md mx-auto">
            {product !== null && (
              <>
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full rounded-lg"
                  width={1000}
                  height={500}
                />
                {(hoveredColor || selectedColorForProduct) && (
                  <div
                    className="absolute top-4 left-4 w-8 h-8 rounded-full border-2 border-white"
                    style={{
                      backgroundColor:
                        hoveredColor ||
                        selectedColorForProduct ||
                        "transparent",
                    }}
                  />
                )}
              </>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              {product?.title}
            </h1>
            <p className="text-gray-700 mb-4">{product?.description}</p>
            <p className="text-lg font-semibold text-gray-800 mb-4">${price}</p>

            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-800 mb-2">Colors</h2>
              <div className="flex space-x-2">
                {productColorVariants.map((color, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer ${
                      selectedColorForProduct === color
                        ? "ring-2 ring-offset-2 ring-blue-500"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onMouseEnter={() => setHoveredColor(color)}
                    onMouseLeave={() => setHoveredColor(null)}
                    onClick={() => handleColorClick(color)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-800 mb-2">Sizes</h2>
              <div className="flex space-x-2">
                {productSizeVariants.map((size, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-800"
                    }`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Add to Cart
            </button>
            {/* Modal */}
            {isModalOpen && (
              <CartModal
                product={product}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
