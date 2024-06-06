import { type Product } from "./schemas/productSchema";

export interface iProduct {
  productList: { products: Array<Product> };
  limit?: number;
  skip?: number;
  total?: number;
}

export type Color = "black" | "green" | "blue" | "lightblue" | string;

export type Size = "S" | "M" | "L" | "XL" | string;

export type Variant = {
  color: Color | Color[];
  size: Size | Size[];
};

export type SelectedColorVariantType = {
  productId: string | number | null | undefined;
  color: string | null;
};

export type CartItem = { product: Product; quantity: number };
