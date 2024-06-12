"use client";

import { useAtom } from "jotai";
import { cartAtom, productAtom } from "@/atoms/productsAtoms";
import { Product } from "@/lib/schemas/productSchema";
import { CartItem } from "@/lib/types";

export const useProductCart = () => {
  const [product, setProduct] = useAtom(productAtom);
  const [cart, setCart] = useAtom(cartAtom);

  const addToCart = (productInfo: Product, quantity: number) => {
    // Check if the given product already exists in the cart
    const existingItemIndex = cart.findIndex((item: CartItem) => {
      return (
        item.product.id === productInfo.id &&
        // @ts-ignore
        item?.product?.current?.color?.id === product?.current?.color?.id && // Assuming color is an object with an ID
        // @ts-ignore
        item?.product?.current?.size?.id === product?.current?.size?.id // Assuming size is an object with an ID
      );
    });

    if (existingItemIndex === -1) {
      // Product doesn't exist in the cart, so just add it
      setCart((prevCart) => [...prevCart, { product: productInfo, quantity }]);
    } else {
      // Product with same ID and variant exists in the cart, therefore update its quantity
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        // since I am modifying the array directly by its index thus no need to do anything else
        // updatedCart[existingItemIndex].quantity += quantity;
        updatedCart[existingItemIndex].quantity = quantity;
        return updatedCart;
      });
    }
  };

  const updateCartItem = (quantity: number, currentProduct: CartItem) => {
    const existingItemIndex = cart.findIndex((item: CartItem) => {
      return (
        item.product.id === currentProduct.product.id &&
        // @ts-ignore
        // prettier-ignore
        item?.product?.current?.color?.id === currentProduct.product?.current?.color?.id &&
        // @ts-ignore
        // prettier-ignore
        item?.product?.current?.size?.id === currentProduct?.product?.current?.size?.id
      );
    });

    if (existingItemIndex !== -1) {
      // Product with same ID and variant exists in the cart, therefore update its quantity
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity = quantity;
        return updatedCart;
      });
    }
  };

  const deleteCartItem = (currentProduct: CartItem) => {
    const existingItemIndex = cart.findIndex((item: CartItem) => {
      return (
        item.product.id === currentProduct.product.id &&
        // @ts-ignore
        // prettier-ignore
        item?.product?.current?.color?.id === currentProduct.product?.current?.color?.id &&
        // @ts-ignore
        // prettier-ignore
        item?.product?.current?.size?.id === currentProduct?.product?.current?.size?.id
      );
    });

    if (existingItemIndex !== -1) {
      // Product with same ID and variant exists in the cart, therefore update its quantity
      setCart((prevCart) => {
        let updatedCart: CartItem[] = [...prevCart];

        // prettier-ignore
        updatedCart = updatedCart.filter((item: CartItem, index: number) => index !== existingItemIndex);

        return updatedCart;
      });
    }
  };

  const isAlreadyWithinCart = (productInfo: Product) => {
    // Check if the given product already exists in the cart
    const doesExistWithinCart = cart.findIndex((item: CartItem) => {
      return (
        item.product.id === productInfo.id &&
        // @ts-ignore
        item?.product?.current?.color?.id === product?.current?.color?.id &&
        // @ts-ignore
        item?.product?.current?.size?.id === product?.current?.size?.id
      );
    });

    return doesExistWithinCart !== -1;
  };

  return {
    product,
    cart,
    addToCart,
    updateCartItem,
    deleteCartItem,
    isAlreadyWithinCart,
  };
};
