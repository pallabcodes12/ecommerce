"use client";

import React, { useState, useEffect, forwardRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type ProductModalProps =
  | {
      product: {
        title: string;
        price: number;
        inStock: boolean;
      };
      open: boolean;
      onOpenChange: (open: boolean) => void;
      onAddToCart: (quantity: number) => void;
    }
  | any;

const ProductModal = forwardRef<HTMLDivElement, ProductModalProps>(
  ({ product, open, onOpenChange, onAddToCart }, ref) => {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          // onOpenChange(false); // close modal on esc
        }
      };

      if (open) {
        document.addEventListener("keydown", handleKeyDown);
      } else {
        document.removeEventListener("keydown", handleKeyDown);
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [onOpenChange, open]);

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <AnimatePresence>
            {open && (
              <Dialog.Content asChild forceMount className="w-[300px]">
                <motion.div
                  ref={ref}
                  initial={{ x: "100%", y: "-50%" }}
                  animate={{ x: "0%", y: "-50%" }}
                  exit={{ x: "100%", y: "-50%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md overflow-y-auto h-full"
                  style={{ marginTop: "5rem" }} // Adjust the top margin to match the navbar height
                >
                  <div className="flex justify-between items-center mb-6">
                    <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-gray-100 break-words">
                      {product.title.length > 16
                        ? `${product.title.substring(0, 16)}....`
                        : product.title}
                    </Dialog.Title>
                    <Dialog.Close asChild onClick={() => onOpenChange(false)}>
                      <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                        <FaTimes />
                      </button>
                    </Dialog.Close>
                  </div>
                  <p className="text-lg mb-4 text-gray-900 dark:text-gray-100">
                    Price: ${product.price.toFixed(2)}
                  </p>
                  <p className="mb-4 text-gray-900 dark:text-gray-100">
                    In Stock
                  </p>
                  <div className="mb-6">
                    <label
                      htmlFor="quantity"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Quantity
                    </label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-600 dark:bg-gray-700 dark:text-gray-100"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
                    onClick={() => onAddToCart(quantity)}
                  >
                    Add to Cart
                  </button>
                </motion.div>
              </Dialog.Content>
            )}
          </AnimatePresence>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

ProductModal.displayName = "ProductModal";

export default ProductModal;
