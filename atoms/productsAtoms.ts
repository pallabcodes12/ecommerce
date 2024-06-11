import { atom } from "jotai";
import { Product } from "@/lib/schemas/productSchema";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { CartItem, Color, SelectedVariant, Size } from "@/lib/types";
import {
  COLOR_VARIANT,
  COLOR_VARIANT_DEFAULT_IS,
  SIZE_VARIANT,
  SIZE_VARIANT_DEFAULT_IS,
} from "@/constants";

export const productListAtom = atom<Product[]>([]);

export const productAtom = atom<Product | null>(null);

// export const currentPriceAtom = atom<number>(0);

// derived atom or atom effects

/*

1.When the setter of productAtom is used, productWithSyncAtom consumers will receive the latest data.

2. When the setter of productListAtom is used, productWithSyncAtom will re-render its consumers to show the latest data.

3. If the setter of productWithSyncAtom is used, its consumers will get its latest data.

*/

// Update made on either of these atom, will make productWithSyncAtom's consumers re-render to get the latest data
export const productWithSyncAtom = atom((get) => {
  const product = get(productAtom); // retrieve the current value of the `productAtom`
  const productList = get(productListAtom); // // retrieve the current value of the `productListAtom`

  if (!product || !productList.length) return [];

  const updatedProductList = productList.map((p) =>
    p.id === product.id ? product : p
  );

  return updatedProductList;
});

export const productVariantsSizeAtom = atom<Size[]>(SIZE_VARIANT); // fixed variants for "Size"

export const productVariantsColorAtom = atom<Color[]>(COLOR_VARIANT); // fixed variants for "Color"

export const productWithVariants = atom(null);

// prettier-ignore
export const productWithVariantInfo = atomWithStorage<any>('product_with_variants_info', null)

// N.B:  if needed make a derived atom from `productVariantsSizeAtom` and `productVariantsColorAtom`

// using the session storage
const storage = createJSONStorage<SelectedVariant>(() => sessionStorage);

// prettier-ignore
export const initialSelectedVariantsStateWithDefault: SelectedVariant = { color: COLOR_VARIANT_DEFAULT_IS, size: SIZE_VARIANT_DEFAULT_IS };

export const initialSelectedVariantsState: SelectedVariant = {  } as SelectedVariant;

// prettier-ignore

export const selectedVariantsAtom = atomWithStorage<SelectedVariant>("currentlySelectedVariant",initialSelectedVariantsState, storage);

const initialCartState: CartItem[] = [];

// using the default localStorage
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
