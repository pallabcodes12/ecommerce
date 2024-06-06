"use client";

import React from "react";
import { cartAtom } from "@/atoms/productsAtoms";
import { Product } from "@/lib/schemas/productSchema";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { CART_DEFAULT, CART_MAX } from "@/constants";

type CartModelProps = { product: Product; onClose: () => void };

const CartModal: React.FC<CartModelProps | any> = ({ product, onClose }) => {
  const router = useRouter();

  // State to track the quantity of the product to add to cart
  const [quantity, setQuantity] = React.useState(1);
  const [, setCart] = useAtom(cartAtom);

  // Function to add the product to cart
  const addToCart = () => {
    setCart((prevCart) => [
      ...prevCart,
      {
        product,
        quantity,
      },
    ]);
    onClose(); // Close the modal after adding to cart
    router.push("/cart");
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      CART_DEFAULT,
      Math.min(CART_MAX, parseInt(e.target.value))
    );
    setQuantity(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <div className="flex items-center mb-4">
          <label className="mr-2">Quantity:</label>
          <input
            type="number"
            className="border border-gray-300 p-2 w-16"
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={addToCart}
          >
            Add to Cart
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
