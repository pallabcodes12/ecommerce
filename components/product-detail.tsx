"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useAtomValue, useAtom } from "jotai";
import {
  initialSelectedVariantsStateWithDefault,
  productVariantsColorAtom,
  productVariantsSizeAtom,
  selectedVariantsAtom,
} from "@/atoms/productsAtoms";
import { useProductDetail } from "@/hooks/useProductDetail";
import CartModal from "./cart-modal";
import Loader from "./loader";
import { Color, SelectedVariant, Size } from "@/lib/types";

const ProductDetail: React.FC = () => {
  const params = useParams<{ id: string }>();

  // prettier-ignore
  const { product, fetchProduct, updateVariantsForAProductById } = useProductDetail(params.id);

  /* `syncedProductList` won't be used directly but ensures "ProductDetail" (as a consumer of `productWithSyncAtom`) re-renders with the latest data when either `productAtom` (setter) or `productListAtom` (setter) is updated 
  const syncedProductList = useAtomValue(productWithSyncAtom); */

  const productColorVariants = useAtomValue(productVariantsColorAtom);
  const productSizeVariants = useAtomValue(productVariantsSizeAtom);
  const [selectedVariants, setSelectedVariants] = useAtom(selectedVariantsAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // prettier-ignore
  const [hoveredColor, setHoveredColor] = useState<SelectedVariant["color"] | string>(() => {
     if (typeof window !== "undefined") {
       const colorVariant: SelectedVariant = JSON.parse(
         sessionStorage.getItem("currentlySelectedVariant")!
       );
       return colorVariant.color ?? "";
     }
     return "";
   });

  const [selectedSize, setSelectedSize] = useState<
    SelectedVariant["size"] | string
  >(() => {
    if (typeof window !== "undefined") {
      const colorVariant: SelectedVariant = JSON.parse(
        sessionStorage.getItem("currentlySelectedVariant")!
      );
      return colorVariant.size ?? "";
    }
    return "";
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        await fetchProduct();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
      }
    };

    fetchProductById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("product: ", product);
  console.log("hoverColor: ", hoveredColor);

  const handleColorClick = (color: Color) => {
    console.info("existing", selectedVariants);

    const storedVariants: SelectedVariant =
      typeof window !== undefined &&
      (JSON.parse(sessionStorage.getItem("currentlySelectedVariant")!) ?? {
        ...initialSelectedVariantsStateWithDefault,
        productId: params.id,
      });

    console.info("storedColorVariant: ", storedVariants);

    // prettier-ignore
    const hasChosenDifferentColorVariant = color.id !== storedVariants.color.id;

    // prettier-ignore
    if (product && hasChosenDifferentColorVariant) {
      // persistance with the sessionStorage + UI
      setSelectedVariants({
        ...storedVariants,
        color,
        productId: Number(product.id),
      });

      // now update this product by its id
      updateVariantsForAProductById(product.id, true);
    }
  };

  const handleSizeClick = (size: Size) => {
    console.log("clickedSize: ", size);

    // setSelectedSize(prev => {})

    const storedVariants: SelectedVariant =
      typeof window !== undefined &&
      (JSON.parse(sessionStorage.getItem("currentlySelectedVariant")!) ?? {
        ...initialSelectedVariantsStateWithDefault,
        productId: params.id,
      });

    // prettier-ignore
    const hasChosenDifferentSizeVariant = size.id !== storedVariants.size.id;

    // prettier-ignore
    if (product && hasChosenDifferentSizeVariant) {
      // persistance with the sessionStorage + UI
      setSelectedVariants({
        ...storedVariants,
        size,
        productId: Number(product.id),
      });

      // now update this product by its id
      updateVariantsForAProductById(product.id, false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const selectedColorForProduct = selectedVariants.color || null;

  // const sizeIndex = selectedSize ? productSizeVariants.findIndex((size) => size === selectedSize) : -1;

  const defaultPrice = product?.prices
    ? product.prices.length > 1
      ? product.prices[0]
      : product.prices[0] || null
    : product?.price || null;

  // const price = sizeIndex !== -1 && product?.prices ? product.prices[sizeIndex] : defaultPrice;

  // return <pre>{JSON.stringify(product, null, 2)}</pre>;
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* render the hover color : starts here */}

          <div className="relative max-w-md mx-auto">
            {product && (
              <>
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full rounded-lg"
                  width={1000}
                  height={500}
                />
                {typeof hoveredColor === "object" && hoveredColor && (
                  <div
                    className="absolute top-4 left-4 w-8 h-8 rounded-full border-2 border-white"
                    style={{
                      backgroundColor: hoveredColor.color,
                    }}
                  />
                )}
              </>
            )}
          </div>

          {/* rendering the hovered color: ends here */}

          <div>
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {product?.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {product?.description}
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              ${product?.price}
            </p>

            {/* color variant (with hover): starts here */}
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
                Colors
              </h2>
              <div className="flex space-x-2">
                {productColorVariants.map((colorInfo: Color) => (
                  <div
                    key={colorInfo.id}
                    className={`w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer ${
                      // @ts-ignore
                      product?.current?.color?.id === colorInfo.id
                        ? "ring-2 ring-offset-2 ring-blue-500"
                        : ""
                    }`}
                    style={{ backgroundColor: colorInfo.color }}
                    onMouseEnter={() => {
                      // console.log("mouse entered: ", colorInfo)
                      setHoveredColor(colorInfo);
                    }}
                    onMouseLeave={() => {
                      const colorVariant: SelectedVariant =
                        typeof window !== undefined &&
                        JSON.parse(
                          sessionStorage.getItem("currentlySelectedVariant")!
                        );

                      setHoveredColor(colorVariant?.color ?? "");
                    }}
                    onClick={() => handleColorClick(colorInfo)}
                  />
                ))}
              </div>
            </div>

            {/* color variant (with hover): ends here */}

            {/* size variant: starts here */}
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
                Sizes
              </h2>
              <div className="flex space-x-2">
                {productSizeVariants.map((size, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded border ${
                      // @ts-ignore
                      product.current && product?.current?.size?.id === size.id
                        ? "bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-800"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    }`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>
            {/* size variant: ends here */}

            {/* Add to cart button starts here */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Add to Cart
            </button>

            {/* Add to cart button ends here */}

            {/* modal: starts here */}
            {isModalOpen && (
              <CartModal
                product={product}
                onClose={() => setIsModalOpen(false)}
              />
            )}
            {/* modal : ends here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
