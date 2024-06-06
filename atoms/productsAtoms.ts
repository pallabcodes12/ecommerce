import { atom } from "jotai";
import { Product } from "@/lib/schemas/productSchema";
import { atomWithStorage } from "jotai/utils";
import { CartItem, Color, SelectedColorVariantType, Size } from "@/lib/types";
import { COLOR_VARIANT, SIZE_VARIANT } from "@/constants";

export const productListAtom = atom<Product[]>([]);

export const productVariantsSizeAtom = atom<Size[]>(SIZE_VARIANT);

export const productVariantsColorAtom = atom<Color[]>(COLOR_VARIANT);

export const selectedColorVariantAtom = atom<SelectedColorVariantType>(
  {} as SelectedColorVariantType
);

export const productAtom = atom<Product | null>(null);

const initialCartState: CartItem[] = [];

// export const cartAtom = atom<CartItem[]>([]);

export const cartAtom = atomWithStorage<CartItem[]>("cart", initialCartState);

export const viewedProductsAtom = atomWithStorage<number[]>(
  "viewedProducts",
  []
);

export const darkModeAtom = atomWithStorage("darkmode", false);

export const requestUsers = async () => {
  return fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-cache",
  }).then((res) => res.json());
};

type Users = Record<string, unknown>[] | Promise<Record<string, unknown>[]>; // to accept sync and async values

export const usersAtom = atom<Users>([]);

export const countAtom = atom(1);

export const asyncIncrementAtom = atom(null, async (get, set) => {
  set(countAtom, get(countAtom) + 1);
});
