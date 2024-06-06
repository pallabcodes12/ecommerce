"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { cartAtom } from "@/atoms/productsAtoms";

const Navbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartItems] = useAtom(cartAtom);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Calculate total quantity of items in the cart
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartItemCount(totalQuantity);
  }, [cartItems]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // Logic to toggle dark mode
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <div className="text-3xl font-bold cursor-pointer hover:text-gray-300">
              My Store
            </div>
          </Link>
          <div className="flex items-center justify-center mx-auto lg:w-1/2 relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 pl-4 pr-10 rounded-lg bg-gray-800 text-white focus:outline-none w-full"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: isFocused ? 1 : 0.5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <FaSearch />
            </motion.div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <div className="relative cursor-pointer">
                <FaShoppingCart className="h-8 w-8 text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full px-2 py-0.5 -mt-1">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>
            <div style={{ marginRight: "1rem" }}></div> {/* Add spacing */}
            {isDarkMode ? (
              <FaSun
                className="text-yellow-500 cursor-pointer h-8 w-8"
                onClick={toggleDarkMode}
              />
            ) : (
              <FaMoon
                className="text-yellow-500 cursor-pointer h-8 w-8"
                onClick={toggleDarkMode}
              />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
