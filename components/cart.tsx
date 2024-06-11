"use client";

import Image from "next/image";
import React from "react";
import { useAtom } from "jotai";
import { cartAtom } from "@/atoms/productsAtoms";
import { CartItem } from "@/lib/types";
import { nanoid } from "nanoid";

const Cart = () => {
  const [cartItems, setCartItems] = useAtom(cartAtom);

  const handleRemoveItem = (itemId: number) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product.id !== itemId
    );
    setCartItems(updatedCartItems);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  console.info("cartItems: ", cartItems);

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          {cartItems.map((item: CartItem) => (
            <div
              key={`${item.product.id}-${nanoid()}`}
              className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md flex items-center mb-4"
            >
              <div className="flex-shrink-0 w-16 h-16">
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="object-contain w-full h-full"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex-grow ml-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {item.product.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-300">
                  {item.product.description}
                </p>
                <p className="text-gray-700 dark:text-gray-400 mt-2">
                  {/* @ts-ignore */}
                  Color: {item.product.variant?.color}
                </p>
                <p className="text-gray-700 dark:text-gray-400">
                  Price: ${item.product.price}
                </p>
                <div className="flex items-center mt-2">
                  <label className="mr-2">Quantity:</label>
                  <select
                    className="border rounded-md px-2 py-1"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      setCartItems((prevCartItems) =>
                        prevCartItems.map((cartItem) =>
                          cartItem.product.id === item.product.id
                            ? { ...cartItem, quantity: newQuantity }
                            : cartItem
                        )
                      );
                    }}
                  >
                    {Array.from({ length: 10 }).map((_, i: number) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    className="ml-auto text-red-500"
                    onClick={() => handleRemoveItem(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Summary
            </h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">
                Subtotal:
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                $
                {cartItems
                  .reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">
                Shipping:
              </span>
              <span className="text-gray-700 dark:text-gray-300">$0.00</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between mb-2">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">
                $
                {cartItems
                  .reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
