"use client";

import { useAtom } from "jotai";
import { cartAtom, productAtom } from "@/atoms/productsAtoms";
import { Product } from "@/lib/schemas/productSchema";

export const useProductCart = () => {
  const [product, setProduct] = useAtom(productAtom);
  const [cart, setCart] = useAtom(cartAtom);

  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => [...prevCart, { product, quantity }]);
  };

  const updateCartItem = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return { product, cart, addToCart, updateCartItem };
};
