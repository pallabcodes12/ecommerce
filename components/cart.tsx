"use client";

import Image from "next/image";
import React from "react";
import { useAtom } from "jotai";
import { cartAtom } from "@/atoms/productsAtoms";
import { CartItem } from "@/lib/types";

const CartPage = () => {
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

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          {cartItems.map((item: CartItem) => (
            <div
              key={item.product.id}
              className="bg-white p-4 rounded-md shadow-md flex items-center mb-4"
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
                <h2 className="text-lg font-semibold">{item.product.title}</h2>
                <p className="text-gray-500">{item.product.description}</p>
                <p className="text-gray-700 mt-2">
                  Color: {item.product.variant?.color}
                </p>
                <p className="text-gray-700">Price: ${item.product.price}</p>
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
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            {/* Calculate subtotal, shipping, and total dynamically */}
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-700">
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
              <span className="text-gray-600">Shipping:</span>
              <span className="text-gray-700">$0.00</span>
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
              onClick={() => console.log("Proceed to checkout")}
            >
              Proceed to Checkout
            </button>
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md w-full mt-2"
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

export default CartPage;
