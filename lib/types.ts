import { type Product } from "./schemas/productSchema";

export interface iProduct {
  productList: { products: Array<Product> };
  limit?: number;
  skip?: number;
  total?: number;
}

export type Colors = "black" | "green" | "blue" | "lightblue" | string;

export type ColorsType = {
  id: string;
  color: Colors;
  productId?: number | string;
};

// prettier-ignore
export type Color = ColorsType;

export type Sizes = "S" | "M" | "L" | "XL" | string;

export type SizesType = {
  id: string;
  size: Sizes;
  productId?: number | string;
};

// prettier-ignore
export type Size = SizesType;

export type SelectedVariant = {
  color: ColorsType;
  size: SizesType;
  productId?: string | number;
};

export type Variant = {
  color: Color[];
  size: Size[];
  default: { color: Color; size: Size };
};

export type CartItem = { product: Product; quantity: number };
